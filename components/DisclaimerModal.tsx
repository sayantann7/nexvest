"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const DisclaimerModal: React.FC = () => {
  // Start closed so WelcomeAnimation can show first
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const DISMISS_KEY = 'nexvestDisclaimerDismissed';

  // Load saved data & decide if/when to show (after welcome animation)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        const saved = localStorage.getItem('nexvestDisclaimerUser');
        if (saved) {
          const parsed = JSON.parse(saved) as { name: string; email: string; phone: string };
          setName(parsed.name || "");
          setEmail(parsed.email || "");
          setPhone(parsed.phone || "");
          setSubmitted(true);
        }
        if (!dismissed && !saved) {
          // Welcome animation runs ~1200ms + exit 800ms; show disclaimer after delay
          const delay = setTimeout(() => setIsOpen(true), 1500);
          return () => clearTimeout(delay);
        } else {
          setIsOpen(false);
        }
      }
    } catch (e) {
      console.error('Failed to load disclaimer data', e);
    }
  }, []);

  const handleClose = () => {
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch {}
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    setSubmitted(true);
    try {
      // Persist locally first
      localStorage.setItem('nexvestDisclaimerUser', JSON.stringify({ name, email, phone }));
      localStorage.setItem(DISMISS_KEY, '1');
    } catch (e) {
      console.error('Failed to persist disclaimer data', e);
    }
    // Fire-and-forget API call to backend to register user
    try {
      fetch('https://nexvest-backend.sayantannandi13.workers.dev/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phoneNumber: phone })
      }).catch(err => console.error('User create network error', err));
    } catch (err) {
      console.error('User create error', err);
    }
  };

  const handleEmailClick = () => {
    window.open('mailto:yashwantsagnati@gmail.com', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919234671769', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="bg-[#0D0C34] border-white border-2 shadow-2xl">
              <CardHeader className="relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <CardTitle className="text-2xl font-bold text-white text-center">
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  {/* <div className="w-16 h-16 mx-auto bg-gradient-to-r from-white to-[#0AFFFF] rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-8 h-8 border-2 border-[#0D0C34] border-t-transparent rounded-full" />
                    </motion.div>
                  </div> */}
                  
                  <div className="space-y-3">
                    <p className="text-white/90 text-lg font-medium">
                      Website Under Development
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      We&apos;re working hard to bring you the full NexVest experience. The complete version will be live soon with all features and services.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                      pattern="[0-9+\-() ]{7,}"
                      required
                    />
                  </div>
                  {!submitted && (
                    <p className="text-white/60 text-xs text-center">Enter your details to continue.</p>
                  )}
                  {submitted && (
                    <div className="text-center text-green-300 text-sm">Details saved. You can reach us via email or WhatsApp below.</div>
                  )}
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-white text-[#0D0C34] font-semibold hover:from-[#08e6d9] hover:to-white transition-all duration-300">Submit</Button>
                    <Button type="button" onClick={handleClose} variant="outline" className="flex-1 border-white text-white bg-transparent hover:bg-white/10">Skip</Button>
                  </div>
                </form>

                {submitted && (
                  <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm font-medium mb-3 text-center">For inquiries about our services:</p>
                    <div className="space-y-2">
                      <Button onClick={handleEmailClick} variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/20 transition-colors">
                        <Mail size={16} className="mr-2" />
                        yashwantsagnati@gmail.com
                      </Button>
                      <Button onClick={handleWhatsAppClick} variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/20 transition-colors">
                        <MessageCircle size={16} className="mr-2" />
                        WhatsApp: +91 92346 71769
                      </Button>
                    </div>
                    <Button onClick={handleClose} className="mt-4 w-full bg-white text-[#0D0C34] font-semibold hover:from-[#08e6d9] hover:to-white transition-all duration-300">Continue</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;