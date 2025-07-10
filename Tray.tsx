import React, { useEffect, useState } from 'react';

interface TrayProps {
  config: {
    messages: string[];
    initialDelaySeconds: number;
    subsequentDelaySeconds: number;
    backgroundColor: string;
    font: {
      color: string;
      size: string;
    };
    borderRadius: number;
  };
}

const Tray: React.FC<{ config: any }> = ({ config }) => {
  const [visibleMessage, setVisibleMessage] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < config.messages.length) {
          setVisibleMessage(config.messages[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, config.subsequentDelaySeconds * 1000);
    }, config.initialDelaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [config]);

  return visibleMessage ? (
    <div
      style={{
        backgroundColor: config.backgroundColor || '#D6F5FF',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: config.borderRadius || 6,
        fontSize: config.font?.size || '13px',
        color: config.font?.color || '#000',
      }}
    >
      {visibleMessage}
    </div>
  ) : null;
};

export default Tray;
