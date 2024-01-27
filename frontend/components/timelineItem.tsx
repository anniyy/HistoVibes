"use client";

interface TimelineItemProps {
  title: string | number | null;
  year: string | number | null;
}

export default function TimelineItem({ title, year }: TimelineItemProps) {
  return (
    <div className="bg-[#EEEFF5] text-[#484A57] rounded-2xl flex flex-col p-2 text-center">
      <div>{title}</div>
      {year}
    </div>
  );
}
