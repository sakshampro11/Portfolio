import React, { useState } from "react";
import { FaFigma } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FigmaWorkflowAnimation from "./FigmaWorkflowAnimation";

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
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const [typed2, setTyped2] = useState("");
  const navigate = useNavigate();

  // Typing animation logic
  function handleExplore() {
    setLoading(true);
    setTyped("");
    setTyped2("");
    const code1 = "> run saksham.portfolio()";
    const code2 = "→ Deploying creativity...";
    let i = 0;
    let j = 0;
    // Type first line
    const t1 = setInterval(() => {
      setTyped(code1.slice(0, i + 1));
      i++;
      if (i === code1.length) {
        clearInterval(t1);
        // Type second line after short pause
        setTimeout(() => {
          const t2 = setInterval(() => {
            setTyped2(code2.slice(0, j + 1));
            j++;
            if (j === code2.length) {
              clearInterval(t2);
              setTimeout(() => {
                navigate("/portfolio");
              }, 400);
            }
          }, 32);
        }, 350);
      }
    }, 32);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#232323] px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-20 py-24">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-5xl 4xl:text-6xl font-extrabold text-white mb-6 leading-tight">Hi I&apos;m<br />Saksham Budhiraja</h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-8">UI/UX Designer who builds with Figma, React &amp; Storytelling.</div>
          
          <motion.button
            onClick={handleExplore}
            disabled={loading}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(242, 77, 29, 0.6), 0px 8px 24px rgba(242, 77, 29, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F24D1D] text-white text-lg font-semibold shadow-lg group border-2 border-transparent hover:border-[#F24D1D] transition-all duration-300"
          >
            Explore My Workspace <span className="inline-block group-hover:translate-x-1 transition-transform duration-200 text-2xl">➞</span>
          </motion.button>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
          <div className="absolute top-1/4 left-1/4 z-10 animate-bounce">
          </div>
          <FigmaWorkflowAnimation />
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b] bg-opacity-95">
          <div className="flex flex-col items-start text-left">
            <pre className="text-green-400 text-2xl md:text-3xl font-mono mb-2 whitespace-pre">{typed}<span className="animate-pulse">|</span></pre>
            {typed.length === 21 && (
              <pre className="text-green-400 text-xl md:text-2xl font-mono whitespace-pre">{typed2}{typed2.length < 23 && <span className="animate-pulse">|</span>}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 