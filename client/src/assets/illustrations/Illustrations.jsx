import React from 'react';

// Stacked colorful books with ribbon bookmark (as in left side of Take Quiz and Hero)
export const StackedBooks = ({ className = '', width = 180, height = 140 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 180 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`illustration-svg ${className}`}
  >
    <defs>
      <linearGradient id="bookPinkGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#E11D48" />
        <stop offset="100%" stop-color="#FB7185" />
      </linearGradient>
      <linearGradient id="bookOrangeGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#EA580C" />
        <stop offset="100%" stop-color="#FB923C" />
      </linearGradient>
      <linearGradient id="bookBlueGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1E40AF" />
        <stop offset="100%" stop-color="#3B82F6" />
      </linearGradient>
      <filter id="bookShadow" x="0" y="90" width="180" height="50" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="8" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.1 0 0 0 0 0.2 0 0 0 0 0.4 0 0 0 0.15 0" />
      </filter>
    </defs>

    {/* Soft ground shadow */}
    <ellipse cx="90" cy="120" rx="75" ry="14" fill="#CBD5E1" opacity="0.6" filter="url(#bookShadow)" />

    {/* Bottom Book (Pink/Reddish) */}
    <rect x="25" y="75" width="130" height="32" rx="8" fill="url(#bookPinkGrad)" />
    {/* Book Pages */}
    <rect x="36" y="80" width="112" height="22" rx="4" fill="#FEF2F2" />
    <line x1="42" y1="87" x2="140" y2="87" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="42" y1="94" x2="140" y2="94" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Spine line */}
    <rect x="25" y="75" width="12" height="32" rx="6" fill="#BE123C" />

    {/* Middle Book (Warm Amber / Gold) */}
    <rect x="20" y="44" width="126" height="30" rx="8" fill="url(#bookOrangeGrad)" />
    <rect x="32" y="49" width="108" height="20" rx="4" fill="#FFFBEB" />
    <line x1="38" y1="56" x2="132" y2="56" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="38" y1="62" x2="132" y2="62" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Blue Ribbon Bookmark hanging down */}
    <path d="M102 50V88L110 82L118 88V50H102Z" fill="#2563EB" />
    <rect x="20" y="44" width="12" height="30" rx="6" fill="#C2410C" />

    {/* Top Book (Royal Blue) */}
    <rect x="22" y="15" width="122" height="28" rx="8" fill="url(#bookBlueGrad)" />
    <rect x="34" y="20" width="104" height="18" rx="4" fill="#EFF6FF" />
    <line x1="40" y1="26" x2="130" y2="26" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="40" y1="31" x2="130" y2="31" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" />
    <rect x="22" y="15" width="12" height="28" rx="6" fill="#1D4ED8" />
  </svg>
);

// Green Stack of Books (Bottom right on results screen)
export const GreenStackedBooks = ({ className = '', width = 160, height = 110 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 160 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`illustration-svg ${className}`}
  >
    <ellipse cx="80" cy="98" rx="65" ry="10" fill="#CBD5E1" opacity="0.6" />

    {/* Bottom Book (Deep Blue) */}
    <rect x="18" y="55" width="124" height="26" rx="6" fill="#1E40AF" />
    <rect x="28" y="59" width="108" height="18" rx="3" fill="#F8FAFC" />
    <line x1="34" y1="65" x2="128" y2="65" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" />
    <rect x="18" y="55" width="10" height="26" rx="5" fill="#1E3A8A" />

    {/* Top Book (Teal / Green) */}
    <rect x="24" y="25" width="116" height="28" rx="6" fill="#0D9488" />
    <rect x="34" y="30" width="100" height="18" rx="3" fill="#F0FDFA" />
    <line x1="40" y1="36" x2="126" y2="36" stroke="#99F6E4" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="40" y1="41" x2="126" y2="41" stroke="#99F6E4" strokeWidth="1.5" strokeDasharray="3 3" />
    <rect x="24" y="25" width="10" height="28" rx="5" fill="#0F766E" />
  </svg>
);

