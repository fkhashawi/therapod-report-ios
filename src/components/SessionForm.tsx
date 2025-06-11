
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AudioInput from './AudioInput';
import { Calendar, FileText, User, Clock, Hash } from 'lucide-react';

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

interface SessionFormProps {
  onSubmit: (data: SessionData) => void;
}

const SessionForm = ({ onSubmit }: SessionFormProps) => {
  const [formData, setFormData] = useState<SessionData>({
    patientName: '',
    therapistName: '',
    sessionDate: '',
    sessionNumber: 1,
    sessionDuration: 50,
    patientFileNumber: '',
    sessionSummary: '',
    agreedAssignments: '',
    nextSessionTopics: '',
    therapistComments: '',
    beckDepressionScore: 0,
    beckAnxietyScore: 0,
    hasOtherScale: false,
    otherScaleName: '',
    otherScaleScore: 0,
    hasAdditionalScores: false,
  });

  const handleInputChange = (field: keyof SessionData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Session Information</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Please fill out the session details below. You can type information manually or use the audio recording feature for voice input.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Session Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Basic Session Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="patientName" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Patient Name or Code</span>
              </Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                placeholder="Enter patient name or code"
                required
              />
              <AudioInput
                onAudioRecorded={(text) => handleInputChange('patientName', text)}
                placeholder="Record patient name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="therapistName">Therapist Name</Label>
              <Input
                id="therapistName"
                value={formData.therapistName}
                onChange={(e) => handleInputChange('therapistName', e.target.value)}
                placeholder="Enter therapist name"
                required
              />
              <AudioInput
                onAudioRecorded={(text) => handleInputChange('therapistName', text)}
                placeholder="Record therapist name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionDate" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Session Date</span>
              </Label>
              <Input
                id="sessionDate"
                type="date"
                value={formData.sessionDate}
                onChange={(e) => handleInputChange('sessionDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionNumber" className="flex items-center space-x-2">
                <Hash className="h-4 w-4" />
                <span>Session Number</span>
              </Label>
              <Input
                id="sessionNumber"
                type="number"
                value={formData.sessionNumber}
                onChange={(e) => handleInputChange('sessionNumber', parseInt(e.target.value))}
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionDuration" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Session Duration (minutes)</span>
              </Label>
              <Input
                id="sessionDuration"
                type="number"
                value={formData.sessionDuration}
                onChange={(e) => handleInputChange('sessionDuration', parseInt(e.target.value))}
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientFileNumber">Patient File Number</Label>
              <Input
                id="patientFileNumber"
                value={formData.patientFileNumber}
                onChange={(e) => handleInputChange('patientFileNumber', e.target.value)}
                placeholder="Enter patient file number"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Session Content */}
        <Card>
          <CardHeader>
            <CardTitle>Session Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sessionSummary">Session Summary</Label>
              <Textarea
                id="sessionSummary"
                value={formData.sessionSummary}
                onChange={(e) => handleInputChange('sessionSummary', e.target.value)}
                placeholder="Enter detailed session summary..."
                rows={6}
                required
              />
              <AudioInput
                onAudioRecorded={(text) => handleInputChange('sessionSummary', text)}
                placeholder="Record session summary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agreedAssignments">Agreed-upon Assignments</Label>
              <Textarea
                id="agreedAssignments"
                value={formData.agreedAssignments}
                onChange={(e) => handleInputChange('agreedAssignments', e.target.value)}
                placeholder="Enter homework or assignments..."
                rows={3}
              />
              <AudioInput
                onAudioRecorded={(text) => handleInputChange('agreedAssignments', text)}
                placeholder="Record assignments"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextSessionTopics">Topics to Discuss in Next Session</Label>
              <Textarea
                id="nextSessionTopics"
                value={formData.nextSessionTopics}
                onChange={(e) => handleInputChange('nextSessionTopics', e.target.value)}
                placeholder="Enter topics for next session..."
                rows={3}
              />
              <AudioInput
                onAudioRecorded={(text) => handleInputChange('nextSessionTopics', text)}
                placeholder="Record next session topics"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="therapistComments">Other Therapist Comments</Label>
              <Textarea
                id="therapistComments"
                value={formData.therapistComments}
                onChange={(e) => handleInputChange('therapistComments', e.target.value)}
                placeholder="Enter additional comments..."
                rows={3}
              />
              <AudioInput
                onAudioRecorded={(text) => handleInputChange('therapistComments', text)}
                placeholder="Record comments"
              />
            </div>
          </CardContent>
        </Card>

        {/* Assessment Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="beckDepressionScore">Beck Depression Scale Score</Label>
                <Input
                  id="beckDepressionScore"
                  type="number"
                  value={formData.beckDepressionScore}
                  onChange={(e) => handleInputChange('beckDepressionScore', parseInt(e.target.value) || 0)}
                  min="0"
                  max="63"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beckAnxietyScore">Beck Anxiety Scale Score</Label>
                <Input
                  id="beckAnxietyScore"
                  type="number"
                  value={formData.beckAnxietyScore}
                  onChange={(e) => handleInputChange('beckAnxietyScore', parseInt(e.target.value) || 0)}
                  min="0"
                  max="63"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasOtherScale"
                  checked={formData.hasOtherScale}
                  onCheckedChange={(checked) => handleInputChange('hasOtherScale', checked)}
                />
                <Label htmlFor="hasOtherScale">Was another scale used?</Label>
              </div>

              {formData.hasOtherScale && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="otherScaleName">Name of the Scale</Label>
                    <Input
                      id="otherScaleName"
                      value={formData.otherScaleName}
                      onChange={(e) => handleInputChange('otherScaleName', e.target.value)}
                      placeholder="Enter scale name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherScaleScore">Score on that Scale</Label>
                    <Input
                      id="otherScaleScore"
                      type="number"
                      value={formData.otherScaleScore}
                      onChange={(e) => handleInputChange('otherScaleScore', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasAdditionalScores"
                  checked={formData.hasAdditionalScores}
                  onCheckedChange={(checked) => handleInputChange('hasAdditionalScores', checked)}
                />
                <Label htmlFor="hasAdditionalScores">Any other scores?</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" size="lg" className="px-8">
            Generate Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
