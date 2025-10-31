"use client";
import React, { useState, useEffect, useRef } from "react"; // Suspense remove koro
import { VscRobot } from "react-icons/vsc";
import { useSelector } from "react-redux";
import BreadCrumb from "@/components/shared/BreadCrumb";
import ChatHeader from "@/components/ai_chat/ChatHeader";
import ChatMessage from "@/components/ai_chat/ChatMessage";
import ChatInput from "@/components/ai_chat/ChatInput";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function AiSupport() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI dental assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state?.auth?.user);
  console.log("UUUSSSEEERRR",user)
  const userImage = user?.image
    ? `${getBaseUrl()}${user.image}`
    : "/default-avatar.png";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: generateTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text:
          data.response ||
          "I'm sorry, I couldn't process your request. Please try again.",
        isBot: true,
        timestamp: generateTimestamp(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting to the server. Please try again later.",
        isBot: true,
        timestamp: generateTimestamp(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] py-5">
      <div className="container mx-auto flex justify-start items-center py-10">
        <BreadCrumb name="Home" title="Support" />
      </div>
      <div className="max-w-5xl mx-auto flex flex-col h-screen bg-[#000] rounded-lg">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-5xl px-5 mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
                avatar={!message.isBot ? userImage : undefined}
              />
            ))}

            {isTyping && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <VscRobot className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1 px-4 py-3 bg-gray-700 rounded-2xl rounded-bl-md">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="w-full md:w-[60%] mx-auto">
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}