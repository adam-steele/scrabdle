import React, { useEffect, useState } from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import styles from './Navbar.module.css';

type NavbarProps = {
  onNewGame: () => void;
};

const Navbar: React.FC<NavbarProps> = () => {
  const { currentScore, confirmedWords, confirmedScore } = useGameLogic();
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }
  }, []);

  useEffect(() => {
    const totalScore = confirmedScore + currentScore;
    if (confirmedWords.length >= 6 && totalScore > highScore) {
      localStorage.setItem("highScore", totalScore.toString());
      setHighScore(totalScore);
    }
  }, [confirmedScore, currentScore, confirmedWords, highScore]);

  const currentScoreMessage =
    confirmedWords.length >= 6
    ? `Extra Score: ${currentScore}`
    :`Current Score: ${currentScore}`;

  const confirmedScoreMessage =
    confirmedWords.length <= 6
      ? `Confirmed Score: ${confirmedScore}`
      : `Final Score: ${confirmedScore + currentScore}`;

  const highScoreMessage = `High Score: ${highScore}`;

  return (
    <div className={styles['navbar-container']}>
      <div className={styles['navbar-score']}>
        <span className={styles['navbar-score-value']}>{currentScoreMessage}</span>
      </div>
      <div className={styles['navbar-score']}>
        <span className={styles['navbar-score-value']}>{confirmedScoreMessage}</span>
      </div>
      <div className={styles['navbar-score']}>
        <span className={styles['navbar-score-value']}>{highScoreMessage}</span>
      </div>
      <a
      href='https://adam-steele.github.io/scrabdle/'
      className={styles['navbar-new-game']}
      >
        New Game
      </a>
    </div>
  );
};

export default Navbar;
