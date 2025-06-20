import React, { useState, useEffect } from "react";
import "@fontsource/inter";
import { FaUser, FaFileAlt, FaLink, FaReact, FaFigma, FaNodeJs, FaJs, FaGitAlt, FaDatabase, FaTools } from "react-icons/fa";

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
    details: "This project demonstrates my ability to design and build modern web apps.",
  },
  {
    title: "Project Two",
    thumbnail: "https://via.placeholder.com/200x120?text=Project+2",
    description: "A creative mobile app.",
    tech: ["React Native", "Expo"],
    details: "A mobile app built for both iOS and Android.",
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

// Figma-style cursor SVG as a data URL
const figmaCursorSVG =
  "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 2L26 16L17 18L15 27L6 2Z' fill='white' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E";

function ProjectsTabBar() {
  return (
    <div className="w-full flex items-center gap-2 px-2 py-0.5 mb-8" style={{ background: '#232323', borderBottom: '1px solid #262626', height: 44 }}>
      {/* Vector logo (Figma-style, orange) */}
      {/*<svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="ml-2" style={{ display: 'inline-block' }}>
        <circle cx="12" cy="12" r="10" fill="#F24E1E" />
        <path d="M12 7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#fff" />
      </svg>*/}
      <span className="text-base font-medium text-white px-3 py-1 rounded flex items-center gap-2" style={{ background: 'FFFFFFF', color: '#FFFFFF', fontWeight: 600 }}>
        Projects
      </span>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("about");

  // Set Figma-style cursor globally
  useEffect(() => {
    const prev = document.body.style.cursor;
    document.body.style.cursor = `url(${figmaCursorSVG}) 0 0, auto`;
    return () => {
      document.body.style.cursor = prev;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ fontFamily: 'Inter, sans-serif', background: '#1e1e1e' }}>
      <div className="flex flex-1 min-h-0">
        {/* Left Panel: Name, Page, Layers */}
        <aside className="w-64" style={{ background: '#232323', borderRight: '1px solid #262626' }}>
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
        <main className="flex-1 flex flex-col items-center justify-start py-0 px-0 min-h-0 relative overflow-hidden" style={{ background: '#1e1e1e' }}>
          <ProjectsTabBar />
          <div className="flex flex-wrap gap-8 relative z-10 px-8 py-12">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                className={`group w-64 rounded-2xl shadow-2xl border-2 border-transparent hover:border-white transition-all duration-300 cursor-pointer flex flex-col items-center p-4 ${selected === idx ? 'ring-2 ring-white' : ''}`}
                style={{ background: '#232323' }}
                onClick={() => setSelected(idx)}
              >
                <img src={project.thumbnail} alt={project.title} className="rounded-xl mb-4 w-full h-32 object-cover" style={{ background: '#262626' }} />
                <div className="font-semibold text-lg text-white mb-2">{project.title}</div>
                <div className="text-gray-400 text-sm text-center mb-2">{project.description}</div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={t} className="px-2 py-1 rounded text-xs" style={{ background: figmaColors[i % figmaColors.length], color: '#fff' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Panel: Header, Tabs, About/Tools */}
        <aside className="w-[440px] border-l" style={{ background: '#232323', borderLeft: '1px solid #262626' }}>
          <div className="flex flex-col py-8 px-8 h-full">
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
              <div className="mb-6 text-gray-200 min-h-[120px]">
                Hi! I'm Saksham, a passionate developer and designer who loves building beautiful, functional web experiences. I enjoy working with modern tools like React, Figma, and Node.js, and I'm always learning new things.
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
            {/* Inspect Section */}
            <div className="text-lg font-semibold mb-2" style={{ color: figmaColors[2] }}>Inspect</div>
            <div className="rounded-lg p-4 text-xs text-gray-400" style={{ background: '#262626' }}>
              <div>Spacing: <span style={{ color: figmaColors[2] }}>24px</span></div>
              <div>Color: <span style={{ color: figmaColors[2] }}>#A259FF</span></div>
              <div>Padding: <span style={{ color: figmaColors[2] }}>16px</span></div>
            </div>
          </div>
        </aside>
      </div>
      {/* Floating Toolbar */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 flex gap-8 border rounded-2xl shadow-2xl px-8 py-3 items-center" style={{ background: '#232323', border: '1px solid #262626', boxShadow: '0 4px 32px 0 #A259FF22' }}>
        <a href="/portfolio" className="flex flex-col items-center" style={{ color: figmaColors[3] }}>
          <FaUser size={22} />
          <span className="text-xs mt-1">Portfolio</span>
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center" style={{ color: figmaColors[0] }}>
          <FaFileAlt size={22} />
          <span className="text-xs mt-1">Resume</span>
        </a>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center" style={{ color: figmaColors[1] }}>
          <FaLink size={22} />
          <span className="text-xs mt-1">Socials</span>
        </a>
      </div>
    </div>
  );
}
