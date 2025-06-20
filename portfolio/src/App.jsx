import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { FaUser, FaFileAlt, FaLink, FaReact, FaFigma, FaNodeJs, FaJs, FaGitAlt, FaDatabase, FaTools, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const figmaColors = [
  "#F24E1E", // orange
  "#FF7262", // pink
  "#A259FF", // purple
  "#1ABCFE", // blue
  "#0ACF83", // green
];

const projects = [
  {
    title: "Project One",
    thumbnail: "https://via.placeholder.com/200x120?text=Project+1",
    description: "A cool project about web design.",
    tech: ["React", "Tailwind", "Figma"],
    tags: ["UI", "Web"],
    details: "This project demonstrates my ability to design and build modern web apps.",
    x: 100,
    y: 100,
  },
  {
    title: "Project Two",
    thumbnail: "https://via.placeholder.com/200x120?text=Project+2",
    description: "A creative mobile app.",
    tech: ["React Native", "Expo"],
    tags: ["Mobile", "UI"],
    details: "A mobile app built for both iOS and Android.",
    x: 500,
    y: 100,
  },
  {
    title: "Project Three",
    thumbnail: "https://via.placeholder.com/200x120?text=Project+3",
    description: "A data visualization dashboard.",
    tech: ["D3.js", "React", "CSS"],
    tags: ["Dashboard", "DataViz"],
    details: "A dashboard for visualizing complex data interactively.",
    x: 100,
    y: 400,
  },
  {
    title: "Project Four",
    thumbnail: "https://via.placeholder.com/200x120?text=Project+4",
    description: "A productivity tool for teams.",
    tech: ["Node.js", "MongoDB", "Express"],
    tags: ["Productivity", "Team"],
    details: "A collaborative tool to boost team productivity.",
    x: 500,
    y: 400,
  },
];

const skills = [
  { name: "React", icon: <FaReact className="text-sky-400" /> },
  { name: "Tailwind CSS", icon: <FaTools className="text-cyan-300" /> },
  { name: "Figma", icon: <FaFigma className="text-pink-400" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-300" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
  { name: "MongoDB", icon: <FaDatabase className="text-green-700" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-400" /> },
];

// Figma-style black arrow cursor with white outline SVG as a data URL
const figmaCursorSVG =
  "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 2L28 16L18 18L16 28L4 2Z' fill='black' stroke='white' stroke-width='3'/%3E%3C/svg%3E";

// Add this style to the file (at the top or bottom):
const customScrollbarStyle = document.createElement('style');
customScrollbarStyle.innerHTML = `
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  background: #232323;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #111;
  border-radius: 6px;
  border: 1.5px solid #444;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #111 ;
}
`;
document.head.appendChild(customScrollbarStyle);

function ProjectsTabBar({ selectedProject, onBack }) {
  return (
    <div className="w-full flex items-center gap-2 px-2 py-0.5 mb-8" style={{ background: '#232323', borderBottom: '1px solid #262626', height: 44 }}>
      {selectedProject !== null ? (
        <button onClick={onBack} className="flex items-center gap-2 text-white px-3 py-1 rounded hover:bg-[#262626] transition font-semibold" style={{ fontWeight: 600 }}>
          Projects
        </button>
      ) : (
        <span
          className="text-base font-medium text-white px-3 py-1 rounded flex items-center gap-2 transition-all duration-300"
          style={{ background: '#262626', color: '#FFFFFF', fontWeight: 600, borderBottom: '2px solid #fff' }}
        >
          Projects
        </span>
      )}
    </div>
  );
}

/* Hide scrollbars utility */
const style = document.createElement('style');
style.innerHTML = `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`;
document.head.appendChild(style);

export default function App() {
  const [selected, setSelected] = useState(null); // null means grid, number means project index
  const [tab, setTab] = useState("about");
  const [zoom, setZoom] = useState(1);
  const workspaceRef = useRef(null);
  const [showFakeCursor, setShowFakeCursor] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 80, y: 80 });
  const [aboutFlipped, setAboutFlipped] = useState(false);

  // Only set Figma cursor for workspace
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (workspace) {
      workspace.style.cursor = `url('/path/to/figma-cursor.png') 4 4, auto`;
    }
    return () => {
      if (workspace) workspace.style.cursor = "auto";
    };
  }, []);

  // Handle zoom with ctrl+wheel or pinch
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    function handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        let nextZoom = zoom - e.deltaY * 0.001;
        nextZoom = Math.max(0.3, Math.min(2.5, nextZoom));
        setZoom(nextZoom);
      }
    }
    workspace.addEventListener("wheel", handleWheel, { passive: false });
    return () => workspace.removeEventListener("wheel", handleWheel);
  }, [zoom]);

  useEffect(() => {
    if (!showFakeCursor) return;
    // Animate cursor path: guide through project cards in order
    const cardPositions = [
      { x: 120, y: 120 }, // Project 1
      { x: 520, y: 120 }, // Project 2
      { x: 120, y: 420 }, // Project 3
      { x: 520, y: 420 }, // Project 4
    ];
    // Start at top left, then visit each card
    const path = [
      { x: 60, y: 60 },
      ...cardPositions,
    ];
    let i = 0;
    setCursorPos(path[0]);
    const interval = setInterval(() => {
      i++;
      if (i >= path.length) i = 0;
      setCursorPos(path[i]);
    }, 600);
    const timeout = setTimeout(() => {
      setShowFakeCursor(false);
      clearInterval(interval);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [showFakeCursor]);

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ fontFamily: 'Inter, sans-serif', background: '#232323' }}>
      <div className="flex flex-1 min-h-0">
        {/* Left Panel: Name, Page, Layers */}
        <aside className="w-64 fixed top-0 left-0 h-full z-40" style={{ background: '#232323', borderRight: '1px solid #262626' }}>
          <div className="flex flex-col py-8 px-4 gap-4 h-full">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold tracking-wide text-white">Saksham</span>
              <span className="flex gap-1 ml-2">
                {figmaColors.map((c, i) => (
                  <span key={i} className="w-3 h-3 rounded-full" style={{ background: c }}></span>
                ))}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Page</div>
            <div className="text-lg font-semibold mb-6 text-white">Portfolio</div>
            <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Layers</div>
            <nav className="flex flex-col gap-2 text-base">
              {projects.map((project, idx) => (
                <button
                  key={project.title}
                  onClick={() => setSelected(idx)}
                  className={`text-left px-4 py-2 rounded-lg transition font-medium ${selected === idx ? 'bg-[#262626] border-l-4 border-white text-white' : 'hover:bg-[#262626] text-gray-200'}`}
                >
                  {project.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Center Canvas: Projects */}
        <main className="flex-1 flex flex-col items-center justify-start py-0 px-0 min-h-0 relative overflow-hidden ml-64 mr-64" style={{ background: '#1e1e1e', height: '100%' }}>
          <ProjectsTabBar selectedProject={selected} onBack={() => setSelected(null)} />
          {selected === null ? (
            <div
              ref={workspaceRef}
              className="relative w-full flex-1 min-h-0 overflow-scroll rounded-xl border border-[#232323] custom-scrollbar"
              style={{ background: '#1e1e1e', scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: `url(${figmaCursorSVG}) 4 4, auto`, height: '100%' }}
            >
              {/* Fake animated cursor */}
              <AnimatePresence>
                {showFakeCursor && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: cursorPos.x, y: cursorPos.y }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', zIndex: 50, pointerEvents: 'none' }}
                  >
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M6 2L30 18L19 20L17 33L6 2Z" fill="#18181b" stroke="#fff" strokeWidth="3"/></svg>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Project cards grid with staggered animation */}
              <motion.div
                style={{ width: 1200, height: 800, position: 'relative', transform: `scale(${zoom})`, transformOrigin: '0 0', transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)' }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.18,
                    },
                  },
                }}
              >
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.title}
                    className={`absolute group w-[320px] h-[240px] rounded-xl shadow-2xl border-2 border-transparent hover:border-white transition-all duration-300 cursor-pointer flex flex-col items-stretch p-0 bg-[#232323]`}
                    style={{ left: project.x, top: project.y }}
                    onClick={() => setSelected(idx)}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32, delay: idx * 0.18 }}
                  >
                    {/* Main thumbnail area */}
                    <div className="flex-1 rounded-t-xl overflow-hidden flex items-center justify-center bg-[#262626]">
                      <img src={project.thumbnail} alt={project.title} className="object-contain max-h-[120px] max-w-[90%]" />
                    </div>
                    {/* Bottom bar */}
                    <div className="flex flex-col gap-1 px-4 py-3 bg-[#232323] rounded-b-xl border-t border-[#262626]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#262626] flex items-center justify-center text-xs font-bold text-white">{project.title[0]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="truncate text-white font-medium text-base">{project.title}</div>
                          <div className="truncate text-xs text-gray-400">{project.description}</div>
                        </div>
                      </div>
                      {/* Figma-style tags/pills */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags && project.tags.map((tag, i) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: figmaColors[i % figmaColors.length], color: '#fff', letterSpacing: 0.5 }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div
              ref={workspaceRef}
              className="relative w-full flex-1 min-h-0 overflow-scroll rounded-xl border border-[#232323] custom-scrollbar flex justify-center items-start"
              style={{ background: '#1e1e1e', scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: `url(${figmaCursorSVG}) 4 4, auto`, height: '100%' }}
            >
              <div className="w-[900px] min-h-[1200px] rounded-2xl shadow-2xl my-12 flex flex-col px-12 py-10" style={{ background: '#262626', boxShadow: '0 4px 32px 0 #0004' }}>
                {/* Top: Project name, subheading, about/goal, image */}
                <div className="flex flex-row gap-10 mb-10">
                  {/* Left: Text */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="text-5xl font-extrabold text-white">{projects[selected].title}</div>
                    <div className="text-xl text-gray-200 font-semibold">Project type</div>
                    <div className="text-base text-gray-200 font-bold mt-4">ABOUT</div>
                    <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur. Ad vel urna urna elementum nisi. Pellentesque euismod semper risus gravida ultricies habitant. Aliquet facilisi cursus eget accumsan accumsan risus. Praesent gravida, volutpat nibh ac, fermentum sodales et nulla in suspendisse dictum. Sit nulla vel nisi.</div>
                    <div className="text-base text-gray-200 font-bold mt-4">GOAL</div>
                    <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur. Ad vel urna urna elementum nisi. Pellentesque euismod semper risus gravida ultricies habitant. Aliquet facilisi cursus eget accumsan accumsan risus. Praesent gravida, volutpat nibh ac, fermentum sodales et nulla in suspendisse dictum. Sit nulla vel nisi.</div>
                  </div>
                  {/* Right: Project image placeholder */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-[360px] h-[260px] bg-gray-300 rounded-lg flex items-center justify-center">
                      <svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#E5E7EB"/><path d="M22 42l10-10 10 10" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="26" cy="28" r="3" fill="#A3A3A3"/></svg>
                    </div>
                  </div>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-gray-700 opacity-40 mb-10"></div>
                {/* Design Process Section */}
                <div className="mb-10">
                  <div className="text-2xl font-bold text-white mb-2">DESIGN PROCESS</div>
                  <div className="text-sm text-gray-400 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</div>
                  <div className="flex flex-row gap-6">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex-1 h-[120px] bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 text-gray-500">img</div>
                    ))}
                  </div>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-gray-700 opacity-40 mb-10"></div>
                {/* User Flow Section */}
                <div className="mb-10">
                  <div className="text-2xl font-bold text-white mb-2">USER FLOW</div>
                  <div className="text-sm text-gray-400 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</div>
                  <div className="w-full h-[180px] bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 text-gray-500">User Flowchart</div>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-gray-700 opacity-40 mb-10"></div>
                {/* Design System Section */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-white mb-2">DESIGN SYSTEM</div>
                  <div className="flex flex-row gap-8">
                    {/* Color Palette */}
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-gray-200 mb-1">COLOR PALETTE</div>
                      <div className="flex flex-row gap-2 mb-2">
                        {figmaColors.map((c, i) => (
                          <span key={i} className="w-8 h-8 rounded-lg border border-gray-700" style={{ background: c }}></span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-400">#F24E1E #FF7262 #A259FF #1ABCFE #0ACF83</div>
                    </div>
                    {/* Typography */}
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="text-sm font-semibold text-gray-200 mb-1">TYPOGRAPHY</div>
                      <div className="flex flex-row gap-4">
                        <div className="flex flex-col items-start">
                          <span className="text-2xl font-bold text-white">Aa</span>
                          <span className="text-xs font-semibold text-gray-200">Typeface</span>
                          <span className="text-xs text-gray-400">Inter</span>
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-2xl font-bold text-white">Aa</span>
                          <span className="text-xs font-semibold text-gray-200">Typeface</span>
                          <span className="text-xs text-gray-400">Roboto</span>
                        </div>
                      </div>
                    </div>
                    {/* Design System Elements */}
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="text-sm font-semibold text-gray-200 mb-1">[DESIGN SYSTEM ELEMENT]</div>
                      <div className="flex-1 border-2 border-dashed border-gray-500 rounded-lg min-h-[60px] mb-2"></div>
                      <div className="text-sm font-semibold text-gray-200 mb-1">[DESIGN SYSTEM ELEMENT]</div>
                      <div className="flex-1 border-2 border-dashed border-gray-500 rounded-lg min-h-[60px]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 left-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#232323] border border-[#444] text-gray-300 hover:text-orange-400 hover:bg-[#18181b] transition shadow-lg"
                title="Back to Projects"
              >
                <FaArrowLeft size={20} />
              </button>
            </div>
          )}
        </main>

        {/* Right Panel: Header, Tabs, About/Tools or Tech Stack/Colors */}
        <aside
          className={selected === null ? "w-[440px] fixed top-0 right-0 h-full z-40 border-l" : "w-64 fixed top-0 right-0 h-full z-40 border-l"}
          style={{ background: '#232323', borderLeft: '1px solid #262626' }}
        >
          <div className="flex flex-col py-8 px-8 h-full">
            {selected === null ? (
              // Grid view: original right panel
              <>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ background: figmaColors[0] }}>S</div>
      <div>
                    <div className="text-xl font-bold" style={{ color: figmaColors[0] }}>Saksham Budhiraja</div>
                    <div className="text-sm text-gray-400">UI UX Designer</div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  <button onClick={() => setTab('about')} className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition ${tab === 'about' ? 'bg-[#1e1e1e] text-white' : 'bg-[#232323] text-gray-400 hover:bg-[#262626]'}`}>About Me</button>
                  <button onClick={() => setTab('tools')} className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition ${tab === 'tools' ? 'bg-[#1e1e1e] text-white' : 'bg-[#232323] text-gray-400 hover:bg-[#262626]'}`}>Tools</button>
                </div>
                {/* Tab Content */}
                {tab === 'about' ? (
                  <div className="relative mb-6 min-h-[120px]">
                    <div className="absolute top-3 right-4 z-10">
                      <button
                        onClick={() => setAboutFlipped(f => !f)}
                        className="rounded-full bg-[#232323] hover:bg-[#1ABCFE] text-[#1ABCFE] hover:text-white p-2 shadow-md border border-[#1ABCFE] transition-transform active:scale-90"
                        title="Flip Card"
                        style={{ outline: 'none', border: 'none' }}
                      >
                        {/* Figma-inspired 3D flip icon */}
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                          <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="#232323" />
                          <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 12c0-4 16-4 16 0" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
                        </svg>
                      </button>
                    </div>
                    <div className="perspective-[1200px]">
                      <AnimatePresence mode="wait" initial={false}>
                        {!aboutFlipped ? (
                          <motion.div
                            key="about-front"
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }}
                            className="rounded-2xl p-6 shadow-lg border text-gray-200 min-h-[200px] bg-gradient-to-r from-[#232323] to-[#1ABCFE11] border-[#1ABCFE]"
                            style={{ boxShadow: '0 2px 24px 0 #1ABCFE22', backfaceVisibility: 'hidden', position: 'absolute', width: '100%' }}
                          >
                            <span className="text-2xl mr-2 align-middle">👋</span>
                            <span className="text-lg font-bold text-white">Hi, I'm Saksham Budhiraja</span>
                            <div className="mt-2 text-base text-gray-300">
                              A UI/UX designer and frontend developer who thinks in frames and builds in pixels. I'm passionate about creating intuitive, accessible, and engaging digital experiences that blend function with form.
                            </div>
                            <div className="mt-3 text-sm text-gray-400">
                              From designing collaborative platforms like <span className="font-semibold text-[#1ABCFE]">Skollab</span> to civic tools like <span className="font-semibold text-[#A259FF]">City Issue Reporter</span>, I enjoy solving real-world problems through user-centered design. I work with tools like <span className="font-semibold text-[#1ABCFE]">Figma</span>, <span className="font-semibold text-[#61DAFB]">React</span>, and <span className="font-semibold text-[#38BDF8]">Tailwind</span>, and I'm always exploring how design systems and interactivity can enhance product experiences.
                            </div>
                            <div className="mt-3 text-sm text-gray-400">
                              Currently pursuing a B.Tech in CSE, I believe in learning by building — and iterating with purpose.
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="about-back"
                            initial={{ rotateY: -90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: 90, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }}
                            className="rounded-2xl p-6 shadow-lg border text-gray-200 min-h-[200px] bg-gradient-to-r from-[#232323] to-[#A259FF11] border-[#A259FF] flex flex-col gap-2"
                            style={{ boxShadow: '0 2px 24px 0 #A259FF22', backfaceVisibility: 'hidden', position: 'absolute', width: '100%' }}
                          >
                            <div className="text-lg font-bold text-white mb-2">Component Name: <span className="font-semibold text-[#1ABCFE]">Saksham Budhiraja</span></div>
                            <div className="text-base font-semibold text-[#A259FF] mb-2">Role: UI/UX Designer + Developer Handoff</div>
                            <div className="text-base font-semibold text-[#1ABCFE] mb-1">Skills:</div>
                            <ul className="list-disc list-inside text-gray-300 ml-2">
                              <li>Design Systems</li>
                              <li>Interactive Prototypes</li>
                              <li>Web Accessibility</li>
                              <li>React + UI Engineering</li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 mb-6">
                    {skills.map(skill => (
                      <div key={skill.name} className="flex flex-col items-center gap-1 w-16">
                        <div className="text-2xl">{skill.icon}</div>
                        <span className="text-xs text-gray-400 text-center">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Project view: tech stack and color codes
              <>
                <div className="text-xl font-bold mb-6 text-white">Tech Stack &amp; Color Codes</div>
                <div className="mb-6">
                  <div className="text-base font-semibold text-gray-300 mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {projects[selected].tech.map((t, i) => (
                      <span key={t} className="px-2 py-1 rounded text-xs" style={{ background: figmaColors[i % figmaColors.length], color: '#fff' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-base font-semibold text-gray-300 mb-2">Figma Logo Colors</div>
                <div className="flex gap-2">
                  {figmaColors.map((c, i) => (
                    <span key={i} className="w-6 h-6 rounded-full border-2 border-[#262626]" style={{ background: c }}></span>
                  ))}
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
      {/* Floating Toolbar */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 flex gap-12 border rounded-2xl shadow-2xl px-16 py-3 items-center" style={{ background: '#232323', border: '1px solid #262626', boxShadow: '0 4px 24px 0 #0004', minWidth: 520 }}>
        <a href="/portfolio" className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg font-medium transition" style={{ color: figmaColors[3], background: '#232323' }}>
          <FaUser size={22} />
          <span className="text-base">Portfolio</span>
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg font-medium transition" style={{ color: '#fff', background: '#232323' }}>
          <FaFileAlt size={22} />
          <span className="text-base">Resume</span>
        </a>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg font-medium transition" style={{ color: '#fff', background: '#232323' }}>
          <FaLink size={22} />
          <span className="text-base">Socials</span>
        </a>
      </div>
      </div>
  );
}
