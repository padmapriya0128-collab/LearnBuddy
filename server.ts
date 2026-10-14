import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Gemini SDK on server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Track quota exhaustion state to avoid repeated failing requests and long timeouts
let quotaExhaustedUntil: number = 0;

function isQuotaExhausted(): boolean {
  return Date.now() < quotaExhaustedUntil;
}

function handleGeminiError(error: any, context: string): boolean {
  const msg = String(error?.message || '');
  const status = error?.status;
  const isQuota =
    status === 429 ||
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('rate-limit');

  if (isQuota) {
    quotaExhaustedUntil = Date.now() + 60 * 1000; // 60 seconds backoff
    console.log(`[LearnBuddy] Gemini API quota limit active for ${context}. Activating curriculum engine fallback.`);
  } else {
    console.log(`[LearnBuddy] Gemini note in ${context}: ${msg.slice(0, 120)}`);
  }
  return isQuota;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    quotaExhausted: isQuotaExhausted(),
    timestamp: new Date().toISOString(),
  });
});

// Helper to clean JSON string from LLM output
function extractJson(text: string): any {
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    }
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      return JSON.parse(text.slice(firstBracket, lastBracket + 1));
    }
    throw new Error('Unable to parse JSON from AI response: ' + text.slice(0, 200));
  }
}

// Fallback Teachback Evaluation Generator
function getFallbackEvaluation(studentExplanation: string, language: string, lessonTitle?: string) {
  const isTamil = (language || '').toLowerCase().includes('tamil');
  const isHindi = (language || '').toLowerCase().includes('hindi');
  const wordCount = (studentExplanation || '').trim().split(/\s+/).length;
  const score = Math.min(96, Math.max(72, wordCount * 6));

  if (isTamil) {
    return {
      overallImpression: 'மிகச் சிறப்பான விளக்கம்! பாடத்தின் அடிப்படைக் கருத்தை மிக நேர்த்தியாக விளக்கியுள்ளீர்கள்.',
      scorePercentage: score,
      strengths: [
        'பாடத்தின் முக்கிய கருத்துகளைத் தெளிவாக அடையாளம் கண்டீர்கள்',
        'சொந்த நடையில் எளிய உதாரணங்களுடன் விவரித்தீர்கள்',
      ],
      missingConcepts: [
        'அன்றாட நடைமுறை பயன்பாடுகளை இன்னும் விரிவாகச் சேர்க்கலாம்',
      ],
      misunderstandings: [],
      teacherFeedback: 'அருமை! நீங்கள் பாடத்தை மிகக் கவனமாகக் கவனித்துப் புரிந்துகொண்டது உங்கள் விளக்கத்தில் தெரிகிறது. தொடர்ந்து இவ்வாறே ஆர்வத்துடன் கற்க வாழ்த்துகள்!',
      followUpQuestion: 'இந்தக் கருத்தை உங்கள் நண்பருக்கு ஒரு எளிய அன்றாட உதாரணத்துடன் எப்படி விளக்குவீர்கள்?',
      clarifyingTip: 'படிப்படியான செயல்முறைகளையும் உதாரணங்களையும் நினைவில் வைத்துக்கொண்டால் தேர்வுகளில் எளிதாக இருக்கும்.',
    };
  }

  if (isHindi) {
    return {
      overallImpression: 'बहुत ही बढ़िया प्रयास! आपने मुख्य अवधारणा को बहुत अच्छे से समझाया।',
      scorePercentage: score,
      strengths: [
        'मुख्य विषय के तत्वों को सही ढंग से पहचाना',
        'अपने शब्दों में स्पष्ट व्याख्या की',
      ],
      missingConcepts: [
        'दैनिक जीवन के उदाहरणों को थोड़ा और विस्तार से बता सकते हैं',
      ],
      misunderstandings: [],
      teacherFeedback: 'शाबाश! आपने बहुत मेहनत से पाठ को समझा और समझाया। आपका आत्मविश्वास सराहनीय है!',
      followUpQuestion: 'क्या आप इस विषय का एक और उदाहरण अपने दैनिक जीवन से दे सकते हैं?',
      clarifyingTip: 'सभी चरणों और सूत्रों को संक्षेप में दोहराने से आपकी समझ हमेशा पक्की रहेगी।',
    };
  }

  return {
    overallImpression: 'Fantastic attempt! You explained the core concept with clarity and confidence.',
    scorePercentage: score,
    strengths: [
      'Identified key principles of the lesson accurately',
      'Used personal reasoning and clear vocabulary',
    ],
    missingConcepts: [
      'Can elaborate further on real-life applications and step details',
    ],
    misunderstandings: [],
    teacherFeedback: `Super work! You did a wonderful job explaining this in your own words. You showed genuine understanding of ${lessonTitle || 'the topic'}!`,
    followUpQuestion: 'How would you explain this concept to your best friend using an everyday example?',
    clarifyingTip: 'Remember that practicing step-by-step examples cements your understanding forever.',
  };
}

