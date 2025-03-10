
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const statusStyles = {
  upcoming: {
    color: 'bg-blue-100 text-blue-700',
    proctor: { action: 'Prepare' },
    candidate: { action: 'View Details' }
  },
  active: {
    color: 'bg-green-100 text-green-700',
    proctor: { action: 'Monitor Now' },
    candidate: { action: 'Take Exam' }
  },
  completed: {
    color: 'bg-gray-100 text-gray-700',
    proctor: { action: 'View Results' },
    candidate: { action: 'View Results' }
  },
};

const ExamCard = ({ id, title, date, time, duration, participants, status }) => {
  const { user } = useAuth();
  const userRole = user?.role || 'candidate';
  
  const getActionLink = () => {
    if (userRole === 'proctor') {
      return status === 'active' ? `/monitoring/${id}` : `/dashboard`;
    } else {
      return status === 'active' ? `/exam/${id}` : `/dashboard`;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-border hover:border-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-2">
          <div className={`absolute inset-0 ${status === 'active' ? 'bg-primary' : status === 'upcoming' ? 'bg-blue-200' : 'bg-gray-200'}`}></div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium text-lg">{title}</h3>
          <Badge variant="secondary" className={statusStyles[status].color}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{time} ({duration})</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            <span>{participants} Participants</span>
          </div>
        </div>
        
        <Link to={getActionLink()}>
          <Button 
            variant={status === 'active' ? 'default' : 'outline'} 
            className="w-full"
          >
            {statusStyles[status][userRole].action}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ExamCard;
