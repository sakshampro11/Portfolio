import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { FaUser, FaFileAlt, FaLink, FaReact, FaFigma, FaNodeJs, FaJs, FaGitAlt, FaDatabase, FaTools, FaArrowLeft, FaMapMarkedAlt, FaTag, FaTasks, FaUniversalAccess, FaExternalLinkAlt, FaUsers, FaShoppingCart, FaStar, FaVial, FaCommentDots, FaMousePointer, FaSearchPlus, FaGithub, FaShareAlt, FaPalette, FaLinkedin, FaInstagram, FaTimes } from "react-icons/fa";
import { SiTailwindcss, SiSketch, SiCanva, SiInkscape } from 'react-icons/si';
import { VscFileCode, VscSymbolFile } from 'react-icons/vsc';
import { GoCheck } from 'react-icons/go';
import { BsArrowRight, BsDiagram3, BsGrid1X2, BsPuzzle } from 'react-icons/bs';
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const figmaColors = [
  "#F24E1E", // orange
  "#FF7262", // pink
  "#A259FF", // purple
  "#1ABCFE", // blue
  "#0ACF83", // green
];

const projects = [
  {
    title: "City Issue Reporter (Lokally)",
    thumbnail: "/public/lokallylp.png",
    description: "Web UI/UX Design · Hackathon Project.",
    tech: ["Figma", "React", "Tailwind CSS"],
    tags: ["UI", "Web"],
    colors: ["#2D89DA", "#202020", "#D9D9D9", "#F6554F"],
    caseStudy: {
      heroImage: "/public/locallyhome.png",
      showcaseImages: [
        "/public/lokallylp.png",
        "/public/locallyhome.png",
        "/public/lokally3.png",
        "/public/lokally4.png",
      ],
      overview: `Lokally is a civic-tech web platform that enables citizens to report local issues like potholes, broken streetlights, or garbage dumps directly to the municipal body. Designed during a civic innovation hackathon, Lokally simplifies the process of submitting, tracking, and prioritizing public problems — bringing accountability and transparency to urban governance.
<br />
<br />
🛠 Tools: Figma, React, Tailwind CSS  <br />
🎨 Roles: UI/UX Design, Ideation.`,
      goal: "To simplify the citizen-to-municipality communication loop with an intuitive dashboard UI.",
      designProcess: `A 7-step process was followed to take the project from ideation to a functional prototype, focusing on user needs and rapid iteration.`,
      designSystem: "Comprehensive design system with color palette, typography, and components."
    },
    x: 100,
    y: 100,
  },
  {
    title: "FarmEazyy",
    thumbnail: "/public/Farmeazyy1.png",
    description: "Web Platform for Farmers and Buyers",
    tech: ["React Native", "Figma"],
    tags: ["AgriTech", "UI", "Web", "live"],
    colors: ["#32A071", "#FFFFFF", "#A6A6A6", "#36BB11"],
    links: {
      live: "https://farmeazyy.vercel.app/",
      figma: "https://www.figma.com/design/Xl1lCZFt1kezELiIUX9VgE/project-1?node-id=0-1&t=I9TlpHwlQbN7RyZG-1",
      prototype: "https://www.figma.com/proto/Xl1lCZFt1kezELiIUX9VgE/project-1?page-id=0%3A1&node-id=0-400&viewport=129%2C37%2C0.13&t=XrLoaYaw2QQZsJax-1&scaling=min-zoom&content-scaling=fixed"
    },
    caseStudy: {
      heroImage: "/public/Farmeazyy2.png",
      showcaseImages: [
        "/public/Farmeazyy11.png",
        "/public/Farmeazyy2.png",
        "/public/Farmeazyy12.png",
        "/public/Farmeazyy3.png",
      ],
      overview: "FarmEazyy is a farmer-focused digital platform that bridges the gap between local farmers and industrial buyers or market vendors. Designed during Smart India Hackathon, the platform empowers small-scale farmers by providing a transparent and accessible way to list their produce, get real-time pricing, and connect directly with buyers — reducing middlemen and ensuring fair trade.<br /><br /> 🛠 Tools: Figma, React, Tailwind CSS  <br />🎨 Roles: UI/UX Design, Visual Branding",
      goal: "To build a transparent marketplace that empowers farmers with direct market access through a user-friendly web platform.",
      designProcess: "A 6-step funnel approach was used to guide the design from user journey mapping to final user testing.",
      designSystem: "A clean and modern design system focusing on clarity and ease-of-use. Typography features Post No Bills Colombo ExtraBold for headings and Poppins for body text."
    },
    x: 500,
    y: 100,
  },
  {
    title: "Lokally–Hyperlocal Delivery App",
    thumbnail: "/public/a1.png",
    description: "Mobile-first local delivery solution",
    tech: ["Figma", "Prototyping", "Components"],
    tags: ["Figma", "Designathon"],
    colors: ["#4472BA", "#EE2D35", "#DBDBDB", "#EFF9FF", "#D2EBD3", "#65BF6C", "#404040"],
    links: {
      figma: "https://www.figma.com/design/JRtnmIT0Pz1t8E13fZ1i6s/Lokally?node-id=265-3658&t=lk64IZ5edoer1Lr0-1",
      prototype: "https://www.figma.com/proto/JRtnmIT0Pz1t8E13fZ1i6s/Lokally?page-id=1%3A2&node-id=265-3700&viewport=231%2C-70%2C0.11&t=JaBuuXzfkLN6HoYk-1&scaling=min-zoom&content-scaling=fixed"
    },
    caseStudy: {
      heroImage: "/public/a2.png",
      showcaseImages: [
        "/public/a3.png",
        "/public/a4.png",
        "/public/a5.png",
        "/public/a6.png",
      ],
      overview: "Lokally is a hyperlocal delivery app designed to help neighborhood sellers reach buyers within their vicinity. Created during a 48 hour Designathon, Lokally focuses on simplifying local commerce by making seller discovery, order placement, and delivery coordination seamless — with a mobile-first approach tailored for urban users.<br /><br />🛠 Tools: Figma<br />🎨 Roles: UI/UX Design, Research, Prototyping",
      goal: "To streamline hyperlocal deliveries by bridging buyers and neighborhood sellers through a fast, reliable mobile platform.",
      designProcess: "A 7-step user-centric design process was implemented, starting from identifying user pain points to iterative prototyping and feedback.",
      designSystem: "A comprehensive design system featuring a vibrant color palette and Helvetica typography to ensure a clean, user-friendly interface."
    },
    x: 100,
    y: 400,
  },
  {
    title: "My Design Portfolio",
    thumbnail: "/public/p1.png",
    description: "Figma-style interactive portfolio site",
    tech: ["Figma", "Tailwind CSS", "React", "Framer Motion"],
    tags: ["Workspace", "Inception"],
    links: {
      figma: "https://figma.com/@saksham15"
    },
    caseStudy: {
      heroImage: "/public/p2.png",
      showcaseImages: [
        "/public/p3.png",
        "/public/p4.png",
        "/public/p5.png",
        "/public/p6.png",
      ],
      overview: "This portfolio isn't just a site — it's a playground of my design personality. Inspired by Figma's layout, I built it as an interactive design system to showcase not just what I've made, but how I think. Every scroll, card, and hover is intentional — from cursor interactions to section-based storytelling. <br /><br /> I'm Saksham Budhiraja — a UI/UX designer and frontend developer who thinks in frames and builds in pixels",
      goal: "To create a seamless, scrollable experience that reflects my style, skills, and storytelling.",
      designProcess: "The portfolio was built with a process that balanced structure, inspiration, and technical execution to create a unique, personal experience.",
      designSystem: "The entire site acts as its own design system, featuring Figma's color palette, Inter typeface, and a component-based architecture including the 3-panel layout and case study artboards."
    },
    x: 500,
    y: 400,
  },
];

