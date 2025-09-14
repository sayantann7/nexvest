"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export type FAQItem = { q: string; a: string };

export function FAQList({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items || items.length === 0) {
    return <p className="text-slate-400 text-sm">No FAQs added yet.</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="rounded-xl border border-white/10 bg-[#121538]">
            <button
              className="w-full flex items-center justify-between gap-4 p-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium text-white">{f.q}</span>
              <ChevronDown className={cn("w-4 h-4 text-slate-300 transition-transform", isOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-80",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-slate-300 text-sm">{f.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
