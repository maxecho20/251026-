import React from 'react';

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-xl font-bold">
            P
        </div>
        <span className="text-xl font-bold">PoseShift</span>
    </div>
);

const FooterLinkColumn: React.FC<{ title: string; links: { name: string; href: string }[] }> = ({ title, links }) => (
    <div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{title}</h3>
        <ul className="mt-4 space-y-3">
            {links.map(link => (
                <li key={link.name}>
                    <a href={link.href} className="text-base text-gray-300 hover:text-white transition-colors">
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

export const Footer: React.FC = () => {
    const pageLinks = [
        { name: 'FAQ', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Cookies Policy', href: '#' },
    ];

    const socialLinks = [
        { name: 'Tutorials', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'TikTok', href: '#' },
    ];

    const otherLinks = [
        { name: 'Best AI Prompts', href: '#' },
    ];

    return (
        <footer className="bg-[#0D0B14] text-white">
            <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-2 space-y-4 pr-8">
                        <Logo />
                        <p className="text-gray-400">Created by</p>
                        <p className="text-gray-300">@ MossEcho & Candy</p>
                    </div>

                    <FooterLinkColumn title="Pages" links={pageLinks} />
                    <FooterLinkColumn title="Tutorials & Social" links={socialLinks} />
                    <FooterLinkColumn title="Other Sites" links={otherLinks} />
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
                    <p>&copy; 2025 PoseShift. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
