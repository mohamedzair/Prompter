import React from 'react';
import styles from './PromptInput.module.css';

function PromptInput({ inputValue, handleInput, handleClick }) {
  const textareaRef = React.useRef(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
    }
  };

  React.useEffect(() => {
    autoResize();
  }, [inputValue]);

  return (
    // 2. Apply classes using the 'styles' object.
    //    React turns 'inputGroup' from your CSS into 'styles.inputGroup'
    <div className={styles.inputGroup}>
      <textarea
        ref={textareaRef}
        className={styles.promptTextarea} // Give the textarea its own class
        rows="1"
        placeholder="Enter your initial prompt here..."
        value={inputValue}
        onChange={(e) => {
          handleInput(e);
          autoResize();
        }}
      />
      <button className={styles.actionButton} onClick={handleClick}>
        Enhance Prompt
      </button>
    </div>
  );
}

export default PromptInput;