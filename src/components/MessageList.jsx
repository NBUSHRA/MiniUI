import React from 'react';
import PropTypes from 'prop-types';
import { marked } from 'marked';
import './MessageList.css'; // Ensure to create a CSS file for styles

const MessageList = ({ messages, onCopy, onRegenerate }) => {
    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <div key={index} className="message-item">
                    <div className="message-header">
                        <span className="timestamp">{new Date(message.timestamp).toLocaleString()}</span>
                        <button onClick={() => onCopy(message.content)}>Copy</button>
                        <button onClick={() => onRegenerate(message.id)}>Regenerate</button>
                    </div>
                    <div
                        className="message-content"
                        dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                    />
                </div>
            ))}
        </div>
    );
};

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
    })).isRequired,
    onCopy: PropTypes.func.isRequired,
    onRegenerate: PropTypes.func.isRequired,
};

export default MessageList;