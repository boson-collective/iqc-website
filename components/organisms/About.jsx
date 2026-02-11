"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef(null);
  const leadRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    let ctx;
    let resizeTimeout;

    const initAnimation = () => {
      ctx = gsap.context(() => {
        /* ================= LEAD SPLIT ================= */
        const leadSplit = new SplitText(leadRef.current, {
          type: "lines",
          linesClass: "split-line",
        });

        leadSplit.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.set(leadSplit.lines, {
          y: 32,
          opacity: 0.15,
        });

        /* ================= BODY SPLIT ================= */
        const bodySplit = new SplitText(bodyRef.current, {
          type: "lines",
          linesClass: "split-line",
        });

        bodySplit.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.set(bodySplit.lines, {
          y: 20,
          opacity: 0.2,
        });

        const triggerConfig = {
          trigger: sectionRef.current,
          start: "top 52%",
          once: true,
        };

        gsap.to(leadSplit.lines, {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.065,
          scrollTrigger: triggerConfig,
        });

        gsap.to(bodySplit.lines, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: triggerConfig,
        });
      }, sectionRef);
    };

    /* ================= INIT FIRST ================= */
    initAnimation();

    /* ================= RESIZE SELF HEAL ================= */
    const handleResize = () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (ctx) {
          ctx.revert(); // kill old split + animations
        }

        ScrollTrigger.refresh(); // reset scroll positions
        initAnimation(); // re-init fresh split
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#fffcf7] text-[#2f3b2f]"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <Image
          src="/images/image_2026-01-28_15-42-033.png"
          alt="Architectural blueprint background"
          fill
          priority
          className="object-cover opacity-[0.08]"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-[720px] px-10 text-left">
        <p
          ref={leadRef}
          className="mb-14 text-[clamp(20px,2.2vw,28px)] leading-[1.3] tracking-tight"
        >
          We are a Bali-based construction and quality control company bringing
          international project experience to the local market. Our team has
          delivered diverse projects across the GCC and applies the same
          discipline, quality, and structured management to every project in
          Bali.
        </p>

        <p
          ref={bodyRef}
          className="max-w-[640px] text-[clamp(20px,2.2vw,28px)] leading-[1.3] tracking-tight text-neutral-700"
        >
          We focus on what matters most — strong supervision, clear
          communication, and reliable delivery.
        </p>
      </div>
    </section>
  );
}
