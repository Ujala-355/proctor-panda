
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'You have been successfully logged in.',
      });
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Login error:', err);
    }
  };

  return (
    <div className="glass-card p-8 rounded-xl w-full max-w-md shadow-sm border border-border">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === 'login' ? 'Welcome back' : 'Create an account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 w-full"
              placeholder="Enter your password"
              required
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="text-destructive text-sm py-2">{error}</div>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Processing...' : mode === 'login' ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        {mode === 'login' ? (
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto font-medium" onClick={() => navigate('/register')}>
              Sign up
            </Button>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto font-medium" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
