import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContainerProps {
    children: ReactNode;
}

const SCROLL_PER_SECTION = () => window.innerHeight * 1.2;
const SCROLL_SCRUB = 1;

export function ScrollContainer({ children }: ScrollContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.ticker.lagSmoothing(0.8);

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray<HTMLElement>('.pinned-section');
            if (sections.length === 0) return;

            sections.forEach((section, index) => {
                gsap.set(section, {
                    zIndex: index + 1,
                });

                const content = section.querySelector('.section-content');
                if (content) {
                    gsap.set(content, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });
                }

                if (index > 0) {
                    gsap.set(section, { yPercent: 100 });
                }
            });

            sections.forEach((section, index) => {
                if (index >= sections.length - 1) return;

                const nextSection = sections[index + 1];
                const scrollDistance = SCROLL_PER_SECTION;

                ScrollTrigger.create({
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${scrollDistance()}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: SCROLL_SCRUB,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onEnter: () => section.classList.add('section-active'),
                    onLeave: () => section.classList.remove('section-active'),
                    onEnterBack: () => section.classList.add('section-active'),
                    onLeaveBack: () => section.classList.remove('section-active'),
                });

                gsap.to(nextSection, {
                    yPercent: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${scrollDistance()}`,
                        scrub: SCROLL_SCRUB,
                        invalidateOnRefresh: true,
                    },
                });

                ScrollTrigger.create({
                    trigger: nextSection,
                    start: 'top bottom',
                    end: 'top top',
                    onEnter: () => nextSection.classList.add('section-active'),
                    onLeaveBack: () => nextSection.classList.remove('section-active'),
                });
            });

            const last = sections[sections.length - 1];
            ScrollTrigger.create({
                trigger: last,
                start: 'top 60%',
                onEnter: () => last.classList.add('section-active'),
                onLeaveBack: () => last.classList.remove('section-active'),
            });

            sections[0]?.classList.add('section-active');
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
