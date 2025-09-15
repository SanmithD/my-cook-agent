"use client";

import { useRef, useState } from "react";

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

export const useSpeechRecognition = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const isSupported = () => {
    const gw = window as unknown as Record<string, unknown>;
    return (
      typeof gw.SpeechRecognition === "function" ||
      typeof gw.webkitSpeechRecognition === "function"
    );
  };

  const startListening = () => {
    if (!isSupported()) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const gw = window as unknown as Record<string, unknown>;
    const RecCtor = (gw.SpeechRecognition ??
      gw.webkitSpeechRecognition) as SpeechRecognitionConstructor;

    if (typeof RecCtor !== "function") {
      alert("Speech recognition is not available.");
      return;
    }

    const recognition = new RecCtor();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal && result[0]?.transcript) {
          finalTranscript += result[0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript((prev) => prev + finalTranscript + " ");
      }
    };

    recognition.onerror = (e: Event) => {
      console.error("Speech recognition error:", e);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
    }
  };

  return { listening, transcript, startListening, stopListening, setTranscript };
};
