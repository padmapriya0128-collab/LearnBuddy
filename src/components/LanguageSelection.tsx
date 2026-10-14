import React, { useState } from 'react';
import { SpeakingStyle } from '../types/index.ts';
import { Globe, ArrowRight, ArrowLeft, MessageSquare, Check, Sparkles, Languages } from 'lucide-react';
import { getTranslations } from '../data/translations.ts';

interface LanguageSelectionProps {
  selectedLanguage: string;
  selectedSpeakingStyle: SpeakingStyle;
  onSelectLanguage: (language: string, style: SpeakingStyle) => void;
  onContinue: () => void;
  onGoBack?: () => void;
}

interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
  badge: string;
  availableStyles: Array<{ id: SpeakingStyle; label: string; sample: string }>;
}

const LANGUAGES: LanguageOption[] = [
  {
    id: 'Tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    badge: 'Popular',
    availableStyles: [
      {
        id: 'conversational_tamil',
        label: 'Natural Conversational Tamil (இயல்பான தமிழ்)',
        sample: 'வணக்கம் மாணவரே! இன்று நாம் இந்த பாடத்தை மிக சுலபமாக கற்க போகிறோம்.',
      },
      {
        id: 'tanglish',
        label: 'Tamil-English Mixed (Tanglish)',
        sample: 'Hello friends! இன்றைக்கு இந்த topic-ஐ step-by-step explore பண்ணலாம்.',
      },
      {
        id: 'formal_tamil',
        label: 'Formal Literary Tamil (செந்தமிழ்)',
        sample: 'அன்புடையீர்! இன்றைய வகுப்பில் நாம் இப்பாடத்தின் அடிப்படைக் கருத்துகளைக் காண்போம்.',
      },
    ],
  },
  {
    id: 'English',
    name: 'English',
    nativeName: 'English',
    badge: 'Global',
    availableStyles: [
      {
        id: 'standard_english',
        label: 'Standard Friendly English',
        sample: 'Hello! Today we are going to explore this fascinating lesson step-by-step.',
      },
    ],
  },
  {
    id: 'Hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    badge: 'Popular',
    availableStyles: [
      {
        id: 'conversational_hindi',
        label: 'Conversational Hindi (सरल हिन्दी)',
        sample: 'नमस्ते! आज हम इस विषय को बहुत ही आसान और मजेदार तरीके से समझेंगे।',
      },
      {
        id: 'hinglish',
        label: 'Hindi-English Mixed (Hinglish)',
        sample: 'Hello dosto! Aaj hum is topic ke main concepts step-by-step cover karenge.',
      },
    ],
  },
  {
    id: 'Telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    badge: 'Regional',
    availableStyles: [
      {
        id: 'standard_english',
        label: 'Conversational Telugu (సులభమైన తెలుగు)',
        sample: 'నమస్కారం! ఈ రోజు మనం ఈ పాఠాన్ని చాలా సులభంగా నేర్చుకుందాం.',
      },
    ],
  },
  {
    id: 'Malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    badge: 'Regional',
    availableStyles: [
      {
        id: 'standard_english',
        label: 'Conversational Malayalam (ലളിതമായ മലയാളം)',
        sample: 'നമസ്കാരം! ഇന്ന് നമ്മൾ ഈ വിഷയം വളരെ എളുപ്പത്തിൽ പഠിക്കാൻ പോകുന്നു.',
      },
    ],
  },
  {
    id: 'Kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    badge: 'Regional',
    availableStyles: [
      {
        id: 'standard_english',
        label: 'Conversational Kannada (ಸರಳ ಕನ್ನಡ)',
        sample: 'ನಮಸ್ಕಾರ! ಇಂದು ನಾವು ಈ ಪಾಠವನ್ನು ಸುಲಭವಾಗಿ ಕಲಿಯೋಣ.',
      },
    ],
  },
];

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  selectedSpeakingStyle,
  onSelectLanguage,
  onContinue,
  onGoBack,
}) => {
  const [currentLang, setCurrentLang] = useState<string>(selectedLanguage || 'Tamil');
  const [currentStyle, setCurrentStyle] = useState<SpeakingStyle>(
    selectedSpeakingStyle || 'conversational_tamil'
  );

  const activeLangObj = LANGUAGES.find((l) => l.id === currentLang) || LANGUAGES[0];
  const t = getTranslations(currentLang);

  const handleLangChange = (langId: string) => {
    setCurrentLang(langId);
    const langObj = LANGUAGES.find((l) => l.id === langId) || LANGUAGES[0];
    const defaultStyle = langObj.availableStyles[0].id;
    setCurrentStyle(defaultStyle);
    onSelectLanguage(langId, defaultStyle);
  };

  const handleStyleChange = (styleId: SpeakingStyle) => {
    setCurrentStyle(styleId);
    onSelectLanguage(currentLang, styleId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-emerald-200">
          <Globe className="w-4 h-4 text-emerald-700" />
          <span>{t.languageSelection.stepBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.languageSelection.title}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
          {t.languageSelection.desc}
        </p>
      </div>

      {/* Primary Language Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-8">
        {LANGUAGES.map((lang) => {
          const isSelected = currentLang === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => handleLangChange(lang.id)}
              className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-lg shadow-emerald-500/15 scale-102 ring-2 ring-emerald-400/30'
                  : 'border-slate-200/90 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 hover:scale-101'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lang.name}</span>
                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    ✓
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {lang.badge}
                  </span>
                )}
              </div>
              <div className="text-xl font-extrabold text-slate-900">{lang.nativeName}</div>
            </button>
          );
        })}
      </div>

      {/* Speaking Style Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            {t.languageSelection.stylesHeading} {activeLangObj.name} ({activeLangObj.nativeName})
          </h3>
        </div>

        <div className="space-y-3">
          {activeLangObj.availableStyles.map((style) => {
            const isStyleSelected = currentStyle === style.id;
            return (
              <label
                key={style.id}
                onClick={() => handleStyleChange(style.id)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isStyleSelected
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-400/30'
                    : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50/70'
                }`}
              >
                <input
                  type="radio"
                  name="speaking_style"
                  checked={isStyleSelected}
                  onChange={() => handleStyleChange(style.id)}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm text-slate-900">{style.label}</div>
                  <div className="text-xs text-slate-600 italic mt-1 bg-white/80 p-2 rounded-xl border border-slate-100">
                    "{style.sample}"
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Confirmation & Continue */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-emerald-950">
            {currentLang === 'Tamil' ? 'கற்பிக்கத் தயார்:' : currentLang === 'Hindi' ? 'पढ़ाने के लिए तैयार:' : 'Ready to teach in:'} <span className="text-emerald-700">{activeLangObj.name} ({currentStyle})</span>
          </h4>
          <p className="text-xs text-emerald-800 mt-0.5">
            {currentLang === 'Tamil' ? 'உங்கள் ஏஐ ஆசிரியர் இந்த நடையிலேயே பாடங்களை நடத்தி சோதிப்பார்.' : currentLang === 'Hindi' ? 'एआई शिक्षक इसी शैली में पाठ पढ़ाएंगे और मूल्यांकन करेंगे।' : 'The AI teacher will teach and assess exclusively in this preferred style.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.languageSelection.backBtn}</span>
            </button>
          )}

          <button
            onClick={onContinue}
            className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.languageSelection.continueBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
