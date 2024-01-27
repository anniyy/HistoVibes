"use client";
import React, { useRef, useState } from "react";
import TimelineItem from "./timelineItem";

interface TimelineDotProps {
  item: (string | number | null)[];
}

export default function TimelineDot({ item }: TimelineDotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
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
    left: "50%",
    marginLeft: `-${
      dotRef.current?.offsetWidth ? dotRef.current.offsetWidth / 2 : 0
    }px`,
    top: `-90px`,
    width: "100%",
    textAlign: "center",
  } as React.CSSProperties;
  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <div className="flex w-40 h-1 bg-blue-500"></div>
        <div
          ref={dotRef}
          className={dotClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
