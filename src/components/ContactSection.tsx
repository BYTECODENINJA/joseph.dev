import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', url: 'https://github.com/BYTECODENINJA' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/joseph-mulwa808' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', url: 'https://twitter.com/' },
];

export function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.contact-header',
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
                '.contact-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.contact-grid',
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="pinned-section relative h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="section-content w-full h-full flex items-center justify-center overflow-y-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/3 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="contact-header text-center mb-16">
          <span className="inline-block font-rajdhani text-sm tracking-[0.3em] uppercase text-[#ff0033] mb-4">
            Get In Touch
          </span>
                        <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            LET'S{' '}
                            <span className="bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] bg-clip-text text-transparent">
              CONNECT
            </span>
                        </h2>
                        <p className="font-space text-white/50 max-w-2xl mx-auto">
                            Have a project in mind or want to collaborate? I'm always open to discussing new opportunities
                        </p>
                    </div>

                    <div className="contact-grid grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="contact-card glassmorphism rounded-2xl p-6 group hover:border-[#ff0033]/30 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#ff0033]/10 flex items-center justify-center text-[#ff0033] group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-rajdhani text-sm text-white/50 uppercase tracking-wider">Email</div>
                                        <a href="mailto:joseph.mulwa@example.com" className="font-space text-white hover:text-[#ff0033] transition-colors">
                                            joseph.mulwa@example.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-card glassmorphism rounded-2xl p-6 group hover:border-[#00f0ff]/30 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff] group-hover:scale-110 transition-transform">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-rajdhani text-sm text-white/50 uppercase tracking-wider">Phone</div>
                                        <a href="tel:+254712345678" className="font-space text-white hover:text-[#00f0ff] transition-colors">
                                            +254 712 345 678
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-card glassmorphism rounded-2xl p-6 group hover:border-[#ff0033]/30 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#ff0033]/10 flex items-center justify-center text-[#ff0033] group-hover:scale-110 transition-transform">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-rajdhani text-sm text-white/50 uppercase tracking-wider">Location</div>
                                        <span className="font-space text-white">Nairobi, Kenya</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="contact-card glassmorphism rounded-2xl p-6">
                                <div className="font-rajdhani text-sm text-white/50 uppercase tracking-wider mb-4">Social Links</div>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                alert(`${social.label} profile coming soon!`);
                                            }}
                                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ff0033] hover:border-[#ff0033]/30 hover:bg-[#ff0033]/10 transition-all duration-300"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Message Form */}
                        <div className="contact-card glassmorphism rounded-2xl p-6 sm:p-8">
                            <h3 className="font-orbitron text-xl font-bold text-white mb-6">Send a Message</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    alert('Message sent! I will get back to you soon.');
                                }}
                                className="space-y-4"
                            >
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-rajdhani text-sm text-white/50 uppercase tracking-wider mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-rajdhani text-sm text-white/50 uppercase tracking-wider mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-rajdhani text-sm text-white/50 uppercase tracking-wider mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="What's this about?"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block font-rajdhani text-sm text-white/50 uppercase tracking-wider mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell me about your project..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-space text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/50 transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] rounded-lg font-orbitron text-sm font-bold tracking-widest uppercase text-white hover:shadow-[0_0_30px_rgba(255,0,51,0.3)] transition-all duration-300"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
