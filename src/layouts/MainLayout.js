'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  File,
  Inbox,
} from 'lucide-react';

import { Nav } from '@/components/Nav';
import { loadChats, saveChats } from '@/lib/localStorage';

export const MainLayout = ({ children }) => {
  const [chats, setChats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadedChats = loadChats();
    setChats(loadedChats);
  }, []);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat ${chats.length + 1}`,
      messages: [],
      lastUpdated: new Date().toISOString(),
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    saveChats(updatedChats);

    router.push(`/chat/${newChat.id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="w-72 border-r">
        <Nav
          isCollapsed={false}
          links={[
            {
              title: 'Chat history',
              label: chats.length.toString(),
              icon: Inbox,
              variant: 'default',
              href: '/chat',
            },
            {
              title: 'New chat',
              label: '',
              icon: File,
              variant: 'ghost',
            },
          ]}
          onNewChat={handleNewChat}
        />
      </div>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
