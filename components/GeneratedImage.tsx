import React from 'react';
import { SparkleIcon, ExclamationIcon, DownloadIcon } from './icons';

interface GeneratedImageProps {
  image: string | null;
  isLoading: boolean;
  isUpscaling: boolean;
  loadingStep: string;
  poseDescription: string | null;
  error: string | null;
  onDownload: () => void;
  onUpscale: (quality: 'HD' | '4K') => void;
}

const LoadingState: React.FC<{step: string, description: string | null}> = ({ step, description }) => (
    <div className="flex flex-col items-center justify-center text-center text-gray-400 space-y-3 w-full">
      <SparkleIcon className="h-12 w-12 text-purple-500 animate-spin" style={{ animationDuration: '3s' }}/>
      <p className="font-semibold">{step}</p>
      
      {description && (
        <div className="mt-2 p-3 bg-gray-900 rounded-lg text-left text-xs w-full max-w-md max-h-32 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
            <p className="font-semibold text-gray-300 mb-1">Analyzed Pose:</p>
            <p className="font-mono whitespace-pre-wrap text-gray-400">{description}</p>
        </div>
      )}
  
      <p className="text-sm mt-2">This can take a moment. Please wait.</p>
    </div>
  );

const UpscalingOverlay: React.FC = () => (
    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
        <SparkleIcon className="h-12 w-12 text-purple-500 animate-spin" style={{ animationDuration: '3s' }}/>
        <p className="font-semibold mt-3 text-white">Enhancing image quality...</p>
        <p className="text-sm text-gray-400">Please wait, this may take a minute.</p>
    </div>
);

const InitialState: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full">
    <h3 className="text-2xl font-bold max-w-xs leading-snug">
        Only one <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">portrait photo</span> is needed to get the pose you want
    </h3>
  </div>
);

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <div className="flex flex-col items-center justify-center text-center text-red-400 space-y-3">
        <ExclamationIcon className="h-12 w-12" />
        <p className="font-semibold">An Error Occurred</p>
        <p className="text-sm max-w-sm">{error}</p>
    </div>
);

const DownloadButton: React.FC<{ onDownload: () => void; isUpscaling: boolean }> = ({ onDownload, isUpscaling }) => {
    return (
        <div className="absolute top-3 right-3">
            <button
                onClick={onDownload}
                disabled={isUpscaling}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-gray-900/70 text-white rounded-md backdrop-blur-sm hover:bg-purple-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Download image"
            >
                <DownloadIcon className="h-4 w-4" />
                <span>Download</span>
            </button>
        </div>
    );
};


export const GeneratedImage: React.FC<GeneratedImageProps> = ({ image, isLoading, isUpscaling, loadingStep, poseDescription, error, onDownload, onUpscale }) => {
  return (
    <div className="relative w-full aspect-[9/14] bg-[#2F2F37]/50 rounded-lg border-2 border-gray-700 flex items-center justify-center p-4">
      {isLoading ? <LoadingState step={loadingStep} description={poseDescription} /> :
       error ? <ErrorState error={error} /> :
       image ? (
        <>
            {isUpscaling && <UpscalingOverlay />}
            <img src={image} alt="Generated" className="max-w-full max-h-full object-contain rounded-md" />
            <DownloadButton onDownload={onDownload} isUpscaling={isUpscaling} />
        </>
       ) :
       <InitialState />
      }
    </div>
  );
};