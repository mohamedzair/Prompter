document.addEventListener('DOMContentLoaded',() => {
    const enableToggle = document.getElementById('enable-toggle');
    chrome.storage.sync.get({prompterEnabled: true}, (data) => {
         enableToggle.checked = data.prompterEnabled;
    });
    enableToggle.addEventListener('change',() => {
        isEnabled = enableToggle.checked;
        chrome.storage.sync.set({prompterEnabled: isEnabled});
    });
})