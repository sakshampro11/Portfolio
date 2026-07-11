import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { FaUser, FaFileAlt, FaLink, FaReact, FaFigma, FaNodeJs, FaJs, FaGitAlt, FaDatabase, FaTools, FaArrowLeft, FaMapMarkedAlt, FaTag, FaTasks, FaUniversalAccess, FaExternalLinkAlt, FaUsers, FaShoppingCart, FaStar, FaVial, FaCommentDots, FaMousePointer, FaSearchPlus, FaGithub, FaShareAlt, FaPalette, FaLinkedin, FaInstagram, FaTimes, FaChevronDown, FaPlus, FaBars, FaEnvelope, FaGamepad, FaMusic, FaCogs, FaRocket, FaServer, FaCode, FaChartBar, FaSortAmountDown, FaMemory, FaCloudUploadAlt } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { SiTailwindcss, SiSketch, SiCanva, SiInkscape, SiGmail } from 'react-icons/si';
import { VscFileCode, VscSymbolFile } from 'react-icons/vsc';
import { GoCheck } from 'react-icons/go';
import { BsArrowRight, BsDiagram3, BsGrid1X2, BsPuzzle } from 'react-icons/bs';
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import { Analytics } from '@vercel/analytics/react';

const figmaColors = [
  "#F24E1E", // orange
  "#FF7262", // pink
  "#A259FF", // purple
  "#1ABCFE", // blue
  "#0ACF83", // green
];

const posterPlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000' fill='none'><rect width='800' height='1000' rx='24' fill='%231e1e1e'/><rect x='40' y='40' width='720' height='920' rx='16' fill='%23282828'/><text x='400' y='520' text-anchor='middle' fill='%23A6A6A6' font-family='Inter, sans-serif' font-size='36' font-weight='600'>Poster Placeholder</text></svg>";

