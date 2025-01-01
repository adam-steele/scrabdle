import "react";
// { useCallback, useEffect, useState }
 import { Keyboard } from "./Keyboard/Keyboard"
import {WordGrid} from "./WordGrid/WordGrid";
import { useGameLogic } from "../hooks/useGameLogic";
// import {handleKeyUp} from "./game_logic.ts";
// import KEYS from './keys.ts';
// import axios from "axios";


function App() {

  const { currentWord, currentScore, confirmedScore, handleKeyUp, confirmedWords
    //  addLetterToWord
     } = useGameLogic();

  // const { handleKeyUp
  //   // currentWord, , addLetterToWord
  // } = useGameLogic();


  const handleKeyClick = (key: string) => {
    // Simulate a KeyboardEvent to reuse handleKeyUp logic
    const simulatedEvent = { key } as KeyboardEvent;
    handleKeyUp(simulatedEvent);
  };

    // const [turn, setTurn] = useState(0); // six turns calculate score
    // const [currentWord,setCurrentWord] = useState<string>([])
    // const [guesses, setGuesses] = useState<string[]>([])
    // const [history, setHistory] = useState<string[]>([])


  /*

  State can only be passed down to child component

  What data needs tracking:
  - previous 5 letter words input
    - an array of the 5-letter words strings ['pizza','fleet']
  - the current word
    - array of letters ['p','i','z','z','a',]
  - all of the currently guessed letters array of strings ['p','i','z','z','a','f','l','e','e','t']
  - score integer tracking a total of each letter's score. A letter score is determined by it's Scrabble score


  Game process:
  - when a letter is entered it fills a square with that letter
  - when a user hits delete it deletes a letter in the current word but not of any submitted words. removes it from the grid
  - if 5 letters can't input a letter until enter pressed.
  - if enter is pressed check if the word is long enough.
    - if the correct length is the current word actually a legitimate word.
    - if it is a word add it to the guessed words array.
    - change the current word to the next row
  - once the grid is full of correct words on the final enter calculate the score
    - check the grid for any words vertically using the guessed letters array.
    - add any legitimate words to score start by checking the longest words then getting one letter shorter for each row to see if any legit words

  */

  return (

      <div>
      {/* <p style={{color: 'white', margin: "10px 47%"}}>Score: {gameScore}</p> */}
        <p style={{color: 'white', margin: "10px 10%"}}>
          Current Word score: {currentScore} <br/>
          Confirmed Score: {confirmedScore}
          </p>
        <WordGrid
        currentWord = {currentWord}
        confirmedWords = {confirmedWords}
        />
        <Keyboard onKeyClick={handleKeyClick}
        />

      this is a MF test
      </div>
  );
}

export default App;
