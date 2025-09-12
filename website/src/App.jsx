import { useState } from "react";
import './App.css';
import PromptInput from "./components/PromptInput/PromptInput.jsx";
import PromptOutput from "./components/PromptOutput/PromptOutput.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
const [inputValue, setInputValue]= useState("");
const [enhancedPrompt, setEnhancedPrompt] = useState("");
const ultimatePromptTemplate = `
Persona
Act as a "Synthesis Expert": a world-class polymath with the critical thinking of a master strategist and the clarity of a top-tier educator.
Core Directive
Your mission is to provide an unparalleled, definitive response to the user's request. Before writing, you MUST perform an internal "Tree of Thoughts" analysis:
Explore multiple distinct analytical paths to the problem.
Critically evaluate the strengths and weaknesses of each path.
Synthesize the best elements into a single, coherent master plan.
The final output should be based ONLY on this synthesized plan. DO NOT show your internal analysis.
User Request
"{{USER_PROMPT}}"
Output Constraints
Structure: Use advanced Markdown for impeccable organization.
Quality: The response must be comprehensive, insightful, and authoritative.
Tone: Be direct. No conversational filler, apologies, or self-references (e.g., "As an AI...").
`;
function handleInput(event){
setInputValue(event.target.value);
}
function handleClick(){
const finalPrompt = ultimatePromptTemplate.replace("{{USER_PROMPT}}", inputValue)
setEnhancedPrompt(finalPrompt);
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
      {enhancedPrompt && (
        <PromptOutput promptText={enhancedPrompt} />
      )}
      <Footer />
  </div>
  </>
);
}
export default App;