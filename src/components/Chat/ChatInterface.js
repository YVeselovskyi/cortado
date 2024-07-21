import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ChatResponseBlock from './ChatResponseBlock';

export default function ChatInterface() {
  return (
    <div className="flex h-screen">
      <ChatHistory />
      <div className="flex-1 flex flex-col">
        <ChatResponseBlock />
        <ChatInput />
      </div>
    </div>
  );
}
