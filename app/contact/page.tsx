"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name";
    if (!contact.trim()) nextErrors.contact = "Please enter your email or phone";
    if (!message.trim()) nextErrors.message = "Please enter your query";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // For now, simulate submit success
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#0d0c34] to-[#151a4a]">
      <Navbar />

      <header className="bg-transparent">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-white/70 max-w-3xl">We&apos;d love to hear from you. Send us your questions, feedback, or partnership inquiries and we&apos;ll get back to you soon.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[#131740] border border-white/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="rounded-lg border border-teal-400/30 bg-teal-400/10 p-4 text-teal-200">
                    Thanks! Your message has been submitted. We&apos;ll get back to you shortly.
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm mb-1 text-white/80">Name</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="bg-transparent border-white/20 text-white placeholder:text-white/40"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-white/80">Email or Phone</label>
                      <Input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="jane@example.com or +91 98765 43210"
                        className="bg-transparent border-white/20 text-white placeholder:text-white/40"
                      />
                      {errors.contact && <p className="mt-1 text-xs text-red-300">{errors.contact}</p>}
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-white/80">Your Query</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can help…"
                        rows={6}
                        className="w-full rounded-md bg-transparent border border-white/20 px-3 py-2 text-sm placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-300">{errors.message}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button className="bg-teal-400/20 hover:bg-teal-400/30 text-teal-200 border border-teal-300/30" type="submit">
                        Submit
                      </Button>
                      <span className="text-xs text-white/50">We typically respond within 1–2 business days.</span>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="bg-[#131740] border border-white/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Contact details</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 text-sm space-y-2">
                <p>Email: support@nexvest.app</p>
                <p>Phone: +91 98765 43210</p>
                <p>Hours: Mon–Fri, 9:30 AM – 6:30 PM IST</p>
              </CardContent>
            </Card>
            <Card className="bg-[#131740] border border-white/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Why reach out?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 text-sm space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>Portfolio and fund selection help</li>
                  <li>Product questions and demos</li>
                  <li>Partnership and media queries</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
