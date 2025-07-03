// src/App.tsx
import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables to manage input values and generated password
  const [totalLength, setTotalLength] = useState(12);
  const [numCapitals, setNumCapitals] = useState(2);
  const [numSmall, setNumSmall] = useState(4);
  const [numNumbers, setNumNumbers] = useState(2);
  const [numSymbols, setNumSymbols] = useState(2);
  const [generatedPassword, setGeneratedPassword] = useState('Click Generate!');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCopyNotification, setShowCopyNotification] = useState(false); // New state for notification

  // Helper function to pick a random character from a string
  const getRandomChar = (charset: string) => {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset[randomIndex];
  };

  // Function to generate the password
  const generatePassword = () => {
    setErrorMessage(''); // Clear previous errors
    setShowCopyNotification(false); // Hide notification if visible

    // Define character sets
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    // Basic validation: Ensure sum of character types doesn't exceed total length
    const sumOfTypes = numCapitals + numSmall + numNumbers + numSymbols;
    if (sumOfTypes > totalLength) {
      setErrorMessage('Sum of character types exceeds total length!');
      setGeneratedPassword('');
      return;
    }
    if (totalLength <= 0 || sumOfTypes <= 0) {
      setErrorMessage('Length and character types must be positive numbers.');
      setGeneratedPassword('');
      return;
    }

    let passwordChars: string[] = [];

    // Add required characters first to ensure they are present
    for (let i = 0; i < numCapitals; i++) passwordChars.push(getRandomChar(upperCase));
    for (let i = 0; i < numSmall; i++) passwordChars.push(getRandomChar(lowerCase));
    for (let i = 0; i < numNumbers; i++) passwordChars.push(getRandomChar(digits));
    for (let i = 0; i < numSymbols; i++) passwordChars.push(getRandomChar(specialChars));

    // Fill the remaining length with a mix of all character types
    const allChars = upperCase + lowerCase + digits + specialChars;
    while (passwordChars.length < totalLength) {
      passwordChars.push(getRandomChar(allChars));
    }

    // Shuffle the array to ensure randomness and that required chars aren't always at the start
    for (let i = passwordChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    setGeneratedPassword(passwordChars.join(''));
  };

  // Function to copy the generated password to clipboard and show notification
  const copyToClipboard = () => {
    if (generatedPassword && generatedPassword !== 'Click Generate!') { // Only copy if a real password exists
      navigator.clipboard.writeText(generatedPassword)
        .then(() => {
          setShowCopyNotification(true); // Show notification
          setTimeout(() => {
            setShowCopyNotification(false); // Hide after 3 seconds
          }, 3000); // 3000 milliseconds = 3 seconds
        })
        .catch(err => {
          console.error('Failed to copy password: ', err);
          setErrorMessage('Failed to copy. Please copy manually.');
        });
    } else {
        setErrorMessage('No password to copy!'); // Set an error if no password
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Craft Your Secure Password 🔑</h1>

      {/* Settings Section - Input fields for password criteria */}
      <section className="password-settings-grid">
        <div className="input-group">
          <label htmlFor="total-length">Total Length</label>
          <input
            type="number"
            id="total-length"
            value={totalLength}
            onChange={(e) => setTotalLength(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="8-128"
            min="0"
          />
        </div>
        <div className="input-group">
          <label htmlFor="capital-letters">Capital Letters</label>
          <input
            type="number"
            id="capital-letters"
            value={numCapitals}
            onChange={(e) => setNumCapitals(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="e.g., 2"
            min="0"
          />
        </div>
        <div className="input-group">
          <label htmlFor="small-letters">Small Letters</label>
          <input
            type="number"
            id="small-letters"
            value={numSmall}
            onChange={(e) => setNumSmall(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="e.g., 4"
            min="0"
          />
        </div>
        <div className="input-group">
          <label htmlFor="numbers">Numbers</label>
          <input
            type="number"
            id="numbers"
            value={numNumbers}
            onChange={(e) => setNumNumbers(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="e.g., 1"
            min="0"
          />
        </div>
        <div className="input-group">
          <label htmlFor="symbols">Symbols</label>
          <input
            type="number"
            id="symbols"
            value={numSymbols}
            onChange={(e) => setNumSymbols(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="e.g., 1"
            min="0"
          />
        </div>
      </section>

      <button className="generate-button" onClick={generatePassword}>
        Generate Password
      </button>

      {/* Generated Password Section */}
      <section className="password-display">
        <h2 className="password-display-title">Your Password</h2>
        <div className="password-output-field">
          <input
            type="text"
            className="password-text-input"
            value={generatedPassword}
            readOnly
          />
          {/* Copy button with SVG icon and title for hover effect */}
          <button
            className="copy-icon-button"
            aria-label="Copy password"
            title="Copy"
            onClick={copyToClipboard}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0v1.5a3.75 3.75 0 1 1-7.5 0V6.75ZM15.75 8.25v-1.5a3.75 3.75 0 1 0-7.5 0v1.5a.75.75 0 0 1-1.5 0V6.75a5.25 5.25 0 1 1 10.5 0v1.5a.75.75 0 0 1-1.5 0ZM12 11.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V12a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              <path d="M12 18a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-1.5 0v5.25c0 .414.336.75.75.75Z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Error Message Display */}
      <div className="error-message">
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      {/* Copy Notification Bar - Conditionally rendered */}
      {showCopyNotification && (
        <div className="copy-notification">
          Password Copied!
          {/* Optional: Add a close button */}
          <button className="close-notification" onClick={() => setShowCopyNotification(false)}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;