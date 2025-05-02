export interface Question {
  text: string;
  trait: 'E' | 'A' | 'C' | 'N' | 'O';
  reverse?: boolean;
}

export const questions: Question[] = [
  { text: '人と話すことが好きだ。', trait: 'E' },
  { text: '人の気持ちを理解しやすい。', trait: 'A' },
  { text: '約束は必ず守る方だ。', trait: 'C' },
  { text: '心配性なところがある。', trait: 'N' },
  { text: '新しいアイデアを考えるのが好きだ。', trait: 'O' },
  { text: '目立つのは苦手だ。', trait: 'E', reverse: true },
  { text: '誰かの役に立つことが嬉しい。', trait: 'A' },
  { text: 'やるべきことは先に終わらせる。', trait: 'C' },
  { text: '緊張しやすい。', trait: 'N' },
  { text: '芸術に興味がある。', trait: 'O' }
];
