import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';

const choices = [
  { label: '全くそう思わない', value: -2 },
  { label: 'あまりそう思わない', value: -1 },
  { label: 'どちらでもない', value: 0 },
  { label: '少しそう思う', value: 1 },
  { label: '非常にそう思う', value: 2 }
];

const mascotComments = [
  'さあ、始めよう！',
  'いいペースですね！',
  'もう少しです！',
  '最後のひと踏ん張り！'
];

const getCommentIndex = (progress: number) => {
  if (progress < 25) return 0;
  if (progress < 50) return 1;
  if (progress < 75) return 2;
  return 3;
};

const QuestionPage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();
  const question = questions[index];
  const progress = Math.round(((index + 1) / questions.length) * 100);
  const comment = mascotComments[getCommentIndex(progress)];

  const handleAnswer = (score: number) => {
    const updatedAnswers = [...answers, question.reverse ? -score : score];
    setAnswers(updatedAnswers);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      sessionStorage.setItem('jobtune-answers', JSON.stringify(updatedAnswers));
      navigate('/result');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <img src="/mascot.png" alt="マスコット" style={{ width: '150px', marginBottom: '1rem' }} />
      <p style={{ fontWeight: 'bold', color: '#4f9de4' }}>{comment}</p>

      <h2>質問 {index + 1} / {questions.length}</h2>
      <p style={{ fontSize: '1.1rem', margin: '1.5rem 0' }}>{question.text}</p>

      {choices.map(choice => (
        <button
          key={choice.value}
          onClick={() => handleAnswer(choice.value)}
          style={{
            display: 'block',
            margin: '0.5rem auto',
            padding: '0.8rem 1.2rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#4f9de4',
            color: 'white',
            width: '80%',
            maxWidth: '300px'
          }}
        >
          {choice.label}
        </button>
      ))}

      <div style={{ marginTop: '2rem' }}>
        <progress value={progress} max="100" style={{ width: '100%' }} />
        <p>{progress}% 完了</p>
      </div>
    </div>
  );
};

export default QuestionPage;
