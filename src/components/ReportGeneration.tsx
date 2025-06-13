import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, Download, Globe, Cloud, RotateCcw, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { fetchReportFromOpenAI, SessionData, GeneratedReport } from '@/integrations/openai/client';


interface ReportGenerationProps {
  sessionData: SessionData;
  onNewReport: () => void;
}

const ReportGeneration = ({ sessionData, onNewReport }: ReportGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const report = await fetchReportFromOpenAI(sessionData);
      setGeneratedReport(report);
      setShowReport(true);
      toast.success('Report generated successfully!');
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateReport = () => {
    setShowReport(false);
    generateReport();
  };

  const generateWordDocument = (content: string, language: 'arabic' | 'english') => {
    // Create a proper Word document structure
    const wordContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Psychotherapy Session Report</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .section { margin-bottom: 25px; }
          .section-title { font-weight: bold; font-size: 16px; color: #2563eb; margin-bottom: 10px; }
          .content { margin-left: 10px; }
          .arabic { direction: rtl; text-align: right; }
        </style>
      </head>
      <body ${language === 'arabic' ? 'class="arabic"' : ''}>
        <div class="header">
          <h1>EuCan Centre - Psychotherapy Session Report</h1>
          <p>The European Canadian Centre for Psychological Services</p>
          <p>Patient: ${sessionData.patientName} | Session #${sessionData.sessionNumber} | Date: ${sessionData.sessionDate}</p>
        </div>
        
        <div class="section">
          <div class="section-title">${language === 'arabic' ? 'البيانات' : 'Data'}</div>
          <div class="content">${content}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${language === 'arabic' ? 'التقييم' : 'Assessment'}</div>
          <div class="content">${generatedReport?.dapReport.assessment}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${language === 'arabic' ? 'الخطة' : 'Plan'}</div>
          <div class="content">${generatedReport?.dapReport.plan}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${language === 'arabic' ? 'التشخيص المقترح' : 'Suggested Diagnosis'}</div>
          <div class="content">${generatedReport?.suggestedDiagnosis}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${language === 'arabic' ? 'أهداف الجلسة القادمة' : 'Next Session Goals'}</div>
          <div class="content">
            <ul>
              ${generatedReport?.nextSessionGoals.map(goal => `<li>${goal}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">${language === 'arabic' ? 'التقنيات الموصى بها' : 'Recommended Techniques'}</div>
          <div class="content">
            <ul>
              ${generatedReport?.recommendedTechniques.map(technique => `<li>${technique}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">${language === 'arabic' ? 'أوراق العمل المقترحة' : 'Suggested Worksheets'}</div>
          <div class="content">
            <ul>
              ${generatedReport?.suggestedWorksheets.map(worksheet => `<li>${worksheet}</li>`).join('')}
            </ul>
          </div>
        </div>
      </body>
      </html>
    `;

    return wordContent;
  };

  const exportToWord = (language: 'arabic' | 'english') => {
    if (!generatedReport) {
      toast.error("No report data available");
      return;
    }

    try {
      const wordContent = generateWordDocument(generatedReport.dapReport.data, language);
      
      // Create blob with proper MIME type for Word document
      const blob = new Blob([wordContent], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `session-report-${sessionData.patientName}-${sessionData.sessionDate}-${language}.doc`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast.success(`${language === 'arabic' ? 'Arabic' : 'English'} report downloaded successfully!`);
    } catch (error) {
      console.error('Error generating Word document:', error);
      toast.error("Failed to generate Word document. Please try again.");
    }
  };

  const uploadToCloud = async () => {
    if (!generatedReport) {
      toast.error("No report data available");
      return;
    }

    try {
      // Generate the report content
      const reportData = {
        patient_name: sessionData.patientName,
        therapist_name: sessionData.therapistName,
        session_date: sessionData.sessionDate,
        session_number: sessionData.sessionNumber,
        dap_report: generatedReport.dapReport,
        suggested_diagnosis: generatedReport.suggestedDiagnosis,
        next_session_goals: generatedReport.nextSessionGoals,
        recommended_techniques: generatedReport.recommendedTechniques,
        suggested_worksheets: generatedReport.suggestedWorksheets,
        created_at: new Date().toISOString()
      };

      // Create a JSON file for upload
      const jsonContent = JSON.stringify(reportData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      
      // Generate unique filename
      const fileName = `session-report-${sessionData.patientName}-${sessionData.sessionDate}-${Date.now()}.json`;
      
      // Upload to Supabase Storage (you'll need to create a bucket first)
      const { data, error } = await supabase.storage
        .from('reports')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      console.log('File uploaded successfully:', data);
      toast.success("Report uploaded to cloud successfully!");
      
    } catch (error) {
      console.error('Error uploading to cloud:', error);
      
      // Fallback: save to local storage as backup
      try {
        const reportData = JSON.stringify({
          patient_name: sessionData.patientName,
          session_date: sessionData.sessionDate,
          report: generatedReport,
          uploaded_at: new Date().toISOString()
        });
        
        localStorage.setItem(`report_${sessionData.patientName}_${sessionData.sessionDate}`, reportData);
        toast.success("Report saved locally as backup!");
      } catch (localError) {
        console.error('Error saving locally:', localError);
        toast.error("Failed to upload to cloud. Please try again.");
      }
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Generating Your Report</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Our AI is analyzing your session data and creating a comprehensive DAP report with clinical recommendations...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <p className="text-destructive text-center">{error}</p>
            <Button onClick={generateReport}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showReport || !generatedReport) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <h2 className="text-3xl font-bold text-foreground">Report Generated</h2>
        </div>
        <p className="text-muted-foreground">
          Review the generated report below. You can regenerate it if needed or proceed to export.
        </p>
      </div>

      {/* DAP Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>DAP Clinical Report</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-700">Data</h4>
            <p className="text-sm leading-relaxed">{generatedReport.dapReport.data}</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-700">Assessment</h4>
            <p className="text-sm leading-relaxed">{generatedReport.dapReport.assessment}</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-700">Plan</h4>
            <p className="text-sm leading-relaxed">{generatedReport.dapReport.plan}</p>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Suggested Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg text-blue-600">{generatedReport.suggestedDiagnosis}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Scores Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Beck Depression Scale:</span>
                <span className="font-medium">{sessionData.beckDepressionScore}</span>
              </div>
              <div className="flex justify-between">
                <span>Beck Anxiety Scale:</span>
                <span className="font-medium">{sessionData.beckAnxietyScore}</span>
              </div>
              {sessionData.hasOtherScale && (
                <div className="flex justify-between">
                  <span>{sessionData.otherScaleName}:</span>
                  <span className="font-medium">{sessionData.otherScaleScore}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Next Session Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {generatedReport.nextSessionGoals.map((goal, index) => (
                <li key={index} className="text-sm flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Techniques</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {generatedReport.recommendedTechniques.map((technique, index) => (
                <li key={index} className="text-sm flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{technique}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Worksheets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {generatedReport.suggestedWorksheets.map((worksheet, index) => (
                <li key={index} className="text-sm flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{worksheet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Are you satisfied with the summary?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" onClick={regenerateReport} className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>Regenerate Report</span>
            </Button>
            
            <Button onClick={() => exportToWord('arabic')} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Arabic Report</span>
            </Button>
            
            <Button variant="outline" onClick={() => exportToWord('english')} className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Export English Report</span>
            </Button>
            
            <Button variant="outline" onClick={uploadToCloud} className="flex items-center space-x-2">
              <Cloud className="h-4 w-4" />
              <span>Upload to Cloud</span>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={onNewReport}>
              Generate Another Report
            </Button>
            <Button variant="destructive" onClick={() => window.close()}>
              Quit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGeneration;
