import React from "react";
import { FaFigma } from "react-icons/fa";

// SVGs for Figma-like icons
const FrameIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="6" width="20" height="20" rx="3" stroke="#A3A3A3" strokeWidth="2"/><rect x="10" y="10" width="12" height="12" rx="2" stroke="#1ABCFE" strokeWidth="2"/></svg>
);
const AutoLayoutIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="16" height="16" rx="3" stroke="#0ACF83" strokeWidth="2"/><path d="M12 16h8" stroke="#A259FF" strokeWidth="2" strokeLinecap="round"/></svg>
);
const ComponentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="16" height="16" rx="3" stroke="#F24E1E" strokeWidth="2"/><circle cx="16" cy="16" r="3" stroke="#FF7262" strokeWidth="2"/></svg>
);
const FigmaCursor = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M6 2L30 18L19 20L17 33L6 2Z" fill="#18181b" stroke="#fff" strokeWidth="3"/></svg>
);

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#232323] px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-20 py-24">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">Hi I&apos;m<br />Saksham Budhiraja</h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-8">UI/UX Designer who builds with Figma, React &amp; Storytelling.</div>
          <a href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F24D1D] text-white text-lg font-semibold shadow-lg hover:bg-[#0ACF83] transition">
            Explore My Workspace <span className="text-2xl">⮕</span>
          </a>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="relative w-[320px] h-[320px] flex items-center justify-center">
            {/* Figma cursor */}
            <div className="absolute left-2 top-2 z-10 animate-bounce">
              <FigmaCursor />
            </div>
            {/* Interaction Designer text */}
            <div className="absolute top-10 left-24 text-[#1ABCFE] font-bold text-lg animate-pulse">Interaction Designer</div>
            {/* UI/UX text */}
            <div className="absolute bottom-10 right-10 text-[#A259FF] font-bold text-lg animate-pulse">UI/UX</div>
            {/* Figma icons */}
            <div className="absolute bottom-4 left-8 flex gap-4">
              <FrameIcon />
              <AutoLayoutIcon />
              <ComponentIcon />
              <FaFigma size={32} className="text-[#F24E1E]" />
            </div>
            {/* Main illustration circle */}
            <div className="w-[220px] h-[220px] rounded-full bg-gradient-to-br from-[#1ABCFE] via-[#A259FF] to-[#F24E1E] opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
} 