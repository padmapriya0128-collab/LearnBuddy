import React, { useState } from 'react';
import { ALL_CLASSES } from '../data/curriculum.ts';
import { getTranslations, formatString } from '../data/translations.ts';
import { GraduationCap, ArrowRight, ArrowLeft, Sparkles, BookOpen, Star, Award, Compass } from 'lucide-react';

interface StudentDetailsProps {
  selectedClass: string;
  language?: string;
  onSelectClass: (className: string) => void;
  onContinue: () => void;
  onGoBack?: () => void;
}

export const StudentDetails: React.FC<StudentDetailsProps> = ({
  selectedClass,
  language,
  onSelectClass,
  onContinue,
  onGoBack,
}) => {
  const [currentSelected, setCurrentSelected] = useState<string>(selectedClass || 'Class 7');
  const t = getTranslations(language || 'English');

  const handleChoose = (cls: string) => {
    setCurrentSelected(cls);
    onSelectClass(cls);
  };

  // Group classes into stages
  const getGradeStage = (cls: string) => {
    const num = parseInt(cls.replace('Class ', ''), 10);
    if (num <= 5) return { stage: t.studentDetails.stages.primary, badgeColor: 'bg-emerald-100 text-emerald-800', icon: '🌱' };
    if (num <= 8) return { stage: t.studentDetails.stages.middle, badgeColor: 'bg-sky-100 text-sky-800', icon: '🚀' };
    if (num <= 10) return { stage: t.studentDetails.stages.secondary, badgeColor: 'bg-amber-100 text-amber-800', icon: '⚡' };
    return { stage: t.studentDetails.stages.higher, badgeColor: 'bg-purple-100 text-purple-800', icon: '🎓' };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-amber-200">
          <GraduationCap className="w-4 h-4 text-amber-700" />
          <span>{t.studentDetails.stepBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.studentDetails.title}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
          {t.studentDetails.desc}
        </p>
      </div>

      {/* Class Grid: 1 to 12 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 mb-8">
        {ALL_CLASSES.map((cls) => {
          const isSelected = currentSelected === cls;
          const { stage, badgeColor, icon } = getGradeStage(cls);
          return (
            <button
              key={cls}
              type="button"
              onClick={() => handleChoose(cls)}
              className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/70 shadow-lg shadow-amber-500/15 scale-102 ring-2 ring-amber-400/30'
                  : 'border-slate-200/90 bg-white hover:border-amber-300 hover:bg-amber-50/30 hover:scale-101'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{icon}</span>
                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    ✓
                  </span>
                )}
              </div>

              <div className="text-lg font-extrabold text-slate-800 group-hover:text-amber-700 transition-colors">
                {cls}
              </div>

              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${badgeColor}`}>
                {stage}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Class Highlight Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-200 rounded-3xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-amber-500/20 shrink-0">
            {currentSelected.replace('Class ', '')}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {formatString(t.studentDetails.selectedLabel, { class: currentSelected })}
            </h3>
            <p className="text-xs text-slate-600">
              {getGradeStage(currentSelected).stage} — Personalized curriculum & practice ready.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.studentDetails.backBtn}</span>
            </button>
          )}

          <button
            onClick={onContinue}
            className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-bold text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.studentDetails.continueBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
