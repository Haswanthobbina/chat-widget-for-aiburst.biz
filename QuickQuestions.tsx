import React from 'react';

interface QuickQuestionsProps {
  config: { questions: string[] };
  onSelect: (text: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ config, onSelect }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      {config.questions.map((q, index) => (
        <button
          key={index}
          onClick={() => onSelect(q)}
          style={{
            marginRight: '6px',
            marginBottom: '6px',
            padding: '6px 12px',
            backgroundColor: '#D6F5FF',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default QuickQuestions;
