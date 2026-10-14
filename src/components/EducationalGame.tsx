import React, { useState, useMemo } from 'react';
import { GameData, GameQuestion } from '../types/index.ts';
import { getTranslations, formatString } from '../data/translations.ts';
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Award,
} from 'lucide-react';

interface EducationalGameProps {
  gameData: GameData;
  topicTitle: string;
  studentClass: string;
  language: string;
  onGameFinished: (finalScore: { score: number; total: number; percentage: number }) => void;
  onGoBack?: () => void;
}

export const EducationalGame: React.FC<EducationalGameProps> = ({
  gameData,
  topicTitle,
  studentClass,
  language,
  onGameFinished,
  onGoBack,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, { isCorrect: boolean; answer: string }>>({});

  // Matching game state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [matchNotice, setMatchNotice] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const t = getTranslations(language);
  const currentQ: GameQuestion = gameData.questions[currentIdx] || gameData.questions[0];
  const totalQuestions = gameData.questions.length;

  // Shuffled MCQ options per question (randomized so correct answer is never predictably at position 0)
  const shuffledOptions = useMemo(() => {
    if (!currentQ.options || currentQ.options.length === 0) return [];
    const arr = [...currentQ.options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentIdx, currentQ.id]);

  // Shuffled right-side descriptions for Match questions (randomized so they don't match directly across)
  const shuffledRightDescriptions = useMemo(() => {
    if (!currentQ.pairs || currentQ.pairs.length === 0) return [];
    const arr = currentQ.pairs.map((p) => p.right);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // If it happens to match 1-to-1 in order and length > 1, cycle by 1
    if (arr.length > 1 && arr.every((r, idx) => r === currentQ.pairs![idx].right)) {
      const first = arr.shift()!;
      arr.push(first);
    }
    return arr;
  }, [currentIdx, currentQ.id]);

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption.trim() === (currentQ.correctAnswer || '').trim();
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { isCorrect, answer: selectedOption },
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setSelectedLeft(null);
      setMatchedPairs({});
      setMatchNotice(null);
    } else {
      // Game completed!
      const finalScore = score + (selectedOption === currentQ.correctAnswer ? 1 : 0);
      const percentage = Math.round((finalScore / totalQuestions) * 100);
      onGameFinished({ score: finalScore, total: totalQuestions, percentage });
    }
  };

  const handleMatchClick = (side: 'left' | 'right', text: string) => {
    if (side === 'left') {
      setSelectedLeft(text);
      setMatchNotice(null);
    } else if (side === 'right' && selectedLeft) {
      // Check pair match
      const validPair = currentQ.pairs?.find(
        (p) => p.left === selectedLeft && p.right === text
      );
      if (validPair) {
        setMatchedPairs((prev) => ({ ...prev, [selectedLeft]: text }));
        setSelectedLeft(null);
        setMatchNotice({ message: t.quiz.correctFeedback || '✓ Matched correctly!', type: 'success' });

        // Check if all pairs matched
        const newTotalMatches = Object.keys(matchedPairs).length + 1;
        if (newTotalMatches === (currentQ.pairs?.length || 0)) {
          setIsAnswerSubmitted(true);
          setScore((prev) => prev + 1);
        }
      } else {
        setMatchNotice({ message: t.quiz.incorrectFeedback || '❌ Not quite matching! Try pairing with another item.', type: 'error' });
        setSelectedLeft(null);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6 relative">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="sm:absolute left-0 top-0 mb-3 sm:mb-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.quiz.backToNotesBtn || 'Back to Notes'}</span>
          </button>
        )}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-purple-200">
          <Gamepad2 className="w-4 h-4 text-purple-700" />
          <span>{t.quiz.stepBadge || 'Step 9: Interactive Learning Practice'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {gameData.gameTitle || t.quiz.challengeTitle || `Practice Challenge: ${topicTitle}`}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
          {gameData.instructions || t.quiz.instructions || 'Answer questions to test and reinforce what you just learned!'}
        </p>
      </div>

      {/* Progress & Score Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {formatString(t.quiz.questionCounter || 'Question {current} of {total}', {
              current: currentIdx + 1,
              total: totalQuestions,
            })}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-900">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {formatString(t.quiz.scoreLabel || 'Score: {score}/{total}', {
              score,
              total: totalQuestions,
            })}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 mb-6">
        <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
          {currentQ.type === 'mcq'
            ? t.quiz.mcq || 'Multiple Choice'
            : currentQ.type === 'fill_blank'
            ? t.quiz.fillBlank || 'Fill in the Blank'
            : t.quiz.match || 'Match the Pairs'}
        </span>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
          {currentQ.question}
        </h2>

        {/* MCQ or Fill Blank options with randomized order */}
        {currentQ.type !== 'match' && shuffledOptions && (
          <div className="space-y-3 mb-6">
            {shuffledOptions.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrectAnswer = opt === currentQ.correctAnswer;

              let btnStyle = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 text-slate-800';
              if (isSelected && !isAnswerSubmitted) {
                btnStyle = 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-xs';
              } else if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                } else {
                  btnStyle = 'border-slate-200 opacity-60 text-slate-600';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </span>
                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Match Pairs layout with shuffled right descriptions */}
        {currentQ.type === 'match' && currentQ.pairs && (
          <div className="mb-6">
            {matchNotice && (
              <div
                className={`mb-4 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150 ${
                  matchNotice.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {matchNotice.message}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Left column (Items) */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  {t.quiz.itemsCol || 'Items:'}
                </span>
                {currentQ.pairs.map((p, idx) => {
                  const isMatched = Boolean(matchedPairs[p.left]);
                  const isSelected = selectedLeft === p.left;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleMatchClick('left', p.left)}
                      className={`w-full p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                        isMatched
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-800 opacity-80'
                          : isSelected
                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                      }`}
                    >
                      {p.left} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>

              {/* Right column (Descriptions - Shuffled so they are not directly opposite) */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  {t.quiz.descriptionsCol || 'Descriptions:'}
                </span>
                {shuffledRightDescriptions.map((rightText, idx) => {
                  const isMatched = Object.values(matchedPairs).includes(rightText);
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleMatchClick('right', rightText)}
                      className={`w-full p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                        isMatched
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-800 opacity-80'
                          : selectedLeft
                          ? 'border-purple-300 bg-purple-50/50 hover:border-purple-600 text-purple-900'
                          : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                      }`}
                    >
                      {rightText} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Answer Explanation Banner (after submitting) */}
        {isAnswerSubmitted && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed animate-in fade-in duration-200">
            <h4 className="font-extrabold text-slate-800 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>{t.quiz.explanationLabel || 'Explanation:'}</span>
            </h4>
            <p className="text-slate-700 font-medium">{currentQ.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {currentQ.hint && !isAnswerSubmitted ? `💡 ${t.quiz.hintLabel || 'Hint'}: ${currentQ.hint}` : ''}
          </span>

          {!isAnswerSubmitted && currentQ.type !== 'match' ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              {t.quiz.checkAnswerBtn || 'Check Answer'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{currentIdx < totalQuestions - 1 ? (t.quiz.nextQuestionBtn || 'Next Question') : (t.quiz.completeQuizBtn || 'Complete Lesson')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