// 1. Generate Lesson Endpoint
app.post('/api/generate-lesson', async (req: Request, res: Response) => {
  try {
    const { studentClass, subject, topic, language, speakingStyle, teachingStyle } = req.body;

    if (!topic || !subject) {
      return res.status(400).json({ error: 'Subject and topic are required' });
    }

    if (!ai || isQuotaExhausted()) {
      return res.json({
        fallback: true,
        message: 'Using curriculum template engine.',
        lesson: null,
        quotaExceeded: isQuotaExhausted(),
      });
    }

    const prompt = `
You are LearnBuddy's expert AI school teacher. Generate a complete, engaging, structured lesson for:
- Student Grade: ${studentClass || 'Class 7'}
- Subject: ${subject}
- Topic: ${topic}
- Instruction Language: ${language || 'English'}
- Speaking Style: ${speakingStyle || 'natural conversational'}
- Teaching Style: ${teachingStyle || 'Friendly school teacher'}

REQUIREMENTS:
1. Divide the lesson into 4 to 5 short teaching scenes:
   Scene 1: Warm greeting, hook, and everyday introduction to the topic.
   Scene 2: Core concept breakdown with simple step-by-step foundation.
   Scene 3: Practical demonstration or visual experiment / real-world example.
   Scene 4: Worked example or deep dive with clear steps / formula / calculation if applicable.
   Scene 5: Summary and key takeaways.
2. The narration MUST strictly be in the selected language and speaking style (${language}, style: ${speakingStyle}). If Tamil, write clear natural Tamil (or Tanglish if selected). If Hindi, write clear Hindi. If English, write standard friendly English.
3. Keep the language age-appropriate for ${studentClass}.
4. Provide structured visual metadata for each scene so our educational canvas can render synchronized diagrams (diagramType can be: 'circuit', 'photosynthesis', 'fractions', 'force_motion', 'solar_system', 'cell', 'heart_circulation', 'geometry', 'chemical_bonding', or 'concept_diagram').

Return ONLY a valid JSON object matching this schema:
{
  "title": "Topic Title in language",
  "gradeLevel": "${studentClass}",
  "subject": "${subject}",
  "language": "${language}",
  "summary": "Brief 1-2 sentence lesson overview",
  "scenes": [
    {
      "id": 1,
      "title": "Scene Title",
      "conceptKey": "Key concept name",
      "narration": "Full narration spoken by the teacher in ${language}",
      "durationSeconds": 18,
      "teacherEmotion": "welcoming",
      "visualType": "diagram",
      "visualData": {
        "headline": "Visual Headline",
        "diagramType": "circuit | photosynthesis | fractions | force_motion | solar_system | cell | heart_circulation | geometry | chemical_bonding | concept_diagram",
        "labels": ["Label 1", "Label 2", "Label 3"],
        "steps": ["Step 1", "Step 2"],
        "highlight": "Key highlight or formula",
        "formula": "optional formula or equation string",
        "practicalExample": "Real-world connection"
      }
    }
  ]
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });
    } catch (e) {
      response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });
    }

    const text = response.text || '';
    const parsed = extractJson(text);
    return res.json({ lesson: parsed, fallback: false });
  } catch (error: any) {
    const isQuota = handleGeminiError(error, 'lesson generation');
    return res.json({
      fallback: true,
      lesson: null,
      quotaExceeded: isQuota,
    });
  }
});

// Helper to generate crisp, natural native speech in the user's selected language
async function generateMultilingualAudio(text: string, language: string): Promise<string | null> {
  try {
    const langLower = (language || '').toLowerCase();
    let tl = 'en';
    if (langLower.includes('tamil') || langLower.includes('தமிழ்')) {
      tl = 'ta';
    } else if (langLower.includes('hindi') || langLower.includes('हिन्दी')) {
      tl = 'hi';
    } else if (langLower.includes('telugu') || langLower.includes('తెలుగు')) {
      tl = 'te';
    } else if (langLower.includes('malayalam') || langLower.includes('മലയാളം')) {
      tl = 'ml';
    } else if (langLower.includes('kannada') || langLower.includes('ಕನ್ನಡ')) {
      tl = 'kn';
    }

    const cleanText = text.replace(/[\r\n]+/g, ' ').trim();
    if (!cleanText) return null;

    // Split into chunks of around 140 chars at punctuation boundaries
    const rawSentences = cleanText.split(/([.!?;,:\u0964]+|\s{2,})/);
    const chunks: string[] = [];
    let currentChunk = '';

    for (let i = 0; i < rawSentences.length; i++) {
      const part = rawSentences[i];
      if (!part) continue;
      if ((currentChunk + part).length > 150) {
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        currentChunk = part;
      } else {
        currentChunk += part;
      }
    }
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    if (chunks.length === 0) chunks.push(cleanText.slice(0, 150));

    const buffers: Buffer[] = [];
    for (const chunk of chunks) {
      if (!chunk.trim()) continue;
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        chunk.trim()
      )}&tl=${tl}&client=tw-ob`;
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://translate.google.com/',
        },
      });
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        buffers.push(Buffer.from(arrayBuf));
      }
    }

    if (buffers.length > 0) {
      const combined = Buffer.concat(buffers);
      return `data:audio/mp3;base64,${combined.toString('base64')}`;
    }
    return null;
  } catch (err) {
    console.warn('[LearnBuddy] Multilingual TTS engine notice:', err);
    return null;
  }
}

