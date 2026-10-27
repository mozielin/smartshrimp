import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';

interface TechRingProps {
  activeColor?: string;
  targetPercentage?: number;
}

export function TechRing({ activeColor = "#22c55e", targetPercentage = 100 }: TechRingProps) {
  const [progress, setProgress] = useState(0);
  const prevTargetRef = React.useRef(0);

  useEffect(() => {
    const startValue = prevTargetRef.current;
    const endValue = targetPercentage;
    const duration = 1200;
    const startTime = performance.now();

    let animationFrameId: number;

    function animate(now: number) {
      const elapsed = now - startTime;
      const rate = Math.min(elapsed / duration, 1);
      
      // Smooth cubic ease out
      const easeRate = 1 - Math.pow(1 - rate, 3);
      
      const current = Math.floor(startValue + easeRate * (endValue - startValue));
      setProgress(current);

      if (rate < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        prevTargetRef.current = endValue;
      }
    }

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPercentage]);

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      
      {/* Extreme Outer Ring - Dashed, Slow Clockwise */}
      <motion.div 
        className="absolute w-[103%] h-[103%] rounded-full border transition-colors duration-500"
        style={{ borderDasharray: "4 12", borderColor: `${activeColor}25` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* SVG Outer Dashed Track */}
      <motion.svg 
        className="absolute inset-0 w-full h-full transition-colors duration-500" 
        style={{ color: `${activeColor}40` }}
        viewBox="0 0 100 100"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <circle 
          cx="50" cy="50" r="48" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
          strokeDasharray="1 3"
        />
      </motion.svg>

      {/* Main Thick Arc Background Track */}
      <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 100 100">
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke={`${activeColor}20`}
          strokeWidth="6"
        />
      </svg>

      {/* Animated Foreground Arc */}
      <motion.svg 
        className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" 
        style={{ filter: `drop-shadow(0 0 8px ${activeColor})` }}
        viewBox="0 0 100 100"
        initial={{ rotate: -90 }}
      >
        <motion.circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke={activeColor}
          strokeWidth="6"
          strokeDasharray="283"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
          transition={{ 
            type: "tween",
            ease: "easeOut",
            duration: 0.1
          }}
        />
      </motion.svg>

      {/* Inner Rotating Dots */}
      <motion.div 
        className="absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] rounded-full border-2 transition-colors duration-500"
        style={{ borderStyle: 'dotted', borderColor: `${activeColor}50` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner Most Solid Fine Ring */}
      <div 
        className="absolute inset-14 w-[calc(100%-7rem)] h-[calc(100%-7rem)] rounded-full border bg-slate-950/80 backdrop-blur-md transition-colors duration-500"
        style={{ 
          borderColor: `${activeColor}30`
        }}
      ></div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tighter flex items-baseline justify-center transition-colors duration-300"
          style={{ color: activeColor }}
        >
          {progress}
          <span
            className="text-2xl sm:text-3xl lg:text-4xl ml-1 font-bold transition-colors duration-300"
            style={{ color: activeColor }}
          >
            %
          </span>
        </motion.div>
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }} 
           className="text-[10px] sm:text-xs tracking-[0.25em] mt-1.5 font-mono uppercase font-bold transition-colors duration-300"
           style={{ color: activeColor }}
        >
          系統狀態
        </motion.div>
      </div>
      
    </div>
  );
}
