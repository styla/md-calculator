import React from "react";
import { useState, ChangeEvent } from "react";
import { DevTag } from "../types/types";


export const TagField = ({ developers, addDeveloper, removeDeveloper }: DevTag) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12
      ) {
        addDeveloper(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <input
        name="keyword_tags"
        type="text"
        placeholder="Add a Developer"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
      />

      {/* ===== Render the tags here ===== */}

      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {developers.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeDeveloper(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};