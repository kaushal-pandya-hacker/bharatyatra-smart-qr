import React from 'react';
import {
  Globe,
  Layers,
  Palette,
  Sparkles,
  ArrowUpRight,
  Code2,
  CheckCircle2,
} from 'lucide-react';

export function NexiifyAgencyBanner() {
  const services = [
    { name: 'Website Development', icon: Globe },
    { name: 'Web Application Development', icon: Layers },
    { name: 'UI/UX Design', icon: Palette },
    { name: 'Custom Digital Solutions', icon: Code2 },
  ];

  return (
    <section
      id="agency-credit"
      aria-label="Technology Partner — Nexiify Web Agency"
      className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071324] via-[#0A192F] to-[#0F2942] border border-cyan-500/20 shadow-2xl shadow-slate-900/15 p-6 sm:p-8 lg:p-10 text-white">
        
        {/* Decorative Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Brand, Pitch & Services */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>POWERED BY DIGITAL CREATIVITY</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight font-['Outfit',sans-serif]">
                Your Digital Presence Deserves Better.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                This platform is designed and developed by <strong className="text-cyan-300 font-bold">Nexiify Web Agency</strong>, creating modern, scalable, and innovative digital experiences for businesses.
              </p>
            </div>

            {/* Agency Brand Identity Callout */}
            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <span className="text-lg sm:text-xl font-black tracking-wider text-white uppercase font-['Outfit',sans-serif]">
                NEXIIIFY WEB AGENCY
              </span>
              <span className="text-xs sm:text-sm font-semibold text-amber-400 tracking-wide">
                &ldquo;Design. Develop. Deliver.&rdquo;
              </span>
            </div>

            {/* 4 Core Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {services.map((svc) => {
                const IconComponent = svc.icon;
                return (
                  <div
                    key={svc.name}
                    className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-colors shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200">
                      {svc.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: CTA Box & Primary Action */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm text-center space-y-4 shadow-xl">
              
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  NEED A WEBSITE FOR YOUR BUSINESS?
                </span>
                <p className="text-xs text-slate-300">
                  Transform your ideas into high-converting digital realities.
                </p>
              </div>

              {/* Primary Action Button */}
              <a
                href="https://nexiify.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-[0.98]"
              >
                <span>BUILD YOUR WEBSITE WITH NEXIIIFY</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Secondary Supporting Text */}
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium italic">
                &ldquo;Let&apos;s build something extraordinary together.&rdquo;
              </p>

              {/* Verified Partner Trust Badge */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Technology &amp; Growth Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
