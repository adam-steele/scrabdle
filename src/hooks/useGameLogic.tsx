import { useState, useEffect, useCallback } from "react";
import { handleKeyUp as gameLogicHandleKeyUp } from "../logic/gameLogicHandleKeyUp";
import { isWordValid as validateWord } from "../validation/wordValidation"
// import  KEYS from "../data/keys";
import { getLetterScore } from "../utils/scoreUtils";

export const useGameLogic = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [confirmedWords, setConfirmedWords] = useState<string[]>([])
  const [confirmedScore, setConfirmedScore] = useState(0)
  const [vertWordLetters, setVertWordLetters] = useState<string[][]>([])

    const calcVertAndDiagScores = useEffect(
    () => {


      if (confirmedWords.length === 6)
      {

          const verticalWords = Array.from({length: confirmedWords[0].length},(_,index) =>
            confirmedWords.map((word) => word[index]).join('')
          )

          const testingWords = Array.from({ length: confirmedWords[0].length }, (_, index) => {
            // Extract all vertical letters at the current index

            const allVertLetters = confirmedWords.map((word) => word[index]);

            setVertWordLetters ((prev)=> [...prev, allVertLetters])
            console.log(`these are the vertical words in letter arrays : ${vertWordLetters[0]}`)
            // Split into chunks of 6
          });
        // const diagonalWords = Array.from({length: confirmedWords[0].length},(_,index) =>
        //   confirmedWords.map((word) => word[index]).join('')
        // )
        console.log(`these are the testing words: ${testingWords}`)
        console.log(`these are the vertical words: ${verticalWords}`)
        // console.log(`these are the vertical words in letter arrays: ${vertWordLetters[0]}`)

        verticalWords.map(
          async (word) => {
            console.log(`each vertical word inside vertwords map ${word}`)
           const isValid = await validateWord(word)
           if (isValid) {
            console.log("Valid word! inside VerticalWords.map");
            // if its a word add it too confirmed words
            setConfirmedWords((prev) => [...prev, word])
            // get the letters from the valid words
            const letters = [...word]
            //go through letters get their score and add that to current score
            letters.map((letter)=> {
              const letterScore = getLetterScore(letter)
              setCurrentScore((prev)=>prev + letterScore)
            })
            //add current score to confirmedScore
            setConfirmedScore((prev) => prev + currentScore)
            // Add additional logic here for valid words
          } else {
            console.log("Invalid word. Try again! inside VerticalWords.map ");
            // alert("Not A valid Word Try Again inside VerticalWords.map ")
          }

          }
        )

      }
      else{
        return
      }
    },
    [confirmedWords, currentScore, currentWord],
  )


  const checkWordValidity = useCallback(async () => {
    const isValid = await validateWord(currentWord);
      if (isValid && currentWord.length === 5) {
        console.log("Valid word!");
        setConfirmedWords((prev) => [...prev, currentWord])
        setConfirmedScore((prev) => prev + currentScore)
        // Add additional logic here for valid words
      } else {
        console.log("Invalid word. Try again!");
        alert("Not A valid Word Try Again")
      }
  }, [currentWord, currentScore]);

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
    else if(confirmedWords.length === 6){
      calcVertAndDiagScores
    }
    else return
  }, [currentWord,confirmedWords, calcVertAndDiagScores]);

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
