"use client";
import React, { ReactNode, useState } from "react";

interface SidebarButtonProps {
  children: ReactNode;
  onClick: any;
  current: string | number | null;
}

export default function SidebarButton({
  children,
  onClick,
  current,
}: SidebarButtonProps) {
  const isActive = current === children;
  return (
    <button
      className={`text-lg py-4 px-6 rounded-lg w-full text-left ${
        isActive ? "hover:bg-gray-900 bg-gray-900" : "hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
