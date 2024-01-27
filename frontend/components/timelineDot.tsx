"use client";
import React, { useState } from "react";

interface TimelineDotProps {
  item: (string | number | null)[];
}

export default function TimelineDot({ item }: TimelineDotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="w-6 h-6 rounded-full ${isHovered ? 'bg-red-500' : 'bg-blue-500'}"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
