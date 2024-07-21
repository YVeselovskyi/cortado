import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ChatInput() {
  return (
    <div className="p-4 border-t">
      <Textarea
        placeholder="Type your message here..."
        className="mb-2"
      />
      <Button>Send</Button>
    </div>
  );
}
