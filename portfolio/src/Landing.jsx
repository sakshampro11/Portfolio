import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Portfolio",
    description: "View my personal portfolio website.",
    link: "/portfolio",
    external: false,
  },
  {
    title: "Resume",
    description: "See my resume as a PDF.",
    link: "/resume.pdf", // Replace with your actual resume path
    external: true,
  },
  {
    title: "Socials",
    description: "Connect with me on social media.",
    link: "https://example.com", // Replace with your actual socials link
    external: true,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#18181b] to-[#232526]">
      <h1 className="text-5xl font-extrabold mb-16 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-lg">Welcome</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {cards.map((card, idx) => {
          const CardTag = card.external ? 'a' : Link;
          return (
            <CardTag
              key={card.title}
              to={!card.external ? card.link : undefined}
              href={card.external ? card.link : undefined}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className={
                `group relative w-72 h-56 bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-green-400/80 overflow-hidden`
              }
              style={{ boxShadow: "0 8px 32px 0 rgba(34, 197, 94, 0.25)" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{boxShadow: '0 0 32px 8px #22c55e55'}} />
              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-lg">{card.title}</h2>
                <p className="text-lg text-gray-200 text-center mb-4 px-4">{card.description}</p>
                <span className="inline-block mt-auto px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-lg group-hover:scale-110 transition-transform">Go</span>
              </div>
            </CardTag>
          );
        })}
      </div>
    </div>
  );
} 