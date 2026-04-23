import React, { useState, useEffect, useRef } from 'react';

const InputArea = ({ onSend }) => {
    const [input, setInput] = useState('');
    const textAreaRef = useRef(null);

    // Auto-resize the input area based on content
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [input]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendClick = () => {
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Shift + Enter for new line
            e.preventDefault();
            handleSendClick();
        }
    };

    return (
        <div className="input-area">
            <textarea
                ref={textAreaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type your message..."
                style={{ width: '100%', resize: 'none' }}
            />
            <button onClick={handleSendClick}>Send</button>
        </div>
    );
};

export default InputArea;