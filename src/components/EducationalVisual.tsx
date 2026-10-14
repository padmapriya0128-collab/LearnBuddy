import React, { useState, useEffect } from 'react';
import { VisualData } from '../types/index.ts';
import { Zap, Sun, Shield, Sparkles, Activity, Layers, Play, CheckCircle2 } from 'lucide-react';

interface EducationalVisualProps {
  visualData: VisualData;
  sceneTitle: string;
  isDemonstrating?: boolean;
}

export const EducationalVisual: React.FC<EducationalVisualProps> = ({
  visualData,
  sceneTitle,
  isDemonstrating = true,
}) => {
  const [circuitClosed, setCircuitClosed] = useState(true);
  const [electronPos, setElectronPos] = useState(0);
  const [appliedForce, setAppliedForce] = useState(20);
  const [mass, setMass] = useState(5);
  const [fractionDenominator, setFractionDenominator] = useState(4);
  const [fractionNumerator, setFractionNumerator] = useState(2);
  const [activeCellPart, setActiveCellPart] = useState<string | null>('mitochondria');
  const [bondType, setBondType] = useState<'covalent' | 'ionic'>('covalent');

  // Electron animation loop for circuit & chemical bonding
  useEffect(() => {
    const interval = setInterval(() => {
      setElectronPos((prev) => (prev + 2) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const acceleration = (appliedForce / mass).toFixed(1);

  // Render specific diagram based on visualData.diagramType
  const renderDiagram = () => {
    switch (visualData.diagramType) {
      case 'circuit':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            {/* Interactive Switch Controls */}
            <div className="flex items-center gap-3 mb-3 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
              <span className="text-xs font-bold text-amber-900">Switch Control:</span>
              <button
                onClick={() => setCircuitClosed(!circuitClosed)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  circuitClosed
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                }`}
              >
                {circuitClosed ? 'SWITCH CLOSED (ON)' : 'SWITCH OPEN (OFF)'}
              </button>
              <span className="text-xs text-slate-500 hidden sm:inline">
                {circuitClosed ? '⚡ Electrons flowing' : '⏸ Flow paused'}
              </span>
            </div>

            {/* SVG Circuit Canvas */}
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl p-4 shadow-inner border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {/* Circuit wire loop */}
                <rect
                  x="50"
                  y="40"
                  width="300"
                  height="160"
                  rx="16"
                  fill="none"
                  stroke={circuitClosed ? '#38bdf8' : '#64748b'}
                  strokeWidth="6"
                  strokeDasharray={circuitClosed ? 'none' : '6 6'}
                />

                {/* Animated electron dots along the wire when closed */}
                {circuitClosed && (
                  <>
                    <circle cx={50 + (electronPos * 3) % 300} cy="40" r="4" fill="#facc15" />
                    <circle cx="350" cy={40 + (electronPos * 1.6) % 160} r="4" fill="#facc15" />
                    <circle cx={350 - (electronPos * 3) % 300} cy="200" r="4" fill="#facc15" />
                    <circle cx="50" cy={200 - (electronPos * 1.6) % 160} r="4" fill="#facc15" />
                  </>
                )}

                {/* Battery on left */}
                <g transform="translate(30, 95)">
                  <rect x="0" y="0" width="40" height="50" rx="4" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                  <rect x="12" y="-6" width="16" height="6" rx="2" fill="#38bdf8" />
                  <text x="20" y="24" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                    9V
                  </text>
                  <text x="20" y="38" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    + / -
                  </text>
                </g>

                {/* Switch on top */}
                <g transform="translate(180, 25)">
                  <circle cx="0" cy="15" r="5" fill="#f8fafc" />
                  <circle cx="40" cy="15" r="5" fill="#f8fafc" />
                  <line
                    x1="0"
                    y1="15"
                    x2={circuitClosed ? '40' : '30'}
                    y2={circuitClosed ? '15' : '-5'}
                    stroke={circuitClosed ? '#22c55e' : '#ef4444'}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <text x="20" y="-8" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Switch ({circuitClosed ? 'Closed' : 'Open'})
                  </text>
                </g>

                {/* Resistor on bottom */}
                <g transform="translate(160, 185)">
                  <rect x="0" y="5" width="80" height="20" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                  <text x="40" y="19" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Resistor 100Ω
                  </text>
                </g>

                {/* Light bulb on right */}
                <g transform="translate(325, 95)">
                  {circuitClosed && (
                    <>
                      <circle cx="25" cy="25" r="34" fill="#fef08a" opacity="0.3" className="animate-pulse" />
                      <circle cx="25" cy="25" r="44" fill="#fef08a" opacity="0.15" />
                    </>
                  )}
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill={circuitClosed ? '#fef08a' : '#475569'}
                    stroke={circuitClosed ? '#eab308' : '#64748b'}
                    strokeWidth="2"
                  />
                  <path
                    d="M 18 25 Q 25 15 32 25"
                    fill="none"
                    stroke={circuitClosed ? '#ca8a04' : '#94a3b8'}
                    strokeWidth="2"
                  />
                  <rect x="20" y="44" width="10" height="8" fill="#64748b" rx="2" />
                  <text
                    x="25"
                    y="66"
                    fill={circuitClosed ? '#fde047' : '#94a3b8'}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {circuitClosed ? 'Light Bulb (ON)' : 'Light Bulb (OFF)'}
                  </text>
                </g>
              </svg>
            </div>

            <p className="text-xs text-slate-600 mt-2 text-center max-w-sm">
              {circuitClosed
                ? '✅ Complete closed circuit: Electric charge leaves the battery terminal, passes through the resistor, and lights the bulb.'
                : '❌ Open circuit: The air gap between switch terminals breaks continuity, stopping electron flow instantly.'}
            </p>
          </div>
        );

      case 'photosynthesis':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <div className="relative w-full max-w-md aspect-[16/10] bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 rounded-2xl p-4 shadow-sm border border-emerald-200 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {/* Radiant Sun */}
                <g transform="translate(50, 45)">
                  <circle cx="0" cy="0" r="22" fill="#f59e0b" className="animate-pulse" />
                  <circle cx="0" cy="0" r="30" fill="#fef08a" opacity="0.4" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1={Math.cos((angle * Math.PI) / 180) * 32}
                      y1={Math.sin((angle * Math.PI) / 180) * 32}
                      x2={Math.cos((angle * Math.PI) / 180) * 44}
                      y2={Math.sin((angle * Math.PI) / 180) * 44}
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />
                  ))}
                  <text x="0" y="48" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Sunlight Energy
                  </text>
                </g>

                {/* Sun rays to leaf */}
                <path d="M 75 60 Q 140 100 200 120" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" />

                {/* Big Green Leaf */}
                <g transform="translate(200, 120)">
                  {/* Leaf contour */}
                  <path
                    d="M 0 0 C 60 -50 140 -20 160 30 C 140 80 50 70 0 0 Z"
                    fill="#22c55e"
                    stroke="#15803d"
                    strokeWidth="3"
                  />
                  {/* Main leaf vein */}
                  <path d="M 0 0 Q 70 15 160 30" stroke="#16a34a" strokeWidth="2.5" fill="none" />
                  {/* Chloroplast representation */}
                  <ellipse cx="80" cy="15" rx="26" ry="16" fill="#15803d" stroke="#86efac" strokeWidth="1.5" />
                  <text x="80" y="18" fill="#dcfce7" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Chloroplast
                  </text>
                </g>

                {/* Water (H2O) entering from roots/stem */}
                <g transform="translate(130, 180)">
                  <path d="M 0 40 Q 30 10 70 -40" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="3 3" fill="none" />
                  <text x="-10" y="42" fill="#0369a1" fontSize="10" fontWeight="bold">
                    Water (H₂O) from Roots
                  </text>
                </g>

                {/* Carbon Dioxide (CO2) entering */}
                <g transform="translate(300, 45)">
                  <path d="M 30 0 Q 10 30 -30 65" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="3 3" fill="none" />
                  <text x="35" y="5" fill="#6d28d9" fontSize="10" fontWeight="bold">
                    CO₂ from Air
                  </text>
                </g>

                {/* Oxygen (O2) and Glucose output */}
                <g transform="translate(320, 175)">
                  <circle cx="0" cy="0" r="14" fill="#38bdf8" opacity="0.8" />
                  <text x="0" y="4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    O₂
                  </text>
                  <text x="24" y="4" fill="#0284c7" fontSize="10" fontWeight="bold">
                    Oxygen Released!
                  </text>
                  <text x="24" y="24" fill="#15803d" fontSize="10" fontWeight="bold">
                    Glucose (C₆H₁₂O₆) Stored
                  </text>
                </g>
              </svg>
            </div>

            {/* Chemical Equation Bar */}
            <div className="mt-3 bg-emerald-100/80 border border-emerald-300 rounded-xl px-4 py-2 text-center text-xs text-emerald-950 font-semibold shadow-xs">
              6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ (Glucose) + 6O₂ (Oxygen)
            </div>
          </div>
        );

      case 'fractions':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            {/* Interactive Slices Selector */}
            <div className="flex items-center gap-2 mb-3 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <span className="text-xs font-bold text-blue-900">Pick Shaded Parts:</span>
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setFractionNumerator(num)}
                  className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                    fractionNumerator === num
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-blue-100'
                  }`}
                >
                  {num}
                </button>
              ))}
              <span className="text-xs font-semibold text-blue-800 ml-1">/ 4 slices</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md items-center">
              {/* Visual Pizza / Pie Chart */}
              <div className="relative aspect-square max-w-[180px] mx-auto bg-amber-50 rounded-2xl p-2 border border-amber-200 flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-full h-full">
                  <circle cx="80" cy="80" r="70" fill="#fde68a" stroke="#d97706" strokeWidth="4" />
                  {/* Slices */}
                  {/* Slice 1 (0 to 90 deg) */}
                  <path
                    d="M 80 80 L 150 80 A 70 70 0 0 1 80 150 Z"
                    fill={fractionNumerator >= 1 ? '#3b82f6' : '#fef3c7'}
                    stroke="#b45309"
                    strokeWidth="2"
                    opacity={fractionNumerator >= 1 ? 0.9 : 0.6}
                  />
                  {/* Slice 2 (90 to 180 deg) */}
                  <path
                    d="M 80 80 L 80 150 A 70 70 0 0 1 10 80 Z"
                    fill={fractionNumerator >= 2 ? '#3b82f6' : '#fef3c7'}
                    stroke="#b45309"
                    strokeWidth="2"
                    opacity={fractionNumerator >= 2 ? 0.9 : 0.6}
                  />
                  {/* Slice 3 (180 to 270 deg) */}
                  <path
                    d="M 80 80 L 10 80 A 70 70 0 0 1 80 10 Z"
                    fill={fractionNumerator >= 3 ? '#3b82f6' : '#fef3c7'}
                    stroke="#b45309"
                    strokeWidth="2"
                    opacity={fractionNumerator >= 3 ? 0.9 : 0.6}
                  />
                  {/* Slice 4 (270 to 360 deg) */}
                  <path
                    d="M 80 80 L 80 10 A 70 70 0 0 1 150 80 Z"
                    fill={fractionNumerator >= 4 ? '#3b82f6' : '#fef3c7'}
                    stroke="#b45309"
                    strokeWidth="2"
                    opacity={fractionNumerator >= 4 ? 0.9 : 0.6}
                  />
                </svg>
              </div>

              {/* Fraction Cards */}
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <div className="text-center mb-2">
                  <span className="text-3xl font-extrabold text-blue-600">{fractionNumerator}</span>
                  <div className="w-12 h-1 bg-slate-800 mx-auto my-1 rounded-full" />
                  <span className="text-3xl font-extrabold text-slate-800">4</span>
                </div>
                <div className="text-xs text-slate-600 text-center space-y-1">
                  <p>
                    <strong className="text-blue-700">Numerator ({fractionNumerator}):</strong> Selected parts
                  </p>
                  <p>
                    <strong className="text-slate-800">Denominator (4):</strong> Total equal parts
                  </p>
                  <p className="text-amber-700 font-bold pt-1">
                    {fractionNumerator === 2
                      ? '💡 Equivalent to 1/2 (Half)!'
                      : fractionNumerator === 4
                      ? '⭐ Equivalent to 1 Whole!'
                      : `${fractionNumerator * 25}% of the whole`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'force_motion':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            {/* Interactive Sliders */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-3 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <div>
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>Applied Force (F):</span>
                  <span className="text-blue-700 font-extrabold">{appliedForce} N</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={appliedForce}
                  onChange={(e) => setAppliedForce(Number(e.target.value))}
                  className="w-full accent-blue-600 mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>Mass (m):</span>
                  <span className="text-purple-700 font-extrabold">{mass} kg</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full accent-purple-600 mt-1"
                />
              </div>
            </div>

            {/* Simulation Canvas */}
            <div className="relative w-full max-w-md aspect-[16/9] bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Ground Line */}
                <line x1="20" y1="150" x2="380" y2="150" stroke="#64748b" strokeWidth="4" />
                {/* Surface hatching */}
                {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
                  <line key={x} x1={x} y1="150" x2={x - 12} y2="165" stroke="#475569" strokeWidth="2" />
                ))}

                {/* Mass Block */}
                <rect x="150" y="80" width="100" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="3" />
                <text x="200" y="122" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">
                  {mass} kg
                </text>

                {/* Force Vector (Arrow Right) */}
                <line
                  x1="250"
                  y1="115"
                  x2={250 + appliedForce * 2.2}
                  y2="115"
                  stroke="#22c55e"
                  strokeWidth="5"
                  markerEnd="url(#arrow-green)"
                />
                <polygon
                  points={`${250 + appliedForce * 2.2},110 ${250 + appliedForce * 2.2 + 10},115 ${250 + appliedForce * 2.2},120`}
                  fill="#22c55e"
                />
                <text x={260 + appliedForce} y="105" fill="#4ade80" fontSize="12" fontWeight="bold">
                  F = {appliedForce} N ➔
                </text>

                {/* Normal Force (Up) & Gravity (Down) */}
                <line x1="200" y1="80" x2="200" y2="35" stroke="#38bdf8" strokeWidth="3" />
                <text x="208" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  Normal Force (N)
                </text>

                <line x1="200" y1="150" x2="200" y2="190" stroke="#f43f5e" strokeWidth="3" />
                <text x="208" y="185" fill="#fb7185" fontSize="10" fontWeight="bold">
                  Weight (W = mg)
                </text>
              </svg>
            </div>

            {/* Calculated Acceleration Display */}
            <div className="mt-3 bg-blue-100 border border-blue-300 rounded-xl px-4 py-2 flex items-center justify-between w-full max-w-md text-xs font-bold text-blue-950">
              <span>Newton's Second Law: a = F / m</span>
              <span className="text-sm text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">
                a = {acceleration} m/s²
              </span>
            </div>
          </div>
        );

      case 'cell':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {/* Cell Membrane */}
                <ellipse cx="200" cy="120" rx="160" ry="95" fill="#0f172a" stroke="#10b981" strokeWidth="5" />
                <text x="200" y="32" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Cell Membrane (Outer Boundary)
                </text>

                {/* Cytoplasm Background */}
                <ellipse cx="200" cy="120" rx="145" ry="80" fill="#064e3b" opacity="0.3" />

                {/* Nucleus */}
                <circle cx="160" cy="120" r="45" fill="#4338ca" stroke="#818cf8" strokeWidth="3" />
                <circle cx="160" cy="120" r="20" fill="#312e81" stroke="#c7d2fe" strokeWidth="1.5" />
                <text x="160" y="124" fill="#e0e7ff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Nucleus (DNA)
                </text>

                {/* Mitochondria 1 */}
                <ellipse cx="280" cy="90" rx="30" ry="16" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />
                <path d="M 260 90 Q 280 82 300 90" stroke="#fca5a5" strokeWidth="2" fill="none" />
                <text x="280" y="118" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Mitochondria
                </text>

                {/* Mitochondria 2 */}
                <ellipse cx="270" cy="160" rx="25" ry="14" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />

                {/* Ribosomes (dots) */}
                {[
                  [100, 90],
                  [110, 150],
                  [230, 60],
                  [220, 180],
                ].map(([rx, ry], idx) => (
                  <circle key={idx} cx={rx} cy={ry} r="3" fill="#facc15" />
                ))}
                <text x="90" y="140" fill="#fef08a" fontSize="8" fontWeight="bold">
                  Ribosomes
                </text>
              </svg>
            </div>

            <div className="mt-2 text-xs text-slate-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              💡 <strong>Key Fact:</strong> The Mitochondria produces ATP energy, making it the "Powerhouse of the Cell"!
            </div>
          </div>
        );

      case 'solar_system':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-950 rounded-2xl p-4 shadow-sm border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {/* Sun */}
                <circle cx="80" cy="120" r="38" fill="#f59e0b" className="animate-pulse" />
                <circle cx="80" cy="120" r="48" fill="#fef08a" opacity="0.3" />
                <text x="80" y="125" fill="#78350f" fontSize="12" fontWeight="bold" textAnchor="middle">
                  SUN
                </text>

                {/* Orbit path */}
                <ellipse cx="80" cy="120" rx="220" ry="85" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

                {/* Earth on orbit */}
                <g transform="translate(260, 110)">
                  <circle cx="0" cy="0" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                  {/* Night shadow */}
                  <path d="M 0 -18 A 18 18 0 0 1 0 18 A 18 18 0 0 0 0 -18" fill="#0f172a" opacity="0.6" />
                  <text x="0" y="28" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Earth (Day / Night)
                  </text>
                  {/* Moon */}
                  <circle cx="28" cy="-14" r="5" fill="#e2e8f0" />
                  <text x="28" y="-22" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    Moon
                  </text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">
              Earth rotates once every 24 hours (day and night cycle) while revolving around the Sun in 365 days.
            </p>
          </div>
        );

      case 'heart_circulation':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {/* 4-chambered heart */}
                <rect x="120" y="50" width="75" height="60" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <text x="157" y="85" fill="#bfdbfe" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Right Atrium
                </text>

                <rect x="120" y="120" width="75" height="70" rx="8" fill="#172554" stroke="#3b82f6" strokeWidth="2" />
                <text x="157" y="160" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Right Ventricle
                </text>

                <rect x="205" y="50" width="75" height="60" rx="8" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
                <text x="242" y="85" fill="#fecaca" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Left Atrium
                </text>

                <rect x="205" y="120" width="75" height="70" rx="8" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                <text x="242" y="160" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Left Ventricle
                </text>

                {/* Legend */}
                <text x="80" y="220" fill="#60a5fa" fontSize="10" fontWeight="bold">
                  🔵 Deoxygenated (Blue)
                </text>
                <text x="240" y="220" fill="#f87171" fontSize="10" fontWeight="bold">
                  🔴 Oxygenated (Red)
                </text>
              </svg>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">
              The heart is a double pump: the right side sends blood to the lungs; the left side pumps oxygen-rich blood to the entire body.
            </p>
          </div>
        );

      case 'geometry':
        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {/* Right Triangle */}
                <polygon points="120,180 260,180 120,60" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
                {/* Right angle marker */}
                <rect x="120" y="165" width="15" height="15" fill="none" stroke="#f59e0b" strokeWidth="2" />

                {/* Side a (vertical) */}
                <text x="95" y="125" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  a = 3
                </text>

                {/* Side b (horizontal) */}
                <text x="180" y="202" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  b = 4
                </text>

                {/* Hypotenuse c */}
                <text x="205" y="110" fill="#facc15" fontSize="14" fontWeight="bold">
                  c = 5
                </text>
              </svg>
            </div>
            <div className="mt-2 bg-amber-100 text-amber-900 font-bold px-4 py-1.5 rounded-full text-xs">
              Pythagoras Theorem: a² + b² = c² ➔ 3² + 4² = 9 + 16 = 25 (5²)
            </div>
          </div>
        );

      case 'chemical_bonding': {
        const angle = (electronPos / 100) * 2 * Math.PI;
        const sharedE1X = 200 + 10 * Math.cos(angle);
        const sharedE1Y = 110 + 20 * Math.sin(angle);
        const sharedE2X = 200 - 10 * Math.cos(angle);
        const sharedE2Y = 110 - 20 * Math.sin(angle);

        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            {/* Interactive Toggle for Covalent vs Ionic */}
            <div className="flex items-center gap-2 mb-3 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200">
              <span className="text-xs font-bold text-purple-900">Bond Type:</span>
              <button
                type="button"
                onClick={() => setBondType('covalent')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  bondType === 'covalent'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white text-purple-700 hover:bg-purple-100'
                }`}
              >
                Covalent (Sharing)
              </button>
              <button
                type="button"
                onClick={() => setBondType('ionic')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  bondType === 'ionic'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white text-purple-700 hover:bg-purple-100'
                }`}
              >
                Ionic (Transfer)
              </button>
            </div>

            {/* SVG Canvas */}
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 220" className="w-full h-full">
                {bondType === 'covalent' ? (
                  <>
                    {/* Left Atom Orbit (Hydrogen 1) */}
                    <circle cx="150" cy="110" r="60" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                    {/* Left Nucleus */}
                    <circle cx="150" cy="110" r="22" fill="#0284c7" />
                    <text x="150" y="114" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      H (1p⁺)
                    </text>

                    {/* Right Atom Orbit (Hydrogen 2) */}
                    <circle cx="250" cy="110" r="60" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                    {/* Right Nucleus */}
                    <circle cx="250" cy="110" r="22" fill="#7e22ce" />
                    <text x="250" y="114" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      H (1p⁺)
                    </text>

                    {/* Shared Region Highlight */}
                    <ellipse cx="200" cy="110" rx="30" ry="45" fill="#facc15" opacity="0.12" />

                    {/* Revolving Shared Electron Pair */}
                    <circle cx={sharedE1X} cy={sharedE1Y} r="5" fill="#facc15" />
                    <circle cx={sharedE2X} cy={sharedE2Y} r="5" fill="#facc15" />

                    {/* Annotations */}
                    <text x="200" y="32" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">
                      ⚡ Shared Valence Pair (Single Bond)
                    </text>
                    <text x="200" y="195" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Overlap Region: Stable Duet Achieved (H₂ Molecule)
                    </text>
                  </>
                ) : (
                  <>
                    {/* Sodium Na+ Cation (Left) */}
                    <circle cx="130" cy="110" r="45" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                    <circle cx="130" cy="110" r="24" fill="#d97706" />
                    <text x="130" y="114" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Na⁺
                    </text>
                    <text x="130" y="175" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Sodium Cation (+1)
                    </text>

                    {/* Transferred electron moving to Chlorine */}
                    <g transform={`translate(${175 + (electronPos * 0.5) % 50}, 110)`}>
                      <circle cx="0" cy="0" r="5" fill="#facc15" />
                      <text x="0" y="-8" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle">e⁻</text>
                    </g>
                    {/* Arrow indicating transfer */}
                    <path d="M 175 110 L 225 110" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />

                    {/* Chlorine Cl- Anion (Right) */}
                    <circle cx="270" cy="110" r="55" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                    <circle cx="270" cy="110" r="28" fill="#047857" />
                    <text x="270" y="114" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Cl⁻
                    </text>
                    <text x="270" y="185" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Chloride Anion (-1)
                    </text>

                    {/* 8 Octet valence electrons around Chlorine */}
                    <circle cx="270" cy="55" r="4" fill="#34d399" />
                    <circle cx="270" cy="165" r="4" fill="#34d399" />
                    <circle cx="215" cy="110" r="4" fill="#facc15" />
                    <circle cx="325" cy="110" r="4" fill="#34d399" />
                    <circle cx="230" cy="70" r="4" fill="#34d399" />
                    <circle cx="310" cy="70" r="4" fill="#34d399" />
                    <circle cx="230" cy="150" r="4" fill="#34d399" />
                    <circle cx="310" cy="150" r="4" fill="#34d399" />

                    {/* Electrostatic attraction label */}
                    <text x="200" y="32" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                      🧲 Strong Electrostatic Attraction
                    </text>
                  </>
                )}
              </svg>
            </div>
            <div className="mt-2 bg-purple-100 text-purple-900 font-bold px-4 py-1.5 rounded-full text-xs">
              {bondType === 'covalent'
                ? 'Covalent Bond: Atoms share electrons to fill valence shells (e.g. H₂O, CH₄)'
                : 'Ionic Bond: Complete electron transfer forming charged ions (e.g. Na⁺ + Cl⁻ → NaCl)'}
            </div>
          </div>
        );
      }

      case 'concept_diagram':
      default: {
        const steps =
          visualData.steps && visualData.steps.length > 0
            ? visualData.steps
            : ['Core Concept Exploration', 'Mechanism & Functioning', 'Application & Real-World Use'];

        return (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-5 border border-indigo-500/20 shadow-md">
              <div className="flex items-center justify-between mb-3 text-amber-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">Concept Blueprint</span>
                </div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
                  Step Breakdown
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-3">{visualData.headline || sceneTitle}</h4>

              {/* Connected Step Flow Diagram */}
              <div className="space-y-2 mb-3">
                {steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-slate-200 font-semibold leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>

              {visualData.labels && visualData.labels.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {visualData.labels.map((lbl, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/80 border border-slate-700 rounded-xl p-2 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-xs text-slate-200 font-medium">{lbl}</span>
                    </div>
                  ))}
                </div>
              )}

              {visualData.formula && (
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-2.5 mb-2 text-center">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wide block">
                    Key Formula / Relationship:
                  </span>
                  <div className="text-sm font-extrabold text-amber-400 mt-0.5">{visualData.formula}</div>
                </div>
              )}

              {(visualData.practicalExample || visualData.highlight) && (
                <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-2.5 text-xs text-blue-200 text-center leading-relaxed">
                  💡 {visualData.practicalExample || visualData.highlight}
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/70 rounded-2xl overflow-hidden border border-slate-200/80 p-2">
      <div className="w-full flex items-center justify-between px-3 py-1.5 border-b border-slate-200 text-xs font-semibold text-slate-700 bg-white/70 rounded-t-xl">
        <span className="flex items-center gap-1.5 text-blue-700">
          <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          {visualData.headline || sceneTitle}
        </span>
        <span className="text-[11px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
          {visualData.diagramType?.toUpperCase() || 'DIAGRAM'}
        </span>
      </div>
      <div className="w-full flex-1 flex items-center justify-center min-h-[260px]">
        {renderDiagram()}
      </div>
    </div>
  );
};
