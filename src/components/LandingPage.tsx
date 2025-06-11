import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Mic, FileText, Languages, Sparkles, ArrowRight } from 'lucide-react';
interface LandingPageProps {
  onGetStarted: () => void;
}
const LandingPage = ({
  onGetStarted
}: LandingPageProps) => {
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-emerald-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Clinic Logo and Name */}
            <div className="flex justify-center items-center mb-8 space-x-6">
              <img alt="EuCan Centre Logo" className="h-20 w-20 object-contain" src="/lovable-uploads/40396c28-3c81-4856-ba96-48f633c14239.png" />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-primary text-center">EuCan Centre</h2>
                <p className="text-sm text-muted-foreground">The European Canadian Centre for Psychological Services</p>
              </div>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              The Next Level of
              <br />
              Psychotherapy Documentation
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience the future of clinical documentation with our AI-powered platform. 
              Transform session notes into comprehensive, professional reports with intelligent 
              analysis and personalized treatment recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Intelligent Features for Modern Therapy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our smart platform combines cutting-edge AI with clinical expertise to revolutionize your practice
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-blue-800">Voice Recording</CardTitle>
              <CardDescription className="text-blue-600">
                Record sessions directly or upload audio files with automatic transcription
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-purple-800">AI-Powered Analysis</CardTitle>
              <CardDescription className="text-purple-600">
                Smart structuring into DAP format with diagnosis suggestions and treatment plans
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Languages className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-emerald-800">Bilingual Support</CardTitle>
              <CardDescription className="text-emerald-600">
                Full Arabic and English support with proper RTL formatting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-rose-50 to-rose-100/50 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-rose-800">Professional Reports</CardTitle>
              <CardDescription className="text-rose-600">
                Generate medical-grade Word documents with clinical formatting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-amber-100/50 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-amber-800">CBT & ACT Integration</CardTitle>
              <CardDescription className="text-amber-600">
                Intelligent suggestions for therapeutic techniques and worksheets
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100/50 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-indigo-800">Smart Preservation</CardTitle>
              <CardDescription className="text-indigo-600">
                All session details preserved and intelligently restructured
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-emerald-500/5 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the future of psychotherapy documentation and experience the power of intelligent clinical reporting
          </p>
          <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Start Creating Reports
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>;
};
export default LandingPage;