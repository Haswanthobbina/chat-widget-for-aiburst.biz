import React, { useState } from 'react';

interface InputBoxProps {
  onSend: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
        style={{ flex: 1, padding: '8px' }}
      />
      <button onClick={handleSend} style={{ padding: '8px' }}>
        Send
      </button>
    </div>
  );
};

export default InputBox;
