"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ServiceCategory } from "@/data/services";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
  wide?: boolean;
};

export default function ServiceCategoryCard({ category, wide = false }: ServiceCategoryCardProps) {
  const count = category.items.length;
  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionOn, setTransitionOn] = useState(true);

  const realIndex = count > 1 ? (((trackIndex - 1) % count) + count) % count : 0;
  const activeItem = category.items[realIndex];

  function showPrevious() {
    if (count <= 1) return;
    if (trackIndex <= 0) {
      setTransitionOn(false);
      setTrackIndex(count - 1);
      return;
    }
    setTransitionOn(true);
    setTrackIndex(trackIndex - 1);
  }

  function showNext() {
    if (count <= 1) return;
    if (trackIndex >= count + 1) {
      setTransitionOn(false);
      setTrackIndex(2);
      return;
    }
    setTransitionOn(true);
    setTrackIndex(trackIndex + 1);
  }

  function handleTransitionEnd() {
    if (count <= 1) return;
    if (trackIndex === count + 1) {
      setTransitionOn(false);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setTransitionOn(false);
      setTrackIndex(count);
    }
  }

  const firstItem = category.items[0];
  const lastItem = category.items[count - 1];
  const slides =
    count > 1
      ? [
          { item: lastItem, key: `clon-inicio-${lastItem.slug}`, hidden: true },
          ...category.items.map((item) => ({ item, key: item.slug, hidden: false })),
          { item: firstItem, key: `clon-fin-${firstItem.slug}`, hidden: true },
        ]
      : category.items.map((item) => ({ item, key: item.slug, hidden: false }));

  const headingId = `${category.slug}-titulo`;

  return (
    <article
      aria-labelledby={headingId}
      className={
        wide
          ? "w-[85vw] overflow-hidden rounded-xl border border-[#c7c7c7] bg-white pb-9 md:w-[70vw] lg:min-h-[calc(13.3vw+180px)] lg:w-[39.3vw] lg:pb-5"
          : "w-[40vw] overflow-hidden rounded-xl border border-[#c7c7c7] bg-white pb-9 md:w-[34vw] lg:min-h-[calc(13.3vw+180px)] lg:w-[19vw] lg:pb-5"
      }
    >
      <div
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Imágenes de ${category.title}`}
        className={
          wide
            ? "relative aspect-812/300 w-full overflow-hidden rounded-t-xl bg-black"
            : "relative aspect-10/7 w-full overflow-hidden rounded-t-xl bg-black"
        }
      >
        <div
          onTransitionEnd={handleTransitionEnd}
          className={
            transitionOn
              ? "flex h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
              : "flex h-full w-full"
          }
          style={{ transform: `translateX(-${count > 1 ? trackIndex * 100 : 0}%)` }}
        >
          {slides.map(({ item, key, hidden }) => (
            <div key={key} aria-hidden={hidden || undefined} className="relative h-full min-w-full overflow-hidden">
              <Image
                src={item.image}
                alt={hidden ? "" : item.alt}
                fill
                sizes={wide ? "(max-width: 479px) 85vw, (max-width: 991px) 70vw, 39vw" : "(max-width: 479px) 40vw, (max-width: 991px) 34vw, 19vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {category.items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label={`Mostrar imagen anterior de ${category.title}`}
              className="absolute inset-y-0 left-0 flex w-12 items-center justify-center text-white drop-shadow-md"
            >
              <span aria-hidden="true" className="block size-5 rotate-45 border-b-[3px] border-l-[3px] border-current" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label={`Mostrar imagen siguiente de ${category.title}`}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white drop-shadow-md"
            >
              <span aria-hidden="true" className="block size-5 -rotate-45 border-r-[3px] border-b-[3px] border-current" />
            </button>
          </>
        ) : null}
        <p aria-live="polite" aria-atomic="true" className="sr-only">
          Imagen {realIndex + 1} de {category.items.length}: {activeItem.title}
        </p>
      </div>
      <div className="px-2 pt-5 text-center">
        <h3 id={headingId} className="text-[17px] leading-6 font-extrabold text-balance lg:text-[18px]">
          {category.title}
        </h3>
        <ul className="mt-4 space-y-3">
          {category.items.map((item) => (
            <li key={item.slug}>
              <Link href={item.href} className="text-[18px] leading-6 font-medium underline underline-offset-2">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
