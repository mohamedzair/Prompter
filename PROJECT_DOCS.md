# Prompter - Project Documentation

Welcome to **Prompter**! This documentation is designed to help you understand the project structure, technology stack, and how everything fits together.

## 1. Project Overview
Prompter is a web application that takes a simple user idea and uses AI (Google Gemini) to rewrite it into a professional, high-quality prompt.

### Architecture
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js (Express)
- **AI**: Google Gemini API (via `@google/generative-ai`)

## 2. Tech Stack

### Frontend (`/src`)
- **React**: UI Library.
- **Vite**: Build tool and dev server. Fast and modern.
- **Tailwind CSS**: Utility-first CSS framework for styling. Configured in `tailwind.config.js`.
- **Lucide React**: Icon library (Sparkles, Copy, Check).

### Backend (`/backend`)
- **Express**: Web server framework for Node.js.
- **Dotenv**: Loads environment variables (API Keys) from `.env`.
- **Google Generative AI**: SDK to interact with Gemini models.

## 3. Project Structure

```
prompter/
├── backend/
│   ├── .env              # API Keys (Not committed to Git)
│   └── server.js         # API Server entry point
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Navbar/       # Navigation bar
│   ├── App.jsx           # Main application logic & UI
│   ├── index.css         # Global styles & Tailwind directives
│   └── main.jsx          # React entry point
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration (Proxy setup)
└── package.json          # Dependencies and scripts
```

## 4. Key Features & Implementation

### API Proxy
In `vite.config.js`, we set up a proxy so requests to `/api` are automatically forwarded to `http://localhost:3001`. This avoids CORS issues during development.

### Tailwind Styling
We use utility classes like `bg-blue-600`, `p-6`, `rounded-xl` directly in JSX.
- **Theme**: Custom colors defined in `tailwind.config.js` (primary blue, background gradients).
- **Fonts**: Using system fonts with `font-sans`.

### AI Integration (`server.js`)
1.  **Model Selection**: We try to use `gemini-2.5-flash` first.
2.  **Fallback Logic**: If the 2.5 model fails (404), we catch the error and automatically retry with `gemini-1.5-flash`.
3.  **System Instruction**: A hidden prompt sent to the AI to tell it how to behave (act as a Prompt Engineer).

## 5. Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Environment**:
    - Create `backend/.env`
    - Add: `GOOGLE_API_KEY=your_api_key_here`

3.  **Run Development Servers**:
    - **Backend**: `cd backend && node server.js`
    - **Frontend**: `npm run dev`

## 6. Common Tasks

- **Changing Colors**: Edit `tailwind.config.js` under `theme.extend.colors`.
- **Modifying AI Behavior**: Edit `SYSTEM_INSTRUCTION` in `backend/server.js`.
- **Adding Icons**: Import from `lucide-react` in the component.

Happy Coding! 🚀


# Prompter - Junior Developer Guide 🚀

Welcome to the **Prompter** codebase! This documentation is written specifically for you—to help you understand not just *what* the code does, but *how* it's structured and *how* to debug it when things break.

## 1. Project Overview
**Prompter** is a web application that takes a simple idea (e.g., "recipe app") and uses AI (Google Gemini) to rewrite it into a professional, structured prompt.

### Architecture Stack
- **Frontend**: React (Vite) for the UI.
- **Backend**: Node.js (Express) server acting as a proxy.
- **AI**: Google Gemini API via the `@google/generative-ai` SDK.
- **Styling**: Pure Modular CSS (no Tailwind, no Bootstrap).

---

## 2. Styling Architecture (Critical!) 🎨
We do **NOT** use Tailwind CSS. We use **CSS Modules** and **Standard CSS**.

### Global Styles
- **File**: `src/index.css`
- **Purpose**: Sets the "Blue Gradient" background and enforces the "Lexend" font globally.
- **Rule**: Never put component specific styles here. Only things that apply to the `<body>` or reset defaults.

### Component Styles
- **Pattern**: Every component (e.g., `Footer.jsx`) has a matching CSS file (e.g., `Footer.module.css`).
- **Usage**:
  ```jsx
  import styles from './Footer.module.css';
  <div className={styles.footer}>...</div>
  ```
- **Why?**: This prevents styles from leaking. A class named `.footer` in one file won't mess up `.footer` in another file.

---

## 3. How to Debug & Fix Logic 🔧

### Scenario A: "The AI isn't responding!"
1.  **Check the Backend Server**:
    - Go to `backend/server.js`.
    - Is the server running? (`node server.js`).
    - Is the API Key valid? Check `backend/.env`.
2.  **Check the Network**:
    - Open Chrome DevTools (F12) -> Network Tab.
    - Look for the request to `http://localhost:3001/api/enhance`.
    - Is it red? If it's a 500 error, the backend crashed. If it's 404, the route is wrong.

### Scenario B: "The text area doesn't resize!"
1.  **Check the Component**: `src/components/PromptInput/PromptInput.jsx`.
2.  **Look for the Logic**:
    - We use a `useRef` to grab the textarea element.
    - We use `useEffect` (and `onChange`) to trigger `autoResize()`.
    - `textarea.style.height = 'auto';` resets it, so `scrollHeight` can calculate the new size.

### Scenario C: "The styles look broken!"
1.  **Inspect Element**: Use right-click -> Inspect.
2.  **Check Inheritance**: Is something overriding your style?
    - Remember: `index.css` forces `font-family: 'Lexend'` on all inputs. If your input looks wrong, make sure you aren't accidentally overriding `font-family`.

---

## 4. Getting Started Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    cd backend && npm install
    ```

2.  **Setup Keys**:
    - Create `backend/.env` with: `GOOGLE_API_KEY=your_key`

3.  **Run Development**:
    - Terminal 1 (Backend): `cd backend && node server.js`
    - Terminal 2 (Frontend): `npm run dev`

Happy Coding! ❤️