const CursorAiIcon = () => (
  <span className="font-bold tracking-tighter text-2xl text-gray-300">
    C<span style={{color: '#1ABCFE'}}>A</span>
  </span>
);

const tools = [
  { name: "Figma", icon: <FaFigma className="text-pink-400" /> },
  { name: "React", icon: <FaReact className="text-sky-400" /> },
  { name: "GitHub", icon: <FaGithub className="text-white" /> },
  { name: "Cursor AI", icon: <CursorAiIcon /> },
  { name: "Sketch", icon: <SiSketch className="text-yellow-500" /> },
  { name: "Canva", icon: <SiCanva className="text-cyan-400" /> },
  { name: "Inkscape", icon: <SiInkscape className="text-white" /> },
  { name: "Tailwind CSS", icon: <FaTools className="text-cyan-300" /> },
];

const designProcessSteps = [
  { step: 1, title: "Research Pain Points", description: "Identifying challenges in existing civic apps", icon: FaMapMarkedAlt, color: "text-blue-300", iconColor: "text-blue-300" },
  { step: 2, title: "Define User Flow", description: "Mapping out the user journey", icon: BsDiagram3, color: "text-cyan-300", iconColor: "text-cyan-300" },
  { step: 3, title: "Design UI", description: "Creating a clean, card-based interface", icon: BsGrid1X2, color: "text-green-300", iconColor: "text-green-300" },
  { step: 4, title: "Build Components", description: "Developing responsive components", icon: BsPuzzle, color: "text-lime-300", iconColor: "text-lime-300" },
  { step: 5, title: "Focus on Accessibility", description: "Ensuring the app is usable for everyone", icon: FaUniversalAccess, color: "text-yellow-300", iconColor: "text-yellow-300" },
  { step: 6, title: "Implement Urgency Tagging", description: "Adding tags to prioritize urgent issues", icon: FaTag, color: "text-orange-300", iconColor: "text-orange-300" },
  { step: 7, title: "Smooth Complaint Tracking", description: "Streamlining the process for tracking", icon: FaTasks, color: "text-red-300", iconColor: "text-red-300" },
];

