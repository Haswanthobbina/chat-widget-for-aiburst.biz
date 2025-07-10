import React from 'react';

interface MessageProps {
  chat: { sender: 'user' | 'bot'; text: string }[];
  typing: boolean;
}

const Messages: React.FC<MessageProps> = ({ chat, typing }) => {
  return (
    <div
      style={{
        height: '250px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      {chat.map((msg, i) => (
        <div
          key={i}
          style={{
            marginBottom: '8px',
            textAlign: msg.sender === 'user' ? 'right' : 'left',
          }}
        >
          <span
            style={{
              backgroundColor: msg.sender === 'user' ? '#D6F5FF' : '#eee',
              padding: '8px',
              borderRadius: '8px',
              display: 'inline-block',
              maxWidth: '80%',
            }}
          >
            {msg.text}
          </span>
        </div>
      ))}

      {typing && (
        <div style={{ marginBottom: '8px', textAlign: 'left' }}>
          <span
            style={{
              backgroundColor: '#eee',
              padding: '8px',
              borderRadius: '8px',
              display: 'inline-block',
              fontStyle: 'italic',
            }}
          >
            Chatcloud AI is typing...
          </span>
        </div>
      )}
    </div>
  );
};

export default Messages;
