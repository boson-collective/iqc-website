"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  const ITEMS = [
    {
      title: "Structured planning and realistic timelines",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      title: "Daily site supervision and accountability",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" />
        </svg>
      ),
    },
    {
      title: "Clear, transparent communication",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      ),
    },
    {
      title: "Consistent quality from start to finish",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 12l5 5L20 6" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { y: 20, opacity: 0 });
      gsap.set(itemsRef.current, { y: 24, opacity: 0 });

      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });

      gsap.to(itemsRef.current, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative w-full overflow-hidden bg-[#2c3627] text-white"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/image_2026-01-28_20-39-35.png"
          alt=""
          className="h-full w-full object-cover opacity-[0.78]"
        />
        <div className="absolute inset-0 bg-[#2c3627]/90" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto px-6 sm:px-10 lg:px-24 py-24">
        {/* HEADER */}
        <div ref={headerRef} className="mb-5 sm:mb-28 max-w-[680px]">
          <span className="mb-4 block text-[11px] uppercase tracking-[0.25em] text-white/65">
            Why Choose Us
          </span>
        </div>

        {/* ITEMS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="
                relative
                lg:px-8
                py-14
                border-b
                border-white/10
                lg:border-b-0
                lg:border-l
                last:lg:border-r
              "
            >
              {/* icon */}
              <div className="mb-8 text-white/80">
                {item.icon}
              </div>

              {/* title */}
              <h4
                className="
                  font-semibold
                  text-[clamp(22px,1.2vw,18px)]
                  leading-[1.3]
                  tracking-wide
                  font-[Canela]
                  md:h-24
                "
              >
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
