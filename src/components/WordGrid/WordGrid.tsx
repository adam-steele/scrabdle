import styles from "./WordGrid.module.css";

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
            return (
              <div className={styles['tile']} key={letterIndex}>
                <p className={styles['text']}>
                  {/* {currentWord[index] || ""} */
                  letter
                  }
                </p>
              </div>
            );
          })
        );
      })}
    </div>
  );
}
