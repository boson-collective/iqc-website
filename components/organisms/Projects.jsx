"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Projects() {
  const containerRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // DETECT MOBILE
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const clusters = [
    {
      title: "Katara Cultural Village",
      location: "Doha, Qatar",
      description:
        "Custom steel fabrication and installation of uniquely designed huts with integrated wood cladding",
      images: {
        tall: "/images/katara/e51f2960-194b-4cc9-8aad-5f2ff317f0d0 2.JPG",
        wide: "/images/katara/13e56213-bf6d-42da-9256-9ffb62382cde.JPG",
        medium: "/images/katara/86ff1c5d-93b5-4786-9dcd-92b13b1c8fe4.JPG",
      },
    },
    {
      title: "Marroosh Restaurant",
      location: "Bali, Indonesia",
      description:
        "End-to-end rebranding and redevelopment with interior transformation and kitchen expansion to optimize experience and performance",
      images: {
        tall: "/images/marroosh/8c6b946c-4be1-4124-8901-76668e6cbcdb.png",
        wide: "/images/marroosh/cd505035-b017-4871-ad44-510501dc8659.png",
        medium: "/images/marroosh/f3e57676-2838-4621-a36e-47a8a73ca198.png",
      },
    },
    {
      title: "Residential Villa",
      location: "Dubai, UAE",
      description:
        "Turnkey construction and interior delivery of high-end private villas built to premium regional standards",
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
        className="bg-[#fffcf7] py-22 md:py-40 overflow-x-hidden"
      >
        {/* HEADER */}
        <div className="mb-15 sm:mb-28 px-6 lg:px-10 max-w-[680px]">
          <span className="block text-[11px] uppercase tracking-[0.25em] text-black/65">
            Our Projects
          </span>
        </div>

        {clusters.map((cluster, index) => {
          const isEven = index % 2 === 0;

          const start = index * 0.25;
          const end = start + 0.5;

          const tallYDesktop = useTransform(
            scrollYProgress,
            [start, end],
            [-44, 44]
          );
          const wideYDesktop = useTransform(
            scrollYProgress,
            [start, end],
            [-28, 28]
          );
          const mediumYDesktop = useTransform(
            scrollYProgress,
            [start, end],
            [-20, 20]
          );

          const tallY = isMobile ? 0 : tallYDesktop;
          const wideY = isMobile ? 0 : wideYDesktop;
          const mediumY = isMobile ? 0 : mediumYDesktop;

          const openGallery = () => {
            setLightboxImages([
              { src: cluster.images.tall },
              { src: cluster.images.wide },
              { src: cluster.images.medium },
            ]);
            setLightboxOpen(true);
          };

          return (
            <div key={index} className="mb-24 md:mb-56">
              <div className="grid grid-cols-12 gap-x-8 px-6 md:px-10">
                {/* SIDE CAPTION */}
                <div
                  className={`
                    col-span-12 md:col-span-3
                    flex items-center
                    order-1
                    ${isEven ? "md:order-1" : "md:order-2"}
                  `}
                >
                  <div className="max-w-xs pb-8 md:pb-0">
                    <h2 className="text-[clamp(25px,5vw,24px)] font-[Canela] leading-[1.3] tracking-wide text-neutral-800">
                      {cluster.title}
                    </h2>

                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                      {cluster.location}
                    </p>

                    <p className="mt-3 md:mt-4 text-[14px] md:text-sm leading-[1.5] text-neutral-600">
                      {cluster.description}
                    </p>
                  </div>
                </div>

                {/* IMAGE GRID */}
                <div
                  className={`
                    col-span-12 md:col-span-9
                    grid grid-cols-12 gap-x-5 gap-y-10
                    order-2
                    ${isEven ? "md:order-2" : "md:order-1"}
                  `}
                >
                  {/* TALL */}
                  <div className="col-span-5 row-span-2 relative aspect-[2/3] overflow-hidden">
                    <motion.div
                      style={{ y: tallY }}
                      className="absolute inset-0 scale-[1.1]"
                    >
                      <Image
                        src={cluster.images.tall}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* WIDE */}
                  <div className="col-span-7 relative aspect-[16/10] overflow-hidden">
                    <motion.div
                      style={{ y: wideY }}
                      className="absolute inset-0 scale-[1.08]"
                    >
                      <Image
                        src={cluster.images.wide}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* MEDIUM */}
                  <div
                    onClick={openGallery}
                    className="col-span-6 -mt-4 relative aspect-[4/3] overflow-hidden group cursor-pointer"
                  >
                    <motion.div
                      style={{ y: mediumY }}
                      className="absolute inset-0 scale-[1.07]"
                    >
                      <Image
                        src={cluster.images.medium}
                        alt=""
                        fill
                        className="object-cover"
                      />
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
