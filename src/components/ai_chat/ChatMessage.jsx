import React from 'react';
import { VscRobot } from 'react-icons/vsc';
import { FaRegUser } from 'react-icons/fa';

const ChatMessage = ({ message, isBot, timestamp, avatar }) => {
  return (
    <div className={`flex items-start gap-3 mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <VscRobot  className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
      
      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-xs sm:max-w-md`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'bg-neutral-700 text-gray-200 rounded-bl-md'
              : 'bg-neutral-600 text-gray-200 rounded-br-md'
          } shadow-lg`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span className="text-xs text-neutral-500 mt-2">{timestamp}</span>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-600 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="User" className="w-full h-full object-cover" />
            ) : (
              <FaRegUser  className="w-6 h-6 text-gray-300" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;