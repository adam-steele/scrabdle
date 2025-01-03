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

  const calcVertAndDiagScores = useCallback(
    () => {
      if (confirmedWords.length === 6)
      {
        console.log("calcVertAndDiagScores Triggered")
      }
      else{
        return
      }
    },
    [confirmedWords],
  )


  const checkWordValidity = useCallback(async () => {
    const isValid = await validateWord(currentWord);
      if (isValid) {
        console.log("Valid word!");
        calcVertAndDiagScores
        setConfirmedWords((prev) => [...prev, currentWord])
        setConfirmedScore((prev) => prev + currentScore)
        // Add additional logic here for valid words
      } else {
        console.log("Invalid word. Try again!");
        alert("Not A valid Word Try Again")
      }
  }, [currentWord, currentScore, calcVertAndDiagScores]);

  const addLetter = useCallback((letter: string) => {
    const score = getLetterScore(letter);
    if (confirmedWords.length < 6) {
      if (currentWord.length < 5) {
        setCurrentWord((prev) => prev + letter);
        if (score){
          setCurrentScore((prev) => prev + score);
        }
        // console.log(`addLetter called in useGameLogic Hook currentWord now :${currentWord}`)
      }
    }
    else return
  }, [currentWord,confirmedWords]);

  const deleteLastLetter = useCallback(() => {
    const letter2Delete = currentWord.slice(-1);
    // console.log(`letter to be removed in deletelastletter = ${letter2Delete}`)
    const score2Remove = getLetterScore(letter2Delete)
    // console.log(`score to be removed in deletelastletter = ${score2Remove}`)
    setCurrentScore(prev => prev - score2Remove )
    setCurrentWord((prev) => {
      return prev.slice(0, -1); // Remove the last letter
    });
  }, [currentWord]);

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
