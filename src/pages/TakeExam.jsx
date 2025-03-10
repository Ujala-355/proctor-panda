
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

const TakeExam = () => {
  const { examId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [answers, setAnswers] = useState({});
  const [webcamAllowed, setWebcamAllowed] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [violations, setViolations] = useState([]);

  // Mock exam data
  const examData = {
    id: examId,
    title: 'Introduction to Computer Science',
    duration: '2 hours',
    instructions: 'Please answer all questions. You can navigate between sections using the tabs. Your webcam must remain on during the exam.',
    sections: [
      {
        id: 'section1',
        title: 'Multiple Choice',
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            text: 'What does CPU stand for?',
            options: [
              'Central Processing Unit',
              'Computer Personal Unit',
              'Central Process Utility',
              'Central Processor Unifier'
            ]
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            text: 'Which of the following is not a programming language?',
            options: [
              'Java',
              'Python',
              'Microsoft Excel',
              'JavaScript'
            ]
          },
          {
            id: 'q3',
            type: 'multiple-choice',
            text: 'What is the main function of an operating system?',
            options: [
              'To provide a user interface',
              'To manage hardware resources',
              'To run applications',
              'All of the above'
            ]
          }
        ]
      },
      {
        id: 'section2',
        title: 'Short Answer',
        questions: [
          {
            id: 'q4',
            type: 'short-answer',
            text: 'Explain the difference between RAM and ROM.'
          },
          {
            id: 'q5',
            type: 'short-answer',
            text: 'Describe the concept of recursion in programming.'
          }
        ]
      },
      {
        id: 'section3',
        title: 'Essay',
        questions: [
          {
            id: 'q6',
            type: 'essay',
            text: 'Discuss the impact of artificial intelligence on modern society and potential ethical concerns.'
          }
        ]
      }
    ]
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle timer countdown
  useEffect(() => {
    if (!examStarted || examSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [examStarted, examSubmitted]);

  // Handle webcam permission
  const requestWebcamAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamAllowed(true);
      toast({
        title: "Webcam access granted",
        description: "You can now start the exam.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Webcam access required",
        description: "You must allow webcam access to take the exam.",
      });
    }
  };

  // Handle exam start
  const handleStartExam = () => {
    if (webcamAllowed) {
      setExamStarted(true);
      toast({
        title: "Exam started",
        description: `You have ${examData.duration} to complete the exam.`,
      });
      
      // Simulate proctoring with random violations
      const proctorInterval = setInterval(() => {
        const randomCheck = Math.random();
        if (randomCheck < 0.1) { // 10% chance of violation
          const possibleViolations = [
            'Multiple faces detected',
            'Looking away from screen',
            'Phone detected',
            'Suspicious movement'
          ];
          const violation = possibleViolations[Math.floor(Math.random() * possibleViolations.length)];
          
          setViolations(prev => [...prev, { id: Date.now(), text: violation }]);
          
          toast({
            variant: "destructive",
            title: "Proctoring Alert",
            description: violation,
          });
        }
      }, 30000); // Check every 30 seconds
      
      return () => clearInterval(proctorInterval);
    } else {
      requestWebcamAccess();
    }
  };

  // Handle answer updates
  const updateAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Handle exam submission
  const handleSubmitExam = () => {
    setExamSubmitted(true);
    toast({
      title: "Exam submitted",
      description: "Your answers have been recorded.",
    });
    
    // In a real app, you would send the answers to a server here
    console.log("Submitted answers:", answers);
    
    // Redirect after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (examSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 pb-12">
          <div className="container px-4 max-w-3xl mx-auto">
            <FadeIn>
              <Card className="p-8 text-center">
                <CardHeader>
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <CardTitle className="text-2xl">Exam Submitted Successfully</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Thank you for completing the {examData.title} exam. Your responses have been recorded.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => navigate('/dashboard')}>
                    Return to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          </div>
        </main>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 pb-12">
          <div className="container px-4 max-w-3xl mx-auto">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{examData.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Instructions:</h3>
                    <p className="text-sm text-muted-foreground">{examData.instructions}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Exam Details:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p>{examData.duration}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Questions:</span>
                        <p>{examData.sections.reduce((acc, section) => acc + section.questions.length, 0)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sections:</span>
                        <p>{examData.sections.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-md ${webcamAllowed ? 'bg-green-50' : 'bg-amber-50'}`}>
                    <h3 className="font-medium mb-2 flex items-center">
                      {webcamAllowed ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                      )}
                      Webcam Permission
                    </h3>
                    <p className="text-sm mb-4">
                      {webcamAllowed 
                        ? "Webcam access has been granted. You are ready to start the exam."
                        : "This exam requires webcam access for proctoring. Please grant permission when prompted."}
                    </p>
                    {!webcamAllowed && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={requestWebcamAccess}
                      >
                        Grant Webcam Access
                      </Button>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleStartExam}
                    disabled={!webcamAllowed}
                  >
                    Start Exam
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container px-4">
          <FadeIn>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              {/* Main exam content */}
              <div className="w-full lg:w-3/4 space-y-6">
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <CardTitle>{examData.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className={`font-mono ${timeLeft < 300 ? 'text-red-500 font-bold' : ''}`}>
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                    </div>
                    
                    <Tabs defaultValue={examData.sections[currentSection].id} onValueChange={(value) => {
                      const index = examData.sections.findIndex(section => section.id === value);
                      setCurrentSection(index);
                    }}>
                      <TabsList className="w-full">
                        {examData.sections.map((section, index) => (
                          <TabsTrigger key={section.id} value={section.id} className="flex-1">
                            {section.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    {examData.sections.map((section) => (
                      <TabsContent key={section.id} value={section.id} className="space-y-8 mt-0">
                        {section.questions.map((question, qIndex) => (
                          <div key={question.id} className="border border-border p-4 rounded-md">
                            <h3 className="font-medium mb-4">
                              {qIndex + 1}. {question.text}
                            </h3>
                            
                            {question.type === 'multiple-choice' && (
                              <RadioGroup 
                                value={answers[question.id] || ''} 
                                onValueChange={(value) => updateAnswer(question.id, value)}
                              >
                                <div className="space-y-3">
                                  {question.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <RadioGroupItem value={option} id={`${question.id}-option-${index}`} />
                                      <Label htmlFor={`${question.id}-option-${index}`}>{option}</Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            )}
                            
                            {question.type === 'short-answer' && (
                              <Textarea 
                                placeholder="Enter your answer..."
                                value={answers[question.id] || ''}
                                onChange={(e) => updateAnswer(question.id, e.target.value)}
                                className="min-h-[100px]"
                              />
                            )}
                            
                            {question.type === 'essay' && (
                              <Textarea 
                                placeholder="Enter your answer..."
                                value={answers[question.id] || ''}
                                onChange={(e) => updateAnswer(question.id, e.target.value)}
                                className="min-h-[200px]"
                              />
                            )}
                          </div>
                        ))}
                      </TabsContent>
                    ))}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if (currentSection > 0) {
                          setCurrentSection(currentSection - 1);
                        }
                      }}
                      disabled={currentSection === 0}
                    >
                      Previous Section
                    </Button>
                    
                    {currentSection < examData.sections.length - 1 ? (
                      <Button 
                        onClick={() => {
                          if (currentSection < examData.sections.length - 1) {
                            setCurrentSection(currentSection + 1);
                          }
                        }}
                      >
                        Next Section
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          if (confirm('Are you sure you want to submit your exam? This action cannot be undone.')) {
                            handleSubmitExam();
                          }
                        }}
                      >
                        Submit Exam
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
              
              {/* Proctoring sidebar */}
              <div className="w-full lg:w-1/4">
                <Card className="sticky top-24">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Proctoring Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-muted rounded-md relative overflow-hidden">
                      <video 
                        id="webcam-feed" 
                        className="w-full h-full object-cover"
                        poster="https://images.unsplash.com/photo-1612980932665-cf7ad278a614?q=80&w=1171&auto=format&fit=crop"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        Live
                      </div>
                    </div>
                    
                    {violations.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-destructive flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Violations Detected
                        </h4>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {violations.map((violation) => (
                            <div key={violation.id} className="bg-red-50 p-2 rounded-md text-xs text-destructive">
                              {violation.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      <p>Please ensure:</p>
                      <ul className="list-disc pl-4 space-y-1 mt-1">
                        <li>You remain in view of the camera</li>
                        <li>No other people are visible</li>
                        <li>No phones or unauthorized materials</li>
                        <li>No talking or background noise</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default TakeExam;
