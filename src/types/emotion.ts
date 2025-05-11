
export type EmotionType = 'happy' | 'calm' | 'anxious' | 'angry' | 'sad' | 'excited';

export interface EmotionBall {
  id: string;
  type: EmotionType;
  name: string;
  timestamp: string;
  positionX: number;
  positionY: number;
}

export const emotionColors: Record<EmotionType, string> = {
  happy: '#4ade80',
  calm: '#60a5fa',
  anxious: '#fcd34d',
  angry: '#f87171',
  sad: '#a78bfa',
  excited: '#fb923c',
};

export const emotionLabels: Record<EmotionType, string> = {
  happy: 'Feliz',
  calm: 'Tranquilo',
  anxious: 'Ansioso',
  angry: 'Enojado',
  sad: 'Triste',
  excited: 'Emocionado',
};
