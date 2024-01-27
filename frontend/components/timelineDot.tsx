"use client";
import React, { useState } from "react";
import TimelineItem from "./timelineItem";

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
  const dotClassName = `w-6 h-6 rounded-full ${
    isHovered ? "bg-[#484A57]" : "bg-blue-500"
  }`;
  const timelineItemStyle = {
    position: "absolute",
    left: "50%", // Same x position as the dot
    top: "-130px", // Adjust this value based on your requirements
    transform: "translateX(-50%)", // Center the item above the dot
    width: "100%", // Full width
    textAlign: "center", // Center the content horizontally
    // display: isHovered ? "block" : "none",
  };
  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <div className="flex w-40 h-1 bg-blue-500"></div>
        <div
          className={dotClassName}
          onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        />
        <div className="flex flex-grow h-1 bg-blue-500"></div>
      </div>
      {isHovered && (
        <div style={timelineItemStyle}>
          <TimelineItem title={item[0]} year={item[1]} />
        </div>
      )}
    </div>
  );
}
