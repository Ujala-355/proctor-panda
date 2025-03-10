
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container px-4 py-32 sm:py-40 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <FadeIn direction="up" delay={100}>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-50 text-primary-foreground text-xs font-medium tracking-wide">
                Next-Generation Exam Proctoring
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={200}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Secure Assessments with <br className="hidden sm:block" />
                <span className="text-primary relative">
                  Intelligent Monitoring
                  <span className="absolute -bottom-1 left-0 w-full h-[8px] bg-blue-100 -z-10 transform skew-x-12"></span>
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={300}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
                ProctorPanda provides real-time monitoring for online exams, 
                ensuring academic integrity through advanced detection 
                capabilities and intuitive monitoring interfaces.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/login">
                  <Button size={isMobile ? "default" : "lg"} className="font-medium min-w-[160px]">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" size={isMobile ? "default" : "lg"} className="font-medium min-w-[160px]">
                  Watch Demo
                </Button>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={600}>
            <div className="relative mx-auto max-w-4xl glass-card rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=2070&auto=format&fit=crop" 
                alt="ProctorPanda Dashboard" 
                className="w-full h-auto object-cover transition-transform hover:scale-[1.01] duration-700 ease-in-out"
              />
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {[
              {
                title: "Real-time Monitoring",
                description: "Track candidate activities with live video feeds and instant alerts for suspicious behavior.",
                delay: 200
              },
              {
                title: "AI-powered Detection",
                description: "Advanced algorithms identify potential violations like phone usage, multiple people, or screen sharing.",
                delay: 400
              },
              {
                title: "Seamless Experience",
                description: "Easy to use for both proctors and students with minimal setup and intuitive controls.",
                delay: 600
              }
            ].map((feature, index) => (
              <FadeIn key={index} delay={feature.delay} direction="up">
                <div className="glass-card p-6 rounded-lg h-full">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-primary font-semibold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
