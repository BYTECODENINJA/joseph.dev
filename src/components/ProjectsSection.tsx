import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Star, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
}

const projects: Project[] = [
    {
        title: 'Rentosearch',
        description: ' rentals searching website hosted for kenyan property owners and property seekers to make property finding much easier',
        tags: ['React', 'GSAP', 'Typescript', 'Convex'],
        image: '',
        liveUrl: 'https://www.rentosearch.co.ke',
        featured: true,
    },
    {
        title: 'Gaming Landing page',
        description: 'A full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard. Built with React, Node.js, and PostgreSQL.',
        tags: ['JavaScript', 'React', 'GSAP'],
        image: '',
        liveUrl: 'https://gaminglandingpage.vercel.app',
        githubUrl: 'https://github.com/BYTECODENINJA/gamingwebsite',
        featured: true,
    },
    {
        title: 'Expense Tracker',
        description: 'MoneyMate is a full-stack personal finance management application that lets you track income and expenses, visualise spending trends, scan receipts with AI, and receive scheduled financial reports — all in one place. Built for Kenya with a clean modern UI.',
        tags: ['Node.js', 'GenAI', 'MongoDB', 'React', 'TypeScript'],
        image: '',
        liveUrl: 'https://moneymate-two.vercel.app',
        githubUrl: 'https://github.com/BYTECODENINJA/moneymate',
        featured: false,
    },
    {
        title: 'AI powered Resume Creator',
        description: 'ResumeFlow is a modern, high-performance resume builder designed to help you create professional, ATS-friendly resumes with ease. Built with React, TypeScript, and Vite, it offers a seamless and interactive user experience.',
        tags: ['Vite', 'React', 'Typescript','Supabase'],
        image: '',
        liveUrl: 'https://resume-flow-rosy.vercel.app',
        githubUrl: 'https://github.com/BYTECODENINJA/ResumeFlow',
        featured: true,
    },
    {
        title: 'DevOps Dashboard',
        description: 'Monitoring dashboard for Docker containers and Kubernetes clusters with real-time metrics.',
        tags: ['React', 'Docker', 'Kubernetes', 'Prometheus'],
        image: '',
        githubUrl: '#',
        featured: false,
    },
    {
        title: 'Real-Time Chat App',
        description: 'End-to-end encrypted messaging application with file sharing and video call capabilities.',
        tags: ['Socket.io', 'WebRTC', 'MongoDB', 'Express'],
        image: '',
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
    },
];

export function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.projects-header',
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
                '.project-card',
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.projects-grid',
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="pinned-section relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="section-content w-full min-h-screen flex items-center justify-center">
                <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-l from-[#00f0ff]/5 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="projects-header text-center mb-16">
          <span className="inline-block font-rajdhani text-sm tracking-[0.3em] uppercase text-[#ff0033] mb-4">
            Portfolio
          </span>
                        <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            FEATURED{' '}
                            <span className="bg-gradient-to-r from-[#00f0ff] to-[#33f3ff] bg-clip-text text-transparent">
              PROJECTS
            </span>
                        </h2>
                        <p className="font-space text-white/50 max-w-2xl mx-auto">
                            A showcase of my best work — real-world applications built with cutting-edge technology
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                className={`project-card group relative glassmorphism rounded-2xl overflow-hidden transition-all duration-500 ${
                                    project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                                }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Image / Visual */}
                                <div className="relative h-48 sm:h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#0a0a0a]" />

                                    {/* Code pattern decoration */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-4 left-4 font-mono text-xs text-[#ff0033]/40">
                                            {'<'}Project{' />'}
                                        </div>
                                        <div className="absolute bottom-4 right-4 font-mono text-xs text-[#00f0ff]/40">
                                            {'{'} code: true {'}'}
                                        </div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div className="w-20 h-20 border border-[#ff0033]/20 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                                            <div className="absolute inset-0 w-20 h-20 border border-[#00f0ff]/20 -rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                                        </div>
                                    </div>

                                    {/* Hover overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent transition-opacity duration-300 ${
                                            hoveredIndex === index ? 'opacity-90' : 'opacity-0'
                                        }`}
                                    />

                                    {/* Featured badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#ff0033]/20 border border-[#ff0033]/30 rounded-full">
                                            <Star className="w-3 h-3 text-[#ff0033]" />
                                            <span className="font-rajdhani text-xs text-[#ff0033] font-semibold uppercase tracking-wider">
                      Featured
                    </span>
                                        </div>
                                    )}

                                    {/* Quick actions on hover */}
                                    <div
                                        className={`absolute bottom-4 left-4 right-4 flex gap-3 transition-all duration-300 ${
                                            hoveredIndex === index
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-4'
                                        }`}
                                    >
                                        {project.liveUrl && project.liveUrl !== '#' && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-[#ff0033] text-white rounded-lg font-rajdhani text-sm font-semibold hover:bg-[#ff1a4d] transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && project.githubUrl !== '#' && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg font-rajdhani text-sm font-semibold hover:bg-white/20 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-orbitron text-lg font-bold text-white mb-2 group-hover:text-[#ff0033] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="font-space text-sm text-white/50 leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-rajdhani text-xs text-white/60"
                                            >
                      {tag}
                    </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Border glow on hover */}
                                <div
                                    className={`absolute inset-0 rounded-2xl border transition-all duration-500 pointer-events-none ${
                                        hoveredIndex === index
                                            ? 'border-[#ff0033]/40 shadow-[0_0_30px_rgba(255,0,51,0.1)]'
                                            : 'border-transparent'
                                    }`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* View More */}
                    <div className="text-center mt-12">
                        <a
                            href="https://github.com/BYTECODENINJA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-[#00f0ff]/30 text-[#00f0ff] rounded-none font-orbitron text-sm font-bold tracking-widest uppercase hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/50 transition-all duration-300"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View All Projects
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
