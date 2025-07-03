// src/App.tsx
import './App.css'; // Don't forget to import our styling!

function App() {
  // These will become state variables later, but are placeholders for now.
  const totalLength = ''; // Using empty string for placeholder behavior
  const capitalLetters = '';
  const smallLetters = '';
  const numbers = '';
  const symbols = '';
  const generatedPassword = 'P@ssw0rd!_Gener@t0r'; // Example password from image

  return (
    <div className="app-container">
      <h1 className="main-title">Craft Your Secure Password 🔑</h1>

      {/* Settings Section - Now with placeholders */}
      <section className="password-settings-grid">
        <div className="input-group">
          <label htmlFor="total-length">Total Length</label>
          <input
            type="text" // Using text to display placeholder clearly
            id="total-length"
            value={totalLength}
            placeholder="8-128"
            readOnly // Still readOnly for now
          />
        </div>
        <div className="input-group">
          <label htmlFor="capital-letters">Capital Letters</label>
          <input
            type="text"
            id="capital-letters"
            value={capitalLetters}
            placeholder="e.g., 2"
            readOnly
          />
        </div>
        <div className="input-group">
          <label htmlFor="small-letters">Small Letters</label>
          <input
            type="text"
            id="small-letters"
            value={smallLetters}
            placeholder="e.g., 4"
            readOnly
          />
        </div>
        <div className="input-group">
          <label htmlFor="numbers">Numbers</label>
          <input
            type="text"
            id="numbers"
            value={numbers}
            placeholder="e.g., 1"
            readOnly
          />
        </div>
        <div className="input-group">
          <label htmlFor="symbols">Symbols</label>
          <input
            type="text"
            id="symbols"
            value={symbols}
            placeholder="e.g., 1"
            readOnly
          />
        </div>
      </section>

      <button className="generate-button">Generate Password</button>

      {/* Generated Password Section - Styled like an input field with icon */}
      <section className="password-display">
        <h2 className="password-display-title">Your Password</h2>
        <div className="password-output-field">
          <input
            type="text"
            className="password-text-input"
            value={generatedPassword}
            readOnly
          />
          {/* This is the copy button with the SVG icon and title for hover */}
          <button className="copy-icon-button" aria-label="Copy password" title="Copy">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0v1.5a3.75 3.75 0 1 1-7.5 0V6.75ZM15.75 8.25v-1.5a3.75 3.75 0 1 0-7.5 0v1.5a.75.75 0 0 1-1.5 0V6.75a5.25 5.25 0 1 1 10.5 0v1.5a.75.75 0 0 1-1.5 0ZM12 11.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V12a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              <path d="M12 18a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-1.5 0v5.25c0 .414.336.75.75.75Z" />
            </svg>
          </button>
        </div>
      </section>

      <div className="error-message">
        {/* Error text will go here */}
      </div>
    </div>
  );
}

export default App;