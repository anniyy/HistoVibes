"use client";
import React, { ReactNode, useState } from "react";

interface SidebarButtonProps {
  children: ReactNode;
  onClick: any;
}

export default function SidebarButton({
  children,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      className="text-lg py-4 px-6 hover:bg-gray-700 rounded-lg w-full text-left"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
