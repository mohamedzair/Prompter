/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Lexend', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#2563EB', // Blue 600
                    hover: '#1D4ED8',   // Blue 700
                },
                background: {
                    start: '#EFF6FF', // Blue 50
                    end: '#DBEAFE',   // Blue 100
                }
            }
        },
    },
    plugins: [],
}
