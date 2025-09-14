import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = (): React.ReactElement => {
  return (
    <footer className="border-t border-white/10 bg-[#0D0C34]">
      <div className="container mx-auto px-4">
        <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* About NexVest */}
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">About NexVest</h3>
            <p className="mt-2 text-sm text-slate-300 max-w-sm">
              NexVest is India’s next-generation private equity and financial services platform. NexVest is SEBI-registered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white">Products</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><Link href="/unlisted-shares" className="hover:text-white">Private Equity</Link></li>
              <li><Link href="/mutual-funds" className="hover:text-white">Mutual Funds</Link></li>
              <li><Link href="/research" className="hover:text-white">Financial Resources</Link></li>
              <li><Link href="/calculators" className="hover:text-white">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-medium text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-medium text-white">Follow</h4>
            <div className="mt-3 flex items-center gap-3 text-slate-300">
              <a aria-label="Twitter" href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a aria-label="LinkedIn" href="#" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
              <a aria-label="Instagram" href="#" className="hover:text-white"><Instagram className="w-5 h-5" /></a>
              <a aria-label="Facebook" href="#" className="hover:text-white"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Compliance Disclaimer */}
        <div className="py-4 border-t border-white/10 text-xs text-slate-300">
          Investments are subject to market risk. Read all related documents carefully before investing.
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-300">
          <p>© {new Date().getFullYear()} NexVest. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
