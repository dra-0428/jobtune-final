import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { questions } from '../data/questions';
import { decideJobTuneType, jobSuggestions } from '../data/typeLogic';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const traitLabels = {
  E: '外向性',
  A: '協調性',
  C: '誠実性',
  N: '神経性',
  O: '開放性'
};

const ResultPage: React.FC = () => {
  const [scores, setScores] = useState<any>({});
  const [type, setType] = useState('');
  const [jobs, setJobs] = useState<string[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem('jobtune-answers');
    if (!data) return;
    const answers = JSON.parse(data);
    const traits: any = {};

    questions.forEach((q, i) => {
      if (!traits[q.trait]) traits[q.trait] = [];
      const score = q.reverse ? -answers[i] : answers[i];
      traits[q.trait].push(score);
    });

    const avg: any = {};
    Object.keys(traits).forEach(trait => {
      const arr = traits[trait];
      avg[trait] = Math.round((arr.reduce((a, b) => a + b) / arr.length) * 10) / 10;
    });

    setScores(avg);

    const decided = decideJobTuneType(avg);
    setType(decided);
    setJobs(jobSuggestions[decided]);
    saveHistory(avg, decided);
  }, []);

  const saveHistory = (scores: any, type: string) => {
    const record = { type, scores, date: new Date().toLocaleString() };
    const history = JSON.parse(localStorage.getItem('jobtune-history') || '[]');
    history.unshift(record);
    localStorage.setItem('jobtune-history', JSON.stringify(history));
  };

  const handlePDF = async () => {
    const canvas = await html2canvas(document.body);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = canvas.height * (pageWidth / canvas.width);
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    pdf.save('jobtune_result.pdf');
  };

  const handleShare = () => {
    const text = encodeURIComponent(`私の診断結果は「${type}」でした！`);
    const url = encodeURIComponent('https://your-domain.com');
    const intent = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=ジョブチューニング`;
    window.open(intent, '_blank');
  };

  const chartData = {
    labels: Object.keys(traitLabels).map(k => traitLabels[k]),
    datasets: [{
      label: '性格スコア',
      data: Object.keys(traitLabels).map(k => scores[k] || 0),
      backgroundColor: 'rgba(79,157,228,0.2)',
      borderColor: '#4f9de4',
      borderWidth: 2,
      pointBackgroundColor: '#4f9de4'
    }]
  };

  const getMascotExpression = (t: string) => {
  switch (t) {
    case '社交的リーダー型': return 'clap';
    case '共感サポート型': return 'cheer';
    case '感受性クリエイター型': return 'think';
    case '冷静分析型': return 'think';
    case '知的探究型': return 'think';
    case '柔軟調整型': return 'clap';
    case '慎重安定型': return 'think';
    case '情熱型': return 'cheer';
    case '計画実行型': return 'clap';
    default: return 'happy';
  }
};

const getMascotComment = (t: string) => {
    switch (t) {
      case '社交的リーダー型': return 'リーダーシップが輝いてる！';
      case '共感サポート型': return 'やさしさがにじみ出てるよ！';
      case '感受性クリエイター型': return 'センスがきらきらしてる！';
      case '冷静分析型': return '分析力がすごいね！';
      case '知的探究型': return '知識欲が止まらない！';
      case '柔軟調整型': return '器用で頼れるね！';
      case '慎重安定型': return 'いつも冷静で安心できる！';
      case '情熱型': return '熱い想いが伝わってくる！';
      case '計画実行型': return 'しっかり者のあなたにぴったり！';
      default: return 'バランス感覚が素晴らしい！';
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <img src={`/mascot_${getMascotExpression(type)}.png`} style={{ width: '120px' }} alt="マスコット" />
      <p style={{ fontWeight: 'bold', color: '#4f9de4' }}>{getMascotComment(type)}</p>

      <h2>診断結果</h2>
      <p>あなたのタイプは <strong>{type}</strong> です。</p>

      <h3 style={{ marginTop: '1.5rem' }}>向いている職業</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map(job => <li key={job}>・{job}</li>)}
      </ul>

      <h3 style={{ marginTop: '1.5rem' }}>性格スコア</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(scores).map(([k, v]) => (
          <li key={k}>{traitLabels[k]}：{v}</li>
        ))}
      </ul>

      <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <Radar data={chartData} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={handlePDF} style={{ marginRight: '1rem', padding: '0.8rem 1.5rem', backgroundColor: '#4f9de4', color: '#fff', border: 'none', borderRadius: '8px' }}>PDFで保存</button>
        <button onClick={handleShare} style={{ padding: '0.8rem 1.5rem', backgroundColor: '#1da1f2', color: '#fff', border: 'none', borderRadius: '8px' }}>結果をシェア</button>
      </div>
    </div>
  );
};

export default ResultPage;
