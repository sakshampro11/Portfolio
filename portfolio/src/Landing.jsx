import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCog,
  FaLightbulb,
  FaMousePointer,
  FaHandPaper,
  FaPen,
  FaStickyNote,
  FaShapes,
  FaFont,
  FaChevronDown,
  FaShareAlt,
  FaPlay,
  FaCloud,
  FaTrash,
  FaUndo,
  FaPlus,
  FaMinus,
  FaExternalLinkAlt
} from "react-icons/fa";

// 3-step lightweight tutorial
const TUTORIAL_STEPS = [
  {
    tool: 'hand',
    emoji: '✋',
    title: 'Drag the board',
    desc: 'Use the Hand tool to pan around. Grab any card to move it!',
  },
  {
    tool: 'sticky',
    emoji: '📝',
    title: 'Leave sticky notes',
    desc: 'Pick the sticky note tool and click anywhere to drop a note.',
  },
  {
    tool: 'select',
    emoji: '🎉',
    title: 'You\'re all set!',
    desc: 'Feel free to explore the board, click projects, or hit Present Portfolio!',
    last: true,
  },
];

// Default initial positions and sizes for the main interactive cards on the 1920x1080 virtual canvas
const INITIAL_POSITIONS = {
  welcome: { x: 1770, y: 1040, w: 460, h: 380 },
  duelz: { x: 1220, y: 830, w: 380, h: 260 },
  farmeazyy: { x: 2400, y: 850, w: 400, h: 260 },
  psp: { x: 1180, y: 1350, w: 420, h: 270 },
  lexicide: { x: 2420, y: 1330, w: 380, h: 280 },
  portfolio: { x: 1790, y: 1510, w: 420, h: 280 },
};

