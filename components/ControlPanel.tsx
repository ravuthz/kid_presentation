
import React from 'react';

interface ControlPanelProps {
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
  onReplay: () => void;
  isReplaying: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onNext, 
  onPrev, 
  canNext, 
  canPrev, 
  onReplay, 
  isReplaying 
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-2">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`px-8 py-4 rounded-2xl kids-font text-xl transition-all shadow-lg flex items-center gap-2
          ${canPrev 
            ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900 active:scale-95' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        <span>👈</span> Back
      </button>

      <button
        onClick={onReplay}
        disabled={isReplaying}
        className="p-4 bg-white border-4 border-green-400 rounded-full hover:bg-green-50 transition-all text-2xl shadow-lg active:scale-90"
        title="Listen Again"
      >
        {isReplaying ? "⏳" : "🔊"}
      </button>

      <button
        onClick={onNext}
        disabled={!canNext}
        className={`px-8 py-4 rounded-2xl kids-font text-xl transition-all shadow-lg flex items-center gap-2
          ${canNext 
            ? 'bg-green-500 hover:bg-green-600 text-white active:scale-95' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Next <span>👉</span>
      </button>
    </div>
  );
};

export default ControlPanel;
