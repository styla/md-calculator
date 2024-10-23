import React from "react";
import { useState, ChangeEvent } from "react";

interface iTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const TagField = ({ tags, addTag, removeTag }: iTag) => {
  // track the use input

  const [userInput, setUserInput] = useState<string>("");

  // Handle input onChange

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // handle Enter key press

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or new line creation

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12
      ) {
        addTag(userInput);
        setUserInput(""); // Clear the input after adding a tag
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
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
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