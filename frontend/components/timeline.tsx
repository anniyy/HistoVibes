"use client";
import React, { useState } from "react";
import TimelineItem from "./timelineItem";
import TimelineDot from "./timelineDot";

interface TimelineProps {
  items: {}[] | null;
}

export default function Timeline({ items }: TimelineProps) {
  console.log("yay " + items);
  if (!Array.isArray(items) || items.length === 0) {
    return <></>; // or return some default content
  }
  return (
    <div className="flex items-center mx-8 z-0 px-32 translate-x-[300px] overflow-x-auto overflow-y-hidden min-h-screen min-w-screen">
      <div className="flex">
        {items.map((item: any, index) => {
          console.log("Item:", item);
          console.log(item[1].date);
          console.log(item[1].description);
          return (
            <TimelineDot
              key={index}
              name={item[0]}
              description={item[1].description}
              date={item[1].date}
              isUp={index % 2 === 1}
            />
          );
        })}
      </div>
    </div>
  );
}
