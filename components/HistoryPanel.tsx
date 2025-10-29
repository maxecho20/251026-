import React from 'react';

interface HistoryPanelProps {
  history: string[];
  onSelect: (image: string) => void;
  currentImage: string | null;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, currentImage }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="pt-2">
      <h3 className="text-2xl font-semibold mb-4 border-l-4 border-cyan-500 pl-4">4. Generation History</h3>
      <div className="flex overflow-x-auto space-x-3 p-2 bg-gray-800/50 rounded-lg scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
        {history.map((histImage, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 ${
              currentImage === histImage ? 'ring-4 ring-cyan-500 shadow-lg' : 'ring-2 ring-gray-700 hover:ring-gray-500'
            }`}
            onClick={() => onSelect(histImage)}
            aria-label={`Select generated image ${index + 1} from history`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(histImage) }}
          >
            <img src={histImage} alt={`History ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};