import React, { use } from "react";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { calculatorsRegistry } from "../../../components/calculators/registry";
import { Card, CardContent } from "../../../components/ui/card";
import Link from "next/link";
import { FAQList } from "../../../components/calculators/FAQ";

export default function CalculatorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const entry = calculatorsRegistry[slug];
  if (!entry) return notFound();
  const Calc = entry.component;

  return (
    <div className="relative min-h-screen bg-[#0D0C34] text-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[320px] bg-[radial-gradient(ellipse_at_top,rgba(9,255,236,0.15),transparent_60%)]" />
  <Navbar />
      <main className="pt-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-slate-400">
            <Link href="/calculators" className="hover:underline">Calculators</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">{entry.title}</span>
          </div>
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">{entry.title}</h1>
            <p className="text-slate-300 max-w-3xl">{entry.short}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-to-b from-[#15194a] to-[#10143d] border-white/10 shadow-[0_10px_40px_-10px_rgba(9,255,236,0.15)]">
                <CardContent className="p-6">
                  <Calc />
                </CardContent>
              </Card>

              <Card className="bg-[#131740] border-white/10">
                <CardContent className="p-6">
                  <h2 className="font-heading text-xl mb-3">About this Calculator</h2>
                  <p className="text-slate-300 mb-3">{entry.details.purpose}</p>
                  {entry.details.formula && (
                    <div className="mb-3">
                      <div className="text-slate-400 text-sm mb-1">Formula</div>
                      <div className="bg-black/30 border border-white/10 rounded-md p-3 font-mono text-sm">{entry.details.formula}</div>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Inputs</div>
                      <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                        {entry.details.inputs.map((i)=> <li key={i}>{i}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Outputs</div>
                      <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                        {entry.details.outputs.map((o)=> <li key={o}>{o}</li>)}
                      </ul>
                    </div>
                  </div>
                  {entry.details.notes && entry.details.notes.length>0 && (
                    <div className="mt-4">
                      <div className="text-slate-400 text-sm mb-1">Notes</div>
                      <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                        {entry.details.notes.map((n)=> <li key={n}>{n}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6">
              <Card className="bg-[#131740] border-white/10">
                <CardContent className="p-6">
                  <h2 className="font-heading text-xl mb-3">FAQs</h2>
                  <FAQList items={entry.faqs} />
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}