const farmEazyyDesignProcessSteps = [
    { step: 1, title: "Define User Journeys", description: "Mapping farmer and buyer interactions", icon: BsDiagram3, color: "text-blue-400", iconColor: "text-blue-400" },
    { step: 2, title: "Visualize Marketplace", description: "Designing a user-friendly interface", icon: BsGrid1X2, color: "text-green-400", iconColor: "text-green-400" },
    { step: 3, title: "Prioritize Accessibility", description: "Ensuring usability for all users", icon: FaUniversalAccess, color: "text-lime-400", iconColor: "text-lime-400" },
    { step: 4, title: "Develop UI Components", description: "Building consistent and responsive elements", icon: BsPuzzle, color: "text-yellow-400", iconColor: "text-yellow-400" },
    { step: 5, title: "Integrate Price Indicators", description: "Providing real-time pricing guidance", icon: FaTag, color: "text-orange-400", iconColor: "text-orange-400" },
    { step: 6, title: "Test with Users", description: "Conducting usability testing for improvements", icon: GoCheck, color: "text-red-400", iconColor: "text-red-400" },
];

const lokallyDesignProcessSteps = [
    { title: "Identify Urban Retail Pain Points", description: "Interviewed local sellers and buyers", icon: FaCommentDots, color: "text-red-400" },
    { title: "Map Dual User Flows", description: "Created separate flows for sellers and customers", icon: FaUsers, color: "text-orange-400" },
    { title: "Design a Card-first UI", description: "Developed a card-based product listing layout", icon: BsGrid1X2, color: "text-yellow-400" },
    { title: "Enable Location-based Filtering", description: "Integrated real-time location detection", icon: FaMapMarkedAlt, color: "text-green-400" },
    { title: "Simplify Checkout & Delivery Preferences", description: "Built a quick checkout experience", icon: FaShoppingCart, color: "text-cyan-400" },
    { title: "Incorporate Trust Signals", description: "Highlighted verified sellers and buyer ratings", icon: FaStar, color: "text-blue-400" },
    { title: "Prototype & Refine Based on Feedback", description: "Created interactive prototypes and tested them", icon: FaVial, color: "text-purple-400" },
];

