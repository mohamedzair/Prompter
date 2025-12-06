# Testing Guide for Prompter

This guide outlines how to manually test the Prompter application during development.

## Prerequisites
- Node.js installed (v18+ recommended)
- Google API Key in `backend/.env`

## 1. Starting the Development Environment
You need to run both the backend and frontend servers.

**Terminal 1 (Backend):**
```bash
cd backend
node server.js
```
*Expected Output:* `🚀 Server running on http://localhost:3001`

**Terminal 2 (Frontend):**
```bash
npm run dev
```
*Expected Output:* `Local: http://localhost:5173/`

## 2. Visual Verification
Open [http://localhost:5173](http://localhost:5173) in your browser.

**Checklist:**
- [ ] **Title**: Should read "**Prompter**" in the navbar and "Refine your thoughts" in the hero section.
- [ ] **Design**: Background should be a light blue gradient. Fonts should be bold and modern (Inter/System).
- [ ] **Layout**: Input box should be centered with a shadow effect.

## 3. Functional Testing

### Test Case A: Basic Enhancement
1.  Type a simple prompt: *"dog playing fetch"*
2.  Click **Enhance Prompt**.
3.  **Verify**:
    - Button shows "Enhancing..." with a spinner.
    - Result appears below after a few seconds.
    - Result is a more detailed, professional version of the input.

### Test Case B: Copy Functionality
1.  After generating a prompt, locate the **Copy icon** (clipboard) in the result box.
2.  Click it.
3.  **Verify**:
    - Icon changes to a **Checkmark**.
    - Paste the content into a notepad to confirm the text was copied correctly.

### Test Case C: Error Handling
1.  Clear the input box.
2.  Click **Enhance Prompt**.
3.  **Verify**: Button is disabled or an error message "Please enter a prompt first" appears (if validation logic permits).

### Test Case D: API Fallback (Backend)
*Note: This is hard to test without simulating a failure, but you can verify the logs.*
1.  Check the backend terminal logs after a request.
2.  It should show `Processing prompt enhancement...` and `✓ Prompt enhanced successfully`.
