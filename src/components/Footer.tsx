import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

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

        {/* Copyright & Agency Brand Credit */}
        <div className="space-y-1 pt-1">
          <p className="text-xs font-semibold text-slate-500">
            &copy; 2026 BharatYatra. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1 font-medium">
            <span>Designed &amp; Developed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" aria-label="love" />
            <span>by</span>
            <a
              href="https://nexiify.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0A192F] hover:text-cyan-600 transition-colors inline-flex items-center gap-0.5 underline decoration-slate-300 hover:decoration-cyan-500 underline-offset-2"
            >
              <span>Nexiify Web Agency</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </p>
        </div>

        {/* Made in India Sovereignty Note */}
        <div className="text-[11px] text-slate-400">
          Official Sovereign Smart QR Portal • Made in India
        </div>

        {/* Bottom Tricolour Ribbon */}
        <div className="w-32 h-1 bg-gradient-to-r from-[#FF9933] via-slate-300 to-[#138808] mx-auto rounded-full" />
      </div>
    </footer>
  );
}
