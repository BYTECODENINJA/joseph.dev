import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar, Code2 } from 'lucide-react';
import aboutImage from '@/assets/about.jpeg';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-title',
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                '.about-text',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                imageRef.current,
                { opacity: 0, scale: 0.8, rotateY: -15 },
                {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo(
                '.about-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-cards',
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="pinned-section relative h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="section-content w-full h-full flex items-center justify-center overflow-y-auto">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff0033]/5 to-transparent pointer-events-none" />

                <div className="section-content-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Section Header */}
                    <div className="mb-16">
          <span className="about-title inline-block font-rajdhani text-sm tracking-[0.3em] uppercase text-[#00f0ff] mb-4">
            About Me
          </span>
                        <h2 className="about-title font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            THE{' '}
                            <span className="bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] bg-clip-text text-transparent">
              DEV
            </span>{' '}
                            BEHIND THE CODE
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image Side */}
                        <div ref={imageRef} className="relative perspective-1000">
                            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                                {/* Decorative frame */}
                                <div className="absolute -inset-4 border border-[#ff0033]/20 rotate-3" />
                                <div className="absolute -inset-8 border border-[#00f0ff]/10 -rotate-2" />

                                {/* Main image container with clip path */}
                                <div className="relative w-full h-full min-h-[280px] overflow-hidden clip-slant">
                                    <img
                                        src={aboutImage}
                                        alt="Human and robotic hands connecting through technology"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/30 pointer-events-none" />
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -right-4 glassmorphism px-6 py-3 rounded-lg">
                <span className="font-orbitron text-lg font-bold text-[#ff0033]">
                 1
                </span>
                                    <span className="font-rajdhani text-xs text-white/60 ml-2 uppercase tracking-wider">
                  Year
                </span>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div ref={contentRef}>
                            <p className="about-text text-lg sm:text-xl text-white/80 leading-relaxed mb-6">
                                I'm <span className="text-[#ff0033] font-semibold">Joseph Mulwa</span>, a passionate full-stack developer who transforms complex problems into elegant, efficient solutions. Based in Kenya, I specialize in building scalable web applications that push the boundaries of modern technology.
                            </p>

                            <p className="about-text text-white/60 leading-relaxed mb-8">
                                With expertise spanning JavaScript, Python, Node.js, TypeScript, and various databases, I bring a comprehensive approach to every project. My recent dive into DevOps with Docker, Git, and Kubernetes ensures I can handle deployments as seamlessly as development.
                            </p>

                            {/* Info Cards */}
                            <div className="about-cards grid sm:grid-cols-2 gap-4">
                                <div className="about-card glassmorphism p-4 rounded-xl hover:border-[#ff0033]/30 transition-all duration-300 group">
                                    <GraduationCap className="w-6 h-6 text-[#ff0033] mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="font-rajdhani font-semibold text-white">Education</div>
                                    <div className="font-space text-sm text-white/50">
                                        Diploma in Computer Science
                                    </div>
                                    <div className="font-space text-xs text-[#00f0ff]">
                                        Cooperative University of Kenya
                                    </div>
                                </div>

                                <div className="about-card glassmorphism p-4 rounded-xl hover:border-[#00f0ff]/30 transition-all duration-300 group">
                                    <MapPin className="w-6 h-6 text-[#00f0ff] mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="font-rajdhani font-semibold text-white">Location</div>
                                    <div className="font-space text-sm text-white/50">Based in</div>
                                    <div className="font-space text-xs text-[#00f0ff]">Kenya</div>
                                </div>

                                <div className="about-card glassmorphism p-4 rounded-xl hover:border-[#ff0033]/30 transition-all duration-300 group">
                                    <Calendar className="w-6 h-6 text-[#ff0033] mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="font-rajdhani font-semibold text-white">Focus</div>
                                    <div className="font-space text-sm text-white/50">Clean code always</div>
                                    <div className="font-space text-xs text-[#00f0ff]">Scalability</div>
                                </div>

                                <div className="about-card glassmorphism p-4 rounded-xl hover:border-[#00f0ff]/30 transition-all duration-300 group">
                                    <Code2 className="w-6 h-6 text-[#00f0ff] mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="font-rajdhani font-semibold text-white">Focus</div>
                                    <div className="font-space text-sm text-white/50">Specializing in</div>
                                    <div className="font-space text-xs text-[#00f0ff]">Full-Stack Development</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
