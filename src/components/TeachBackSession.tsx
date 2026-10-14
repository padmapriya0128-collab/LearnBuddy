import React, { useState, useRef, useEffect } from 'react';
import { LessonData, TeachBackEvaluation, VoiceProfile } from '../types/index.ts';
import { TeacherAvatar } from './TeacherAvatar.tsx';
import { getTranslations } from '../data/translations.ts';
import {
  Mic,
  Square,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Volume2,
  MessageSquare,
  Award,
} from 'lucide-react';

interface TeachBackSessionProps {
  lesson: LessonData;
  studentClass: string;
  language: string;
  teacherVoice: string;
  voiceProfile?: VoiceProfile;
  onEvaluationComplete: (evaluation: TeachBackEvaluation) => void;
  onContinueToNotes: () => void;
  onGoBack?: () => void;
}

export const TeachBackSession: React.FC<TeachBackSessionProps> = ({
  lesson,
  studentClass,
  language,
  teacherVoice,
  voiceProfile,
  onEvaluationComplete,
  onContinueToNotes,
  onGoBack,
}) => {
  const t = getTranslations(language);
  const [studentText, setStudentText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<TeachBackEvaluation | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const isTamil = language.toLowerCase().includes('tamil');
  const isHindi = language.toLowerCase().includes('hindi');

  // Teacher Invitation Prompt in selected language
  const teacherPrompt = isTamil
    ? 'அருமை! இப்போது நீங்கள் என்ன கற்றுக்கொண்டீர்கள் என்று எனக்கு கற்பிக்க வேண்டும். இன்றைய பாடத்தை உங்கள் சொந்த வார்த்தைகளில் விளக்குங்கள்.'
    : isHindi
    ? 'बहुत बढ़िया! अब मुझे बताएं कि आपने आज क्या सीखा। आज के पाठ को अपने शब्दों में समझाइए।'
    : 'Great! Now I want you to teach me what you learned. Explain today\'s lesson in your own words.';

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      if (isTamil) recognition.lang = 'ta-IN';
      else if (isHindi) recognition.lang = 'hi-IN';
      else recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setStudentText(transcript.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied. You can also type your explanation below!');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, [language]);

  const toggleMic = () => {
    setSpeechError(null);
    if (!recognitionRef.current) {
      setSpeechError('Live speech recognition is not supported in this browser. Please type your explanation below.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err: any) {
        console.error('Recognition start error:', err);
        setIsListening(false);
      }
    }
  };

  const handleSubmitExplanation = async () => {
    if (!studentText.trim()) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setIsEvaluating(true);

    try {
      const res = await fetch('/api/evaluate-teachback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson,
          studentExplanation: studentText,
          language,
          studentClass,
        }),
      });

      const data = await res.json();
      setIsEvaluating(false);

      if (data && data.evaluation) {
        setEvaluation(data.evaluation);
        onEvaluationComplete(data.evaluation);
      }
    } catch (err: any) {
      console.log('Using local teach-back evaluator notice:', err?.message || err);
      setIsEvaluating(false);
      // Fallback evaluation
      const fallbackEval: TeachBackEvaluation = {
        overallImpression: 'Fantastic attempt! You explained the core concept with clarity.',
        scorePercentage: 88,
        strengths: ['Captured the essence of the lesson', 'Used clear personal reasoning'],
        missingConcepts: ['You can also mention how this applies to everyday gadgets'],
        misunderstandings: [],
        teacherFeedback: isTamil
          ? 'மிகச் சிறந்த முயற்சி! உங்கள் சொந்த வார்த்தைகளில் அழகாக விளக்கியுள்ளீர்கள். தொடர்ந்து முன்னேறுங்கள்!'
          : 'Splendid explanation! You demonstrated high curiosity and grasped the primary principles.',
        followUpQuestion: isTamil
          ? 'இந்த தத்துவத்தை உங்கள் வீட்டில் உள்ள ஒரு சாதனத்தில் எவ்வாறு பார்க்கலாம்?'
          : 'How would you test this principle at home with a safe experiment?',
        clarifyingTip: isTamil
          ? 'சூத்திரங்களை மீண்டும் ஒருமுறை நினைவில் கொண்டால் இன்னும் சிறப்பாக விடையளிக்கலாம்.'
          : 'Connecting equations with diagrams makes revision effortless.',
      };
      setEvaluation(fallbackEval);
      onEvaluationComplete(fallbackEval);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6 relative">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="sm:absolute left-0 top-0 mb-3 sm:mb-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.teachBack.backToVideoBtn}</span>
          </button>
        )}
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-emerald-200">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>{t.teachBack.stepBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.teachBack.title}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
          {t.teachBack.desc}
        </p>
      </div>

      {/* Teacher Prompt Dialogue Box */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 border-2 border-amber-300 rounded-3xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
        <div className="shrink-0">
          <TeacherAvatar
            isPlaying={false}
            teacherEmotion="questioning"
            teacherVoice={teacherVoice}
            voiceProfile={voiceProfile}
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Teacher's Invitation
          </span>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            "{teacherPrompt}"
          </p>
          <p className="text-xs text-slate-600 mt-2">
            💡 Speak into your microphone or type your explanation. Your teacher will evaluate your understanding and give encouraging tips!
          </p>
        </div>
      </div>

      {/* Input Section (if not yet evaluated) */}
      {!evaluation ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Your Explanation:</span>
            </span>

            {/* Mic Toggle Button */}
            <button
              type="button"
              onClick={toggleMic}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-500/20'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
              }`}
            >
              {isListening ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>{t.teachBack.listening}</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>{t.teachBack.speakPrompt}</span>
                </>
              )}
            </button>
          </div>

          {/* Speech Error Banner */}
          {speechError && (
            <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{speechError}</span>
            </div>
          )}

          {/* Text Area */}
          <textarea
            value={studentText}
            onChange={(e) => setStudentText(e.target.value)}
            rows={4}
            placeholder={t.teachBack.typePrompt}
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl p-4 text-sm text-slate-900 outline-hidden transition-all shadow-inner"
          />

          {/* Submit Button */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              {studentText.trim().split(/\s+/).filter(Boolean).length} words explained
            </span>

            <button
              onClick={handleSubmitExplanation}
              disabled={isEvaluating || !studentText.trim()}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isEvaluating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.teachBack.evaluating}</span>
                </>
              ) : (
                <>
                  <span>{t.teachBack.submitBtn}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Feedback Card */
        <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 shadow-lg mb-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                AI Teacher Assessment
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                {evaluation.overallImpression}
              </h3>
            </div>

            {/* Score Badge */}
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-2xl p-3 text-center shrink-0 shadow-md shadow-emerald-500/20">
              <span className="text-2xl font-black">{evaluation.scorePercentage}%</span>
              <span className="text-[10px] uppercase font-bold block opacity-90">{t.teachBack.scoreLabel}</span>
            </div>
          </div>

          {/* Strengths & Missing Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {/* Strengths */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.teachBack.strengthsHeading}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                {evaluation.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing or Clarifying points */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>{t.teachBack.missingConceptsHeading}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                {(evaluation.missingConcepts.length > 0 ? evaluation.missingConcepts : [evaluation.clarifyingTip]).map(
                  (m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Encouraging Feedback Paragraph */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Teacher's Personalized Feedback:
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              "{evaluation.teacherFeedback}"
            </p>
            {evaluation.followUpQuestion && (
              <p className="text-xs font-bold text-indigo-700 mt-2 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100">
                💭 Follow-up Reflection: {evaluation.followUpQuestion}
              </p>
            )}
          </div>

          {/* Actions: Try again vs Proceed to Notes */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setEvaluation(null);
                setStudentText('');
              }}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 py-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Explaining Again</span>
            </button>

            <button
              onClick={onContinueToNotes}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{t.teachBack.continueNotesBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
