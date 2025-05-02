import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const traitLabels: { [key: string]: string } = {
  E: '外向性',
  A: '協調性',
  C: '誠実性',
  N: '神経性',
  O: '開放性'
};

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('jobtune-history');
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>診断履歴</h2>
      {history.length === 0 ? (
        <p>まだ診断履歴がありません。</p>
      ) : (
        history.map((entry, idx) => (
          <div key={idx} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <p><strong>診断日時：</strong>{entry.date}</p>
            <p><strong>性格タイプ：</strong>{entry.type}</p>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {Object.entries(entry.scores).map(([trait, value]) => (
                <li key={trait}>{traitLabels[trait] || trait}：{value}</li>
              ))}
            </ul>
          </div>
        ))
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#4f9de4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          トップに戻る
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;
