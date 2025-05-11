
import React from 'react';
import { EmotionBall } from '../types/emotion';
import { motion } from 'framer-motion';

interface EmotionJarProps {
  emotionBalls: EmotionBall[];
}

export const EmotionJar: React.FC<EmotionJarProps> = ({ emotionBalls }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="jar-lid"></div>
      <div className="jar">
        {emotionBalls.map((ball) => (
          <motion.div
            key={ball.id}
            className="emotion-ball"
            style={{ 
              backgroundColor: `bg-emotion-${ball.type}`,
              left: ball.positionX,
            }}
            initial={{ y: -400 }}
            animate={{ y: ball.positionY }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1
            }}
            title={ball.name}
          />
        ))}
      </div>
    </div>
  );
};
