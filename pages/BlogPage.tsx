import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Page } from '../App';

const blogPosts = [
    {
        category: 'Tutorial',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Blog/fast3d_1.png',
        title: '3 Ways PoseShift Enhances Your E-commerce Product Photography',
        description: 'Learn how to use PoseShift to create stunning, consistent, and high-converting product images for your online store. Boost your sales with professional visuals.',
        author: 'Jane Doe',
        date: '2025/07/02',
    },
    {
        category: 'Product',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Blog/fast3d_2.png',
        title: 'Unlocking Creativity: How Indie Devs Are Using PoseShift for Character Design',
        description: 'Discover the workflows and techniques independent game developers are using with PoseShift to rapidly prototype and design compelling game characters.',
        author: 'John Smith',
        date: '2025/07/02',
    },
    {
        category: 'News',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Blog/fast3d_3.png',
        title: 'Our Latest Update: Introducing Batch Processing and API v2',
        description: 'We are thrilled to announce our biggest update yet! Generate multiple images at once with batch processing and explore the new possibilities with our improved API.',
        author: 'PoseShift Team',
        date: '2025/06/27',
    },
    {
        category: 'Company',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Blog/fast3d_4.png',
        title: 'The Science Behind the Pose: A Deep Dive into Our AI Model',
        description: 'Go behind the scenes and explore the technology that powers PoseShift. We break down our generative model and the magic of keypoint-based pose transfer.',
        author: 'Dr. Evelyn Reed',
        date: '2025/06/26',
    },
    {
        category: 'Tutorial',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Blog/fast3d_5.png',
        title: 'From Prompt to Perfection: A Beginner\'s Guide to PoseShifting',
        description: 'New to PoseShift? This comprehensive guide will walk you through everything you need to know, from selecting the right images to your first generation.',
        author: 'Ludi',
        date: '2025/06/26',
    },
    {
        category: 'Product',
        image: 'https://storage.googleapis.com/pose-shift-app-assets/Blog/fast3d_6.png',
        title: 'PoseShift for Marketing: Create High-Converting Ad Creatives in Minutes',
        description: 'Stop spending hours on photoshoots. Learn how marketing professionals are using PoseShift to generate a vast array of ad creatives for A/B testing and campaigns.',
        author: 'Mark Chen',
        date: '2025/06/25',
    },
];

const BlogCard: React.FC<{ post: typeof blogPosts[0] }> = ({ post }) => (
    <div className="bg-[#1C1C21] rounded-xl overflow-hidden group border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
        <div className="relative overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <span className="absolute top-3 left-3 bg-purple-600/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">{post.category}</span>
        </div>
        <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-purple-400 transition-colors">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden">{post.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
                <span>By {post.author}</span>
                <span>{post.date}</span>
            </div>
        </div>
    </div>
);

export const BlogPage: React.FC<{
    onContactClick: () => void;
    navigate: (page: Page, anchorId?: string) => void;
}> = ({ onContactClick, navigate }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Company', 'News', 'Product', 'Tutorial'];

    const filteredPosts = activeFilter === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeFilter);

    return (
        <div className="bg-[#0D0B14]">
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white">Blog</h1>
                    <p className="text-lg text-gray-400 mt-2">Welcome to our latest news, updates, and tutorials.</p>
                </div>

                <div className="flex justify-center items-center gap-2 mb-10">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                                activeFilter === filter
                                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>

                <div className="flex justify-center items-center mt-12 space-x-2 text-gray-400">
                    <button className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50" disabled>Previous</button>
                    <button className="w-10 h-10 rounded-lg bg-purple-600 text-white font-bold">1</button>
                    <button className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">Next</button>
                </div>
            </main>
            <Footer onContactClick={onContactClick} navigate={navigate}/>
        </div>
    );
};
