import React from 'react';

const testimonials = [
    // Column 1
    [
        {
            name: 'Sophie Miller',
            title: 'Freelance Designer',
            avatar: 'https://i.pravatar.cc/48?u=sophie',
            quote: "PoseShift's generation speed is amazing! Professional-quality images in seconds, dramatically shortening project cycles.",
        },
        {
            name: 'Michael Chen',
            title: 'Creative Director',
            avatar: 'https://i.pravatar.cc/48?u=michael',
            quote: "With PoseShift's keypoint feature, I can precisely control every detail. It's the most powerful AI image tool I've used for campaign mockups.",
        },
        {
            name: 'Sarah Wang',
            title: 'E-commerce Manager',
            avatar: 'https://i.pravatar.cc/48?u=sarah',
            quote: "As an e-commerce manager, PoseShift helps me quickly generate product showcase images. The AI's effect is so much better than other AI tools!",
        },
    ],
    // Column 2
    [
        {
            name: 'Emma Zhang',
            title: 'Content Creator',
            avatar: 'https://i.pravatar.cc/48?u=emma',
            quote: "Creating engaging content is my job. PoseShift lets me experiment with endless creative poses, keeping my feed fresh and exciting. My followers love it!",
        },
        {
            name: 'Kevin Wu',
            title: 'Game Concept Artist',
            avatar: 'https://i.pravatar.cc/48?u=kevin',
            quote: "PoseShift's model detail is unparalleled. As a game developer, it has become our go-to tool for rapid character concepting and iteration.",
        },
        {
            name: 'Jessica Li',
            title: 'Digital Marketing Expert',
            avatar: 'https://i.pravatar.cc/48?u=jessica',
            quote: "PoseShift AI makes realizing ad creatives so simple. It generates images that reach commercial photography standards in a fraction of the time and cost.",
        },
    ],
    // Column 3
    [
        {
            name: 'Nina Patel',
            title: 'Full-stack Developer',
            avatar: 'https://i.pravatar.cc/48?u=nina',
            quote: "As an indie developer, PoseShift's API integration is very friendly. It's the best AI Image Generator solution on the market for programmatic image creation.",
        },
        {
            name: 'David Lee',
            title: 'Animator & Storyboarder',
            avatar: 'https://i.pravatar.cc/48?u=david',
            quote: "This tool is a lifesaver for storyboarding. I can quickly visualize character poses and compositions without drawing everything from scratch. It's accelerated my workflow by at least 50%.",
        },
        {
            name: 'Alex Jordan',
            title: 'Social Media Influencer',
            avatar: 'https://i.pravatar.cc/48?u=alex',
            quote: "I've tried many AI image tools, but PoseShift's keypoint feature is a true game-changer for getting the exact pose I want for my fashion posts.",
        },
    ],
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0][0] }> = ({ testimonial }) => (
    <div className="bg-[#1C1C21] p-6 rounded-xl border border-gray-700/50 shadow-lg">
        <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
        <div className="flex items-center space-x-3">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
            </div>
        </div>
    </div>
);

const TestimonialColumn: React.FC<{ testimonials: typeof testimonials[0], animationDuration: string }> = ({ testimonials, animationDuration }) => (
    <div className="flex flex-col gap-6 animate-scroll-up" style={{ animationDuration }}>
        {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
        ))}
        {/* Duplicate for seamless loop */}
        {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`dup-${index}`} testimonial={testimonial} />
        ))}
    </div>
);

export const Testimonials: React.FC = () => {
    return (
        <div className="py-20">
            <div className="text-center mb-12">
                <span className="bg-gray-800 text-purple-400 text-sm font-medium px-4 py-1 rounded-full">Testimonials</span>
                <h2 className="text-4xl font-extrabold mt-4 mb-4">What Users Say About PoseShift</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    See how creators use PoseShift's unique features to boost their productivity and creativity.
                </p>
            </div>
            <div className="relative h-[40rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B14] via-transparent to-[#0D0B14] z-10"></div>
                <div className="testimonial-container flex justify-center gap-6">
                    <TestimonialColumn testimonials={testimonials[0]} animationDuration="40s" />
                    <TestimonialColumn testimonials={testimonials[1]} animationDuration="50s" />
                    <TestimonialColumn testimonials={testimonials[2]} animationDuration="45s" />
                </div>
            </div>
        </div>
    );
};
