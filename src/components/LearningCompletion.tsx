import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, CheckCircle2, ArrowRight, ArrowLeft, Award, Sparkles, BookOpen } from 'lucide-react';
import { TeacherAvatar } from './TeacherAvatar.tsx';
import { VoiceProfile } from '../types/index.ts';
import { getTranslations } from '../data/translations.ts';

interface LearningCompletionProps {
  topicTitle: string;
  studentClass: string;
  language: string;
  teacherVoice: string;
  voiceProfile?: VoiceProfile;
  gameScore: { score: number; total: number; percentage: number };
  onFinish: () => void;
  onGoBack?: () => void;
}

export const LearningCompletion: React.FC<LearningCompletionProps> = ({
  topicTitle,
  studentClass,
  language,
  teacherVoice,
  voiceProfile,
  gameScore,
  onFinish,
  onGoBack,
}) => {
  const t = getTranslations(language);

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const isTamil = language.toLowerCase().includes('tamil');
  const isHindi = language.toLowerCase().includes('hindi');

  const teacherMessage = isTamil
    ? `வாழ்த்துகள்! நீங்கள் "${topicTitle}" பாடத்தை வெற்றிகரமாக முடித்துவிட்டீர்கள். நீங்கள் விளக்கிய விதமும், விளையாட்டில் பெற்ற மதிப்பெண்களும் உங்கள் தீவிர உழைப்பைக் காட்டுகிறது. தொடர்ந்து படியுங்கள்!`
    : isHindi
    ? `बधाई हो! आपने "${topicTitle}" पाठ को सफलतापूर्वक पूरा कर लिया है। आपका प्रयास और स्कोर दोनों बहुत शानदार हैं। ऐसे ही आगे बढ़ते रहें!`
    : `Outstanding achievement! You have thoroughly mastered "${topicTitle}". From understanding the visual lesson to teaching it back in your own words, you demonstrated real mastery today!`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      {/* Trophy / Star badge */}
      <div className="relative inline-block mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 mx-auto flex items-center justify-center text-white shadow-xl shadow-amber-500/25">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Main Announcement */}
      <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
        {t.completion.title}
      </h1>
      <p className="text-sm sm:text-base font-semibold text-amber-700 mb-6">
        {studentClass} • {topicTitle}
      </p>

      {/* Score and Stats Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-3 gap-3 divide-x divide-slate-100 mb-6">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
              {gameScore.score}/{gameScore.total}
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t.completion.quizScoreLabel}
            </span>
          </div>

          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">
              {gameScore.percentage}%
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t.completion.accuracyLabel}
            </span>
          </div>

          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-purple-600 block">
              {t.completion.masteredText}
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t.completion.statusLabel}
            </span>
          </div>
        </div>

        {/* Teacher Avatar and Encouraging Message */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="shrink-0">
            <TeacherAvatar
              isPlaying={false}
              teacherEmotion="celebrating"
              teacherVoice={teacherVoice}
              voiceProfile={voiceProfile}
            />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block mb-1">
              {t.completion.teacherCongrats}
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
              "{teacherMessage}"
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.completion.reviewQuizBtn}</span>
          </button>
        )}

        <button
          onClick={onFinish}
          className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{t.completion.finishNextTopicBtn}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
