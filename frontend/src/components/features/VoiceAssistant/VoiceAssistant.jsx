import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2, X, AudioLines } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { processVoice } from '../../../services/voiceService';

export default function VoiceAssistant() {
  const { user, isAuthenticated } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Assalam o Alaikum! Main Sana hoon, aapki AI receptionist. Main aapki kaise madad kar sakti hoon?' }
  ]);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(new Audio());
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  useEffect(() => {
    return () => {
      audioPlayerRef.current.pause();
    };
  }, []);

  if (!isAuthenticated) return null; // Show only for logged in users

  const toggleOpen = () => setIsOpen(!isOpen);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = handleStop;
      mediaRecorderRef.current.start();
      setIsRecording(true);
      if (audioPlayerRef.current) audioPlayerRef.current.pause();
    } catch (err) {
      console.error('Microphone API Error:', err);
      // Mock it visually if blocked (useful for local dev without https)
      alert("Microphone Access Blocked. Check your browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    setIsProcessing(true);

    try {
      // Make real API call
      const result = await processVoice(audioBlob, user?.email);
      
      setMessages(prev => [
        ...prev, 
        { role: 'user', text: result.transcript },
        { role: 'assistant', text: result.reply }
      ]);

      if (result.audio_url) {
        // Build correct absolute URL (dev fallback for VITE_API_URL or localhost format)
        let fullAudioUrl = result.audio_url;
        if (!fullAudioUrl.startsWith('http')) {
           const baseUrl = import.meta.env.VITE_API_URL 
             ? import.meta.env.VITE_API_URL.replace('/api', '') 
             : 'http://localhost:8000';
           fullAudioUrl = `${baseUrl}${fullAudioUrl}`;
        }
        audioPlayerRef.current.src = fullAudioUrl;
        audioPlayerRef.current.play().catch(e => console.error('Audio play blocked:', e));
      }
    } catch (error) {
      console.error('Processing error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Maaf kijiye, mujhe clear awaz nahi aai. Server se connect nahi ho pa raha.' }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`voice-assistant-wrapper ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="va-trigger" onClick={toggleOpen}>
          <div className="mic-icon-wrapper">
             <Mic size={28} color="white" />
          </div>
        </button>
      )}

      {isOpen && (
        <div className="va-panel glass-panel animate-enter">
          <div className="va-header">
            <div className="va-title">
              <AudioLines className="va-icon-pulse" size={20} />
              <span>Sana (Voice AI)</span>
            </div>
            <button className="va-close" onClick={toggleOpen}><X size={20} /></button>
          </div>

          <div className="va-chat-window">
             {messages.map((msg, i) => (
               <div key={i} className={`va-message ${msg.role}`}>
                 <div className="va-bubble">
                   {msg.text || (msg.role === 'user' ? '(Inaudible voice request)' : '...')}
                 </div>
               </div>
             ))}
             {isProcessing && (
               <div className="va-message assistant">
                 <div className="va-bubble processing">
                   <Loader2 className="spin" size={16} /> Sana is thinking...
                 </div>
               </div>
             )}
             <div ref={chatEndRef} />
          </div>

          <div className="va-controls">
            {!isRecording ? (
              <button 
                className="btn btn-primary va-record-btn start" 
                onClick={startRecording}
                disabled={isProcessing}
              >
                <Mic size={20} /> Tap to Speak
              </button>
            ) : (
              <button 
                className="btn btn-danger va-record-btn stop pulse-shadow" 
                onClick={stopRecording}
              >
                <MicOff size={20} /> Stop Recording
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
