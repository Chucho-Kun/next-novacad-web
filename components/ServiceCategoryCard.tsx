"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ServiceCategory } from "@/data/services";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

export default function ServiceCategoryCard({ category }: ServiceCategoryCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = category.items[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? category.items.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % category.items.length);
  }

  return (
    <article className="w-[40vw] overflow-hidden rounded-xl border border-[#c7c7c7] bg-white pb-9 md:w-[34vw] lg:h-[calc(13.3vw+180px)] lg:max-h-[432px] lg:w-[19vw] lg:pb-5">
      <div className="relative aspect-[10/7] w-full overflow-hidden rounded-t-xl bg-black">
        <Image
          key={activeItem.image}
          src={activeItem.image}
          alt={activeItem.alt}
          fill
          sizes="(max-width: 479px) 40vw, (max-width: 991px) 34vw, 19vw"
          className="object-cover"
        />
        <button
          type="button"
          onClick={showPrevious}
          aria-label={`Mostrar imagen anterior de ${category.title}`}
          className="absolute inset-y-0 left-0 flex w-12 items-center justify-center text-white drop-shadow-md"
        >
          <span aria-hidden className="block size-5 rotate-45 border-b-[3px] border-l-[3px] border-current" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label={`Mostrar imagen siguiente de ${category.title}`}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white drop-shadow-md"
        >
          <span aria-hidden className="block size-5 -rotate-45 border-r-[3px] border-b-[3px] border-current" />
        </button>
      </div>
      <div className="px-2 pt-5 text-center">
        <h3 className="whitespace-nowrap text-[17px] leading-6 font-extrabold lg:text-[18px]">
          {category.slug === "protesis-fija" ? (
            <>
              <span className="lg:hidden">Prótesis Fija</span>
              <span className="hidden lg:inline">{category.title}</span>
            </>
          ) : (
            category.title
          )}
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
