"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Timeline from "@/components/timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = "http://18.225.6.18:5000";

export interface NewTimelinePageProps {
  name: string;
  userid: string | null | undefined;
  hasTimelines: boolean;
}

export default function NewTimelinePage({
  name,
  userid,
  hasTimelines,
}: NewTimelinePageProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newTimelineName, setNewTimelineName] = useState("");
  const [topics, setTopics] = useState<{}[]>([]);

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = async () => {
    try {
      if (newTimelineName.trim() !== "") {
        await addTopicToTimeline(newTimelineName);
      }
    } catch (error) {
      console.error("Error adding topic:", error);
    }

    setNewTimelineName("");
    setIsPopupVisible(false);
  };

  const addTopicToTimeline = async (topicName: string) => {
    try {
      const postResponse = await axios.patch(`${API_BASE_URL}/topic`, {
        username: userid,
        timeline: name,
        topic: topicName,
      });
      setTopics(postResponse.data);
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (name !== "") {
          const getResponse = await axios.get(
            `${API_BASE_URL}/timeline/${userid}/${name}`
          );
          setTopics(getResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  useEffect(() => {
    console.log("TOPICS ", topics);
  }, [topics]);

  return (
    <div className="flex items-center overflow-y-auto">
      <Timeline items={topics}></Timeline>
      <div className="flex items-end h-screen">
        {hasTimelines && (
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white rounded-full px-4 py-2 absolute text-xl left-72 bottom-6"
          >
            +
          </button>
        )}

        {isPopupVisible && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border rounded-lg shadow-md z-50">
            <div className="flex gap-4 items-center justify-center">
            <button
              onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              setIsPopupVisible(false);
              }}
              className="text-gray-700 hover:text-gray-900"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
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
}
