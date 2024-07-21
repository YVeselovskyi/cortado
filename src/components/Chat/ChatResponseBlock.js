// components/ResponseArea.jsx
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatResponseBlock() {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">User Name</h3>
          <p>This is a query that was submitted by the user...</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold">Large Language Model</h3>
          <p>This is a response to the user`s query above...</p>
        </div>
      </div>
    </ScrollArea>
  );
}
