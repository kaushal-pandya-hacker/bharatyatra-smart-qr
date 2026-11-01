import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { AshokaChakraIcon } from './AshokaChakraIcon';

export function Footer() {
  return (
    <footer id="contact" className="w-full border-t border-slate-200/80 bg-white/95 backdrop-blur-md text-center py-8 px-4 sm:px-6 lg:px-8 space-y-4">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-slate-500 font-bold">
          <a href="https://www.bharatyatra.in" className="hover:text-[#0A192F] transition-colors">
            Main Portal
          </a>
          <span>•</span>
          <a href="https://www.bharatyatra.in/plan" className="hover:text-[#0A192F] transition-colors">
            AI Trip Planner
          </a>
          <span>•</span>
          <a href="https://www.bharatyatra.in/destinations" className="hover:text-[#0A192F] transition-colors">
            Destinations Directory
          </a>
          <span>•</span>
          <a href="https://www.bharatyatra.in/packages" className="hover:text-[#0A192F] transition-colors">
            Tour Packages
          </a>
          <span>•</span>
          <a href="https://www.bharatyatra.in/contact" className="hover:text-[#0A192F] transition-colors">
            Official Contact
          </a>
          <span>•</span>
          <a href="https://www.bharatyatra.in/terms" className="hover:text-[#0A192F] transition-colors">
            Terms of Service
          </a>
          <span>•</span>
          <a href="https://www.bharatyatra.in/privacy" className="hover:text-[#0A192F] transition-colors">
            Privacy Policy
          </a>
        </div>

        {/* Brand & Made with Love */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <span>Official Sovereign Smart QR Portal of</span>
          <strong className="text-slate-700 font-extrabold uppercase">BharatYatra</strong>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium text-slate-500">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> in India
          </span>
        </div>

        {/* Bottom Tricolour Ribbon */}
        <div className="w-32 h-1 bg-gradient-to-r from-[#FF9933] via-slate-300 to-[#138808] mx-auto rounded-full" />
      </div>
    </footer>
  );
}
