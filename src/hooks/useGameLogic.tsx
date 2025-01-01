import { useState, useEffect, useCallback } from "react";
import { handleKeyUp as gameLogicHandleKeyUp } from "../logic/gameLogicHandleKeyUp";
import { isWordValid as validateWord } from "../validation/wordValidation";
// import  KEYS from "../data/keys";
import { getLetterScore } from "../utils/scoreUtils";

export const useGameLogic = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [confirmedWords, setConfirmedWords] = useState<string[]>([])
  const [confirmedScore, setConfirmedScore] = useState(0)
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
      setConfirmedWords((prev) => [...prev, currentWord])
      setConfirmedScore((prev) => prev + currentScore)
      // Add additional logic here for valid words
    } else {
      console.log("Invalid setConfirmedScore. Try again!");
      alert("Not A valid Word Try Again")
    }
  }, [currentWord, currentScore]);

  const addLetter = useCallback((letter: string) => {
    const score = getLetterScore(letter);

    if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + letter);
      if (score){
        setCurrentScore((prev) => prev + score);
      }
      // console.log(`addLetter called in useGameLogic Hook currentWord now :${currentWord}`)
    }
  }, [currentWord]);

  const deleteLastLetter = useCallback(() => {
    setCurrentWord((prev) => {
      const lastLetter = prev.slice(-1); // Get the last letter
      const lastLetterScore = getLetterScore(lastLetter); // Get its score

      setCurrentScore((score) => score - lastLetterScore); // Subtract the score
      return prev.slice(0, -1); // Remove the last letter
    });
  }, []);

  const resetWord = useCallback(() => {
    setCurrentWord("");
    setCurrentScore(0)
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

  return {currentWord, confirmedWords, currentScore, confirmedScore, addLetter, deleteLastLetter, resetWord, handleKeyUp };
};
