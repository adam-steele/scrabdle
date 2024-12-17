import styles from "./WordGrid.module.css";

// type WordGridProps = {
//   guessedLetters: string[];
// };

export function WordGrid()
//{ guessedLetters }: WordGridProps)
{
  const totalRows = 5;
  const totalColumns = 6;
  const totalSquares = totalRows * totalColumns;

  return (
    <div className={styles['word-grid']}>
      {Array.from({ length: totalSquares }).map((_, index) => {
        // const letter = guessedLetters[index] || ''; // Get the letter or an empty string if undefined

        return (
          <div className={styles['tile']} key={index}>
            <p className={styles['text']}>
              {/* {letter} */}
            </p>
          </div>
        );
      })}
    </div>
  );
}
