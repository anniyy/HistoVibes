"use client";
import React, { useState } from "react";
import TimelineItem from "./timelineItem";
import TimelineDot from "./timelineDot";

interface TimelineProps {
  items: (string | number | null)[][];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flex items-center mx-8 z-0 px-32">
      <div className="flex">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <TimelineDot item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
