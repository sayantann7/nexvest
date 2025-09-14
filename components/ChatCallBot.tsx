"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

type ChatCallBotProps = Record<string, unknown>;

interface ChatMessage { role: 'system' | 'user' | 'assistant'; content: string; }

const ChatCallBot: React.FC<ChatCallBotProps> = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loadingReply, setLoadingReply] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Initialize system prompt with personalization
  useEffect(() => {
    if (messages.length === 0) {
      let personalization = '';
      try {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('nexvestDisclaimerUser') : null;
        if (saved) {
          const { name, email, phone } = JSON.parse(saved);
          personalization = ` The user is named ${name || 'Guest'}${email ? ` (email: ${email})` : ''}${phone ? ` and phone number ${phone}` : ''}. Tailor responses politely using their name when appropriate.`;
        }
      } catch { }
      const systemContent = `You are a polite, professional, and knowledgeable financial assistant for an investment firm known as Nexvest.\nYour role is to explain financial concepts, investment products, market trends, and economic principles in a clear, concise and short way.\nMaintain a courteous and respectful tone at all times, avoiding unnecessary jargon unless the user asks for technical detail.\nBe transparent when you lack access to certain data and instead provide general, educational insights.\nYour goal is to empower users with financial knowledge, helping them feel confident and informed in their understanding of finance and also answer quries regarding Nexvest. Here is the Nexvest data for you : 
      Nexvest is an one-stop destination for all things finance, helping individuals and businesses meet every financial need under one roof.
      Powered by our in-house multi-factor framework with AI integration, we deliver consistent positive alpha through expertise in mutual funds, stocks, real estate, global assets, and exclusive unlisted/pre-IPO shares. Beyond investments, we offer insurance, taxation, compliance, and wealth structuring solutions.

      From first-time investors to HNIs, corporates, and entrepreneurs, every plan is tailored to unique goals and life stages for growth, security, and clarity. Through our nationwide CA and professional network, we ensure seamless tax planning, compliance, business finance, and legacy planning — making 𝐍𝐞𝐱𝐕𝐞𝐬𝐭 your trusted partner at every step.

      𝗪𝗵𝗮𝘁 𝗪𝗲 𝗢𝗳𝗳𝗲𝗿:

      𝗙𝗿𝗲𝗲 𝗦𝗲𝗿𝘃𝗶𝗰𝗲𝘀

      ✅ Direct Mutual Fund Investments
      ✅ Access to Unlisted Shares & Pre-IPO Deals
      ✅ Insurance Planning (Life, Term, Health)

      𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗦𝗲𝗿𝘃𝗶𝗰𝗲𝘀

      - CA & Compliance Support for Corporates
      - Portfolio Management & Stock Market Advisory
      - Global Real Estate Investment Consulting
      - Strategic Tax Planning & Wealth Structuring

      Think Bigger. Move Smarter.

      𝗪𝗶𝘁𝗵 𝘂𝘀:

      - Explore opportunities beyond traditional markets
      - Consolidate your investments with expert-led strategy
      - Access high-growth, high-conviction asset classes
      - Plan smarter, scale faster, grow stronger
      ${personalization} REMEMBER TO KEEP YOUR RESPONSES SHORT AND UNDER 300 CHARACTERS.`;
      setMessages([{ role: 'system', content: systemContent }]);
    }
  }, [messages.length]);

  // Auto-scroll only if user is near bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 140; // px threshold
    if (isNearBottom) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [messages, loadingReply]);

  const toggleOpen = () => setIsOpen(o => !o);
  const sendMessage = async () => {
    if (!input.trim() || loadingReply) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoadingReply(true);
    try {
      const response = await fetch('https://nexvest-backend.sayantannandi13.workers.dev/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) })
      });
      if (!response.ok) throw new Error('Chat request failed');
      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered a problem processing that. Please try again.' }]);
    } finally {
      setLoadingReply(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-4 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/60 backdrop-blur-md"
            style={{ width: '380px', maxWidth: '92vw', height: 'min(72vh, 640px)' }}
          >
            <div className="bg-[#0D0C34] p-4 flex justify-between items-center">
              <h3 className="text-white font-heading font-semibold flex items-center">
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
            <div className="flex-1 flex flex-col bg-gray-50 relative min-h-0">
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-5 space-y-4 text-sm custom-scrollbar pr-3 min-h-0"
              >
                {messages.filter(m => m.role !== 'system').length === 0 && (
                  <div className="text-gray-500 text-center text-xs opacity-80">Start the conversation by asking a question about investments or markets.</div>
                )}
                {messages.filter(m => m.role !== 'system').map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[78%] rounded-xl px-4 py-2 leading-relaxed shadow-sm text-[13px] tracking-wide ${m.role === 'user' ? 'bg-gradient-to-br from-[#0D0C34] to-[#1e1b4b] text-white' : 'bg-white text-gray-800 border border-gray-200/70'} whitespace-pre-wrap`}>{m.content}</div>
                  </div>
                ))}
                {loadingReply && (
                  <div className="flex justify-start">
                    <div className="max-w-[78%] rounded-xl px-3 py-2 bg-white text-gray-600 border border-gray-200 flex items-center gap-2 text-xs shadow-sm">
                      <Loader2 className="w-3 h-3 animate-spin" /> Thinking...
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
                {/* Gradients for visual depth */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-gray-50 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-gray-50 to-transparent" />
              </div>
              <div className="border-t border-gray-200 p-3 bg-white text-gray-200">
                <div className="flex items-center gap-2 text-gray-200">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D0C34]/40 bg-white/90 text-black"
                  />
                  <Button onClick={sendMessage} disabled={loadingReply || !input.trim()} className="bg-[#0D0C34] hover:bg-[#0D0C34]/90 disabled:opacity-40 text-white px-3 py-2 h-auto flex items-center gap-1 rounded-md shadow">
                    {loadingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span className="text-xs font-medium">Send</span>
                  </Button>
                </div>
              </div>
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
        <span className="font-heading font-semibold text-[#0D0C34]">Ask AI</span>
      </motion.div>
    </div>
  );
};

export default ChatCallBot;