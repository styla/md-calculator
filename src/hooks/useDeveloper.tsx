import { useEffect, useState } from "react";

const useDeveloper = () => {
  
  const [developers, setDevelopers] = useState<string[]>(() => {
    // Retrieve developers from localStorage if available, otherwise start with an empty array
    const storedDevelopers = localStorage.getItem('developers');
    return storedDevelopers ? JSON.parse(storedDevelopers) : ['Developer 1', 'Developer 2', 'Developer 3'];
  });

  useEffect(() => {
    // Store the developers array in localStorage whenever it changes
    localStorage.setItem('developers', JSON.stringify(developers));
  }, [developers]);

  const handleAddDeveloper = (newDeveloper: string) => {
    if (newDeveloper && !developers.includes(newDeveloper)) {
      setDevelopers([...developers, newDeveloper]);
    }
  };

  const handleRemoveDeveloper = (tag: string) =>
    setDevelopers(developers.filter((t) => t !== tag));

  return { developers, handleAddDeveloper, handleRemoveDeveloper };
};

export default useDeveloper;
