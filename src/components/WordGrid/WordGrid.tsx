import styles from "./WordGrid.module.css";
import  KEYS from "../../data/keys";


type WordGridProps = {
  currentWord: string;
  confirmedWords: string[];
 };

export function WordGrid({
  currentWord, confirmedWords}: WordGridProps)
//{ guessedLetters }: WordGridProps)
{
  const totalRows = 6;
  const totalColumns = 5;
  // const totalSquares = totalRows * totalColumns;
  console.log(`currentWord:${currentWord}`)
  console.log(`confirmedWords:${confirmedWords}`)
  return (
    <div className={styles['word-grid']}>
      {Array.from({ length: totalRows}).map((_, index) => {

        let word = new Array<string>(totalColumns);
        if (confirmedWords.length === index){
          word = [...currentWord]
        }
        else if (confirmedWords.length > index){
          word = confirmedWords[index].split('')
        }
        return (
          Array.from({ length: totalColumns}).map((_, letterIndex) => {
            const letter = word[letterIndex]
            const letterScore = KEYS.find((
              (letter2find) => letter2find.key === letter
            ) )?.letterScore
            return (
              <div className={styles['tile']} key={letterIndex}>
                <p className={styles['text']}>
                  {/* {currentWord[index] || ""} */
                  letter
                  }
                  <sub className= {`
                  ${styles['subscript']}
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
