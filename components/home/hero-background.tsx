"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  "/assets/happy-customer-service-agent.jpg",
  "/assets/smiling-customer-service-representative.jpg",
  "/assets/happy-customer-service-agent (1).jpg",
];

export function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {heroImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt="Azix real estate support background"
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/85 to-[var(--color-bg)]/40" />
    </div>
  );
}
