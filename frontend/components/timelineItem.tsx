"use client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleTakeQuizClick = () => {
    router.push("/quiz/");
  };

  return (
    <>
      {isup == true ? (
        <div>
          <div className="bg-[#EEEFF5] text-[#484A57] rounded-2xl flex flex-col py-2 text-center w-[360px] h-[39vh] translate-x-[-86px] translate-y-[-30vh]">
            <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{title}</div>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>{year}</div>
            <div  style={{ overflowY: 'auto',  overflowX: 'hidden', maxHeight: '300px', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div className={`description ${isup ? "expanded text-justify" : "" }`} style={{margin: '10px'}}>{description}</div>
              <button
                onClick={handleTakeQuizClick}
                className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded w-[120px] my-4"
              >
              Take Quiz
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-[#EEEFF5] text-[#484A57] rounded-2xl flex flex-col py-2 text-center w-[360px] translate-x-[-86px]">
            <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{title}</div>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>{year}</div>
            <div  style={{ overflowY: 'auto',  overflowX: 'hidden', maxHeight: '300px', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div className={`description ${isup ? "expanded text-justify" : "" }`} style={{margin: '10px'}}>{description}</div>
              <button
                onClick={handleTakeQuizClick}
                className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded w-[120px] my-4" 
              >
              Take Quiz
              </button>
            </div>
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
        <div>
          <div className="bg-[var(--background-end-rgb)] text-[var(--text)] rounded-2xl flex flex-col py-2 text-center">
            <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{title}</div>
            <div>{year}</div>
            <div  style={{ overflowY: 'auto',  overflowX: 'hidden', maxHeight: '300px', maxWidth: '500px'}}>
              <div className={`description ${isup ? "expanded text-justify" : "" }`} style={{margin: '10px'}}>{description}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
