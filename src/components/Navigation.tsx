import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

interface NavigationProps {
    onHireMeClick: () => void;
}

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Interests', href: '#interests' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export function Navigation({ onHireMeClick }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map((link) => link.href.replace('#', ''));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? 'glassmorphism py-3'
                        : 'bg-transparent py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a
                            href="#hero"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#hero');
                            }}
                            className="flex items-center gap-2 group"
                        >
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff0033] to-[#00f0ff] rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                <Code2 className="w-5 h-5 text-white relative z-10" />
                            </div>
                            <span className="font-orbitron text-lg font-bold text-white tracking-wider">
                JM
              </span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(link.href);
                                    }}
                                    className={`relative px-4 py-2 text-sm font-rajdhani font-medium tracking-wide transition-colors duration-300 ${
                                        activeSection === link.href.replace('#', '')
                                            ? 'text-[#ff0033]'
                                            : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    {activeSection === link.href.replace('#', '') && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ff0033] rounded-full" />
                                    )}
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={onHireMeClick}
                                className="relative px-6 py-2.5 font-orbitron text-xs font-bold tracking-widest uppercase text-white overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] transition-transform duration-300 group-hover:scale-105" />
                                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ff1a4d] to-[#ff0033]" />
                                <span className="relative z-10">Hire Me</span>
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
                    isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <div
                    className={`absolute top-20 left-4 right-4 glassmorphism-strong rounded-2xl p-6 transition-all duration-500 ${
                        isMobileMenuOpen
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-4 opacity-0'
                    }`}
                >
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.href);
                                }}
                                className={`px-4 py-3 rounded-lg font-rajdhani font-semibold text-lg transition-all ${
                                    activeSection === link.href.replace('#', '')
                                        ? 'bg-[#ff0033]/10 text-[#ff0033]'
                                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                onHireMeClick();
                            }}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#ff0033] to-[#ff1a4d] rounded-lg font-orbitron text-sm font-bold tracking-widest uppercase text-white text-center"
                        >
                            Hire Me
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
