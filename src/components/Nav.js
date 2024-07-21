'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Nav({ links, isCollapsed, onNewChat }) {
  const router = useRouter();

  const handleLinkClick = (link) => {
    if (link.title === 'New chat') {
      onNewChat();
    } else {
      router.push(link.href || '#');
    }
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (isCollapsed ? (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: link.variant, size: 'icon' }),
                  'h-9 w-9',
                  link.variant === 'default'
                  && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                )}
                onClick={() => handleLinkClick(link)}
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.title}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {link.title}
              {link.label && (
                <span className="ml-auto text-muted-foreground">
                  {link.label}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            type="button"
            key={index}
            className={cn(
              buttonVariants({ variant: link.variant, size: 'sm' }),
              link.variant === 'default'
              && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start w-full',
            )}
            onClick={() => handleLinkClick(link)}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  'ml-auto',
                  link.variant === 'default'
                  && 'text-background dark:text-white',
                )}
              >
                {link.label}
              </span>
            )}
          </button>
        )))}
      </nav>
    </div>
  );
}
