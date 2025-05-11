
import React, { useState } from 'react';
import { EmotionType, emotionLabels } from '../types/emotion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmotionSelectorProps {
  onAddEmotion: (type: EmotionType, name: string) => void;
}

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({ onAddEmotion }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [emotionName, setEmotionName] = useState('');

  const handleEmotionSelect = (type: EmotionType) => {
    setSelectedEmotion(type);
  };

  const handleAddEmotion = () => {
    if (selectedEmotion) {
      onAddEmotion(selectedEmotion, emotionName);
      setEmotionName('');
      setSelectedEmotion(null);
    }
  };

  const emotionTypes: EmotionType[] = ['happy', 'calm', 'anxious', 'angry', 'sad', 'excited'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">¿Cómo te sientes hoy?</h2>
      
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {emotionTypes.map((type) => (
          <Button
            key={type}
            variant={selectedEmotion === type ? "default" : "outline"}
            className={`flex flex-col items-center justify-center p-2 h-auto ${
              selectedEmotion === type ? 'ring-2 ring-offset-2' : ''
            }`}
            onClick={() => handleEmotionSelect(type)}
          >
            <div className={`w-6 h-6 rounded-full bg-emotion-${type} mb-2`}></div>
            <span className="text-xs">{emotionLabels[type]}</span>
          </Button>
        ))}
      </div>

      {selectedEmotion && (
        <div className="space-y-3">
          <div>
            <label htmlFor="emotion-name" className="text-sm font-medium">
              Nombra tu emoción:
            </label>
            <Input
              id="emotion-name"
              type="text"
              placeholder="Ej. Reunión de trabajo"
              value={emotionName}
              onChange={(e) => setEmotionName(e.target.value)}
              maxLength={50}
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={handleAddEmotion} 
            className="w-full"
            disabled={!emotionName.trim()}
          >
            Añadir al frasco
          </Button>
        </div>
      )}
    </div>
  );
};
