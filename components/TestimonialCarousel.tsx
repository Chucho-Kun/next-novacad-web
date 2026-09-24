"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-[180px] w-[38vw] shrink-0 flex-col justify-around rounded-[20px] bg-[#f1f1f1] px-5 py-2.5 lg:w-[24vw]">
      <figcaption className="flex h-[50px] items-center justify-between gap-2">
        <Image
          src="/images/icono_persona.png"
          alt=""
          width={100}
          height={100}
          className="size-[25px] shrink-0 lg:size-10"
        />
        <span className="text-center text-xs font-medium lg:text-sm">{testimonial.name}</span>
        <Image
          src="/images/estrellas.png"
          alt={`${testimonial.rating} de 5 estrellas`}
          width={200}
          height={32}
          className="h-auto w-[60px] shrink-0 lg:w-[120px]"
        />
      </figcaption>
      <blockquote className="text-justify text-xs leading-[19px] lg:text-sm lg:leading-5">{testimonial.content}</blockquote>
    </figure>
  );
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [mobilePage, setMobilePage] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const mobilePageCount = Math.ceil(testimonials.length / 2);
  const desktopPageCount = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setMobilePage((page) => (page + 1) % mobilePageCount);
      setDesktopPage((page) => (page + 1) % desktopPageCount);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [desktopPageCount, mobilePageCount]);

  function handlePointerUp(event: React.PointerEvent, page: number, pageCount: number, setPage: (page: number) => void) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 40) return;
    setPage(distance < 0 ? Math.min(page + 1, pageCount - 1) : Math.max(page - 1, 0));
  }

  function handleKeyDown(event: React.KeyboardEvent, page: number, pageCount: number, setPage: (page: number) => void) {
    if (event.key === "ArrowRight") setPage(Math.min(page + 1, pageCount - 1));
    if (event.key === "ArrowLeft") setPage(Math.max(page - 1, 0));
  }

  return (
    <>
      <div className="lg:hidden">
        <div
          tabIndex={0}
          aria-label="Carrusel de testimonios"
          className="mx-auto w-[80vw] overflow-hidden"
          onPointerDown={(event) => (pointerStart.current = event.clientX)}
          onPointerUp={(event) => handlePointerUp(event, mobilePage, mobilePageCount, setMobilePage)}
          onKeyDown={(event) => handleKeyDown(event, mobilePage, mobilePageCount, setMobilePage)}
        >
          <div
            className="flex gap-[4vw] transition-transform duration-500"
            style={{ transform: `translateX(-${mobilePage * 84}vw)` }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
        <CarouselDots page={mobilePage} pageCount={mobilePageCount} setPage={setMobilePage} />
      </div>
      <div className="hidden lg:block">
        <div
          tabIndex={0}
          aria-label="Carrusel de testimonios"
          className="mx-auto w-[80vw] overflow-hidden"
          onPointerDown={(event) => (pointerStart.current = event.clientX)}
          onPointerUp={(event) => handlePointerUp(event, desktopPage, desktopPageCount, setDesktopPage)}
          onKeyDown={(event) => handleKeyDown(event, desktopPage, desktopPageCount, setDesktopPage)}
        >
          <div
            className="flex gap-[0.66vw] transition-transform duration-500"
            style={{ transform: `translateX(-${desktopPage * 74}vw)` }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
        <CarouselDots page={desktopPage} pageCount={desktopPageCount} setPage={setDesktopPage} />
      </div>
    </>
  );
}

function CarouselDots({ page, pageCount, setPage }: { page: number; pageCount: number; setPage: (page: number) => void }) {
  return (
    <div className="mt-5 flex justify-center gap-1.5" role="group" aria-label="Seleccionar página de testimonios">
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setPage(index)}
          aria-label={`Mostrar página ${index + 1} de testimonios`}
          aria-current={page === index ? "true" : undefined}
          className={`size-4 rounded-full ${page === index ? "bg-[#222]" : "bg-[#aaa]"}`}
        />
      ))}
    </div>
  );
}
