import React from 'react';
import { VoiceProfile } from '../types/index.ts';
import { Volume2, VolumeX, Sparkles, UserCheck } from 'lucide-react';

interface TeacherAvatarProps {
  isPlaying: boolean;
  teacherEmotion?: 'welcoming' | 'explaining' | 'demonstrating' | 'questioning' | 'celebrating';
  teacherVoice: string;
  voiceProfile?: VoiceProfile;
  speakingSpeed?: 'slow' | 'normal' | 'fast';
}

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({
  isPlaying,
  teacherEmotion = 'explaining',
  teacherVoice,
  voiceProfile,
  speakingSpeed = 'normal',
}) => {
  // Determine avatar character theme based on selected voice
  const getAvatarConfig = () => {
    if (voiceProfile?.isPersonalized && teacherVoice === 'my_voice') {
      return {
        name: voiceProfile.profileName || 'My Voice Avatar',
        role: 'Personalized AI Teacher',
        badge: 'Personalized Voice',
        coatColor: '#4f46e5', // Indigo
        shirtColor: '#c7d2fe',
        skinColor: '#fcd34d',
        hairColor: '#1e1b4b',
        glasses: false,
      };
    }

    switch (teacherVoice.toLowerCase()) {
      case 'puck':
        return {
          name: 'Master Arvind',
          role: 'Energetic Science & Math Mentor',
          badge: 'Energetic & Practical',
          coatColor: '#0284c7', // Sky Blue
          shirtColor: '#e0f2fe',
          skinColor: '#fde047',
          hairColor: '#0f172a',
          glasses: true,
        };
      case 'fenrir':
        return {
          name: 'Prof. Raman',
          role: 'Senior STEM Scholar',
          badge: 'Calm & Insightful',
          coatColor: '#047857', // Emerald
          shirtColor: '#d1fae5',
          skinColor: '#fed7aa',
          hairColor: '#475569',
          glasses: true,
        };
      case 'zephyr':
        return {
          name: 'Ms. Priya',
          role: 'Language & Conceptual Guide',
          badge: 'Gentle & Clear',
          coatColor: '#9333ea', // Purple
          shirtColor: '#f3e8ff',
          skinColor: '#fde047',
          hairColor: '#3b0764',
          glasses: false,
        };
      case 'kore':
      default:
        return {
          name: 'Miss Ananya',
          role: 'Friendly School Teacher',
          badge: 'Warm & Encouraging',
          coatColor: '#ea580c', // Orange/Amber
          shirtColor: '#ffedd5',
          skinColor: '#fde047',
          hairColor: '#1c1917',
          glasses: false,
        };
    }
  };

  const config = getAvatarConfig();

  // Eyebrow and eye expressions based on emotion
  const getEyeExpression = () => {
    switch (teacherEmotion) {
      case 'welcoming':
      case 'celebrating':
        return {
          eyeY: 52,
          eyeR: 4.5,
          browY1: 43,
          browY2: 43,
          mouthD: isPlaying ? 'M 44 72 Q 50 82 56 72 Q 50 78 44 72' : 'M 43 72 Q 50 78 57 72',
        };
      case 'questioning':
        return {
          eyeY: 52,
          eyeR: 4,
          browY1: 41,
          browY2: 45,
          mouthD: isPlaying ? 'M 46 72 Q 50 78 54 72' : 'M 45 74 Q 50 72 55 74',
        };
      case 'demonstrating':
        return {
          eyeY: 53,
          eyeR: 4.5,
          browY1: 43,
          browY2: 43,
          mouthD: isPlaying ? 'M 43 71 Q 50 80 57 71 Q 50 76 43 71' : 'M 44 72 Q 50 76 56 72',
        };
      case 'explaining':
      default:
        return {
          eyeY: 52,
          eyeR: 4,
          browY1: 43,
          browY2: 43,
          mouthD: isPlaying ? 'M 44 71 Q 50 80 56 71 Q 50 76 44 71' : 'M 44 73 Q 50 77 56 73',
        };
    }
  };

  const expr = getEyeExpression();

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white/90 rounded-2xl border border-amber-200/90 shadow-sm">
      {/* Teacher Name & Status */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="text-xs font-bold text-slate-800">{config.name}</h3>
        </div>
        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          {voiceProfile?.isPersonalized && teacherVoice === 'my_voice' ? <UserCheck className="w-3 h-3 text-indigo-600" /> : <Sparkles className="w-3 h-3 text-amber-600" />}
          {config.badge}
        </span>
      </div>

      {/* SVG Animated Teacher Avatar */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-b from-amber-100/60 to-orange-100/40 p-2 flex items-center justify-center border border-amber-200/60 overflow-hidden shadow-inner">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Background Aura */}
          <circle cx="50" cy="50" r="46" fill="#fef3c7" opacity="0.6" />

          {/* Shoulders & School Teacher Coat */}
          <path
            d="M 18 100 Q 18 80 34 78 L 50 82 L 66 78 Q 82 80 82 100 Z"
            fill={config.coatColor}
          />
          {/* Inner Shirt Collar */}
          <polygon points="42,78 50,88 58,78 50,82" fill={config.shirtColor} />
          {/* Teacher Tie / Scarf */}
          <polygon points="48,82 52,82 53,96 50,99 47,96" fill="#dc2626" />

          {/* Head & Neck */}
          <rect x="44" y="68" width="12" height="12" fill={config.skinColor} rx="2" />
          <ellipse cx="50" cy="54" rx="20" ry="22" fill={config.skinColor} />

          {/* Hair */}
          <path
            d="M 28 50 C 26 34 36 24 50 24 C 64 24 74 34 72 50 C 68 34 60 30 50 30 C 40 30 32 34 28 50 Z"
            fill={config.hairColor}
          />

          {/* Eyebrows */}
          <line
            x1="38"
            y1={expr.browY1}
            x2="46"
            y2={expr.browY2}
            stroke={config.hairColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="54"
            y1={expr.browY2}
            x2="62"
            y2={expr.browY1}
            stroke={config.hairColor}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Eyes with gentle blinking when playing */}
          <circle cx="42" cy={expr.eyeY} r={expr.eyeR} fill="#1e293b" />
          <circle cx="58" cy={expr.eyeY} r={expr.eyeR} fill="#1e293b" />
          {/* Eye sparkles */}
          <circle cx="43.5" cy={expr.eyeY - 1} r="1.2" fill="#ffffff" />
          <circle cx="59.5" cy={expr.eyeY - 1} r="1.2" fill="#ffffff" />

          {/* Glasses if applicable */}
          {config.glasses && (
            <g stroke="#334155" strokeWidth="1.5" fill="none">
              <rect x="36" y="47" width="12" height="10" rx="3" />
              <rect x="52" y="47" width="12" height="10" rx="3" />
              <line x1="48" y1="52" x2="52" y2="52" />
            </g>
          )}

          {/* Nose */}
          <path d="M 49 57 Q 51 61 48 63" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />

          {/* Dynamic Mouth / Lip-Sync */}
          <path
            d={expr.mouthD}
            fill={isPlaying ? '#b91c1c' : 'none'}
            stroke="#991b1b"
            strokeWidth="2"
            strokeLinecap="round"
            className={isPlaying ? 'animate-pulse' : ''}
          />

          {/* Blush / Cheeks */}
          <circle cx="35" cy="62" r="3.5" fill="#f87171" opacity="0.4" />
          <circle cx="65" cy="62" r="3.5" fill="#f87171" opacity="0.4" />

          {/* Pointer stick gesture when demonstrating */}
          {teacherEmotion === 'demonstrating' && (
            <line x1="72" y1="80" x2="94" y2="40" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </svg>

        {/* Live Speaking Badge Overlay */}
        <div className="absolute bottom-1 right-1">
          {isPlaying ? (
            <div className="flex items-center gap-0.5 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
              <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <div className="bg-slate-400 text-white p-1 rounded-full shadow-xs">
              <VolumeX className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      {/* Role / Bio Tag */}
      <p className="text-[11px] text-slate-500 font-medium text-center mt-1.5 max-w-[170px] truncate">
        {config.role}
      </p>
    </div>
  );
};
