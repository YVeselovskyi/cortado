'use client';

import {
  File,
  Inbox,
} from 'lucide-react';

import { Nav } from '@/components/Nav';

export const MainLayout = ({ children }) => (
  <div className="flex h-screen">
    <div className="w-72 border-r">
      <Nav
        isCollapsed={false}
        links={[
          {
            title: 'Inbox',
            label: '128',
            icon: Inbox,
            variant: 'default',
          },
          {
            title: 'Drafts',
            label: '9',
            icon: File,
            variant: 'ghost',
          },
        ]}
      />
    </div>
    <div className="flex-1 flex flex-col">
      {children}
    </div>
  </div>
);
