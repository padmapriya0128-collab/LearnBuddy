import React, { useState } from 'react';
import { TopicItem, SubjectItem } from '../types/index.ts';
import { getTopicsForClassAndSubject, TOPICS } from '../data/curriculum.ts';
import { getTranslations, formatString } from '../data/translations.ts';
import {
  BookOpen,
  Play,
  Sparkles,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  ArrowLeft,
  PlusCircle,
} from 'lucide-react';

interface TopicSelectionProps {
  studentClass: string;
  selectedSubject: SubjectItem;
  language: string;
  onStartLearning: (topicTitle: string, topicItem?: TopicItem) => void;
  onGoBack?: () => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({
  studentClass,
  selectedSubject,
  language,
  onStartLearning,
  onGoBack,
}) => {
  const availableTopics = getTopicsForClassAndSubject(studentClass, selectedSubject.id);
  // If specific filter returned none, fall back to any topic for the subject or all topics
  const topicsToDisplay =
    availableTopics.length > 0
      ? availableTopics
      : TOPICS.filter((t) => t.subjectId === selectedSubject.id).length > 0
      ? TOPICS.filter((t) => t.subjectId === selectedSubject.id)
      : TOPICS.slice(0, 4);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topicsToDisplay[0]?.id || '');

  const t = getTranslations(language);
  const isTamil = language.toLowerCase().includes('tamil');
  const isHindi = language.toLowerCase().includes('hindi');

  const subjectDisplayName = isTamil
    ? selectedSubject.tamilName
    : isHindi
    ? selectedSubject.hindiName
    : selectedSubject.name;

  const filteredTopics = topicsToDisplay.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tamilTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onStartLearning(customTopic.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8 relative">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="sm:absolute left-0 top-0 mb-3 sm:mb-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.topicSelection.backBtn}</span>
          </button>
        )}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-purple-200">
          <BookOpen className="w-4 h-4 text-purple-700" />
          <span>{formatString(t.topicSelection.stepBadge, { subject: subjectDisplayName })}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.topicSelection.title}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
          {t.topicSelection.desc}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={formatString(t.topicSelection.searchPlaceholder, { subject: subjectDisplayName })}
          className="w-full bg-white border border-slate-200 focus:border-purple-500 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 shadow-xs outline-hidden transition-all"
        />
      </div>

      {/* Topics List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filteredTopics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          const displayTitle = isTamil ? topic.tamilTitle : isHindi ? topic.hindiTitle : topic.title;

          return (
            <div
              key={topic.id}
              className={`p-5 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-purple-600 bg-purple-50/60 shadow-lg shadow-purple-500/10 ring-2 ring-purple-400/30'
                  : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    {topic.chapter}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Class {topic.minClass}-{topic.maxClass}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {displayTitle}
                </h3>
                {isTamil && <p className="text-xs text-slate-500 mt-0.5 font-medium">{topic.title}</p>}

                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {topic.description}
                </p>
              </div>

              {/* Start Learning Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {t.topicSelection.interactiveBadge || 'Interactive Lesson'}
                </span>

                <button
                  type="button"
                  onClick={() => onStartLearning(displayTitle, topic)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white font-bold text-xs rounded-full shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.topicSelection.startLearningBtn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Option to type custom topic from student's own textbook */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 mb-8">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <PlusCircle className="w-4 h-4 text-amber-600" />
          <span>{t.topicSelection.customTopicHeading}</span>
        </h4>
        <form onSubmit={handleStartCustom} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder={t.topicSelection.customTopicPlaceholder}
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 outline-hidden focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={!customTopic.trim()}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{t.topicSelection.teachTopicBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
