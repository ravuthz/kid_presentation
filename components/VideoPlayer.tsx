
import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  playing: boolean;
  subtitle: string;
  subtitleColor: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, playing, subtitle, subtitleColor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play().catch(() => {
          // Ignore play-interrupt errors
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [playing, src]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted // Muted because we provide our own AI voiceover
        playsInline
      />
      
      {/* Subtitle Overlay */}
      <div className="absolute bottom-10 left-0 w-full px-6 flex justify-center">
        <div className="bg-black/60 backdrop-blur-md px-8 py-4 rounded-2xl border-4 border-white/20 max-w-[85%] transition-all transform hover:scale-105">
          <p className={`text-2xl md:text-3xl font-bold text-center subtitle-text ${subtitleColor} leading-snug`}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
