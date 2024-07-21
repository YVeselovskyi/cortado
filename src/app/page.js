import { MainLayout } from '@/layouts/MainLayout';
import ChatInterface from '@/components/Chat/ChatInterface';

export default function Home() {
  return (
    <MainLayout>
      <ChatInterface />
    </MainLayout>
  );
}
