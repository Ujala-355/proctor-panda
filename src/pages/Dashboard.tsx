
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ExamCard from '@/components/ExamCard';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock exam data
  const exams = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      date: 'Today',
      time: '10:00 AM',
      duration: '2 hours',
      participants: 35,
      status: 'active',
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      date: 'Today',
      time: '2:00 PM',
      duration: '3 hours',
      participants: 28,
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      date: 'Tomorrow',
      time: '9:00 AM',
      duration: '2.5 hours',
      participants: 42,
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Software Engineering Principles',
      date: 'Yesterday',
      time: '11:00 AM',
      duration: '1.5 hours',
      participants: 31,
      status: 'completed',
    },
    {
      id: '5',
      title: 'Artificial Intelligence Foundations',
      date: '2 days ago',
      time: '3:00 PM',
      duration: '2 hours',
      participants: 26,
      status: 'completed',
    },
  ];
  
  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeExams = filteredExams.filter(exam => exam.status === 'active');
  const upcomingExams = filteredExams.filter(exam => exam.status === 'upcoming');
  const completedExams = filteredExams.filter(exam => exam.status === 'completed');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4">
          <FadeIn>
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-muted-foreground mt-1">
                Manage and monitor your examination sessions
              </p>
            </header>
          </FadeIn>
          
          <FadeIn delay={100}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exams..."
                  className="pl-9 max-w-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 self-end md:self-auto">
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Exam</span>
                </Button>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            {activeExams.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Active Now
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeExams.map((exam) => (
                    <FadeIn key={exam.id} delay={300} direction="up">
                      <ExamCard {...exam} />
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>
          
          <FadeIn delay={300}>
            <div>
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-6">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  {upcomingExams.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No upcoming exams found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingExams.map((exam) => (
                        <FadeIn key={exam.id} delay={400} direction="up">
                          <ExamCard {...exam} />
                        </FadeIn>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed">
                  {completedExams.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No completed exams found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {completedExams.map((exam) => (
                        <FadeIn key={exam.id} delay={400} direction="up">
                          <ExamCard {...exam} />
                        </FadeIn>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
