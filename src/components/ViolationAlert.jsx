
import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeIn from './FadeIn';

const ViolationAlert = ({
  studentName,
  studentId,
  violation,
  timestamp,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    // Auto-dismiss after 10 seconds
    const dismissTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Allow animation to complete
    }, 10000);
    
    // Progress bar animation
    const startTime = Date.now();
    const duration = 10000; // 10 seconds
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
    
    return () => clearTimeout(dismissTimeout);
  }, [onDismiss]);
  
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <FadeIn className={cn(
      "transition-all duration-300 ease-in-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="bg-white border border-destructive/30 rounded-lg shadow-lg overflow-hidden max-w-md">
        <div className="relative">
          <div className="absolute bottom-0 left-0 h-1 bg-destructive" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-base">Violation Detected</h4>
                <button 
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onDismiss, 300);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm font-medium mt-1">{studentName}</p>
              <p className="text-sm text-destructive mt-1">{violation}</p>
              
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>ID: {studentId}</span>
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default ViolationAlert;
