"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectCluster({
  cluster,
  index,
  isMobile,
  scrollYProgress,
  onMaskRef,
  onMediumLayerRef,
  activeMediumIndex,
  onOpenGallery,
}) {
  const isEven = index % 2 === 0;

  const start = index * 0.25;
  const end = start + 0.5;

  const tallYValue = useTransform(scrollYProgress, [start, end], [-44, 44]);
  const wideYValue = useTransform(scrollYProgress, [start, end], [-28, 28]);
  const mediumYValue = useTransform(scrollYProgress, [start, end], [-20, 20]);

  const tallY = isMobile ? 0 : tallYValue;
  const wideY = isMobile ? 0 : wideYValue;
  const mediumY = isMobile ? 0 : mediumYValue;

  const tallAlt = `${cluster.title} project work in ${cluster.location}`;
  const wideAlt = `${cluster.title} construction documentation in ${cluster.location}`;
  const galleryLabel = `View ${cluster.title} project images`;
  const projectImageButtonClass =
    "col-span-5 row-span-2 relative aspect-[2/3] overflow-hidden cursor-pointer appearance-none border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2f3b2f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fffcf7]";
  const wideImageButtonClass =
    "col-span-7 relative aspect-[16/10] overflow-hidden cursor-pointer appearance-none border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2f3b2f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fffcf7]";
  const mediumImageButtonClass =
    "col-span-6 -mt-4 relative aspect-[4/3] overflow-hidden cursor-pointer appearance-none border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2f3b2f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fffcf7]";

  const slides = [
    { src: cluster.images.tall, alt: tallAlt },
    { src: cluster.images.wide, alt: wideAlt },
    ...cluster.images.medium.map((src, i) => ({
      src,
      alt: `${cluster.title} project detail ${i + 1} in ${cluster.location}`,
    })),
  ];

  const openGallery = (startIndex) => {
    onOpenGallery(slides, startIndex);
  };

  const handleGalleryKeyDown = (event, startIndex) => {
    if (
      event.key !== "Enter" &&
      event.key !== " " &&
      event.key !== "Spacebar"
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    openGallery(startIndex);
  };

  return (
    <div data-theme="light" className="mb-24 md:mb-56">
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
            <h2 className="text-[clamp(24px,5vw,25px)] font-[Canela] leading-[1.3]  tracking-wide text-neutral-800">
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
          <button
            type="button"
            aria-label={galleryLabel}
            onClick={() => openGallery(0)}
            onKeyDown={(event) => handleGalleryKeyDown(event, 0)}
            className={projectImageButtonClass}
          >
            <motion.div
              style={{ y: tallY }}
              initial={{ scale: 1.1 }}
              whileHover={!isMobile ? { scale: 1.125 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div
                ref={(el) => onMaskRef(index * 3, el)}
                className="absolute inset-0"
              >
                <Image src={cluster.images.tall} alt={tallAlt} fill className="object-cover" />
              </div>
            </motion.div>
          </button>

          {/* WIDE */}
          <button
            type="button"
            aria-label={galleryLabel}
            onClick={() => openGallery(1)}
            onKeyDown={(event) => handleGalleryKeyDown(event, 1)}
            className={wideImageButtonClass}
          >
            <motion.div
              style={{ y: wideY }}
              initial={{ scale: 1.08 }}
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div
                ref={(el) => onMaskRef(index * 3 + 1, el)}
                className="absolute inset-0"
              >
                <Image src={cluster.images.wide} alt={wideAlt} fill className="object-cover" />
              </div>
            </motion.div>
          </button>

          {/* MEDIUM */}
          <button
            type="button"
            aria-label={galleryLabel}
            onClick={() =>
              openGallery(2 + (activeMediumIndex[index] || 0))
            }
            onKeyDown={(event) =>
              handleGalleryKeyDown(event, 2 + (activeMediumIndex[index] || 0))
            }
            className={mediumImageButtonClass}
          >
            <motion.div
              style={{ y: mediumY }}
              initial={{ scale: 1.07 }}
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div
                ref={(el) => onMaskRef(index * 3 + 2, el)}
                className="absolute inset-0"
              >
                {cluster.images.medium.map((src, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) onMediumLayerRef(index, i, el);
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={src}
                      alt={`${cluster.title} project detail ${i + 1} in ${cluster.location}`}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const maskRefs = useRef([]);
  const mediumLayersRef = useRef([]); // 2D array [cluster][layer]
  const mediumTimelinesRef = useRef([]); // per cluster timeline

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeMediumIndex, setActiveMediumIndex] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // ================= MOBILE DETECT =================
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // ================= REVEAL EXPAND WIDTH =================
  useEffect(() => {
    if (isMobile) {
      if (maskRefs.current.length) {
        gsap.set(maskRefs.current, {
          clipPath: "inset(0 0% 0 0)",
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(maskRefs.current, {
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.to(maskRefs.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const clusters = [
    {
      title: "Katara Cultural Village",
      location: "Doha, Qatar",
      description:
        "Custom steel fabrication and installation of uniquely designed huts with integrated wood cladding",
      images: {
        tall: "/images/katara/e51f2960-194b-4cc9-8aad-5f2ff317f0d0 2.JPG",
        wide: "/images/katara/13e56213-bf6d-42da-9256-9ffb62382cde.JPG",
        medium: [
          "/images/katara/86ff1c5d-93b5-4786-9dcd-92b13b1c8fe4.JPG",
          "/images/katara/0b2afc54-770a-4e16-9b7c-dcf599139d82 2.JPG",
          "/images/katara/2acfa789-6ac8-4871-9af1-866d132374d4 2.JPG",
          "/images/katara/922a7dfa-a53c-4fc9-b572-8bd6affb53a3.JPG",
        ],
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
        medium: [
          "/images/marroosh/f3e57676-2838-4621-a36e-47a8a73ca198.png",
          "/images/marroosh/dee4d731-548d-42be-834a-c58592d677df.png",
          "/images/marroosh/ccc98823-b12d-41c5-9b45-ac173fbdc5b0.png",
          "/images/marroosh/e9f8ff2b-1bb5-48a2-9e5f-e7635a2941c6.png",
        ],
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
        medium: [
          "/images/house/67603a1b-259c-4a0b-8e96-7cca103fb89f 2.JPG",
          "/images/house/61a911d8-8570-42ee-a0db-8473b3b4bda2.JPG",
          "/images/house/589fca21-184c-4b57-9573-26a3f2eb30e3.JPG",
          "/images/house/449706e0-f334-462c-9c9f-bfd00c5731f9.JPG"
        ],
      },
    },
  ];

  // ================= MEDIUM LOOP (PER CLUSTER) =================
  useEffect(() => {
    const timelines = mediumTimelinesRef.current;

    mediumLayersRef.current.forEach((layers, clusterIndex) => {
      if (!layers || !layers.length) return;

      if (timelines[clusterIndex]) {
        timelines[clusterIndex].kill();
      }

      gsap.set(layers, { opacity: 0 });
      gsap.set(layers[0], { opacity: 1 });

      setActiveMediumIndex((prev) => ({
        ...prev,
        [clusterIndex]: 0,
      }));

      const tl = gsap.timeline({ repeat: -1 });

      tl.to({}, { duration: 4 });

      layers.forEach((layer, i) => {
        if (i === 0) return;

        tl.to(layers[i - 1], {
          opacity: 0,
          duration: 2,
          ease: "sine.inOut",
        });

        tl.to(
          layer,
          {
            opacity: 1,
            duration: 2,
            ease: "sine.inOut",
            onStart: () => {
              setActiveMediumIndex((prev) => ({
                ...prev,
                [clusterIndex]: i,
              }));
            },
          },
          "<"
        );

        tl.to({}, { duration: 4 });
      });

      tl.to(layers[layers.length - 1], {
        opacity: 0,
        duration: 2,
        ease: "sine.inOut",
      });

      tl.to(
        layers[0],
        {
          opacity: 1,
          duration: 2,
          ease: "sine.inOut",
          onStart: () => {
            setActiveMediumIndex((prev) => ({
              ...prev,
              [clusterIndex]: 0,
            }));
          },
        },
        "<"
      );

      tl.to({}, { duration: 4 });

      timelines[clusterIndex] = tl;
    });

    return () => {
      timelines.forEach((tl) => tl?.kill());
    };
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const openGallery = (slides, startIndex) => {
    setLightboxImages(slides);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const setMaskRef = (index, el) => {
    maskRefs.current[index] = el;
  };

  const setMediumLayerRef = (clusterIndex, layerIndex, el) => {
    if (!mediumLayersRef.current[clusterIndex]) {
      mediumLayersRef.current[clusterIndex] = [];
    }

    mediumLayersRef.current[clusterIndex][layerIndex] = el;
  };

  return (
    <>
      <section
        ref={containerRef}
        className="bg-[#fffcf7] py-22 md:py-40 overflow-x-hidden"
      >
        <div className="mb-15 sm:mb-28 px-6 lg:px-10 max-w-[680px]">
          <span className="block text-[11px] uppercase tracking-[0.25em] text-black/65">
            Our Projects
          </span>
        </div>

        {clusters.map((cluster, index) => (
          <ProjectCluster
            key={index}
            cluster={cluster}
            index={index}
            isMobile={isMobile}
            scrollYProgress={scrollYProgress}
            onMaskRef={setMaskRef}
            onMediumLayerRef={setMediumLayerRef}
            activeMediumIndex={activeMediumIndex}
            onOpenGallery={openGallery}
          />
        ))}
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        index={lightboxIndex}
        carousel={{ finite: true }}
        animation={{ fade: 300 }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
      />
    </>
  );
}
