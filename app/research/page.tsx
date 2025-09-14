"use client";
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ApiArticle {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  link?: string;
}

const ResearchPage: React.FC = () => {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [refreshIndex, setRefreshIndex] = useState(0);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://nexvest-backend.sayantannandi13.workers.dev/article', { cache: 'no-store' });
      if(!res.ok) throw new Error('Failed to load articles');
      const data: ApiArticle[] = await res.json();
      // Sort newest first
      data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setArticles(data);
    } catch(e){
      const message = e instanceof Error ? e.message : 'Unexpected error';
      setError(message);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(()=>{ fetchArticles(); },[fetchArticles, refreshIndex]);

  const filtered = useMemo(()=> {
    const q = search.toLowerCase();
    return articles.filter(a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q));
  }, [articles, search]);

  const deriveSummary = (content: string) => {
    const stripped = content.replace(/\s+/g,' ').trim();
    if(stripped.length <= 160) return stripped;
    return stripped.slice(0,157) + '...';
  };

  return (
    <div className="min-h-screen bg-[#0D0C34] text-white">
  <Navbar />
      <main className="pt-10 pb-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">Research & Insights</h1>
            <p className="text-lg max-w-2xl mx-auto font-medium text-slate-300">Ideas That Shape India&apos;s Markets. Stay ahead of the curve with insights, research and thought leadership on
the fast-changing investment landscape.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="md:ml-auto w-full md:w-72 flex gap-2">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="w-full rounded-md border border-white/10 bg-[#131740] text-white placeholder-slate-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20" />
              <Button type="button" variant="outline" onClick={()=>setRefreshIndex(i=>i+1)} className="border-white/20 text-white hover:bg-white/10">Refresh</Button>
            </div>
          </div>
          {loading && (
            <p className="text-center text-slate-300 font-medium">Loading articles...</p>
          )}
          {error && !loading && (
            <div className="text-center space-y-3 mb-8">
              <p className="text-rose-300 font-medium">{error}</p>
              <Button onClick={()=>setRefreshIndex(i=>i+1)} className="bg-[#09ffec] text-[#0D0C34] hover:bg-[#09ffec]/90">Retry</Button>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <p className="text-center text-slate-300 font-medium">No articles found.</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, idx) => {
              const Wrapper: 'a' | 'div' = article.link ? 'a' : 'div';
              return (
              <motion.div key={article.id} className="group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.03 }}>
                <Wrapper {...(article.link ? { href: article.link, target: '_blank', rel: 'noopener noreferrer' } : {})} className="block focus:outline-none focus:ring-2 focus:ring-blue-400 h-full">
                  <Card className="h-full border border-white/10 bg-[#131740] hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl">
                  <div className="relative h-44 w-full overflow-hidden">
                    {/* Using next/image; external domains should be configured in next.config if needed */}
                    {/* Fallback to regular img if domain not configured */}
                    {article.thumbnail.match(/^https?:\/\//) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={article.thumbnail} alt={article.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <span className="absolute top-2 left-2 bg-white/10 text-xs font-semibold px-2 py-1 rounded-md text-white">Research</span>
                  </div>
                  <CardContent className="p-5 flex flex-col h-[calc(100%-176px)]">
                    <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2 text-white group-hover:underline">{article.title}</h3>
                    <p className="text-sm text-slate-300 mb-3 line-clamp-3">{deriveSummary(article.content)}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      {article.link && <span className="flex items-center gap-1 group-hover:underline">Read <ExternalLink className="w-3 h-3" /></span>}
                    </div>
                  </CardContent>
                  </Card>
                </Wrapper>
              </motion.div>
            )})}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchPage;
