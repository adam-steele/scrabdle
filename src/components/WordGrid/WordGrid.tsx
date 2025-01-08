import styles from "./WordGrid.module.css";
import  KEYS from "../../data/keys";


type WordGridProps = {
  currentWord: string;
  confirmedWords: string[];
  confirmedVerticalWords: string[]
 };

export function WordGrid({
  currentWord, confirmedWords, confirmedVerticalWords}: WordGridProps)
//{ guessedLetters }: WordGridProps)
{
  const totalRows = 6;
  const totalColumns = 5;
  // const totalSquares = totalRows * totalColumns;
  console.log(`currentWord:${currentWord}`)
  console.log(`confirmedWords:${confirmedWords}`)

  const getVerticalWordIndices = () => {
    const verticalLetters = new Set<string>();

    confirmedVerticalWords.forEach((word, colIndex) => {
      const letters = word.split(""); // Split the vertical word into individual letters.
      console.log(`letters in get vertical word indices${letters}`)
      letters.forEach((_, wordIndex) => {
        // `wordIndex` is the position of the letter in the vertical word.

        const rowIndex = wordIndex; // The vertical word starts at row 0 and goes down.

        if (rowIndex < totalRows) {
          // Only add positions that exist within the grid.
          verticalLetters.add(`${rowIndex}-${colIndex}`);
        }
      });
    });

    return verticalLetters; // Return all matched positions as a Set.
  };

  const verticalWordIndices = getVerticalWordIndices();

  console.log(`the vertical word indices: ${[...verticalWordIndices]}`)

  return (
    <div
      className={styles['word-grid']
    }>
      {Array.from({ length: totalRows}).map((_, rowIndex) => {

        let word = new Array<string>(totalColumns);
        if (confirmedWords.length === rowIndex){
          word = [...currentWord]
        }
        else if (confirmedWords.length > rowIndex){
          word = confirmedWords[rowIndex].split('')
        }
        return (
          Array.from({ length: totalColumns}).map((_, colIndex) => {
            const letter = word[colIndex]
            const letterScore = KEYS.find((
              (letter2find) => letter2find.key === letter
            ) )?.letterScore
            return (
              <div
              className={
                `${styles['tile']}
                ${verticalWordIndices.has(`${rowIndex}-${colIndex}`) ? styles['vertical-word'] : ''}
                `
              }
              key={colIndex}
              >
                <p className={styles['text']}>
                  {/* {currentWord[index] || ""} */
                  letter
                  }
                  <sub className= {`
                  ${styles['subscript'] }
                  ${letterScore === 1 ? styles['one-point'] : ''}
                  ${letterScore === 2 ? styles['two-points'] : ''}
                  ${letterScore === 3 ? styles['three-points'] : ''}
                  ${letterScore === 4 ? styles['four-points'] : ''}
                  ${letterScore === 5 ? styles['five-points'] : ''}
                  ${letterScore === 8 ? styles['eight-points'] : ''}
                  ${letterScore === 10 ? styles['ten-points'] : ''}
                  `}
                    >
                    {letterScore}
                  </sub>
                </p>
              </div>
            );
          })
        );
      })}
    </div>
  );
}
