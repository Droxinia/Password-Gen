// src/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App'; // Import your App component

// IMPORTANT: No clipboard mock or fake timers here to simplify for now

describe('Password Generator App Basic Functionality', () => {

  it('renders the main title', () => {
    render(<App />);
    // Check if the main title text is present in the document
    expect(screen.getByText(/Craft Your Secure Password/i)).toBeInTheDocument();
  });

  it('generates a password on button click and updates the display', () => {
    render(<App />);

    // Get the generate button by its accessible role and name
    const generateButton = screen.getByRole('button', { name: /Generate Password/i });

    // Simulate a click on the generate button
    fireEvent.click(generateButton);

    // Get the password input field by its accessible role
    const passwordInput = screen.getByRole('textbox') as HTMLInputElement; // Cast to HTMLInputElement to access .value

    // Assert that the initial placeholder text is no longer in the document
    // `queryByDisplayValue` is used because if the element isn't found, it returns null instead of throwing an error.
    expect(screen.queryByDisplayValue(/Click Generate!/i)).not.toBeInTheDocument();

    // Assert that the password input field is not empty
    expect(passwordInput.value).not.toBe('');

    // Assert that the generated password has some length (e.g., greater than 0)
    // The default length is 12, so a generated password should at least have that length.
    // We check for greater than 0 as a minimum.
    expect(passwordInput.value.length).toBeGreaterThan(0);
  });

  it('displays an error message when character types exceed total length', () => {
    render(<App />);

    // Get input fields by their associated labels
    const totalLengthInput = screen.getByLabelText(/Total Length/i);
    const capitalLettersInput = screen.getByLabelText(/Capital Letters/i);
    const smallLettersInput = screen.getByLabelText(/Small Letters/i);

    // Change input values to create an invalid scenario: sum of types > total length
    fireEvent.change(totalLengthInput, { target: { value: '5' } }); // Total length 5
    fireEvent.change(capitalLettersInput, { target: { value: '3' } }); // 3 capitals
    fireEvent.change(smallLettersInput, { target: { value: '3' } }); // 3 small (3+3 = 6, which is > 5)

    // Click the generate button
    const generateButton = screen.getByRole('button', { name: /Generate Password/i });
    fireEvent.click(generateButton);

    // Assert that the specific error message is displayed
    expect(screen.getByText(/Sum of character types exceeds total length!/i)).toBeInTheDocument();

    // Assert that the password input field is cleared when an occurs
    const passwordInput = screen.getByRole('textbox') as HTMLInputElement;
    expect(passwordInput.value).toBe('');
  });
});