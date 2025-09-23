// filepath: c:\Users\hp\Desktop\prompter\backend\server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post('/api/enhance', async (req, res) => {
    try {
        const { userPrompt } = req.body;
        if (!userPrompt) {
            return res.status(400).json({ error: 'userPrompt is required' });
        }

        const instructionalPrompt = `
      You are an expert prompt engineer. Your task is to take a user's simple idea or prompt and expand it into a detailed, well-structured prompt.
      Based on the user's input, add details, context, and specify the desired format or style.
      User's simple prompt: "${userPrompt}"
      Your enhanced prompt:
    `;

        const result = await model.generateContent(instructionalPrompt);
        const response = await result.response;
        const enhancedText = response.text();
        res.json({ enhancedPrompt: enhancedText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to enhance prompt' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});