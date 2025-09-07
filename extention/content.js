console.log('Content script loaded on:', window.location.href); // Debug top-level load

// Throttle function
function throttle(fn, wait) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      return fn(...args);
    }
  };
}

// Lazy-load model
let generator = null;
async function getGenerator() {
  if (!generator) {
    console.log('Loading model...'); // Debug
    if (typeof transformers === 'undefined') {
      console.error('Transformers library not found in content script');
      throw new Error('TransformersUnavailable');
    }
    const { pipeline } = transformers;
    try {
      generator = await pipeline('text-generation', 'Xenova/distilgpt2');
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Model load error:', error);
      throw error;
    }
  }
  return generator;
}

// Simple fallback enhancer when model is unavailable
function simpleEnhancePrompt(text) {
  let t = text.trim();
  // Ensure ends with punctuation
  if (!/[.!?]$/.test(t)) t += '.';
  // Prefer imperative phrasing
  t = t.replace(/^please\s+/i, '');
  // Add clarity cue
  return 'Be concise and specific: ' + t;
}

// Handle input
async function handleInput(event) {
  // Resolve the actual editable element (handles text nodes, nested spans, shadow DOM)
  const path = (typeof event.composedPath === 'function') ? event.composedPath() : [];
  let node = (path && path.length ? path[0] : event.target);
  if (node && node.nodeType !== Node.ELEMENT_NODE && node.parentElement) {
    node = node.parentElement;
  }
  let element = /** @type {Element|null} */ (node || null);
  if (element) {
    // If not directly editable, look for nearest editable ancestor
    if (!(element.isContentEditable || element.tagName === 'TEXTAREA')) {
      const nearest = element.closest('textarea, [contenteditable="true"]');
      if (nearest) element = nearest;
    }
  }
  if (!element || (!(element).isContentEditable && (element).tagName !== 'TEXTAREA')) return;
  const raw = ((element).isContentEditable ? (element).textContent : (element).value) || '';
  const value = raw.trim();
  // De-dup: avoid reprocessing same value for same element
  try {
    const prev = (element).__prompter_last_value__;
    if (prev === value) return;
  } catch (_) {}

  // Detect standalone "prompter" anywhere (case-insensitive, word boundary)
  const triggerWord = /\bprompter\b/i;
  if (!triggerWord.test(value)) return;
  console.log('Prompter detected:', value, 'on element:', element.tagName); // Debug

  chrome.storage.local.get('enabled', async (data) => {
    const isEnabled = data.enabled ?? true;
    console.log('Toggle state:', isEnabled); // Debug
    if (!isEnabled) {
      console.log('Toggle disabled');
      return;
    }

    console.log('Starting enhancement...');
    const originalPrompt = value.replace(triggerWord, '').replace(/\s{2,}/g, ' ').trim();

    try {
      const gen = await getGenerator();
      const instruction =
        'Improve clarity, specificity, and concision of this prompt while preserving intent. Avoid adding external facts.\n\nPrompt:\n';
      const input = instruction + originalPrompt + '\n\nEnhanced:';
      const enhanced = await gen(input, { max_new_tokens: 80, temperature: 0.7 });
      const generated = Array.isArray(enhanced) ? (enhanced[0]?.generated_text || '') : (enhanced?.generated_text || '');
      const split = generated.split(/Enhanced:\\s*/i);
      const candidate = split.length > 1 ? split[1].trim() : generated.trim();
      const newText = candidate || originalPrompt;

      if ((element).isContentEditable) {
        (element).innerText = newText;
      } else {
        (element).value = newText;
        // Notify frameworks listening for input events
        try { (element).dispatchEvent(new Event('input', { bubbles: true })); } catch (_) {}
        try { (element).dispatchEvent(new Event('change', { bubbles: true })); } catch (_) {}
      }
      try { (element).__prompter_last_value__ = newText; } catch (_) {}
      console.log('Enhanced:', newText);
    } catch (error) {
      console.error('Enhancement error, using fallback:', error && (error.stack || error.message) || error);
      const fallback = simpleEnhancePrompt(originalPrompt);
      if ((element).isContentEditable) {
        (element).innerText = fallback;
      } else {
        (element).value = fallback;
        try { (element).dispatchEvent(new Event('input', { bubbles: true })); } catch (_) {}
        try { (element).dispatchEvent(new Event('change', { bubbles: true })); } catch (_) {}
      }
      try { (element).__prompter_last_value__ = fallback; } catch (_) {}
    }
  });
}

// Throttled listener
const throttledHandleInput = throttle(handleInput, 300);
['input', 'keyup', 'change', 'paste', 'compositionend'].forEach((evt) => {
  document.addEventListener(evt, throttledHandleInput, true);
});

// Observer for dynamic elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.isContentEditable || node.tagName === 'TEXTAREA') {
          console.log('Dynamic editable added:', node.tagName); // Debug
          ['input', 'keyup', 'change', 'paste', 'compositionend'].forEach((evt) => {
            node.addEventListener(evt, throttledHandleInput, true);
          });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
console.log('Observer started'); // Debug

// Fallback polling for controlled or custom inputs
setInterval(() => {
  const el = document.activeElement;
  if (!el) return;
  try {
    const isEditable = (el.isContentEditable || el.tagName === 'TEXTAREA');
    if (!isEditable) return;
    const raw = (el.isContentEditable ? el.textContent : el.value) || '';
    const value = raw.trim();
    if (value && value !== el.__prompter_last_value__) {
      // Synthetic event to unify handling
      handleInput({ target: el, composedPath: () => [el] });
    }
  } catch (_) {}
}, 1000);