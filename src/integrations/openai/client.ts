const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface SessionData {
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

export interface GeneratedReport {
  dapReport: {
    data: string;
    assessment: string;
    plan: string;
  };
  suggestedDiagnosis: string;
  nextSessionGoals: string[];
  recommendedTechniques: string[];
  suggestedWorksheets: string[];
}

export async function fetchReportFromOpenAI(sessionData: SessionData): Promise<GeneratedReport> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set');
  }

  const messages = [
    {
      role: 'system',
      content:
        'You are a helpful assistant that generates psychotherapy session reports in JSON format. ' +
        'Return valid JSON that matches this TypeScript interface: ' +
        '{ dapReport: { data: string; assessment: string; plan: string; }, suggestedDiagnosis: string; nextSessionGoals: string[]; recommendedTechniques: string[]; suggestedWorksheets: string[]; }.'
    },
    {
      role: 'user',
      content: `Create a report for this session data: ${JSON.stringify(sessionData)}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${text}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('No content received from OpenAI');
  }

  try {
    return JSON.parse(content) as GeneratedReport;
  } catch (err) {
    throw new Error('Failed to parse OpenAI response as JSON');
  }
}
