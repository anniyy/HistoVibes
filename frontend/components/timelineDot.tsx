"use client";
import React, { useRef, useState } from "react";
import TimelineItem from "./timelineItem";

interface TimelineDotProps {
  item: (string | number | null)[];
}

export default function TimelineDot({ item }: TimelineDotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null); //USED TO CALCULATE POSITION FOR TIMELINEITEM DO NOT DELETE
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const dotClassName = `w-6 h-6 rounded-full ${
    isHovered ? "bg-[#484A57]" : "bg-blue-500"
  }`;
  //THE VAR ABOVE CHANGES THE DOT COLOR ON HOVER
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
  // THE VAR ABOVE DOES THE HARDCODE CSS FOR THE TIMELINEITEM ABOVE BY CALCULATING THE WIDTH/X VALUES OF THE DOT
  // DO NOT TOUCH THE VARIABLE ABOVE OR ELSE SHIT GETS FUCKED UNLESS U CAN FIX IT AND MAKE IT CLEANER WITHOUT DOING POSITION ABSOLUTE
  return (
    <div className="relative">
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
      {/* the div above groups the dot and lines as one thing. dont really touch this, its basically good enough */}
      {isHovered && (
        <div style={timelineItemStyle}>
          <TimelineItem title={item[0]} year={item[1]} />
        </div>
      )}
      {/* the if statement to show timelineitem */}
    </div>
  );
}
