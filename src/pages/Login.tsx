
import { Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { Eye } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <FadeIn direction="up">
            <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-xl mb-10">
              <Eye className="h-6 w-6" />
              <span>ProctorPanda</span>
            </Link>
            
            <AuthForm mode="login" />
          </FadeIn>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:flex flex-1 bg-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 to-white/40 z-10" />
        
        <FadeIn direction="left" className="relative z-20 flex flex-col items-start justify-center h-full p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">Secure your exams with confidence</h2>
            <p className="text-muted-foreground mb-6">
              ProctorPanda provides advanced AI-powered monitoring to ensure academic integrity 
              while maintaining a smooth experience for students and proctors alike.
            </p>
            
            <div className="space-y-4">
              {[
                "Real-time monitoring with AI assistance",
                "Instant alerts for suspicious behavior",
                "Comprehensive recording and reporting",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2290&auto=format&fit=crop"
          alt="Students studying" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
