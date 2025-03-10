
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-16">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-xl mb-4">
              <Eye className="h-6 w-6" />
              <span>ProctorPanda</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Advanced proctoring solution for academic institutions and certification providers, 
              ensuring exam integrity and a seamless testing experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase text-muted-foreground tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Case Studies', 'Documentation'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase text-muted-foreground tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ProctorPanda. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
