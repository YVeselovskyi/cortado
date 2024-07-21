// components/ResponseArea.jsx
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ResponseArea({ chatId, chats }) {
  const chat = chats.find((c) => c.id === Number(chatId));

  return (
    <ScrollArea className="flex-1 p-4">
      {chat?.messages.map((message, index) => (
        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            {message.content}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
