import React from 'react';

const LiquidLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-4 border-amber-100 shadow-inner">
        
        {/* The Liquid Wave */}
        <div className="absolute bottom-0 left-0 w-[200%] h-[200%] bg-amber-500 animate-spin-slow origin-[50%_48%] rounded-[40%] translate-y-2 opacity-90"></div>
        
        {/* The Liquid Wave (Second Layer for depth) */}
        <div className="absolute bottom-0 left-0 w-[200%] h-[200%] bg-yellow-400 animate-spin-fast origin-[50%_52%] rounded-[40%] translate-y-2 opacity-80"></div>
        
        {/* Reflection/Shine on top */}
        <div className="absolute top-2 left-4 w-4 h-2 bg-white rounded-full opacity-30 rotate-45"></div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: translate(-25%, 75%) rotate(0deg); }
          100% { transform: translate(-25%, 75%) rotate(360deg); }
        }
        @keyframes spin-fast {
          0% { transform: translate(-25%, 70%) rotate(0deg); }
          100% { transform: translate(-25%, 70%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiquidLoader;