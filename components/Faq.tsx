import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-700/50">
    <button
      className="flex justify-between items-center w-full text-left py-5 px-6"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="text-lg font-medium text-white">{question}</span>
      <ChevronDownIcon
        className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <div className="text-gray-300 pb-5 px-6 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  </div>
);

export const Faq: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is PoseShift and how does it work?",
      answer: "PoseShift is an AI-powered image generator that specializes in pose transfer. You upload your photo (Image A) and select a reference pose (Image B). Our AI then intelligently redraws the person in your photo to match the new pose, while preserving their identity, clothing, and the original background.",
    },
    {
      question: "Is PoseShift free to use?",
      answer: "Yes, you can start for free! Every new user receives 30 complimentary credits upon signing up, which is enough to generate several images and try out all the features. No credit card is required for the trial. After using your free credits, you can choose from our flexible subscription or one-time credit packs to continue creating.",
    },
    {
      question: "What makes PoseShift different from other AI image generators?",
      answer: "While most AI generators create images from text prompts, PoseShift's unique strength is its precise pose transfer technology. Instead of describing a pose, you provide a visual reference. This gives you unparalleled control over the final composition, making it perfect for e-commerce, character design, and creative content where a specific pose is crucial.",
    },
    {
      question: "Do I need to create an account to use PoseShift?",
      answer: "Yes, a free account is required to start generating images. Signing up gives you 30 free credits and allows you to save and access your creations in your personal gallery.",
    },
    {
      question: "Can I use the generated images commercially?",
      answer: "Yes, you own the rights to the images you generate with PoseShift. You can use them for both personal and commercial purposes, such as marketing, social media, product showcases, and more.",
    },
    {
      question: "How does PoseShift protect my privacy?",
      answer: "We take your privacy seriously. Your uploaded images are used solely for the generation process and are not stored on our servers long-term. Generated images are stored in your private \"My Creations\" gallery for 7 days and are then automatically deleted. They are never shared or used for any other purpose.",
    },
    {
        question: "How can I provide feedback or report issues?",
        answer: (
            <p>
                We'd love to hear from you! Your feedback helps us improve. You can reach out to our support team by clicking the button below.
                <button 
                    onClick={onContactClick}
                    className="block mt-3 px-4 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                    Contact Us
                </button>
            </p>
        )
    },
    {
      question: "What's next for PoseShift?",
      answer: "We are constantly working on improving our AI model and user experience. Future plans include batch image processing, higher-resolution outputs, and an expanded library of pose templates. Stay tuned for exciting new features!",
    },
  ];

  return (
    <div id="faq" className="py-20">
      <div className="text-center mb-12">
        <span className="bg-gray-800 text-purple-400 text-sm font-medium px-4 py-1 rounded-full">FAQ</span>
        <h2 className="text-4xl font-extrabold mt-4 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Have another question? <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} className="text-purple-400 hover:underline">Contact us</a>.
        </p>
      </div>
      <div className="max-w-3xl mx-auto bg-[#1C1C21] rounded-2xl border border-gray-700/50">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};