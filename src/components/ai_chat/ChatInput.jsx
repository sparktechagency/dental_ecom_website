import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

const ChatInput = ({ onSendMessage, disabled = false }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <div className="mb-10">
            <form onSubmit={handleSubmit} className="flex items-center">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type here..."
                        disabled={disabled}
                        className="w-full px-4 py-3 pr-12 bg-neutral-700 border border-[#136BFB] rounded-lg text-gray-200 placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || disabled}
                        className="absolute right-2 top-3"
                    >
                        <IoIosSend  className="w-8 h-8 text-[#136BFB]" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;