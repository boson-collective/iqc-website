"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export default function ProjectApproach() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef([]);
  const bgImageRef = useRef(null);

  const STEPS = [
    { index: "01", title: "Plan & align scope, schedule, and resources" },
    { index: "02", title: "Verify materials and workmanship" },
    { index: "03", title: "Execute with hands-on site supervision" },
    { index: "04", title: "Inspect, report, and adjust in real time" },
    { index: "05", title: "Test, commission, and hand over with confidence" },
  ];

  /* =========================
     GSAP
  ========================= */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      /* ===== HEADER SPLIT ===== */
      const split = new SplitText(headerRef.current, { type: "lines" });

      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, { y: 24, opacity: 0 });

      gsap.to(split.lines, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          once: true,
        },
      });

      /* ===== STEPS ===== */
      gsap.set(stepsRef.current, { y: 24, opacity: 0 });

      gsap.to(stepsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          once: true,
        },
      });

      /* ===== IMAGE PARALLAX (IMAGE ONLY) ===== */
      gsap.fromTo(
        bgImageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =========================
     RENDER
  ========================= */
  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#fffcf7] text-[#2f3b2f]"
    >
      {/* BACKGROUND FRAME (STATIC) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="/images/approach-bg.png"
          alt=""
          className="h-[120%] w-full md:w-[50vw] object-cover "
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 md:px-16 py-20 md:py-28">
        {/* LABEL */}
        <div className="mb-6 md:absolute md:left-28 md:top-28 md:mb-0">
          <span className="block md:hidden text-[42px] font-[Canela] leading-[1.1]">
            Our Approach
          </span>

          <span className="hidden md:block text-[11px] uppercase tracking-[0.25em] opacity-60">
            Our approach
          </span>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          {/* LEFT SPACE */}
          <div className="hidden md:block md:w-[45%]" />

          {/* RIGHT */}
          <div className="w-full md:w-[55%] flex flex-col">
            {/* HEADER */}
            <div className="mb-16 md:mb-24 max-w-[560px]">
              <h2
                ref={headerRef}
                className="
                  text-[clamp(22px,3.8vw,43px)]
                  leading-[1.3]
                  tracking-[-1.9]
                "
              >
                A clear process that keeps{" "}
                <span className="md:font-[Canela]">
                  projects on track
                </span>
              </h2>
            </div>

            {/* STEPS */}
            <div className="flex flex-col divide-y divide-[#7d8f7d]/25">
              {STEPS.map((step, i) => (
                <div
                  key={step.index}
                  ref={(el) => (stepsRef.current[i] = el)}
                  className="relative py-12 md:py-16"
                >
                  <span className="absolute right-0 top-10 text-sm opacity-60 md:hidden">
                    ({step.index})
                  </span>

                  <h3
                    className="
                      font-[Canela]
                      pr-10
                      md:pr-0
                      text-[clamp(26px,6vw,40px)]
                      md:text-[clamp(24px,2.4vw,38px)]
                      leading-[1.15]
                      tracking-[-0.02em]
                    "
                  >
                    <span className="hidden md:inline mr-4 align-top text-[clamp(14px,1.1vw,16px)] font-medium tracking-widest opacity-60">
                      ({step.index})
                    </span>
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
