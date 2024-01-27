import React, { useEffect } from "react";
import SidebarButton from "./sidebarbutton";
import { useUser } from "@auth0/nextjs-auth0/client";

const Sidebar = () => {
  const { user, error, isLoading } = useUser();
  const axios = require("axios");
  const apiUrl = "http://18.225.6.18:5000/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const requestBody = {
            username: user.sid,
          };
          const getUserResponse = await axios.get(
            `http://18.225.6.18:5000/user/${user.sid}`
          );

          console.log("API response:", getUserResponse.data);
          if (!getUserResponse.data || getUserResponse.data.length === 0) {
            const postResponse = await axios.post(
              `http://18.225.6.18:5000/user`,
              { username: user.sid }
            );
            console.log("POST response:", postResponse.data);
          }
        }
      } catch (error) {
        console.error("Error making API call:", error.message);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts or when the user changes
  }, []);
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
        <button className="text-lg py-4 px-6 hover:bg-gray-700 rounded-lg w-full text-center">
          Add new Timeline
        </button>
        <SidebarButton>Toys</SidebarButton>
        <SidebarButton>Shows</SidebarButton>
        <SidebarButton>Games</SidebarButton>
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
