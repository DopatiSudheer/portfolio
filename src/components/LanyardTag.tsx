"use client";

export default function LanyardTag() {
  return (
    <div 
      className="absolute left-1/2 w-20 origin-top flex flex-col items-center"
      style={{
        transform: "translateX(-50%)",
        top: "-140px",
      }}
    >
      {/* Black strap with scrolling text */}
      <div 
        className="w-full bg-black rounded-sm shadow-lg overflow-hidden relative"
        style={{ 
          height: "140px",
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" seed=\"2\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" fill=\"%23000\" filter=\"url(%23noise)\" opacity=\"0.03\"/%3E%3C/svg%3E')", 
          backgroundSize: "100px 100px",
        }}
      >
        <style>{`
          @keyframes tagScroll {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-180px); }
          }
          
          .tag-text {
            animation: tagScroll 8s linear infinite;
            color: white;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.15em;
            line-height: 1.8;
            text-align: center;
            padding: 20px 4px;
            position: relative;
          }
        `}</style>
        
        {/* Scrolling text - must be visible */}
        <div className="tag-text">
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
        </div>
      </div>

      {/* Clip */}
      <div
        className="w-14 h-6 rounded-full shadow-lg relative overflow-hidden"
        style={{
          marginTop: "-12px",
          background: "linear-gradient(90deg, #d0d0d0 0%, #f5f5f5 30%, #ffffff 50%, #e0e0e0 70%, #b0b0b0 100%)",
          boxShadow: "inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="absolute top-1 left-1/2 w-10 h-0.5 -translate-x-1/2 bg-black opacity-20" />
      </div>
    </div>
  );
}
