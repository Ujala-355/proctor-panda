
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VideoFeed from '@/components/VideoFeed';
import ViolationAlert from '@/components/ViolationAlert';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, ArrowLeft, Clock, Eye, 
  Layout, MessageSquare, PauseCircle, PlayCircle, Users 
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/FadeIn';

type Student = {
  id: string;
  name: string;
  initialViolations: string[];
};

type Violation = {
  id: string;
  studentName: string;
  studentId: string;
  violation: string;
  timestamp: Date;
};

const Monitoring = () => {
  const { examId } = useParams<{ examId: string }>();
  const [expandedStudent, setExpandedStudent] = useState<Student | null>(null);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isPaused, setIsPaused] = useState(false);
  
  // Mock students data
  const students: Student[] = [
    { id: 'S1001', name: 'Alex Johnson', initialViolations: [] },
    { id: 'S1002', name: 'Samantha Lee', initialViolations: [] },
    { id: 'S1003', name: 'Michael Chen', initialViolations: ['Phone detected'] },
    { id: 'S1004', name: 'Jessica Williams', initialViolations: [] },
    { id: 'S1005', name: 'David Garcia', initialViolations: [] },
    { id: 'S1006', name: 'Emily Davis', initialViolations: [] },
    { id: 'S1007', name: 'Robert Taylor', initialViolations: [] },
    { id: 'S1008', name: 'Sarah Miller', initialViolations: ['Looking away'] },
    { id: 'S1009', name: 'James Wilson', initialViolations: [] },
  ];
  
  // Simulate random violations
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      const shouldAddViolation = Math.random() < 0.3; // 30% chance to add a violation
      
      if (shouldAddViolation) {
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        const possibleViolations = [
          'Multiple faces detected', 
          'Phone detected', 
          'Looking away', 
          'Voice detected',
          'No face detected',
          'Unauthorized materials',
        ];
        const randomViolation = possibleViolations[Math.floor(Math.random() * possibleViolations.length)];
        
        const newViolation: Violation = {
          id: Date.now().toString(),
          studentName: randomStudent.name,
          studentId: randomStudent.id,
          violation: randomViolation,
          timestamp: new Date(),
        };
        
        setViolations(prev => [newViolation, ...prev]);
      }
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-medium">Introduction to Computer Science</h1>
            <Badge className="bg-green-100 text-green-700 border-0">Live</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 hidden md:flex"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? (
                <>
                  <PlayCircle className="h-4 w-4" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <PauseCircle className="h-4 w-4" />
                  <span>Pause</span>
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 hidden md:flex"
              onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
            >
              <Layout className="h-4 w-4" />
              <span>{layout === 'grid' ? 'List view' : 'Grid view'}</span>
            </Button>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>01:15:32</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{students.length}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <div className={cn(
                "h-2 w-2 rounded-full",
                violations.length > 0 ? "bg-destructive animate-pulse" : "bg-green-500"
              )} />
              <span className={violations.length > 0 ? "text-destructive font-medium" : "text-green-600"}>
                {violations.length > 0 ? `${violations.length} Alerts` : "All Clear"}
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-5 gap-6">
          {/* Video feeds (main content) */}
          <div className={cn(
            "col-span-5 lg:col-span-4",
            layout === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
          )}>
            {students.map((student) => (
              <FadeIn
                key={student.id}
                duration={400}
                className="animate-fade-in"
              >
                <VideoFeed
                  studentName={student.name}
                  studentId={student.id}
                  initialViolations={student.initialViolations}
                  onExpand={() => setExpandedStudent(student)}
                  className={layout === 'list' ? "flex flex-col sm:flex-row overflow-hidden" : ""}
                />
              </FadeIn>
            ))}
          </div>
          
          {/* Sidebar - Activity log */}
          <div className="col-span-5 lg:col-span-1">
            <div className="sticky top-20 border border-border rounded-lg overflow-hidden">
              <div className="p-3 bg-secondary/50 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Activity Log</h3>
                </div>
                
                {violations.length > 0 && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {violations.length}
                  </Badge>
                )}
              </div>
              
              <div className="p-3 max-h-[calc(100vh-180px)] overflow-y-auto">
                {violations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No violations detected</p>
                    <p>All students are compliant</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {violations.map((violation) => (
                      <div 
                        key={violation.id}
                        className="bg-white p-3 border border-border rounded-md shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{violation.studentName}</h4>
                          <Badge variant="outline" className="text-xs">ID: {violation.studentId}</Badge>
                        </div>
                        <p className="text-destructive text-sm mt-1 font-medium">{violation.violation}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {violation.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded student dialog */}
      <Dialog 
        open={expandedStudent !== null}
        onOpenChange={(open) => {
          if (!open) setExpandedStudent(null);
        }}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {expandedStudent && (
            <div>
              <VideoFeed
                studentName={expandedStudent.name}
                studentId={expandedStudent.id}
                initialViolations={expandedStudent.initialViolations}
                isExpanded={true}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Violation alerts - floating notifications */}
      <div className="fixed bottom-6 right-6 space-y-4 z-50 max-w-md">
        {violations.slice(0, 3).map((violation) => (
          <ViolationAlert
            key={violation.id}
            studentName={violation.studentName}
            studentId={violation.studentId}
            violation={violation.violation}
            timestamp={violation.timestamp}
            onDismiss={() => {
              setViolations(prev => prev.filter(v => v.id !== violation.id));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Monitoring;
