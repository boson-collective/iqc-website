"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const headerRefs = useRef([]);

  const SERVICES = [
    {
      title: "Consultation & Feasibility",
      image:
        "https://i.pinimg.com/736x/54/c9/48/54c9480e739d4ca53af0714e3ec294c0.jpg",
    },
    {
      title: "Project Management",
      image:
        "https://i.pinimg.com/1200x/a3/28/ce/a328ce34b6ad66466b7ab9b03ed4a924.jpg",
    },
    {
      title: "Fit-Out & Finishing Works",
      image:
        "https://i.pinimg.com/1200x/55/29/82/552982431c45ab8479c50edd7c6575de.jpg",
    },
    {
      title: "Quality Control & Assurance",
      image:
        "https://i.pinimg.com/736x/ba/01/ff/ba01ffb8138f41bdf8c22ac18eac67a0.jpg",
    },
    {
      title: "Renovation & Maintenance",
      image:
        "https://i.pinimg.com/736x/89/33/c5/8933c57fdefa2e4a0991020355303f6b.jpg",
    },
    {
      title: "Health, Safety & Environment (HSE)",
      image:
        "https://i.pinimg.com/1200x/07/f1/4d/07f14df3e4807fd4f50918d791e587f0.jpg",
    },
  ];

  const POSITIONS = [
    { imageLeft: "0%", textLeft: "42%", textAlign: "left" },
    { imageLeft: "38%", textLeft: "70%", textAlign: "right" },
    { imageLeft: "100%", textLeft: "30%", textAlign: "left" },
    { imageLeft: "55%", textLeft: "0%", textAlign: "left" },
    { imageLeft: "0%", textLeft: "50%", textAlign: "left" },
    { imageLeft: "60%", textLeft: "0%", textAlign: "right" },
    { imageLeft: "100%", textLeft: "22%", textAlign: "left" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* IMAGE PARALLAX — DESKTOP ONLY */
      imageRefs.current.forEach((img) => {
        if (!img) return;

        gsap.fromTo(
          img,
          { y: -8 },
          {
            y: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      /* HEADER REVEAL */
      headerRefs.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      /* TEXT REVEAL */
      textRefs.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 105%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-theme="light" className="relative bg-[#fffcf7] text-[#2f3b2f] px-5 sm:px-[6vw] py-20">
      {/* HEADER */}
      <div className="mb-24 overflow-hidden">
        <span className="block md:hidden text-[42px] font-[Canela] leading-[1.1]">
            Our Approach
          </span>
        <span
          ref={(el) => (headerRefs.current[0] = el)}
          className="hidden sm:block mb-4 text-[11px] uppercase tracking-[0.25em] text-black/50"
        >
          What We Do
        </span>

        <div className="overflow-hidden">
          <h2
            ref={(el) => (headerRefs.current[1] = el)}
            className="text-[clamp(22px,4vw,48px)] leading-[1.3] tracking-[-1.9px]"
          >
            End-to-end construction and quality control services{" "}
            <span className="md:font-[Canela] md:font-light">
              tailored to each project
            </span>
          </h2>
        </div>
      </div>

      {/* LIST */}
      <div>
        {SERVICES.map((item, i) => {
          const p = POSITIONS[i];

          return (
            <div key={i} className="relative">
              <div className="absolute top-0 left-0 w-full h-px bg-neutral-300" />

              {/* DESKTOP */}
              <div className="relative hidden lg:block h-[210px]">
                {/* IMAGE */}
                <div
                  className="absolute top-1/2"
                  style={{
                    left: p.imageLeft,
                    transform:
                      p.imageLeft === "100%"
                        ? "translate(-100%, -50%)"
                        : "translateY(-50%)",
                  }}
                >
                  <div className="w-[300px] aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={(el) => (imageRefs.current[i] = el)}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover scale-[1.04]"
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div
                  className="absolute top-1/2 overflow-hidden"
                  style={{
                    left: p.textLeft,
                    transform:
                      p.textLeft === "100%"
                        ? "translate(-100%, -50%)"
                        : "translateY(-50%)",
                    textAlign: p.textAlign,
                  }}
                >
                  <h3
                    ref={(el) => (textRefs.current[i] = el)}
                    className="font-[Canela] text-[#2f3b2f]/80 text-[clamp(24px,2.6vw,40px)] leading-[1.05]"
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* MOBILE — PURE TEXT */}
              <div className="lg:hidden py-10">
                <div className="overflow-hidden">
                  <h3
                    ref={(el) =>
                      (textRefs.current[SERVICES.length + i] = el)
                    }
                    className="font-[Canela] text-[clamp(26px,7vw,34px)] leading-[1.1]"
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
