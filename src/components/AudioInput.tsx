
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioInputProps {
  onAudioRecorded: (text: string) => void;
  placeholder?: string;
}

const AudioInput = ({ onAudioRecorded, placeholder = "Click to record audio" }: AudioInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        
        // Simulate speech-to-text conversion (in real app, you'd use a service)
        setTimeout(() => {
          onAudioRecorded("Transcribed audio content would appear here...");
        }, 1000);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <Button
          type="button"
          variant={isRecording ? "destructive" : "outline"}
          size="sm"
          onClick={isRecording ? stopRecording : startRecording}
          className="flex items-center space-x-2"
        >
          {isRecording ? (
            <>
              <Square className="h-4 w-4" />
              <span>Stop ({formatTime(recordingTime)})</span>
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              <span>Record</span>
            </>
          )}
        </Button>

        {audioBlob && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={isPlaying ? pauseAudio : playAudio}
            className="flex items-center space-x-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Play</span>
              </>
            )}
          </Button>
        )}
      </div>

      {audioBlob && (
        <audio
          ref={audioRef}
          src={URL.createObjectURL(audioBlob)}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      {isRecording && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className={cn("h-2 w-2 rounded-full bg-red-500", "animate-pulse")} />
          <span>Recording... {formatTime(recordingTime)}</span>
        </div>
      )}
    </div>
  );
};

export default AudioInput;
