import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContainerProps {
    children: ReactNode;
}

export function ScrollContainer({ children }: ScrollContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.ticker.lagSmoothing(0.8);

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray<HTMLElement>('.pinned-section');
            if (sections.length === 0) return;

            // Set initial z-index for proper stacking
            sections.forEach((section, index) => {
                gsap.set(section, {
                    zIndex: sections.length - index,
                    clearProps: 'transform,opacity'
                });
            });

            // Create smooth section transitions without yPercent
            sections.forEach((section, index) => {
                if (index >= sections.length - 1) return;

                const nextSection = sections[index + 1];
                const sectionHeight = () => section.offsetHeight;

                // Create scroll trigger for each section
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${sectionHeight()}`,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        section.classList.add('section-active');
                        nextSection.classList.remove('section-active');
                    },
                    onLeaveBack: () => {
                        section.classList.remove('section-active');
                    },
                });
            });

            // Mark the last section as active when reached
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                ScrollTrigger.create({
                    trigger: lastSection,
                    start: 'top center',
                    onEnter: () => lastSection.classList.add('section-active'),
                    onLeaveBack: () => lastSection.classList.remove('section-active'),
                });
            }

            // Mark first section as active on load
            if (sections[0]) {
                sections[0].classList.add('section-active');
            }
        }, containerRef);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('resize', refresh);

        return () => {
            window.removeEventListener('resize', refresh);
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="scroll-stack relative">
            {children}
        </div>
    );
}
