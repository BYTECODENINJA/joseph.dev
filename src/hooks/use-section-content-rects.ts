import { useCallback, useEffect, useRef } from 'react';

export type ContentRect = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
};

const PADDING = 48;

function measureRects(): ContentRect[] {
    const seen = new Set<HTMLElement>();
    const elements: HTMLElement[] = [];

    document.querySelectorAll<HTMLElement>('.section-content-inner').forEach((el) => {
        seen.add(el);
        elements.push(el);
    });

    document.querySelectorAll<HTMLElement>('.section-content').forEach((content) => {
        const box =
            content.querySelector<HTMLElement>('[class*="max-w-"]') ||
            content.querySelector<HTMLElement>('.relative.z-10') ||
            content;

        if (!seen.has(box)) {
            seen.add(box);
            elements.push(box);
        }
    });

    return elements.map((el) => {
        const r = el.getBoundingClientRect();
        return {
            left: r.left - PADDING,
            top: r.top - PADDING,
            right: r.right + PADDING,
            bottom: r.bottom + PADDING,
            width: r.width + PADDING * 2,
            height: r.height + PADDING * 2,
        };
    });
}

export function useSectionContentRects() {
    const rectsRef = useRef<ContentRect[]>([]);

    const update = useCallback(() => {
        rectsRef.current = measureRects();
    }, []);

    useEffect(() => {
        update();

        const onScroll = () => update();
        const onResize = () => update();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        const interval = window.setInterval(update, 200);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            window.clearInterval(interval);
        };
    }, [update]);

    return rectsRef;
}

export function pointInRects(
    x: number,
    y: number,
    rects: ContentRect[]
): boolean {
    return rects.some(
        (r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
    );
}
