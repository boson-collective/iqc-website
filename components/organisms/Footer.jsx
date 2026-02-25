"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const bgRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const ctaSecondaryRef = useRef(null);

  /* ===============================
     BACKGROUND PARALLAX (IMAGE)
  =============================== */
  useEffect(() => {
    if (!bgRef.current || !footerRef.current) return;

    gsap.to(bgRef.current, {
      y: "-10%",
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  /* ===============================
     ENTRANCE MOTION
  =============================== */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-footer-anim]", {
        opacity: 0,
        y: 36,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  /* ===============================
     MAGNETIC CTA (DESKTOP ONLY FEEL)
  =============================== */
  const magnetic = (ref) => {
    if (!ref.current || window.innerWidth < 1024) return;

    const strength = 0.25;

    const move = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const reset = () => {
      gsap.to(ref.current, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    ref.current.addEventListener("mousemove", move);
    ref.current.addEventListener("mouseleave", reset);

    return () => {
      ref.current.removeEventListener("mousemove", move);
      ref.current.removeEventListener("mouseleave", reset);
    };
  };

  useEffect(() => {
    const clean1 = magnetic(ctaPrimaryRef);
    const clean2 = magnetic(ctaSecondaryRef);

    return () => {
      clean1 && clean1();
      clean2 && clean2();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#1f261c] text-white"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          ref={bgRef}
          src="/images/BG - 1.jpg"
          alt=""
          className="h-full w-full object-cover opacity-[0.85] scale-[1.08] will-change-transform"
        />
        <div className="absolute inset-0 bg-[#1f261c]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1f261c]/40 to-[#1f261c]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          {/* LEFT */}
          <div
            data-footer-anim
            className="
              text-center
              lg:text-left
            "
          >
            <img
              src="/images/Logo IQC - White 3.png"
              alt="IQC Logo"
              className="
                mb-10
                w-[150px]
                mx-auto
                opacity-95
                lg:mx-0
                lg:mb-12
                lg:w-[160px]
                lg:-translate-x-3
              "
            />

            <p className="max-w-[520px] mx-auto lg:mx-0 font-[Canela] text-[clamp(26px,5.5vw,42px)] lg:text-[clamp(28px,3.2vw,42px)] leading-[1.18] tracking-[-0.01em]">
              International standards.
              <br />
              Built for Bali.
            </p>

            <p className="mt-6 text-white/65 text-[16px] lg:text-[17px]">
              Get in touch.
            </p>
          </div>

          {/* RIGHT */}
          <div
            data-footer-anim
            className="
              flex
              flex-col
              items-center
              lg:items-end
              gap-10
              lg:gap-12
              text-center
              lg:text-right
            "
          >
            {/* CTA */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 sm:gap-6">
              <a
                ref={ctaPrimaryRef}
                href="#contact"
                className="
                  w-full
                  sm:w-auto
                  text-center
                  border
                  border-white
                  px-8
                  lg:px-9
                  py-4
                  text-xs
                  lg:text-sm
                  uppercase
                  tracking-[0.28em]
                  transition
                  duration-300
                  hover:bg-white
                  hover:text-[#1f261c]
                "
              >
                Contact Us
              </a>

              <a
                ref={ctaSecondaryRef}
                href="#quote"
                className="
                  w-full
                  sm:w-auto
                  text-center
                  border
                  border-white/40
                  px-8
                  lg:px-9
                  py-4
                  text-xs
                  lg:text-sm
                  uppercase
                  tracking-[0.28em]
                  text-white/80
                  transition
                  duration-300
                  hover:border-white
                  hover:text-white
                "
              >
                Request a Quote
              </a>
            </div>

            <a
              href="mailto:info@iconicqc.com"
              className="text-white/65 text-[14px] lg:text-[15px] tracking-wide transition hover:text-white"
            >
              info@iconicqc.com
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-20 lg:mt-24 pt-6 lg:pt-8 border-t border-white/10 text-center lg:text-left">
          <p className="text-xs text-white/45 tracking-wide">
            © {new Date().getFullYear()} Iconic Quality Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
