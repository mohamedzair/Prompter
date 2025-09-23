import { GoogleGenerativeAI } from '@google/generative-ai';

// The main entry point for a Cloudflare Worker
export default {
    async fetch(request, env, ctx) {
        // Add CORS headers to allow your frontend to call this worker
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*', // In production, you should restrict this to your Netlify domain
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Cloudflare Workers receive an OPTIONS request first to check CORS.
        // We need to handle this and send back the headers.
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // We only want to handle POST requests to the /api/enhance endpoint
        const url = new URL(request.url);
        if (url.pathname !== '/api/enhance' || request.method !== 'POST') {
            return new Response('Not Found', { status: 404 });
        }

        try {
            // Initialize the AI with the key from Cloudflare's environment secrets
            const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const { userPrompt } = await request.json();
            if (!userPrompt) {
                return new Response(JSON.stringify({ error: 'userPrompt is required' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
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

            // Return the successful response
            return new Response(JSON.stringify({ enhancedPrompt: enhancedText }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });

        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify({ error: 'Failed to enhance prompt' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }
    },
};