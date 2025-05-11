
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { emotionLabels, EmotionType, EmotionBall } from '../types/emotion';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface EmotionSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  summary: Record<EmotionType, EmotionBall[]>;
}

export const EmotionSummary: React.FC<EmotionSummaryProps> = ({ isOpen, onClose, summary }) => {
  const totalBalls = Object.values(summary).flat().length;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPpp', { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  const exportToCSV = () => {
    let csvContent = 'Tipo de emoción,Nombre,Fecha\n';
    
    Object.entries(summary).forEach(([type, balls]) => {
      balls.forEach((ball) => {
        const formattedDate = formatDate(ball.timestamp);
        csvContent += `${emotionLabels[type as EmotionType]},"${ball.name}","${formattedDate}"\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `resumen-emocional-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Resumen de tu frasco emocional</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {totalBalls === 0 ? (
            <p className="text-center py-8 text-muted-foreground">El frasco está vacío.</p>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {Object.entries(summary).map(([type, balls]) => (
                  balls.length > 0 && (
                    <div 
                      key={type} 
                      className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2"
                    >
                      <div className={`w-4 h-4 rounded-full bg-emotion-${type}`}></div>
                      <span className="font-medium">{emotionLabels[type as EmotionType]}</span>
                      <span className="bg-secondary-foreground/10 px-2 py-0.5 rounded-full text-xs">
                        {balls.length}
                      </span>
                    </div>
                  )
                ))}
              </div>
              
              <div className="space-y-4">
                {Object.entries(summary).map(([type, balls]) => (
                  balls.length > 0 && (
                    <div key={type} className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-emotion-${type}`}></div>
                        {emotionLabels[type as EmotionType]} ({balls.length})
                      </h3>
                      <ul className="text-sm space-y-1 pl-5">
                        {balls.map((ball) => (
                          <li key={ball.id} className="list-disc">
                            <span className="font-medium">{ball.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {formatDate(ball.timestamp)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onClose} className="sm:mr-2">
            Cerrar
          </Button>
          <Button onClick={exportToCSV} disabled={totalBalls === 0}>
            Exportar a CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
