import React, { useState } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import AudioControls from './AudioControls';
import FileUpload from './FileUpload';
import ThemeCustomizer from './ThemeCustomizer';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const sendMessage = () => {
        if (inputMessage) {
            const newMessage = { text: inputMessage, id: Date.now() };
            setMessages([...messages, newMessage]);
            // Add logic to handle LLM response here
            setInputMessage(''); // Clear the input
        }
    };

    const copyMessage = (id) => {
        const message = messages.find(msg => msg.id === id);
        if (message) {
            navigator.clipboard.writeText(message.text);
        }
    };

    const regenerateResponse = (id) => {
        // Add logic to regenerate LLM response for the message with the given id
    };

    return (
        <div className="chat-interface">
            <ThemeCustomizer />
            <MessageList messages={messages} onCopyMessage={copyMessage} onRegenerateResponse={regenerateResponse} />
            <InputArea value={inputMessage} onChange={setInputMessage} onSend={sendMessage} />
            <AudioControls />
            <FileUpload />
        </div>
    );
};

export default ChatInterface;