
import React from 'react';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Brain className="h-8 w-8 text-primary" />
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-foreground">
                Psychotherapy Session Report Generator
              </h1>
              <div className="flex items-center space-x-4">
                <img 
                  src="/lovable-uploads/6fd042bb-92b5-42be-b506-fa94b8263314.png" 
                  alt="EuCan Centre Logo" 
                  className="h-10 w-10 object-contain"
                />
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">EuCan Centre</div>
                  <div className="text-xs">The European Canadian Centre for Psychological Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
