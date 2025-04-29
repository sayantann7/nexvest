"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Button } from './ui/button';
import { vapi } from '@/lib/vapi.sdk';

type ChatCallBotProps = Record<string, unknown>;

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const ChatCallBot: React.FC<ChatCallBotProps> = (): React.ReactElement => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      setTimeout(() => {
        setCallStatus(CallStatus.INACTIVE);
      }, 1000);
    };

    const onError = (error: Error) => {
      console.error("Vapi error:", error);
      setCallStatus(CallStatus.FINISHED);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!);
    } catch (error) {
      console.error("Failed to start call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    try {
      await vapi.stop();
    } catch (error) {
      console.error("Failed to stop call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const isCallActive = callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING;

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
                    {callStatus === CallStatus.CONNECTING 
                      ? "Connecting to NexVest AI Assistant..." 
                      : "Call in progress with NexVest AI Assistant..."}
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDisconnect}
                    className="rounded-full px-6"
                  >
                    End Call
                  </Button>
                </>
              ) : (
                <>
                  <div className="mb-4 w-16 h-16 rounded-full bg-[#0D0C34]/10 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-center mb-4 text-gray-700">
                    Have questions about NexVest? Talk to our AI assistant!
                  </p>
                  <Button
                    onClick={handleCall}
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
        className="rounded-full shadow-lg cursor-pointer flex items-center justify-center px-4 py-3 bg-white"
        onClick={toggleOpen}
      >
        <MessageCircle className="w-5 h-5 mr-2 text-[#0D0C34]" />
        <span className="font-medium text-[#0D0C34]">Ask AI</span>
      </motion.div>
    </div>
  );
};

export default ChatCallBot;