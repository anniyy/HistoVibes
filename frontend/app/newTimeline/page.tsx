// newTimeline/page.tsx

import React, { useState } from "react";
import { useEffect } from "react";
import Timeline from "@/components/timeline";

interface timelineProps {
  name: string;
  userid: string | null | undefined;
  setName: any;
}

const NewTimelinePage = ({ name, userid, setName }: timelineProps) => {
  const axios = require("axios");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newTimelineName, setNewTimelineName] = useState("");
  const [topics, setTopics] = useState<{}[]>([]);

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    if (newTimelineName.trim() !== "") {
      // Only add non-empty names to the array
      const fetchData = async () => {
        const postResponse = await axios.patch(
          `http://18.225.6.18:5000/topic`,
          {
            username: userid,
            timeline: name,
            topic: newTimelineName,
          }
        );
        console.log("Added topic", postResponse.data);
        await setTopics(postResponse.data);
      };
      fetchData();
    }
    setNewTimelineName(""); // Reset the input field
    setIsPopupVisible(false);
  };
  useEffect(() => {
    if (name !== "") {
      const fetchData = async () => {
        const getResponse = await axios.get(
          `http://18.225.6.18:5000/timeline/${userid}/${name}`
        );
        console.log(`http://18.225.6.18:5000/timeline/${userid}/${name}`);
        console.log("GET response:", getResponse.data);
        await setTopics(getResponse.data);
      };
      fetchData();
    }
  }, [name]);
  // useEffect(() => {
  //   console.log(newTimelineName);
  // }, [newTimelineName]);

  return (
    <div className="flex items-center">
      <Timeline items={topics}></Timeline>
      <div className="flex items-end h-screen">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white rounded-full px-4 py-2 translate-y-[-20px] translate-x-[-30px] text-xl"
        >
          +
        </button>

        {isPopupVisible && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border rounded-lg shadow-md z-50">
            {/* Your popup content, e.g., input field and another button */}
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="Enter timeline name"
                className="p-2 border rounded text-black"
                value={newTimelineName}
                onChange={(e) => setNewTimelineName(e.target.value)}
              />
              <button
                onClick={handleClosePopup}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewTimelinePage;
