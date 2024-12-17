import { useState, useEffect } from "react";
import { handleKeyUp as gameLogicHandleKeyUp } from "../";

export const useGameLogic = () => {
  const [currentWord, setCurrentWord] = useState("");

  const addLetterToWord = (letter: string) => {
    if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + letter);
    }
  };

  const deleteLastLetter = () => {
    setCurrentWord((prev) => prev.slice(0, -1));
  };

  const resetWord = () => {
    setCurrentWord("");
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    gameLogicHandleKeyUp(event, addLetterToWord, deleteLastLetter, resetWord);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { currentWord, addLetterToWord, deleteLastLetter, resetWord, handleKeyUp };
};
