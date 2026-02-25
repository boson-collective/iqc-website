"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({ opened }) {
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

  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // =========================
  // BG ZOOM
  // =========================
  const bgControls = {
    scale: opened ? 1.045 : 1,
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ================= BACKGROUND ================= */}
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
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/herobg.png"
            alt="Bali Construction Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/herobg-mobile.png"
            alt="Bali Construction Background Mobile"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/35" />
      </motion.div>

      {/* ================= CONTENT GRID ================= */}
      <div className="relative z-10 h-full">
        <div
          className="
            grid
            h-full
            grid-rows-[auto_1fr_auto]
            px-6
            pb-10
            md:px-14
          "
        >
          {/* ========== LOGO (TOP LEFT) ========== */}
          <motion.div
            style={{ y: logoY, scale: logoScale }}
            className="w-fit will-change-transform"
          >
            <div className="w-[110px] md:w-[130px] lg:w-[150px]">
              <Image
                src="/images/Logo IQC - White 3.png"
                alt="IQC Logo"
                width={640}
                height={240}
                priority
                className="h-auto w-full select-none"
              />
            </div>
          </motion.div>

          {/* ========== SPACER */}
          <div />

          {/* ========== COPY (BOTTOM LEFT) ========== */}
          <div className="2xl:max-w-[880px] max-w-[720px] pb-6 md:pb-10">
            <h1
              className="
                text-white
                font-normal
                leading-[1.05]
                tracking-tight
                text-[clamp(28px,4vw,80px)]
              "
            >
              Building Bali{" "}
              <span className="font-[Canela]">Better</span> — Through
              Precision and International Standards
            </h1>

            <p
              className="
                mt-6
                max-w-[640px]
                text-white/80
                leading-relaxed
                text-[clamp(15px,0.9vw,20px)]
              "
            >
              Construction & quality control specialists delivering well-managed
              projects from planning to handover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