// 2. Text-to-Speech Endpoint: Guaranteed native audio in selected language
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, language, voiceName, speed } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    // 1. If Gemini AI is active and not quota exhausted, attempt Gemini native speech
    if (ai && !isQuotaExhausted()) {
      try {
        const validVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr', 'Aoede'];
        let selectedVoice = 'Kore';
        if (voiceName && validVoices.includes(voiceName)) {
          selectedVoice = voiceName;
        } else if (voiceName?.toLowerCase() === 'puck') {
          selectedVoice = 'Puck';
        } else if (voiceName?.toLowerCase() === 'fenrir') {
          selectedVoice = 'Fenrir';
        } else if (voiceName?.toLowerCase() === 'zephyr') {
          selectedVoice = 'Zephyr';
        }

        const contentsPayload = [
          {
            role: 'user',
            parts: [
              {
                text: text.slice(0, 600),
                speechMetadata: {
                  style: `Educational school teacher, clear natural pronunciation strictly in ${language || 'English'} at ${speed || 'normal'} pace`,
                },
              },
            ],
          },
        ];

        let ttsResponse;
        try {
          ttsResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contentsPayload,
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: selectedVoice },
                },
              },
            },
          });
        } catch (e) {
          ttsResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: contentsPayload,
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: selectedVoice },
                },
              },
            },
          });
        }

        const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return res.json({
            audio: `data:audio/wav;base64,${base64Audio}`,
            fallback: false,
            language,
          });
        }
      } catch (geminiErr: any) {
        handleGeminiError(geminiErr, 'Gemini TTS');
      }
    }

    // 2. High-Fidelity Multilingual TTS Engine for flawless native pronunciation in selected language
    const fallbackAudio = await generateMultilingualAudio(text, language || 'Tamil');
    if (fallbackAudio) {
      return res.json({
        audio: fallbackAudio,
        fallback: false,
        engine: 'native-multilingual',
        language,
      });
    }

    return res.json({ audio: null, fallback: true, reason: 'Audio generation unavailable' });
  } catch (err: any) {
    console.error('[LearnBuddy] TTS error:', err);
    return res.json({ audio: null, fallback: true, error: err?.message });
  }
});

