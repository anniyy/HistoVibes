// newTimeline/page.tsx

import React, { useState } from "react";

const NewTimelinePage: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newTimelineName, setNewTimelineName] = useState("");

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="flex items-end h-screen">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white rounded-full px-4 py-2 translate-y-[-20px] translate-x-[290px] text-xl"
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
  );
};

export default NewTimelinePage;
