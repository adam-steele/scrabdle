import { useState, useEffect, useCallback } from "react";
import { handleKeyUp as gameLogicHandleKeyUp } from "../logic/gameLogicHandleKeyUp";
import { isWordValid as validateWord } from "../validation/wordValidation";

export const useGameLogic = () => {
  const [currentWord, setCurrentWord] = useState("");

  // const addLetterToWord = (letter: string) => {
  //   if (currentWord.length < 5) {
  //     setCurrentWord((prev) => prev + letter);
  //     console.log(`currentWord after addLettertoWord was triggered is: ${currentWord}`)
  //   }
  // };

  // const deleteLastLetter = () => {
  //   setCurrentWord((prev) => prev.slice(0, -1));
  //   console.log(`currentWord after deleteLastLetter was triggered is: ${currentWord}`)
  // };

  // const resetWord = () => {
  //   setCurrentWord("");
  //   console.log(`currentWord after resetWord was triggered is: ${currentWord}`)
  // };

  // const handleKeyUp = (event: KeyboardEvent) => {
  //   gameLogicHandleKeyUp(event, addLetterToWord, deleteLastLetter, resetWord);
  //   console.log(`currentWord after handleKeyUp was triggered is: ${currentWord}`)
  // };

  const checkWordValidity = useCallback(async () => {
    const isValid = await validateWord(currentWord);
    if (isValid) {
      console.log("Valid word!");
      // Add additional logic here for valid words
    } else {
      console.log("Invalid word. Try again!");
      alert("Not A valid Word Try Again")
    }
  }, [currentWord]);

  const addLetter = useCallback((letter: string) => {
    if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + letter);
      console.log(`addLetter called in useGameLogic Hook currentWord now :${currentWord}`)
    }
  }, [currentWord]);

  const deleteLastLetter = useCallback(() => {
    setCurrentWord((prev) => prev.slice(0, -1));
  }, []);

  const resetWord = useCallback(() => {
    setCurrentWord("");
  }, []);


  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    gameLogicHandleKeyUp(event, addLetter, deleteLastLetter, resetWord, checkWordValidity);
  }, [addLetter, deleteLastLetter, resetWord, checkWordValidity]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return {currentWord, addLetter, deleteLastLetter, resetWord, handleKeyUp };
};
