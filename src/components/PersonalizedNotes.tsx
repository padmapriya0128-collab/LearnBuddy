import React, { useState } from 'react';
import { NotesData, LessonData, TeachBackEvaluation } from '../types/index.ts';
import { getTranslations, formatString } from '../data/translations.ts';
import {
  BookOpen,
  Printer,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Bookmark,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  HelpCircle,
  FileText,
} from 'lucide-react';

interface PersonalizedNotesProps {
  notes: NotesData;
  lesson: LessonData;
  language?: string;
  evaluation?: TeachBackEvaluation | null;
  onContinueToGame: () => void;
  onGoBack?: () => void;
}

export const PersonalizedNotes: React.FC<PersonalizedNotesProps> = ({
  notes,
  lesson,
  language,
  evaluation,
  onContinueToGame,
  onGoBack,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const t = getTranslations(language || lesson.language || 'English');

  const handleCopyNotes = () => {
    const textToCopy = `
LEARNBUDDY REVISION NOTES
Topic: ${notes.topicTitle} (${notes.gradeLevel} - ${notes.subject})

DEFINITION:
${notes.simpleDefinition}

MAIN CONCEPTS:
${(notes.mainConcepts || []).map((c) => `• ${c.title}: ${c.explanation}`).join('\n')}

STEP-BY-STEP EXPLANATION:
${(notes.stepStepExplanation || notes.stepByStepExplanation || []).join('\n')}

IMPORTANT TERMS:
${(notes.importantTerms || []).map((t) => `• ${t.term}: ${t.meaning}`).join('\n')}

PRACTICAL EXAMPLES:
${(notes.practicalEverydayExamples || []).join('\n')}

SUMMARY:
${notes.shortSummary || ''}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 px-3.5 py-1 rounded-full text-xs font-bold mb-2 border border-indigo-200">
            <Bookmark className="w-3.5 h-3.5 text-indigo-700" />
            <span>{t.notes.stepBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {notes.topicTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {formatString(t.notes.craftedFor, { grade: notes.gradeLevel, subject: notes.subject })}
          </p>
        </div>

        {/* Action Buttons: Back, Print, Copy, Go to Game */}
        <div className="flex flex-wrap items-center gap-2">
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.notes.backBtn}</span>
            </button>
          )}

          <button
            onClick={handleCopyNotes}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.notes.copiedBtn : t.notes.copyBtn}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.notes.printBtn}</span>
          </button>

          <button
            onClick={onContinueToGame}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>{t.notes.playQuizBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Teachback Personalized Focus Banner (if student had misunderstandings or tips) */}
      {notes.personalizedFocusNote && (
        <div className="mb-6 bg-amber-50 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 flex items-start gap-3 shadow-xs">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
              {t.notes.focusTipHeading}
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 mt-1 font-medium leading-relaxed">
              {notes.personalizedFocusNote}
            </p>
          </div>
        </div>
      )}

      {/* Main Notes Sheet */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
        {/* 1. Simple Definition */}
        <div>
          <h2 className="text-sm font-extrabold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-xs">1</span>
            <span>{t.notes.definition}</span>
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-semibold text-slate-800 leading-relaxed">
            {notes.simpleDefinition}
          </div>
        </div>

        {/* 2. Main Concepts */}
        <div>
          <h2 className="text-sm font-extrabold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-xs">2</span>
            <span>{t.notes.mainConcepts}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {notes.mainConcepts.map((concept, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="font-bold text-sm text-slate-900 mb-1">{concept.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{concept.explanation}</p>
                {concept.example && (
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 inline-block">
                    💡 Example: {concept.example}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Step-by-Step Explanation */}
        <div>
          <h2 className="text-sm font-extrabold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-xs">3</span>
            <span>{t.notes.stepExplanation}</span>
          </h2>
          <div className="space-y-2">
            {(notes.stepStepExplanation || notes.stepByStepExplanation || []).map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-slate-50/70 border border-slate-100 p-3 rounded-xl text-xs text-slate-800 font-medium"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Formulas / Rules with Worked Example (if available) */}
        {notes.formulasAndRules && notes.formulasAndRules.length > 0 && (
          <div>
            <h2 className="text-sm font-extrabold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-xs">4</span>
              <span>{t.notes.formulasAndRules}</span>
            </h2>
            <div className="space-y-3">
              {notes.formulasAndRules.map((rule, idx) => (
                <div key={idx} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                  <h3 className="font-extrabold text-sm text-amber-900 mb-1">{rule.rule}</h3>
                  <p className="text-xs text-slate-700 mb-2">{rule.explanation}</p>
                  <div className="bg-white border border-amber-200 rounded-xl p-3 text-xs font-mono font-bold text-slate-800">
                    ✍️ Worked Problem: {rule.workedExample}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Important Terms & Glossaries */}
        <div>
          <h2 className="text-sm font-extrabold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-xs">5</span>
            <span>{t.notes.importantTerms}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notes.importantTerms.map((term, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="font-extrabold text-xs text-indigo-900 block mb-0.5">{term.term}</span>
                <span className="text-xs text-slate-600">{term.meaning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Practical Everyday Examples */}
        <div>
          <h2 className="text-sm font-extrabold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-xs">6</span>
            <span>{t.notes.practicalExamples}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {notes.practicalEverydayExamples.map((ex, idx) => (
              <div key={idx} className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 font-medium">
                🌱 {ex}
              </div>
            ))}
          </div>
        </div>

        {/* 7. Revision Bullet Points & Summary */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 mb-3">
            {t.notes.summary}
          </h2>
          <ul className="space-y-1.5 text-xs text-slate-200 mb-4 font-medium">
            {notes.revisionPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 italic">
            "{notes.shortSummary}"
          </div>
        </div>

        {/* 8. Practice Questions with Answers */}
        <div>
          <h2 className="text-sm font-extrabold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-xs">8</span>
            <span>{t.notes.practiceQuestions}</span>
          </h2>
          <div className="space-y-3">
            {notes.practiceQuestions.map((q, idx) => {
              const isRevealed = revealedAnswers[idx];
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      Q{idx + 1}: {q.question}
                    </p>
                    <button
                      onClick={() => toggleAnswer(idx)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 shrink-0 cursor-pointer"
                    >
                      {isRevealed ? t.notes.hideAnswer : t.notes.showAnswer}
                    </button>
                  </div>
                  {isRevealed && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl">
                      ✅ {q.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Button to proceed directly to game */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinueToGame}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>{t.notes.playQuizBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
