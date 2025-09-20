import React, { useState } from 'react';
import CopyIcon from '../Copy/CopyIcon';
import CheckIcon from '../Copy/CheckIcon';
// 1. Import the new CSS module
import styles from './PromptOutput.module.css'; 

function PromptOutput({ promptText }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(promptText).then(() => {
        setIsCopied(true);
        setTimeout(() => {
        setIsCopied(false);
        }, 2000);
    });
};
  return (
    // 2. Apply classes from the styles object
    <div className={styles.outputContainer}>
      <h2 className={styles.outputTitle}>Your Enhanced Prompt:</h2>
      <button 
        onClick={handleCopyClick}
        className={styles.copyButton}
        title="Copy to Clipboard" 
      >
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <textarea 
        className={styles.outputTextarea}
        rows="20" 
        value={promptText}
        readOnly
      />
    </div>
  );
}

export default PromptOutput;