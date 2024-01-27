import Timeline from "@/components/timeline";
import TimelineItem from "@/components/timelineItem";
// import TimelineLine from "@/components/timelineLine";
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
  <div>
    <main className="flex overflow-y-hidden space-x-6 w-[calc(100wh-260px)] h-[100vh] translate-x-[260px] pr-[300px]">
      {/* {inputs.map((input, index) => (
      <div key={index}>
        <TimelineItem title={input[0]} year={input[1]} />
      </div>
    ))} */}
      <Timeline items={inputs} />
    </main>
    <div id="overlay"></div>
  </div>
);
export default timeline;
