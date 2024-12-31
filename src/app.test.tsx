import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/components/App';

test('allows deletion of letters until Enter is pressed', () => {
  render(<App />);

  const scoreElement = screen.getByText(/Score:/i);

  const keyboardButtons = screen.getAllByRole('button');
  const letterAButton = keyboardButtons.find(btn => btn.textContent === 'A');
  const deleteButton = keyboardButtons.find(btn => btn.textContent === 'Delete');
  const enterButton = keyboardButtons.find(btn => btn.textContent === 'Enter');

  if (!letterAButton || !deleteButton || !enterButton) {
    throw new Error('Required buttons not found');
  }

  // Add 5 letters
  for (let i = 0; i < 5; i++) {
    fireEvent.click(letterAButton);
  }

  expect(scoreElement.textContent).toBe('Score: 5');

  // Delete the last letter
  fireEvent.click(deleteButton);
  expect(scoreElement.textContent).toBe('Score: 4');

  // Press Enter to submit the word
  fireEvent.click(enterButton);

  // Add 5 more letters
  for (let i = 0; i < 5; i++) {
    fireEvent.click(letterAButton);
  }

  // Delete should still work
  fireEvent.click(deleteButton);
  expect(scoreElement.textContent).toBe('Score: 4');
});
