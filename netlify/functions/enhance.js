const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async function (event, context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 404, body: 'Not Found' };
    }

    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) throw new Error('Missing GOOGLE_API_KEY');

        const { userPrompt } = JSON.parse(event.body);
        if (!userPrompt) throw new Error('userPrompt is required');

        const instruction = `
      You are an expert prompt engineer. Expand the following simple prompt
      into a detailed, well‑structured prompt for a text‑to‑image AI model.
      User's simple prompt: "${userPrompt}"
      Your enhanced prompt:
    `;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: instruction }] }],
            }),
        });

        if (!apiResponse.ok) {
            const errBody = await apiResponse.text();
            throw new Error(`Google API error: ${errBody}`);
        }

        const apiResult = await apiResponse.json();
        const enhanced =
            apiResult.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify({ enhancedPrompt: enhanced }),
        };
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify({ error: error.message || 'Failed to enhance prompt' }),
        };
    }
};