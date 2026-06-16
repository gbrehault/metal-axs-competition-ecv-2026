"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedBackground() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);
  const blob4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1.current, {
        x: "25vw", y: "-20vh", scale: 1.3, opacity: 0.5,
        duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(blob2.current, {
        x: "-20vw", y: "25vh", scale: 1.25, opacity: 0.45,
        duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5,
      });
      gsap.to(blob3.current, {
        x: "-22vw", y: "-18vh", scale: 1.3, opacity: 0.4,
        duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8,
      });
      gsap.to(blob4.current, {
        x: "18vw", y: "22vh", scale: 1.2, opacity: 0.35,
        duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0d0d0d]">
      <div ref={blob1} className="absolute" style={{
        left: "-10%", top: "20%", width: "55vw", height: "55vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, #e8512a 0%, #b83010 40%, transparent 70%)",
        filter: "blur(80px)", opacity: 0.85,
      }} />
      <div ref={blob2} className="absolute" style={{
        right: "-5%", top: "-10%", width: "40vw", height: "40vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, #cc1a00 0%, #8b0000 50%, transparent 75%)",
        filter: "blur(70px)", opacity: 0.75,
      }} />
      <div ref={blob3} className="absolute" style={{
        right: "5%", bottom: "-5%", width: "35vw", height: "35vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, #cc1a00 0%, #8b0000 50%, transparent 75%)",
        filter: "blur(70px)", opacity: 0.6,
      }} />
      <div ref={blob4} className="absolute" style={{
        left: "20%", bottom: "-15%", width: "30vw", height: "30vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, #e8512a 0%, #b83010 50%, transparent 75%)",
        filter: "blur(80px)", opacity: 0.5,
      }} />
    </div>
  );
}
