
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Maximize, Mic, MicOff, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VideoFeed = ({
  studentName,
  studentId,
  onExpand,
  isExpanded = false,
  initialViolations = [],
  className,
}) => {
  const [violations, setViolations] = useState(initialViolations);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const videoRef = useRef(null);
  
  // Mock video stream with a placeholder for demo purposes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Normally you would use navigator.mediaDevices.getUserMedia here
      // For demo, we'll use a placeholder video or color
      videoElement.poster = "https://images.unsplash.com/photo-1612980932665-cf7ad278a614?q=80&w=1171&auto=format&fit=crop";
    }
    
    // Simulate random violations for demo purposes
    const interval = setInterval(() => {
      const possibleViolations = ['Multiple faces detected', 'Phone detected', 'Looking away', 'Voice detected'];
      const shouldAddViolation = Math.random() < 0.3; // 30% chance
      
      if (shouldAddViolation) {
        const randomViolation = possibleViolations[Math.floor(Math.random() * possibleViolations.length)];
        if (!violations.includes(randomViolation)) {
          setViolations(prev => [...prev, randomViolation]);
          
          // Remove violation after a few seconds
          setTimeout(() => {
            setViolations(prev => prev.filter(v => v !== randomViolation));
          }, 5000);
        }
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [violations]);

  const hasViolations = violations.length > 0;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border",
      hasViolations ? "border-destructive/40" : "border-border",
      className
    )}>
      <div className="relative">
        <video
          ref={videoRef}
          className={cn(
            "w-full h-auto object-cover",
            isExpanded ? "min-h-[400px]" : "h-[220px]"
          )}
        />
        
        {/* Video overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-between p-3">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-black/40 text-white border-0 backdrop-blur-sm">
              ID: {studentId}
            </Badge>
            
            {hasViolations && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Alert
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-white text-shadow">{studentName}</h3>
              {!hasViolations && (
                <div className="flex items-center text-xs text-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  No issues detected
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-black/40 border-0 text-white hover:bg-black/60 backdrop-blur-sm"
                onClick={() => setIsAudioMuted(!isAudioMuted)}
              >
                {isAudioMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              {onExpand && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-black/40 border-0 text-white hover:bg-black/60 backdrop-blur-sm"
                  onClick={onExpand}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Violations list */}
      {hasViolations && (
        <CardContent className="p-3 bg-red-50 border-t border-destructive/20">
          <div className="space-y-2">
            {violations.map((violation, index) => (
              <div key={index} className="flex items-center text-destructive text-sm">
                <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                {violation === 'Phone detected' && <Smartphone className="h-4 w-4 mr-2 flex-shrink-0" />}
                <span>{violation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default VideoFeed;
