import React from 'react';
import { FlowStep, UserProfile } from '../types/index.ts';
import { getTranslations } from '../data/translations.ts';
import { BookOpen, GraduationCap, Globe, User, LogOut, Sparkles, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  currentStep: FlowStep;
  user: UserProfile | null;
  studentClass: string;
  language: string;
  subject?: string;
  topic?: string;
  onLogout: () => void;
  onResetToTopics?: () => void;
  onGoBack?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  user,
  studentClass,
  language,
  subject,
  topic,
  onLogout,
  onResetToTopics,
  onGoBack,
}) => {
  const t = getTranslations(language);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Back Button */}
        <div className="flex items-center gap-3">
          {currentStep !== 'login' && onGoBack && (
            <button
              onClick={onGoBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer border border-slate-200"
              title={t.navbar.backBtn}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.navbar.backBtn}</span>
            </button>
          )}

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-extrabold text-xl">
            LB
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                LearnBuddy
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 hidden sm:inline">
                {t.navbar.aiTeacherBadge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">{t.navbar.tagline}</p>
          </div>
        </div>

        {/* Current Context Badges (if logged in and past step 1) */}
        {user && currentStep !== 'login' && (
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
            {studentClass && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <GraduationCap className="w-3.5 h-3.5" />
                {studentClass}
              </span>
            )}
            {language && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Globe className="w-3.5 h-3.5" />
                {language}
              </span>
            )}
            {topic && (
              <button
                onClick={onResetToTopics}
                title={t.navbar.changeTopic}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors max-w-[200px] truncate cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{topic}</span>
              </button>
            )}
          </div>
        )}

        {/* User Profile & Logout */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800">{user.name}</span>
                <span className="text-[10px] text-slate-500">{user.email}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={onLogout}
                title={t.navbar.logoutBtn}
                className="w-8 h-8 rounded-full hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              {t.navbar.studentPortal}
            </span>
          )}
        </div>
      </div>

      {/* Progress Line for the linear flow */}
      {currentStep !== 'login' && (
        <div className="w-full bg-amber-100/60 h-1">
          <div
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 h-1 transition-all duration-300"
            style={{
              width:
                currentStep === 'student_details'
                  ? '15%'
                  : currentStep === 'language_selection'
                  ? '25%'
                  : currentStep === 'teacher_customization'
                  ? '38%'
                  : currentStep === 'subject_selection'
                  ? '50%'
                  : currentStep === 'topic_selection'
                  ? '62%'
                  : currentStep === 'lesson_video'
                  ? '75%'
                  : currentStep === 'teach_back'
                  ? '85%'
                  : currentStep === 'automatic_notes'
                  ? '92%'
                  : currentStep === 'interactive_games'
                  ? '97%'
                  : '100%',
            }}
          />
        </div>
      )}
    </header>
  );
};
