import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatResponseBlock({ chatId, chats, isTyping }) {
  const chat = chats.find((c) => c.id === Number(chatId));
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      {chat?.messages.map((message, index) => (
        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            {message.content}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="text-left">
          <div className="inline-block p-2 rounded-lg bg-gray-100">
            <span className="typing-indicator">...</span>
          </div>
        </div>
      )}
    </ScrollArea>
  );
}
