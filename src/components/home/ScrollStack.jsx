"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const ScrollStack = ({ children, totalItems }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Better calculation for 3 items
    // 0 - 0.33 = Item 1
    // 0.34 - 0.66 = Item 2
    // 0.67 - 1.0 = Item 3
    const index = Math.min(
      Math.floor(latest * totalItems),
      totalItems - 1
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
      // We increase height slightly to make the "stick" feel longer
      style={{ height: `${totalItems * 120}vh` }} 
    >
      {/* 
          IMPORTANT: Ensure top-0 is correct. 
          If you have a fixed navbar, change top-0 to top-[nav-height] 
      */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeIndex });
          }
          return child;
        })}
      </div>
    </div>
  );
};