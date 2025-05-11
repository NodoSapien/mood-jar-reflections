
import React, { useState } from 'react';
import { EmotionJar } from '../components/EmotionJar';
import { EmotionSelector } from '../components/EmotionSelector';
import { EmotionSummary } from '../components/EmotionSummary';
import { EmotionType } from '../types/emotion';
import { Button } from '@/components/ui/button';
import { useEmotionJar } from '../hooks/useEmotionJar';
import { toast } from 'sonner';

const Index = () => {
  const { emotionBalls, addEmotionBall, clearJar, getEmotionSummary, isLoading } = useEmotionJar();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  const handleAddEmotion = (type: EmotionType, name: string) => {
    const newBall = addEmotionBall(type, name);
    toast.success(`¡Has añadido "${name}" a tu frasco!`);
  };

  const handleClearJar = () => {
    setIsSummaryOpen(true);
  };

  const handleCloseSummary = () => {
    setIsSummaryOpen(false);
  };

  const handleConfirmClear = () => {
    clearJar();
    setIsSummaryOpen(false);
    toast.info('Se ha vaciado el frasco');
  };

  return (
    <div className="container min-h-screen py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Mi Frasco Emocional
        </h1>
        <p className="text-muted-foreground mt-2">
          Registra tus emociones y observa cómo evoluciona tu bienestar
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <EmotionSelector onAddEmotion={handleAddEmotion} />
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              variant="outline" 
              onClick={handleClearJar}
              disabled={emotionBalls.length === 0}
              className="w-full"
            >
              Ver resumen y vaciar frasco
            </Button>
            
            <Button 
              variant={emotionBalls.length === 0 ? "outline" : "default"} 
              onClick={() => setIsSummaryOpen(true)}
              disabled={emotionBalls.length === 0}
              className="w-full"
            >
              Ver resumen
            </Button>
          </div>
        </div>
        
        <div className="relative bg-gradient-to-b from-blue-50 to-purple-50 p-6 rounded-lg shadow-inner min-h-[400px] flex items-center justify-center">
          <EmotionJar emotionBalls={emotionBalls} />
        </div>
      </div>

      <EmotionSummary 
        isOpen={isSummaryOpen} 
        onClose={handleCloseSummary} 
        summary={getEmotionSummary()}
      />

      <footer className="text-center text-sm text-muted-foreground mt-12">
        <p>Desarrolla un hábito de autocuidado emocional registrando tus emociones diariamente.</p>
      </footer>
    </div>
  );
};

export default Index;
