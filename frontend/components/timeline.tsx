"use client";
import React, { useState } from "react";
import TimelineItem from "./timelineItem";
import TimelineDot from "./timelineDot";

interface TimelineProps {
  items: {}[];
}

export default function Timeline({ items }: TimelineProps) {
  console.log("yay " + items);
  if (items.length === 0) {
    return null; // or return some default content
  }
  return (
    <div className="flex items-center mx-8 z-0 px-32">
      <div className="flex">
        {items.map((item, index) => (
          // makes a new timelinedot (comes with lines on both sides) for every element in the list
          <div key={index} className="flex items-center">
            {Object.entries(item).map(([key, value]) => (
              // You can use key and value as needed for TimelineDot or other components
              <TimelineDot key={key} item={key} isUp={index % 2 === 1} />
            ))}
            {/* <TimelineDot item={item} isUp={index % 2 === 1} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