function BrowserFrame({ children, title, frameName, resolution, onClickLink }) {
  return (
    <div className="relative w-full h-full group">
      {/* Figma Frame Name Label */}
      <div className="absolute -top-6 left-1 text-[11px] font-bold text-[#121212] opacity-50 tracking-wider font-mono flex items-center gap-1 select-none pointer-events-none">
        <span>{frameName}</span>
        <span className="opacity-30">/</span>
        <span>{resolution}</span>
      </div>

      {/* Browser Window Wrapper */}
      <div className="rounded-xl overflow-hidden border-2.5 border-[#121212] bg-[#121212] shadow-[6px_6px_0px_0px_rgba(18,18,18,1)] flex flex-col w-full h-full transition-shadow duration-200">
        {/* Browser Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#F4F0E6] border-b-2.5 border-[#121212] select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border border-[#121212] bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full border border-[#121212] bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full border border-[#121212] bg-[#27C93F]" />
          </div>
          <span className="text-[11px] font-bold text-[#121212] opacity-75 tracking-wider truncate max-w-[150px] font-mono">{title}</span>
          {onClickLink ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClickLink();
              }}
              className="text-[#121212] opacity-50 hover:opacity-100 transition-opacity"
              title="Open Details"
            >
              <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </button>
          ) : (
            <div className="w-3" />
          )}
        </div>
        {/* Image Content */}
        <div className="bg-[#121212] w-full h-full flex items-center justify-center overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
}

function FigmaCursor({ name, color, left, top }) {
  return (
    <div
      className="absolute flex flex-col items-start gap-1 select-none pointer-events-none z-30 transition-all duration-300"
      style={{ left, top }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4.5 2L21.5 11.5L14.5 13L13 20L4.5 2Z" fill={color} stroke="#121212" strokeWidth="2.5" />
      </svg>
      <div className="px-2 py-0.5 rounded text-[9px] font-bold text-white shadow-md border border-[#121212]" style={{ backgroundColor: color }}>
        {name}
      </div>
    </div>
  );
}

// Native custom Figma-style cursor data URI (Orange cursor with "YOU" tag)
const customCursorSVG = `data:image/svg+xml;utf8,<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L19 10.5L12 12L10 19L0 0Z" fill="%23F24E1E" stroke="black" stroke-width="2"/><rect x="6" y="16" width="22" height="11" rx="2" fill="%23F24E1E" stroke="black" stroke-width="1.5"/><text x="17" y="24" fill="white" font-size="7" font-family="sans-serif" font-weight="bold" text-anchor="middle">YOU</text></svg>`;

export default function Landing() {
  const navigate = useNavigate();

  // States
  const [activeTool, setActiveTool] = useState("select"); // 'select' | 'hand' | 'marker' | 'sticky' | 'shape' | 'text' | 'stamp'
  const [selectedColor, setSelectedColor] = useState("#FFE082"); // yellow sticky default
  const [selectedShapeType, setSelectedShapeType] = useState("rectangle"); // 'rectangle' | 'circle' | 'diamond'
  const [selectedStamp, setSelectedStamp] = useState("👍"); // default stamp

  const [spawnedElements, setSpawnedElements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Drawing states
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Workspace offsets for dynamic SVGs
  const [dragOffsets, setDragOffsets] = useState({
    welcome: { x: 0, y: 0 },
    duelz: { x: 0, y: 0 },
    farmeazyy: { x: 0, y: 0 },
    psp: { x: 0, y: 0 },
    lexicide: { x: 0, y: 0 },
    portfolio: { x: 0, y: 0 }
  });

  // Custom Zoom and Navigation
  const [zoom, setZoom] = useState(0.85); // start slightly zoomed out to see more board
  const [tutorialStep, setTutorialStep] = useState(-1);

  // Panning offset state for infinite scrolling in all directions (always active via trackpad)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Multiplayer Cursors static coordinates (positioned nicely near mockups on 4000x2500 canvas)
  const [cursors] = useState({
    saksham: { x: 1380, y: 920 },
    recruiter: { x: 2440, y: 960 },
    tester: { x: 1260, y: 1460 }
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Touch Gesture Refs
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchPanStartRef = useRef({ x: 0, y: 0 });
  const touchDistanceStartRef = useRef(0);
  const touchZoomStartRef = useRef(1);
  const isTouchZooming = useRef(false);
  const isPanningRef = useRef(false);

  // Refs to sync latest state into touch listeners to avoid listener rebuilds
  const zoomRef = useRef(zoom);
  const panOffsetRef = useRef(panOffset);
  const activeToolRef = useRef(activeTool);
  const isDrawingRef = useRef(isDrawing);
  const selectedColorRef = useRef(selectedColor);
  const currentLineRef = useRef(currentLine);

  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { panOffsetRef.current = panOffset; }, [panOffset]);
  useEffect(() => { activeToolRef.current = activeTool; }, [activeTool]);
  useEffect(() => { isDrawingRef.current = isDrawing; }, [isDrawing]);
  useEffect(() => { selectedColorRef.current = selectedColor; }, [selectedColor]);
  useEffect(() => { currentLineRef.current = currentLine; }, [currentLine]);

  // Show FigBot chip on first visit (but don't auto-start steps)
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenFigJamTutorial");
    if (!hasSeen) {
      sessionStorage.setItem("hasSeenFigJamTutorial", "true");
    }
    // Set default initial zoom to 0.75 on mobile devices
    if (window.innerWidth < 768) {
      setZoom(0.75);
    }
  }, []);
  const [showFigBotChip, setShowFigBotChip] = useState(true);

  // Update active tool when tutorial step changes
  useEffect(() => {
    if (tutorialStep >= 0 && tutorialStep < TUTORIAL_STEPS.length) {
      setActiveTool(TUTORIAL_STEPS[tutorialStep].tool);
    }
  }, [tutorialStep]);

  // Touch handlers for mobile panning & zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e) => {
      const isCanvasBg = e.target.classList.contains('canvas-bg') || e.target === canvas;
      if (!isCanvasBg && activeToolRef.current !== 'marker') {
        isPanningRef.current = false;
        return;
      }
      isPanningRef.current = true;

      if (e.touches.length === 1) {
        isTouchZooming.current = false;
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        touchPanStartRef.current = { ...panOffsetRef.current };

        if (activeToolRef.current === 'marker') {
          const rect = canvas.getBoundingClientRect();
          const x = 2000 + (touch.clientX - rect.left - rect.width / 2 - panOffsetRef.current.x) / zoomRef.current;
          const y = 1250 + (touch.clientY - rect.top - rect.height / 2 - panOffsetRef.current.y) / zoomRef.current;
          setIsDrawing(true);
          setCurrentLine({
            points: [{ x, y }],
            color: selectedColorRef.current === "#FFE082" ? "#F24E1E" : selectedColorRef.current
          });
        }
      } else if (e.touches.length === 2) {
        isTouchZooming.current = true;
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchDistanceStartRef.current = dist;
        touchZoomStartRef.current = zoomRef.current;
      }
    };

    const handleTouchMove = (e) => {
      if (!isPanningRef.current && activeToolRef.current !== 'marker') return;

      if (e.touches.length === 1 && !isTouchZooming.current) {
        const touch = e.touches[0];
        if (activeToolRef.current === 'marker') {
          if (!isDrawingRef.current) return;
          if (e.cancelable) e.preventDefault();
          const rect = canvas.getBoundingClientRect();
          const x = 2000 + (touch.clientX - rect.left - rect.width / 2 - panOffsetRef.current.x) / zoomRef.current;
          const y = 1250 + (touch.clientY - rect.top - rect.height / 2 - panOffsetRef.current.y) / zoomRef.current;

          setCurrentLine(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              points: [...prev.points, { x, y }]
            };
          });
        } else {
          if (e.cancelable) e.preventDefault();
          const dx = touch.clientX - touchStartRef.current.x;
          const dy = touch.clientY - touchStartRef.current.y;
          setPanOffset({
            x: touchPanStartRef.current.x + dx,
            y: touchPanStartRef.current.y + dy
          });
        }
      } else if (e.touches.length === 2 && isTouchZooming.current) {
        if (e.cancelable) e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (touchDistanceStartRef.current > 0) {
          const factor = dist / touchDistanceStartRef.current;
          let nextZoom = touchZoomStartRef.current * factor;
          nextZoom = Math.max(0.3, Math.min(1.8, nextZoom));
          setZoom(nextZoom);
        }
      }
    };

    const handleTouchEnd = () => {
      if (isDrawingRef.current) {
        setIsDrawing(false);
        setLines(prev => {
          if (currentLineRef.current && currentLineRef.current.points.length > 0) {
            return [...prev, currentLineRef.current];
          }
          return prev;
        });
        setCurrentLine(null);
      }
      isTouchZooming.current = false;
      isPanningRef.current = false;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Custom wheel handler for diagonal trackpad panning and Ctrl/Cmd zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Zooming
        let nextZoom = zoom - e.deltaY * 0.0025;
        nextZoom = Math.max(0.4, Math.min(1.8, nextZoom));
        setZoom(nextZoom);
      } else {
        // Infinite scroll panning in all directions
        setPanOffset(prev => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY
        }));
      }
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [zoom]);

  // Handle click on canvas background to spawn items
  const handleCanvasClick = (e) => {
    // Only trigger if clicking directly on the canvas background
    if (e.target !== e.currentTarget && !e.target.classList.contains('canvas-bg')) return;
    if (activeTool === 'marker') return; // drawing handles its own mouse events

    // Adjust click coordinates by the pan offset to place elements in the right virtual canvas space
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = 2000 + (e.clientX - rect.left - rect.width / 2 - panOffset.x) / zoom;
    const clickY = 1250 + (e.clientY - rect.top - rect.height / 2 - panOffset.y) / zoom;


    if (activeTool === 'sticky') {
      const newSticky = {
        id: Date.now(),
        type: 'sticky',
        x: clickX - 70,
        y: clickY - 70,
        content: "Idea! Double-click to write...",
        color: selectedColor
      };
      setSpawnedElements(prev => [...prev, newSticky]);
      setActiveTool('select');
    } else if (activeTool === 'shape') {
      const newShape = {
        id: Date.now(),
        type: 'shape',
        shapeType: selectedShapeType,
        x: clickX - 60,
        y: clickY - 60,
        color: selectedColor
      };
      setSpawnedElements(prev => [...prev, newShape]);
      setActiveTool('select');
    } else if (activeTool === 'text') {
      const newText = {
        id: Date.now(),
        type: 'text',
        x: clickX - 50,
        y: clickY - 20,
        content: "Double-click to edit text"
      };
      setSpawnedElements(prev => [...prev, newText]);
      setActiveTool('select');
    } else if (activeTool === 'stamp') {
      const newStamp = {
        id: Date.now(),
        type: 'stamp',
        x: clickX - 25,
        y: clickY - 25,
        content: selectedStamp
      };
      setSpawnedElements(prev => [...prev, newStamp]);
      // keep activeTool as stamp so they can click repeatedly!
    }
  };

  // Drawing handlers (Marker Tool)
  const handleMouseDown = (e) => {
    if (activeTool !== 'marker') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = 2000 + (e.clientX - rect.left - rect.width / 2 - panOffset.x) / zoom;
    const y = 1250 + (e.clientY - rect.top - rect.height / 2 - panOffset.y) / zoom;


    setIsDrawing(true);
    setCurrentLine({
      points: [{ x, y }],
      color: selectedColor === "#FFE082" ? "#F24E1E" : selectedColor
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || activeTool !== 'marker') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = 2000 + (e.clientX - rect.left - rect.width / 2 - panOffset.x) / zoom;
    const y = 1250 + (e.clientY - rect.top - rect.height / 2 - panOffset.y) / zoom;


    setCurrentLine(prev => ({
      ...prev,
      points: [...prev.points, { x, y }]
    }));
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentLine && currentLine.points.length > 0) {
      setLines(prev => [...prev, currentLine]);
    }
    setCurrentLine(null);
  };

  // Drag helper to update offsets in real time for SVG paths
  const updateDragOffset = (key, info) => {
    setDragOffsets(prev => ({
      ...prev,
      [key]: { x: info.offset.x, y: info.offset.y }
    }));
  };

  // Calculate mockup details
  const getCardCenter = (key) => {
    const init = INITIAL_POSITIONS[key];
    const offset = dragOffsets[key] || { x: 0, y: 0 };
    return {
      x: init.x + init.w / 2 + offset.x,
      y: init.y + init.h / 2 + offset.y
    };
  };

  // Paths for SVGs
  const welcomeCenter = getCardCenter('welcome');
  const duelzCenter = getCardCenter('duelz');
  const farmeazyyCenter = getCardCenter('farmeazyy');
  const pspCenter = getCardCenter('psp');
  const lexicideCenter = getCardCenter('lexicide');
  const portfolioCenter = getCardCenter('portfolio');

  // Navigation to Portfolio
  function handleExplore() {
    navigate("/portfolio");
  }

  // Editing Spawned Elements
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEditing = (id) => {
    setSpawnedElements(prev => prev.map(el => {
      if (el.id === id) {
        return { ...el, content: editText };
      }
      return el;
    }));
    setEditingId(null);
  };

  const deleteElement = (id) => {
    setSpawnedElements(prev => prev.filter(el => el.id !== id));
  };

  // Get active cursor class
  const getCanvasCursorClass = () => {
    if (activeTool === 'hand') return 'cursor-default'; // Hand tool drags elements, not background
    if (activeTool === 'marker') return 'cursor-crosshair';
    if (activeTool === 'sticky' || activeTool === 'shape' || activeTool === 'text') return 'cursor-cell';
    if (activeTool === 'stamp') return 'cursor-copy';
    return 'cursor-default';
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-[#FAF9F6] relative select-none font-sans"
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      {/* 1. FIGJAM HEADER BAR */}
      <header className="fixed top-0 left-0 w-full h-[56px] bg-white border-b-2.5 border-[#121212] z-40 flex items-center justify-between px-3 md:px-4 select-none">
        {/* Left Side: Logo & Breadcrumbs */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F24E1E] border border-[#121212]/30 shadow-[1px_1px_0px_0px_rgba(18,18,18,0.2)] flex-shrink-0 overflow-hidden">
            <img src="/profile.JPG" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="h-4 w-[1.5px] bg-[#121212]/20 hidden sm:block" />
          <div className="flex items-center gap-1.5 font-mono text-[12px] md:text-[13px] font-bold text-[#121212]">
            <span className="opacity-45 hover:opacity-100 cursor-pointer transition hidden md:inline">Drafts</span>
            <span className="opacity-25 hidden md:inline">/</span>
            <span className="flex items-center gap-1.5">
              <span className="hidden sm:inline">Saksham&apos;s Portfolio Workspace ✨</span>
              <span className="sm:hidden">Saksham ✨</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-[#EAF6FF] text-[#007AFF] rounded border border-[#007AFF]/30 uppercase font-black tracking-wider hidden md:inline-block">
                FigJam Mode
              </span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-[#0ACF83] font-bold font-mono">
            <FaCloud className="w-3.5 h-3.5" />
            <span>Saved</span>
          </div>
        </div>

        {/* Center: Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#FAF9F6] border-2 border-[#121212] rounded-xl px-1.5 py-0.5 md:px-2 md:py-1 shadow-[2px_2px_0px_0px_#121212]">
          <button
            onClick={() => setZoom(prev => Math.max(0.3, prev - 0.1))}
            className="p-1 text-[#121212] hover:bg-[#121212]/5 rounded transition hidden md:block"
            title="Zoom Out"
          >
            <FaMinus className="w-2.5 h-2.5" />
          </button>
          <span className="text-[11px] md:text-[12px] font-black font-mono w-10 md:w-12 text-center text-[#121212]">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.min(1.8, prev + 0.1))}
            className="p-1 text-[#121212] hover:bg-[#121212]/5 rounded transition hidden md:block"
            title="Zoom In"
          >
            <FaPlus className="w-2.5 h-2.5" />
          </button>
          <div className="w-[1px] h-3 bg-[#121212]/20 mx-0.5 hidden md:block" />
          <button
            onClick={() => setZoom(window.innerWidth < 768 ? 0.75 : 0.85)}
            className="px-1.5 py-0.5 text-[9px] font-black font-mono bg-white border border-[#121212] rounded hover:bg-[#121212]/5 transition text-[#121212] hidden md:block"
          >
            Reset
          </button>
          <div className="w-[1px] h-3 bg-[#121212]/20 mx-0.5 hidden md:block" />
          <button
            onClick={() => setTutorialStep(0)}
            className="px-1.5 py-0.5 text-[9px] font-black font-mono bg-[#A259FF] text-white border border-[#121212] rounded hover:bg-[#A259FF]/90 transition hidden md:inline-block"
            title="Quick Tour"
          >
            Tour
          </button>
        </div>

        {/* Right Side: Avatars & Share */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Collaborative avatars */}
          <div className="hidden md:flex items-center -space-x-2.5">
            <div
              className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#A259FF] text-white flex items-center justify-center text-[10px] font-black shadow-md cursor-pointer hover:translate-y-[-2px] transition-transform"
              title="Saksham (Editor)"
            >
              SB
            </div>
            <div
              className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#0ACF83] text-white flex items-center justify-center text-[10px] font-black shadow-md cursor-pointer hover:translate-y-[-2px] transition-transform"
              title="Guest Recruiter (Viewer)"
            >
              GR
            </div>
            <div
              className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#1ABCFE] text-white flex items-center justify-center text-[10px] font-black shadow-md cursor-pointer hover:translate-y-[-2px] transition-transform"
              title="User Tester (Testing)"
            >
              UT
            </div>
            <div
              className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#FFC72C] text-white flex items-center justify-center text-[10px] font-black shadow-md cursor-pointer hover:translate-y-[-2px] transition-transform"
              title="You (Editor)"
            >
              YOU
            </div>
          </div>

          <button
            onClick={handleExplore}
            className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 bg-[#F24D1D] hover:bg-[#F24D1D]/90 text-white rounded-xl font-bold border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] md:shadow-[3px_3px_0px_0px_#121212] active:scale-95 transition-all text-xs md:text-sm"
          >
            <FaPlay className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">Present Portfolio</span>
            <span className="sm:hidden">Present</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE/INTERACTIVE FIGJAM CANVAS */}
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`w-full h-full relative canvas-bg overflow-hidden pt-[56px] select-none ${getCanvasCursorClass()}`}
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.09) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          backgroundPosition: `calc(50% + ${panOffset.x}px) calc(50% + ${panOffset.y}px)`,
          cursor: activeTool === 'select' ? `url('${customCursorSVG}') 0 0, auto` : undefined
        }}
      >
        {/* Virtual 4000x2500 Interactive Layer */}
        <div
          className="absolute inset-0 origin-center pointer-events-none"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            width: '4000px',
            height: '2500px',
            left: 'calc(50% - 2000px)',
            top: 'calc(50% - 1250px)',
            transformOrigin: 'center'
          }}
        >
          {/* Connector Wires Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {/* Curving Dotted Prototype Lines */}
            {/* Welcome -> Club Duelz */}
            <path
              d={`M ${welcomeCenter.x - 230} ${welcomeCenter.y} C ${welcomeCenter.x - 380} ${welcomeCenter.y}, ${duelzCenter.x + 190} ${duelzCenter.y + 150}, ${duelzCenter.x} ${duelzCenter.y}`}
              fill="none"
              stroke="#A259FF"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <circle cx={duelzCenter.x} cy={duelzCenter.y} r="4.5" fill="#A259FF" stroke="#121212" strokeWidth="2" />

            {/* Welcome -> FarmEazyy */}
            <path
              d={`M ${welcomeCenter.x + 230} ${welcomeCenter.y - 50} C ${welcomeCenter.x + 380} ${welcomeCenter.y - 50}, ${farmeazyyCenter.x - 200} ${farmeazyyCenter.y + 100}, ${farmeazyyCenter.x} ${farmeazyyCenter.y}`}
              fill="none"
              stroke="#0ACF83"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <circle cx={farmeazyyCenter.x} cy={farmeazyyCenter.y} r="4.5" fill="#0ACF83" stroke="#121212" strokeWidth="2" />

            {/* Welcome -> PSP Simulator */}
            <path
              d={`M ${welcomeCenter.x - 230} ${welcomeCenter.y + 100} C ${welcomeCenter.x - 380} ${welcomeCenter.y + 100}, ${pspCenter.x + 210} ${pspCenter.y - 100}, ${pspCenter.x + 210} ${pspCenter.y}`}
              fill="none"
              stroke="#1ABCFE"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <circle cx={pspCenter.x + 210} cy={pspCenter.y} r="4.5" fill="#1ABCFE" stroke="#121212" strokeWidth="2" />

            {/* Welcome -> Lexicide */}
            <path
              d={`M ${welcomeCenter.x + 230} ${welcomeCenter.y + 100} C ${welcomeCenter.x + 380} ${welcomeCenter.y + 100}, ${lexicideCenter.x - 190} ${lexicideCenter.y - 100}, ${lexicideCenter.x} ${lexicideCenter.y}`}
              fill="none"
              stroke="#FF7262"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <circle cx={lexicideCenter.x} cy={lexicideCenter.y} r="4.5" fill="#FF7262" stroke="#121212" strokeWidth="2" />

            {/* Welcome -> Portfolio Inception */}
            <path
              d={`M ${welcomeCenter.x} ${welcomeCenter.y + 190} C ${welcomeCenter.x} ${welcomeCenter.y + 300}, ${portfolioCenter.x} ${portfolioCenter.y - 140}, ${portfolioCenter.x} ${portfolioCenter.y}`}
              fill="none"
              stroke="#F24E1E"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <circle cx={portfolioCenter.x} cy={portfolioCenter.y} r="4.5" fill="#F24E1E" stroke="#121212" strokeWidth="2" />
          </svg>

          {/* Drawing SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {lines.map((line, index) => (
              <path
                key={index}
                d={line.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                stroke={line.color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
            {currentLine && (
              <path
                d={currentLine.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                stroke={currentLine.color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
          </svg>

          {/* VIRTUAL CANVA CARDS & MOCKUPS */}
          <div className="absolute inset-0 pointer-events-none">

            {/* MULTIPLAYER CURSORS */}
            <FigmaCursor name="Saksham" color="#A259FF" left={cursors.saksham.x} top={cursors.saksham.y} />
            <FigmaCursor name="Recruiter" color="#0ACF83" left={cursors.recruiter.x} top={cursors.recruiter.y} />
            <FigmaCursor name="User Tester" color="#1ABCFE" left={cursors.tester.x} top={cursors.tester.y} />

            {/* A. STICKERS AND DECORATIONS */}
            {/* Color Palette Card */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-3.5 bg-white border-2.5 border-[#121212] rounded-xl shadow-[4px_4px_0px_0px_#121212] z-20 flex flex-col gap-1.5 pointer-events-auto"
              style={{ left: "2100px", top: "850px", rotate: "4deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono">palette.json</div>
              <div className="flex gap-1.5">
                <div className="w-4 h-4 rounded-full border border-[#121212]" style={{ backgroundColor: "#F24E1E" }} />
                <div className="w-4 h-4 rounded-full border border-[#121212]" style={{ backgroundColor: "#A259FF" }} />
                <div className="w-4 h-4 rounded-full border border-[#121212]" style={{ backgroundColor: "#1ABCFE" }} />
                <div className="w-4 h-4 rounded-full border border-[#121212]" style={{ backgroundColor: "#0ACF83" }} />
              </div>
            </motion.div>

            {/* Typography Spec Card */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-3.5 bg-white border-2.5 border-[#121212] rounded-xl shadow-[4px_4px_0px_0px_#121212] z-20 flex flex-col gap-1 pointer-events-auto"
              style={{ left: "1680px", top: "870px", rotate: "-6deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono">typography.css</div>
              <div className="text-[11px] font-black text-[#121212]">Space Grotesk</div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] font-normal text-[#121212]/75">Aa</span>
                <span className="text-[10px] font-bold text-[#121212]">Bb</span>
                <span className="text-[10px] font-black text-[#121212]">Cc</span>
              </div>
            </motion.div>

            {/* UI/UX Design Sticker */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute px-4 py-1.5 bg-[#FF66B2] border-2.5 border-[#121212] rounded-lg shadow-[3px_3px_0px_0px_#121212] text-[11px] font-black uppercase text-[#121212] tracking-tighter pointer-events-auto"
              style={{ left: "2280px", top: "1220px", rotate: "8deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              UI/UX DESIGN
            </motion.div>

            {/* Static Sticky 1 */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#FFE082] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[140px] flex flex-col pointer-events-auto"
              style={{ left: "1580px", top: "1270px", rotate: "-5deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">sticky_note</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">My fav games are PSP and Lexicide 🎮</div>
            </motion.div>

            {/* Static Sticky 2 */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#A5F3FC] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[140px] flex flex-col pointer-events-auto"
              style={{ left: "2280px", top: "1050px", rotate: "6deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">sticky_note</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">Figma Orange for exploration trigger button.</div>
            </motion.div>

            {/* Corner Sticky 1: Top Left */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#FFE082] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[130px] flex flex-col pointer-events-auto"
              style={{ left: "80px", top: "80px", rotate: "-12deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">easter_egg</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">why u on top of me</div>
            </motion.div>

            {/* Corner Sticky 2: Top Right */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#A5F3FC] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[130px] flex flex-col pointer-events-auto"
              style={{ left: "3780px", top: "80px", rotate: "10deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">easter_egg</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">over the clouds</div>
            </motion.div>

            {/* Corner Sticky 3: Bottom Left */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#FF99C8] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[130px] flex flex-col pointer-events-auto"
              style={{ left: "80px", top: "2280px", rotate: "-8deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">easter_egg</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">what u doing here bro</div>
            </motion.div>

            {/* Corner Sticky 4: Bottom Right */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#A8E6CF] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[130px] flex flex-col pointer-events-auto"
              style={{ left: "3780px", top: "2280px", rotate: "12deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">easter_egg</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">u might sink</div>
            </motion.div>

            {/* Interest Sticky 1: Chess */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#A5F3FC] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[150px] flex flex-col pointer-events-auto"
              style={{ left: "1000px", top: "300px", rotate: "6deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">my_interests</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">Chess: Always down for a match. Favorite opening: Queen&apos;s Gambit. ♟️</div>
            </motion.div>

            {/* Interest Sticky 2: Seedhe Maut / DHH */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#FF99C8] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[150px] flex flex-col pointer-events-auto"
              style={{ left: "3100px", top: "1100px", rotate: "-7deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">my_interests</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">Seedhe Maut: TBSM. ⚔️ Desi Hip Hop (DHH) on repeat! 🎤🔥</div>
            </motion.div>

            {/* Interest Sticky 3: Rock & Metal */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#FFE082] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[150px] flex flex-col pointer-events-auto"
              style={{ left: "2800px", top: "1900px", rotate: "5deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">my_interests</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">Music: Heavy metal riffs & classic rock solos guide my design flow. 🎸🤘</div>
            </motion.div>

            {/* Interest Sticky 4: Calisthenics */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute p-4 bg-[#A8E6CF] border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-25 w-[150px] flex flex-col pointer-events-auto"
              style={{ left: "900px", top: "1800px", rotate: "-8deg", cursor: activeTool === 'hand' ? 'grab' : 'default' }}
            >
              <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono mb-1">my_interests</div>
              <div className="text-[11px] font-bold text-[#121212] font-mono leading-tight">Calisthenics: Push-ups, pull-ups, and handstands. Master your bodyweight. 🤸‍♂️💪</div>
            </motion.div>

            {/* Eminem Lyric Easter Egg 1 */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute pointer-events-auto select-none z-20 text-center"
              style={{
                left: "500px",
                top: "1000px",
                rotate: "-6deg",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                color: "#121212",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.2px",
                lineHeight: "1.4",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              It goes Reggie, Jay-Z, 2Pac and Biggie,<br />
              André from OutKast, Jada, Kurupt, Nas and then me
            </motion.div>


            {/* Eminem Lyric Easter Egg 2 */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute pointer-events-auto select-none uppercase z-20 text-center"
              style={{
                left: "1400px",
                top: "150px",
                rotate: "3deg",
                fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                color: "white",
                textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -3px 0px 0 #000, 3px 0px 0 #000, 0px -3px 0 #000, 0px 3px 0 #000",
                fontSize: "28px",
                fontWeight: "bold",
                letterSpacing: "1.5px",
                lineHeight: "1.1",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              YOU ONLY GET ONE SHOT<br />
              DO NOT MISS YOUR CHANCE TO BLOW
            </motion.div>

            {/* Seedhe Maut Quote Easter Egg */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              className="absolute pointer-events-auto select-none z-20 text-center"
              style={{
                left: "3250px",
                top: "2050px",
                rotate: "-5deg",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                color: "#121212",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.2px",
                lineHeight: "1.4",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              kalam jale, dard dukhe, marham bane<br />
              aashwasan andhavishwasi, bhram tute<br />
              sabhi jhuke aur shraddha se bole, "Seedhe Maut, namastute"
            </motion.div>




            {/* B. MAIN WELCOME CARD SECTION */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              onDrag={(e, info) => updateDragOffset('welcome', info)}
              className="absolute pointer-events-auto bg-white border-2.5 border-[#121212] rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(18,18,18,1)] flex flex-col justify-between z-20"
              style={{
                left: `${INITIAL_POSITIONS.welcome.x}px`,
                top: `${INITIAL_POSITIONS.welcome.y}px`,
                width: `${INITIAL_POSITIONS.welcome.w}px`,
                height: `${INITIAL_POSITIONS.welcome.h}px`,
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              {/* FigJam Section Banner Title */}
              <div className="bg-[#A259FF] text-white px-3 py-1.5 text-[10px] font-black font-mono rounded-t-xl border-t-2.5 border-x-2.5 border-[#121212] absolute -top-[29px] left-5 flex items-center gap-1.5 tracking-wider select-none">
                <span>SECTION</span>
                <span className="opacity-50">/</span>
                <span>WELCOME</span>
              </div>

              <div className="flex flex-col text-left">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-[#121212] mb-4 leading-tight tracking-tight">
                  Hi I&apos;m<br />
                  <span className="text-[#A259FF]">Saksham Budhiraja</span>
                </h1>

                <p className="text-md lg:text-lg text-[#444444] font-medium leading-relaxed mb-6">
                  UI/UX Designer who builds with <span className="font-bold text-[#1ABCFE]">Figma</span>, <span className="font-bold text-[#0ACF83]">React</span> &amp; <span className="font-bold text-[#F24E1E]">Storytelling</span>.
                </p>
              </div>

              <button
                onClick={handleExplore}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-[#F24D1D] text-white text-base lg:text-lg font-bold border-2.5 border-[#121212] shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-[#F24D1D]/90 transition-all cursor-pointer font-sans"
              >
                <span>Explore My Workspace</span>
                <span className="text-xl">➞</span>
              </button>
            </motion.div>

            {/* C. APPROVED 5 PROJECT mockups */}
            {/* Mockup 1: Club Duelz */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              onDrag={(e, info) => updateDragOffset('duelz', info)}
              className="absolute pointer-events-auto z-20"
              style={{
                left: `${INITIAL_POSITIONS.duelz.x}px`,
                top: `${INITIAL_POSITIONS.duelz.y}px`,
                width: `${INITIAL_POSITIONS.duelz.w}px`,
                height: `${INITIAL_POSITIONS.duelz.h}px`,
                rotate: "-4deg",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              <BrowserFrame
                title="club_duelz.exe"
                frameName="Artboard 1 - Mobile App"
                resolution="390 x 844"
                onClickLink={() => navigate("/portfolio")}
              >
                <img src="/cb1.png" alt="Club Duelz" className="w-full h-full object-cover select-none pointer-events-none" />
              </BrowserFrame>
            </motion.div>

            {/* Mockup 2: FarmEazyy */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              onDrag={(e, info) => updateDragOffset('farmeazyy', info)}
              className="absolute pointer-events-auto z-20"
              style={{
                left: `${INITIAL_POSITIONS.farmeazyy.x}px`,
                top: `${INITIAL_POSITIONS.farmeazyy.y}px`,
                width: `${INITIAL_POSITIONS.farmeazyy.w}px`,
                height: `${INITIAL_POSITIONS.farmeazyy.h}px`,
                rotate: "3deg",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              <BrowserFrame
                title="farmeazyy.com"
                frameName="Artboard 2 - Web Platform"
                resolution="1440 x 900"
                onClickLink={() => navigate("/portfolio")}
              >
                <img src="/Farmeazyy1.png" alt="FarmEazyy" className="w-full h-full object-cover select-none pointer-events-none" />
              </BrowserFrame>
            </motion.div>

            {/* Mockup 3: PSP Simulator */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              onDrag={(e, info) => updateDragOffset('psp', info)}
              className="absolute pointer-events-auto z-20"
              style={{
                left: `${INITIAL_POSITIONS.psp.x}px`,
                top: `${INITIAL_POSITIONS.psp.y}px`,
                width: `${INITIAL_POSITIONS.psp.w}px`,
                height: `${INITIAL_POSITIONS.psp.h}px`,
                rotate: "-2deg",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              <BrowserFrame
                title="psp_emu.iso"
                frameName="Artboard 3 - Interactive"
                resolution="1280 x 720"
                onClickLink={() => navigate("/portfolio")}
              >
                <img src="/psp1.png" alt="PSP Simulator" className="w-full h-full object-cover select-none pointer-events-none" />
              </BrowserFrame>
            </motion.div>

            {/* Mockup 4: Lexicide */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              onDrag={(e, info) => updateDragOffset('lexicide', info)}
              className="absolute pointer-events-auto z-20"
              style={{
                left: `${INITIAL_POSITIONS.lexicide.x}px`,
                top: `${INITIAL_POSITIONS.lexicide.y}px`,
                width: `${INITIAL_POSITIONS.lexicide.w}px`,
                height: `${INITIAL_POSITIONS.lexicide.h}px`,
                rotate: "4deg",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              <BrowserFrame
                title="lexicide.sh"
                frameName="Artboard 4 - Game Layout"
                resolution="800 x 600"
                onClickLink={() => navigate("/portfolio")}
              >
                <img src="/lexicide1.png" alt="Lexicide" className="w-full h-full object-cover select-none pointer-events-none" />
              </BrowserFrame>
            </motion.div>

            {/* Mockup 5: My Design Portfolio */}
            <motion.div
              drag={activeTool === 'hand'}
              dragMomentum={true}
              onDrag={(e, info) => updateDragOffset('portfolio', info)}
              className="absolute pointer-events-auto z-20"
              style={{
                left: `${INITIAL_POSITIONS.portfolio.x}px`,
                top: `${INITIAL_POSITIONS.portfolio.y}px`,
                width: `${INITIAL_POSITIONS.portfolio.w}px`,
                height: `${INITIAL_POSITIONS.portfolio.h}px`,
                rotate: "-3deg",
                cursor: activeTool === 'hand' ? 'grab' : 'default'
              }}
            >
              <BrowserFrame
                title="portfolio.dev"
                frameName="Artboard 5 - Portfolio Inception"
                resolution="1440 x 900"
                onClickLink={() => navigate("/portfolio")}
              >
                <img src="/p1.png" alt="My Design Portfolio" className="w-full h-full object-cover select-none pointer-events-none" />
              </BrowserFrame>
            </motion.div>

            {/* D. USER SPAWNED BOARD ELEMENTS */}
            {spawnedElements.map((el) => {
              if (el.type === 'sticky') {
                return (
                  <motion.div
                    key={el.id}
                    drag={activeTool === 'hand'}
                    dragMomentum={true}
                    className="absolute p-4 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-30 w-[140px] h-[140px] flex flex-col justify-between pointer-events-auto group/item"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      backgroundColor: el.color,
                      cursor: activeTool === 'hand' ? 'grab' : 'default'
                    }}
                  >
                    {/* Delete stamp button */}
                    <button
                      onClick={() => deleteElement(el.id)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-[#121212] border border-white text-white rounded-full flex items-center justify-center text-[9px] opacity-0 group-hover/item:opacity-100 transition-opacity"
                    >
                      <FaTrash className="w-2 h-2" />
                    </button>

                    <div className="text-[8px] font-bold text-[#121212] opacity-40 tracking-wider font-mono">sticky_note</div>

                    {editingId === el.id ? (
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEditing(el.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            saveEditing(el.id);
                          }
                        }}
                        autoFocus
                        className="w-full h-[80px] bg-transparent resize-none border-none outline-none font-mono text-[11px] leading-snug text-[#121212]"
                      />
                    ) : (
                      <div
                        onDoubleClick={() => startEditing(el.id, el.content)}
                        className="text-[11px] font-mono leading-tight text-[#121212] overflow-hidden truncate-3-lines flex-1 pt-1.5 cursor-text"
                        title="Double click to edit text"
                      >
                        {el.content}
                      </div>
                    )}
                  </motion.div>
                );
              }

              if (el.type === 'shape') {
                return (
                  <motion.div
                    key={el.id}
                    drag={activeTool === 'hand'}
                    dragMomentum={true}
                    className="absolute border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] z-30 flex items-center justify-center p-3 text-center pointer-events-auto group/item"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      width: '100px',
                      height: '100px',
                      backgroundColor: el.color,
                      borderRadius: el.shapeType === 'circle' ? '50%' : el.shapeType === 'diamond' ? '0px' : '12px',
                      rotate: el.shapeType === 'diamond' ? '45deg' : '0deg',
                      cursor: activeTool === 'hand' ? 'grab' : 'default'
                    }}
                  >
                    <button
                      onClick={() => deleteElement(el.id)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-[#121212] border border-white text-white rounded-full flex items-center justify-center text-[9px] opacity-0 group-hover/item:opacity-100 transition-opacity"
                      style={{ transform: el.shapeType === 'diamond' ? 'rotate(-45deg)' : 'none' }}
                    >
                      <FaTrash className="w-2 h-2" />
                    </button>

                    <span
                      className="text-[10px] font-bold text-[#121212]"
                      style={{ transform: el.shapeType === 'diamond' ? 'rotate(-45deg)' : 'none' }}
                    >
                      {el.shapeType.toUpperCase()}
                    </span>
                  </motion.div>
                );
              }

              if (el.type === 'text') {
                return (
                  <motion.div
                    key={el.id}
                    drag={activeTool === 'hand'}
                    dragMomentum={true}
                    className="absolute p-2 bg-transparent z-30 pointer-events-auto group/item"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      cursor: activeTool === 'hand' ? 'grab' : 'default'
                    }}
                  >
                    <button
                      onClick={() => deleteElement(el.id)}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-[#121212] border border-white text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover/item:opacity-100 transition-opacity"
                    >
                      <FaTrash className="w-2 h-2" />
                    </button>
                    {editingId === el.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEditing(el.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            saveEditing(el.id);
                          }
                        }}
                        autoFocus
                        className="bg-transparent border-b border-[#121212] outline-none font-bold text-base text-[#121212]"
                      />
                    ) : (
                      <div
                        onDoubleClick={() => startEditing(el.id, el.content)}
                        className="font-bold text-base text-[#121212] cursor-text"
                      >
                        {el.content}
                      </div>
                    )}
                  </motion.div>
                );
              }

              if (el.type === 'stamp') {
                return (
                  <motion.div
                    key={el.id}
                    drag={activeTool === 'hand'}
                    dragMomentum={true}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute text-3xl z-30 select-none cursor-grab active:cursor-grabbing pointer-events-auto group/item"
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      cursor: activeTool === 'hand' ? 'grab' : 'default'
                    }}
                  >
                    <button
                      onClick={() => deleteElement(el.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#121212] border border-white text-white rounded-full flex items-center justify-center text-[7px] opacity-0 group-hover/item:opacity-100 transition-opacity z-40"
                    >
                      ×
                    </button>
                    {el.content}
                  </motion.div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>

      {/* 3. FLOAT SYSTEM: SUB-DOCK (Above main toolbar when tools are active) */}
      <AnimatePresence>
        {(activeTool === 'sticky' || activeTool === 'shape' || activeTool === 'stamp' || activeTool === 'marker') && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 15, x: '-50%' }}
            className="hidden md:flex fixed bottom-[76px] md:bottom-[88px] left-1/2 z-40 bg-white border-2 border-[#121212] rounded-xl px-2 py-1.5 md:px-3 md:py-2 flex items-center gap-2.5 md:gap-3 shadow-[3px_3px_0px_0px_#121212] max-w-[95vw] overflow-x-auto whitespace-nowrap scrollbar-none"
          >
            {/* Color options picker */}
            {(activeTool === 'sticky' || activeTool === 'shape' || activeTool === 'marker') && (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[9px] md:text-[10px] font-black font-mono text-[#121212] mr-1 uppercase">Color:</span>
                {[
                  { hex: "#FFE082", title: "Yellow" },
                  { hex: "#80BFFF", title: "Blue" },
                  { hex: "#FF99C8", title: "Pink" },
                  { hex: "#A8E6CF", title: "Green" },
                  { hex: "#F24D1D", title: "Orange" },
                  { hex: "#121212", title: "Black" }
                ].map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => setSelectedColor(col.hex)}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-[#121212] transition-transform active:scale-95 flex-shrink-0"
                    style={{
                      backgroundColor: col.hex,
                      scale: selectedColor === col.hex ? 1.25 : 1,
                      boxShadow: selectedColor === col.hex ? '0 0 0 1px #121212' : 'none'
                    }}
                    title={col.title}
                  />
                ))}
              </div>
            )}

            {/* Shape selection sub-options */}
            {activeTool === 'shape' && (
              <>
                <div className="w-[1.5px] h-5 bg-[#121212]/20 flex-shrink-0" />
                <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0">
                  {[
                    { id: 'rectangle', label: 'Box' },
                    { id: 'circle', label: 'Circle' },
                    { id: 'diamond', label: 'Diamond' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedShapeType(s.id)}
                      className={`px-1.5 py-0.5 md:px-2 md:py-0.5 text-[9px] md:text-[10px] font-black font-mono rounded border border-[#121212] transition-colors ${selectedShapeType === s.id ? 'bg-[#121212] text-white' : 'bg-[#FAF9F6] text-[#121212]'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Stamp selection sub-options */}
            {activeTool === 'stamp' && (
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <span className="text-[9px] md:text-[10px] font-black font-mono text-[#121212] uppercase mr-1">Stamp:</span>
                {["👍", "❤️", "🔥", "⚡", "💡", "😢", "😂"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedStamp(emoji)}
                    className="text-base md:text-xl hover:scale-125 transition-transform active:scale-95 flex-shrink-0"
                    style={{
                      scale: selectedStamp === emoji ? 1.3 : 1
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Draw clear control */}
            {activeTool === 'marker' && lines.length > 0 && (
              <>
                <div className="w-[1.5px] h-5 bg-[#121212]/20 flex-shrink-0" />
                <button
                  onClick={() => setLines([])}
                  className="flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-0.5 text-[9px] md:text-[10px] font-black font-mono text-red-500 hover:bg-red-50 rounded border border-red-500 transition-colors flex-shrink-0"
                >
                  <FaUndo className="w-2.5 h-2.5" />
                  <span>Clear Draw</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. FIGJAM FLOATING BOTTOM TOOLBAR */}
      <div className="hidden md:flex fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border-2.5 border-[#121212] rounded-2xl px-3.5 py-2 md:px-5 md:py-3 flex items-center gap-3.5 md:gap-5 shadow-[4px_4px_0px_0px_#121212] select-none pointer-events-auto max-w-[95vw] overflow-x-auto whitespace-nowrap scrollbar-none">

        {/* Tool 1: Pointer Select Tool (V) */}
        <button
          onClick={() => setActiveTool('select')}
          className={`hover:scale-115 transition-transform active:scale-95 flex-shrink-0 ${activeTool === 'select' ? 'text-[#1ABCFE]' : 'text-[#121212]'}`}
          title="Pointer Tool"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" /></svg>
        </button>

        {/* Tool 2: Hand Tool (Pan/Move) */}
        <button
          onClick={() => setActiveTool('hand')}
          className={`hover:scale-115 transition-transform active:scale-95 flex-shrink-0 ${activeTool === 'hand' ? 'text-[#A259FF]' : 'text-[#121212]'}`}
          title="Hand Tool (Move Board Elements)"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v9.5" /><path d="M6 14v-1.5a1.5 1.5 0 0 0-3 0V16a8 8 0 0 0 16 0v-3a2 2 0 0 0-2 2v2" /></svg>
        </button>

        <div className="w-px h-5 bg-[#121212]/20 flex-shrink-0" />

        {/* Tool 3: Marker Drawing Tool (P) */}
        <button
          onClick={() => setActiveTool('marker')}
          className={`hover:scale-115 transition-transform active:scale-95 flex-shrink-0 ${activeTool === 'marker' ? 'text-[#F24E1E]' : 'text-[#121212]'}`}
          title="Marker Tool"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
        </button>

        {/* Tool 4: Sticky Note Tool */}
        <button
          onClick={() => setActiveTool('sticky')}
          className={`w-4 h-4 md:w-5 md:h-5 rounded shadow-[1px_1px_0px_0px_#121212] hover:scale-115 transition-transform active:scale-95 border-2 flex-shrink-0 ${activeTool === 'sticky' ? 'border-[#FFC72C]' : 'border-[#121212]'}`}
          style={{ backgroundColor: selectedColor }}
          title="Place Sticky Note"
        />

        {/* Tool 5: Shapes Tool */}
        <button
          onClick={() => setActiveTool('shape')}
          className={`w-4 h-4 md:w-5 md:h-5 rounded-full hover:scale-115 transition-transform active:scale-95 border-2 flex-shrink-0 ${activeTool === 'shape' ? 'border-[#0ACF83] bg-[#0ACF83]/10' : 'border-[#121212]'}`}
          title="Place Shapes"
        />

        {/* Tool 6: Text Tool */}
        <button
          onClick={() => setActiveTool('text')}
          className={`text-[13px] md:text-[15px] font-black hover:scale-115 transition-transform active:scale-95 font-mono flex-shrink-0 ${activeTool === 'text' ? 'text-[#FF7262]' : 'text-[#121212]'}`}
          title="Add Text"
        >
          T
        </button>

        {/* Tool 7: Stamp Emojis Tool */}
        <button
          onClick={() => setActiveTool('stamp')}
          className={`text-base md:text-lg hover:scale-115 transition-transform active:scale-95 flex-shrink-0 ${activeTool === 'stamp' ? 'scale-125 filter drop-shadow-[0_0_2px_rgba(18,18,18,0.2)]' : 'opacity-85'}`}
          title="Stamps / Emojis"
        >
          {selectedStamp}
        </button>
      </div>

      {/* FigBot welcome chip — shown when tutorial is idle */}
      <AnimatePresence>
        {showFigBotChip && tutorialStep === -1 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, delay: 0.6 }}
            className="hidden md:block fixed bottom-[92px] left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          >
            <div className="flex items-center gap-2 bg-white border-2 border-[#121212] rounded-full pl-2 pr-4 py-1.5 shadow-[3px_3px_0px_0px_#121212] cursor-pointer group"
              onClick={() => setTutorialStep(0)}
            >
              <div className="w-7 h-7 rounded-full bg-[#A259FF] border-2 border-[#121212] flex items-center justify-center text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                🤖
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-black uppercase font-mono text-[#A259FF] tracking-wider">FigBot</span>
                <span className="text-[10px] font-bold text-[#121212]">👋 Click for a quick tour!</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowFigBotChip(false); }}
                className="ml-1 text-[#999] hover:text-[#121212] text-[11px] leading-none cursor-pointer"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
            {/* Down caret */}
            <div
              className="absolute bottom-[-7px] left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderTop: '7px solid #121212',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FigBot tutorial bubble — compact, sits above toolbar */}
      <AnimatePresence>
        {tutorialStep >= 0 && tutorialStep < TUTORIAL_STEPS.length && (() => {
          const step = TUTORIAL_STEPS[tutorialStep];
          return (
            <motion.div
              key={tutorialStep}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="hidden md:block fixed bottom-[92px] left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
            >
              <div className="bg-white border-2 border-[#121212] rounded-2xl shadow-[4px_4px_0px_0px_#121212] flex items-start gap-3 px-4 py-3 w-[300px]">
                {/* Bot avatar */}
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#A259FF] border-2 border-[#121212] flex items-center justify-center text-sm shadow-[2px_2px_0px_0px_#121212]">
                  🤖
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-black uppercase font-mono text-[#A259FF] tracking-wider">FigBot</span>
                    <span className="text-[9px] text-[#121212]/30 font-mono">{tutorialStep + 1}/{TUTORIAL_STEPS.length}</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#121212] mb-0.5 leading-snug">
                    {step.emoji} {step.title}
                  </p>
                  <p className="text-[10px] text-[#666] leading-relaxed">{step.desc}</p>
                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2">
                    {step.last ? (
                      <button
                        onClick={() => { setTutorialStep(-1); setShowFigBotChip(false); setActiveTool('select'); }}
                        className="px-3 py-0.5 bg-[#0ACF83] text-white text-[9px] font-black rounded-lg border border-[#121212] hover:bg-[#0ACF83]/90 transition cursor-pointer"
                      >
                        Let's go! 🚀
                      </button>
                    ) : (
                      <button
                        onClick={() => setTutorialStep(prev => prev + 1)}
                        className="px-3 py-0.5 bg-[#A259FF] text-white text-[9px] font-black rounded-lg border border-[#121212] hover:bg-[#A259FF]/90 transition cursor-pointer"
                      >
                        Next →
                      </button>
                    )}
                    <button
                      onClick={() => { setTutorialStep(-1); setShowFigBotChip(false); }}
                      className="text-[9px] text-[#999] hover:text-[#121212] transition cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
                {/* Down caret */}
                <div
                  className="absolute bottom-[-7px] left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '7px solid transparent',
                    borderRight: '7px solid transparent',
                    borderTop: '7px solid #121212',
                  }}
                />
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>


    </div>
  );
}