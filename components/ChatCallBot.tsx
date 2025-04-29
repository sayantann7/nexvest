"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Button } from './ui/button';

type ChatCallBotProps = Record<string, unknown>;

const ChatCallBot: React.FC<ChatCallBotProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const startCall = () => {
    setIsCallActive(true);
    // Here you would integrate with Vapi API
    console.log("Initiating call with Vapi API AI Voice Agent");
    // Add your Vapi API integration code here
  };

  const endCall = () => {
    setIsCallActive(false);
    // Add code to disconnect the Vapi call
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-4 bg-white rounded-xl shadow-2xl overflow-hidden"
            style={{ width: '320px' }}
          >
            <div className="bg-[#0D0C34] p-4 flex justify-between items-center">
              <h3 className="text-white font-medium flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                NexVest Assistant
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-[#0D0C34]/50" 
                onClick={toggleOpen}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 bg-gray-50 min-h-[200px] flex flex-col justify-center items-center">
              {isCallActive ? (
                <>
                  <div className="animate-pulse mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#09ffec]/20 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-[#09ffec]" />
                    </div>
                  </div>
                  <p className="text-center mb-4 text-gray-700">
                    Call in progress with NexVest AI Assistant...
                  </p>
                  <Button
                    variant="destructive"
                    onClick={endCall}
                    className="rounded-full px-6"
                  >
                    End Call
                  </Button>
                </>
              ) : (
                <>
                  <div className="mb-4 w-16 h-16 rounded-full bg-[#0D0C34]/10 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-[#0D0C34]" />
                  </div>
                  <p className="text-center mb-4 text-gray-700">
                    Have questions about NexVest? Talk to our AI assistant!
                  </p>
                  <Button
                    onClick={startCall}
                    className="bg-[#0D0C34] hover:bg-[#0D0C34]/90 rounded-full px-6 flex items-center text-white"
                  >
                    <Phone className="w-4 h-4 mr-2 text-white" /> Start Voice Call
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`rounded-full shadow-lg cursor-pointer flex items-center justify-center px-4 py-3 ${isOpen ? 'bg-white' : 'bg-white'}`}
        onClick={toggleOpen}
      >
        <MessageCircle className={`w-5 h-5 mr-2 ${isOpen ? 'text-[#0D0C34]' : 'text-[#0D0C34]'}`} />
        <span className={`font-medium ${isOpen ? 'text-[#0D0C34]' : 'text-[#0D0C34]'}`}>Ask AI</span>
      </motion.div>
    </div>
  );
};

export default ChatCallBot;