"use client";
import React, { useState, useEffect, useRef } from "react"; 
import { VscRobot } from "react-icons/vsc";
import { useSelector } from "react-redux";
import BreadCrumb from "@/components/shared/BreadCrumb";
import ChatHeader from "@/components/ai_chat/ChatHeader";
import ChatMessage from "@/components/ai_chat/ChatMessage";
import ChatInput from "@/components/ai_chat/ChatInput";

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

  const userImage = user?.image
    ? `${user.image}`
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
      console.log('Sending message to API:', messageText);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error response:', errorData);
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Success data:', data);

      // Create the main bot message
      let botMessageText = data.response || data.message || "I'm sorry, I couldn't process your request. Please try again.";
      
      // Add additional message if available
      if (data.additional_message) {
        botMessageText += `\n\n${data.additional_message}`;
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botMessageText,
        isBot: true,
        timestamp: generateTimestamp(),
        // Store links array for rendering
        links: data.links || []
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
    <div className="min-h-screen py-5">
      <div className="container mx-auto flex justify-start items-center py-10">
        <BreadCrumb name="Home" title="Support" />
      </div>
      <div className="max-w-5xl mx-auto flex flex-col h-screen rounded-lg border">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-5xl px-5 mx-auto">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatMessage
                  message={message.text}
                  isBot={message.isBot}
                  timestamp={message.timestamp}
                  avatar={!message.isBot ? userImage : undefined}
                />
                
                {/* Render clickable product links if available */}
                {message.links && message.links.length > 0 && (
                  <div className="flex items-start gap-3 mb-6 ml-15">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <VscRobot className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="px-4 py-3 bg-gray-700 rounded-2xl rounded-bl-md">
                        <p className="text-white font-medium mb-2">Recommended Products:</p>
                        <div className="space-y-2">
                          {message.links.map((link, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-600 p-2 rounded-lg">
                              <span className="text-white text-sm flex-1">
                                {link.product_name}
                              </span>
                              {link.product_url && (
                                <a 
                                  href={link.product_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="ml-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                  View Details
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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