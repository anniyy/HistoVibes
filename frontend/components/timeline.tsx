"use client";
import React, { useState } from "react";
import TimelineItem from "./timelineItem";

interface TimelineProps {
  items: (string | number | null)[][];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flex items-center mx-8">
      <div className="flex">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-4 justify-center">
            {/* <div className="flex">
              <div className="w-40 h-1 bg-transparent"></div>
              <TimelineItem title={item[0]} year={item[1]} />
            </div> */}
            <div className="flex items-center">
              <div className="flex w-40 h-1 bg-blue-500"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full "></div>
              <div className="flex flex-grow h-1 bg-blue-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
