import React, { useEffect, useState } from 'react';
import Header from './Header';
import Messages from './Messages';
import InputBox from './InputBox';
import QuickQuestions from './QuickQuestions';
import Tray from './Tray';

interface Config {
  appearance: any;
  header: any;
  messages: any;
  input: any;
  quickQuestions: any;
  tray: any;
  endpointUrl: string;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    fetch('/config.json')
      .then((res) => res.json())
      .then((data) => setConfig(data));
  }, []);

  const handleSend = async (text: string) => {
    const userId = sessionStorage.getItem('chat_user_id') || Date.now().toString();
    sessionStorage.setItem('chat_user_id', userId);

    setMessages((prev) => [...prev, { sender: 'user', text }]);

    try {
      const res = await fetch(config!.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, message: text }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: Could not reach server' }]);
    }
  };

  if (!config) return <div>Loading chat config...</div>;

  const containerStyle: React.CSSProperties = {
    minWidth: config.appearance.minWidth,
    width: `${config.appearance.widthPercent}%`,
    backgroundColor: config.appearance.backgroundColor,
    borderRadius: '8px',
    padding: '10px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <Header config={config.header} />
      <Tray config={config.tray} />
      <Messages chat={messages} typing />

      <QuickQuestions config={config.quickQuestions} onSelect={handleSend} />
      <InputBox onSend={handleSend} />
    </div>
  );
};

export default ChatWidget;
