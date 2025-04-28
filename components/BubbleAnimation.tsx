"use client";

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface BubbleProps {
  content: string;
  isMyth: boolean;
  index: number;
  size: number;
  position: { x: number, y: number };
  onComplete: () => void;
}

export const Bubble: React.FC<BubbleProps> = ({ content, isMyth, index, size, position, onComplete }) => {
  const controls = useAnimation();
  const delay = useMemo(() => index * 0.3 + Math.random() * 0.5, [index]);
  const isBursting = useRef(false);
  
  // No truncation - use the full text
  const displayText = content;
  
  // Calculate appropriate text size based on content length and bubble size
  const fontSize = useMemo(() => {
    // Adjust font size based on content length to ensure it fits
    const lengthFactor = Math.max(1, content.length / 15);
    return Math.max(Math.min(size / (8 * Math.sqrt(lengthFactor)), 18), 12);
  }, [content, size]);

  // Base animation without floating
  const bubbleVariants: Variants = {
    initial: { 
      y: 0, 
      opacity: 0,
      scale: 0.8,
      bottom: '-100px',
      left: `${position.x}%`,
    },
    animate: { 
      y: isMyth ? -500 : -700,
      opacity: [0, 1, 1, isMyth ? 1 : 0.7], // Changed to keep myth opacity 1 until burst
      scale: [0.8, 1, 1],
      transition: { 
        duration: isMyth ? 7 : 12,
        ease: 'easeOut',
        delay,
        opacity: {
          times: [0, 0.1, 0.8, 1],
          duration: isMyth ? 7 : 12
        },
        scale: {
          times: [0, 0.2, 1],
          duration: isMyth ? 7 : 12
        }
      }
    },
  };

  // Start main animation after component has mounted
  useEffect(() => {
    controls.start("animate");
    
    // Only add floating effect if not currently bursting
    const floatControls = async () => {
      while (!isBursting.current) {
        await controls.start({
          x: [0, 10, -10, 0],
          rotate: [0, 1, -1, 0],
          transition: {
            duration: 6,
            ease: "easeInOut"
          }
        });
      }
    };
    
    floatControls();
  }, [controls]);

  // Handle myth bursting with improved animation sequence
  useEffect(() => {
    if (isMyth) {
      const burstTimeout = setTimeout(async () => {
        isBursting.current = true;
        
        // Create a smoother burst sequence
        await controls.start({
          scale: 1.2,
          transition: { duration: 0.3, ease: "easeInOut" }
        });
        
        await controls.start({
          scale: 1.4,
          opacity: 0,
          filter: "blur(10px)",
          transition: { 
            duration: 0.5,
            ease: "easeOut",
            opacity: { duration: 0.5 },
            filter: { duration: 0.5 }
          }
        });
      }, (delay + 3.5) * 1000);
      
      return () => clearTimeout(burstTimeout);
    }
  }, [isMyth, controls, delay]);

  // Handle animation completion
  useEffect(() => {
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, (delay + (isMyth ? 7 : 12)) * 1000);
    
    return () => clearTimeout(completeTimeout);
  }, [onComplete, isMyth, delay]);

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center text-center overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}%`,
        bottom: '-100px',
        backgroundColor: isMyth 
          ? 'rgba(255, 107, 107, 0.9)'
          : 'rgba(10, 255, 255, 0.9)',
        boxShadow: isMyth
          ? '0 10px 25px -5px rgba(255, 107, 107, 0.4), 0 0 10px rgba(255, 107, 107, 0.1) inset'
          : '0 10px 25px -5px rgba(10, 255, 255, 0.4), 0 0 10px rgba(10, 255, 255, 0.1) inset',
        backdropFilter: 'blur(5px)'
      }}
      variants={bubbleVariants}
      initial="initial"
      animate={controls}
    >
      {/* Enhanced inner glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `radial-gradient(circle at center, ${isMyth ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.5)'} 0%, ${isMyth ? 'rgba(255,107,107,0)' : 'rgba(10,255,255,0)'} 70%)`,
          filter: 'blur(8px)'
        }}
      />
      
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Small icon indicator in corner */}
        <span className="absolute top-2 right-2 bg-white/20 rounded-full p-0.5 backdrop-blur-sm scale-75">
          {isMyth ? <X className="w-3 h-3" /> : <Check className="w-3 h-3" />}
        </span>
        
        {/* Text content */}
        <motion.div
          className="max-w-[90%] px-2 pt-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
        >
          <p 
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: '1.4',
              fontWeight: '500',
              textShadow: '0 0 3px rgba(0,0,0,0.2)'
            }}
          >
            {displayText}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface BubbleContainerProps {
  facts: string[];
  myths: string[];
}