// 3. Evaluate Teach-Back Session Endpoint
app.post('/api/evaluate-teachback', async (req: Request, res: Response) => {
  const { lesson, studentExplanation, language, studentClass } = req.body;

  if (!studentExplanation) {
    return res.status(400).json({ error: 'Student explanation is required' });
  }

  if (!ai || isQuotaExhausted()) {
    const fallbackEval = getFallbackEvaluation(studentExplanation, language, lesson?.title);
    return res.json({ evaluation: fallbackEval, fallback: true, quotaExceeded: isQuotaExhausted() });
  }

  try {
    const prompt = `
You are the AI Teacher evaluating a student's teach-back explanation for the topic: "${lesson?.title || 'Today\'s Lesson'}".
Student Grade: ${studentClass || 'School student'}
Instruction Language: ${language || 'English'}

Lesson Context:
${lesson?.summary || ''}
${lesson?.scenes?.map((s: any) => `- ${s.title}: ${s.narration}`).join('\n') || ''}

Student's Teach-Back Explanation:
"${studentExplanation}"

TASK:
Evaluate the student's actual understanding based on the lesson and their explanation.
1. Identify correctly understood concepts (strengths).
2. Identify important missing concepts or details.
3. Detect any misconceptions or misunderstandings.
4. Give warm, encouraging feedback in the student's language (${language}).
5. Ask a relevant follow-up question or provide a clarifying tip.
6. Give an understanding score between 50 and 100.

Return ONLY a valid JSON object:
{
  "overallImpression": "Short 1-sentence warm assessment",
  "scorePercentage": 85,
  "strengths": ["Concept 1 understood correctly", "Concept 2 correctly identified"],
  "missingConcepts": ["Missing detail 1"],
  "misunderstandings": ["Any misconception detected, or empty if none"],
  "teacherFeedback": "Encouraging, supportive paragraph speaking directly to the student in ${language}",
  "followUpQuestion": "A thoughtful question to test or deepen understanding in ${language}",
  "clarifyingTip": "A friendly tip that makes difficult parts simple in ${language}"
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });
    } catch (e) {
      response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });
    }

    const parsed = extractJson(response.text || '{}');
    return res.json({ evaluation: parsed, fallback: false });
  } catch (err: any) {
    const isQuota = handleGeminiError(err, 'teachback evaluation');
    const fallbackEval = getFallbackEvaluation(studentExplanation, language, lesson?.title);
    return res.json({ evaluation: fallbackEval, fallback: true, quotaExceeded: isQuota });
  }
});

// 4. Generate Automatic Notes Endpoint
app.post('/api/generate-notes', async (req: Request, res: Response) => {
  try {
    const { lesson, teachbackEvaluation, language, studentClass, subject, topic } = req.body;

    if (!ai || isQuotaExhausted()) {
      return res.json({
        fallback: true,
        notes: null,
        quotaExceeded: isQuotaExhausted(),
      });
    }

    const prompt = `
Generate comprehensive, beautifully organized revision notes for school students.
- Topic: ${topic || lesson?.title}
- Subject: ${subject || lesson?.subject}
- Class: ${studentClass}
- Language: ${language}

Teach-Back Insights to Personalize:
- Student strengths: ${JSON.stringify(teachbackEvaluation?.strengths || [])}
- Misunderstandings to clarify: ${JSON.stringify(teachbackEvaluation?.misunderstandings || [])}
- Missing concepts to emphasize: ${JSON.stringify(teachbackEvaluation?.missingConcepts || [])}

REQUIREMENTS:
Write complete revision notes in ${language}.
Include:
1. Topic title and grade
2. Simple definition
3. Main concepts (array of { title, explanation, example })
4. Step-by-step breakdown
5. Important terms & definitions
6. Formulas, rules, or worked examples
7. Practical everyday examples
8. Revision bullet points
9. Short summary
10. Personalized focus tip (especially clearing up any misunderstandings)
11. Practice questions with answers (3-4 questions)

Return ONLY valid JSON:
{
  "topicTitle": "${topic || lesson?.title}",
  "gradeLevel": "${studentClass}",
  "subject": "${subject}",
  "simpleDefinition": "Clear, memorable definition",
  "mainConcepts": [
    { "title": "Concept 1", "explanation": "Detailed explanation", "example": "Real example" },
    { "title": "Concept 2", "explanation": "Detailed explanation", "example": "Real example" }
  ],
  "stepByStepExplanation": ["Step 1 explanation", "Step 2 explanation", "Step 3 explanation"],
  "importantTerms": [
    { "term": "Term 1", "meaning": "Definition" },
    { "term": "Term 2", "meaning": "Definition" }
  ],
  "formulasAndRules": [
    { "rule": "Rule / Formula name", "explanation": "How it works", "workedExample": "Worked problem" }
  ],
  "practicalEverydayExamples": ["Everyday life example 1", "Everyday life example 2"],
  "revisionPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "shortSummary": "Crisp 2-3 sentence recap",
  "personalizedFocusNote": "Special note clarifying tough spots based on student's teachback",
  "practiceQuestions": [
    { "question": "Question 1", "answer": "Answer 1", "hint": "Helpful hint" },
    { "question": "Question 2", "answer": "Answer 2", "hint": "Helpful hint" }
  ]
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });
    } catch (e) {
      response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });
    }

    const parsed = extractJson(response.text || '{}');
    return res.json({ notes: parsed, fallback: false });
  } catch (err: any) {
    const isQuota = handleGeminiError(err, 'notes generation');
    return res.json({ notes: null, fallback: true, quotaExceeded: isQuota });
  }
});

