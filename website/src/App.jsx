import { useState } from "react";
import './App.css';
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
  <div className="container">
    <h1>Prompter</h1>
    <textarea
      rows="10"
      placeholder="Enter your initial prompt here..."
      value={inputValue}
      onChange={handleInput}
    />
    <button onClick={handleClick}>
      Enhance Prompt
    </button>
    {enhancedPrompt && (
    <div>
      <h2>Your Enhanced Prompt:</h2>
      <textarea rows="15" 
      value={enhancedPrompt}
      readOnly/>
      </div>)}
  </div>
);
}
export default App;