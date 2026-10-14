import React, { useState, useEffect, useRef } from 'react';
import { LessonData, LessonScene, VoiceProfile, SpeakingSpeed } from '../types/index.ts';
import { TeacherAvatar } from './TeacherAvatar.tsx';
import { EducationalVisual } from './EducationalVisual.tsx';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Subtitles,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic,
  Square,
  Trash2,
  Info,
  ListOrdered,
  Lightbulb,
  BookmarkCheck,
  Award,
} from 'lucide-react';

interface LessonPlayerProps {
  lesson: LessonData;
  teacherVoice: string;
  voiceProfile?: VoiceProfile;
  speakingSpeed: SpeakingSpeed;
  language: string;
  onLessonComplete: () => void;
  onGoBack?: () => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  teacherVoice,
  voiceProfile,
  speakingSpeed,
  language,
  onLessonComplete,
  onGoBack,
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [sceneProgress, setSceneProgress] = useState<number>(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [isSceneFinished, setIsSceneFinished] = useState<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [isPlayingCustomVoice, setIsPlayingCustomVoice] = useState<boolean>(false);
  const [speechStatusMessage, setSpeechStatusMessage] = useState<string | null>(null);

  // Direct scene audio recordings recorded by the user
  const [sceneRecordings, setSceneRecordings] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('learnbuddy_custom_voice_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.sceneRecordings || voiceProfile?.sceneRecordings || {};
      }
    } catch (e) {}
    return voiceProfile?.sceneRecordings || {};
  });
  const [isRecordingScene, setIsRecordingScene] = useState<boolean>(false);
  const [sceneRecordDuration, setSceneRecordDuration] = useState<number>(0);
  const sceneMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const sceneAudioChunksRef = useRef<Blob[]>([]);
  const sceneTimerRef = useRef<any>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const customVoiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<any>(null);
  const keepaliveTimerRef = useRef<any>(null);
  const playbackSessionRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(isPlaying);

  const totalScenes = lesson.scenes.length;
  const currentScene: LessonScene = lesson.scenes[currentSceneIdx] || lesson.scenes[0];

  const isTamil = (language || '').toLowerCase().includes('tamil');
  const isHindi = (language || '').toLowerCase().includes('hindi');
  const isCustomVoiceActive = teacherVoice === 'my_voice' && !!voiceProfile?.isPersonalized;

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Clean up all audio, timers, and speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopCurrentAudio();
      if (sceneTimerRef.current) clearInterval(sceneTimerRef.current);
    };
  }, []);

  // When scene changes, trigger the scene logic and generate/play audio
  useEffect(() => {
    setIsSceneFinished(false);
    setShowCompletionModal(false);
    if (isPlaying) {
      playCurrentScene();
    } else {
      stopCurrentAudio();
    }
  }, [currentSceneIdx, isPlaying]);

  const stopCurrentAudio = () => {
    playbackSessionRef.current += 1; // Invalidate any ongoing playback sessions
    if (audioPlayerRef.current) {
      const audio = audioPlayerRef.current;
      audioPlayerRef.current = null;
      audio.onended = null;
      audio.onerror = null;
      audio.ontimeupdate = null;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    }
    if (customVoiceAudioRef.current) {
      const audio = customVoiceAudioRef.current;
      customVoiceAudioRef.current = null;
      audio.onended = null;
      audio.onerror = null;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
      setIsPlayingCustomVoice(false);
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (keepaliveTimerRef.current) {
      clearInterval(keepaliveTimerRef.current);
      keepaliveTimerRef.current = null;
    }
    setIsLoadingAudio(false);
  };

  // Live recording handlers for individual scenes in user's own voice
  const handleStartSceneRecording = async () => {
    try {
      stopCurrentAudio();
      setIsPlaying(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sceneAudioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      sceneMediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) sceneAudioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(sceneAudioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          const updated = { ...sceneRecordings, [currentScene.id]: base64Data };
          setSceneRecordings(updated);
          if (voiceProfile) {
            voiceProfile.sceneRecordings = updated;
          }
          try {
            const saved = localStorage.getItem('learnbuddy_custom_voice_profile');
            const parsed = saved ? JSON.parse(saved) : {};
            parsed.sceneRecordings = updated;
            localStorage.setItem('learnbuddy_custom_voice_profile', JSON.stringify(parsed));
          } catch (e) {}
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecordingScene(true);
      setSceneRecordDuration(0);
      sceneTimerRef.current = setInterval(() => {
        setSceneRecordDuration((p) => p + 1);
      }, 1000);
    } catch (err) {
      console.error('Scene recording mic error:', err);
      alert(isTamil ? 'மைக்ரோஃபோன் அனுமதி தேவைப்படுகிறது.' : 'Microphone permission required to record.');
    }
  };

  const handleStopSceneRecording = () => {
    if (sceneMediaRecorderRef.current && isRecordingScene) {
      sceneMediaRecorderRef.current.stop();
      setIsRecordingScene(false);
      if (sceneTimerRef.current) clearInterval(sceneTimerRef.current);
    }
  };

  const handleRemoveSceneRecording = (sceneId: number) => {
    const updated = { ...sceneRecordings };
    delete updated[sceneId];
    setSceneRecordings(updated);
    if (voiceProfile?.sceneRecordings) {
      delete voiceProfile.sceneRecordings[sceneId];
    }
    try {
      const saved = localStorage.getItem('learnbuddy_custom_voice_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sceneRecordings) {
          delete parsed.sceneRecordings[sceneId];
          localStorage.setItem('learnbuddy_custom_voice_profile', JSON.stringify(parsed));
        }
      }
    } catch (e) {}
  };

  // Play user's actual recorded microphone sample
  const handlePlayUserVoiceSample = () => {
    const audioSample = voiceProfile?.audioDataUrl || voiceProfile?.audioSampleBlobUrl;
    if (!audioSample) return;

    stopCurrentAudio();
    setIsPlaying(false);
    setIsPlayingCustomVoice(true);

    try {
      const audio = new Audio(audioSample);
      customVoiceAudioRef.current = audio;
      audio.onended = () => {
        setIsPlayingCustomVoice(false);
        customVoiceAudioRef.current = null;
      };
      audio.onerror = () => {
        setIsPlayingCustomVoice(false);
        customVoiceAudioRef.current = null;
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlayingCustomVoice(false);
        });
      }
    } catch (err) {
      setIsPlayingCustomVoice(false);
    }
  };

  const runReadingTimer = (sessionId: number) => {
    const readingDuration = 18000;
    const startTime = Date.now();
    progressTimerRef.current = setInterval(() => {
      if (playbackSessionRef.current !== sessionId) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / readingDuration) * 100);
      setSceneProgress(pct);
      if (elapsed >= readingDuration) {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        handleSceneFinished(sessionId);
      }
    }, 100);
  };

  // Main playback controller for current scene
  const playCurrentScene = async () => {
    stopCurrentAudio();
    const currentSession = ++playbackSessionRef.current;
    setSceneProgress(0);
    setIsSceneFinished(false);
    setSpeechStatusMessage(null);

    const narration = currentScene.narration;

    if (audioMuted) {
      setSpeechStatusMessage(
        isTamil ? 'ஒலி முடக்கப்பட்டுள்ளது (Muted) - வாசிப்பு முறை' : 'Audio muted - Reading mode active'
      );
      runReadingTimer(currentSession);
      return;
    }

    // 1. Direct user recording for this scene: Play the user's exact live voice!
    const directRecording = sceneRecordings[currentScene.id];
    if (directRecording) {
      setSpeechStatusMessage(
        isTamil
          ? '🎙️ உங்கள் நேரடிப் பதிவுக் குரலில் பாடம் ஒலிக்கிறது...'
          : '🎙️ Playing your direct voice recording for this scene...'
      );
      try {
        const audio = new Audio(directRecording);
        audioPlayerRef.current = audio;

        audio.ontimeupdate = () => {
          if (playbackSessionRef.current === currentSession && audio.duration) {
            const pct = Math.min(100, (audio.currentTime / audio.duration) * 100);
            setSceneProgress(pct);
          }
        };

        audio.onended = () => {
          if (playbackSessionRef.current === currentSession) {
            handleSceneFinished(currentSession);
          }
        };

        audio.onerror = () => {
          proceedWithNarration(narration, currentSession);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        return;
      } catch (e) {
        // Fall back to calibrated narration
      }
    }

    // 2. Synthesize lesson narration in selected language calibrated to teacher voice/profile
    proceedWithNarration(narration, currentSession);
  };

  const proceedWithNarration = async (narration: string, currentSession: number) => {
    setIsLoadingAudio(true);
    const userPitch = voiceProfile?.pitch || 1.05;
    const speedMultiplier = speakingSpeed === 'slow' ? 0.88 : speakingSpeed === 'fast' ? 1.18 : 1.0;

    setSpeechStatusMessage(
      isCustomVoiceActive
        ? isTamil
          ? `🎙️ உங்கள் சொந்தக் குரல் அமைப்பில் பாடம் ஒலிக்கிறது (சுருதி: ${Math.round(userPitch * 100)}%)...`
          : `🎙️ Calibrating teacher narration to your voice profile (Pitch: ${userPitch.toFixed(2)}x)...`
        : isTamil
        ? '🔊 ஆசிரியர் விளக்கம் தயாராகிறது...'
        : '🔊 Synthesizing teacher narration...'
    );

    // 1. Fetch server native TTS
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: narration,
          language: language,
          voiceName: isCustomVoiceActive ? (voiceProfile?.baseVoice || 'Kore') : teacherVoice,
          speed: speakingSpeed,
        }),
      });

      const data = await res.json();
      setIsLoadingAudio(false);

      if (playbackSessionRef.current !== currentSession || !isPlayingRef.current) {
        return;
      }

      if (data && data.audio) {
        const audio = new Audio(data.audio);
        audioPlayerRef.current = audio;

        // Apply pitch adjustments for personalized voice profile
        if (isCustomVoiceActive) {
          try {
            (audio as any).preservesPitch = false;
            (audio as any).mozPreservesPitch = false;
            (audio as any).webkitPreservesPitch = false;
            audio.playbackRate = userPitch * speedMultiplier;
          } catch (e) {}
        } else {
          try {
            audio.playbackRate = speedMultiplier;
          } catch (e) {}
        }

        audio.ontimeupdate = () => {
          if (playbackSessionRef.current === currentSession && audio.duration) {
            const pct = Math.min(100, (audio.currentTime / audio.duration) * 100);
            setSceneProgress(pct);
          }
        };

        audio.onended = () => {
          if (playbackSessionRef.current === currentSession) {
            handleSceneFinished(currentSession);
          }
        };

        audio.onerror = () => {
          speakWithBrowserSynthesis(narration, currentSession);
        };

        try {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
          return;
        } catch (err: any) {
          if (
            err?.name === 'AbortError' ||
            err?.message?.includes('interrupted') ||
            err?.message?.includes('pause')
          ) {
            return;
          }
          speakWithBrowserSynthesis(narration, currentSession);
          return;
        }
      }
    } catch (e) {
      // Server TTS network issue
    }

    setIsLoadingAudio(false);
    if (playbackSessionRef.current === currentSession && isPlayingRef.current) {
      speakWithBrowserSynthesis(narration, currentSession);
    }
  };

  // Browser speech synthesis fallback that strictly maintains language purity (NO English phonetics!)
  const speakWithBrowserSynthesis = (text: string, sessionId: number) => {
    if (playbackSessionRef.current !== sessionId || !isPlayingRef.current) return;

    if (!('speechSynthesis' in window)) {
      runReadingTimer(sessionId);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      setTimeout(() => {
        if (playbackSessionRef.current !== sessionId || !isPlayingRef.current) return;

        const voices = window.speechSynthesis.getVoices();
        let targetVoice: SpeechSynthesisVoice | null = null;
        let targetLang = 'en-US';

        const isMaleTeacher = teacherVoice === 'puck' || teacherVoice === 'fenrir';
        const isFemaleTeacher = teacherVoice === 'kore' || teacherVoice === 'zephyr';

        if (isTamil) {
          const tamilVoices = voices.filter((v) => v.lang.startsWith('ta') || v.lang.includes('ta'));
          if (tamilVoices.length > 0) {
            if (isMaleTeacher) {
              targetVoice =
                tamilVoices.find((v) => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('valluvar')) ||
                tamilVoices[0];
            } else if (isFemaleTeacher) {
              targetVoice =
                tamilVoices.find((v) => v.name.toLowerCase().includes('female')) ||
                tamilVoices[0];
            } else {
              targetVoice = tamilVoices[0];
            }
          }
          if (!targetVoice) {
            // NEVER transliterate Tamil into English phonetics! Run smooth reading mode instead
            setSpeechStatusMessage('📖 தமிழ் பாடம்: திரையில் உள்ள விளக்கப் படிகளையும் உரைகளையும் படிக்கவும்');
            runReadingTimer(sessionId);
            return;
          }
          targetLang = targetVoice.lang;
        } else if (isHindi) {
          const hindiVoices = voices.filter((v) => v.lang.startsWith('hi') || v.lang.includes('hi'));
          if (hindiVoices.length > 0) {
            if (isMaleTeacher) {
              targetVoice =
                hindiVoices.find(
                  (v) =>
                    (v.name.toLowerCase().includes('male') ||
                      v.name.toLowerCase().includes('madhav') ||
                      v.name.toLowerCase().includes('hemant')) &&
                    !v.name.toLowerCase().includes('female')
                ) || hindiVoices[0];
            } else if (isFemaleTeacher) {
              targetVoice =
                hindiVoices.find(
                  (v) =>
                    v.name.toLowerCase().includes('female') ||
                    v.name.toLowerCase().includes('kalpana') ||
                    v.name.toLowerCase().includes('swara')
                ) || hindiVoices[0];
            } else {
              targetVoice = hindiVoices[0];
            }
          }
          if (!targetVoice) {
            setSpeechStatusMessage('📖 हिंदी पाठ: स्क्रीन पर दी गई व्याख्या और आरेख का अध्ययन करें');
            runReadingTimer(sessionId);
            return;
          }
          targetLang = targetVoice.lang;
        } else {
          const enVoices = voices.filter((v) => v.lang.startsWith('en'));
          if (isMaleTeacher) {
            targetVoice =
              enVoices.find(
                (v) =>
                  (v.name.toLowerCase().includes('male') ||
                    v.name.toLowerCase().includes('david') ||
                    v.name.toLowerCase().includes('guy') ||
                    v.name.toLowerCase().includes('george')) &&
                  !v.name.toLowerCase().includes('female')
              ) || enVoices[0] || voices[0] || null;
          } else if (isFemaleTeacher) {
            targetVoice =
              enVoices.find(
                (v) =>
                  v.name.toLowerCase().includes('female') ||
                  v.name.toLowerCase().includes('zira') ||
                  v.name.toLowerCase().includes('susan') ||
                  v.name.toLowerCase().includes('hazel')
              ) || enVoices[0] || voices[0] || null;
          } else {
            targetVoice = enVoices[0] || voices[0] || null;
          }
          targetLang = targetVoice ? targetVoice.lang : 'en-US';
        }

        const utterance = new SpeechSynthesisUtterance(text);
        if (targetVoice) utterance.voice = targetVoice;
        utterance.lang = targetLang;

        if (isCustomVoiceActive && voiceProfile?.pitch) {
          utterance.pitch = voiceProfile.pitch;
          utterance.rate = (voiceProfile.rate || 1.0) * (speakingSpeed === 'slow' ? 0.85 : speakingSpeed === 'fast' ? 1.2 : 1.0);
        } else {
          // Puck: energetic science mentor (1.05)
          // Fenrir: senior calm STEM scholar (0.85 deeper male pitch)
          // Zephyr: gentle melodic conceptual guide (1.12)
          // Kore: friendly school teacher (1.02)
          if (teacherVoice === 'puck') {
            utterance.pitch = 1.05;
          } else if (teacherVoice === 'fenrir') {
            utterance.pitch = 0.85;
          } else if (teacherVoice === 'zephyr') {
            utterance.pitch = 1.12;
          } else {
            utterance.pitch = 1.02;
          }
          utterance.rate = speakingSpeed === 'slow' ? 0.85 : speakingSpeed === 'fast' ? 1.2 : 1.0;
        }

        const wordCount = text.trim().split(/\s+/).length;
        const estDurationMs = Math.max(14000, Math.min(35000, (wordCount / (2.5 * utterance.rate)) * 1000));
        const startTime = Date.now();

        progressTimerRef.current = setInterval(() => {
          if (playbackSessionRef.current !== sessionId) return;
          const elapsed = Date.now() - startTime;
          const pct = Math.min(98, (elapsed / estDurationMs) * 100);
          setSceneProgress(pct);
        }, 100);

        keepaliveTimerRef.current = setInterval(() => {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
        }, 10000);

        utterance.onend = () => {
          if (playbackSessionRef.current === sessionId) {
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            if (keepaliveTimerRef.current) clearInterval(keepaliveTimerRef.current);
            handleSceneFinished(sessionId);
          }
        };

        utterance.onerror = (e) => {
          if (e.error === 'interrupted' || e.error === 'canceled') return;
          if (playbackSessionRef.current === sessionId) {
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            if (keepaliveTimerRef.current) clearInterval(keepaliveTimerRef.current);
            handleSceneFinished(sessionId);
          }
        };

        window.speechSynthesis.speak(utterance);
      }, 60);
    } catch (err) {
      handleSceneFinished(sessionId);
    }
  };

  // Called when scene narration finishes
  // CRITICAL REQUIREMENT: NEVER auto-advance or skip!
  // The visual diagram and text STAY ON SCREEN allowing student to read and control progression.
  const handleSceneFinished = (sessionId: number) => {
    if (playbackSessionRef.current !== sessionId) return;

    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (keepaliveTimerRef.current) {
      clearInterval(keepaliveTimerRef.current);
      keepaliveTimerRef.current = null;
    }

    setSceneProgress(100);
    setIsSceneFinished(true);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopCurrentAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    stopCurrentAudio();
    setSceneProgress(0);
    setIsSceneFinished(false);
    setIsPlaying(true);
    playCurrentScene();
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      stopCurrentAudio();
      setCurrentSceneIdx((prev) => prev - 1);
      setIsPlaying(true);
    }
  };

  const handleNextScene = () => {
    if (currentSceneIdx < totalScenes - 1) {
      stopCurrentAudio();
      setCurrentSceneIdx((prev) => prev + 1);
      setIsPlaying(true);
    } else {
      // Final scene: show completion modal
      setShowCompletionModal(true);
    }
  };

  const handleJumpToScene = (idx: number) => {
    if (idx >= 0 && idx < totalScenes) {
      stopCurrentAudio();
      setCurrentSceneIdx(idx);
      setIsPlaying(true);
    }
  };

  const overallProgress = Math.round(
    ((currentSceneIdx + (sceneProgress / 100)) / totalScenes) * 100
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header: Grade, Subject, Scene Counter & Controlled Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-3 py-0.5 rounded-full uppercase tracking-wider">
              {lesson.gradeLevel} • {lesson.subject}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {isTamil ? `படி ${currentSceneIdx + 1} / ${totalScenes}` : `Step ${currentSceneIdx + 1} of ${totalScenes}`}
            </span>
            {isCustomVoiceActive && (
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-indigo-200">
                <Mic className="w-3 h-3" />
                <span>{isTamil ? 'சொந்தக் குரல் செயலில் உள்ளது' : 'My Voice Profile Active'}</span>
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            {lesson.title}
          </h1>
        </div>

        {/* Back Button Only - Premature Teach-Back shortcut removed so lesson cannot be skipped! */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {onGoBack && (
            <button
              onClick={() => {
                stopCurrentAudio();
                onGoBack();
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-full border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isTamil ? 'பின்செல் (Back)' : 'Back to Topics'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Personalized Voice Studio Bar (Active when My Own Voice is selected) */}
      {isCustomVoiceActive && (
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white rounded-3xl p-4 shadow-xl border border-indigo-500/30 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
                <Mic className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight">
                    {isTamil ? '🎙️ ஆசிரியர்: உங்கள் சொந்தக் குரல் (My Voice Studio)' : '🎙️ Teacher: Your Personalized Voice'}
                  </span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs">
                    {isTamil ? 'செயலில் உள்ளது' : 'Active'}
                  </span>
                </div>
                <p className="text-xs text-indigo-100 mt-0.5">
                  {isTamil
                    ? `அனைத்து பாட காட்சிகளும் உங்கள் சொந்தக் குரலில் (சுருதி: ${Math.round((voiceProfile?.pitch || 1.05) * 100)}% • வேகம்: ${speakingSpeed}) தமிழ் மொழியில் கற்பிக்கப்படுகின்றன.`
                    : `All lesson scenes are taught in your calibrated voice profile (Pitch: ${voiceProfile?.pitch || 1.05}x) in ${language}.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
              {/* Play user voice intro sample */}
              {(voiceProfile?.audioDataUrl || voiceProfile?.audioSampleBlobUrl) && (
                <button
                  onClick={handlePlayUserVoiceSample}
                  disabled={isPlayingCustomVoice}
                  className="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-xs rounded-full border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Play recorded sample"
                >
                  {isPlayingCustomVoice ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>{isTamil ? 'ஒலிக்கிறது...' : 'Playing...'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current text-amber-300" />
                      <span>{isTamil ? 'அறிமுகக் குரலைக் கேள்' : 'Intro Greeting'}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Scene-Specific Voice Recording Controls */}
          <div className="bg-slate-950/40 rounded-2xl p-2.5 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                {isTamil ? `படி ${currentSceneIdx + 1} காட்சி` : `Scene ${currentSceneIdx + 1}`}
              </span>
              {sceneRecordings[currentScene.id] ? (
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isTamil ? 'இந்த காட்சிக்கு உங்கள் நேரடிக் குரல் சேமிக்கப்பட்டுள்ளது!' : 'Your direct live voice is active for this scene!'}</span>
                </span>
              ) : (
                <span className="text-indigo-200">
                  {isTamil ? 'அளவுத்திருத்தப்பட்ட உங்கள் சொந்தக் குரல் அமைப்பில் ஒலிக்கிறது.' : 'Calibrated neural voice active.'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isRecordingScene ? (
                <button
                  onClick={handleStopSceneRecording}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-black rounded-full flex items-center gap-1.5 shadow-md shadow-red-600/30 animate-pulse cursor-pointer"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>
                    {isTamil
                      ? `பதிவை நிறுத்து (00:${sceneRecordDuration.toString().padStart(2, '0')})`
                      : `Stop Recording (00:${sceneRecordDuration.toString().padStart(2, '0')})`}
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleStartSceneRecording}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black rounded-full flex items-center gap-1.5 shadow-md shadow-amber-400/20 cursor-pointer"
                  title="Record your voice reading this scene narration"
                >
                  <Mic className="w-3.5 h-3.5 text-slate-950" />
                  <span>
                    {isTamil
                      ? sceneRecordings[currentScene.id]
                        ? 'மீண்டும் பதிவு செய்'
                        : 'இந்த காட்சியை என் குரலில் பதிவு செய்'
                      : sceneRecordings[currentScene.id]
                      ? 'Re-record Scene'
                      : 'Record Live for this Scene'}
                  </span>
                </button>
              )}

              {sceneRecordings[currentScene.id] && !isRecordingScene && (
                <button
                  onClick={() => handleRemoveSceneRecording(currentScene.id)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-rose-500/30 text-rose-300 hover:text-white transition-colors cursor-pointer"
                  title={isTamil ? 'நேரடிப் பதிவை நீக்கு (AI குரலுக்கு திரும்பு)' : 'Delete scene recording'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Video Learning Stage */}
      <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col relative">
        {/* Status Toast Banner */}
        {speechStatusMessage && (
          <div className="bg-amber-950/80 border-b border-amber-800/60 px-4 py-2 text-xs text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{speechStatusMessage}</span>
            </div>
            <button
              onClick={handleReplay}
              className="text-[11px] underline font-bold hover:text-white ml-2 cursor-pointer"
            >
              {isTamil ? '🔊 மீண்டும் கேள்' : '🔊 Replay Audio'}
            </button>
          </div>
        )}

        {/* Viewport: Visual Demonstration (Left) & Teacher Avatar (Right) */}
        <div className="relative min-h-[360px] sm:min-h-[420px] bg-gradient-to-b from-slate-900 to-slate-950 p-4 sm:p-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Main Visual Canvas */}
          <div className="w-full lg:flex-1 h-full min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
            <EducationalVisual
              visualData={currentScene.visualData}
              sceneTitle={currentScene.title}
              isDemonstrating={isPlaying}
            />
          </div>

          {/* Teacher Avatar Stage */}
          <div className="w-full lg:w-64 shrink-0 flex flex-col items-center justify-center">
            <TeacherAvatar
              isPlaying={isPlaying || isPlayingCustomVoice}
              teacherEmotion={currentScene.teacherEmotion}
              teacherVoice={teacherVoice}
              voiceProfile={voiceProfile}
              speakingSpeed={speakingSpeed}
            />

            {/* Current Focus Badge */}
            <div className="mt-2 w-full text-center bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                {isTamil ? 'தற்போதைய கவனம்' : 'Current Focus'}
              </span>
              <span className="text-xs font-semibold text-slate-200 line-clamp-2">
                {currentScene.conceptKey}
              </span>
            </div>
          </div>

          {/* Subtitles / Captions Banner */}
          {showCaptions && (
            <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-center shadow-lg transition-all">
              <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                "{currentScene.narration}"
              </p>
            </div>
          )}

          {/* Step Completed Banner: Stays on screen with clear Next Step prompt */}
          {isSceneFinished && !showCompletionModal && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-emerald-950/95 border-2 border-emerald-400/80 backdrop-blur-md rounded-2xl px-4 py-2.5 text-xs text-white shadow-2xl flex items-center gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isTamil ? 'படி முடிந்தது!' : 'Step Completed!'}</span>
              </div>
              {currentSceneIdx < totalScenes - 1 ? (
                <button
                  onClick={handleNextScene}
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-md shadow-emerald-500/20"
                >
                  <span>{isTamil ? 'அடுத்த படிக்குச் செல்' : 'Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setShowCompletionModal(true)}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-md shadow-amber-400/20"
                >
                  <span>{isTamil ? 'பாடம் நிறைவு & Teach-Back' : 'Finish & Teach-Back'}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Video Player Control Bar */}
        <div className="bg-slate-900/95 border-t border-slate-800 px-4 sm:px-6 py-3 flex flex-col gap-2.5">
          {/* Timeline & Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold text-slate-400">
              {currentSceneIdx + 1}/{totalScenes}
            </span>
            <div
              className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden relative cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                const targetIdx = Math.min(
                  totalScenes - 1,
                  Math.max(0, Math.floor(ratio * totalScenes))
                );
                handleJumpToScene(targetIdx);
              }}
            >
              <div
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 h-full rounded-full transition-all duration-200"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-400">
              {overallProgress}%
            </span>
          </div>

          {/* Scene Tabs */}
          <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar">
            {lesson.scenes.map((scene, idx) => (
              <button
                key={scene.id || idx}
                onClick={() => handleJumpToScene(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentSceneIdx === idx
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{scene.title}</span>
              </button>
            ))}
          </div>

          {/* Controls: Prev, Play/Pause, Next, Replay, Captions, Mute */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIdx === 0}
                className="p-2 text-slate-400 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                title={isTamil ? 'முந்தைய படி (Previous Step)' : 'Previous Scene'}
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                title={isPlaying ? 'Pause Lesson' : 'Play Lesson'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextScene}
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isTamil ? 'அடுத்த படி (Next Step)' : 'Next Scene'}
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleReplay}
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isTamil ? 'மீண்டும் கேள் (Replay)' : 'Replay Current Scene'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Captions Toggle */}
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`p-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                  showCaptions
                    ? 'text-amber-400 bg-slate-800'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Toggle Subtitles"
              >
                <Subtitles className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isTamil ? 'உரை (Captions)' : 'Captions'}
                </span>
              </button>

              {/* Audio Mute Toggle */}
              <button
                onClick={() => {
                  setAudioMuted(!audioMuted);
                  if (!audioMuted) stopCurrentAudio();
                }}
                className={`p-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  audioMuted
                    ? 'text-rose-400 bg-slate-800'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {audioMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STEP-BY-STEP EXPLANATION DETAILED SECTION */}
      <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ListOrdered className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                {isTamil ? 'படி வாரியான விரிவான விளக்கம்' : 'Step-by-Step Lesson Breakdown'}
              </h2>
              <p className="text-xs text-slate-500">
                {isTamil
                  ? `படி ${currentSceneIdx + 1}: ${currentScene.title}`
                  : `Step ${currentSceneIdx + 1}: ${currentScene.title}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {currentScene.conceptKey}
            </span>
          </div>
        </div>

        {/* Step-by-Step Points Cards */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
            <BookmarkCheck className="w-4 h-4 text-amber-600" />
            <span>{isTamil ? 'முக்கிய படிகள் (Key Steps)' : 'Key Explanation Steps'}</span>
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {currentScene.visualData?.steps && currentScene.visualData.steps.length > 0 ? (
              currentScene.visualData.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 hover:border-amber-300 transition-all"
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-sm font-medium text-slate-700">
                  {currentScene.narration}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Highlights, Formulas, and Real-Life Practical Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Principle / Formula Highlight */}
          {(currentScene.visualData?.highlight || currentScene.visualData?.formula) && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <span>{isTamil ? 'முக்கிய குறிப்பு & சூத்திரம்' : 'Core Highlight & Formula'}</span>
                </span>
                {currentScene.visualData?.highlight && (
                  <p className="text-xs font-bold text-slate-800 mb-1">
                    {currentScene.visualData.highlight}
                  </p>
                )}
                {currentScene.visualData?.formula && (
                  <div className="mt-2 p-2 bg-white rounded-xl border border-amber-300/80 font-mono font-bold text-xs text-amber-950 text-center">
                    {currentScene.visualData.formula}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Practical Everyday Life Example */}
          {currentScene.visualData?.practicalExample && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-700" />
                  <span>{isTamil ? 'நடைமுறை வாழ்க்கை உதாரணம்' : 'Real-World Example'}</span>
                </span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  {currentScene.visualData.practicalExample}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Teacher Narration Transcript Box */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4" />
              <span>{isTamil ? 'ஆசிரியரின் முழுமையான விளக்கம்' : 'Full Teacher Narration'}</span>
            </span>
            <button
              onClick={handleReplay}
              className="text-xs text-slate-300 hover:text-white underline font-bold cursor-pointer"
            >
              {isTamil ? '🔊 மீண்டும் வாசி' : '🔊 Read Aloud'}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            {currentScene.narration}
          </p>
        </div>

        {/* Controlled Progression Buttons: Student strictly decides when to advance */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevScene}
            disabled={currentSceneIdx === 0}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-full transition-all flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isTamil ? 'முந்தைய படி' : 'Previous Step'}</span>
          </button>

          {currentSceneIdx < totalScenes - 1 ? (
            <button
              onClick={handleNextScene}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                isSceneFinished
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 ring-2 ring-emerald-400/40'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
              }`}
            >
              <span>{isTamil ? 'அடுத்த படிக்குச் செல்' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setShowCompletionModal(true)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs rounded-full shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer ring-2 ring-emerald-400/50"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{isTamil ? 'பாடம் நிறைவு - Teach-Back தொடங்கு' : 'Complete Lesson & Start Teach-Back'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Explicit Completion Modal: Only triggered when student finishes or clicks completion trigger */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl border border-amber-200 animate-in zoom-in-95 duration-200 relative">
            <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4 text-3xl">
              🎉
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              {isTamil
                ? 'அனைத்து படிகளையும் கற்றுக்கொண்டீர்கள்!'
                : 'All Lesson Steps Completed!'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              {isTamil
                ? `வாழ்த்துகள்! "${lesson.title}" பாடத்தின் அனைத்து ${totalScenes} படிகளையும் வெற்றிகரமாக முடித்துவிட்டீர்கள். இப்போது உங்கள் அறிவை சோதிக்க உங்கள் ஏஐ ஆசிரியருக்கு கற்பிக்கத் தயாரா?`
                : `Great job! You have explored all ${totalScenes} steps of "${lesson.title}". Ready to reinforce your understanding by teaching your AI teacher?`}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  handleJumpToScene(0);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isTamil ? 'படிகளை மறுபரிசீலனை செய்' : 'Review Steps Again'}</span>
              </button>

              <button
                onClick={() => {
                  stopCurrentAudio();
                  onLessonComplete();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs rounded-full shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{isTamil ? '🚀 Teach-Back Session-ஐத் தொடங்கு' : '🚀 Start Teach-Back Session'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
