
import { useState, useEffect } from 'react';
import { EmotionBall, EmotionType } from '../types/emotion';

export const useEmotionJar = () => {
  const [emotionBalls, setEmotionBalls] = useState<EmotionBall[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    setIsLoading(true);
    const savedBalls = localStorage.getItem('emotionBalls');
    
    if (savedBalls) {
      try {
        setEmotionBalls(JSON.parse(savedBalls));
      } catch (error) {
        console.error('Error parsing saved emotion balls:', error);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('emotionBalls', JSON.stringify(emotionBalls));
    }
  }, [emotionBalls, isLoading]);

  // Función para añadir una nueva bola de emoción
  const addEmotionBall = (type: EmotionType, name: string) => {
    // Calcular posición aleatoria dentro del frasco
    const jarWidth = 240; // ancho interno del frasco
    const ballSize = 40;
    const margin = 20;
    
    // Posición X aleatoria pero evitando solapamientos en los bordes
    const minX = margin;
    const maxX = jarWidth - ballSize - margin;
    const positionX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    
    // Posición Y dependiendo de cuántas bolas hay (desde abajo hacia arriba)
    // Simulamos un "apilamiento" básico
    const baseY = 290; // base del frasco
    const ballsPerRow = Math.floor(jarWidth / (ballSize + 10));
    const rowHeight = ballSize + 10;
    const ballIndex = emotionBalls.length;
    const row = Math.floor(ballIndex / ballsPerRow);
    const positionY = baseY - (row * rowHeight);

    const newBall: EmotionBall = {
      id: Date.now().toString(),
      type,
      name,
      timestamp: new Date().toISOString(),
      positionX,
      positionY
    };

    setEmotionBalls(prev => [...prev, newBall]);
    return newBall;
  };

  // Función para vaciar el frasco
  const clearJar = () => {
    setEmotionBalls([]);
  };

  // Función para obtener resumen de emociones
  const getEmotionSummary = () => {
    const summary: Record<EmotionType, EmotionBall[]> = {
      happy: [],
      calm: [],
      anxious: [],
      angry: [],
      sad: [],
      excited: []
    };

    emotionBalls.forEach(ball => {
      summary[ball.type].push(ball);
    });

    return summary;
  };

  return {
    emotionBalls,
    addEmotionBall,
    clearJar,
    getEmotionSummary,
    isLoading
  };
};
