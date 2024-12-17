const handleKeyUp = (
  event: KeyboardEvent,
  addLetter: (letter: string) => void,
  deleteLastLetter: () => void,
  resetWord: () => void
) => {
  const key = event.key;

  // Actions map: Defines what to do for specific keys
  const actions: { [key: string]: () => void } = {
    Enter: () => {
      console.log("Enter pressed");
      resetWord();
    },
    Backspace: () => {
      console.log("Backspace pressed");
      deleteLastLetter();
    },
    Space: () => {
      console.log("Space pressed, ignoring...");
    },
  };

  // Check if the key matches an action, otherwise handle letters
  if (actions[key]) {
    actions[key](); // Call the appropriate action
  } else if (/^[a-zA-Z]$/.test(key)) {
    console.log("Letter pressed:", key);
    addLetter(key); // Handle letter keys
  } else {
    console.log("Unhandled key:", key);
  }
};

export { handleKeyUp };
