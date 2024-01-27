"use client";
import React, { useState } from "react";

interface TimelineLineProps {
  numItems: number;
}

export default function TimelineLine({ numItems }: TimelineLineProps) {
  return (
    <div className="flex items-center">
      <div className="flex">
        {Array.from({ length: numItems }, (_, index) => (
          <div key={index} className="flex items-center">
            <div className="w-40 h-1 bg-blue-500"></div>
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          </div>
        ))}
      </div>
      <div className="w-40 h-1 bg-blue-500"></div>
    </div>
  );
}