// Spiral Checklist Notepad with Blue & Yellow Pen
export const QuizNotepad = ({ className = '', width = 170, height = 190 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 170 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`illustration-svg ${className}`}
  >
    {/* Drop shadow */}
    <rect x="24" y="26" width="116" height="154" rx="14" fill="#0284C7" opacity="0.2" transform="rotate(-4 24 26)" />

    {/* Notepad Blue border / backing */}
    <g transform="rotate(-3 20 20)">
      <rect x="20" y="20" width="115" height="150" rx="12" fill="#2563EB" />
      {/* Notepad white sheet */}
      <rect x="25" y="25" width="105" height="140" rx="8" fill="#FFFFFF" />

      {/* Spiral rings at top */}
      <circle cx="34" cy="22" r="3.5" fill="#475569" />
      <circle cx="48" cy="22" r="3.5" fill="#475569" />
      <circle cx="62" cy="22" r="3.5" fill="#475569" />
      <circle cx="76" cy="22" r="3.5" fill="#475569" />
      <circle cx="90" cy="22" r="3.5" fill="#475569" />
      <circle cx="104" cy="22" r="3.5" fill="#475569" />
      <circle cx="118" cy="22" r="3.5" fill="#475569" />

      {/* Spiral wire clips */}
      <path d="M34 16V24M48 16V24M62 16V24M76 16V24M90 16V24M104 16V24M118 16V24" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

      {/* QUIZ Title on notepad */}
      <text x="77" y="52" textAnchor="middle" fill="#1D4ED8" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="16" letterSpacing="1.5">
        QUIZ
      </text>

      {/* Checklist items with blue tick boxes */}
      {/* Item 1 */}
      <rect x="36" y="66" width="15" height="15" rx="3" stroke="#2563EB" strokeWidth="2" fill="none" />
      <path d="M39 73L43 77L50 68" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="58" y1="71" x2="114" y2="71" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <line x1="58" y1="78" x2="98" y2="78" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />

      {/* Item 2 */}
      <rect x="36" y="94" width="15" height="15" rx="3" stroke="#2563EB" strokeWidth="2" fill="none" />
      <path d="M39 101L43 105L50 96" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="58" y1="99" x2="114" y2="99" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <line x1="58" y1="106" x2="102" y2="106" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />

      {/* Item 3 */}
      <rect x="36" y="122" width="15" height="15" rx="3" stroke="#2563EB" strokeWidth="2" fill="none" />
      <path d="M39 129L43 133L50 124" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="58" y1="127" x2="114" y2="127" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <line x1="58" y1="134" x2="90" y2="134" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Blue & Yellow Pen resting over notepad */}
    <g transform="translate(10, 5)">
      {/* Pen body */}
      <path d="M112 85L138 148C139 151 138 154 135 156L128 160C125 161 122 160 120 157L94 94L112 85Z" fill="#1D4ED8" />
      {/* Yellow Tip cone */}
      <path d="M128 160L120 157L122 170L128 160Z" fill="#FBBF24" />
      {/* Black pen nib */}
      <circle cx="122" cy="170" r="1.5" fill="#1E293B" />
      {/* Pen gold band */}
      <rect x="100" y="85" width="22" height="6" rx="2" fill="#FCD34D" transform="rotate(-23 100 85)" />
      {/* Pen clip */}
      <path d="M106 88L112 110" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// Pencil Holder Cup with Yellow Pencil & Blue Pen
export const PencilHolder = ({ className = '', width = 110, height = 130 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 110 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`illustration-svg ${className}`}
  >
    {/* Shadow */}
    <ellipse cx="60" cy="115" rx="35" ry="8" fill="#CBD5E1" opacity="0.6" />

    {/* Yellow Pencil sticking out left */}
    <g transform="rotate(-15 45 40)">
      <rect x="42" y="10" width="10" height="65" rx="2" fill="#FBBF24" />
      {/* Eraser */}
      <rect x="42" y="5" width="10" height="8" rx="2" fill="#FB7185" />
      {/* Metal band */}
      <rect x="41" y="12" width="12" height="4" fill="#94A3B8" />
      {/* Wood & graphite tip */}
      <polygon points="42,75 52,75 47,88" fill="#FDE68A" />
      <polygon points="45,84 49,84 47,88" fill="#1E293B" />
    </g>

    {/* Blue Ballpoint Pen sticking out right */}
    <g transform="rotate(12 65 40)">
      <rect x="62" y="15" width="9" height="60" rx="3" fill="#2563EB" />
      <rect x="61" y="10" width="11" height="8" rx="2" fill="#1D4ED8" />
      <path d="M66.5 15V32" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <polygon points="62,75 71,75 66.5,84" fill="#E2E8F0" />
      <circle cx="66.5" cy="84" r="1" fill="#0F172A" />
    </g>

    {/* Ruler sticking out */}
    <g transform="rotate(2 55 40)">
      <rect x="52" y="2" width="11" height="75" rx="2" fill="#38BDF8" />
      <line x1="52" y1="12" x2="57" y2="12" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="52" y1="20" x2="59" y2="20" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="52" y1="28" x2="57" y2="28" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="52" y1="36" x2="59" y2="36" stroke="#FFFFFF" strokeWidth="1.5" />
    </g>

    {/* Blue Ceramic Cup */}
    <path
      d="M32 60H84L78 114C77.5 117 74.8 119 71.8 119H44.2C41.2 119 38.5 117 38 114L32 60Z"
      fill="#1D4ED8"
    />
    {/* Inner shadow / rim */}
    <ellipse cx="58" cy="60" rx="26" ry="6" fill="#1E40AF" />
    {/* Front highlight */}
    <path
      d="M38 65L42 110"
      stroke="#60A5FA"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

// Glowing Idea Light Bulb with Sparks
export const GlowingBulb = ({ className = '', width = 90, height = 90 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`illustration-svg ${className}`}
  >
    {/* Glow rays */}
    <line x1="45" y1="8" x2="45" y2="18" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="20" y1="20" x2="27" y2="27" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="20" x2="63" y2="27" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="12" y1="45" x2="22" y2="45" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="78" y1="45" x2="68" y2="45" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />

    {/* Bulb Body */}
    <path
      d="M45 22C34.5 22 26 30.5 26 41C26 48 29.5 53.5 34 58V65C34 66.5 35.5 68 37 68H53C54.5 68 56 66.5 56 65V58C60.5 53.5 64 48 64 41C64 30.5 55.5 22 45 22Z"
      fill="#FCD34D"
    />
    {/* Inner glow */}
    <circle cx="45" cy="40" r="12" fill="#FDE68A" />

    {/* Filament */}
    <path
      d="M40 45L43 36L47 36L50 45"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Bulb Base (screw) */}
    <rect x="36" y="69" width="18" height="4" rx="2" fill="#94A3B8" />
    <rect x="38" y="74" width="14" height="4" rx="2" fill="#64748B" />
    <path d="M41 78H49C49 80 47.5 81.5 45 81.5C42.5 81.5 41 80 41 78Z" fill="#334155" />
  </svg>
);

