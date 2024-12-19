import styles from "./WordGrid.module.css";

type WordGridProps = {
  currentWord: string;
 };

export function WordGrid({currentWord}: WordGridProps)
//{ guessedLetters }: WordGridProps)
{
  const totalRows = 6;
  const totalColumns = 5;
  const totalSquares = totalRows * totalColumns;

  return (
    <div className={styles['word-grid']}>
      {Array.from({ length: totalSquares }).map((_, index) => {
        // const letter = guessedLetters[index] || ''; // Get the letter or an empty string if undefined

        return (
          <div className={styles['tile']} key={index}>
            <p className={styles['text']}>
              {currentWord[index] || ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}
