import React, { useState, useRef, useEffect } from 'react';
import { SpeakingStyle, TeachingStyle, SpeakingSpeed, VoiceProfile } from '../types/index.ts';
import { VoiceRecorderModal } from './VoiceRecorderModal.tsx';
import { getTranslations, formatString } from '../data/translations.ts';
import {
  Volume2,
  Mic,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Gauge,
  GraduationCap,
  Heart,
  CheckCircle2,
  Play,
  RotateCcw,
  Sliders,
} from 'lucide-react';

interface TeacherCustomizationProps {
  selectedVoice: string;
  selectedSpeed: SpeakingSpeed;
  selectedTeachingStyle: TeachingStyle;
  selectedLanguage: string;
  selectedSpeakingStyle: SpeakingStyle;
  voiceProfile?: VoiceProfile;
  onUpdateCustomization: (data: {
    voice: string;
    speed: SpeakingSpeed;
    teachingStyle: TeachingStyle;
    voiceProfile?: VoiceProfile;
  }) => void;
  onContinue: () => void;
  onGoBack?: () => void;
}

interface TeacherVoiceOption {
  id: string;
  name: string;
  persona: string;
  tone: string;
  geminiVoice: 'Kore' | 'Puck' | 'Fenrir' | 'Zephyr';
  badge: string;
  avatarIcon: string;
}

const PREBUILT_VOICES: TeacherVoiceOption[] = [
  {
    id: 'kore',
    name: 'Miss Ananya',
    persona: 'Friendly School Teacher',
    tone: 'Warm, encouraging, and supportive',
    geminiVoice: 'Kore',
    badge: 'Recommended',
    avatarIcon: '👩‍🏫',
  },
  {
    id: 'puck',
    name: 'Master Arvind',
    persona: 'Energetic Science Mentor',
    tone: 'Dynamic, curious, and engaging',
    geminiVoice: 'Puck',
    badge: 'Energetic',
    avatarIcon: '👨‍🏫',
  },
  {
    id: 'fenrir',
    name: 'Prof. Raman',
    persona: 'Step-by-Step STEM Guide',
    tone: 'Calm, patient, and analytical',
    geminiVoice: 'Fenrir',
    badge: 'Analytical',
    avatarIcon: '🧑‍🔬',
  },
  {
    id: 'zephyr',
    name: 'Ms. Priya',
    persona: 'Gentle Conceptual Guide',
    tone: 'Clear, soft, and soothing',
    geminiVoice: 'Zephyr',
    badge: 'Gentle',
    avatarIcon: '👩‍💼',
  },
];

