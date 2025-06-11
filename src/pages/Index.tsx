
import React, { useState } from 'react';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import SessionForm from '@/components/SessionForm';
import ReportGeneration from '@/components/ReportGeneration';

interface SessionData {
  patientName: string;
  therapistName: string;
  sessionDate: string;
  sessionNumber: number;
  sessionDuration: number;
  patientFileNumber: string;
  sessionSummary: string;
  agreedAssignments: string;
  nextSessionTopics: string;
  therapistComments: string;
  beckDepressionScore: number;
  beckAnxietyScore: number;
  hasOtherScale: boolean;
  otherScaleName: string;
  otherScaleScore: number;
  hasAdditionalScores: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'form' | 'report'>('landing');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: SessionData) => {
    setSessionData(data);
    setCurrentStep('report');
  };

  const handleNewReport = () => {
    setSessionData(null);
    setCurrentStep('form');
  };

  return (
    <div className="min-h-screen">
      {currentStep !== 'landing' && <Header />}
      
      {currentStep === 'landing' ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <main className="py-8">
            {currentStep === 'form' ? (
              <SessionForm onSubmit={handleFormSubmit} />
            ) : (
              sessionData && (
                <ReportGeneration 
                  sessionData={sessionData} 
                  onNewReport={handleNewReport}
                />
              )
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Index;
