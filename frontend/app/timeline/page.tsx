import Timeline from "@/components/timeline";
import TimelineItem from "@/components/timelineItem";
import { useEffect, useState } from "react";

interface timelineProps {
  name: string;
  userid: string | null | undefined;
}

const TimelineComponent = ({ name, userid }: timelineProps) => {
  const axios = require("axios");
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    if (name !== "") {
      const fetchData = async () => {
        const getResponse = await axios.get(
          `http://18.225.6.18:5000/timeline/${userid}/${name}`
        );
        console.log("GET response:", getResponse.data);
      };
      fetchData();
    }
  }, [name]);

  return (
    <div>
      <main className="flex overflow-y-hidden space-x-6 w-[calc(100wh-260px)] h-[100vh] translate-x-[260px] pr-[300px]">
        {/* Your timeline content */}
      </main>
    </div>
  );
};

export default TimelineComponent;
