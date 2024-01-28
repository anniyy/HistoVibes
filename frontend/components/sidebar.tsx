import React, { useEffect, useState } from "react";
import SidebarButton from "./sidebarbutton";
import { useUser } from "@auth0/nextjs-auth0/client";

interface SidebarProps {
  names: (string | number | null)[];
  setTimeline: any;
  userid: any;
  setTimeLineList: any;
  setHasTimelines: any;
}

const Sidebar = ({
  names,
  setTimeline,
  userid,
  setTimeLineList,
  setHasTimelines,
}: SidebarProps) => {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [newTimelineName, setNewTimelineName] = useState("");
  const [currentTimeLine, setCurrentTimeLine] = useState<
    string | number | null
  >("");
  const axios = require("axios");

  const handleAddButtonClick = () => {
    setPopupVisibility(true);
  };
  const handleButtonClick = (timelineName: string | number | null) => {
    setTimeline(timelineName);
    setCurrentTimeLine(timelineName);
  };
  const handleClosePopup = () => {
    if (newTimelineName.trim() !== "") {
      // Only add non-empty names to the array
      const fetchData = async () => {
        const postResponse = await axios.patch(
          `http://18.225.6.18:5000/timeline`,
          {
            username: userid,
            timeline: newTimelineName,
          }
        );
        console.log("Added stuff", postResponse.data);
      };
      fetchData();
      setTimeLineList((prevNames: any) => [...prevNames, newTimelineName]);
    }
    setNewTimelineName(""); // Reset the input field
    setPopupVisibility(false);
  };
  useEffect(() => {
    if (names.length !== 0) {
      setHasTimelines(true);
    }
  }, [names, setHasTimelines]);

  return (
    <div className="overflow-hidden bg-gray-800 text-white w-[260px] space-y-6 py-7 px-2 absolute top-0 left-0 h-full flex flex-col justify-between z-10">
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center space-x-2 px-4">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1 10a9 9 0 1118 0 9 9 0 01-18 0zm1 0a8 8 0 1116 0 8 8 0 01-16 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 7a3 3 0 100 6 3 3 0 000-6zm-7 3a7 7 0 1114 0 7 7 0 01-14 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-3xl font-semibold my-5">HistoVibes</span>
        </div>
        <button
          className="text-lg py-4 px-6 hover:bg-gray-700 rounded-lg w-full text-center"
          onClick={handleAddButtonClick}
        >
          Add new Timeline
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
        {names?.map((name, index) => (
          <div key={index} className="w-full">
            <SidebarButton
              onClick={() => handleButtonClick(name)}
              current={currentTimeLine}
            >
              {name}
            </SidebarButton>
          </div>
        ))}
      </div>
      <a href="/api/auth/logout" className="flex flex-col items-center">
        <button className="text-lg py-2 px-8 hover:bg-gray-700 mt-auto rounded-lg">
          Logout
        </button>
      </a>
    </div>
  );
};

export default Sidebar;
