import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatHistory() {
  const chats = [
    {
      id: 1, title: 'Summary of this chat', preview: 'Preview of last message sent or recei...', date: 'Jul 04',
    },
  ];

  return (
    <div className="w-64 border-r">
      <ScrollArea className="h-full">
        {chats.map((chat) => (
          <div key={chat.id} className="p-4 hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold">{chat.title}</h3>
            <p className="text-sm text-gray-500">{chat.preview}</p>
            <span className="text-xs text-gray-400">{chat.date}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
