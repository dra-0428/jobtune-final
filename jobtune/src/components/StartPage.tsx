import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Noto Sans JP, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ジョブチューニング</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
        あなたの性格傾向から、向いている職業タイプを診断します。<br />
        全36問・約3分で完了。結果はPDF保存・SNS共有も可能です。
      </p>
      <button
        onClick={() => navigate('/test')}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#4f9de4',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        診断をはじめる
      </button>
    </div>
  );
};

export default StartPage;
