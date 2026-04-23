// llmService.js

/**
 * Fetch LLM Responses Utility
 * Contains functions for fetching responses from an LLM and streaming support.
 */

const fetchLLMResponse = async (prompt) => {
    const response = await fetch('https://api.llm.example.com/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any required authentication headers here
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch LLM response');
    }

    const data = await response.json();
    return data;
};

const streamLLMResponses = async (prompt, callback) => {
    const response = await fetch('https://api.llm.example.com/stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any required authentication headers here
        },
        body: JSON.stringify({ prompt }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        callback(decoder.decode(value));
    }
};

export { fetchLLMResponse, streamLLMResponses };