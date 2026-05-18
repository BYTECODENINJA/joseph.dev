import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, FileText, Download, Sparkles } from 'lucide-react';

interface HeroSectionProps {
    onHireMeClick: () => void;
}

export function HeroSection({ onHireMeClick }: HeroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                badgeRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 }
            )
                .fromTo(
                    titleRef.current?.querySelectorAll('.word') || [],
                    { opacity: 0, y: 80, rotateX: -45 },
                    { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1 },
                    '-=0.4'
                )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    '-=0.6'
                )
                .fromTo(
                    ctaRef.current?.children || [],
                    { opacity: 0, y: 30, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
                    '-=0.4'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="pinned-section relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="section-content w-full min-h-screen flex items-center justify-center">
                {/* Background Effects */}
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 scanline pointer-events-none" />

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 w-32 h-32 border border-[#ff0033]/20 rotate-45 animate-pulse" />
                <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-[#00f0ff]/20 rotate-12" />
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#ff0033] rounded-full animate-ping" />
                <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-[#00f0ff] rounded-full animate-ping" style={{ animationDelay: '1s' }} />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Badge */}
                    <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8 opacity-0">
                        <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                        <span className="font-rajdhani text-sm tracking-[0.3em] uppercase text-[#00f0ff]">
            Available for hire
          </span>
                        <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                    </div>

                    {/* Main Title */}
                    <h1
                        ref={titleRef}
                        className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 perspective-1000"
                    >
          <span className="word inline-block opacity-0 text-white">
            JOSEPH
          </span>{' '}
                        <span className="word inline-block opacity-0 bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] bg-clip-text text-transparent">
            MULWA
          </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="font-space text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 opacity-0 leading-relaxed"
                    >
                        Full-Stack Developer crafting{' '}
                        <span className="text-[#00f0ff] font-semibold">pixel-perfect</span>{' '}
                        digital experiences with{' '}
                        <span className="text-[#ff0033] font-semibold">cutting-edge</span>{' '}
                        technology
                    </p>

                    {/* CTA Buttons */}
                    <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={onHireMeClick}
                            className="group relative px-8 py-4 bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] rounded-none font-orbitron text-sm font-bold tracking-widest uppercase text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,0,51,0.4)]"
                        >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Hire Me
            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ff1a4d] to-[#ff0033] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <a
                            href="#about"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group px-8 py-4 border border-white/20 rounded-none font-orbitron text-sm font-bold tracking-widest uppercase text-white hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-all duration-300"
                        >
            <span className="flex items-center gap-2">
              Know More
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
                        </a>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                alert('Resume download coming soon!');
                            }}
                            className="group px-8 py-4 border border-white/20 rounded-none font-orbitron text-sm font-bold tracking-widest uppercase text-white hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-all duration-300"
                        >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resume
            </span>
                        </a>
                    </div>

                    {/* Stats row */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {[
                            { value: '1', label: 'Year Experience' },
                            { value: '20+', label: 'Projects Built' },
                            { value: '15+', label: 'Technologies' },
                            { value: '99%', label: 'Confidence' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="glassmorphism rounded-xl p-4 group hover:border-[#ff0033]/30 transition-all duration-300"
                            >
                                <div className="font-orbitron text-2xl sm:text-3xl font-bold text-white group-hover:text-[#ff0033] transition-colors">
                                    {stat.value}
                                </div>
                                <div className="font-rajdhani text-xs text-white/50 mt-1 tracking-wider uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>
        </section>
    );
}
