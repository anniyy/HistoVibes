"use client";
import React, { useEffect, useRef, useState } from "react";
import TimelineItem from "./timelineItem";

interface TimelineDotProps {
  item: (string | number | null)[];
  isUp: boolean;
}

export default function TimelineDot({ item, isUp }: TimelineDotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null); //USED TO CALCULATE POSITION FOR TIMELINEITEM DO NOT DELETE
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleClick = () => {
    if (isClicked) setIsClicked(false);
    else setIsClicked(true);
  };
  const dotClassName = `w-6 h-6 rounded-full z-30 ${
    isHovered ? "bg-[#484A57]" : "bg-blue-500"
  }`;
  //THE VAR ABOVE CHANGES THE DOT COLOR ON HOVER
  const timelineItemStyleUp = {
    position: "absolute",
    left: "50%",
    marginLeft: `-${
      dotRef.current?.offsetWidth ? dotRef.current.offsetWidth / 2 : 0
    }px`,
    top: `-80px`,
    width: "100%",
    textAlign: "center",
  } as React.CSSProperties;
  const timelineItemStyleDown = {
    position: "absolute",
    left: "50%",
    marginLeft: `-${
      dotRef.current?.offsetWidth ? dotRef.current.offsetWidth / 2 : 0
    }px`,
    top: `60px`,
    width: "100%",
    textAlign: "center",
  } as React.CSSProperties;
  // THE VAR ABOVE DOES THE HARDCODE CSS FOR THE TIMELINEITEM ABOVE BY CALCULATING THE WIDTH/X VALUES OF THE DOT
  // DO NOT TOUCH THE VARIABLE ABOVE OR ELSE SHIT GETS FUCKED UNLESS U CAN FIX IT AND MAKE IT CLEANER WITHOUT DOING POSITION ABSOLUTE
  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="flex w-40 h-1 bg-blue-500 translate-x-[-2px]"></div>
        <div
          ref={dotRef}
          className={dotClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
        <div className="flex flex-grow h-1 bg-blue-500"></div>
        {isUp === true ? (
          <div className="flex w-1 h-12 bg-blue-500 translate-x-[-14px] translate-y-[-20px] z-[-10]"></div>
        ) : (
          <div className="flex w-1 h-12 bg-blue-500 translate-x-[-14px] translate-y-[20px] z-[-10]"></div>
        )}
      </div>
      {/* the div above groups the dot and lines as one thing. dont really touch this, its basically good enough */}

      {isUp === true ? (
        <div style={timelineItemStyleUp}>
          {isClicked ? (
            <TimelineItem
              title={item[0]}
              year={item[1]}
              description={item[2]}
              expanded={isClicked}
              isup={isUp}
            />
          ) : (
            <TimelineItem
              title={item[0]}
              year={item[1]}
              description={null}
              expanded={isClicked}
              isup={isUp}
            />
          )}
        </div>
      ) : (
        <div style={timelineItemStyleDown}>
          {isClicked ? (
            <TimelineItem
              title={item[0]}
              year={item[1]}
              description={item[2]}
              expanded={isClicked}
              isup={isUp}
            />
          ) : (
            <TimelineItem
              title={item[0]}
              year={item[1]}
              description={null}
              expanded={isClicked}
              isup={isUp}
            />
          )}
        </div>
      )}
      {/* the if statement to show timelineitem */}
    </div>
  );
}