export const TeacherCustomization: React.FC<TeacherCustomizationProps> = ({
  selectedVoice,
  selectedSpeed,
  selectedTeachingStyle,
  selectedLanguage,
  selectedSpeakingStyle,
  voiceProfile,
  onUpdateCustomization,
  onContinue,
  onGoBack,
}) => {
  const t = getTranslations(selectedLanguage);
  const [currentVoice, setCurrentVoice] = useState<string>(selectedVoice || 'kore');
  const [currentSpeed, setCurrentSpeed] = useState<SpeakingSpeed>(selectedSpeed || 'normal');
  const [currentTeachingStyle, setCurrentTeachingStyle] = useState<TeachingStyle>(
    selectedTeachingStyle || 'friendly'
  );
  const [currentProfile, setCurrentProfile] = useState<VoiceProfile | undefined>(voiceProfile);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        try {
          previewAudioRef.current.pause();
        } catch (e) {}
        previewAudioRef.current = null;
      }
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
    };
  }, []);

  const handleVoiceSelect = (voiceId: string) => {
    setCurrentVoice(voiceId);
    onUpdateCustomization({
      voice: voiceId,
      speed: currentSpeed,
      teachingStyle: currentTeachingStyle,
      voiceProfile: voiceId === 'my_voice' ? currentProfile : undefined,
    });
  };

  const handleSpeedSelect = (speed: SpeakingSpeed) => {
    setCurrentSpeed(speed);
    onUpdateCustomization({
      voice: currentVoice,
      speed,
      teachingStyle: currentTeachingStyle,
      voiceProfile: currentVoice === 'my_voice' ? currentProfile : undefined,
    });
  };

  const handleTeachingStyleSelect = (style: TeachingStyle) => {
    setCurrentTeachingStyle(style);
    onUpdateCustomization({
      voice: currentVoice,
      speed: currentSpeed,
      teachingStyle: style,
      voiceProfile: currentVoice === 'my_voice' ? currentProfile : undefined,
    });
  };

  const handleVoiceConfigured = (profile: VoiceProfile) => {
    setCurrentProfile(profile);
    setCurrentVoice('my_voice');
    onUpdateCustomization({
      voice: 'my_voice',
      speed: currentSpeed,
      teachingStyle: currentTeachingStyle,
      voiceProfile: profile,
    });
    setIsVoiceModalOpen(false);
  };

  // Live Voice Preview via server TTS or browser SpeechSynthesis
  const handlePlayVoicePreview = async () => {
    if (isPlayingPreview) {
      if (previewAudioRef.current) {
        try {
          previewAudioRef.current.pause();
        } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      setIsPlayingPreview(false);
      return;
    }

    setIsPlayingPreview(true);

    const previewSentence = selectedLanguage.toLowerCase().includes('tamil')
      ? 'வணக்கம்! நான் உங்கள் ஏஐ ஆசிரியர். நாம் ஒன்றாக பாடம் கற்கலாம்!'
      : selectedLanguage.toLowerCase().includes('hindi')
      ? 'नमस्ते! मैं आपका एआई शिक्षक हूँ। चलिए साथ मिलकर पढ़ते हैं!'
      : 'Hello there! I am your AI teacher. Let us learn together today!';

    // If user selected their own voice and has a recorded sample, play their actual voice!
    const userVoiceUrl = currentProfile?.audioDataUrl || currentProfile?.audioSampleBlobUrl;
    if (currentVoice === 'my_voice' && userVoiceUrl) {
      try {
        const audio = new Audio(userVoiceUrl);
        previewAudioRef.current = audio;
        audio.onended = () => {
          setIsPlayingPreview(false);
          previewAudioRef.current = null;
        };
        audio.onerror = () => {
          setIsPlayingPreview(false);
          previewAudioRef.current = null;
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
          await playPromise;
        }
        return;
      } catch (err) {
        setIsPlayingPreview(false);
        return;
      }
    }

    try {
      // Attempt server TTS
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: previewSentence,
          language: selectedLanguage,
          voiceName: currentVoice === 'my_voice' ? 'Kore' : currentVoice,
          speed: currentSpeed,
        }),
      });

      const data = await res.json();
      if (data && data.audio) {
        const audio = new Audio(data.audio);
        previewAudioRef.current = audio;
        audio.onended = () => {
          setIsPlayingPreview(false);
          previewAudioRef.current = null;
        };
        audio.onerror = () => {
          playBrowserSpeech(previewSentence);
        };

        try {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
            await playPromise;
          }
        } catch (err: any) {
          if (
            err?.name === 'AbortError' ||
            err?.message?.includes('interrupted') ||
            err?.message?.includes('pause')
          ) {
            setIsPlayingPreview(false);
            return;
          }
          playBrowserSpeech(previewSentence);
        }
      } else {
        playBrowserSpeech(previewSentence);
      }
    } catch (e) {
      playBrowserSpeech(previewSentence);
    }
  };

  const playBrowserSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setIsPlayingPreview(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        const voices = window.speechSynthesis.getVoices();
        let targetText = text;
        let targetVoice: SpeechSynthesisVoice | null = null;
        let targetLang = 'en-US';

        if (selectedLanguage.toLowerCase().includes('tamil')) {
          const tamilVoice = voices.find((v) => v.lang.startsWith('ta') || v.lang.includes('ta'));
          if (tamilVoice) {
            targetVoice = tamilVoice;
            targetLang = tamilVoice.lang;
          } else {
            setIsPlayingPreview(false);
            return;
          }
        } else if (selectedLanguage.toLowerCase().includes('hindi')) {
          const hindiVoice = voices.find((v) => v.lang.startsWith('hi') || v.lang.includes('hi'));
          if (hindiVoice) {
            targetVoice = hindiVoice;
            targetLang = hindiVoice.lang;
          } else {
            setIsPlayingPreview(false);
            return;
          }
        } else {
          targetVoice = voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
          targetLang = targetVoice ? targetVoice.lang : 'en-US';
        }

        const utterance = new SpeechSynthesisUtterance(targetText);
        if (targetVoice) utterance.voice = targetVoice;
        utterance.lang = targetLang;
        utterance.rate = currentSpeed === 'slow' ? 0.85 : currentSpeed === 'fast' ? 1.25 : 1.0;
        utterance.pitch = currentVoice === 'puck' ? 1.15 : currentVoice === 'fenrir' ? 0.9 : 1.05;
        utterance.onend = () => setIsPlayingPreview(false);
        utterance.onerror = () => setIsPlayingPreview(false);
        window.speechSynthesis.speak(utterance);
      }, 50);
    } catch (err) {
      setIsPlayingPreview(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-amber-200">
          <Sliders className="w-4 h-4 text-amber-700" />
          <span>{t.teacherCustomization.stepBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.teacherCustomization.title}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
          {t.teacherCustomization.desc}
        </p>
      </div>

      {/* 1. Teacher Voice Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>{t.teacherCustomization.voiceHeading}</span>
          </h2>

          {/* Voice Preview Button */}
          <button
            onClick={handlePlayVoicePreview}
            disabled={isPlayingPreview}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            {isPlayingPreview ? (
              <>
                <span className="w-3 h-3 border-2 border-amber-800 border-t-transparent rounded-full animate-spin" />
                <span>{t.teacherCustomization.playingSample}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>{t.teacherCustomization.listenSample}</span>
              </>
            )}
          </button>
        </div>

        {/* Use My Voice Card */}
        <div
          onClick={() => setIsVoiceModalOpen(true)}
          className={`mb-4 p-4 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 ${
            currentVoice === 'my_voice'
              ? 'border-indigo-500 bg-indigo-50/70 shadow-md ring-2 ring-indigo-400/30'
              : 'border-dashed border-indigo-300 bg-gradient-to-r from-indigo-50/40 via-purple-50/30 to-white hover:border-indigo-400'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/25 shrink-0">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-slate-900">{t.teacherCustomization.useMyVoiceTitle}</h3>
                {currentProfile?.isPersonalized ? (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {t.teacherCustomization.profileActiveBadge}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                    {t.teacherCustomization.personalizedStudioBadge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.teacherCustomization.useMyVoiceDesc}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full shadow-xs shrink-0 transition-colors cursor-pointer"
          >
            {currentProfile?.isPersonalized ? t.teacherCustomization.updateVoiceBtn : t.teacherCustomization.recordSampleBtn}
          </button>
        </div>

        {/* Prebuilt AI Voices Grid with Localized Personas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {[
            {
              id: 'kore',
              name: t.teacherCustomization.personas.friendly.name,
              persona: t.teacherCustomization.personas.friendly.persona,
              tone: t.teacherCustomization.personas.friendly.tone,
              badge: 'Recommended',
              avatarIcon: '👩‍🏫',
            },
            {
              id: 'puck',
              name: t.teacherCustomization.personas.energetic.name,
              persona: t.teacherCustomization.personas.energetic.persona,
              tone: t.teacherCustomization.personas.energetic.tone,
              badge: 'Energetic',
              avatarIcon: '👨‍🏫',
            },
            {
              id: 'fenrir',
              name: t.teacherCustomization.personas.analytical.name,
              persona: t.teacherCustomization.personas.analytical.persona,
              tone: t.teacherCustomization.personas.analytical.tone,
              badge: 'Analytical',
              avatarIcon: '🧑‍🔬',
            },
            {
              id: 'zephyr',
              name: t.teacherCustomization.personas.gentle.name,
              persona: t.teacherCustomization.personas.gentle.persona,
              tone: t.teacherCustomization.personas.gentle.tone,
              badge: 'Gentle',
              avatarIcon: '👩‍💼',
            },
          ].map((v) => {
            const isSelected = currentVoice === v.id;
            return (
              <div
                key={v.id}
                onClick={() => handleVoiceSelect(v.id)}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/30'
                    : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
                  {v.avatarIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-sm text-slate-900">{v.name}</h3>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {v.badge}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-amber-800">{v.persona}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{v.tone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Speaking Speed Section */}
      <div className="mb-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Gauge className="w-5 h-5 text-amber-600" />
          <span>{t.teacherCustomization.speedHeading}</span>
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {(['slow', 'normal', 'fast'] as SpeakingSpeed[]).map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => handleSpeedSelect(spd)}
              className={`py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider border-2 transition-all cursor-pointer ${
                currentSpeed === spd
                  ? 'border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300'
              }`}
            >
              {spd === 'slow' && t.teacherCustomization.slowSpeed}
              {spd === 'normal' && t.teacherCustomization.normalSpeed}
              {spd === 'fast' && t.teacherCustomization.fastSpeed}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Teaching Style Section */}
      <div className="mb-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-amber-600" />
          <span>{t.teacherCustomization.styleHeading}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'friendly' as TeachingStyle,
              title: t.teacherCustomization.styles.friendly.title,
              desc: t.teacherCustomization.styles.friendly.desc,
              icon: '🌟',
            },
            {
              id: 'step_by_step' as TeachingStyle,
              title: t.teacherCustomization.styles.stepByStep.title,
              desc: t.teacherCustomization.styles.stepByStep.desc,
              icon: '📐',
            },
            {
              id: 'practical' as TeachingStyle,
              title: t.teacherCustomization.styles.practical.title,
              desc: t.teacherCustomization.styles.practical.desc,
              icon: '🔬',
            },
          ].map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => handleTeachingStyleSelect(style.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                currentTeachingStyle === style.id
                  ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/30'
                  : 'border-slate-200 bg-slate-50 hover:border-amber-300'
              }`}
            >
              <div>
                <span className="text-2xl mb-2 block">{style.icon}</span>
                <h4 className="font-bold text-sm text-slate-900">{style.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{style.desc}</p>
              </div>
              {currentTeachingStyle === style.id && (
                <span className="mt-3 text-[10px] font-bold text-amber-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="bg-amber-500/10 border border-amber-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {formatString(t.teacherCustomization.teacherReady, {
              teacher: currentVoice === 'my_voice' ? t.teacherCustomization.useMyVoiceTitle : (
                currentVoice === 'puck' ? t.teacherCustomization.personas.energetic.name :
                currentVoice === 'fenrir' ? t.teacherCustomization.personas.analytical.name :
                currentVoice === 'zephyr' ? t.teacherCustomization.personas.gentle.name :
                t.teacherCustomization.personas.friendly.name
              )
            })}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            {formatString(t.teacherCustomization.teachingIn, {
              language: selectedLanguage,
              speed: currentSpeed,
            })}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.teacherCustomization.backBtn}</span>
            </button>
          )}

          <button
            onClick={onContinue}
            className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-bold text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.teacherCustomization.continueBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice Recording Modal */}
      <VoiceRecorderModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={selectedLanguage}
        onVoiceConfigured={handleVoiceConfigured}
      />
    </div>
  );
};
