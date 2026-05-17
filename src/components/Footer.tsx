import { Code2, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#ff0033]/20 to-[#00f0ff]/20 rounded-lg">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="font-orbitron text-lg font-bold text-white">JOSEPH MULWA</span>
                            <p className="font-rajdhani text-xs text-white/40 tracking-wider uppercase">
                                Full-Stack Developer
                            </p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="flex items-center gap-2 font-space text-sm text-white/40">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-[#ff0033] fill-[#ff0033]" />
                        <span>and lots of</span>
                        <span className="text-[#00f0ff]">coffee</span>
                    </div>

                    {/* Back to top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg font-rajdhani text-sm text-white/50 hover:border-[#ff0033]/30 hover:text-[#ff0033] transition-all duration-300"
                    >
                        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        Back to Top
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="font-space text-xs text-white/30">
                        &copy; {new Date().getFullYear()} Joseph Mulwa. All rights reserved. Built with React, Tailwind CSS & passion.
                    </p>
                </div>
            </div>
        </footer>
    );
}
