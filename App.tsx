import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PoseGallery } from './components/PoseGallery';
import { GeneratedImage } from './components/GeneratedImage';
import { POSE_TEMPLATES } from './constants';
import { generatePoseDescription, generatePoseImage, PoseData } from './services/geminiService';
import { urlToBase64, parseDataUrl, triggerDownload } from './utils/fileUtils';
import { PlayIcon, UserIcon, ChevronDownIcon } from './components/icons';
import { Footer } from './components/Footer';
import { StepCarousel } from './components/StepCarousel';
import { HistoryPanel } from './components/HistoryPanel';
import { useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';

const UserMenu: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!currentUser) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
                <UserIcon className="h-6 w-6 text-gray-300" />
                <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div 
                    className="absolute right-0 mt-2 w-56 origin-top-right bg-[#1C1C21] border border-gray-700/50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700/50">
                            Signed in as
                            <p className="font-medium text-white truncate">{currentUser.email}</p>
                        </div>
                        <button
                            onClick={async () => {
                                await logout();
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Header: React.FC<{ onLoginClick: () => void, onSignUpClick: () => void }> = ({ onLoginClick, onSignUpClick }) => {
    const { currentUser } = useAuth();
    
    return (
        <header className="bg-transparent text-white">
            <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-xl font-bold">
                        P
                    </div>
                    <span className="text-xl font-bold">PoseShift</span>
                </div>
                <nav className="hidden md:flex items-center space-x-8 text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">Home</a>
                    <a href="#" className="hover:text-white transition-colors">Tools & API</a>
                    <a href="#" className="hover:text-white transition-colors">Solutions</a>
                    <a href="#" className="hover:text-white transition-colors">Pricing</a>
                </nav>
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        <UserMenu />
                    ) : (
                        <>
                            <button onClick={onLoginClick} className="text-gray-300 hover:text-white transition-colors">Log in</button>
                            <button onClick={onSignUpClick} className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:opacity-90 transition-opacity">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

const TemplateCard: React.FC<{img: string, title: string, subtitle: string}> = ({img, title, subtitle}) => (
    <div className="relative rounded-xl overflow-hidden group">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-left">
            <h4 className="text-xl font-bold">{title}</h4>
            <p className="text-gray-300 text-sm">{subtitle}</p>
        </div>
    </div>
);


const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [customPoses, setCustomPoses] = useState<string[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationHistory, setGenerationHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [poseDescription, setPoseDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [structuredPose, setStructuredPose] = useState<PoseData | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  const { currentUser } = useAuth();

  const handleOpenLoginModal = () => {
    setAuthModalView('login');
    setIsAuthModalOpen(true);
  };
  
  const handleOpenSignUpModal = () => {
    setAuthModalView('signup');
    setIsAuthModalOpen(true);
  };

  const handleImageUpload = (base64: string) => {
    setUserImage(base64);
    setGeneratedImage(null);
    setError(null);
  };

  const handleSelectPose = (url: string) => {
    setSelectedPose(url);
    setGeneratedImage(null);
    setError(null);
  };

  const handlePoseUpload = (base64: string) => {
    setCustomPoses(prevPoses => [...prevPoses, base64]);
    setSelectedPose(base64);
    setGeneratedImage(null);
    setError(null);
  };

  const handleSelectHistory = (image: string) => {
    setGeneratedImage(image);
    setError(null); // Clear any previous errors when viewing history
  };

  const handleGenerate = useCallback(async () => {
    if (!currentUser) {
        handleOpenLoginModal();
        return;
    }
      
    if (!userImage || !selectedPose) {
      setError("Please upload an image and select a pose.");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);
    setPoseDescription(null);
    setStructuredPose(null);

    try {
      const poseImageBase64 = selectedPose.startsWith('data:') 
        ? selectedPose 
        : await urlToBase64(selectedPose);
      
      const userImageData = parseDataUrl(userImage);
      const poseImageData = parseDataUrl(poseImageBase64);

      if (!userImageData || !poseImageData) {
        throw new Error("Failed to process images.");
      }
      
      setLoadingStep("Analyzing pose from Image B...");
      const { formattedDescription, poseData } = await generatePoseDescription(poseImageData);
      setPoseDescription(formattedDescription);
      setStructuredPose(poseData);

      setLoadingStep("Generating new image with analyzed pose...");
      const resultBase64 = await generatePoseImage(userImageData, poseImageData, formattedDescription, poseData);
      const fullImageSrc = `data:image/png;base64,${resultBase64}`;
      setGeneratedImage(fullImageSrc);
      setGenerationHistory(prev => [fullImageSrc, ...prev].slice(0, 5));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  }, [userImage, selectedPose, currentUser]);

  const handleDownload = useCallback(() => {
    if (!generatedImage) return;
    triggerDownload(generatedImage, 'ai-pose-shifter-result-sd.png');
  }, [generatedImage]);

  const handleUpscale = useCallback(async (quality: 'HD' | '4K') => {
    if (!userImage || !selectedPose || !poseDescription || !structuredPose) {
        setError("Cannot upscale without a generated image and its context.");
        return;
    }
    
    setIsUpscaling(true);
    setError(null);

    try {
        const poseImageBase64 = selectedPose.startsWith('data:') 
            ? selectedPose 
            : await urlToBase64(selectedPose);
        
        const userImageData = parseDataUrl(userImage);
        const poseImageData = parseDataUrl(poseImageBase64);

        if (!userImageData || !poseImageData) {
            throw new Error("Failed to process images for upscaling.");
        }

        const resultBase64 = await generatePoseImage(userImageData, poseImageData, poseDescription, structuredPose, quality);
        const fullImageSrc = `data:image/png;base64,${resultBase64}`;
        triggerDownload(fullImageSrc, `ai-pose-shifter-result-${quality.toLowerCase()}.png`);
    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An unknown error occurred during upscaling.");
    } finally {
        setIsUpscaling(false);
    }
}, [userImage, selectedPose, poseDescription, structuredPose]);

  const getButtonText = () => {
      if (isLoading) return loadingStep || 'Generating...';
      if (isUpscaling) return 'Upscaling...';
      if (!currentUser) return 'Start Trial (Login required)';
      return 'Generate (10 remaining)';
  };

  return (
    <div className="min-h-screen bg-[#0D0B14] text-white">
      {isAuthModalOpen && <AuthModal initialView={authModalView} onClose={() => setIsAuthModalOpen(false)} />}
      <Header onLoginClick={handleOpenLoginModal} onSignUpClick={handleOpenSignUpModal} />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Recreate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Any Pose</span></h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Upload your photo, pick a pose from our gallery, and let our AI magically transfer the pose while keeping you, your clothes, and your background the same.
          </p>
        </div>
        
        <StepCarousel />

        <div className="bg-[#1C1C21] border border-gray-700/50 rounded-2xl p-4 md:p-8">
            <div className="flex flex-col gap-8">
                {/* --- TOP SECTION: SELECT POSE --- */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><span className="w-1 h-6 bg-purple-500 mr-3"></span>1. Select a Pose (B)</h3>
                    <PoseGallery 
                        poses={POSE_TEMPLATES} 
                        selectedPose={selectedPose} 
                        onSelectPose={handleSelectPose}
                        customPoses={customPoses}
                        onPoseUpload={handlePoseUpload}
                    />
                </div>

                {/* --- BOTTOM SECTION: UPLOAD & GENERATE --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* --- BOTTOM LEFT --- */}
                    <div className="flex flex-col gap-6">
                        <div className="flex-grow flex flex-col">
                            <h3 className="text-xl font-semibold mb-4 flex items-center"><span className="w-1 h-6 bg-purple-500 mr-3"></span>2. Upload Your Photo (A)</h3>
                            <ImageUploader onImageUpload={handleImageUpload} image={userImage} />
                        </div>
                        
                        <div className="flex flex-col">
                            <HistoryPanel 
                              history={generationHistory}
                              onSelect={handleSelectHistory}
                              currentImage={generatedImage}
                            />
                             <button
                                onClick={handleGenerate}
                                disabled={(!currentUser && (!userImage || !selectedPose)) || (currentUser && (!userImage || !selectedPose || isLoading || isUpscaling))}
                                className="w-full mt-6 flex items-center justify-center gap-3 text-lg font-bold px-8 py-4 rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                                >
                                <PlayIcon className="h-5 w-5" />
                                {getButtonText()}
                            </button>
                        </div>
                    </div>

                    {/* --- BOTTOM RIGHT --- */}
                    <div className="min-w-0 flex flex-col">
                        <h3 className="text-xl font-semibold mb-4 flex items-center"><span className="w-1 h-6 bg-pink-500 mr-3"></span>3. Your Generated Image (C)</h3>
                        <GeneratedImage 
                            image={generatedImage} 
                            isLoading={isLoading}
                            isUpscaling={isUpscaling}
                            loadingStep={loadingStep}
                            poseDescription={poseDescription}
                            error={error} 
                            onDownload={handleDownload}
                            onUpscale={handleUpscale}
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="text-center my-20">
            <h2 className="text-4xl font-extrabold mb-4">Template Center</h2>
            <div className="flex justify-center items-center gap-2 mb-8">
                <button className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">Hottest</button>
                <button className="px-5 py-2 text-sm font-semibold bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">Newest</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <TemplateCard img="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600" title="Iconic Styles" subtitle="Comfort and protection for sports" />
                 <TemplateCard img="https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600" title="High-Click Images" subtitle="Click-boosting images" />
                 <TemplateCard img="https://images.pexels.com/photos/40896/larch-conifer-cone-branch-larch-cone-40896.jpeg?auto=compress&cs=tinysrgb&w=600" title="Pic Copilot" subtitle="Crafted by local e-commerce designers" />
                 <TemplateCard img="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600" title="Transform Yourself" subtitle="With Custom Care" />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;