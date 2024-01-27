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

      {/* Button to open the pop-up */}
      <button
        className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded"
        style={{ right: "260px" }}
        onClick={openPopup}
      >
        Open Pop-up
      </button>

      {/* Pop-up component */}
      {isPopupOpen && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded"
          style={{ zIndex: 9999 }}
        >
          <h2>Pop-up Title</h2>
          {/* Add your field and button here */}
          <input type="text" placeholder="Type something..." />
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TimelineComponent;
