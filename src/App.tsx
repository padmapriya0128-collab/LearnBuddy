/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FlowStep,
  UserProfile,
  SpeakingStyle,
  TeachingStyle,
  SpeakingSpeed,
  VoiceProfile,
  SubjectItem,
  TopicItem,
  LessonData,
  TeachBackEvaluation,
  NotesData,
  GameData,
} from './types/index.ts';

import {
  getSubjectsForClass,
  getFallbackLesson,
  getFallbackNotes,
  getFallbackGame,
} from './data/curriculum.ts';

import { Navbar } from './components/Navbar.tsx';
import { LoginPage } from './components/LoginPage.tsx';
import { StudentDetails } from './components/StudentDetails.tsx';
import { LanguageSelection } from './components/LanguageSelection.tsx';
import { TeacherCustomization } from './components/TeacherCustomization.tsx';
import { SubjectSelection } from './components/SubjectSelection.tsx';
import { TopicSelection } from './components/TopicSelection.tsx';
import { LessonPlayer } from './components/LessonPlayer.tsx';
import { TeachBackSession } from './components/TeachBackSession.tsx';
import { PersonalizedNotes } from './components/PersonalizedNotes.tsx';
import { EducationalGame } from './components/EducationalGame.tsx';
import { LearningCompletion } from './components/LearningCompletion.tsx';

