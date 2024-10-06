import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Create an asynchronous function POST to handle POST request with parameters request and response.
export async function POST(req) {
    try {
        console.log(process.env.GEMINI_API_KEY);

        // Access your API key by creating an instance of GoogleGenerativeAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Initialize a generative model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            description: "You should search the web for more information about this Near Earth Object (NEO), act like a NASA scientist, and try to simplify things to the end user. Provide details about the NEO's size, orbit, and any known characteristics. Do not say that you don't know an information or you don't have the data for it", 
        });

        // Retrieve the data we receive as part of the request body
        const data = await req.json();

        // Retrieve chat history from the request (if any)
        const chatHistory = data.history || [];

        // Define a new prompt that includes the previous conversation (history)
        console.log(data.data.toString());
        const userMessage = `Data:${JSON.stringify(data.data, null, 2)} message: ${data.message}`;
        
        // Add the user message to the conversation history
        chatHistory.push({ role: 'user', content: userMessage });
        console.log(chatHistory);

        // Create a combined history prompt for the model
        const conversation = chatHistory.map(message => {
            return `${message.role === 'user' ? 'user' : 'ai'}: ${message.content}`;
        }).join("\n");

        // Pass the entire conversation history to the model and retrieve the output
        const result = await model.generateContent(conversation);
        const response = await result.response;
        const output = await response.text();

        // Append the model's response to the history
        chatHistory.push({ role: 'ai', content: output });

        // Send the LLM output as a server response, including the updated conversation history
        return NextResponse.json({ output: output, history: chatHistory });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}