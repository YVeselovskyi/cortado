// components/ChatHistory.jsx

'use client';

import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatHistory({ chats }) {
  const router = useRouter();

  return (
    <ScrollArea className="h-[calc(100vh-60px)]">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
          onClick={() => router.push(`/chat/${chat.id}`)}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{chat.title}</h3>
              <p className="text-xs text-gray-500 truncate">
                {chat.messages[chat.messages.length - 1]?.content}
              </p>
            </div>
            <span className="text-xs text-gray-400">{new Date(chat.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
