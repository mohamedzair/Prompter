import { useState } from "react";
import './App.css';
import PromptInput from "./components/PromptInput/PromptInput.jsx";
import PromptOutput from "./components/PromptOutput/PromptOutput.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleInput(event) {
    setInputValue(event.target.value);
  }

  async function handleClick() {
    if (!inputValue) {
      setError("Please enter a prompt first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEnhancedPrompt("");

    try {
      const response = await fetch('http://localhost:3001/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong with the request.');
      }

      const data = await response.json();
      setEnhancedPrompt(data.enhancedPrompt);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mainTitle">Prompter</h1>
        <PromptInput
          inputValue={inputValue}
          handleInput={handleInput}
          handleClick={handleClick}
        />
        {isLoading && <p>Enhancing your prompt...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {enhancedPrompt && (
          <PromptOutput promptText={enhancedPrompt} />
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;