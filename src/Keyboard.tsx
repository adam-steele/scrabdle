import  styles  from "./Keyboard.module.css";
import KEYS, { KeyInfo } from './keys';


// type KeyboardProps = {
//   onKeyClick: (key: string) => void;
//   onMouseClick: (key: string) => void;
// };

type KeyboardProps = {
  onKeyClick: (key: string) => void; // Callback for key click
};

export function Keyboard({ onKeyClick }: KeyboardProps) {
  const handleClick = (key: string) => {
    onKeyClick(key); // Trigger the callback with the key value
  };

  // const handleClick = ( key: string ) => {
  //   onKeyClick(key);
  // };

  return (
    <div className={styles['keyboard-container']}>
      {KEYS.map((key: KeyInfo) => (

        <button
          onClick={() => handleClick(key.key)}
          data-key={key.key === 'Delete' || key.key === 'Enter' ? undefined : key.key}
          data-delete={key.key === 'Delete' ? '' : undefined}
          data-enter={key.key === 'Enter' ? '' : undefined}
          key={key.key}
          id={key.key}
          // className={`${styles['keyboard-btn']}`}
          className=
          {`${styles['keyboard-btn']}
          ${styles[key.key]}
          ${key.key === '' ? styles['Blank'] : ''}
          ${key.key === 'Delete' ? styles['Delete'] : ''}
          ${key.key === 'Enter' ? styles['Enter'] : ''}`}

        >
          {key.key}
        </button>

      ))}
    </div>
  );


}