export default function App() {
  // Navigation & User State
  const [currentStep, setCurrentStep] = useState<FlowStep>('login');
  const [user, setUser] = useState<UserProfile | null>(null);

  // Student Settings State
  const [studentClass, setStudentClass] = useState<string>('Class 7');
  const [language, setLanguage] = useState<string>('Tamil');
  const [speakingStyle, setSpeakingStyle] = useState<SpeakingStyle>('conversational_tamil');
  const [teacherVoice, setTeacherVoice] = useState<string>('kore');
  const [speakingSpeed, setSpeakingSpeed] = useState<SpeakingSpeed>('normal');
  const [teachingStyle, setTeachingStyle] = useState<TeachingStyle>('friendly');
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile | undefined>(undefined);

  // Curriculum & Active Lesson State
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem>(
    getSubjectsForClass('Class 7')[0]
  );
  const [selectedTopicTitle, setSelectedTopicTitle] = useState<string>('Electric Circuits & Current Flow');
  const [activeTopicItem, setActiveTopicItem] = useState<TopicItem | undefined>(undefined);

  // Generated Content State
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [teachbackEvaluation, setTeachbackEvaluation] = useState<TeachBackEvaluation | null>(null);
  const [notes, setNotes] = useState<NotesData | null>(null);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [gameScore, setGameScore] = useState<{ score: number; total: number; percentage: number }>({
    score: 0,
    total: 3,
    percentage: 100,
  });

  // Loading indicator for dynamic AI generation
  const [isGeneratingLesson, setIsGeneratingLesson] = useState<boolean>(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('learnbuddy_student_session');
      if (savedSession) {
        const parsedUser = JSON.parse(savedSession);
        if (parsedUser && parsedUser.name) {
          setUser(parsedUser);
          setCurrentStep('student_details');
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Update available subjects when class changes
  const handleSelectClass = (cls: string) => {
    setStudentClass(cls);
    const subjs = getSubjectsForClass(cls);
    if (subjs.length > 0) {
      setSelectedSubject(subjs[0]);
    }
  };

  // 1. Login Handler
  const handleLoginSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);
    setCurrentStep('student_details');
  };

  // Logout Handler
  const handleLogout = () => {
    try {
      localStorage.removeItem('learnbuddy_student_session');
    } catch (e) {}
    setUser(null);
    setCurrentStep('login');
  };

  // 2. Start Learning Trigger (generates topic lesson)
  const handleStartLearning = async (topicTitle: string, topicItem?: TopicItem) => {
    setSelectedTopicTitle(topicTitle);
    setActiveTopicItem(topicItem);
    setIsGeneratingLesson(true);
    setGenerationStatus('Consulting AI teacher curriculum and creating visual scenes...');

    try {
      const res = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentClass,
          subject: selectedSubject.name,
          topic: topicTitle,
          topicEn: topicItem?.title || topicTitle,
          language,
          speakingStyle,
          teachingStyle,
        }),
      });

      const data = await res.json();

      let targetLesson: LessonData;
      if (data && data.lesson && data.lesson.scenes && data.lesson.scenes.length > 0) {
        targetLesson = data.lesson;
      } else {
        targetLesson = getFallbackLesson(topicTitle, selectedSubject.name, studentClass, language, topicItem);
      }

      setLesson(targetLesson);

      // Pre-generate notes and game in background for lightning fast transitions
      generateNotesAndGame(targetLesson, null);

      setIsGeneratingLesson(false);
      setCurrentStep('lesson_video');
    } catch (err) {
      console.warn('Using template lesson generator:', err);
      const fallback = getFallbackLesson(topicTitle, selectedSubject.name, studentClass, language, topicItem);
      setLesson(fallback);
      generateNotesAndGame(fallback, null);
      setIsGeneratingLesson(false);
      setCurrentStep('lesson_video');
    }
  };

  // Background or on-demand generator for notes and game
  const generateNotesAndGame = async (
    currentLesson: LessonData,
    evalResult: TeachBackEvaluation | null
  ) => {
    try {
      // Generate notes
      const notesPromise = fetch('/api/generate-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson: currentLesson,
          teachbackEvaluation: evalResult,
          language,
          studentClass,
          subject: selectedSubject.name,
          topic: currentLesson.title,
        }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d && d.notes && d.notes.simpleDefinition) {
            const normalized = { ...d.notes };
            if (!normalized.stepStepExplanation && normalized.stepByStepExplanation) {
              normalized.stepStepExplanation = normalized.stepByStepExplanation;
            }
            setNotes(normalized);
          } else {
            setNotes(getFallbackNotes(currentLesson.title, selectedSubject.name, studentClass, language));
          }
        })
        .catch(() => {
          setNotes(getFallbackNotes(currentLesson.title, selectedSubject.name, studentClass, language));
        });

      // Generate game
      const gamePromise = fetch('/api/generate-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson: currentLesson,
          studentClass,
          language,
          topic: currentLesson.title,
        }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d && d.game && d.game.questions && d.game.questions.length > 0) {
            setGameData(d.game);
          } else {
            setGameData(getFallbackGame(currentLesson.title, studentClass, language));
          }
        })
        .catch(() => {
          setGameData(getFallbackGame(currentLesson.title, studentClass, language));
        });

      await Promise.allSettled([notesPromise, gamePromise]);
    } catch (e) {
      setNotes(getFallbackNotes(currentLesson.title, selectedSubject.name, studentClass, language));
      setGameData(getFallbackGame(currentLesson.title, studentClass, language));
    }
  };

  // Teach-back evaluation callback
  const handleTeachbackEvaluated = (evaluation: TeachBackEvaluation) => {
    setTeachbackEvaluation(evaluation);
    if (lesson) {
      generateNotesAndGame(lesson, evaluation);
    }
  };

  // Back Navigation Handler
  const handleGoBack = () => {
    switch (currentStep) {
      case 'student_details':
        handleLogout();
        break;
      case 'language_selection':
        setCurrentStep('student_details');
        break;
      case 'teacher_customization':
        setCurrentStep('language_selection');
        break;
      case 'subject_selection':
        setCurrentStep('teacher_customization');
        break;
      case 'topic_selection':
        setCurrentStep('subject_selection');
        break;
      case 'lesson_video':
        setCurrentStep('topic_selection');
        break;
      case 'teach_back':
        setCurrentStep('lesson_video');
        break;
      case 'automatic_notes':
        setCurrentStep('teach_back');
        break;
      case 'interactive_games':
        setCurrentStep('automatic_notes');
        break;
      case 'completion':
        setCurrentStep('interactive_games');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-amber-50/30 text-slate-800">
      {/* Top Navbar with live breadcrumbs */}
      <Navbar
        currentStep={currentStep}
        user={user}
        studentClass={studentClass}
        language={language}
        subject={selectedSubject?.name}
        topic={selectedTopicTitle}
        onLogout={handleLogout}
        onResetToTopics={() => setCurrentStep('topic_selection')}
        onGoBack={currentStep !== 'login' ? handleGoBack : undefined}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-start">
        {/* Loading Overlay when generating dynamic lesson with Gemini */}
        {isGeneratingLesson && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-amber-200 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4 animate-bounce">
                🎓
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                Your AI Teacher is Preparing the Lesson!
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                {generationStatus || 'Scripting scenes, synchronizing diagrams, and generating voice narration...'}
              </p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 h-full w-2/3 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* 1. Login Page */}
        {currentStep === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}

        {/* 2. Student Details (Class Selection) */}
        {currentStep === 'student_details' && (
          <StudentDetails
            selectedClass={studentClass}
            language={language}
            onSelectClass={handleSelectClass}
            onContinue={() => setCurrentStep('language_selection')}
            onGoBack={handleGoBack}
          />
        )}

        {/* 3. Language Selection */}
        {currentStep === 'language_selection' && (
          <LanguageSelection
            selectedLanguage={language}
            selectedSpeakingStyle={speakingStyle}
            onSelectLanguage={(lang, style) => {
              setLanguage(lang);
              setSpeakingStyle(style);
            }}
            onContinue={() => setCurrentStep('teacher_customization')}
            onGoBack={handleGoBack}
          />
        )}

        {/* 4. Teacher Customization */}
        {currentStep === 'teacher_customization' && (
          <TeacherCustomization
            selectedVoice={teacherVoice}
            selectedSpeed={speakingSpeed}
            selectedTeachingStyle={teachingStyle}
            selectedLanguage={language}
            selectedSpeakingStyle={speakingStyle}
            voiceProfile={voiceProfile}
            onUpdateCustomization={(data) => {
              setTeacherVoice(data.voice);
              setSpeakingSpeed(data.speed);
              setTeachingStyle(data.teachingStyle);
              setVoiceProfile(data.voice === 'my_voice' ? data.voiceProfile : undefined);
            }}
            onContinue={() => setCurrentStep('subject_selection')}
            onGoBack={handleGoBack}
          />
        )}

        {/* 5. Subject Selection */}
        {currentStep === 'subject_selection' && (
          <SubjectSelection
            studentClass={studentClass}
            selectedSubject={selectedSubject?.name}
            language={language}
            onSelectSubject={(subj) => setSelectedSubject(subj)}
            onContinue={() => setCurrentStep('topic_selection')}
            onGoBack={handleGoBack}
          />
        )}

        {/* 6. Topic Selection */}
        {currentStep === 'topic_selection' && (
          <TopicSelection
            studentClass={studentClass}
            selectedSubject={selectedSubject}
            language={language}
            onStartLearning={handleStartLearning}
            onGoBack={handleGoBack}
          />
        )}

        {/* 7. AI Teacher Lesson Video */}
        {currentStep === 'lesson_video' && lesson && (
          <LessonPlayer
            lesson={lesson}
            teacherVoice={teacherVoice}
            voiceProfile={voiceProfile}
            speakingSpeed={speakingSpeed}
            language={language}
            onLessonComplete={() => setCurrentStep('teach_back')}
            onGoBack={handleGoBack}
          />
        )}

        {/* 8. AI Teach-Back Conversation */}
        {currentStep === 'teach_back' && lesson && (
          <TeachBackSession
            lesson={lesson}
            studentClass={studentClass}
            language={language}
            teacherVoice={teacherVoice}
            voiceProfile={voiceProfile}
            onEvaluationComplete={handleTeachbackEvaluated}
            onContinueToNotes={() => setCurrentStep('automatic_notes')}
            onGoBack={handleGoBack}
          />
        )}

        {/* 9. Automatic Notes */}
        {currentStep === 'automatic_notes' && lesson && notes && (
          <PersonalizedNotes
            notes={notes}
            lesson={lesson}
            language={language}
            evaluation={teachbackEvaluation}
            onContinueToGame={() => setCurrentStep('interactive_games')}
            onGoBack={handleGoBack}
          />
        )}

        {/* 10. Interactive Educational Games */}
        {currentStep === 'interactive_games' && (gameData || lesson) && (
          <EducationalGame
            gameData={gameData || getFallbackGame(selectedTopicTitle, studentClass, language)}
            topicTitle={selectedTopicTitle}
            studentClass={studentClass}
            language={language}
            onGameFinished={(scoreResult) => {
              setGameScore(scoreResult);
              setCurrentStep('completion');
            }}
            onGoBack={handleGoBack}
          />
        )}

        {/* 11. Learning Completion */}
        {currentStep === 'completion' && (
          <LearningCompletion
            topicTitle={selectedTopicTitle}
            studentClass={studentClass}
            language={language}
            teacherVoice={teacherVoice}
            voiceProfile={voiceProfile}
            gameScore={gameScore}
            onFinish={() => setCurrentStep('topic_selection')}
            onGoBack={handleGoBack}
          />
        )}
      </main>
    </div>
  );
}