// Visual Design Projects - 10 Poster Placeholders
const visualDesignProjects = [
  {
    title: "Poster 1",
    thumbnail: "/poster1.jpg",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Poster"],
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 100,
    y: 100,
  },
  {
    title: "Poster 2",
    thumbnail: "/poster2.jpg",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Poster"],
    colors: ["#2C3E50", "#E74C3C", "#F39C12", "#27AE60"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 3",
    thumbnail: "/poster3.jpg",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Poster"],
    colors: ["#FF9FF3", "#54A0FF", "#5F27CD", "#00D2D3"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 4",
    thumbnail: "/poster4.jpg",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Poster"],
    colors: ["#8E44AD", "#3498DB", "#E67E22", "#2ECC71"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 5",
    thumbnail: "/poster5.jpg",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Insta Grid (1*3)"],
    colors: ["#E91E63", "#9C27B0", "#673AB7", "#3F51B5"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 6",
    thumbnail: "/poster6.jpg",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Insta Grid (1*3)"],
    colors: ["#FF5722", "#FF9800", "#FFC107", "#4CAF50"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 7",
    thumbnail: "/poster7.png",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Insta Grid (3*3)"],
    colors: ["#795548", "#607D8B", "#009688", "#00BCD4"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 8",
    thumbnail: "/poster8.png",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Insta Grid (1*3)"],
    colors: ["#CDDC39", "#8BC34A", "#4CAF50", "#009688"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 9",
    thumbnail: "/poster9.png",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Poster"],
    colors: ["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
  {
    title: "Poster 10",
    thumbnail: "/poster10.jpg",
    description: "Visual Design",
    tech: ["Photoshop", "Illustrator"],
    tags: ["Poster"],
    colors: ["#9E9E9E", "#607D8B", "#455A64", "#263238"],
    links: {
      behance: "https://behance.net/saksham",
      dribbble: "https://dribbble.com/saksham"
    },
    x: 50,
    y: 50,
  },
];

const projects = [
  {

    title: "Club Duelz",
    thumbnail: "/cb1.png",
    description: "Designathon - Mobile App",
    tech: ["Figma", "Ui UX", "Prototyping"],
    tags: ["UI", "Interative"],
    colors: ["#261D71", "#4E57A7", "#20195A", "#AFAFAF"],
    links: {
      figma: "https://www.figma.com/design/4L6frlnTUTgkBGk3saidaq/CLUB-DUELZ---Design-Fusion?node-id=538-30583&t=SlXUY0bKLRjFAgA0-1",
      prototype: "https://www.figma.com/proto/4L6frlnTUTgkBGk3saidaq/CLUB-DUELZ---Design-Fusion?node-id=515-56931&t=1HRWU3iIHBZRlG5C-1&scaling=scale-down&content-scaling=fixed&page-id=282%3A614&starting-point-node-id=298%3A1801&show-proto-sidebar=1"
    },
    caseStudy: {
      heroImage: "/cb2.png",
      showcaseImages: [
        "/cb3.png",
        "/cb4.png",
        "/cb5.png",
        "/cb6.png",
      ],
      overview: `Club Duelz is a sports-tech platform on a mission to transform grassroots football in India. It helps local players, organizers, and scouts come together through one digital ecosystem — tracking match stats, building player profiles, and uncovering hidden talent.
        From casual turf games to competitive leagues, Club Duelz captures every goal, assist, and defensive play, turning raw passion into data that opens doors to bigger opportunities. It’s more than just match scoring — it’s a pathway from local grounds to professional recognition.
        <br />
<br />
🛠 Tools: Figma, Prototyping, UI UX <br />
🎨 Roles: UI/UX Design, Ideation.`,
      goal: "To spotlight grassroots football talent by turning every local match into a stepping stone toward professional discovery.",
      designProcess: `A 7-step process was followed to take the project from ideation to a functional prototype, focusing on user needs and rapid iteration.`,
      designSystem: "Comprehensive design system with color palette, typography, and components."
    },
    x: 50,
    y: 50,
  },
  {
    title: "Beyond Moksha",
    thumbnail: "/bm1.png",
    description: "Freelance - Web Design",
    tech: ["Figma", "Ui UX", "Prototyping"],
    tags: ["UI", "Interface"],
    colors: ["#ffffff", "#BC911B", "#1867AE", "#1C1F3B"],
    links: {
      figma: "https://www.figma.com/design/ZnFxVTXYmkanLMhyVnTlbq/Beyond-Moksha-Design-File?node-id=0-1&t=gKPH8cbQ8cdTCwXZ-1",
      prototype: "https://www.figma.com/proto/ZnFxVTXYmkanLMhyVnTlbq/Beyond-Moksha-Design-File?page-id=0%3A1&node-id=1-2985&viewport=165%2C40%2C0.08&t=PisBbjOQOJeQqIOF-1&scaling=min-zoom&content-scaling=fixed",
    },
    caseStudy: {
      heroImage: "/bm1.png",
      showcaseImages: [
        "/bm2.png",
        "/bm3.png",
        "/bm4.png",
        "/bm5.png",
      ],
      overview: `Beyond Moksha is a wellness-focused brand offering alternative healing services, spiritual workshops, and personalized wellness programs.
       My role was to translate their philosophy into a clean, calming, and trustworthy digital experience that reflects balance, clarity, and transformation.
       
       I redesigned their website with a modern interface, improved navigation, and a holistic aesthetic, ensuring users could easily explore services, book sessions, and understand the brand’s mission.
       <br />
       <br />
       🛠 Tools: Figma, UI UX <br />
       🎨 Roles: UI/UX Design, Interface design.`,
      goal: "To build a serene, intuitive, and functional website that communicates Beyond Moksha’s identity — calm, clarity, and spiritual growth — while improving service discoverability and booking conversion.",
      designProcess: `A 7-step process capturing research, IA, wireframes, visual direction, high-fidelity UI, prototyping, and client delivery.`,
      designSystem: "Comprehensive design system with color palette, typography, and components."
    },
    x: 400,
    y: 50,
  },
  {
    title: "PSP Simulator",
    thumbnail: "/psp2.png",
    description: "Interactive Web Experience · Personal Project",
    tech: ["HTML", "CSS", "JavaScript"],
    tags: ["Frontend", "Interactive", "live"],
    colors: ["#1a1a2e", "#16213e", "#0f3460", "#533483"],
    links: {
      live: "https://sakshampsp.vercel.app/",
      github: "https://github.com/sakshampro11/PSP"
    },
    caseStudy: {
      heroImage: "/psp1.png",
      showcaseImages: [
        "/psp2.png",
        "/psp3.png",
        "/psp4.png",
        "/psp1.png",
      ],
      overview: `The PSP Simulator is a fully interactive, browser-based recreation of Sony's iconic PlayStation Portable console. Built entirely with vanilla HTML, CSS, and JavaScript, it features a pixel-perfect 3D PSP model with a functional XMB (XrossMediaBar) interface — complete with animated wave backgrounds, real-time clock, battery indicator, and smooth category navigation.<br /><br />The simulator includes playable games (Mario, Space Waves, Simon Says, Reaction Test), Spotify music integration with full playback controls, a photo gallery, a built-in web browser, and customizable settings (themes, wallpapers, brightness, volume). Every interaction — from D-pad navigation to action buttons — mirrors the real PSP experience.<br /><br />🛠 Tools: HTML, CSS, JavaScript<br />🎨 Roles: UI Engineering, Interaction Design, Frontend Development`,
      goal: "To recreate the nostalgic PSP experience as a fully interactive web application, showcasing advanced frontend engineering and attention to UI detail.",
      designProcess: `A 7-step process was followed — from concept research and visual reference, through UI architecture, to the integration of games, music, and deployable polish.`,
      designSystem: "Dark-themed design system inspired by Sony's original PSP aesthetic, featuring gradient overlays, glass reflections, and the signature XMB wave background."
    },
    x: 50,
    y: 350,
  },
  {
    title: "FarmEazyy",
    thumbnail: "/Farmeazyy1.png",
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
      heroImage: "/Farmeazyy2.png",
      showcaseImages: [
        "/Farmeazyy11.png",
        "/Farmeazyy2.png",
        "/Farmeazyy12.png",
        "/Farmeazyy3.png",
      ],
      overview: "FarmEazyy is a farmer-focused digital platform that bridges the gap between local farmers and industrial buyers or market vendors. Designed during Smart India Hackathon, the platform empowers small-scale farmers by providing a transparent and accessible way to list their produce, get real-time pricing, and connect directly with buyers — reducing middlemen and ensuring fair trade.<br /><br /> 🛠 Tools: Figma, React, Tailwind CSS  <br />🎨 Roles: UI/UX Design, Visual Branding",
      goal: "To build a transparent marketplace that empowers farmers with direct market access through a user-friendly web platform.",
      designProcess: "A 6-step funnel approach was used to guide the design from user journey mapping to final user testing.",
      designSystem: "A clean and modern design system focusing on clarity and ease-of-use. Typography features Post No Bills Colombo ExtraBold for headings and Poppins for body text."
    },
    x: 400,
    y: 350,
  },
  {
    title: "City Issue Reporter (Lokally)",
    thumbnail: "/L1.png",
    description: "Full-Stack Civic Tech Web Platform with Gemini AI",
    tech: ["React", "Express", "Gemini AI", "Firestore", "Tailwind CSS v4", "Leaflet.js"],
    tags: ["AI", "Fullstack", "Web", "live"],
    colors: ["#2D89DA", "#202020", "#D9D9D9", "#F6554F"],
    links: {
      live: "https://lokally-519985018130.asia-east1.run.app/",
      github: "https://github.com/sakshampro11/lokally-community-hero",
      figma: "https://www.figma.com/design/RYlbktSxeGz0bgSXHV20iB/Nirvana---Hack2Hustle?node-id=0-1&t=YIJ4RnwQ4Pw52JKP-1",
      prototype: "https://www.figma.com/design/RYlbktSxeGz0bgSXHV20iB/Nirvana---Hack2Hustle?node-id=0-1&t=YIJ4RnwQ4Pw52JKP-1",
    },
    caseStudy: {
      heroImage: "/locallyhome.png",
      showcaseImages: [
        "/L1.png",
        "/L2.png",
        "/L3.png",
        "/L4.png",
      ],
      overview: `Lokally is a hyperlocal civic issue-reporting platform. Citizens report problems — potholes, garbage, water leaks, electrical faults, and more — with a photo and a precise map-pin location. Google's Gemini AI automatically categorizes each report (category, priority, title, summary) and performs real-time duplicate check based on Haversine distance, description, and photo contents.<br /><br />The community verifies and upvotes reports, and dedicated Resolver accounts track each issue through its lifecycle from "Reported" to "In Progress" to "Resolved". An impact dashboard surfaces AI-generated insights, and a citizen-only gamification layer rewards active reporters with XP points and badges.<br /><br />🛠 Tools: React 18, Express, Google GenAI SDK (Gemini), Firestore, Tailwind CSS v4, Motion, Leaflet.js, Cloudinary<br />🎨 Roles: Full-Stack Development, UI/UX Design, AI System Design`,
      goal: "To bridge the gap in civic engagement by providing a transparent, AI-powered hyperlocal reporting system that builds trust and streamlines issue resolution.",
      designProcess: "A 7-stage engineering and design lifecycle was implemented — from mobile-first reporting and AI categorization, to geolocation mapping, community verification, status updates, impact analytics, and gamification.",
      designSystem: "A highly responsive, mobile-first design built with Tailwind CSS v4, featuring a map-pin picker, clear status indicator tags, and a custom dashboard interface."
    },
    x: 50,
    y: 650,
  },
  {
    title: "Lokally–Hyperlocal Delivery App",
    thumbnail: "/af.png",
    description: "Mobile-first local delivery solution",
    tech: ["Figma", "Prototyping", "Components"],
    tags: ["Figma", "Designathon"],
    colors: ["#4472BA", "#EE2D35", "#DBDBDB", "#EFF9FF", "#D2EBD3", "#65BF6C", "#404040"],
    links: {
      figma: "https://www.figma.com/design/JRtnmIT0Pz1t8E13fZ1i6s/Lokally?node-id=265-3658&t=lk64IZ5edoer1Lr0-1",
      prototype: "https://www.figma.com/proto/JRtnmIT0Pz1t8E13fZ1i6s/Lokally?page-id=1%3A2&node-id=265-3700&viewport=231%2C-70%2C0.11&t=JaBuuXzfkLN6HoYk-1&scaling=min-zoom&content-scaling=fixed"
    },
    caseStudy: {
      heroImage: "/a2.png",
      showcaseImages: [
        "/a3.png",
        "/a4.png",
        "/a5.png",
        "/a6.png",
      ],
      overview: "Lokally is a hyperlocal delivery app designed to help neighborhood sellers reach buyers within their vicinity. Created during a 48 hour Designathon, Lokally focuses on simplifying local commerce by making seller discovery, order placement, and delivery coordination seamless — with a mobile-first approach tailored for urban users.<br /><br />🛠 Tools: Figma<br />🎨 Roles: UI/UX Design, Research, Prototyping",
      goal: "To streamline hyperlocal deliveries by bridging buyers and neighborhood sellers through a fast, reliable mobile platform.",
      designProcess: "A 7-step user-centric design process was implemented, starting from identifying user pain points to iterative prototyping and feedback.",
      designSystem: "A comprehensive design system featuring a vibrant color palette and Helvetica typography to ensure a clean, user-friendly interface."
    },
    x: 400,
    y: 650,
  },
  {
    title: "Lexicide",
    thumbnail: "/lexicide1.png",
    description: "Dark Gothic Typing Combat Game",
    tech: ["Pixel Art", "Sprite Animation"],
    tags: ["Game", "live"],
    colors: ["#0A0A0A", "#880808", "#FF4D00", "#333333", "#DDD6CC"],
    links: {
      live: "https://xenkzu.itch.io/lexicide",
    },
    caseStudy: {
      heroImage: "/lexicide1.png",
      showcaseImages: [
        "/lexicide2.png",
        "/lexicide3.png",
        "/lexicide4.png",
        "/lexicide5.png",
      ],
      overview: "Type fast or die. Lexicide is a dark gothic typing combat game where every word you type becomes a weapon. Cast fireballs, chain combos, and survive relentless waves of monsters as speed and accuracy directly control your power; one mistake slows you down and leaves you exposed. As the intensity rises, enemies grow stronger and bosses demand precision under pressure, turning simple typing into a tense, skill-driven fight for survival.<br /><br />🛠 Roles: Sprite Animation for Main Character, Villains, and Boss Villain",
      goal: "To craft terrifying and fluid pixel art sprites that respond perfectly to the intense speed of typing-based combat.",
      designProcess: "We created dynamic pixel art sprites aiming for a dark gothic atmosphere. The animation process involved designing distinct stages for main characters, minions, and the climactic boss villain to match the game's escalating tension.",
      designSystem: "A horror-fantasy pixel art style with deep reds and oppressive blacks, bringing out the bleak, gothic atmosphere of the typing arena."
    },
    x: 50,
    y: 950,
  },
  {
    title: "SRECP – Ranking Engine",
    thumbnail: "/srecp2.png",
    description: "DSA-Powered Dashboard · Personal Project",
    tech: ["C++", "Node.js", "HTML/CSS"],
    tags: ["Backend", "DSA", "Dashboard", "live"],
    colors: ["#6C5CE7", "#A29BFE", "#0D0D1A", "#2ECC71"],
    links: {
      live: "https://srecp.onrender.com/",
      github: "https://github.com/sakshampro11/SRECP"
    },
    caseStudy: {
      heroImage: "/srecp1.png",
      showcaseImages: [
        "/srecp1.png",
        "/srecp2.png",
        "/srecp1.png",
        "/srecp2.png",
      ],
      overview: `SRECP (Scalable Ranking Engine for Competitive Platforms) is a high-performance ranking system built to emphasize pure Data Structures and Algorithms over framework reliance. The core engine is written in C++ without using STL — featuring manual dynamic arrays, recursive merge sort, and binary search — compiled to a native binary that processes ranking operations.<br /><br />A Node.js backend bridges the C++ engine with a sleek, dark-themed dashboard frontend. Users can add, update, delete, and search participants, view real-time leaderboard rankings, retrieve Top-K performers, and monitor engine statistics (sort algorithm, complexity, storage type). The system computes and displays median scores in real time.<br /><br />🛠 Tools: C++, Node.js, HTML/CSS/JS<br />🎨 Roles: DSA Engineering, Backend Architecture, Dashboard UI Design`,
      goal: "To build a scalable ranking engine that showcases DSA and systems-level thinking — proving that strong fundamentals matter more than framework knowledge.",
      designProcess: `A 6-step engineering-driven process — from defining core algorithms in C++, to bridging with Node.js, designing the dashboard UI, and deploying on Render.`,
      designSystem: "A dark, neon-accented dashboard design system with purple/blue tones, glowing borders, and monospace typography for a data-engineering aesthetic."
    },
    x: 400,
    y: 950,
  },
  {
    title: "My Design Portfolio",
    thumbnail: "/p1.png",
    description: "Figma-style interactive portfolio site",
    tech: ["Figma", "Tailwind CSS", "React", "Framer Motion"],
    tags: ["Workspace", "Inception"],
    links: {
      live: "https://sakshambudhirajaportfolio.vercel.app/",
      figma: "https://figma.com/@saksham15"
    },
    caseStudy: {
      heroImage: "/p2.png",
      showcaseImages: [
        "/p3.png",
        "/p7.png",
        "/p8.png",
        "/p5.png",
      ],
      overview: "This portfolio isn't just a site — it's a playground of my design personality. Inspired by Figma's layout, I built it as an interactive design system to showcase not just what I've made, but how I think. Every scroll, card, and hover is intentional — from cursor interactions to section-based storytelling. <br /><br /> I'm Saksham Budhiraja — a UI/UX designer and frontend developer who thinks in frames and builds in pixels",
      goal: "To create a seamless, scrollable experience that reflects my style, skills, and storytelling.",
      designProcess: "The portfolio was built with a process that balanced structure, inspiration, and technical execution to create a unique, personal experience.",
      designSystem: "The entire site acts as its own design system, featuring Figma's color palette, Inter typeface, and a component-based architecture including the 3-panel layout and case study artboards."
    },
    x: 50,
    y: 1250,
  },
];

const skillsCategories = [
  {
    title: "Product & Execution",
    color: "#F24E1E",
    skills: ["Product Strategy", "MVP Development", "User Journey Mapping", "Agile & Scrum", "Product Discovery"]
  },
  {
    title: "UI/UX Design",
    color: "#A259FF",
    skills: ["Wireframing & IA", "Rapid Prototyping", "Usability Testing", "Figma Design System"]
  },
  {
    title: "Technical Literacy",
    color: "#1ABCFE",
    skills: ["API Integration", "SQL & Databases", "Node.js & C++ Systems", "React & JS Frontend"]
  },
  {
    title: "Tools & Platforms",
    color: "#0ACF83",
    skills: ["Figma", "Git & GitHub", "Vercel & Render"]
  }
];

const clubDuelzDesignProcessSteps = [
  { step: 1, title: "Research Pain Points", description: "Identifying challenges in existing sports apps", icon: FaMapMarkedAlt, color: "text-blue-300", iconColor: "text-blue-300" },
  { step: 2, title: "Define User Flow", description: "Mapping out the user journey", icon: BsDiagram3, color: "text-cyan-300", iconColor: "text-cyan-300" },
  { step: 3, title: "Design UI", description: "Creating a clean, card-based interface", icon: BsGrid1X2, color: "text-green-300", iconColor: "text-green-300" },
  { step: 4, title: "Build Components", description: "Developing responsive components", icon: BsPuzzle, color: "text-lime-300", iconColor: "text-lime-300" },
  { step: 5, title: "Focus on Accessibility", description: "Ensuring the app is usable for everyone", icon: FaUniversalAccess, color: "text-yellow-300", iconColor: "text-yellow-300" },
  { step: 6, title: "Implement Urgency Tagging", description: "Adding tags to prioritize urgent issues", icon: FaTag, color: "text-orange-300", iconColor: "text-orange-300" },
  { step: 7, title: "Smooth Complaint Tracking", description: "Streamlining the process for tracking", icon: FaTasks, color: "text-red-300", iconColor: "text-red-300" },
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

const lokallyCityDesignProcessSteps = [
  { step: 1, title: "Reporting & Feed", description: "Camera-first mobile reporting, location-aware feed, search, and device-aware responsive rendering.", icon: FaFileAlt, color: "text-blue-400", iconColor: "text-blue-400" },
  { step: 2, title: "AI Categorization", description: "Gemini AI automatically tags categories, priority level, title, and summary to remove citizen friction.", icon: FaCogs, color: "text-purple-400", iconColor: "text-purple-400" },
  { step: 3, title: "Mapping & Geolocation", description: "Interactive map-pin picker with Leaflet.js & OpenStreetMap for marking precise issue locations.", icon: FaMapMarkedAlt, color: "text-green-400", iconColor: "text-green-400" },
  { step: 4, title: "Community Verification", description: "Citizens corroborate issues via upvotes and comments; auto-reopening triggers if resolved issues recur.", icon: FaUsers, color: "text-lime-400", iconColor: "text-lime-400" },
  { step: 5, title: "Resolver Status Tracking", description: "Status card updates tracking issue lifecycle transparently from 'Reported' to 'In Progress' to 'Resolved'.", icon: FaTasks, color: "text-yellow-400", iconColor: "text-yellow-400" },
  { step: 6, title: "Impact Dashboard & Insights", description: "Aggregated charts and Gemini AI-generated insights highlighting trends for citizens and city officials.", icon: FaChartBar, color: "text-orange-400", iconColor: "text-orange-400" },
  { step: 7, title: "Leaderboard & Gamification", description: "A public leaderboard with XP and badges rewarding citizen reporting; separate private resolver tracking.", icon: FaStar, color: "text-red-400", iconColor: "text-red-400" },
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

const beyondMokshaDesignProcessSteps = [
  { step: 1, title: "Research & Understanding", description: "Study brand values, user expectations, competitors, and personas.", icon: FaSearchPlus, color: "text-blue-300", iconColor: "text-blue-300" },
  { step: 2, title: "Information Architecture", description: "Structure services, simplify booking, and create a calming layout.", icon: BsGrid1X2, color: "text-cyan-300", iconColor: "text-cyan-300" },
  { step: 3, title: "Wireframes", description: "Low-fi sketches for homepage, services, and booking with clear hierarchy.", icon: VscFileCode, color: "text-green-300", iconColor: "text-green-300" },
  { step: 4, title: "Visual Direction", description: "Soft nature-inspired palette, minimal type, rounded shapes, fluid forms.", icon: FaPalette, color: "text-yellow-300", iconColor: "text-yellow-300" },
  { step: 5, title: "High-Fidelity UI", description: "Gradient heroes, service cards with icons, about/philosophy, reviews, clean footer.", icon: FaReact, color: "text-orange-300", iconColor: "text-orange-300" },
  { step: 6, title: "Prototyping", description: "Smooth interactions, scroll animations, clickable desktop/mobile flows.", icon: FaTasks, color: "text-red-300", iconColor: "text-red-300" },
  { step: 7, title: "Client Review", description: "Refinements and delivery of design files plus basic brand kit.", icon: FaUsers, color: "text-purple-300", iconColor: "text-purple-300" },
];

const pspDesignProcessSteps = [
  { step: 1, title: "Concept & Reference", description: "Studied the real PSP's XMB interface, button layout, and micro-interactions", icon: FaSearchPlus, color: "text-blue-300", iconColor: "text-blue-300" },
  { step: 2, title: "UI Architecture", description: "Designed the 3D PSP shell, screen area, D-pad, and action button layout in CSS", icon: BsGrid1X2, color: "text-cyan-300", iconColor: "text-cyan-300" },
  { step: 3, title: "XMB Navigation System", description: "Built the horizontal/vertical menu navigation with smooth animations", icon: BsDiagram3, color: "text-green-300", iconColor: "text-green-300" },
  { step: 4, title: "Game Integration", description: "Embedded playable games — Mario, Space Waves, Simon Says, Reaction Test", icon: FaGamepad, color: "text-lime-300", iconColor: "text-lime-300" },
  { step: 5, title: "Spotify Playback", description: "Integrated Spotify API with seek controls, track skipping, and autoplay", icon: FaMusic, color: "text-yellow-300", iconColor: "text-yellow-300" },
  { step: 6, title: "Theme & Polish", description: "Added wave backgrounds, wallpaper system, brightness, and theme colors", icon: FaPalette, color: "text-orange-300", iconColor: "text-orange-300" },
  { step: 7, title: "Deploy & Iterate", description: "Deployed on Vercel with continuous iterations based on feedback", icon: FaRocket, color: "text-red-300", iconColor: "text-red-300" },
];

const srecpDesignProcessSteps = [
  { step: 1, title: "Define Core DSA Logic", description: "Designed merge sort, binary search, and dynamic array algorithms from scratch", icon: FaSortAmountDown, color: "text-blue-400", iconColor: "text-blue-400" },
  { step: 2, title: "C++ Engine (No STL)", description: "Implemented the ranking engine in pure C++ without vectors, sort, or STL", icon: FaCode, color: "text-cyan-400", iconColor: "text-cyan-400" },
  { step: 3, title: "Node.js API Bridge", description: "Built a Node.js backend to communicate with the compiled C++ binary", icon: FaServer, color: "text-green-400", iconColor: "text-green-400" },
  { step: 4, title: "Dashboard UI", description: "Designed a dark, neon-accented dashboard with operations panel and leaderboard", icon: BsGrid1X2, color: "text-yellow-400", iconColor: "text-yellow-400" },
  { step: 5, title: "Real-time Stats", description: "Added live participant count, median score, and engine stats display", icon: FaChartBar, color: "text-orange-400", iconColor: "text-orange-400" },
  { step: 6, title: "Deploy on Render", description: "Configured Render to compile C++ binary on deploy and serve the full stack", icon: FaCloudUploadAlt, color: "text-red-400", iconColor: "text-red-400" },
];

const lexicideDesignProcessSteps = [
  { step: 1, title: "Character Concepts", description: "Drafted dark gothic silhouettes", icon: FaPalette, color: "text-red-400", iconColor: "text-red-400" },
  { step: 2, title: "Sprite Animation", description: "Created multi-frame animations", icon: BsGrid1X2, color: "text-orange-400", iconColor: "text-orange-400" },
  { step: 3, title: "Boss Mechanics", description: "Designed complex typing attack patterns", icon: FaGamepad, color: "text-yellow-400", iconColor: "text-yellow-400" },
  { step: 4, title: "Environment", description: "Built atmospheric horror elements", icon: FaMapMarkedAlt, color: "text-gray-400", iconColor: "text-gray-400" },
];

const socials = [
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/saksham-budhiraja-545b1028b/" },
  { name: "GitHub", icon: <FaGithub />, url: "https://github.com/sakshampro11" },
  { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/saksham.pro._/?__pwa=1" },
  { name: "Email", icon: <SiGmail />, url: "mailto:budhirajasaksham6@gmail.com" },
];

const assetComponents = [
  {
    name: "Case Study Artboard",
    icon: VscSymbolFile,
    description: "The main container for detailed project walkthroughs.",
    variants: ["Default", "With Key Features", "With Design Process"],
  },
  {
    name: "Project Card",
    icon: BsPuzzle,
    description: "Interactive card to select and preview a project.",
    variants: ["Default", "Hover State", "Active"],
  },
  {
    name: "Info Panel",
    icon: BsGrid1X2,
    description: "Context-aware side panel for details and actions.",
    variants: ["Global About", "Project Details"],
  },
];

const figmaCursorSVG =
  "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 2L28 16L18 18L16 28L4 2Z' fill='black' stroke='white' stroke-width='3'/%3E%3C/svg%3E";

const customScrollbarStyle = document.createElement('style');
customScrollbarStyle.innerHTML = ``;

const style = document.createElement('style');
style.innerHTML = `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`;
document.head.appendChild(style);

function ProjectsTabBar({ selectedProject, onBack }) {
  return (
    <div className="w-full flex items-center gap-2 px-2 py-0.5" style={{ height: 44 }}>
      {selectedProject !== null ? (
        <button onClick={onBack} className="flex items-center gap-2 text-[var(--text-primary)] px-3 py-1 rounded hover:bg-[var(--surface)] transition font-semibold" style={{ fontWeight: 600 }}>
          Projects
        </button>
      ) : (
        <span
          className="text-base font-medium text-[var(--text-primary)] px-3 py-1 rounded flex items-center gap-2 transition-all duration-300"
          style={{ background: 'var(--surface)', fontWeight: 600, borderBottom: '2px solid var(--text-primary)' }}
        >
          Projects
        </span>
      )}
    </div>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("about");
  const [leftSidebarTab, setLeftSidebarTab] = useState('file');
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const workspaceRef = useRef(null);
  const [showFakeCursor, setShowFakeCursor] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 80, y: 80 });
  const [aboutFlipped, setAboutFlipped] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [workspaceBg, setWorkspaceBg] = useState('#1e1e1e');
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('uiux'); // 'uiux' or 'visual'
  const [floatingImage, setFloatingImage] = useState(null); // { src, title }
  const resumeUrl = encodeURI('/SakshamBudhiraja_resume.pdf');

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
      workspace.style.cursor = `url(/poof.svg) 8 8, auto`;
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

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!isProfileMenuOpen) return;
    function handleClick(e) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isProfileMenuOpen]);

  return (
    <>
      <div className="min-h-screen flex flex-col font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif', background: 'var(--background)' }}>
        {/* Mobile Fixed Top Header */}
        <div className="md:hidden fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[var(--surface)]/80 border-b border-[var(--border)] px-4 py-2 flex items-center justify-between shadow-md shadow-black/20">

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(open => !open)}
            className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[#2a2a2a] transition-colors"
          >
            <FaBars className="w-5 h-5 text-[var(--text-primary)] hover:text-[#F24D1D] transition" />
          </button>

          {/* Profile Info with Dropdown */}
          <div className="relative flex items-center gap-3">
            <div className="text-right leading-tight">
              <div className="text-sm font-semibold text-white">Saksham Budhiraja</div>
              <div className="text-xs text-gray-400">UI/UX Designer</div>
            </div>
            <button
              onClick={() => setIsProfileMenuOpen(open => !open)}
              className="focus:outline-none"
            >
              <img
                src="/profile.JPG"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-[#A259FF] shadow-lg object-cover hover:scale-105 transition-transform duration-200"
              />
            </button>
            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  ref={profileMenuRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute top-full mt-2 right-0 w-56 rounded-xl bg-[var(--surface)] bg-opacity-90 backdrop-blur-md shadow-xl px-5 py-3 space-y-2 z-50"
                  style={{ boxShadow: '0 8px 32px 0 #0002' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Arrow above dropdown */}
                  <div className="absolute -top-2 right-8 text-[var(--surface)] text-lg select-none pointer-events-none">▾</div>
                  {/* Theme Switcher */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">Theme</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setTheme('light'); setIsProfileMenuOpen(false); }}
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${theme === 'light' ? 'bg-[var(--background)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]'}`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => { setTheme('dark'); setIsProfileMenuOpen(false); }}
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${theme === 'dark' ? 'bg-[var(--background)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]'}`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-[var(--border)] opacity-30 my-1" />
                  <div className="flex flex-col space-y-2">
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[var(--surface-secondary)] transition-colors">
                      <FaFileAlt /> Resume
                    </a>
                    <a href="https://www.linkedin.com/in/saksham-budhiraja-545b1028b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[var(--surface-secondary)] transition-colors">
                      <FaLinkedin /> LinkedIn
                    </a>
                    <a href="mailto:budhirajasaksham6@gmail.com" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[var(--surface-secondary)] transition-colors">
                      <FaEnvelope /> Gmail
                    </a>
                    <a href="https://github.com/sakshampro11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[var(--surface-secondary)] transition-colors">
                      <FaGithub /> Github
                    </a>
                    <a href="https://www.instagram.com/saksham.pro._/?__pwa=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[var(--surface-secondary)] transition-colors">
                      <FaInstagram /> Instagram
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Main Content with top padding for header */}
        <div className="w-full md:hidden px-4 pt-20 pb-6 bg-[var(--background)]">
          {selected === null ? (
            <>
              {currentSection === 'visual' ? (
                // Mobile Design Wall for Visual Design
                <div className="w-full">
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Visual Design</h1>
                    <p className="text-[var(--text-secondary)]">A collection of creative visual work</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {visualDesignProjects.map((project, idx) => (
                      <motion.div
                        key={project.title}
                        className="group cursor-pointer"
                        onClick={() => {
                          setFloatingImage({ src: project.thumbnail || posterPlaceholder, title: project.title });
                          setIsMobileMenuOpen(false);
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="aspect-square rounded-xl overflow-hidden bg-[var(--background)] border border-[var(--border)] mb-3 flex items-center justify-center">
                          <img
                            src={project.thumbnail || posterPlaceholder}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = posterPlaceholder;
                            }}
                          />
                          <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-secondary)] hidden">
                            <div className="w-12 h-12 rounded-full bg-[var(--surface)] flex items-center justify-center mb-2">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium">Add Image</span>
                            <span className="text-xs opacity-70">{project.title}</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-1">
                          {project.tags && project.tags.map((tag, i) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded-full text-xs font-medium" style={{ background: figmaColors[i % figmaColors.length], color: '#fff' }}>{tag}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                // Mobile UI/UX Layout
                <>
                  {/* About Me Section */}
                  <div className="mb-12">
                    <div className="relative min-h-[240px]">
                      <div className="absolute top-3 right-4 z-10">
                        <button
                          onClick={() => setAboutFlipped(f => !f)}
                          className="rounded-full bg-[var(--surface)] hover:bg-[#1ABCFE] text-[#1ABCFE] hover:text-white p-2 shadow-md border border-[#1ABCFE] transition-transform active:scale-90"
                          title="Flip Card"
                          style={{ outline: 'none' }}
                        >
                          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                            <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="var(--surface)" />
                            <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 12c0-4 16-4 16 0" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                          </svg>
                        </button>
                      </div>

                      {/* Flipping Card Container */}
                      <div className="perspective-[1200px] min-h-[360px] relative">
                        <AnimatePresence mode="wait" initial={false}>
                          {!aboutFlipped ? (
                            <motion.div
                              key="about-front"
                              initial={{ rotateY: 90, opacity: 0 }}
                              animate={{ rotateY: 0, opacity: 1 }}
                              exit={{ rotateY: -90, opacity: 0 }}
                              transition={{ duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }}
                              className="rounded-2xl p-6 shadow-lg border text-[var(--text-primary)] bg-gradient-to-r from-[var(--surface)] to-[#1ABCFE11] border-[#1ABCFE]"
                              style={{ boxShadow: '0 2px 24px 0 #1ABCFE22', backfaceVisibility: 'hidden' }}
                            >
                              <span className="text-2xl mr-2 align-middle">👋</span>
                              <span className="text-lg font-bold text-[var(--text-primary)]">Hi, I'm Saksham Budhiraja</span>
                              <div className="mt-2 text-base text-[var(--text-secondary)]">
                                A UI/UX designer and frontend developer who thinks in frames and builds in pixels.I'm passionate about creating intuitive, accessible, and engaging digital experiences that blend function with form.

                              </div>
                              <div className="mt-3 text-sm text-[var(--text-secondary)]">
                                From designing grassroots sports ecosystems like <span className="font-semibold text-[#1ABCFE]">Club Duelz</span> to calming wellness platforms like <span className="font-semibold text-[#A259FF]">Beyond Moksha</span>, I enjoy solving real-world problems through user-centered design. I'm always exploring how design systems, micro-interactions, and visual storytelling can elevate digital experiences.
                              </div>
                              <div className="mt-3 text-sm text-[var(--text-secondary)]">
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
                              className="rounded-2xl p-6 shadow-lg border text-[var(--text-primary)] bg-gradient-to-r from-[var(--surface)] to-[#A259FF11] border-[#A259FF] flex flex-col gap-2"
                              style={{ boxShadow: '0 2px 24px 0 #A259FF22', backfaceVisibility: 'hidden' }}
                            >
                              <div className="text-lg font-bold text-[var(--text-primary)] mb-2">Component Name: <span className="font-semibold text-[#1ABCFE]">Saksham Budhiraja</span></div>
                              <div className="text-base font-semibold text-[#A259FF] mb-2">Role: UI/UX Designer + Developer Handoff</div>
                              <div className="text-base font-semibold text-[#1ABCFE] mb-1">Skills:</div>
                              <ul className="list-disc list-inside text-[var(--text-secondary)] ml-2">
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
                  </div>

                  {/* Skills Section */}
                  <div className="mb-8 mt-10">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Skills</h2>
                    <div className="flex flex-col gap-5">
                      {skillsCategories.map((category) => (
                        <div key={category.title} className="flex flex-col gap-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: category.color }}>
                            {category.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                              <motion.div
                                key={skill}
                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] transition-all duration-200"
                                whileHover={{ scale: 1.05, borderColor: category.color, color: 'var(--text-primary)' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                              >
                                {skill}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Section Header */}
                  <div className="mt-8 mb-4">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-wide">Projects</h2>
                  </div>
                  {/* Project Cards */}
                  <div className="mb-8">
                    <div className="space-y-4">
                      {projects.map((project, idx) => (
                        <motion.div
                          key={project.title}
                          className="w-full rounded-xl shadow-lg border-2 border-[var(--border)] cursor-pointer flex flex-col bg-[var(--surface)] overflow-hidden"
                          onClick={() => {
                            setSelected(idx);
                            setIsMobileMenuOpen(false);
                          }}
                          whileHover={{ scale: 1.02, borderColor: 'var(--border)' }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <div className="aspect-video overflow-hidden bg-[var(--background)]">
                            <img src={project.thumbnail} alt={project.title} className="object-cover w-full h-full" />
                          </div>
                          <div className="flex flex-col gap-2 px-4 py-3 bg-[var(--surface)] border-t border-[var(--border)]">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">{project.title[0]}</div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[var(--text-primary)] font-medium text-base">{project.title}</div>
                                <div className="text-sm text-[var(--text-secondary)]">{project.description}</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {project.tags && project.tags.map((tag, i) => (
                                <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: figmaColors[i % figmaColors.length], color: '#fff', letterSpacing: 0.5 }}>{tag}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full">
              {/* ...Case Study Content (reuse desktop content, but mobile-styled)... */}
            </div>
          )}
        </div>

        <div className="flex flex-1 min-h-0">
          <aside className={`w-64 fixed top-0 left-0 h-full z-40 bg-[var(--surface)] border-r border-[var(--border)] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="flex flex-col h-full">
              <div className="relative flex items-center justify-between px-3 border-b border-[var(--border)] w-full" style={{ height: 44 }}>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-12 h-6.5 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center p-0.5 transition-all duration-300 focus:outline-none hover:border-[#1ABCFE] shadow-inner"
                  aria-label="Toggle Theme"
                >
                  <div className="absolute left-1.5 flex items-center justify-center text-[var(--text-secondary)] opacity-40 pointer-events-none">
                    <FiSun className="w-3 h-3" />
                  </div>
                  <div className="absolute right-1.5 flex items-center justify-center text-[var(--text-secondary)] opacity-40 pointer-events-none">
                    <FiMoon className="w-3 h-3" />
                  </div>
                  <motion.div
                    className="w-5 h-5 rounded-full flex items-center justify-center shadow-md z-10"
                    style={{
                      background: theme === 'dark' ? '#A259FF' : '#F24E1E',
                    }}
                    animate={{
                      x: theme === 'dark' ? 20 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {theme === 'dark' ? (
                      <FiMoon className="w-3 h-3 text-white" />
                    ) : (
                      <FiSun className="w-3 h-3 text-white" />
                    )}
                  </motion.div>
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-[var(--text-primary)]">Portfolio</h1>
                  <FaChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-[var(--text-secondary)]">Drafts</span>
                  <span className="px-2 py-0.5 text-xs font-semibold text-cyan-300 bg-cyan-500/20 rounded-md">Free</span>
                </div>
              </div>

              <div className="px-4 pb-2 border-b border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => setLeftSidebarTab('file')}
                      className={`px-3 py-1 text-sm font-semibold rounded-md ${leftSidebarTab === 'file' ? 'text-[var(--text-primary)] bg-[var(--background)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                      File
                    </button>
                    <button
                      onClick={() => setLeftSidebarTab('assets')}
                      className={`px-3 py-1 text-sm font-semibold rounded-md ${leftSidebarTab === 'assets' ? 'text-[var(--text-primary)] bg-[var(--background)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                      Assets
                    </button>
                  </div>
                  <FaSearchPlus className="w-4 h-4 text-[var(--text-secondary)]" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {leftSidebarTab === 'file' && (
                  <>
                    {/* Pages Section */}
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">Pages</h2>
                      <FaPlus className="w-4 h-4 text-[var(--text-secondary)]" />
                    </div>

                    <nav className="flex flex-col gap-1 text-sm mb-4">
                      <button
                        onClick={() => setCurrentSection('uiux')}
                        className={`text-left px-2 py-1 rounded-md font-medium flex items-center transition-all duration-200 ease-in-out ${currentSection === 'uiux' ? 'bg-[var(--background)] text-[var(--text-primary)] translate-x-1' : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] hover:translate-x-1'}`}
                      >
                        UI UX Design
                      </button>
                      <button
                        onClick={() => setCurrentSection('visual')}
                        className={`text-left px-2 py-1 rounded-md font-medium flex items-center transition-all duration-200 ease-in-out ${currentSection === 'visual' ? 'bg-[var(--background)] text-[var(--text-primary)] translate-x-1' : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] hover:translate-x-1'}`}
                      >
                        Visual Design
                      </button>
                    </nav>

                    {/* Layers Section - Only show for UI/UX */}
                    {currentSection === 'uiux' && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">Layers</h2>
                          <FaPlus className="w-4 h-4 text-[var(--text-secondary)]" />
                        </div>

                        <nav className="flex flex-col gap-1 text-base">
                          <button
                            onClick={() => setSelected(null)}
                            className={`text-left px-3 py-1.5 rounded-md font-medium flex items-center transition-all duration-200 ease-in-out ${selected === null ? 'bg-[var(--background)] text-[var(--text-primary)] translate-x-2' : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] hover:translate-x-2'}`}
                          >
                            All UI/UX Projects
                          </button>
                          {projects.map((project, idx) => (
                            <button
                              key={project.title}
                              onClick={() => {
                                setSelected(idx);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`text-left px-3 py-1.5 rounded-md font-medium flex items-center transition-all duration-200 ease-in-out ${selected === idx ? 'bg-[var(--background)] text-[var(--text-primary)] translate-x-2' : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] hover:translate-x-2'}`}
                            >
                              {project.title}
                            </button>
                          ))}
                        </nav>
                      </>
                    )}
                  </>
                )}
                {leftSidebarTab === 'assets' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">Components</h2>
                    </div>
                    <div className="flex flex-col gap-3">
                      {assetComponents.map(component => (
                        <div key={component.name} className="flex flex-col gap-2 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <component.icon className="w-5 h-5 text-cyan-400" />
                            <span className="font-semibold text-[var(--text-primary)]">{component.name}</span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] pl-1">{component.description}</p>
                          <div className="flex flex-wrap gap-2 mt-1 pl-1">
                            {component.variants.map(variant => (
                              <span key={variant} className="px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)] bg-[var(--surface)] rounded-md border border-[var(--border)]">
                                {variant}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 p-4 border-t border-[var(--border)]">
                <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  <span className="text-lg">🎧</span>
                  <span>
                    Now Playing:{" "}
                    <a
                      href="https://youtu.be/L-iepu3EtyE?si=elFgNXIH3lu4QNTL"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Listen on YouTube"
                    >
                      "System Of A Down - Aerials "
                    </a>
                  </span>
                </div>
                <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  <span className="text-lg">🛠️</span>
                  <span>Currently using: Figma + React</span>
                </div>
              </div>
            </div>
          </aside>

          <main className={`flex-1 flex flex-col items-center justify-start py-0 px-0 min-h-0 relative h-screen overflow-y-auto overflow-x-hidden custom-scrollbar bg-[var(--background)] pb-28 md:pb-40 ${isMobileMenuOpen ? 'ml-0' : 'md:ml-64'} ${selected === null ? 'md:mr-[374px]' : 'md:mr-64'}`}>
            <div className="w-full sticky top-0 z-30 bg-[var(--background)]/80 backdrop-blur-sm border-b border-[var(--border)] md:block hidden">
              <ProjectsTabBar selectedProject={selected} onBack={() => setSelected(null)} />
            </div>
            {selected === null ? (
              <div className="hidden md:block w-full">
                {currentSection === 'visual' ? (
                  // Design Wall Layout for Visual Design
                  <div className="w-full p-8">
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Visual Design</h1>
                      <p className="text-[var(--text-secondary)]">A collection of creative visual work</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visualDesignProjects.map((project, idx) => (
                        <motion.div
                          key={project.title}
                          className="group cursor-pointer"
                          onClick={() => setFloatingImage({ src: project.thumbnail || posterPlaceholder, title: project.title })}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <div className="aspect-square rounded-xl overflow-hidden bg-[var(--background)] border border-[var(--border)] mb-3 flex items-center justify-center">
                            <img
                              src={project.thumbnail || posterPlaceholder}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = posterPlaceholder;
                              }}
                            />
                            <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-secondary)] hidden">
                              <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mb-3">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium">Add Image</span>
                              <span className="text-xs opacity-70">{project.title}</span>
                            </div>
                          </div>
                          <div className="flex justify-center gap-2">
                            {project.tags && project.tags.map((tag, i) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: figmaColors[i % figmaColors.length], color: '#fff' }}>{tag}</span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Original Workspace Layout for UI/UX
                  <div
                    ref={workspaceRef}
                    className="relative w-full flex-1"
                    style={{ cursor: `url(/poof.svg) 8 8, auto` }}
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
                          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M6 2L30 18L19 20L17 33L6 2Z" fill="#18181b" stroke="var(--surface)" strokeWidth="3" /></svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.div
                      style={{ width: 1400, height: 1200, position: 'relative', transform: `scale(${zoom})`, transformOrigin: '0 0', perspective: 1200, transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)' }}
                      initial="hidden"
                      animate="visible"
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
                    >
                      {projects.map((project, idx) => (
                        <motion.div
                          key={project.title}
                          className={`absolute group w-[320px] h-[240px] rounded-xl shadow-lg border-2 border-transparent cursor-pointer flex flex-col items-stretch p-0 bg-[var(--surface)]`}
                          style={{ left: project.x, top: project.y, transformStyle: "preserve-3d" }}
                          onClick={() => setSelected(idx)}
                          initial={{ y: 40, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          whileHover={{ y: -15, rotateX: 8, rotateY: -8, scale: 1.05, borderColor: 'var(--border)' }}
                          whileTap={{ scale: 1.02, y: -10, rotateX: 0, rotateY: 0, boxShadow: '0px 0px 30px rgba(128, 128, 128, 0.5)' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.1 }}
                        >
                          <div className="flex-1 rounded-t-xl overflow-hidden flex items-center justify-center bg-[var(--background)]">
                            <img src={project.thumbnail} alt={project.title} className="object-cover w-full h-full" />
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <span className="text-white font-bold text-lg border-2 border-white rounded-lg px-4 py-2">View Project</span>
                          </motion.div>
                          <div className="flex flex-col gap-1 px-4 py-3 bg-[var(--surface)] rounded-b-xl border-t border-[var(--border)]">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-[var(--background)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">{project.title[0]}</div>
                              <div className="flex-1 min-w-0">
                                <div className="truncate text-[var(--text-primary)] font-medium text-base">{project.title}</div>
                                <div className="truncate text-xs text-[var(--text-secondary)]">{project.description}</div>
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
                )}
              </div>
            ) : (
              <div
                className="relative w-full flex-1 min-h-0 flex justify-center items-start custom-scrollbar"
                style={{ cursor: `url(/poof.svg) 8 8, auto` }}
              >
                <div className="w-full md:w-[900px] min-h-[1200px] rounded-2xl shadow-lg my-6 md:my-12 flex flex-col px-4 md:px-12 py-6 md:py-10 relative bg-[var(--surface)] mx-4 md:mx-0">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 md:top-6 left-4 md:left-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-orange-400 hover:bg-[var(--surface)] transition shadow-lg"
                    title="Back to Projects"
                  >
                    <FaArrowLeft size={20} />
                  </button>

                  {currentSection === 'visual' ? (
                    // Simple visual design project view
                    <div className="flex flex-col gap-6 md:gap-10 mb-6 md:mb-10 mt-12 md:mt-16">
                      <div className="text-center">
                        <div className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4">{(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title}</div>
                        <div className="text-lg md:text-xl text-[var(--text-primary)] font-semibold mb-6">{(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].description}</div>
                        <div className="w-full max-w-2xl mx-auto aspect-video bg-[var(--background)] rounded-lg flex items-center justify-center border border-[var(--border)]">
                          <div className="text-[var(--text-secondary)] text-lg">Visual Design Project</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Full case study view for UI/UX projects
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-6 md:mb-10 mt-12 md:mt-16">
                      <div className="flex-1 flex flex-col gap-3 md:gap-4">
                        <div className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)]">{(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title}</div>
                        <div className="text-lg md:text-xl text-[var(--text-primary)] font-semibold">{(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].description}</div>
                        <div className="text-base text-[var(--text-primary)] font-bold mt-3 md:mt-4">ABOUT</div>
                        <div className="text-sm text-[var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.overview }}></div>
                        <div className="text-base text-[var(--text-primary)] font-bold mt-3 md:mt-4">GOAL</div>
                        <div className="text-sm text-[var(--text-secondary)]">{(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.goal}</div>
                      </div>
                      <div className="w-full md:w-1/3">
                        {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.heroImage ? (
                          <img src={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.heroImage} alt={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                        ) : (
                          <div className="bg-[var(--background)] w-full h-48 md:h-64 rounded-lg"></div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentSection === 'uiux' && (
                    <>
                      <div className="mb-6 md:mb-10">
                        <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">DESIGN PROCESS</div>
                        <div className="text-sm text-[var(--text-secondary)] mb-4 md:mb-6">{(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.designProcess}</div>
                        {
                          (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "Club Duelz" ? (
                            <div className="relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                                {designProcessSteps.map((item, index) => (
                                  <div key={item.step} className={`flex items-start p-3 md:p-4 rounded-lg bg-[var(--background)] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                                    <div className="flex-shrink-0 mr-3 md:mr-4">
                                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "Beyond Moksha" ? (
                            <div className="relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                                {beyondMokshaDesignProcessSteps.map((item, index) => (
                                  <div key={item.step} className={`flex items-start p-3 md:p-4 rounded-lg bg-[var(--background)] transform ${index % 2 !== 0 ? 'md:translate-y-10' : ''}`}>
                                    <div className="flex-shrink-0 mr-3 md:mr-4">
                                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "City Issue Reporter (Lokally)" ? (
                            <div className="relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                                {lokallyCityDesignProcessSteps.map((item, index) => (
                                  <div key={item.step} className={`flex items-start p-3 md:p-4 rounded-lg bg-[var(--background)] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                                    <div className="flex-shrink-0 mr-3 md:mr-4">
                                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "FarmEazyy" ? (
                            <div className="relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                                {farmEazyyDesignProcessSteps.map((item, index) => (
                                  <div key={item.step} className={`flex items-start p-3 md:p-4 rounded-lg bg-[var(--background)] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                                    <div className="flex-shrink-0 mr-3 md:mr-4">
                                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "Lokally–Hyperlocal Delivery App" ? (
                            <div className="relative pl-4 md:pl-8">
                              {lokallyDesignProcessSteps.map((item, index) => (
                                <div key={item.title} className="flex items-start mb-6 md:mb-8">
                                  <div className="absolute left-0 flex flex-col items-center">
                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${item.color.replace('text-', 'bg-')} bg-opacity-20`}>
                                      <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center ${item.color.replace('text-', 'bg-')} bg-opacity-30`}>
                                        <item.icon className={`w-4 h-4 md:w-6 md:h-6 ${item.color}`} />
                                      </div>
                                    </div>
                                    {index < lokallyDesignProcessSteps.length - 1 && <div className="w-0.5 h-8 md:h-12 bg-[var(--border)]" />}
                                  </div>
                                  <div className="ml-8 md:ml-12 pl-4 md:pl-8">
                                    <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                    <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "My Design Portfolio" ? (
                            <div className="relative py-4 md:py-8">
                              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-[var(--border)]" />
                              <div className="space-y-8 md:space-y-12">
                                {portfolioDesignProcessSteps.map((item, index) => (
                                  <div key={index} className="relative flex items-center">
                                    {item.side === 'left' && (
                                      <div className="w-1/2 pr-8 md:pr-16 text-right">
                                        <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                        <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                      </div>
                                    )}
                                    <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-[var(--surface)] rounded-full border-2 border-[var(--border)] flex items-center justify-center z-10">
                                      <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color}`} />
                                    </div>
                                    {item.side === 'right' && (
                                      <div className="w-1/2 pl-8 md:pl-16 ml-auto text-left">
                                        <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                        <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "PSP Simulator" ? (
                            <div className="relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                                {pspDesignProcessSteps.map((item, index) => (
                                  <div key={item.step} className={`flex items-start p-3 md:p-4 rounded-lg bg-[var(--background)] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                                    <div className="flex-shrink-0 mr-3 md:mr-4">
                                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "SRECP – Ranking Engine" ? (
                            <div className="relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                                {srecpDesignProcessSteps.map((item, index) => (
                                  <div key={item.step} className={`flex items-start p-3 md:p-4 rounded-lg bg-[var(--background)] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                                    <div className="flex-shrink-0 mr-3 md:mr-4">
                                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === "Lexicide" ? (
                            <div className="relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4">
                                {lexicideDesignProcessSteps.map((item, index) => (
                                  <div key={item.step} className={`flex items-start p-3 md:p-4 rounded-lg bg-[var(--background)] transform ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                                    <div className="flex-shrink-0 mr-3 md:mr-4">
                                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-dashed border-[var(--border)] flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className={`text-base md:text-lg font-bold ${item.color}`}>{item.title}</p>
                                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-[120px] md:h-[180px] bg-[var(--background)] rounded-lg flex items-center justify-center border border-[var(--border)] text-[var(--text-secondary)]">Design Process Placeholder</div>
                          )}
                      </div>

                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'My Design Portfolio' && (
                        <div className="my-8 md:my-12 pt-8 md:pt-12">
                          <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6 md:mb-8">KEY FEATURES</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {portfolioKeyFeatures.map((feature, index) => (
                              <motion.div
                                key={feature.title}
                                className="bg-[var(--background)] p-4 md:p-6 rounded-lg border border-[var(--border)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-center gap-3 md:gap-4">
                                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-[var(--surface)]">
                                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                                  </div>
                                  <div>
                                    <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)]">{feature.title}</h3>
                                    <p className="text-xs md:text-sm text-[var(--text-secondary)]">{feature.description}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="my-8 md:my-12 pt-8 md:pt-12">
                        <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4">UI SHOWCASE</div>
                        {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.showcaseImages && (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.showcaseImages.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].caseStudy.showcaseImages.map((imgSrc, index) => (
                              <div key={index} className="bg-[var(--background)] aspect-video rounded-lg p-2 border border-[var(--border)]">
                                <img src={imgSrc} alt={`Showcase ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="bg-[var(--background)] aspect-video rounded-lg p-2 border border-[var(--border)]"><div className="w-full h-full bg-[var(--surface)] rounded-md flex items-center justify-center text-[var(--text-secondary)]">Image 1</div></div>
                            <div className="bg-[var(--background)] aspect-video rounded-lg p-2 border border-[var(--border)]"><div className="w-full h-full bg-[var(--surface)] rounded-md flex items-center justify-center text-[var(--text-secondary)]">Image 2</div></div>
                            <div className="bg-[var(--background)] aspect-video rounded-lg p-2 border border-[var(--border)]"><div className="w-full h-full bg-[var(--surface)] rounded-md flex items-center justify-center text-[var(--text-secondary)]">Image 3</div></div>
                            <div className="bg-[var(--background)] aspect-video rounded-lg p-2 border border-[var(--border)]"><div className="w-full h-full bg-[var(--surface)] rounded-md flex items-center justify-center text-[var(--text-secondary)]">Image 4</div></div>
                          </div>
                        )}
                      </div>

                      <div className="w-full h-px bg-[var(--border)] opacity-40 mb-6 md:mb-10"></div>

                      <div className="mb-4">
                        <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">DESIGN SYSTEM</div>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                          <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">COLOR PALETTE</div>
                            <div className="flex flex-row gap-2 mb-2">
                              {((currentSection === 'uiux' ? projects : visualDesignProjects)[selected].colors || figmaColors).map((c, i) => (
                                <span key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-lg border border-[var(--border)]" style={{ background: c }}></span>
                              ))}
                            </div>
                            {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'Lexicide' ? (
                              <div className="text-xs text-[var(--text-secondary)]">
                                Abyssal Black, Crimson Gore, Hellfire, Shadow Gray, Bone Dust
                              </div>
                            ) : (
                              <div className="text-xs text-[var(--text-secondary)]">{((currentSection === 'uiux' ? projects : visualDesignProjects)[selected].colors || figmaColors).join(' ')}</div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">TYPOGRAPHY</div>
                            {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'Club Duelz' ? (
                              <div className="text-xs text-[var(--text-secondary)]">
                                <div><span className="font-semibold text-[var(--text-primary)]">Space Grotesk</span></div>

                              </div>
                            ) :
                              (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'City Issue Reporter (Lokally)' ? (
                                <div className="text-xs text-[var(--text-secondary)]">
                                  <div><span className="font-semibold text-[var(--text-primary)]">Font:</span> Space Grotesk & Inter</div>
                                </div>
                              ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'FarmEazyy' ? (
                                <div className="text-xs text-[var(--text-secondary)]">
                                  <div><span className="font-semibold text-[var(--text-primary)]">Headings:</span> Post No Bills Colombo ExtraBold</div>
                                  <div><span className="font-semibold text-[var(--text-primary)]">Body:</span> Poppins</div>
                                </div>
                              ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'Lokally–Hyperlocal Delivery App' ? (
                                <div className="text-xs text-[var(--text-secondary)]">
                                  <div><span className="font-semibold text-[var(--text-primary)]">Font:</span> Helvetica</div>
                                </div>
                              ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'My Design Portfolio' ? (
                                <div className="text-xs text-[var(--text-secondary)]">
                                  <div><span className="font-semibold text-[var(--text-primary)]">Font:</span> Inter</div>
                                </div>
                              ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'Lexicide' ? (
                                <div className="text-xs text-[var(--text-secondary)]">
                                  <div><span className="font-semibold text-[var(--text-primary)]">Typography:</span> Gothic Pixel Font</div>
                                </div>
                              ) : (
                                <div className="flex flex-row gap-4">
                                  <div className="flex flex-col items-start">
                                    <span className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">Aa</span>
                                    <span className="text-xs font-semibold text-[var(--text-primary)]">Typeface</span>
                                    <span className="text-xs text-[var(--text-secondary)]">Space Grotesk</span>
                                  </div>
                                </div>
                              )}
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            {
                              (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'Club Duelz' ? (
                                <>
                                  <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Scorer options</div>
                                  <div className="text-xs text-[var(--text-secondary)] border-2 border-dashed border-[var(--border)] rounded-lg min-h-[40px] md:min-h-[60px] p-2">
                                    Live match scoring and viewing
                                  </div>
                                </>
                              ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'Lokally–Hyperlocal Delivery App' ? (
                                <>
                                  <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Delivery Systems</div>
                                  <div className="text-xs text-[var(--text-secondary)] border-2 border-dashed border-[var(--border)] rounded-lg min-h-[40px] md:min-h-[60px] p-2">
                                    Quick, Same Day and 24 hours
                                  </div>
                                </>
                              ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'FarmEazyy' ? null : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'Lexicide' ? (
                                <>
                                  <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Visual Assets</div>
                                  <div className="text-xs text-[var(--text-secondary)] border-2 border-dashed border-[var(--border)] rounded-lg min-h-[40px] md:min-h-[60px] p-2">
                                    Animated pixel art sprites matching typing speed
                                  </div>
                                </>
                              ) : (currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'City Issue Reporter (Lokally)' ? (
                                <>
                                  <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">AI Duplicate Detection</div>
                                  <div className="text-xs text-[var(--text-secondary)] border-2 border-dashed border-[var(--border)] rounded-lg min-h-[40px] md:min-h-[60px] p-2">
                                    Haversine formula search + Gemini AI multi-modal similarity comparison to identify matching real-world issues.
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Card Layout (complaints)</div>
                                  <div className="text-xs text-[var(--text-secondary)] border-2 border-dashed border-[var(--border)] rounded-lg min-h-[40px] md:min-h-[60px] p-2">
                                    Reusable container with padding, corner radius and + NEW COMPLAINT Button
                                  </div>
                                </>
                              )}
                            {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].title === 'My Design Portfolio' && (
                              <>
                                <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Core Components</div>
                                <div className="text-xs text-[var(--text-secondary)] border-2 border-dashed border-[var(--border)] rounded-lg min-h-[40px] md:min-h-[60px] p-2">
                                  3-Panel Layout, Case Study Artboards, Interactive Workspace
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </main>

          <aside className={`${selected === null ? "w-[374px]" : "w-64"} fixed top-0 right-0 h-full z-40 border-l bg-[var(--surface)] border-[var(--border)] transition-transform duration-300 ease-in-out hidden md:block`}>
            <div className="flex flex-col py-8 px-8 h-full relative">
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsRightSidebarOpen(false)}
                className="absolute top-4 right-4 text-[var(--text-secondary)] md:hidden"
              >
                <FaTimes size={20} />
              </button>
              {selected === null ? (
                <>
                  <div className="absolute top-9 right-8">
                    <button onClick={handleShare} className="relative group p-2 rounded-full hover:bg-[var(--background)] transition-colors">
                      <FaShareAlt className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                      <AnimatePresence>
                        {linkCopied && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-2 right-0 w-max px-3 py-1.5 bg-[var(--surface)] text-[var(--text-primary)] text-xs rounded-md shadow-lg border border-[var(--border)]"
                          >
                            Link Copied!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <img src="/profile.JPG" alt="Profile" className="w-14 h-14 rounded-full border-2 border-[#A259FF] shadow-lg object-cover" />
                    <div>
                      <div className="text-xl font-bold" style={{ color: figmaColors[0] }}>Saksham Budhiraja</div>
                      <div className="text-sm text-[var(--text-secondary)]">UI UX Designer</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <button onClick={() => setTab('about')} className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition ${tab === 'about' ? 'bg-[var(--background)] text-[var(--text-primary)]' : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--background)]'}`}>About Me</button>
                    <button onClick={() => setTab('skills')} className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition ${tab === 'skills' ? 'bg-[var(--background)] text-[var(--text-primary)]' : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--background)]'}`}>Skills</button>
                  </div>
                  {tab === 'about' ? (
                    <div className="relative mb-6 min-h-[200px]">
                      <div className="absolute top-3 right-4 z-10">
                        <button
                          onClick={() => setAboutFlipped(f => !f)}
                          className="rounded-full bg-[var(--surface)] hover:bg-[#1ABCFE] text-[#1ABCFE] hover:text-white p-2 shadow-md border border-[#1ABCFE] transition-transform active:scale-90"
                          title="Flip Card"
                          style={{ outline: 'none' }}
                        >
                          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                            <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="var(--surface)" />
                            <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 12c0-4 16-4 16 0" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
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
                              className="rounded-2xl p-6 shadow-lg border text-[var(--text-primary)] min-h-[200px] bg-gradient-to-r from-[var(--surface)] to-[#1ABCFE11] border-[#1ABCFE]"
                              style={{ boxShadow: '0 2px 24px 0 #1ABCFE22', backfaceVisibility: 'hidden', position: 'absolute', width: '100%' }}
                            >
                              <span className="text-2xl mr-2 align-middle">👋</span>
                              <span className="text-lg font-bold text-[var(--text-primary)]">Hi, I'm Saksham Budhiraja</span>
                              <div className="mt-2 text-base text-[var(--text-secondary)]">
                                A Product designer and frontend developer who thinks in frames and builds in pixels. I'm passionate about creating intuitive, accessible, and engaging digital experiences that blend function with form.
                              </div>
                              <div className="mt-3 text-sm text-[var(--text-secondary)]">
                                From designing grassroots sports ecosystems like <span className="font-semibold text-[#1ABCFE]">Club Duelz</span> to calming wellness platforms like <span className="font-semibold text-[#A259FF]">Beyond Moksha</span>, I enjoy solving real-world problems through user-centered design. I'm always exploring how design systems, micro-interactions, and visual storytelling can elevate digital experiences.
                              </div>
                              <div className="mt-3 text-sm text-[var(--text-secondary)]">
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
                              className="rounded-2xl p-6 shadow-lg border text-[var(--text-primary)] min-h-[200px] bg-gradient-to-r from-[var(--surface)] to-[#A259FF11] border-[#A259FF] flex flex-col gap-2"
                              style={{ boxShadow: '0 2px 24px 0 #A259FF22', backfaceVisibility: 'hidden', position: 'absolute', width: '100%' }}
                            >
                              <div className="text-lg font-bold text-[var(--text-primary)] mb-2">Component Name: <span className="font-semibold text-[#1ABCFE]">Saksham Budhiraja</span></div>
                              <div className="text-base font-semibold text-[#A259FF] mb-2">Role: UI/UX Designer + Developer Handoff</div>
                              <div className="text-base font-semibold text-[#1ABCFE] mb-1">Skills:</div>
                              <ul className="list-disc list-inside text-[var(--text-secondary)] ml-2">
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
                    <div className="flex flex-col gap-5 mb-6 p-1">
                      {skillsCategories.map((category) => (
                        <div key={category.title} className="flex flex-col gap-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: category.color }}>
                            {category.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                              <motion.div
                                key={skill}
                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)] transition-all duration-200 cursor-default"
                                whileHover={{ scale: 1.05, borderColor: category.color, color: 'var(--text-primary)' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                              >
                                {skill}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-xl font-bold mb-6 text-[var(--text-primary)]">Project Details</div>
                  <div className="mb-6">
                    <div className="text-base font-semibold text-[var(--text-secondary)] mb-2">Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].tech.map((t, i) => (
                        <span key={t} className="px-2 py-1 rounded text-xs" style={{ background: figmaColors[i % figmaColors.length], color: '#fff' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-base font-semibold text-[var(--text-secondary)] mb-2">Color Palette</div>
                    <div className="flex gap-2">
                      {((currentSection === 'uiux' ? projects : visualDesignProjects)[selected].colors || figmaColors).map((c, i) => (
                        <span key={i} className="w-6 h-6 rounded-full border-2 border-[var(--surface)]" style={{ background: c }}></span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-[var(--border)]">
                    <div className="text-base font-semibold text-[var(--text-secondary)] mb-2">Links</div>
                    <div className="flex flex-col gap-2">
                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.figma && (
                        <a
                          href={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.figma || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-[var(--background)] hover:bg-[var(--border)] text-[var(--text-primary)] font-bold py-2 px-4 rounded-md transition"
                        >
                          <FaFigma /> Figma
                        </a>
                      )}
                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.prototype && (
                        <a
                          href={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.prototype || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-[var(--background)] hover:bg-[var(--border)] text-[var(--text-primary)] font-bold py-2 px-4 rounded-md transition"
                        >
                          <FaLink /> Prototype
                        </a>
                      )}
                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.github && (
                        <a
                          href={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-[#24292e] hover:bg-[#2f363d] text-white font-bold py-2 px-4 rounded-md transition"
                        >
                          <FaGithub /> GitHub
                        </a>
                      )}
                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.behance && (
                        <a
                          href={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.behance}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-[#1769FF] hover:bg-[#0056CC] text-white font-bold py-2 px-4 rounded-md transition"
                        >
                          <FaExternalLinkAlt /> Behance
                        </a>
                      )}
                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.dribbble && (
                        <a
                          href={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.dribbble}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-[#EA4C89] hover:bg-[#D73A7A] text-white font-bold py-2 px-4 rounded-md transition"
                        >
                          <FaExternalLinkAlt /> Dribbble
                        </a>
                      )}
                      {(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links?.live ? (
                        <a
                          href={(currentSection === 'uiux' ? projects : visualDesignProjects)[selected].links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition"
                        >
                          <FaExternalLinkAlt /> Website
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex items-center justify-center gap-2 w-full bg-[var(--background)] text-[var(--text-secondary)] font-bold py-2 px-4 rounded-md cursor-not-allowed"
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

      </div>
      <div className="hidden md:flex fixed left-1/2 -translate-x-1/2 bottom-6 z-50 gap-12 border rounded-2xl shadow-2xl px-16 py-3 items-center bg-[var(--surface)] border-[var(--border)]" style={{ minWidth: '280px', maxWidth: '90vw' }}>
        <a href="/" className="flex flex-row items-center gap-2 px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition text-sm md:text-base" style={{ color: figmaColors[3], background: 'transparent' }}>
          <FaUser size={18} className="md:w-[22px] md:h-[22px]" />
          <span className="text-sm md:text-base">Portfolio</span>
        </a>
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition text-[var(--text-primary)] text-sm md:text-base" style={{ background: 'transparent' }}>
          <FaFileAlt size={18} className="md:w-[22px] md:h-[22px]" />
          <span className="text-sm md:text-base">Resume</span>
        </a>
        <button onClick={() => setIsSocialsOpen(true)} className="flex flex-row items-center gap-2 px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition text-[var(--text-primary)] text-sm md:text-base" style={{ background: 'transparent' }}>
          <FaLink size={18} className="md:w-[22px] md:h-[22px]" />
          <span className="text-sm md:text-base">Socials</span>
        </button>
      </div>

      <AnimatePresence>
        {isSocialsOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 h-20 md:h-24 bg-[var(--surface)] border-t border-[var(--border)] z-50 flex items-center justify-center"
          >
            <div className="flex gap-6 md:gap-12 items-center">
              {socials.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-transform duration-300 hover:scale-110 text-2xl md:text-3xl"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <button
              onClick={() => setIsSocialsOpen(false)}
              className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xl md:text-2xl"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Image Modal */}
      <AnimatePresence>
        {floatingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setFloatingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="relative w-full max-w-3xl max-h-[80vh] mx-4 bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={floatingImage?.src || posterPlaceholder}
                alt={floatingImage?.title || "Enlarged view"}
                className="w-full h-full object-contain max-h-[80vh] rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = posterPlaceholder;
                }}
              />
              <button
                onClick={() => setFloatingImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </>
  );
}