const portfolioDesignProcessSteps = [
  { side: 'left', title: "Structure First", description: "Defined core components", icon: VscFileCode, color: "text-cyan-400" },
  { side: 'right', title: "Inspiration", description: "Took cues from Figma's interface", icon: FaFigma, color: "text-blue-400" },
  { side: 'left', title: "Code & Motion", description: "Built using React + Tailwind", icon: FaReact, color: "text-green-400" },
  { side: 'right', title: "System Thinking", description: "Created reusable design tokens", icon: BsDiagram3, color: "text-green-400" },
  { side: 'right', title: "Polish & Personality", description: "Added hover states and quirky touches", icon: FaStar, color: "text-yellow-400" },
];

const portfolioKeyFeatures = [
    { title: "Figma-Inspired UI", description: "A three-panel layout with a central canvas, inspired by professional design tools.", icon: FaFigma },
    { title: "Interactive Canvas", description: "The workspace is pannable and zoomable, mimicking an infinite design canvas.", icon: FaSearchPlus },
    { title: "Dynamic Side Panels", description: "Side panels adjust based on the selected content, providing context-aware information.", icon: BsGrid1X2 },
    { title: "Custom Cursor", description: "A custom Figma-style cursor enhances the thematic experience of the workspace.", icon: FaMousePointer },
];

