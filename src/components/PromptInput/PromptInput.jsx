import React from 'react';
import styles from './PromptInput.module.css'; 

function PromptInput({ inputValue, handleInput, handleClick }) {
  return (
    // 2. Apply classes using the 'styles' object.
    //    React turns 'inputGroup' from your CSS into 'styles.inputGroup'
    <div className={styles.inputGroup}>
      <textarea
        className={styles.promptTextarea} // Give the textarea its own class
        rows="10"
        placeholder="Enter your initial prompt here..."
        value={inputValue}
        onChange={handleInput}
      />
      <button className={styles.actionButton} onClick={handleClick}>
        Enhance Prompt
      </button>
    </div>
  );
}

export default PromptInput;