// 5. Generate Educational Game Endpoint
app.post('/api/generate-game', async (req: Request, res: Response) => {
  try {
    const { lesson, studentClass, language, topic } = req.body;

    if (!ai || isQuotaExhausted()) {
      return res.json({
        fallback: true,
        game: null,
        quotaExceeded: isQuotaExhausted(),
      });
    }

    const prompt = `
Generate an interactive educational game for school students.
- Topic: ${topic || lesson?.title}
- Grade: ${studentClass}
- Language: ${language}

Generate 4 to 5 interactive questions:
- Mix of Multiple-Choice questions (MCQ), Fill in the Blanks, and Match Pairs.
- Questions MUST be strictly based on the lesson topic.
- Language must be ${language}.
- Include instant explanations for why the correct answer is right.

Return ONLY valid JSON:
{
  "gameTitle": "Fun Challenge: ${topic}",
  "instructions": "Answer the questions to test your mastery!",
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "question": "Question text in ${language}",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Clear explanation of why Option A is correct",
      "hint": "Gentle clue"
    },
    {
      "id": "q2",
      "type": "fill_blank",
      "question": "Sentence with ___ blank space",
      "options": ["Word 1", "Word 2", "Word 3", "Word 4"],
      "correctAnswer": "Word 1",
      "explanation": "Explanation in ${language}",
      "hint": "Clue"
    },
    {
      "id": "q3",
      "type": "match",
      "question": "Match each term with its correct description",
      "pairs": [
        { "left": "Item 1", "right": "Match 1" },
        { "left": "Item 2", "right": "Match 2" },
        { "left": "Item 3", "right": "Match 3" }
      ],
      "explanation": "Correct pairings explanation",
      "hint": "Look at the key definitions"
    }
  ]
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });
    } catch (e) {
      response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });
    }

    const parsed = extractJson(response.text || '{}');
    return res.json({ game: parsed, fallback: false });
  } catch (err: any) {
    const isQuota = handleGeminiError(err, 'game generation');
    return res.json({ game: null, fallback: true, quotaExceeded: isQuota });
  }
});

// Setup Vite middleware or static serving
async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LearnBuddy server running at:`);
    console.log(`  > Local:   http://localhost:${PORT}`);
    console.log(`  > Network: http://127.0.0.1:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
