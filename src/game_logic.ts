import { useState, useEffect } from "react";
import { handleKeyUp as gameLogicHandleKeyUp } from "./game_logic";

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





// // import { useState } from "react";

// const useGameLogic =  {

//   // const [turn, setTurn] = useState(0); // six turns calculate score
//   // const [currentGuess,setCurrentGuess] = useState('')
//   // const [guesses, setGuesses] = useState<string[]>([])
//   // const [history, setHistory] = useState<string[]>([])

//   // add a new guess to the guess state
//   // add one to the turn state
//   // const addNewGuess = () =>{



//   // }


//   // handle keyup event and track current guess
//   // if enter pressed then add new guess


// }

// const handleKeyUp = (
//   event: KeyboardEvent,
//   addLetter: (letter: string) => void,
//   deleteLastLetter: () => void,
//   resetWord: () => void
// ) => {

//    function handleEnter() {
//       console.log("handle enter triggered in handle key up")
//    }

//   //  function addLetter(key: string) {
//   //   console.log(`the ${key} key was pressed (this is in handle Alphabet Key)`)

//   //   }


//   console.log("handle Key up triggered")
//   // Define the actions inside the function
//   const actions: { [key: string]: () => void } = {
//     Enter: () => { resetWord(), handleEnter(), console.log('Enter key handled by game logic')},
//     BackSpace: () => {deleteLastLetter(),console.log('Escape key handled by game logic')},
//     Delete: () => {deleteLastLetter(),console.log('Escape key handled by game logic')},
//     Space: () => console.log('Space key handled by game logic'),
//   };

//   // Retrieve the action for the pressed/released key
//   const action = actions[event.key];

//   if (/[a-zA-Z]/i.test(event.key)) {
//     addLetter(event.key); // Dynamically handle alphabet keys
//   }


//   // Execute the action if it exists
//   if (action) {
//     action();
//   }
// };

// export {handleKeyUp, useGameLogic}
