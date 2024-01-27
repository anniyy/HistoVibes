"use client";
import React, { useState } from "react";

interface timelineItem {
  input: (string | number)[];
}

export default function timelineItem({ input }: timelineItem) {
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(250); // Initial width
  const [videoExist, setVideoExist] = useState(false);

  const toggleWidth = () => {
    setExpanded(!expanded);
    setWidth(expanded ? 250 : 500); // Change width based on expanded state
    setVideoExist(videoExist ? false : true);
  };

  return (
    <div
      onClick={toggleWidth}
      className="flex flex-col h-full bg-white items-center justify-start p-4"
      style={{ width: `${width}px` }}
    >
      <div className="w-10 h-10 bg-green-500 rounded-full mb-2 mt-2" />
      <p className="text-2xl text-black py-1">{input[0]}</p>
      <p className="text-lg text-black">{input[1]}</p>
      {videoExist && input[3] !== null ? (
        <iframe
          className="w-[250px] relative translate-x-[-125px]"
          src={input[3]}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      ) : (
        <></>
      )}
      <p className="text-lg text-black">{input[2]}</p>
    </div>
  );
}
