// This function runs when the popup window has finished loading.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to our HTML elements.
    const enableToggle = document.getElementById('enable-toggle');
    const toggleLabel = document.getElementById('toggle-label'); // Our new label element

    // 2. Create a helper function to update the text.
    // This keeps our code clean and easy to read.
    function updateLabelText(isEnabled) {
        if (isEnabled) {
            // If the extension is ON, the label should be a prompt to turn it OFF.
            toggleLabel.textContent = 'Disable Prompter';
        } else {
            // If the extension is OFF, the label should be a prompt to turn it ON.
            toggleLabel.textContent = 'Enable Prompter';
        }
    }

    // 3. When the popup opens, get the saved state from storage.
    chrome.storage.sync.get({ prompterEnabled: true }, (data) => {
        // Set the toggle's visual state (checked or unchecked).
        enableToggle.checked = data.prompterEnabled;
        
        // **NEW:** Call our function to set the correct label text immediately.
        updateLabelText(data.prompterEnabled);
    });

    // 4. When the user clicks the toggle, this event fires.
    enableToggle.addEventListener('change', () => {
        const isEnabled = enableToggle.checked;
        
        // Save the new setting to storage.
        chrome.storage.sync.set({ prompterEnabled: isEnabled });

        // **NEW:** Call our function to instantly update the label text.
        updateLabelText(isEnabled);
    });
});