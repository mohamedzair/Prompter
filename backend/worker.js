// The main entry point for a Cloudflare Worker
export default {
    async fetch(request, env) {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);
        if (url.pathname !== '/api/enhance' || request.method !== 'POST') {
            return new Response('Not Found', { status: 404 });
        }

        try {
            const envKey = env.GOOGLE_API_KEY;
            if (!envKey) throw new Error('Missing GOOGLE_API_KEY');

            const { userPrompt } = await request.json();
            if (!userPrompt) throw new Error('userPrompt is required');

            const instruction = `
        You are an expert prompt engineer. Expand the following simple prompt
        into a detailed, well‑structured prompt for a text‑to‑image AI model.
        User's simple prompt: "${userPrompt}"
        Your enhanced prompt:
      `;

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${envKey}`;

            const apiResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: instruction }] }] }),
            });

            if (!apiResponse.ok) {
                const errBody = await apiResponse.text();
                throw new Error(`Google API error: ${errBody}`);
            }

            const apiResult = await apiResponse.json();
            const enhanced = apiResult.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

            return new Response(
                JSON.stringify({ enhancedPrompt: enhanced }),
                { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
        } catch (error) {
            console.error('Worker error:', error);
            return new Response(
                JSON.stringify({ error: error.message || 'Failed to enhance prompt' }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                }
            );
        }
    },
};