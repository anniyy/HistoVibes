import Timeline from "@/components/timeline";
import TimelineItem from "@/components/timelineItem";
// import TimelineLine from "@/components/timelineLine";
import { useState } from "react";

interface SidebarButtonProps {
  name: string;
}

const timeline = ({ name }) => (
  <div>
    <main className="flex overflow-y-hidden space-x-6 w-[calc(100wh-260px)] h-[100vh] translate-x-[260px] pr-[300px]">
      {/* <Timeline items={inputs} /> */}
    </main>
    <div id="overlay"></div>
  </div>
);
export default timeline;
