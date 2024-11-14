"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiCopy } from "react-icons/fi";
import RetroGrid from "@/components/ui/retro-grid";

export default function ViewPage() {
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    // Retrieve the file data from localStorage
    const data = localStorage.getItem("fileData");
    if (data) {
      setFileData(data);
    }
  }, []);

  function handleCopy() {
    if (fileData) {
      navigator.clipboard.writeText(fileData);
      alert("Text copied to clipboard!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-8 space-y-8 bg-white/80 text-gray-900">
      <h1 className="text-4xl font-bold text-center">Retrieved Text</h1>

      <div className="relative w-full max-w-4xl">
        <pre className="p-8 rounded-lg shadow-xl overflow-auto bg-white/95 text-gray-800">
          {fileData || "No text available."}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Copy text"
        >
          <FiCopy className="text-lg" />
        </button>
      </div>
      <RetroGrid />
    </div>
  );
}