export const BubbleAnimation: React.FC<BubbleContainerProps> = ({ facts, myths }) => {
  const [bubbles, setBubbles] = useState<Array<{
    id: string;
    content: string;
    isMyth: boolean;
    size: number;
    position: { x: number, y: number };
  }>>([]);
  
  const occupiedPositions = useRef<Array<{ x: number, size: number }>>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const maxBubbles = 6; // Reduced from 8 to improve performance
  
  // Function to find a non-overlapping position
  const findAvailablePosition = (bubbleSize: number) => {
    const bubbleWidth = bubbleSize / window.innerWidth * 100;
    let attempts = 0;
    let x;
    let overlapping = true;
    
    while (overlapping && attempts < 20) {
      attempts++;
      x = 5 + Math.random() * 85;
      
      overlapping = occupiedPositions.current.some(pos => {
        const distance = Math.abs(pos.x - x);
        const minDistance = (pos.size + bubbleSize) / 2 / window.innerWidth * 80;
        return distance < minDistance;
      });
    }
    
    occupiedPositions.current.push({ x, size: bubbleSize });
    
    if (occupiedPositions.current.length > maxBubbles) {
      occupiedPositions.current = occupiedPositions.current.slice(-maxBubbles);
    }
    
    return { x };
  };
  
  // Clean up positions when bubbles are removed
  const cleanupPositions = (x: number) => {
    occupiedPositions.current = occupiedPositions.current.filter(pos => 
      Math.abs(pos.x - x) > 2
    );
  };
  
  // Add a new bubble periodically with controlled timing
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const createBubble = () => {
      if (bubbles.length >= maxBubbles) {
        return;
      }
      
      const isMyth = Math.random() > 0.5;
      const sourceArray = isMyth ? myths : facts;
      const content = sourceArray[Math.floor(Math.random() * sourceArray.length)];
      
      // Calculate a good size for the bubble based on content length
      const baseSize = Math.min(Math.max(content.length * 2 + 80, 100), 200);
      
      // Find a position that doesn't overlap with existing bubbles
      const position = findAvailablePosition(baseSize);
      
      setBubbles(prev => [
        ...prev, 
        { 
          id: `${Date.now()}-${Math.random()}`, 
          content,
          isMyth,
          size: baseSize,
          position
        }
      ]);
    };
    
    // Create initial bubbles with a slight delay
    const initialTimer = setTimeout(() => {
      createBubble();
      
      // Then start regular interval with a longer delay between bubbles
      timerRef.current = setInterval(createBubble, 3500); // Increased interval for better performance
    }, 1000);
    
    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [facts, myths]);
  
  // Remove bubbles that have completed their animation
  const removeBubble = (id: string) => {
    setBubbles(prev => {
      const bubble = prev.find(b => b.id === id);
      if (bubble) {
        cleanupPositions(bubble.position.x);
      }
      return prev.filter(bubble => bubble.id !== id);
    });
  };
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      {bubbles.map((bubble, index) => (
        <Bubble
          key={bubble.id}
          content={bubble.content}
          isMyth={bubble.isMyth}
          index={index}
          size={bubble.size}
          position={bubble.position}
          onComplete={() => removeBubble(bubble.id)}
        />
      ))}
    </div>
  );
};

export default BubbleAnimation;