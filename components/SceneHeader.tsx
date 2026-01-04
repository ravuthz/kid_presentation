
import React from 'react';

interface SceneHeaderProps {
  title: string;
  currentTitle: string;
  emoji: string;
}

const SceneHeader: React.FC<SceneHeaderProps> = ({ title, currentTitle, emoji }) => {
  return (
    <div className="text-center">
      <h2 className="text-green-600 text-lg uppercase tracking-widest font-bold mb-1 opacity-70">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3">
        <span className="text-4xl animate-bounce">{emoji}</span>
        <h1 className="text-4xl md:text-5xl text-green-900 kids-font">
          {currentTitle}
        </h1>
        <span className="text-4xl animate-bounce" style={{ animationDelay: '200ms' }}>{emoji}</span>
      </div>
    </div>
  );
};

export default SceneHeader;
