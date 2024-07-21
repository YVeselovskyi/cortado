// components/ChatInterface.jsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { loadChats, addMessageToChat } from '@/lib/localStorage';

import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ChatResponseBlock from './ChatResponseBlock';

export default function ChatInterface() {
  const params = useParams();
  const id = params?.id;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadedChats = loadChats();
    setChats(loadedChats);
  }, []);

  const handleSendMessage = async (message) => {
    const userMessage = { role: 'user', content: message };
    addMessageToChat(Number(id), userMessage);
    setChats(loadChats());
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, chatId: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from ChatGPT');
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage = { role: 'assistant', content: data.message };
      addMessageToChat(Number(id), aiMessage);
      setChats(loadChats());
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-64 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chat History</h2>
        </div>
        <ChatHistory chats={chats} />
      </div>
      <div className="flex-1 flex flex-col">
        {id ? (
          <>
            <ChatResponseBlock chatId={id} chats={chats} />
            <ChatInput chatId={id} onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-gray-500">Choose a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
