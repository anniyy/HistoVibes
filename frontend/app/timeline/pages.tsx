import TimelineItem from "@/components/timelineItem";
import { useState } from "react";

const timeline = ({
  inputs = [
    [
      "This is title",
      1984,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      null,
    ],
    [
      "This is title",
      1984,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      null,
    ],
    [
      "This is title",
      1984,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      null,
    ],
    [
      "This is title",
      1984,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      null,
    ],
    [
      "This is title",
      1984,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      null,
    ],
    [
      "This is title",
      1984,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      null,
    ],
    [
      "This is another title",
      2018,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ],
  ],
}) => (
  <main className="flex flex-row overflow-hidden space-x-6 w-fit m-[3.9vh] ml-[300px] h-[90vh]">
    {inputs.map((input, index) => (
      <div key={index}>
        <TimelineItem input={input} />
      </div>
    ))}
  </main>
);
export default timeline;
