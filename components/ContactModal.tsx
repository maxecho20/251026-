import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './icons';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#1C1C21] border border-gray-700/50 rounded-2xl p-8 w-full max-w-md text-white relative shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
          <CloseIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-2">Contact Us</h2>
        <p className="text-gray-400 text-center mb-6">Have questions or feedback? We'd love to hear from you.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <a href="mailto:mossecho@aliyun.com" className="w-full bg-[#2F2F37]/50 border border-gray-600 rounded-lg px-3 py-2 text-purple-400 hover:underline block">
                mossecho@aliyun.com
            </a>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">X (Twitter)</label>
             <p className="w-full bg-[#2F2F37]/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-500">
                Coming Soon
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Discord</label>
            <p className="w-full bg-[#2F2F37]/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-500">
                Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  , document.body);
};