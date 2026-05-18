import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
    role: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
}

const experiences: Experience[] = [
    {
        role: 'Full-Stack Developer',
        company: 'Freelance / Self-Employed',
        location: 'Remote / Kenya',
        period: '2023 - Present',
        description: 'Building end-to-end web applications for clients across various industries, from startups to established businesses.',
        achievements: [
            'Delivered 15+ production-ready applications',
            'Implemented CI/CD pipelines reducing deployment time by 60%',
            'Architected scalable database solutions handling 10K+ daily users',
        ],
    },
    {
        role: 'Junior Developer',
        company: 'Tech Startup',
        location: 'Nairobi, Kenya',
        period: '2022 - 2023',
        description: 'Collaborated with cross-functional teams to develop and maintain web applications using modern JavaScript frameworks.',
        achievements: [
            'Contributed to core product features used by 5,000+ users',
            'Reduced application load time by 40% through optimization',
            'Mentored 2 junior developers in best practices',
        ],
    },
    {
        role: 'Computer Science Student',
        company: 'Cooperative University of Kenya',
        location: 'Kenya',
        period: '2020 - 2022',
        description: 'Completed Diploma in Computer Science with focus on software engineering, databases, and web technologies.',
        achievements: [
            'Graduated with distinction in software development',
            'Built capstone project: full-stack e-commerce platform',
            'Active member of university coding club',
        ],
    },
];

export function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.exp-header',
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

            const items = timelineRef.current?.querySelectorAll('.timeline-item');
            if (items) {
                items.forEach((item, index) => {
                    gsap.fromTo(
                        item,
                        {
                            opacity: 0,
                            x: index % 2 === 0 ? -60 : 60,
                        },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.9,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 80%',
                            },
                        }
                    );
                });
            }

            gsap.fromTo(
                '.timeline-line',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="pinned-section relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="section-content w-full min-h-screen flex items-center justify-center">
                <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#ff0033]/5 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="exp-header text-center mb-20">
          <span className="inline-block font-rajdhani text-sm tracking-[0.3em] uppercase text-[#ff0033] mb-4">
            Career Path
          </span>
                        <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            WORK{' '}
                            <span className="bg-gradient-to-r from-[#00f0ff] to-[#33f3ff] bg-clip-text text-transparent">
              EXPERIENCE
            </span>
                        </h2>
                        <p className="font-space text-white/50 max-w-2xl mx-auto">
                            My journey through the tech landscape, from student to professional developer
                        </p>
                    </div>

                    {/* Timeline */}
                    <div ref={timelineRef} className="relative max-w-4xl mx-auto">
                        {/* Timeline Line */}
                        <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff0033] via-[#00f0ff] to-[#ff0033] origin-top hidden sm:block" />

                        <div className="space-y-12">
                            {experiences.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`timeline-item relative grid md:grid-cols-2 gap-8 ${
                                        index % 2 === 0 ? '' : 'md:text-right'
                                    }`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-[#ff0033] shadow-[0_0_15px_rgba(255,0,51,0.5)] hidden sm:block" />

                                    {/* Content */}
                                    <div
                                        className={`${index % 2 === 0 ? 'md:pr-12' : 'md:order-2 md:pl-12'}`}
                                    >
                                        <div className="glassmorphism rounded-2xl p-6 sm:p-8 hover:border-[#ff0033]/20 transition-all duration-300 group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Briefcase className="w-5 h-5 text-[#ff0033]" />
                                                <span className="font-orbitron text-sm text-[#00f0ff] tracking-wider">
                        {exp.period}
                      </span>
                                            </div>

                                            <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#ff0033] transition-colors">
                                                {exp.role}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-4 mb-4 text-white/50">
                      <span className="flex items-center gap-1.5 font-rajdhani text-sm">
                        <ExternalLink className="w-3.5 h-3.5" />
                          {exp.company}
                      </span>
                                                <span className="flex items-center gap-1.5 font-rajdhani text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                                                    {exp.location}
                      </span>
                                            </div>

                                            <p className="font-space text-white/60 text-sm leading-relaxed mb-4">
                                                {exp.description}
                                            </p>

                                            <ul className="space-y-2">
                                                {exp.achievements.map((achievement, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-2 text-sm text-white/70"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full mt-1.5 shrink-0" />
                                                        <span className="font-space">{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : ''}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
