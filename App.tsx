
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SECTION_1 } from './constants';
import { generateSpeech } from './services/geminiService';
import { Scene } from './types';

// Components
import SceneHeader from './components/SceneHeader';
import VideoPlayer from './components/VideoPlayer';
import ControlPanel from './components/ControlPanel';
import SceneProgress from './components/SceneProgress';

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVoiceoverLoading, setIsVoiceoverLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const currentScene = SECTION_1.scenes[currentIdx];

  const stopCurrentAudio = useCallback(() => {
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
  }, []);

  const playVoiceover = async (text: string) => {
    stopCurrentAudio();
    setIsVoiceoverLoading(true);

    try {
      const audioBuffer = await generateSpeech(text);
      if (audioBuffer) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        const ctx = audioContextRef.current;
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        
        source.onended = () => {
          setIsPlaying(false); // Can auto-pause or keep playing
        };

        source.start();
        currentSourceRef.current = source;
      }
    } catch (err) {
      console.error("Error playing voiceover", err);
    } finally {
      setIsVoiceoverLoading(false);
    }
  };

  useEffect(() => {
    // Play voiceover whenever scene changes
    playVoiceover(currentScene.audioText);

    return () => stopCurrentAudio();
  }, [currentIdx]);

  const handleNext = () => {
    if (currentIdx < SECTION_1.scenes.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20">
        <span className="absolute top-10 left-10 text-6xl rotate-12">🍃</span>
        <span className="absolute bottom-20 right-10 text-6xl -rotate-12">🌿</span>
        <span className="absolute top-1/2 left-4 text-4xl rotate-45">✨</span>
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        <SceneHeader 
          title={SECTION_1.title} 
          currentTitle={currentScene.title} 
          emoji={currentScene.emoji}
        />

        <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black aspect-video flex items-center justify-center">
          <VideoPlayer 
            src={currentScene.videoUrl} 
            playing={isPlaying}
            subtitle={currentScene.subtitle}
            subtitleColor={currentScene.color}
          />
          
          {isVoiceoverLoading && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="kids-font text-white text-xl">The lession getting ready...</p>
            </div>
          )}
        </div>

        <SceneProgress 
          count={SECTION_1.scenes.length} 
          current={currentIdx} 
          colorClass={currentScene.color} 
        />

        <ControlPanel 
          onNext={handleNext} 
          onPrev={handlePrev} 
          canNext={currentIdx < SECTION_1.scenes.length - 1}
          canPrev={currentIdx > 0}
          onReplay={() => playVoiceover(currentScene.audioText)}
          isReplaying={isVoiceoverLoading}
        />
      </div>

      <footer className="mt-8 text-green-800 kids-font opacity-50">
        KidStudy: {SECTION_1.title}
      </footer>
    </div>
  );
}
