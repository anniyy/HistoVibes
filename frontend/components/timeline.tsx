"use client";
import React, { useState } from "react";
import TimelineItem from "./timelineItem";
import TimelineDot from "./timelineDot";

interface TimelineProps {
  items: (string | number | null)[][];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flex items-center mx-8">
      <div className="flex">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-4 justify-center">
            <div className="flex items-center">
              {/* <div className="flex w-40 h-1 bg-blue-500"></div> */}
              <TimelineDot item={item} />
              {/* <div className="flex flex-grow h-1 bg-blue-500"></div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
