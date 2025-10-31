import React from 'react';
import { VscRobot } from 'react-icons/vsc';

const ChatHeader = () => {
  return (
    <div className="bg-neutral-700 rounded-lg p-2">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
            <VscRobot className="w-7 h-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Ai Bot</h1>
          <p className="text-neutral-500 text-sm mt-1">24 X 7 Support Bot</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;