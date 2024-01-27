"use client";
import React, { useState } from "react";

interface SidebarButtonProps {
  children: string;
}

export default function SidebarButton({ children }: SidebarButtonProps) {
  return (
    <button className="text-lg py-4 px-6 hover:bg-gray-700 rounded-lg w-full text-left">
      {children}
    </button>
  );
}
