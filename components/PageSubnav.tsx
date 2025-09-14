"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  id: string;
  label: string;
};

interface PageSubnavProps {
  items?: Item[];
  offsetTop?: number; // pixels to offset when scrolling (height of sticky header)
}

// Lightweight sticky sub-navigation with scrollspy and smooth scrolling
export default function PageSubnav({
  items,
  offsetTop = 80,
}: PageSubnavProps) {
  const defaultItems: Item[] = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "grow", label: "Grow Wealth" },
      { id: "methods", label: "Ways to Invest" },
      { id: "types", label: "Fund Types" },
    ],
    []
  );

  const navItems = items && items.length ? items : defaultItems;
  const [active, setActive] = useState(navItems[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offsetTop + 8}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    sections.forEach((sec) => observerRef.current?.observe(sec));

    return () => observerRef.current?.disconnect();
  }, [navItems, offsetTop]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offsetTop - 8;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-40">
      <div className="border-b border-white/10 bg-[#0D0C34]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0D0C34]/60">
        <div className="container mx-auto px-4">
          <nav className="h-12 flex items-center gap-3 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={
                    "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors " +
                    (isActive
                      ? "bg-white/15 text-white border border-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/10")
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
