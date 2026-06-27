"use client"
import Image from "next/image";
import React, { Fragment, useLayoutEffect, useRef, useContext, useState, useEffect, useMemo, useId } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


function Header() {
  const headerRef = useRef(null);

  // =========================
  // SCROLL STATES
  // =========================
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  // =========================
  // SCROLL LOGIC
  // =========================
  useEffect(() => {
    const threshold = 8;

    const onScroll = () => {
      const currentY = window.scrollY;
      const triggerY = window.innerHeight * 1.01;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentY >= triggerY) {
            setEnabled(true);
          } else {
            setEnabled(false);
            setHidden(true);
            lastScrollY.current = currentY;
            ticking.current = false;
            return;
          }

          const diff = currentY - lastScrollY.current;

          if (diff > threshold) setHidden(true);
          if (diff < -threshold) setHidden(false);

          lastScrollY.current = currentY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // =========================
  // INTERSECTION → DATA-THEME
  // =========================
  useEffect(() => {
    if (!enabled) return;

    const header = headerRef.current;
    if (!header) return;

    const sections = document.querySelectorAll("[data-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.dataset.theme = entry.target.dataset.theme;
          }
        });
      },
      {
        rootMargin: "-1px 0px -99% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <header
      ref={headerRef}
      data-theme="light"
      className={`
        group
        fixed top-0 left-0 z-50 w-full
        bg-transparent
        transition-transform duration-300 ease-out
        ${!enabled || hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div
        className="
          mx-auto
          flex items-center
          min-h-[64px] md:min-h-[72px]
          px-4 sm:px-6 md:px-15
        "
      >
        {/* LOGO — LEFT */}
        <a href="/" className="block">
          <img
            src="/images/Logo IQC - Black C.png"
            alt="IQC"
            className="
              w-20 sm:w-24 md:w-40
              h-auto
              transition
              group-data-[theme=dark]:invert
            "
          />
        </a>
      </div>
    </header>
  );
}

function Hero({ opened }) {
  const sectionRef = useRef(null);

  // =========================
  // SLICE CONFIG (LOCKED)
  // =========================
  const SLICE_COUNT = 10;
  const SLICE_STAGGER = 0.11;
  const SLICE_DURATION = 1.9;

  const SLICE_CLEAN_TIME =
    (SLICE_COUNT - 1) * SLICE_STAGGER + SLICE_DURATION;

  // =========================
  // SCROLL PARALLAX (LOGO)
  // =========================
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // =========================
  // BG ZOOM (AFTER SLICE CLEAN)
  // =========================
  const bgControls = {
    scale: opened ? 1.045 : 1,
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ================= HERO BACKGROUND ================= */}
      <motion.div
        initial={{ scale: 1 }}
        animate={bgControls}
        transition={{
          duration: 7,
          delay: opened ? SLICE_CLEAN_TIME : 0,
          ease: [0.22, 0.0, 0.2, 1],
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/BG - 1.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div
          style={{
            y: logoY,
            scale: logoScale,
          }}
          className="will-change-transform"
        >
          <div className="w-[200px] md:w-[260px] lg:w-[320px]">
            <Image
              src="/images/Logo IQC - White A.png"
              alt="IQC Logo"
              width={640}
              height={240}
              priority
              className="h-auto w-full select-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const sectionRef = useRef(null);
  const leadRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ================= LEAD SPLIT ================= */
      const leadSplit = new SplitText(leadRef.current, { type: "lines" });

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

      gsap.to(leadSplit.lines, {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.065,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 52%",
          once: true,
        },
      });

      /* ================= BODY SPLIT ================= */
      const bodySplit = new SplitText(bodyRef.current, { type: "lines" });

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

      gsap.to(bodySplit.lines, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
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
      <div className="relative z-10 mx-auto max-w-[820px] px-10 text-left">
        {/* LEAD */}
        <p
          ref={leadRef}
          className="
            mb-14
            text-[clamp(20px,2.2vw,28px)]
            leading-[1.3]
            tracking-[-0.005em]
          "
        >
          We are a Bali-based construction and quality control company built on
          international experience and local insight. Our team has delivered
          major projects across the GCC — a region renowned for its demanding
          standards of quality and precision. We bring that same commitment to
          professionalism and on-time delivery to every project in Bali.
        </p>

        {/* BODY */}
        <p
          ref={bodyRef}
          className="
            max-w-[640px]
            text-[clamp(14.5px,1.05vw,16px)]
            leading-[1.75]
            text-neutral-700
          "
        >
          With years on the island and a deep understanding of the Balinese
          market, we recognize the importance of clear communication, dependable
          supervision, and efficient execution. Our goal is simple — to deliver
          construction that is well-managed, transparent, and built to last.
        </p>
      </div>
    </section>
  );
}

function VisionMissionPurpose() {
  const sectionRef = useRef(null);
  const maskRefs = useRef([]);

  const ITEMS = [
    {
      title: "Vision",
      body:
        "To be a trusted leader in Bali’s construction industry, delivering projects with high standards, on-time performance, and lasting quality.",
      image:
        "https://i.pinimg.com/1200x/6b/de/06/6bde060e5c6ac48fe399a9d795ba3a07.jpg",
    },
    {
      title: "Mission",
      body:
        "To deliver quality construction through transparency, professionalism, and clear communication, ensuring every project is managed efficiently and completed on schedule.",
      image:
        "https://i.pinimg.com/1200x/1d/cb/b4/1dcbb4f7b926a21b08b130980328390f.jpg",
    },
    {
      title: "Purpose",
      body:
        "To raise the standard of construction in Bali by building trust, accountability, and long-term value — not only in structures, but in the entire construction process.",
      image:
        "https://i.pinimg.com/1200x/a8/0b/0d/a80b0df3a68f32ac3951b757145df6ac.jpg",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      maskRefs.current.forEach((mask) => {
        if (!mask) return;

        gsap.set(mask, { width: 0 });

        gsap.to(mask, {
          width: "100%",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mask,
            start: "top bottom",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
     data-theme="light"
      ref={sectionRef}
      className="
        relative w-full bg-[#fffcf7]
        py-20
        md:min-h-[80vh]
      "
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div
          className="
            grid grid-cols-1 md:grid-cols-3
            md:min-h-[60vh]
          "
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="
                group relative overflow-hidden
                bg-[#fffcf7]
                h-[420px]
                md:h-auto
              "
            >
              {/* ================= FRAME / MASK (WIDTH REVEAL) ================= */}
              <div
                ref={(el) => (maskRefs.current[i] = el)}
                className="absolute inset-y-0 left-0 overflow-hidden"
              >
                {/* IMAGE — DIAM TOTAL */}
                <div
                  className="absolute inset-0 bg-cover bg-left bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>

              {/* OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-neutral-900/70
                  transition-colors duration-500
                  md:bg-neutral-900/0
                  md:group-hover:bg-neutral-900/80
                "
              />

              {/* ================= DESKTOP TEXT (ASLI, TIDAK DISENTUH) ================= */}
              <div className="hidden md:block">
                <div className="absolute bottom-8 left-0 z-20 border-l-4 border-white px-8">
                  <h3
                    className="
                      uppercase font-semibold text-white
                      text-[clamp(20px,1.9vw,30px)]
                      tracking-[0.08em]
                    "
                  >
                    {item.title}
                  </h3>
                </div>

                <div
                  className="
                    absolute bottom-0 left-0 right-0 z-10
                    translate-y-[72px]
                    transition-transform duration-500 ease-out
                    group-hover:-translate-y-[60px]
                  "
                >
                  <div className="px-8 pb-8 pt-24">
                    <p
                      className="
                        max-w-[360px]
                        text-white
                        opacity-0
                        transition-opacity duration-300 delay-200
                        group-hover:opacity-100
                        text-[clamp(13.5px,1vw,15px)]
                        leading-[1.45]
                      "
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= MOBILE TEXT (FLOW AMAN) ================= */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 z-20 px-8 pb-8">
                <h3 className="mb-3 uppercase font-semibold text-white tracking-[0.08em]">
                  {item.title}
                </h3>
                <p className="max-w-[360px] text-white text-sm leading-[1.45]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function ScopeOfServices() {
  const [activeIndex, setActiveIndex] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  const SERVICES = [
    {
      title: "Consultation & Feasibility",
      desc: "Early-stage project assessment, cost estimation, and technical advice.",
      image:
        "https://i.pinimg.com/736x/54/c9/48/54c9480e739d4ca53af0714e3ec294c0.jpg",
    },
    {
      title: "Project Management",
      desc: "Coordination of timelines, resources, and contractors from start to finish.",
      image:
        "https://i.pinimg.com/1200x/a3/28/ce/a328ce34b6ad66466b7ab9b03ed4a924.jpg",
    },
    {
      title: "Construction & Execution",
      desc: "Full construction services covering all structural and architectural works.",
      image:
        "https://i.pinimg.com/736x/80/50/be/8050bebdb47f4018ac213261d26d9102.jpg",
    },
    {
      title: "Fit-Out & Finishing Works",
      desc: "Interior and exterior finishing tailored to project requirements.",
      image:
        "https://i.pinimg.com/1200x/55/29/82/552982431c45ab8479c50edd7c6575de.jpg",
    },
    {
      title: "Quality Control & Assurance",
      desc: "Inspection, testing, and verification across all stages of construction.",
      image:
        "https://i.pinimg.com/736x/ba/01/ff/ba01ffb8138f41bdf8c22ac18eac67a0.jpg",
    },
    {
      title: "Renovation & Maintenance",
      desc: "Structural or aesthetic upgrades and ongoing upkeep.",
      image:
        "https://i.pinimg.com/736x/89/33/c5/8933c57fdefa2e4a0991020355303f6b.jpg",
    },
    {
      title: "Health, Safety & Environment (HSE)",
      desc: "Implementation of safety and environmental compliance standards.",
      image:
        "https://i.pinimg.com/1200x/07/f1/4d/07f14df3e4807fd4f50918d791e587f0.jpg",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(headerRef.current, { type: "lines" });

      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, { y: 22, opacity: 0 });

      gsap.to(split.lines, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });

      gsap.set(itemsRef.current, { y: 20, opacity: 0 });

      gsap.to(itemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.06,
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
      className="relative w-full overflow-hidden bg-[#fffcf7] text-[#2f3b2f]"
    >
      {/* MIRRORED BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/image_2026-01-28_15-42-033.png"
          alt=""
          className="h-full w-full object-cover opacity-[0.05] scale-x-[-1]"
        />
      </div>

      <div className="relative z-10 min-h-screen px-6 sm:px-[6vw] py-20 sm:py-[14vh]">
        <div className="mb-24 sm:mb-28 max-w-full">
          <span className="block sm:hidden mb-6 text-[42px] font-[Canela] leading-[1.1]">
            Scope of Services
          </span>

          <span className="hidden sm:block mb-4 text-[11px] uppercase tracking-[0.25em] text-black/50">
            Scope of services
          </span>

          <h2
            ref={headerRef}
            className="font-normal text-[clamp(18px,1.9vw,23px)] leading-[1.45] tracking-tight max-w-[620px]"
          >
            Our services cover every stage of the construction process, from early
            consultation and planning to execution, quality control, and long-term
            maintenance.
          </h2>
        </div>

        <ul>
          {SERVICES.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <li
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="
                  relative
                  grid
                  grid-cols-[45%_55%]
                  lg:grid-cols-[40%_10%_50%]
                  gap-x-4
                  py-10 sm:py-[3.8vh]
                "
              >
                {/* divider */}
                <div className="absolute top-0 left-0 w-full h-px bg-black/15 z-0" />

                <div className="font-[Canela] text-[clamp(26px,3vw,35px)] leading-[1.15] tracking-[-0.02em]">
                  {item.title}
                </div>

                <div className="hidden lg:block" />

                <div className="relative z-10">
                  <div className="max-w-[340px] text-[clamp(15px,1.25vw,17px)] leading-[1.55] text-black/60">
                    {item.desc}
                  </div>

                  {/* IMAGE */}
                  <div
                    className={`
                      pointer-events-none
                      absolute
                      top-1/2
                      right-0
                      hidden lg:block
                      w-[18vw]
                      h-[32vh]
                      -translate-y-1/2
                      transition-all duration-500 ease-out
                      ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-6"
                      }
                    `}
                  >
                    <div className="h-full w-full bg-[#fffcf7] p-[2px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
 
function OurProjectApproach() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef([]);

  const STEPS = [
    {
      index: "01",
      title: "Planning & Technical Review",
      desc:
        "Detailed project assessment and coordination to align design, schedule, and resources.",
    },
    {
      index: "02",
      title: "Materials Quality Verification",
      desc:
        "Careful inspection and approval of materials to meet required standards.",
    },
    {
      index: "03",
      title: "Skilled Construction Execution",
      desc:
        "Professional supervision and workmanship throughout every phase of construction.",
    },
    {
      index: "04",
      title: "Regular Site Inspections & Reporting",
      desc:
        "Ongoing monitoring and transparent communication to ensure quality and progress.",
    },
    {
      index: "05",
      title: "Final Testing, Commissioning & Handover",
      desc:
        "Comprehensive checks, documentation, and client handover upon completion.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="relative w-full overflow-hidden bg-[#fffcf7] text-[#2f3b2f]"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/image_2026-01-28_20-39-35.png"
          alt=""
          className="h-full w-full object-cover opacity-[0.35]"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 md:px-16 py-20 md:py-28">
        {/* LABEL */}
        <div className="mb-6 md:absolute md:left-16 md:top-28 md:mb-0">
          {/* MOBILE ONLY — CANELA */}
          <span className="block md:hidden text-[42px] font-[Canela] text-[#2f3b2f] leading-[1.1]">
            Our Approach
          </span>

          {/* DESKTOP ONLY — SMALL LABEL */}
          <span className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-[#2f3b2f]/60">
            Our approach
          </span>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          {/* LEFT SPACE (DESKTOP ONLY) */}
          <div className="hidden md:block md:w-[45%]" />

          {/* RIGHT */}
          <div className="w-full md:w-[55%] flex flex-col">
            {/* HEADER */}
            <div className="mb-16 md:mb-24 max-w-[520px]">
              <h2
                ref={headerRef}
                className="
                  font-normal
                  text-[clamp(18px,1.7vw,22px)]
                  leading-[1.45]
                  tracking-tight
                "
              >
                Our approach follows a structured and methodical process from early
                planning and technical review through to final handover, ensuring
                every project is executed with clarity, control, and consistent
                quality.
              </h2>
            </div>

            {/* STEPS */}
            <div className="flex flex-col divide-y divide-[#7d8f7d]/25">
              {STEPS.map((step, i) => (
                <div
                  key={step.index}
                  ref={(el) => (stepsRef.current[i] = el)}
                  className="
                    relative
                    py-10
                    md:py-14
                    md:grid md:grid-cols-[1.4fr_1fr]
                    md:gap-16
                  "
                >
                  {/* MOBILE NUMBER */}
                  <span className="absolute right-0 top-10 text-sm opacity-70 md:hidden">
                    ({step.index})
                  </span>

                  {/* TITLE */}
                  <h3
                    className="
                      font-[Canela]
                      pr-10
                      md:pr-0
                      text-[clamp(22px,5vw,32px)]
                      leading-[1.2]
                      tracking-[-0.015em]
                    "
                  >
                    <span className="hidden md:inline mr-3 align-top text-[clamp(14px,1.1vw,16px)] font-medium tracking-wide">
                      ({step.index})
                    </span>
                    {step.title}
                  </h3>

                  {/* DESC */}
                  <p
                    className="
                      mt-4
                      md:mt-0
                      max-w-[420px]
                      text-[clamp(15px,4vw,17px)]
                      md:text-[clamp(15px,1.25vw,17px)]
                      leading-[1.5]
                      text-[#2f3b2f]/70
                    "
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  const ITEMS = [
    {
      title: "We Plan with Precision",
      desc:
        "Every project starts with clear timelines, budgets, and technical coordination.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      title: "We Supervise Daily",
      desc: "Consistent on-site management ensures progress and quality.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 11h18M5 7h14M7 15h10" />
        </svg>
      ),
    },
    {
      title: "We Communicate Clearly",
      desc: "Updates, reporting, and client feedback are part of our process.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      ),
    },
    {
      title: "We Deliver on Time",
      desc: "Schedules are planned realistically and tracked closely.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      title: "We Control Quality",
      desc: "Materials and workmanship are inspected at every stage.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" />
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
            lg:grid-cols-5
          "
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="
                relative
                px-6
                lg:px-8
                py-14
                border-t
                border-white/10
                lg:border-t-0
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
                  mb-5
                  font-semibold
                  text-[clamp(23px,1.2vw,18px)]
                  leading-[1.3]
                  tracking-wide 
                  font-[Canela]
                  md:h-20
                "
              >
                {item.title}
              </h4>

              {/* desc */}
              <p
                className="
                  max-w-[42ch]
                  text-[clamp(14px,1.05vw,15.5px)]
                  leading-[1.45]
                  text-white/70
                "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  const CORE_VALUES = [
    {
      id: "Craftsmanship",
      title: "Craftsmanship",
      text:
        "We take pride in our work. Every structure we build reflects attention to detail, solid execution, and long-term durability.",
    },
    {
      id: "Transparency",
      title: "Transparency",
      text:
        "We believe clear communication builds trust. We keep our clients informed and involved from start to finish.",
    },
    {
      id: "Reliability",
      title: "Reliability",
      text:
        "We deliver on our word. Every project is managed carefully, completed on schedule, and built to the standards we promise.",
    },
    {
      id: "Accountability",
      title: "Accountability",
      text:
        "We stand by our commitments — to our clients, our team, and the quality of our work.",
    },
    {
      id: "Respect",
      title: "Respect",
      text:
        "We value the people, communities, and culture that make Bali unique, and approach every project with that respect in mind.",
    },
  ];

  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        const BASE_OFFSET = isMobile ? 110 : 140;
        const REVEAL_RANGE = isMobile ? 160 : 200;
        const HOLD_ZONE = isMobile ? 110 : 140;

        itemsRef.current.forEach((el, i) => {
          if (!el) return;

          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: isDesktop ? 36 : 0,
              filter: isDesktop ? "blur(16px)" : "blur(0px)",
            },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${i * BASE_OFFSET} bottom-=20%`,
                end: `top+=${i * BASE_OFFSET + REVEAL_RANGE} bottom-=20%`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${i * BASE_OFFSET + HOLD_ZONE} bottom-=20%`,
            end: `top+=${i * BASE_OFFSET + HOLD_ZONE + BASE_OFFSET} bottom-=20%`,
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
            invalidateOnRefresh: true,
          });
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
     data-theme="dark"
      ref={sectionRef}
      className="
        relative w-full overflow-hidden text-white
        py-24
        md:min-h-[90vh]
      "
      style={{
        paddingBottom: "260px",
      }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#2c3627]" />

      {/* TEXTURE */}
      <div className="absolute inset-0 z-[5] opacity-10 pointer-events-none">
        <Image
          src="/images/image_2026-01-28_20-39-35.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* SECTION LABEL */}
      <div className="absolute left-6 md:left-24 top-12 md:top-16 z-30">
        <span className="text-[11px] md:text-[12px] uppercase tracking-[0.3em] text-white/60">
          Core values
        </span>
      </div>

      {/* CONTENT */}
      <div className="relative z-30 grid grid-cols-12 px-6 md:px-24 gap-x-6">
        {/* LEFT — DESCRIPTION */}
        <div className="col-span-12 md:col-span-5 flex flex-col md:mt-5">
          <p className="max-w-xl text-[16px] md:text-[22px] tracking-tight h-20 leading-[1.4] md:leading-[1.2] text-white/90">
            {CORE_VALUES[activeIndex].text}
          </p>

          {/* MOBILE — TITLES */}
          <div className="mt-8 space-y-2 md:hidden">
            {CORE_VALUES.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[i] = el)}
                className={`
                  text-[40px] font-[Canela] tracking-tight transition-colors duration-300
                  ${i === activeIndex ? "text-white" : "text-white/35"}
                `}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP — TITLES */}
        <div className="hidden md:flex col-span-7 items-start justify-end">
          <div className="space-y-3 text-right">
            {CORE_VALUES.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[i] = el)}
                className={`
                  text-[56px]  font-[Canela] tracking-tight transition-colors duration-300
                  ${i === activeIndex ? "text-white" : "text-white/35"}
                `}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOUSE IMAGE */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <Image
          src="/images/image_2026-01-28_20-39-12.png"
          alt=""
          width={1920}
          height={800}
          priority
          className="w-full object-contain"
        />
      </div>
    </section>
  );
}

function Value({ left, top, title, text }) {
  return (
    <div
      className="absolute max-w-[260px]"
      style={{ left, top }}
    >
      <div className="relative pl-6">
        {/* LINE */}
        <span
          className="absolute left-[2px] top-[6px] bg-white/55"
          style={{ height: "3.5rem", width: "1px" }}
        />

        {/* DOT */}
        <span
          className="absolute left-0 top-[6px] rounded-full bg-white"
          style={{ width: "6px", height: "6px" }}
        />

        <h4 className="text-[13px] font-semibold tracking-wide">
          {title}
        </h4>

        <p className="mt-2 text-[12px] leading-[1.7] text-white/80">
          {text}
        </p>
      </div>
    </div>
  );
}

function KataraSection() {
  const containerRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);

  const clusters = [
    {
      title: "Private Residences",
      location: "Doha, Qatar",
      description:
        "High-end private residential projects delivered under strict quality control and international construction standards.",
      images: {
        tall: "/images/capsule/22025364-7853-4189-8c33-093c1c1c085b 2.JPG",
        wide: "/images/capsule/5041364c-14f0-4b1b-ba03-fa23806b3cf8 2.JPG",
        medium: "/images/capsule/ca1a0e38-1775-4b6f-affb-234c1217281b 2.JPG",
      },
    },
    {
      title: "Private Residences",
      location: "Dubai, UAE",
      description:
        "Luxury residential villas developed for expatriate clients, emphasizing durability, material precision, and disciplined execution.",
      images: {
        tall: "/images/house/4b095765-4c75-447b-8121-2b7cf16fe831.JPG",
        wide: "/images/house/8b1b730d-2dbf-4f8d-8e06-61ea6f6506b9 2.JPG",
        medium: "/images/house/67603a1b-259c-4a0b-8e96-7cca103fb89f 2.JPG",
      },
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <section
        ref={containerRef}
        className="bg-[#fffcf7] py-32 md:py-40 overflow-x-hidden"
      >
        {clusters.map((cluster, index) => {
          const isEven = index % 2 === 0;

          const start = index * 0.25;
          const end = start + 0.5;

          const tallY = useTransform(scrollYProgress, [start, end], [-44, 44]);
          const wideY = useTransform(scrollYProgress, [start, end], [-28, 28]);
          const mediumY = useTransform(scrollYProgress, [start, end], [-20, 20]);

          const openGallery = () => {
            setLightboxImages([
              { src: cluster.images.tall },
              { src: cluster.images.wide },
              { src: cluster.images.medium },
            ]);
            setLightboxOpen(true);
          };

          return (
            <div key={index} className="mb-56">
              <div className="grid grid-cols-12 gap-x-8 px-6 md:px-10">

                {/* SIDE CAPTION */}
                <div
                  className={`
                    col-span-12 md:col-span-3
                    flex items-center
                    ${isEven ? "order-1" : "order-2"}
                  `}
                >
                  <div
                    className={`
                      max-w-xs
                      pb-8 md:pb-0
                      ${!isEven ? "mt-6 md:mt-0" : ""}
                    `}
                  >
                    <h2 className="text-[clamp(20px,5vw,24px)] font-[Canela] leading-[1.3] tracking-wide text-neutral-800">
                      {cluster.title}
                    </h2>

                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                      {cluster.location}
                    </p>

                    <p className="mt-3 md:mt-4 text-[14px] md:text-sm leading-[1.7] text-neutral-600">
                      {cluster.description}
                    </p>
                  </div>
                </div>

                {/* IMAGE GRID — UNCHANGED */}
                <div
                  className={`
                    col-span-12 md:col-span-9
                    grid grid-cols-12 gap-x-5 gap-y-10
                    ${isEven ? "order-2" : "order-1"}
                  `}
                >
                  {/* TALL */}
                  <div className="col-span-5 row-span-2 relative aspect-[2/3] overflow-hidden">
                    <motion.div style={{ y: tallY }} className="absolute inset-0 scale-[1.1]">
                      <Image src={cluster.images.tall} alt="" fill className="object-cover" />
                    </motion.div>
                  </div>

                  {/* WIDE */}
                  <div className="col-span-7 relative aspect-[16/10] overflow-hidden">
                    <motion.div style={{ y: wideY }} className="absolute inset-0 scale-[1.08]">
                      <Image src={cluster.images.wide} alt="" fill className="object-cover" />
                    </motion.div>
                  </div>

                  {/* MEDIUM */}
                  <div
                    onClick={openGallery}
                    className="col-span-6 -mt-4 relative aspect-[4/3] overflow-hidden group cursor-pointer"
                  >
                    <motion.div style={{ y: mediumY }} className="absolute inset-0 scale-[1.07]">
                      <Image src={cluster.images.medium} alt="" fill className="object-cover" />
                    </motion.div>

                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-xs uppercase tracking-[0.25em] text-white">
                        View Project
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        carousel={{ finite: true }}
        animation={{ fade: 300 }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      />
    </>
  );
}

function Footer() {
  return (
    <section className="relative min-h-[55vh] w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/BG - 1.jpg"
          alt="iQC Green Abstract Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[55vh] flex-col justify-between px-6 py-8 md:px-12 lg:px-20">
        
        {/* Top tagline */}
        <div className="text-center">
          <p className="text-[11px] tracking-[0.4em] text-white/80">
            GLOBALLY INSPIRED, LOCALLY ROOTED
          </p>
        </div>

        {/* Center logo */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[200px] md:w-[260px] lg:w-[300px]">
            <Image
              src="/images/Logo IQC - White 3.png"
              alt="Iconic Quality Consulting Logo"
              width={600}
              height={260}
              priority
              className="h-auto w-full select-none"
            />
          </div>
        </div>

        {/* Bottom contact */}
        <div className="flex flex-col gap-6 text-xs md:flex-row md:items-end md:justify-between">
          
          {/* Left */}
          <div className="opacity-80">
            <span className="tracking-wide">CONTACT US</span>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <div>
              <p className="mb-1 text-[10px] tracking-widest text-white/60">
                EMAIL
              </p>
              <a
                href="mailto:info@iconicqc.com"
                className="text-sm transition hover:text-white"
              >
                info@iconicqc.com
              </a>
            </div>

            <div>
              <p className="mb-1 text-[10px] tracking-widest text-white/60">
                ADDRESS
              </p>
              <p className="text-sm">Bali, Indonesia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

export default  function Page() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinnedSections = gsap.utils.toArray("[data-pin]");

      pinnedSections.forEach((section) => {
        // timeline biar pin + motion nyatu
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: true,          // 🔥 bikin dia ikut scroll
            anticipatePin: 1,
          },
        });

        // subtle upward drift
        tl.fromTo(
          section,
          { y: 0 },
          {
            y: -40,               // 🔧 tweak: -40 / -60 / -80
            ease: "none",
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Header />
      <Hero />
      <About />
      <VisionMissionPurpose />
    
      <CoreValues />
      {/* ================= PINNED + SUBTLE MOVE ================= */}
     
      <section data-pin></section>
      <OurProjectApproach />
      
   
      {/* ================= NORMAL SCROLL ================= */}
      <ScopeOfServices />
      <WhyChooseUs />
      <KataraSection />
      <Footer />
    </div>
  );
}