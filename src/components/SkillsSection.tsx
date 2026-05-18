import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
    name: string;
    skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
    {
        name: 'Frontend',
        skills: [
            { name: 'JavaScript', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'React', level: 92 },
            { name: 'HTML/CSS', level: 95 },
            { name: 'Tailwind CSS', level: 88 },
        ],
    },
    {
        name: 'Backend',
        skills: [
            { name: 'Node.js', level: 93 },
            { name: 'Express.js', level: 90 },
            { name: 'Python', level: 85 },
            { name: 'REST APIs', level: 92 },
            { name: 'GraphQL', level: 75 },
        ],
    },
    {
        name: 'Database',
        skills: [
            { name: 'PostgreSQL', level: 88 },
            { name: 'MongoDB', level: 85 },
            { name: 'MySQL', level: 82 },
            { name: 'Redis', level: 70 },
        ],
    },
    {
        name: 'DevOps & Tools',
        skills: [
            { name: 'Git & GitHub', level: 88 },
            { name: 'Docker', level: 75 },
            { name: 'Kubernetes', level: 65 },
            { name: 'CI/CD', level: 70 },
            { name: 'Linux', level: 80 },
        ],
    },
];

const techStack = [
    'JavaScript', 'TypeScript', 'Python', 'Node.js', 'Express',
    'React', 'PostgreSQL', 'MongoDB', 'MySQL', 'Docker',
    'Git', 'Kubernetes', 'REST API', 'GraphQL', 'Redux',
    'Tailwind', 'Linux', 'AWS', 'CI/CD', 'Nginx',
];

export function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.skills-header',
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
                '.skill-category',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.skills-grid',
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo(
                '.skill-bar',
                { width: '0%' },
                {
                    width: (i, target) => target.dataset.level + '%',
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: '.skills-grid',
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                '.tech-pill',
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.tech-stack',
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="pinned-section relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="section-content w-full min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/3 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="skills-header text-center mb-16">
          <span className="inline-block font-rajdhani text-sm tracking-[0.3em] uppercase text-[#00f0ff] mb-4">
            Expertise
          </span>
                        <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            SKILLS &{' '}
                            <span className="bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] bg-clip-text text-transparent">
              TECH STACK
            </span>
                        </h2>
                        <p className="font-space text-white/50 max-w-2xl mx-auto">
                            A comprehensive arsenal of technologies I wield to build powerful, scalable applications
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div className="skills-grid grid md:grid-cols-2 gap-8 mb-20">
                        {skillCategories.map((category) => (
                            <div
                                key={category.name}
                                className="skill-category glassmorphism rounded-2xl p-6 sm:p-8 hover:border-[#ff0033]/20 transition-all duration-300"
                            >
                                <h3 className="font-orbitron text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-[#ff0033] rounded-full" />
                                    {category.name}
                                </h3>

                                <div className="space-y-4">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between items-center mb-1.5">
                      <span className="font-rajdhani text-sm text-white/80 font-medium">
                        {skill.name}
                      </span>
                                                <span className="font-orbitron text-xs text-[#00f0ff]">
                        {skill.level}%
                      </span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="skill-bar h-full rounded-full bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] relative"
                                                    data-level={skill.level}
                                                    style={{ width: '0%' }}
                                                >
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#ff1a4d] rounded-full shadow-[0_0_10px_rgba(255,0,51,0.5)]" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="tech-stack text-center">
                        <h3 className="font-orbitron text-2xl font-bold text-white mb-8">
                            MY{' '}
                            <span className="bg-gradient-to-r from-[#00f0ff] to-[#33f3ff] bg-clip-text text-transparent">
              ARSENAL
            </span>
                        </h3>

                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                            {techStack.map((tech, index) => (
                                <span
                                    key={tech}
                                    className={`tech-pill px-5 py-2.5 rounded-full font-rajdhani font-semibold text-sm transition-all duration-300 hover:scale-110 cursor-default ${
                                        index % 3 === 0
                                            ? 'bg-[#ff0033]/10 text-[#ff0033] border border-[#ff0033]/30 hover:bg-[#ff0033]/20'
                                            : index % 3 === 1
                                                ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/20'
                                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                                    }`}
                                >
                {tech}
              </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
