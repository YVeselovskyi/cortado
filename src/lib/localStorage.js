export const loadChats = () => {
  if (typeof window !== 'undefined') {
    const chats = localStorage.getItem('chats');
    return chats ? JSON.parse(chats) : [];
  }
  return [];
};

export const saveChats = (chats) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chats', JSON.stringify(chats));
  }
};

export const addMessageToChat = (chatId, message) => {
  const chats = loadChats();
  const chatIndex = chats.findIndex((chat) => chat.id === chatId);
  if (chatIndex !== -1) {
    chats[chatIndex].messages.push(message);
    chats[chatIndex].lastUpdated = new Date().toISOString();
    saveChats(chats);
  }
};

export const updateLastMessage = (chatId, message) => {
  const chats = loadChats();
  const chatIndex = chats.findIndex((chat) => chat.id === chatId);
  if (chatIndex !== -1) {
    chats[chatIndex].messages[chats[chatIndex].messages.length - 1] = message;
    chats[chatIndex].lastUpdated = new Date().toISOString();
    saveChats(chats);
  }
};
