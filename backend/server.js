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
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

app.post('/api/enhance', async (req, res) => {
    try {
        const { userPrompt } = req.body;
        if (!userPrompt) {
            return res.status(400).json({ error: 'userPrompt is required' });
        }

        const instructionalPrompt = `
      Act as an expert prompt engineer. Enhance the input variable ${userPrompt} into a high quality command. Use only alphabetic letters and spaces. Do not use digits or symbols. Strictly limit the result to 60 words.
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