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
