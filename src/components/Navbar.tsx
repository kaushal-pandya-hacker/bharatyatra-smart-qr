import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Sparkles, Phone, ExternalLink } from 'lucide-react';
import { AshokaChakraIcon } from './AshokaChakraIcon';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Smart Pass', href: '#smart-pass' },
    { label: '6 Actions', href: '#actions' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Concierge', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* 1. Indian Tricolour Top Accent Ribbon */}
      <div className="w-full h-1.5 flex shrink-0 shadow-xs">
        <div className="w-1/3 bg-[#FF9933]" title="Saffron (Strength & Courage)" />
        <div className="w-1/3 bg-white" title="White (Peace & Truth)" />
        <div className="w-1/3 bg-[#138808]" title="Green (Growth & Auspiciousness)" />
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full border-b transition-all duration-200 ${scrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200/90 shadow-xs py-2.5 sm:py-3'
            : 'bg-white/90 backdrop-blur-sm border-slate-200/60 py-3 sm:py-3.5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Brand Logo & Title */}
          <a href="#smart-pass" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 border border-slate-200 shadow-xs flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="./logo.png"
                alt="BharatYatra Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#0A192F] uppercase font-['Outfit',sans-serif]">
                  BharatYatra
                </span>
                <span className="hidden xs:inline-block">
                  <AshokaChakraIcon size={14} color="#000080" />
                </span>
              </div>
              <p className="hidden md:block text-[10px] font-bold text-[#E65100] tracking-widest uppercase">
                Discover India. Travel Better.
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-[#0A192F] hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://www.bharatyatra.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold transition-all shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#0A192F]" />
              <span>Visit Portal</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href="https://www.bharatyatra.in/plan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#E65100] text-white text-xs font-bold hover:brightness-105 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-100" />
              <span className="hidden xs:inline">AI Planner</span>
              <span className="xs:hidden">AI</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. Mobile Navigation Sheet / Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#0A192F] transition-colors text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://www.bharatyatra.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#0A192F]" />
                <span>Visit Main Portal (bharatyatra.in)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="https://www.bharatyatra.in/plan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#E65100] text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Open BharatYatra AI Trip Planner</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

