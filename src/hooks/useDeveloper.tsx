import { useState } from "react";

const useDeveloper = () => {
  
  const [developers, setDevelopers] = useState<string[]>([ 'Antonio', 'Franz', 'Josua', 'Redon', 'Sebastian' ]); // TODO: this is hardcoded only for dev purposes

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
