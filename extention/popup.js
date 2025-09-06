document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');

  // Load saved state
  chrome.storage.local.get('enabled', (data) => {
    toggle.checked = data.enabled ?? true; // Default to true
  });

  // Save state on change
  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });

  // Sync state across tabs
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && 'enabled' in changes) {
      toggle.checked = changes.enabled.newValue;
    }
  });
});