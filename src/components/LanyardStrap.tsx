"use client";
import { motion } from "framer-motion";

export default function LanyardStrap() {
  return (
    <div className="relative w-full h-screen bg-[#F0EFEC] flex items-start justify-center pt-12 overflow-hidden">
      {/* Lanyard strap with sway motion */}
      <motion.div
        className="relative"
        style={{
          width: "90px",
          height: "500px",
          transformOrigin: "top center",
        }}
        animate={{
          rotate: [0, 2.5, 0, -2.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Black fabric strap with inline text */}
        <div 
          className="relative w-full h-full bg-black rounded-sm shadow-lg overflow-hidden flex flex-col items-center justify-start py-4 px-1"
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" seed=\"2\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" fill=\"%23000\" filter=\"url(%23noise)\" opacity=\"0.03\"/%3E%3C/svg%3E')", 
            backgroundSize: "100px 100px"
          }}
        >
          <style>{`
            @keyframes textScroll {
              0% { transform: translateY(0); }
              100% { transform: translateY(600px); }
            }
            
            .strap-text {
              animation: textScroll 8s linear infinite;
              color: white;
              font-family: 'JetBrains Mono', monospace;
              font-size: 9px;
              font-weight: 700;
              letter-spacing: 0.1em;
              line-height: 1.4;
              text-align: center;
              word-break: break-word;
              white-space: pre-wrap;
            }
          `}</style>
          
          {/* Scrolling text - displayed normally (horizontal) */}
          <div className="strap-text text-center w-full px-1">
            SUKUMAR
            <br />
            DOPATI
            <br />
            ·
            <br />
            JAVA
            <br />
            BACKEND
            <br />
            DEVELOPER
            <br />
            ·
            <br />
            SUKUMAR
            <br />
            DOPATI
            <br />
            ·
            <br />
            JAVA
            <br />
            BACKEND
            <br />
            DEVELOPER
            <br />
            ·
          </div>
        </div>

        {/* Silver metal clip at bottom */}
        <div className="absolute bottom-0 left-1/2 w-20 h-10 -translate-x-1/2 translate-y-1/2">
          <div
            className="w-full h-full rounded-full shadow-lg relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #d0d0d0 0%, #f5f5f5 30%, #ffffff 50%, #e0e0e0 70%, #b0b0b0 100%)",
              boxShadow: "inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="absolute top-2 left-1/2 w-12 h-0.5 -translate-x-1/2 bg-black opacity-20" />
          </div>
        </div>
      </motion.div>

      {/* Badge preview at bottom */}
      <motion.div
        className="absolute bottom-20 left-1/2 w-72 -translate-x-1/2"
        style={{
          transformOrigin: "top center",
        }}
        animate={{
          rotate: [0, 2.5, 0, -2.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-black text-white text-center py-2 w-full">
            <p className="font-mono text-xs font-bold tracking-widest">DEVELOPER ID</p>
          </div>
          <div className="h-32 bg-gradient-to-b from-gray-200 to-gray-300" />
        </div>
      </motion.div>

      {/* Help text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-xs text-gray-500 font-mono">
        <p>Swaying lanyard with scrolling text</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
      `}</style>
    </div>
  );
}
