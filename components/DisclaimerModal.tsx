"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
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

                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <p className="text-white/80 text-sm font-medium mb-3 text-center">
                    For inquiries about our services:
                  </p>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={handleEmailClick}
                      variant="ghost"
                      className="w-full justify-start text-white hover:text-white hover:bg-white/20 transition-colors"
                    >
                      <Mail size={16} className="mr-2" />
                      yashwantsagnati@gmail.com
                    </Button>
                    
                    <Button
                      onClick={handleWhatsAppClick}
                      variant="ghost"
                      className="w-full justify-start text-white hover:text-white hover:bg-white/20 transition-colors"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      WhatsApp: +91 92346 71769
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleClose}
                  className="w-full bg-white text-[#0D0C34] font-semibold hover:from-[#08e6d9] hover:to-white transition-all duration-300 transform hover:scale-105"
                >
                  Continue to Website
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;