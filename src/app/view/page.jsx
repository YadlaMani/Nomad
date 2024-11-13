"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ViewPage() {
  const [fileData, setFileData] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Retrieve the file data from localStorage
    const data = localStorage.getItem("fileData");
    if (data) {
      setFileData(data);
    }
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-8 space-y-6",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      )}
    >
      {/* Theme Toggle Button */}
      <Button
        onClick={toggleTheme}
        className={cn(
          "w-full max-w-md mb-6",
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-gray-900",
          "hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        )}
      >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </Button>

      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center">Retrieved File Data</h1>

      {/* File Data */}
      <pre
        className={cn(
          "p-6 rounded-md shadow-md w-full max-w-3xl",
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-gray-100 text-gray-800"
        )}
      >
        {fileData || "No file data available."}
      </pre>
    </div>
  );
}
