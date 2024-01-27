"use client";

interface TimelineItemProps {
  title: string | number | null;
  year: string | number | null;
  description: string | number | null;
  expanded: boolean;
  isup: boolean;
}

function Expanding({
  title,
  year,
  description,
  expanded,
  isup,
}: TimelineItemProps) {
  return (
    <>
      {isup == true ? (
        <div>
          <div className="bg-[#EEEFF5] text-[#484A57] rounded-2xl flex flex-col py-2 text-center w-[360px] h-[39vh] translate-x-[-86px] translate-y-[-30vh]">
            <div>{title}</div>
            <div>{year}</div>
            <div>{description}</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-[#EEEFF5] text-[#484A57] rounded-2xl flex flex-col py-2 text-center w-[360px] translate-x-[-86px]">
            <div>{title}</div>
            <div>{year}</div>
            <div>{description}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default function TimelineItem({
  title,
  year,
  description,
  expanded,
  isup,
}: TimelineItemProps) {
  return (
    <>
      {expanded == true ? (
        <Expanding
          title={title}
          year={year}
          description={description}
          isup={isup}
          expanded={true}
        />
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
