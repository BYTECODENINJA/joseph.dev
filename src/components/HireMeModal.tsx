import { useState } from 'react';
import { X, Briefcase, Building2, Rocket, Send, CheckCircle } from 'lucide-react';

interface HireMeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type EmploymentType = 'fulltime' | 'parttime' | 'contract' | 'freelance';
type WorkLocation = 'onsite' | 'remote' | 'hybrid';
type HireType = 'employment' | 'project';

export function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
    const [hireType, setHireType] = useState<HireType>('employment');
    const [submitted, setSubmitted] = useState(false);

    // Employment form state
    const [empForm, setEmpForm] = useState({
        name: '',
        email: '',
        contact: '',
        company: '',
        yourRole: '',
        hireRole: '',
        employmentType: 'fulltime' as EmploymentType,
        workLocation: 'remote' as WorkLocation,
        description: '',
        skills: '',
    });

    // Project form state
    const [projForm, setProjForm] = useState({
        name: '',
        email: '',
        contact: '',
        company: '',
        yourRole: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        techStack: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
            // Reset forms
            setEmpForm({
                name: '', email: '', contact: '', company: '', yourRole: '',
                hireRole: '', employmentType: 'fulltime', workLocation: 'remote',
                description: '', skills: '',
            });
            setProjForm({
                name: '', email: '', contact: '', company: '', yourRole: '',
                projectType: '', budget: '', timeline: '', description: '', techStack: '',
            });
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glassmorphism-strong rounded-2xl border border-white/10">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
                    <div>
                        <h2 className="font-orbitron text-xl font-bold text-white">
                            HIRE <span className="text-[#ff0033]">ME</span>
                        </h2>
                        <p className="font-space text-xs text-white/40 mt-1">
                            Let's build something amazing together
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {submitted ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00f0ff]/10 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-[#00f0ff]" />
                            </div>
                            <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
                                Message Sent!
                            </h3>
                            <p className="font-space text-white/50">
                                Thank you for reaching out. I'll get back to you within 24 hours.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Hire Type Toggle */}
                            <div className="flex gap-3 mb-8">
                                <button
                                    type="button"
                                    onClick={() => setHireType('employment')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-rajdhani font-semibold text-sm transition-all duration-300 ${
                                        hireType === 'employment'
                                            ? 'bg-[#ff0033]/20 border border-[#ff0033]/40 text-[#ff0033]'
                                            : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10'
                                    }`}
                                >
                                    <Building2 className="w-4 h-4" />
                                    Long-Term Employment
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setHireType('project')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-rajdhani font-semibold text-sm transition-all duration-300 ${
                                        hireType === 'project'
                                            ? 'bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff]'
                                            : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10'
                                    }`}
                                >
                                    <Rocket className="w-4 h-4" />
                                    Project Based
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Common Fields */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={hireType === 'employment' ? empForm.name : projForm.name}
                                            onChange={(e) => {
                                                if (hireType === 'employment') {
                                                    setEmpForm({ ...empForm, name: e.target.value });
                                                } else {
                                                    setProjForm({ ...projForm, name: e.target.value });
                                                }
                                            }}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={hireType === 'employment' ? empForm.email : projForm.email}
                                            onChange={(e) => {
                                                if (hireType === 'employment') {
                                                    setEmpForm({ ...empForm, email: e.target.value });
                                                } else {
                                                    setProjForm({ ...projForm, email: e.target.value });
                                                }
                                            }}
                                            placeholder="john@company.com"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={hireType === 'employment' ? empForm.contact : projForm.contact}
                                            onChange={(e) => {
                                                if (hireType === 'employment') {
                                                    setEmpForm({ ...empForm, contact: e.target.value });
                                                } else {
                                                    setProjForm({ ...projForm, contact: e.target.value });
                                                }
                                            }}
                                            placeholder="+254 712 345 678"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={hireType === 'employment' ? empForm.company : projForm.company}
                                            onChange={(e) => {
                                                if (hireType === 'employment') {
                                                    setEmpForm({ ...empForm, company: e.target.value });
                                                } else {
                                                    setProjForm({ ...projForm, company: e.target.value });
                                                }
                                            }}
                                            placeholder="Acme Inc."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                        Your Role
                                    </label>
                                    <input
                                        type="text"
                                        value={hireType === 'employment' ? empForm.yourRole : projForm.yourRole}
                                        onChange={(e) => {
                                            if (hireType === 'employment') {
                                                setEmpForm({ ...empForm, yourRole: e.target.value });
                                            } else {
                                                setProjForm({ ...projForm, yourRole: e.target.value });
                                            }
                                        }}
                                        placeholder="CTO, Product Manager, etc."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                    />
                                </div>

                                {/* Employment-specific fields */}
                                {hireType === 'employment' && (
                                    <>
                                        <div>
                                            <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                Role You're Hiring For *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={empForm.hireRole}
                                                onChange={(e) => setEmpForm({ ...empForm, hireRole: e.target.value })}
                                                placeholder="Senior Full-Stack Developer"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                    Employment Type *
                                                </label>
                                                <select
                                                    required
                                                    value={empForm.employmentType}
                                                    onChange={(e) => setEmpForm({ ...empForm, employmentType: e.target.value as EmploymentType })}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all appearance-none"
                                                >
                                                    <option value="fulltime">Full-Time</option>
                                                    <option value="parttime">Part-Time</option>
                                                    <option value="contract">Contract</option>
                                                    <option value="freelance">Freelance</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                    Work Location *
                                                </label>
                                                <select
                                                    required
                                                    value={empForm.workLocation}
                                                    onChange={(e) => setEmpForm({ ...empForm, workLocation: e.target.value as WorkLocation })}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all appearance-none"
                                                >
                                                    <option value="remote">Remote</option>
                                                    <option value="onsite">On-Site</option>
                                                    <option value="hybrid">Hybrid</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                Required Skills
                                            </label>
                                            <input
                                                type="text"
                                                value={empForm.skills}
                                                onChange={(e) => setEmpForm({ ...empForm, skills: e.target.value })}
                                                placeholder="React, Node.js, PostgreSQL..."
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Project-specific fields */}
                                {hireType === 'project' && (
                                    <>
                                        <div>
                                            <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                Project Type *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={projForm.projectType}
                                                onChange={(e) => setProjForm({ ...projForm, projectType: e.target.value })}
                                                placeholder="Web Application, API, E-commerce..."
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                    Budget Range (KES)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={projForm.budget}
                                                    onChange={(e) => setProjForm({ ...projForm, budget: e.target.value })}
                                                    placeholder="100,000 - 500,000"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                    Timeline
                                                </label>
                                                <input
                                                    type="text"
                                                    value={projForm.timeline}
                                                    onChange={(e) => setProjForm({ ...projForm, timeline: e.target.value })}
                                                    placeholder="2-3 months"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                                Preferred Tech Stack
                                            </label>
                                            <input
                                                type="text"
                                                value={projForm.techStack}
                                                onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })}
                                                placeholder="React, Node.js, MongoDB..."
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/50 transition-all"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Description (common) */}
                                <div>
                                    <label className="block font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={hireType === 'employment' ? empForm.description : projForm.description}
                                        onChange={(e) => {
                                            if (hireType === 'employment') {
                                                setEmpForm({ ...empForm, description: e.target.value });
                                            } else {
                                                setProjForm({ ...projForm, description: e.target.value });
                                            }
                                        }}
                                        placeholder="Tell me more about the role/project, expectations, team size, etc."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-orbitron text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 ${
                                        hireType === 'employment'
                                            ? 'bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] hover:shadow-[0_0_30px_rgba(255,0,51,0.3)]'
                                            : 'bg-gradient-to-r from-[#00a0a0] to-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]'
                                    }`}
                                >
                                    <Send className="w-4 h-4" />
                                    Submit Proposal
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
