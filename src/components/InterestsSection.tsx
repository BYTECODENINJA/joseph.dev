import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2, BookOpen, Plane, Music, Cpu, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Interest {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

const interests: Interest[] = [
    {
        icon: <Gamepad2 className="w-8 h-8" />,
        title: 'Gaming',
        description: 'Competitive gaming and exploring immersive open-world adventures. Gaming fuels my competitive spirit and creative problem-solving.',
        color: '#ff0033',
    },
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: 'Tech Reading',
        description: 'Constantly reading documentation, tech blogs, and books to stay ahead of the curve in this rapidly evolving industry.',
        color: '#00f0ff',
    },
    {
        icon: <Plane className="w-8 h-8" />,
        title: 'Travel',
        description: 'Exploring new cultures and perspectives. Travel broadens my thinking and inspires creative solutions in code.',
        color: '#ff0033',
    },
    {
        icon: <Music className="w-8 h-8" />,
        title: 'Music',
        description: 'Lo-fi beats while coding, electronic music for focus. Music is my productivity hack and creative fuel.',
        color: '#00f0ff',
    },
    {
        icon: <Cpu className="w-8 h-8" />,
        title: 'Hardware',
        description: 'Building PCs, exploring IoT devices, and tinkering with Raspberry Pi projects. Understanding hardware makes me a better software engineer.',
        color: '#ff0033',
    },
    {
        icon: <Coffee className="w-8 h-8" />,
        title: 'Coffee Culture',
        description: 'Coffee aficionado who believes the best code is written with a perfect cup of freshly brewed coffee.',
        color: '#00f0ff',
    },
];

export function InterestsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.interests-header',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                '.interest-card',
                { opacity: 0, y: 50, rotateY: -10 },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.interests-grid',
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="interests"
            ref={sectionRef}
            className="pinned-section relative h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="section-content w-full h-full flex items-center justify-center overflow-y-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff0033]/3 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="interests-header text-center mb-16">
          <span className="inline-block font-rajdhani text-sm tracking-[0.3em] uppercase text-[#00f0ff] mb-4">
            Beyond Code
          </span>
                        <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            INTERESTS &{' '}
                            <span className="bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] bg-clip-text text-transparent">
              PASSIONS
            </span>
                        </h2>
                        <p className="font-space text-white/50 max-w-2xl mx-auto">
                            What drives me outside of development — the hobbies and passions that shape my creative thinking
                        </p>
                    </div>

                    {/* Interests Grid */}
                    <div className="interests-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interests.map((interest, index) => (
                            <div
                                key={interest.title}
                                className="interest-card group relative glassmorphism rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden perspective-1000"
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at center, ${interest.color}08 0%, transparent 70%)`,
                                    }}
                                />

                                {/* Icon */}
                                <div
                                    className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                    style={{
                                        background: `${interest.color}15`,
                                        color: interest.color,
                                        boxShadow: `0 0 30px ${interest.color}20`,
                                    }}
                                >
                                    {interest.icon}
                                </div>

                                {/* Content */}
                                <h3 className="relative font-orbitron text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                                    {interest.title}
                                </h3>
                                <p className="relative font-space text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                                    {interest.description}
                                </p>

                                {/* Corner accent */}
                                <div
                                    className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(225deg, ${interest.color}15 0%, transparent 60%)`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