const socials = [
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/saksham-budhiraja-545b1028b/" },
  { name: "GitHub", icon: <FaGithub />, url: "https://github.com/sakshampro11" },
  { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/saksham.pro._/?__pwa=1" },
];

const figmaCursorSVG =
  "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 2L28 16L18 18L16 28L4 2Z' fill='black' stroke='white' stroke-width='3'/%3E%3C/svg%3E";

const customScrollbarStyle = document.createElement('style');
customScrollbarStyle.innerHTML = `
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  background: #1e1e1e;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 3px;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #444 #1e1e1e;
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

const style = document.createElement('style');
style.innerHTML = `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`;
document.head.appendChild(style);

export default function App() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("about");
  const [zoom, setZoom] = useState(1);
  const workspaceRef = useRef(null);
  const [showFakeCursor, setShowFakeCursor] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 80, y: 80 });
  const [aboutFlipped, setAboutFlipped] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [workspaceBg, setWorkspaceBg] = useState('#1e1e1e');
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (workspace) {
      workspace.style.cursor = `url('/path/to/figma-cursor.png') 4 4, auto`;
    }
    return () => {
      if (workspace) workspace.style.cursor = "auto";
    };
  }, []);

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
    const cardPositions = [
      { x: 120, y: 120 }, { x: 520, y: 120 },
      { x: 120, y: 420 }, { x: 520, y: 420 },
    ];
    const path = [{ x: 60, y: 60 }, ...cardPositions];
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
    <div className="min-h-screen flex flex-col font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif', background: '#232323' }}>
      <div className="flex flex-1 min-h-0">
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

        <main className="flex-1 flex flex-col items-center justify-start py-0 px-0 min-h-0 relative ml-64 mr-64 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar" style={{ background: '#1e1e1e' }}>
          <div className="w-full sticky top-0 z-30 bg-[#1e1e1e]/80 backdrop-blur-sm">
            <ProjectsTabBar selectedProject={selected} onBack={() => setSelected(null)} />
          </div>
          {selected === null ? (
            <div
              ref={workspaceRef}
              className="relative w-full flex-1"
              style={{ background: '#1e1e1e', cursor: `url(${figmaCursorSVG}) 4 4, auto` }}
            >
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
              <motion.div
                style={{ width: 1200, height: 800, position: 'relative', transform: `scale(${zoom})`, transformOrigin: '0 0', perspective: 1200, transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)' }}
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
              >
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.title}
                    className={`absolute group w-[320px] h-[240px] rounded-xl shadow-2xl border-2 border-transparent cursor-pointer flex flex-col items-stretch p-0 bg-[#232323]`}
                    style={{ left: project.x, top: project.y, transformStyle: "preserve-3d" }}
                    onClick={() => setSelected(idx)}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ y: -15, rotateX: 8, rotateY: -8, scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.7)' }}
                    whileTap={{ scale: 1.02, y: -10, rotateX: 0, rotateY: 0, boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.5)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.1 }}
                  >
                    <div className="flex-1 rounded-t-xl overflow-hidden flex items-center justify-center bg-[#262626]">
                      <img src={project.thumbnail} alt={project.title} className="object-cover w-full h-full" />
                    </div>
                     <motion.div 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl pointer-events-none"
                      initial={{opacity: 0}}
                      whileHover={{opacity: 1}}
                    >
                      <span className="text-white font-bold text-lg border-2 border-white rounded-lg px-4 py-2">View Project</span>
                    </motion.div>
                    <div className="flex flex-col gap-1 px-4 py-3 bg-[#232323] rounded-b-xl border-t border-[#262626]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#262626] flex items-center justify-center text-xs font-bold text-white">{project.title[0]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="truncate text-white font-medium text-base">{project.title}</div>
                          <div className="truncate text-xs text-gray-400">{project.description}</div>
                        </div>
                      </div>
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
              className="relative w-full flex-1 min-h-0 flex justify-center items-start"
              style={{ background: '#1e1e1e', cursor: `url(${figmaCursorSVG}) 4 4, auto` }}
            >
              <div className="w-[900px] min-h-[1200px] rounded-2xl shadow-2xl my-12 flex flex-col px-12 py-10 relative" style={{ background: '#262626', boxShadow: '0 4px 32px 0 #0004' }}>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-6 left-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#232323] border border-[#444] text-gray-300 hover:text-orange-400 hover:bg-[#18181b] transition shadow-lg"
                  title="Back to Projects"
                >
                  <FaArrowLeft size={20} />
                </button>
                <div className="flex flex-row gap-10 mb-10 mt-16">
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="text-5xl font-extrabold text-white">{projects[selected].title}</div>
                    <div className="text-xl text-gray-200 font-semibold">{projects[selected].description}</div>
                    <div className="text-base text-gray-200 font-bold mt-4">ABOUT</div>
                    <div className="text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: projects[selected].caseStudy.overview }}></div>
                    <div className="text-base text-gray-200 font-bold mt-4">GOAL</div>
                    <div className="text-sm text-gray-400">{projects[selected].caseStudy.goal}</div>
                  </div>
                  <div className="w-1/3">
                    {projects[selected].caseStudy.heroImage ? (
                      <img src={projects[selected].caseStudy.heroImage} alt={projects[selected].title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    ) : (
                      <div className="bg-gray-700 w-full h-64 rounded-lg"></div>
                    )}
                  </div>
                </div>

                <div className="mb-10">
                  <div className="text-2xl font-bold text-white mb-2">DESIGN PROCESS</div>
                  <div className="text-sm text-gray-400 mb-6">{projects[selected].caseStudy.designProcess}</div>
                  {projects[selected].title === "City Issue Reporter (Lokally)" ? (
                    <div className="relative">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {designProcessSteps.map((item, index) => (
                          <div key={item.step} className={`flex items-start p-4 rounded-lg bg-[#252526] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                            <div className="flex-shrink-0 mr-4">
                              <div className={`w-12 h-12 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center`}>
                                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                              </div>
                            </div>
                            <div>
                              <p className={`text-lg font-bold ${item.color}`}>{item.title}</p>
                              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : projects[selected].title === "FarmEazyy" ? (
                    <div className="relative">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {farmEazyyDesignProcessSteps.map((item, index) => (
                          <div key={item.step} className={`flex items-start p-4 rounded-lg bg-[#252526] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                            <div className="flex-shrink-0 mr-4">
                              <div className={`w-12 h-12 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center`}>
                                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                              </div>
                            </div>
                            <div>
                              <p className={`text-lg font-bold ${item.color}`}>{item.title}</p>
                              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : projects[selected].title === "Lokally–Hyperlocal Delivery App" ? (
                    <div className="relative pl-8">
                      {lokallyDesignProcessSteps.map((item, index) => (
                        <div key={item.title} className="flex items-start mb-8">
                          <div className="absolute left-0 flex flex-col items-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${item.color.replace('text-', 'bg-')} bg-opacity-20`}>
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color.replace('text-', 'bg-')} bg-opacity-30`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                              </div>
                            </div>
                            {index < lokallyDesignProcessSteps.length - 1 && <div className="w-0.5 h-12 bg-gray-600" />}
                          </div>
                          <div className="ml-12 pl-8">
                            <p className={`text-lg font-bold ${item.color}`}>{item.title}</p>
                            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : projects[selected].title === "My Design Portfolio" ? (
                    <div className="relative py-8">
                      <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-600" />
                        <div className="space-y-12">
                          {portfolioDesignProcessSteps.map((item, index) => (
                            <div key={index} className="relative flex items-center">
                              {item.side === 'left' && (
                                <div className="w-1/2 pr-16 text-right">
                                  <p className={`text-lg font-bold ${item.color}`}>{item.title}</p>
                                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                                </div>
                              )}
                              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#232323] rounded-full border-2 border-gray-500 flex items-center justify-center z-10">
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                              </div>
                              {item.side === 'right' && (
                                <div className="w-1/2 pl-16 ml-auto text-left">
                                  <p className={`text-lg font-bold ${item.color}`}>{item.title}</p>
                                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                    </div>
                  ) : (
                    <div className="w-full h-[180px] bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 text-gray-500">Design Process Placeholder</div>
                  )}
                </div>

                {projects[selected].title === 'My Design Portfolio' && (
                  <div className="my-12 pt-12">
                    <div className="text-2xl font-bold text-white mb-8">KEY FEATURES</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {portfolioKeyFeatures.map((feature, index) => (
                          <motion.div 
                            key={feature.title} 
                            className="bg-[#2C2C2C] p-6 rounded-lg border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-900">
                                <feature.icon className="w-6 h-6 text-cyan-400" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                                <p className="text-sm text-gray-400">{feature.description}</p>
                              </div>
                            </div>
                          </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="my-12 pt-12">
                   <div className="text-2xl font-bold text-white mb-4">UI SHOWCASE</div>
                   {projects[selected].caseStudy.showcaseImages && projects[selected].caseStudy.showcaseImages.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects[selected].caseStudy.showcaseImages.map((imgSrc, index) => (
                          <div key={index} className="bg-[#2C2C2C] aspect-video rounded-lg p-2 border border-gray-700">
                            <img src={imgSrc} alt={`Showcase ${index + 1}`} className="w-full h-full object-cover rounded-md"/>
                          </div>
                        ))}
                      </div>
                   ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-[#2C2C2C] aspect-video rounded-lg p-2 border border-gray-700"><div className="w-full h-full bg-gray-900 rounded-md flex items-center justify-center text-gray-500">Image 1</div></div>
                       <div className="bg-[#2C2C2C] aspect-video rounded-lg p-2 border border-gray-700"><div className="w-full h-full bg-gray-900 rounded-md flex items-center justify-center text-gray-500">Image 2</div></div>
                       <div className="bg-[#2C2C2C] aspect-video rounded-lg p-2 border border-gray-700"><div className="w-full h-full bg-gray-900 rounded-md flex items-center justify-center text-gray-500">Image 3</div></div>
                       <div className="bg-[#2C2C2C] aspect-video rounded-lg p-2 border border-gray-700"><div className="w-full h-full bg-gray-900 rounded-md flex items-center justify-center text-gray-500">Image 4</div></div>
                     </div>
                   )}
                 </div>

                <div className="w-full h-px bg-gray-700 opacity-40 mb-10"></div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-white mb-2">DESIGN SYSTEM</div>
                  <div className="flex flex-row gap-8">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-gray-200 mb-1">COLOR PALETTE</div>
                      <div className="flex flex-row gap-2 mb-2">
                        {(projects[selected].colors || figmaColors).map((c, i) => (
                          <span key={i} className="w-8 h-8 rounded-lg border border-gray-700" style={{ background: c }}></span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-400">{(projects[selected].colors || figmaColors).join(' ')}</div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="text-sm font-semibold text-gray-200 mb-1">TYPOGRAPHY</div>
                      {projects[selected].title === 'FarmEazyy' ? (
                        <div className="text-xs text-gray-400">
                          <div><span className="font-semibold text-gray-200">Headings:</span> Post No Bills Colombo ExtraBold</div>
                          <div><span className="font-semibold text-gray-200">Body:</span> Poppins</div>
                        </div>
                      ) : projects[selected].title === 'Lokally–Hyperlocal Delivery App' ? (
                        <div className="text-xs text-gray-400">
                          <div><span className="font-semibold text-gray-200">Font:</span> Helvetica</div>
                        </div>
                      ) : projects[selected].title === 'My Design Portfolio' ? (
                        <div className="text-xs text-gray-400">
                          <div><span className="font-semibold text-gray-200">Font:</span> Inter</div>
                        </div>
                      ) : (
                        <div className="flex flex-row gap-4">
                          <div className="flex flex-col items-start">
                            <span className="text-2xl font-bold text-white">Aa</span>
                            <span className="text-xs font-semibold text-gray-200">Typeface</span>
                            <span className="text-xs text-gray-400">Space Grotesk</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      {projects[selected].title === 'Lokally–Hyperlocal Delivery App' ? (
                        <>
                          <div className="text-sm font-semibold text-gray-200 mb-1">Delivery Systems</div>
                          <div className="text-xs text-gray-400 border-2 border-dashed border-gray-500 rounded-lg min-h-[60px] p-2">
                            Quick, Same Day and 24 hours
                          </div>
                        </>
                      ) : projects[selected].title === 'FarmEazyy' ? null : (
                        <>
                          <div className="text-sm font-semibold text-gray-200 mb-1">Card Layout (complaints)</div>
                          <div className="text-xs text-gray-400 border-2 border-dashed border-gray-500 rounded-lg min-h-[60px] p-2">
                            Reusable container with padding, corner radius and + NEW COMPLAINT Button
                          </div>
                        </>
                      )}
                      {projects[selected].title === 'My Design Portfolio' && (
                        <>
                          <div className="text-sm font-semibold text-gray-200 mb-1">Core Components</div>
                          <div className="text-xs text-gray-400 border-2 border-dashed border-gray-500 rounded-lg min-h-[60px] p-2">
                            3-Panel Layout, Case Study Artboards, Interactive Workspace
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <aside
          className={selected === null ? "w-[440px] fixed top-0 right-0 h-full z-40 border-l" : "w-64 fixed top-0 right-0 h-full z-40 border-l"}
          style={{ background: '#232323', borderLeft: '1px solid #262626' }}
        >
          <div className="flex flex-col py-8 px-8 h-full relative">
            {selected === null ? (
              <>
                <div className="absolute top-9 right-8">
                  <button onClick={handleShare} className="relative group p-2 rounded-full hover:bg-[#262626] transition-colors">
                    <FaShareAlt className="text-gray-400 group-hover:text-white transition-colors" />
                    <AnimatePresence>
                      {linkCopied && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full mt-2 right-0 w-max px-3 py-1.5 bg-black text-white text-xs rounded-md shadow-lg"
                        >
                          Link Copied!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ background: figmaColors[0] }}>S</div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: figmaColors[0] }}>Saksham Budhiraja</div>
                    <div className="text-sm text-gray-400">UI UX Designer</div>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <button onClick={() => setTab('about')} className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition ${tab === 'about' ? 'bg-[#1e1e1e] text-white' : 'bg-[#232323] text-gray-400 hover:bg-[#262626]'}`}>About Me</button>
                  <button onClick={() => setTab('tools')} className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition ${tab === 'tools' ? 'bg-[#1e1e1e] text-white' : 'bg-[#232323] text-gray-400 hover:bg-[#262626]'}`}>Tools</button>
                </div>
                {tab === 'about' ? (
                  <div className="relative mb-6 min-h-[120px]">
                    <div className="absolute top-3 right-4 z-10">
                      <button
                        onClick={() => setAboutFlipped(f => !f)}
                        className="rounded-full bg-[#232323] hover:bg-[#1ABCFE] text-[#1ABCFE] hover:text-white p-2 shadow-md border border-[#1ABCFE] transition-transform active:scale-90"
                        title="Flip Card"
                        style={{ outline: 'none', border: 'none' }}
                      >
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
                  <div className="grid grid-cols-3 gap-4 mb-6 p-1">
                    {tools.map(tool => (
                      <motion.div 
                        key={tool.name} 
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#262626] border border-transparent hover:border-cyan-400 cursor-pointer"
                        whileHover={{ scale: 1.08, y: -5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      >
                        <div className="text-3xl h-8 flex items-center">{tool.icon}</div>
                        <span className="text-xs text-gray-300 text-center font-medium h-4">{tool.name}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-xl font-bold mb-6 text-white">Project Details</div>
                <div className="mb-6">
                  <div className="text-base font-semibold text-gray-300 mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {projects[selected].tech.map((t, i) => (
                      <span key={t} className="px-2 py-1 rounded text-xs" style={{ background: figmaColors[i % figmaColors.length], color: '#fff' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-base font-semibold text-gray-300 mb-2">Color Palette</div>
                  <div className="flex gap-2">
                    {(projects[selected].colors || figmaColors).map((c, i) => (
                      <span key={i} className="w-6 h-6 rounded-full border-2 border-[#262626]" style={{ background: c }}></span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-700">
                  <div className="text-base font-semibold text-gray-300 mb-2">Links</div>
                  <div className="flex flex-col gap-2">
                    <a 
                      href={projects[selected].links?.figma || "#"}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition"
                    >
                      <FaFigma /> Figma
                    </a>
                    <a 
                      href={projects[selected].links?.prototype || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition"
                    >
                      <FaLink /> Prototype
                    </a>
                    {projects[selected].links?.live ? (
                       <a 
                        href={projects[selected].links.live}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition"
                      >
                        <FaExternalLinkAlt /> Website
                      </a>
                    ) : (
                      <button 
                        disabled 
                        className="flex items-center justify-center gap-2 w-full bg-gray-700 text-gray-500 font-bold py-2 px-4 rounded-md cursor-not-allowed"
                      >
                        Website (not live)
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 flex gap-12 border rounded-2xl shadow-2xl px-16 py-3 items-center" style={{ background: '#232323', border: '1px solid #262626', boxShadow: '0 4px 24px 0 #0004', minWidth: 520 }}>
        <a href="/portfolio" className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg font-medium transition" style={{ color: figmaColors[3], background: '#232323' }}>
          <FaUser size={22} />
          <span className="text-base">Portfolio</span>
        </a>
        <button onClick={() => setIsResumeOpen(true)} className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg font-medium transition" style={{ color: '#fff', background: '#232323' }}>
          <FaFileAlt size={22} />
          <span className="text-base">Resume</span>
        </button>
        <button onClick={() => setIsSocialsOpen(true)} className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg font-medium transition" style={{ color: '#fff', background: '#232323' }}>
          <FaLink size={22} />
          <span className="text-base">Socials</span>
        </button>
      </div>

      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-[#262626] z-50 flex items-center justify-center"
          >
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-lg transition text-lg"
            >
              <FaFileAlt /> View Resume PDF
            </a>
            <button 
              onClick={() => setIsResumeOpen(false)}
              className="absolute top-1/2 -translate-y-1/2 right-8 text-gray-400 hover:text-white transition-colors text-2xl"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSocialsOpen && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-[#262626] z-50 flex items-center justify-center"
          >
            <div className="flex gap-12 items-center">
              {socials.map(social => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110 text-3xl"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <button 
              onClick={() => setIsSocialsOpen(false)}
              className="absolute top-1/2 -translate-y-1/2 right-8 text-gray-400 hover:text-white transition-colors text-2xl"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
