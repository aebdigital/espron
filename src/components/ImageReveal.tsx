"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  grayscale?: boolean;
}

/**
 * Premium image reveal component.
 * Crops/masks images and uncurtains them with grayscale-to-color transition.
 */
export default function ImageReveal({
  children,
  delay = 0,
  className = "",
  grayscale = true,
}: Props) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Shutter Reveal Effect */}
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true }}
        transition={{ 
          duration: 1.2, 
          delay: delay / 1000, 
          ease: [0.76, 0, 0.24, 1] 
        }}
        className="absolute inset-0 bg-primary z-10"
      />
      
      {/* Image Content */}
      <motion.div
        initial={{ scale: 1.2, filter: grayscale ? "grayscale(100%)" : "grayscale(0%)" }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
        viewport={{ once: true }}
        transition={{ 
          duration: 1.8, 
          delay: delay / 1000, 
          ease: [0.76, 0, 0.24, 1] 
        }}
        className="w-full h-full origin-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
