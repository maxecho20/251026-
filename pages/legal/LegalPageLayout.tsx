import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, effectiveDate, children }) => {
  return (
    <div className="bg-[#0D0B14]">
        <div className="container mx-auto px-4 py-12 text-gray-300">
            <div className="max-w-4xl mx-auto bg-[#1C1C21] border border-gray-700/50 rounded-2xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">{title}</h1>
                <p className="text-center text-gray-500 mb-8">Effective Date: {effectiveDate}</p>
                <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white max-w-none">
                {children}
                </div>
            </div>
        </div>
    </div>
  );
};
