import axios from "axios";

/**
 * Checks if the word is valid.
 * - Must have exactly 5 letters.
 * - Must exist in the dictionary.
 * param word The word to validate
 * returns A promise that resolves to `true` if valid, `false` otherwise.
 */
export const isWordValid = async (word: string): Promise<boolean> => {
  // Check if the word has exactly 5 letters
  if (word.length !== 5) {
    console.log("Word must be exactly 5 letters.");
    return false;
  }

  try {
    // Make a GET request to the dictionary API
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
    );
    console.log(response)
    // If the response is successful, the word exists
    console.log(`${word} is a valid word.`);

    return true;
  } catch (error) {
    // If the API returns 404, the word doesn't exist
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log(`${word} is not a valid word.`);
      return false;
    }

    // Handle unexpected errors
    console.error("Error while checking word validity:", error);
    return false;
  }
};
