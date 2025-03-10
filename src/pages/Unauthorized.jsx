
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <FadeIn>
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">
            You don't have permission to access this page. This resource requires different role privileges.
          </p>
          <p className="mb-6 text-sm">
            {user ? (
              <>
                You are logged in as <span className="font-medium">{user.email}</span> with the role of{' '}
                <span className="font-medium">{user.role}</span>.
              </>
            ) : (
              'You are not currently logged in.'
            )}
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Unauthorized;
