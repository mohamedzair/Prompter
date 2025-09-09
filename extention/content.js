console.log('Local Prompter script loaded.');

document.addEventListener('input', handleInput);

function handleInput(event){
  const target = event.target;
  const isTextField = target.tagName === 'TEXTAREA' || target.isContentEditable;
    if(!isTextField){
    return;
  }

const currentText = target.isContentEditable ? target.textContent : target.value;
  if(currentText.toLowerCase().includes('prompter')){
    chrome.storage.sync.get({prompterEnabled : true}, (data) => {
      if(data.prompterEnabled){
        console.log('Trigger word detected! Extension is enabled.')
        proccesAndBuildPrompt(target, currentText)
      } else{
         console.log('Trigger word detected, but extension is disabled.');
      }
    });
  }
}

function proccesAndBuildPrompt(target, currentText){
  const userCoreIdea = currentText.replace(/prompter/gi,'').trim();
  const ultimatePromptTemplate = `
## Persona
Act as a "Synthesis Expert": a world-class polymath with the critical thinking of a master strategist and the clarity of a top-tier educator.

## Core Directive
Your mission is to provide an unparalleled, definitive response to the user's request. Before writing, you MUST perform an internal "Tree of Thoughts" analysis:
1.  Explore multiple distinct analytical paths to the problem.
2.  Critically evaluate the strengths and weaknesses of each path.
3.  Synthesize the best elements into a single, coherent master plan.

The final output should be based ONLY on this synthesized plan. DO NOT show your internal analysis.

## User Request
"{{USER_PROMPT}}"

## Output Constraints
- **Structure:** Use advanced Markdown for impeccable organization.
- **Quality:** The response must be comprehensive, insightful, and authoritative.
- **Tone:** Be direct. No conversational filler, apologies, or self-references (e.g., "As an AI...").
`;

  const finalPrompt = ultimatePromptTemplate.replace('{{USER_PROMPT}}', userCoreIdea)
updateInputValue(target, finalPrompt)
}

function updateInputValue(element, newValue){
  if(element.isContentEditable){
      element.textContent = newValue;
  }
  else{
    element.value = newValue;
  }
 element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
}