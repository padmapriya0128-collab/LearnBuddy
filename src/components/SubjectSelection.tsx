import React, { useState } from 'react';
import { SubjectItem } from '../types/index.ts';
import { getSubjectsForClass } from '../data/curriculum.ts';
import { getTranslations, formatString } from '../data/translations.ts';
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Zap,
  Atom,
  Dna,
  Globe,
  Feather,
  Cpu,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react';

interface SubjectSelectionProps {
  studentClass: string;
  selectedSubject: string;
  language: string;
  onSelectSubject: (subject: SubjectItem) => void;
  onContinue: () => void;
  onGoBack?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  FlaskConical,
  Zap,
  Atom,
  Dna,
  Globe,
  BookOpen,
  Feather,
  Cpu,
};

export const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  studentClass,
  selectedSubject,
  language,
  onSelectSubject,
  onContinue,
  onGoBack,
}) => {
  const subjects = getSubjectsForClass(studentClass);
  const [currentSelected, setCurrentSelected] = useState<string>(
    selectedSubject || (subjects[0]?.name ?? 'Mathematics')
  );

  const t = getTranslations(language);
  const isTamil = language.toLowerCase().includes('tamil');
  const isHindi = language.toLowerCase().includes('hindi');

  const handleSubjectClick = (subj: SubjectItem) => {
    setCurrentSelected(subj.name);
    onSelectSubject(subj);
  };

  const selectedSubjObj = subjects.find((s) => s.name === currentSelected);
  const selectedDisplayName = isTamil
    ? selectedSubjObj?.tamilName || currentSelected
    : isHindi
    ? selectedSubjObj?.hindiName || currentSelected
    : currentSelected;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-blue-200">
          <BookOpen className="w-4 h-4 text-blue-700" />
          <span>{formatString(t.subjectSelection.stepBadge, { studentClass })}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.subjectSelection.title}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
          {formatString(t.subjectSelection.desc, { studentClass })}
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {subjects.map((subj) => {
          const isSelected = currentSelected === subj.name;
          const IconComp = ICON_MAP[subj.icon] || BookOpen;

          return (
            <button
              key={subj.id}
              type="button"
              onClick={() => handleSubjectClick(subj)}
              className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 shadow-lg shadow-blue-500/15 scale-102 ring-2 ring-blue-400/30'
                  : 'border-slate-200/90 bg-white hover:border-blue-300 hover:bg-blue-50/30 hover:scale-101'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${subj.color} text-white flex items-center justify-center shadow-md shadow-slate-300/40`}
                >
                  <IconComp className="w-6 h-6" />
                </div>
                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    ✓
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {isTamil ? subj.tamilName : isHindi ? subj.hindiName : subj.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {isTamil ? subj.name : isHindi ? subj.name : `${subj.tamilName} / ${subj.hindiName}`}
                </p>
              </div>

              <span className="text-[10px] font-semibold text-slate-400 mt-4 block">
                {t.subjectSelection.standardCurriculum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Continue Card */}
      <div className="bg-blue-500/10 border border-blue-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {formatString(t.subjectSelection.selectedLabel, { subject: selectedDisplayName })}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            {t.subjectSelection.proceedMsg}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.subjectSelection.backBtn}</span>
            </button>
          )}

          <button
            onClick={onContinue}
            className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.subjectSelection.continueBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
