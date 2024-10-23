import { useState } from "react";

const useTag = () => {
  // Keep track of the tags array.

  const [tags, setTags] = useState<string[]>([]);

  // Function to handle adding the tag to the array

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  // Function to remove tag from array
  const handleRemoveTag = (tag: string) =>
    setTags(tags.filter((t) => t !== tag));

  // Return tags and functions from the hook

  return { tags, handleAddTag, handleRemoveTag };
};

export default useTag;
