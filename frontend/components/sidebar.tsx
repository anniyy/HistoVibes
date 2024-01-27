import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute top-0 left-0 h-full flex flex-col justify-between">
      <div>
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
        <nav>
          <a href="#" className="block text-lg py-4 px-6 hover:bg-gray-700">
            Toys
          </a>
          <a href="#" className="block text-lg py-4 px-6 hover:bg-gray-700">
            Shows
          </a>
          <a href="#" className="block text-lg py-4 px-6 hover:bg-gray-700">
            Games
          </a>
        </nav>
      </div>
      <div className="flex flex-col items-center">
        <a
          href="#"
          className="block text-lg py-2 px-8 hover:bg-gray-700 mt-auto"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
