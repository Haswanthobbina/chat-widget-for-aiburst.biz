import React from 'react';

interface HeaderProps {
  config: {
    height: number;
    backgroundColor: string;
    logo: {
      enabled: boolean;
      text: {
        value: string;
        color: string;
      };
    };
  };
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  const style: React.CSSProperties = {
    height: config.height,
    backgroundColor: config.backgroundColor,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    color: config.logo.text.color,
    fontWeight: 'bold',
  };

  return (
    <div style={style}>
      {config.logo.enabled && <span>{config.logo.text.value}</span>}
    </div>
  );
};

export default Header;