// A+ Exam Result Sheet
export const ExamSheet = ({ className = '', width = 110, height = 140 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 110 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`illustration-svg ${className}`}
  >
    {/* Sheet Shadow */}
    <rect x="12" y="12" width="86" height="116" rx="8" fill="#CBD5E1" opacity="0.4" />
    {/* Paper Sheet */}
    <rect x="8" y="8" width="86" height="116" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

    {/* Red A+ Grade */}
    <text x="66" y="38" fill="#EF4444" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="24">
      =A+
    </text>

    {/* Checklist lines */}
    <g transform="translate(18, 48)">
      <rect x="0" y="0" width="12" height="12" rx="2" stroke="#2563EB" strokeWidth="2" fill="none" />
      <path d="M2 6L5 9L10 3" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="6" x2="60" y2="6" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

      <rect x="0" y="20" width="12" height="12" rx="2" stroke="#2563EB" strokeWidth="2" fill="none" />
      <path d="M2 26L5 29L10 23" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="26" x2="60" y2="26" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

      <rect x="0" y="40" width="12" height="12" rx="2" stroke="#2563EB" strokeWidth="2" fill="none" />
      <path d="M2 46L5 49L10 43" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="46" x2="60" y2="46" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

      <line x1="0" y1="58" x2="60" y2="58" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="64" x2="45" y2="64" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// Golden Trophy with Confetti for Quiz Completed
export const GoldenTrophy = ({ className = '', width = 160, height = 160 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`illustration-svg ${className}`}
  >
    <defs>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FCD34D" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="cupInner" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </linearGradient>
    </defs>

    {/* Confetti particles */}
    <circle cx="28" cy="35" r="4" fill="#3B82F6" />
    <circle cx="135" cy="40" r="3.5" fill="#EF4444" />
    <circle cx="35" cy="80" r="3" fill="#10B981" />
    <circle cx="128" cy="88" r="4" fill="#8B5CF6" />
    <rect x="18" y="55" width="7" height="4" rx="1.5" fill="#F59E0B" transform="rotate(35 18 55)" />
    <rect x="135" y="65" width="6" height="4" rx="1.5" fill="#06B6D4" transform="rotate(-25 135 65)" />
    <rect x="50" y="20" width="8" height="4" rx="1.5" fill="#EC4899" transform="rotate(15 50 20)" />
    <rect x="110" y="22" width="7" height="4" rx="1.5" fill="#10B981" transform="rotate(-30 110 22)" />

    {/* Trophy Handles */}
    <path
      d="M48 55C32 55 30 75 46 88C50 91 56 92 60 92"
      stroke="#F59E0B"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M112 55C128 55 130 75 114 88C110 91 104 92 100 92"
      stroke="#F59E0B"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />

    {/* Trophy Cup Body */}
    <path
      d="M52 45H108V72C108 90 94 102 80 102C66 102 52 90 52 72V45Z"
      fill="url(#goldGrad)"
    />
    {/* Trophy Rim */}
    <ellipse cx="80" cy="45" rx="28" ry="7" fill="url(#cupInner)" />
    <ellipse cx="80" cy="44" rx="27" ry="5.5" fill="#FDE68A" />

    {/* Star Emblem on Cup */}
    <polygon
      points="80,58 82.5,65 90,65.5 84,70 86.5,77 80,72.5 73.5,77 76,70 70,65.5 77.5,65"
      fill="#FFFFFF"
    />

    {/* Stem */}
    <path d="M74 102H86V116H74V102Z" fill="#D97706" />

    {/* Base Pedestal */}
    <rect x="62" y="116" width="36" height="8" rx="2" fill="#F59E0B" />
    <rect x="54" y="124" width="52" height="14" rx="3" fill="#1E293B" />
    <rect x="66" y="128" width="28" height="6" rx="1.5" fill="#FCD34D" />
  </svg>
);

// Hero Laptop with Quiz Screen and Desk Decor (panel 1 illustration)
export const HeroDeskIllustration = ({ className = '', width = 460, height = 340 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 460 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`hero-illustration-svg ${className}`}
  >
    <defs>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#F1F5F9" />
      </linearGradient>
      <linearGradient id="laptopBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3B82F6" />
        <stop offset="100%" stop-color="#1D4ED8" />
      </linearGradient>
    </defs>

    {/* Ambient desk glow / circle */}
    <ellipse cx="230" cy="270" rx="190" ry="40" fill="#E0F2FE" opacity="0.7" />

    {/* Potted Plant in background */}
    <g transform="translate(370, 110)">
      <path d="M15 45Q35 15 50 25Q45 50 15 45Z" fill="#10B981" />
      <path d="M15 45Q-10 20 0 10Q20 30 15 45Z" fill="#059669" />
      <path d="M15 45Q18 -5 32 0Q30 30 15 45Z" fill="#34D399" />
      <polygon points="5,45 25,45 22,70 8,70" fill="#94A3B8" />
    </g>

    {/* Laptop Base */}
    <rect x="110" y="248" width="220" height="12" rx="6" fill="#1E3A8A" />
    <path d="M85 258H355L340 268H100L85 258Z" fill="#64748B" />
    <rect x="195" y="258" width="50" height="4" rx="2" fill="#94A3B8" />

    {/* Laptop Screen Bezel */}
    <rect x="120" y="70" width="200" height="180" rx="12" fill="url(#laptopBody)" />
    {/* Web camera */}
    <circle cx="220" cy="78" r="2.5" fill="#0F172A" />

    {/* Laptop Display (Quiz in progress) */}
    <rect x="130" y="88" width="180" height="152" rx="6" fill="url(#screenGrad)" />

    {/* Progress bar on laptop display */}
    <rect x="142" y="98" width="156" height="5" rx="2.5" fill="#E2E8F0" />
    <rect x="142" y="98" width="75" height="5" rx="2.5" fill="#2563EB" />

    {/* Quiz content lines inside laptop */}
    <line x1="145" y1="116" x2="250" y2="116" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    <line x1="145" y1="126" x2="210" y2="126" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

    {/* Option A */}
    <rect x="142" y="138" width="156" height="18" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    <circle cx="152" cy="147" r="4" fill="#E2E8F0" />
    <line x1="164" y1="147" x2="240" y2="147" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Option B (Selected) */}
    <rect x="142" y="162" width="156" height="18" rx="4" fill="#2563EB" />
    <circle cx="152" cy="171" r="4" fill="#FFFFFF" />
    <line x1="164" y1="171" x2="230" y2="171" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

    {/* Option C */}
    <rect x="142" y="186" width="156" height="18" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    <circle cx="152" cy="195" r="4" fill="#E2E8F0" />
    <line x1="164" y1="195" x2="215" y2="195" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Option D */}
    <rect x="142" y="210" width="156" height="18" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    <circle cx="152" cy="219" r="4" fill="#E2E8F0" />
    <line x1="164" y1="219" x2="225" y2="219" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Stacked books on left side of laptop */}
    <g transform="translate(10, 160)">
      <StackedBooks width={140} height={110} />
    </g>

    {/* Glowing light bulb hovering over laptop */}
    <g transform="translate(265, 30)">
      <GlowingBulb width={75} height={75} />
    </g>

    {/* Pencil Cup on right side */}
    <g transform="translate(340, 180)">
      <PencilHolder width={80} height={95} />
    </g>

    {/* Floating Quiz Notepad at front right */}
    <g transform="translate(280, 210) scale(0.68)">
      <QuizNotepad />
    </g>
  </svg>
);
