"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface CalculatorModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function CalculatorModal({ open, onClose, title, children, className }: CalculatorModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            className={cn("relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0E1038] text-white shadow-xl", className)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-heading text-lg font-semibold">{title}</h3>
              <Button variant="ghost" className="text-white hover:bg-white/10" onClick={onClose} aria-label="Close calculator">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="px-6 py-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
