'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { loadChats, addMessageToChat, updateLastMessage } from '@/lib/localStorage';

import { streamingFetch } from '@/lib/streamingFetch';

import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ChatResponseBlock from './ChatResponseBlock';

export default function ChatInterface() {
  const params = useParams();
  const id = params?.id;
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loadedChats = loadChats();
    setChats(loadedChats);
  }, []);

  const handleSendMessage = async (message) => {
    const userMessage = { role: 'user', content: message };
    addMessageToChat(Number(id), userMessage);
    setChats(loadChats());

    setIsTyping(true);
    try {
      const response = await streamingFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, chatId: id }),
      });

      const reader = response.body.getReader();
      const aiMessage = { role: 'assistant', content: '' };
      addMessageToChat(Number(id), aiMessage);

      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();
        if (done) break;

        let chunk;

        if (value instanceof ArrayBuffer || value instanceof Uint8Array) {
          chunk = new TextDecoder().decode(value);
        } else {
          // Assume it's already a string
          chunk = value;
        }
        const lines = chunk.split('\n').filter((line) => line.trim() !== '');

        // eslint-disable-next-line no-restricted-syntax
        for (const line of lines) {
          try {
            const [, content] = line.split(':');
            if (content) {
              aiMessage.content += JSON.parse(content);
              updateLastMessage(Number(id), aiMessage);
              setChats(loadChats());
            }
          } catch (e) {
            console.warn('Error parsing chunk:', e);
          }
        }
      }

      if (!response.ok) {
        throw new Error('Failed to get response from ChatGPT');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
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
            <ChatResponseBlock chatId={id} chats={chats} isTyping={isTyping} />
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
