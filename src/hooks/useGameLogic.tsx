import { useState, useEffect } from "react";
import { handleKeyUp as gameLogicHandleKeyUp } from "../logic/gameLogicHandleKeyUp";

export const useGameLogic = () => {
  const [currentWord, setCurrentWord] = useState("");

  const addLetterToWord = (letter: string) => {
    if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + letter);
      console.log(`currentWord after addLettertoWord was triggered is: ${currentWord}`)
    }
  };

  const deleteLastLetter = () => {
    setCurrentWord((prev) => prev.slice(0, -1));
    console.log(`currentWord after deleteLastLetter was triggered is: ${currentWord}`)
  };

  const resetWord = () => {
    setCurrentWord("");
    console.log(`currentWord after resetWord was triggered is: ${currentWord}`)
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    gameLogicHandleKeyUp(event, addLetterToWord, deleteLastLetter, resetWord);
    console.log(`currentWord after handleKeyUp was triggered is: ${currentWord}`)
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return {currentWord, addLetterToWord, deleteLastLetter, resetWord, handleKeyUp };
};
