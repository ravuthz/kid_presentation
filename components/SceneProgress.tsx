
import React from 'react';

interface SceneProgressProps {
  count: number;
  current: number;
  colorClass: string;
}

const SceneProgress: React.FC<SceneProgressProps> = ({ count, current, colorClass }) => {
  return (
    <div className="flex gap-3 justify-center items-center">
      {Array.from({ length: count }).map((_, idx) => {
        const isActive = idx === current;
        const isPast = idx < current;

        return (
          <div
            key={idx}
            className={`h-4 rounded-full transition-all duration-500 shadow-sm
              ${isActive ? 'w-12 bg-current ' + colorClass : isPast ? 'w-4 bg-green-200' : 'w-4 bg-gray-200'}
            `}
          />
        );
      })}
      <span className="ml-2 kids-font text-green-700 text-sm">
        Scene {current + 1} of {count}
      </span>
    </div>
  );
};

export default SceneProgress;
