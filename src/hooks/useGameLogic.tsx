import { isWordValid as validateWord} from "../validation/wordValidation";
import { useState, useEffect, useCallback } from "react";
import { handleKeyUp as gameLogicHandleKeyUp } from "../logic/gameLogicHandleKeyUp";

// import  KEYS from "../data/keys";
import { getLetterScore } from "../utils/scoreUtils";

export const useGameLogic = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [confirmedWords, setConfirmedWords] = useState<string[]>([]);
  const [confirmedVerticalWords, setConfirmedVerticalWords] = useState<string[]>([]);
  const [confirmedScore, setConfirmedScore] = useState(0);

  // useEffect(() => {
  //   const processVerticalWords = async () => {
  //     if (confirmedWords.length === 6) {
  //       const verticalWords = Array.from({ length: confirmedWords[0].length }, (_, index) =>
  //         confirmedWords.map((word) => word[index]).join('')
  //       );

  //       for (const word of verticalWords) {
  //         let validWordFound = false;

  //         for (let length = 6; length >= 3; length--) {
  //           console.log(`Processing vertical word: ${word} with length: ${length}`);
  //           const substring = word.substring(0, length);
  //           const isValid = await validateWord(substring);
  //           console.log(`substring: ${substring}`);

  //           if (isValid) {
  //             console.log(`Valid word found: ${substring}`);
  //             setConfirmedWords((prev) => [...prev, substring]);
  //             setConfirmedVerticalWords((prev) => [...prev, substring]);
  //             [...substring].map(
  //               (letter)=> setCurrentScore(
  //                 (prev) => prev + getLetterScore(letter)*2
  //               )
  //             )
  //             validWordFound = true;
  //             break;
  //           }
  //         }

  //         if (!validWordFound) {
  //           console.log(`No valid substring found for vertical word: ${word}`);

  //         }

  //       }
  //     }
  //   };

  //   processVerticalWords();
  // }, [confirmedWords, currentScore, currentWord, confirmedVerticalWords]);

  useEffect(() => {
    const processVerticalWords = async () => {
      if (confirmedWords.length === 6) {
        const verticalWords = Array.from({ length: confirmedWords[0].length }, (_, index) =>
          confirmedWords.map((word) => word[index]).join('')
        );

        const newConfirmedVerticalWords = Array(verticalWords.length).fill("");

        for (let i = 0; i < verticalWords.length; i++) {
          const word = verticalWords[i];
          let validWordFound = false;

          for (let length = 6; length >= 3; length--) {
            console.log(`Processing vertical word: ${word} with length: ${length}`);
            const substring = word.substring(0, length);
            const isValid = await validateWord(substring);
            console.log(`substring: ${substring}`);

            if (isValid) {
              console.log(`Valid word found: ${substring}`);
              newConfirmedVerticalWords[i] = substring;
              setConfirmedWords((prev) => [...prev, substring]);
              [...substring].map(
                (letter) => setCurrentScore(
                  (prev) => prev + getLetterScore(letter) * 2
                )
              );
              validWordFound = true;
              break;
            }
          }

          if (!validWordFound) {
            console.log(`No valid substring found for vertical word: ${word}`);
          }
        }

        setConfirmedVerticalWords(newConfirmedVerticalWords);
      }
    };

    processVerticalWords();
  }, [confirmedWords, currentScore, currentWord, confirmedVerticalWords]);

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
    // else if(confirmedWords.length === 6){
    //   processVerticalWords()
    // }
    else return
  }, [currentWord,confirmedWords,
    // calcVertAndDiagScores
  ]);

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
    window.addEventListener("keyup", handleKeyUp);``
    return () => {`~`
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  const handleNewGame = useCallback(() => {
    setCurrentWord("");
    setCurrentScore(0);
    setConfirmedWords([]);
    setConfirmedScore(0);
    setConfirmedVerticalWords([]);
  }, []);``

  console.log(`confirmed verticalWords end of function: ${confirmedVerticalWords}`)
  return {currentWord, confirmedWords, currentScore, confirmedScore, addLetter, deleteLastLetter, resetWord, handleKeyUp, handleNewGame, confirmedVerticalWords };
};
