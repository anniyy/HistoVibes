"use client";

interface TimelineItemProps {
  title: string | number | null;
  year: string | number | null;
  description: string | number | null;
  expanded: boolean;
  isUp: boolean;
}

export default function TimelineItem({
  title,
  year,
  description,
  expanded,
  isUp,
}: TimelineItemProps) {
  return (
    <>
      {expanded == true ? (
        <div className="bg-[#EEEFF5] text-[#484A57] rounded-2xl flex flex-col py-2 text-center w-[360px] translate-x-[-86px]">
          <div>{title}</div>
          <div>{year}</div>
          <div>{description}</div>
        </div>
      ) : (
        <div className="bg-[#EEEFF5] text-[#484A57] rounded-2xl flex flex-col py-2 text-center">
          <div>{title}</div>
          <div>{year}</div>
          <div>{description}</div>
        </div>
      )}
    </>
  );
}
