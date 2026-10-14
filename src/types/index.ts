export type FlowStep =
  | 'login'
  | 'student_details'
  | 'language_selection'
  | 'teacher_customization'
  | 'subject_selection'
  | 'topic_selection'
  | 'lesson_video'
  | 'teach_back'
  | 'automatic_notes'
  | 'interactive_games'
  | 'completion';

export type SpeakingStyle =
  | 'conversational_tamil'
  | 'formal_tamil'
  | 'tanglish'
  | 'standard_english'
  | 'conversational_hindi'
  | 'hinglish';

export type TeachingStyle =
  | 'friendly'
  | 'step_by_step'
  | 'practical';

export type SpeakingSpeed = 'slow' | 'normal' | 'fast';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface VoiceProfile {
  isPersonalized: boolean;
  profileName: string;
  baseVoice: 'Kore' | 'Puck' | 'Fenrir' | 'Zephyr';
  pitch: number; // 0.8 to 1.3
  rate: number; // 0.8 to 1.3
  audioSampleBlobUrl?: string;
  audioDataUrl?: string; // Persistent base64 data URL that never revokes
  confirmedConsent: boolean;
  statusMessage?: string;
  detectedPitchHz?: number;
  timbreBass?: number;
  timbreTreble?: number;
  sceneRecordings?: Record<number, string>; // Scene ID to recorded audio data URL
}

export interface VisualData {
  headline: string;
  diagramType:
    | 'circuit'
    | 'photosynthesis'
    | 'fractions'
    | 'force_motion'
    | 'solar_system'
    | 'cell'
    | 'heart_circulation'
    | 'geometry'
    | 'chemical_bonding'
    | 'concept_diagram';
  labels?: string[];
  steps?: string[];
  highlight?: string;
  formula?: string;
  practicalExample?: string;
  interactiveElements?: Array<{ id: string; label: string; active?: boolean }>;
}

export interface LessonScene {
  id: number;
  title: string;
  conceptKey: string;
  narration: string;
  durationSeconds: number;
  teacherEmotion: 'welcoming' | 'explaining' | 'demonstrating' | 'questioning' | 'celebrating';
  visualType: 'diagram' | 'interactive_simulation' | 'step_calculation' | 'formula_breakdown';
  visualData: VisualData;
}

export interface LessonData {
  title: string;
  gradeLevel: string;
  subject: string;
  language: string;
  summary: string;
  scenes: LessonScene[];
}

export interface TeachBackEvaluation {
  overallImpression: string;
  scorePercentage: number;
  strengths: string[];
  missingConcepts: string[];
  misunderstandings: string[];
  teacherFeedback: string;
  followUpQuestion: string;
  clarifyingTip: string;
}

export interface NoteConcept {
  title: string;
  explanation: string;
  example: string;
}

export interface NoteTerm {
  term: string;
  meaning: string;
}

export interface NoteFormula {
  rule: string;
  explanation: string;
  workedExample: string;
}

export interface PracticeQuestion {
  question: string;
  answer: string;
  hint: string;
}

export interface NotesData {
  topicTitle: string;
  gradeLevel: string;
  subject: string;
  simpleDefinition: string;
  mainConcepts: NoteConcept[];
  stepStepExplanation: string[];
  stepByStepExplanation?: string[];
  importantTerms: NoteTerm[];
  formulasAndRules: NoteFormula[];
  practicalEverydayExamples: string[];
  revisionPoints: string[];
  shortSummary: string;
  personalizedFocusNote: string;
  practiceQuestions: PracticeQuestion[];
}

export type GameQuestionType = 'mcq' | 'fill_blank' | 'match';

export interface GameQuestion {
  id: string;
  type: GameQuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string;
  pairs?: Array<{ left: string; right: string }>;
  explanation: string;
  hint?: string;
}

export interface GameData {
  gameTitle: string;
  instructions: string;
  questions: GameQuestion[];
}

export interface SubjectItem {
  id: string;
  name: string;
  tamilName: string;
  hindiName: string;
  icon: string;
  color: string;
  minClass: number;
  maxClass: number;
}

export interface TopicItem {
  id: string;
  subjectId: string;
  title: string;
  tamilTitle: string;
  hindiTitle: string;
  chapter: string;
  description: string;
  minClass: number;
  maxClass: number;
  diagramType: VisualData['diagramType'];
}
