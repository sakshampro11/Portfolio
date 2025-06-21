import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const figmaColors = ["#F24E1E", "#A259FF", "#1ABCFE", "#0ACF83"];
const projectTexts = ["UI/UX", "Interaction Design", "Projects", "Portfolio"];

const FigmaCursor = () => (
  <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
    <path
      d="M6 2L30 18L19 20L17 33L6 2Z"
      fill="#fff"
      stroke="#18181b"
      strokeWidth="3"
    />
  </svg>
);

export default function FigmaWorkflowAnimation() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 12000); // Reset animation every 12 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      key={cycle}
      className="relative w-[525px] h-[525px] flex justify-center items-center"
    >
      {/* The main frame */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.69, -0.01, 0.49, 1] }}
        className="w-full h-[360px] bg-[#2C2C2C] rounded-xl shadow-2xl border border-gray-700/50 relative flex items-center justify-center p-6"
      >
        {/* The grid of project cards */}
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          {figmaColors.map((color, i) => (
            <motion.div
              key={color}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.5 + i * 0.2,
                duration: 0.7,
                ease: [0.69, -0.01, 0.49, 1],
              }}
              className="w-full h-full rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600/30 shadow-lg relative overflow-hidden"
            >
              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                <div 
                  className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: color }}
                >
                  {i + 1}
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold text-xs mb-1">
                    {projectTexts[i]}
                  </div>
                  <div className="w-12 h-1 rounded-full mx-auto" style={{ backgroundColor: color }}></div>
                </div>
              </div>
              
              {/* Subtle gradient overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{ 
                  background: `linear-gradient(45deg, ${color}00, ${color}40)`
                }}
              ></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* The animated cursor */}
      <motion.div
        className="absolute z-10"
        initial={{ x: -240, y: -240, scale: 0 }}
        animate={{
          scale: 1,
          x: [-240, 150, 150, -90, -90],
          y: [-240, -150, -150, 30, 30],
        }}
        transition={{
          scale: { duration: 0.5, ease: [0.69, -0.01, 0.49, 1] },
          x: { duration: 3, delay: 1, times: [0, 0.4, 0.6, 0.8, 1], ease: [0.69, -0.01, 0.49, 1] },
          y: { duration: 3, delay: 1, times: [0, 0.4, 0.6, 0.8, 1], ease: [0.69, -0.01, 0.49, 1] },
        }}
      >
        <FigmaCursor />
      </motion.div>

      {/* The hover/click effect on a card */}
      <motion.div
        className="absolute w-[calc(50%-1.5rem)] h-[calc(50%-1.5rem)] rounded-lg border-2 border-white"
        style={{
          top: "calc(50% - 180px + 1.5rem)",
          left: "calc(50% - 50% + 1.5rem)",
        }}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.15, opacity: [0, 1, 0] }}
        transition={{
          delay: 4.5,
          duration: 1,
          repeat: 1,
          repeatType: "reverse",
          ease: [0.69, -0.01, 0.49, 1],
        }}
      ></motion.div>

      {/* The tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7, duration: 1, ease: [0.69, -0.01, 0.49, 1] }}
        className="absolute bottom-10 text-center text-gray-300 font-semibold"
      >
        <p>Ideas to Interfaces.</p>
        <p className="text-xs text-gray-500">Built with Figma & React</p>
      </motion.div>
    </div>
  );
}
