"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function DraggableBadge() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ start: { x: 0, y: 0 }, lastPos: { x: 0, y: 0 } });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Physics simulation with spring and damping
  const updatePhysics = () => {
    if (isDragging) return;

    setPosition((prev) => {
      let newX = prev.x + velocityRef.current.x;
      let newY = prev.y + velocityRef.current.y;

      // Spring force back to center
      const springStrength = 0.05;
      newX -= newX * springStrength;
      newY -= newY * springStrength;

      // Damping
      velocityRef.current.x *= 0.95;
      velocityRef.current.y *= 0.95;

      // Stop if movement is negligible
      if (Math.abs(velocityRef.current.x) < 0.1 && Math.abs(velocityRef.current.y) < 0.1) {
        velocityRef.current.x = 0;
        velocityRef.current.y = 0;
      }

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    if (!isDragging && (velocityRef.current.x !== 0 || velocityRef.current.y !== 0)) {
      const interval = setInterval(updatePhysics, 1000 / 60); // 60fps
      animationRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) return; // Ignore if clicking background
    setIsDragging(true);
    dragRef.current.start = { x: e.clientX, y: e.clientY };
    dragRef.current.lastPos = { x: position.x, y: position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragRef.current.start.x;
    const dy = e.clientY - dragRef.current.start.y;

    setPosition({
      x: dragRef.current.lastPos.x + dx,
      y: dragRef.current.lastPos.y + dy,
    });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Calculate velocity for inertia
    const timeDelta = 16; // ~60fps
    velocityRef.current = {
      x: (position.x - dragRef.current.lastPos.x) / timeDelta,
      y: (position.y - dragRef.current.lastPos.y) / timeDelta,
    };
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Constrain position to viewport with more generous bounds for mobile
  const maxMove = 150;
  const constrainedX = Math.max(-maxMove, Math.min(maxMove, position.x));
  const constrainedY = Math.max(-maxMove, Math.min(maxMove, position.y));

  // Rotation based on position (pendulum effect)
  const rotateZ = (constrainedX / maxMove) * 20; // Tilt left/right
  const rotateX = (constrainedY / maxMove) * 15; // Tilt up/down

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#EEEEEC] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden select-none"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top-right About button */}
      <button className="absolute top-6 right-6 px-5 py-2 bg-black text-white text-xs font-semibold rounded-full hover:bg-gray-800 active:bg-gray-900 transition-colors z-50">
        About
      </button>

      {/* Lanyard strap */}
      <Lanyard position={{ x: constrainedX, y: constrainedY }} />

      {/* Badge card - mobile-first sizing */}
      <motion.div
        className="relative w-72 h-96 sm:w-80 sm:h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          rotateZ,
          rotateX,
          x: constrainedX,
          y: constrainedY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: isFlipped ? 0.6 : undefined }}
        onMouseDown={handleMouseDown}
        onClick={toggleFlip}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          dragRef.current.start = { x: touch.clientX, y: touch.clientY };
          dragRef.current.lastPos = { x: position.x, y: position.y };
          setIsDragging(true);
        }}
        onTouchMove={(e) => {
          if (!isDragging) return;
          const touch = e.touches[0];
          const dx = touch.clientX - dragRef.current.start.x;
          const dy = touch.clientY - dragRef.current.start.y;
          setPosition({
            x: dragRef.current.lastPos.x + dx,
            y: dragRef.current.lastPos.y + dy,
          });
        }}
        onTouchEnd={() => {
          setIsDragging(false);
          velocityRef.current = {
            x: (position.x - dragRef.current.lastPos.x) / 16,
            y: (position.y - dragRef.current.lastPos.y) / 16,
          };
        }}
      >
        {/* Front side */}
        <motion.div
          className="absolute w-full h-full bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center justify-between"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {/* Black header */}
          <div className="w-full bg-black text-white text-center py-2 -mx-4 -mt-4 rounded-t-2xl">
            <p className="font-mono text-xs font-bold tracking-widest">DEVELOPER ID</p>
          </div>

          {/* Photo area */}
          <div className="w-28 h-36 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg mt-3 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 font-mono text-xs text-center px-2">Photo</span>
          </div>

          {/* Name */}
          <h2 className="text-lg font-bold text-black mt-3">Sukumar Dopati</h2>

          {/* Role */}
          <p className="text-xs text-gray-500 font-medium">Java Backend Developer</p>

          {/* Info rows */}
          <div className="w-full mt-3 space-y-2">
            <div className="border-t border-gray-200 pt-1.5 pb-1.5">
              <p className="font-mono text-xs text-gray-700">
                <span className="font-semibold">DEPT.</span>
                <span className="ml-2 font-normal">Software Engineering</span>
              </p>
            </div>
            <div className="border-t border-gray-200 pt-1.5">
              <p className="font-mono text-xs text-gray-700">
                <span className="font-semibold">JOINED</span>
                <span className="ml-2 font-normal">Jul 2023</span>
              </p>
            </div>
          </div>

          {/* Barcode and hologram */}
          <div className="w-full flex justify-between items-end mt-3 px-2">
            <div className="w-14 h-5 bg-black flex gap-0.5 px-1 py-0.5">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`flex-1 ${i % 2 === 0 ? "bg-gray-800" : "bg-black"}`} />
              ))}
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-200 shadow-md flex-shrink-0" />
          </div>
        </motion.div>

        {/* Back side */}
        <motion.div
          className="absolute w-full h-full bg-white rounded-2xl shadow-2xl p-4 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <p className="font-mono text-xs font-bold text-gray-700 mb-2 tracking-wide">WHAT I AM</p>
            <div className="space-y-2 text-xs text-gray-800 leading-relaxed">
              <div className="border-b border-gray-200 pb-2">Java Backend Developer, Infor XA ERP</div>
              <div className="border-b border-gray-200 pb-2">B.Tech CSE · CGPA 8.7 / 10.0</div>
              <div className="border-b border-gray-200 pb-2">Job Portal REST API · Packing (R11.1)</div>
              <div className="pb-2">Three-time Best Employee · NPTEL Top 1%</div>
            </div>
          </div>

          {/* Signature and contact */}
          <div>
            <p className="font-serif italic text-base text-gray-900">Sukumar Dopati</p>
            <p className="font-mono text-xs text-gray-500 mt-1">If found, say hello</p>
            <p className="font-mono text-xs text-gray-500">dopatisukumar@gmail.com</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Help text - mobile optimized */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono pointer-events-none">
        <div className="hidden sm:block">Drag • Click to flip</div>
        <div className="sm:hidden">Swipe • Tap to flip</div>
      </div>
    </div>
  );
}

function Lanyard({ position }: { position: { x: number; y: number } }) {
  return (
    <motion.div
      className="absolute top-0 w-6 origin-top flex flex-col items-center"
      style={{
        left: "50%",
        marginLeft: "-12px",
        height: "140px",
      }}
      animate={{
        x: position.x * 0.2,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* Strap with animated text */}
      <div className="w-full h-24 bg-black relative overflow-hidden rounded-b-sm shadow-lg">
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center whitespace-nowrap"
          animate={{
            y: [0, 60],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="font-mono text-white text-xs leading-tight">
            SUKUMAR DOPATI ·
            <br />
            JAVA BACKEND
            <br />
            DEVELOPER ·
          </div>
          <div className="font-mono text-white text-xs leading-tight mt-2">
            SUKUMAR DOPATI ·
            <br />
            JAVA BACKEND
            <br />
            DEVELOPER ·
          </div>
        </motion.div>
      </div>

      {/* Clip/ring */}
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full shadow-lg -mt-2.5 z-10" />
    </motion.div>
  );
}
