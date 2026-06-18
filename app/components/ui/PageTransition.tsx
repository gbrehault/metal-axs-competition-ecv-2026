'use client';

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  // null = not yet initialized, string = previous pathname
  const prevPathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, { x: '-100%' });
  }, []);

  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    const isRealNavigation = prevPathRef.current !== null;
    prevPathRef.current = pathname;

    if (!isRealNavigation || !overlayRef.current) return;

    gsap.killTweensOf(overlayRef.current);
    gsap.to(overlayRef.current, {
      x: '100%',
      duration: 0.5,
      ease: 'power4.inOut',
      onComplete: () => {
        if (overlayRef.current) gsap.set(overlayRef.current, { x: '-100%' });
        isAnimatingRef.current = false;
      },
    });
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (isAnimatingRef.current || href === pathname) return;
      isAnimatingRef.current = true;

      if (!overlayRef.current) {
        router.push(href);
        return;
      }

      gsap.killTweensOf(overlayRef.current);
      gsap.fromTo(
        overlayRef.current,
        { x: '-100%' },
        {
          x: '0%',
          duration: 0.5,
          ease: 'power4.inOut',
          onComplete: () => {
            router.push(href);
          },
        },
      );
    },
    [router, pathname],
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-1000 pointer-events-none"
        style={{
          backgroundColor: 'var(--color-secondary)',
          willChange: 'transform',
        }}
      />
    </TransitionContext.Provider>
  );
}
