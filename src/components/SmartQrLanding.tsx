import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Compass,
  Building2,
  PhoneCall,
  ChevronRight,
  Share2,
  Check,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { SMART_QR_CONFIG, SmartQrButtonConfig } from '../config/smart-qr-config';
import { AshokaChakraIcon } from './AshokaChakraIcon';

// Official Instagram Sunset SVG Icon
function InstagramIcon({ className = 'w-5 h-5 sm:w-6 sm:h-6 text-white' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

// Official WhatsApp SVG Icon
function WhatsAppIcon({ className = 'w-4 h-4 text-white' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function SmartQrLanding() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = SMART_QR_CONFIG.brand.landingPageUrl;
    const title = 'BharatYatra — Discover India. Travel Better.';
    const text = "Check out BharatYatra, India's premier AI travel platform.";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {}
    }
  };

  const getCardLuxuryStyle = (id: string) => {
    switch (id) {
      case 'plan-your-trip':
        return {
          cardBg: 'bg-gradient-to-r from-[#FFFBF5] via-white to-[#FFF4E6]',
          border: 'border-[#FF9933]/40 hover:border-[#FF7700]',
          glow: 'hover:shadow-[0_12px_32px_rgba(255,119,0,0.18)]',
          iconBg: 'bg-gradient-to-br from-[#FF9933] via-[#FF7700] to-[#E65100]',
          iconShadow: 'shadow-md shadow-orange-500/25',
          badgeBg: 'bg-amber-500/10 text-[#D96B00] border border-amber-500/30',
          titleColor: 'text-[#102B4E] group-hover:text-[#E65100]',
        };
      case 'explore-destinations':
        return {
          cardBg: 'bg-gradient-to-r from-[#F4F8FC] via-white to-[#EBF2FA]',
          border: 'border-[#102B4E]/30 hover:border-[#102B4E]',
          glow: 'hover:shadow-[0_12px_32px_rgba(16,43,78,0.18)]',
          iconBg: 'bg-gradient-to-br from-[#102B4E] via-[#1E3A8A] to-[#0A192F]',
          iconShadow: 'shadow-md shadow-blue-900/25',
          badgeBg: 'bg-blue-500/10 text-[#102B4E] border border-blue-500/30',
          titleColor: 'text-[#102B4E] group-hover:text-blue-900',
        };
      case 'explore-tour-packages':
        return {
          cardBg: 'bg-gradient-to-r from-[#F2FAF4] via-white to-[#E8F5E9]',
          border: 'border-[#138808]/30 hover:border-[#138808]',
          glow: 'hover:shadow-[0_12px_32px_rgba(19,136,8,0.18)]',
          iconBg: 'bg-gradient-to-br from-[#138808] via-[#0F6B06] to-[#0A4704]',
          iconShadow: 'shadow-md shadow-emerald-700/25',
          badgeBg: 'bg-emerald-500/10 text-[#0F6B06] border border-emerald-500/30',
          titleColor: 'text-[#102B4E] group-hover:text-[#0F6B06]',
        };
      case 'follow-instagram':
        return {
          cardBg: 'bg-gradient-to-r from-[#FFF5F8] via-white to-[#FDF2F8]',
          border: 'border-pink-300/50 hover:border-[#E1306C]',
          glow: 'hover:shadow-[0_12px_32px_rgba(225,48,108,0.20)]',
          iconBg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
          iconShadow: 'shadow-md shadow-pink-500/30',
          badgeBg: 'bg-pink-500/10 text-[#C13584] border border-pink-500/30',
          titleColor: 'text-[#102B4E] group-hover:text-[#E1306C]',
        };
      case 'become-travel-partner':
      case 'become-a-travel-partner':
        return {
          cardBg: 'bg-gradient-to-r from-[#F6F7FA] via-white to-[#EEF2F6]',
          border: 'border-slate-300/80 hover:border-[#102B4E]',
          glow: 'hover:shadow-[0_12px_32px_rgba(16,43,78,0.18)]',
          iconBg: 'bg-gradient-to-br from-[#0A192F] via-[#102B4E] to-[#1E293B]',
          iconShadow: 'shadow-md shadow-slate-900/25',
          badgeBg: 'bg-indigo-500/10 text-[#102B4E] border border-indigo-500/30',
          titleColor: 'text-[#102B4E] group-hover:text-[#0A192F]',
        };
      case 'contact-us':
      default:
        return {
          cardBg: 'bg-gradient-to-r from-[#F0FDF4] via-white to-[#DCFCE7]/40',
          border: 'border-[#138808]/35 hover:border-[#138808]',
          glow: 'hover:shadow-[0_12px_32px_rgba(19,136,8,0.18)]',
          iconBg: 'bg-gradient-to-br from-[#138808] via-[#059669] to-[#0F766E]',
          iconShadow: 'shadow-md shadow-emerald-700/25',
          badgeBg: 'bg-emerald-500/10 text-[#0F6B06] border border-emerald-500/30',
          titleColor: 'text-[#102B4E] group-hover:text-[#138808]',
        };
    }
  };

  const renderIcon = (name: SmartQrButtonConfig['iconName']) => {
    const iconClass = 'w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]';
    switch (name) {
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'MapPin':
        return <MapPin className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Instagram':
        return <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'Building2':
        return <Building2 className={iconClass} />;
      case 'PhoneCall':
        return <PhoneCall className={iconClass} />;
      default:
        return <Compass className={iconClass} />;
    }
  };

  return (
    <div id="smart-pass" className="w-full relative overflow-x-hidden">
      
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-gradient-to-b from-[#FF9933]/12 via-[#FFF4E6]/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-t from-[#138808]/10 via-[#E8F5E9]/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Decorative Subtle Ashoka Chakra Watermark */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 opacity-[0.025] pointer-events-none -z-10">
        <AshokaChakraIcon size={520} color="#000080" />
      </div>

      {/* MAIN CONTAINER: Fully responsive mobile-to-desktop grid */}
      <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* MOBILE & TABLET TOP HERO */}
        <header className="lg:hidden text-center space-y-3.5 mb-7">
          <div className="inline-block relative">
            <div className="p-1 rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-amber-400 via-white to-emerald-400 shadow-xl shadow-amber-500/10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[20px] sm:rounded-[24px] p-2 flex items-center justify-center transition-transform hover:scale-105">
                <img
                  src="./logo.png"
                  alt="BharatYatra Official Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <span
              className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md border border-amber-200"
              title="Ashoka Chakra Seal"
            >
              <AshokaChakraIcon size={16} color="#000080" />
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A192F] uppercase font-['Outfit',sans-serif]">
              {SMART_QR_CONFIG.brand.name}
            </h1>
            <p className="text-[11px] sm:text-xs font-bold text-[#E65100] tracking-wide">
              {SMART_QR_CONFIG.brand.subNameGujarati} • અધિકૃત સ્માર્ટ ક્યૂઆર
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-amber-500/30 shadow-xs">
            <AshokaChakraIcon size={12} color="#000080" />
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-[#0A192F] uppercase">
              {SMART_QR_CONFIG.brand.tagline}
            </span>
            <AshokaChakraIcon size={12} color="#000080" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg sm:text-2xl font-black text-[#0A192F] tracking-tight leading-snug">
              {SMART_QR_CONFIG.brand.headline}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              {SMART_QR_CONFIG.brand.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-[#0F6B06] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-[#138808]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official Business Card QR</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-mono">bharatyatra.in</span>
          </div>
        </header>

        {/* 12-COLUMN ADAPTIVE GRID FOR TABLET & DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* LEFT COLUMN (LG: 5 Cols) - Executive Passport Card & Direct Support */}
          <div className="hidden lg:block lg:col-span-5 space-y-6 sticky top-24">
            
            {/* Desktop Brand Passport Tile */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-6 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="p-1 rounded-2xl bg-gradient-to-br from-amber-400 via-white to-emerald-400 shadow-md">
                  <div className="w-20 h-20 bg-white rounded-[14px] p-2 flex items-center justify-center">
                    <img
                      src="./logo.png"
                      alt="BharatYatra Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Official Sovereign QR
                  </span>
                  <div className="text-xs font-mono text-slate-400 mt-1">bharatyatra.in/qr/</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-[#0A192F] uppercase font-['Outfit',sans-serif]">
                    {SMART_QR_CONFIG.brand.name}
                  </h1>
                  <AshokaChakraIcon size={18} color="#000080" />
                </div>
                <p className="text-xs font-bold text-[#E65100]">
                  {SMART_QR_CONFIG.brand.subNameGujarati} • અધિકૃત સ્માર્ટ ક્યૂઆર
                </p>
                <p className="text-xs font-bold text-slate-500 tracking-wider uppercase pt-1">
                  {SMART_QR_CONFIG.brand.tagline}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  {SMART_QR_CONFIG.brand.description}
                </p>
              </div>
            </div>

            {/* Direct Executive Support Console */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#0A192F]">
                    Executive Concierge
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Instant Connect
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${SMART_QR_CONFIG.contact.phone}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A192F] hover:bg-slate-100 transition-all shadow-2xs active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-700" />
                  <span>Call Concierge</span>
                </a>

                <a
                  href={SMART_QR_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#138808] to-[#0F6B06] text-white text-xs font-bold hover:brightness-105 transition-all shadow-sm shadow-emerald-700/20 active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0A192F] transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Smart Card Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Share BharatYatra Smart Pass</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN (LG: 7 Cols) - The Exact Six Mandated Actions */}
          <div id="actions" className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#0A192F] uppercase tracking-wide">
                  Primary Travel Actions
                </h2>
                <p className="text-xs text-slate-500">
                  Select an official service below to begin your journey.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                6 Verified Options
              </span>
            </div>

            {/* THE EXACT SIX BUTTONS IN MANDATED ORDER */}
            <div id="primary-action-buttons" className="space-y-3">
              {SMART_QR_CONFIG.buttons.map((btn) => {
                const style = getCardLuxuryStyle(btn.id);

                return (
                  <a
                    key={btn.id}
                    href={btn.destinationUrl}
                    target={btn.isExternal ? '_blank' : '_self'}
                    rel={btn.isExternal ? 'noopener noreferrer' : undefined}
                    className="block focus:outline-hidden rounded-2xl group"
                  >
                    <div
                      className={`relative w-full p-3.5 sm:p-4.5 rounded-2xl ${style.cardBg} border ${style.border} shadow-xs ${style.glow} transition-all duration-200 active:scale-[0.98] flex items-center justify-between gap-3 text-left`}
                    >
                      {/* Left: Responsive Luxury Icon */}
                      <div
                        className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center shrink-0 ${style.iconBg} ${style.iconShadow} transition-transform duration-200 group-hover:scale-105`}
                      >
                        {renderIcon(btn.iconName)}
                      </div>

                      {/* Middle: Title, Badge, Description */}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-0.5 sm:mb-1">
                          <span className={`text-sm sm:text-base font-black tracking-tight ${style.titleColor} transition-colors duration-200`}>
                            {btn.label}
                          </span>
                          <span
                            className={`text-[9px] sm:text-[9.5px] font-extrabold px-2 py-0.5 rounded-full ${style.badgeBg} tracking-wide shrink-0`}
                          >
                            {btn.badgeText}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                          {btn.subtitle}
                        </p>
                      </div>

                      {/* Right: Action Indicator */}
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 group-hover:bg-[#0A192F] group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition-all duration-200 shadow-2xs border border-slate-200/80 group-hover:border-transparent">
                        {btn.isExternal ? (
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.8] transition-transform duration-200 group-hover:translate-x-0.5" />
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* MOBILE ONLY: Direct Concierge Support Bar */}
            <div className="lg:hidden pt-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                    <span className="text-xs font-black uppercase tracking-wider text-[#0A192F]">
                      Executive Concierge
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Instant Connect
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${SMART_QR_CONFIG.contact.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A192F] hover:bg-slate-100 transition-all active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-700" />
                    <span>Call Concierge</span>
                  </a>

                  <a
                    href={SMART_QR_CONFIG.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-gradient-to-r from-[#138808] to-[#0F6B06] text-white text-xs font-bold hover:brightness-105 transition-all shadow-sm active:scale-95"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Smart Card Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Share BharatYatra Smart Pass</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CURATED INDIAN DESTINATIONS SHOWCASE */}
            <div id="destinations" className="pt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-extrabold text-[#0A192F] uppercase tracking-wider text-[11px]">
                  Incredible India Awaits
                </span>
                <a
                  href="https://www.bharatyatra.in/destinations"
                  className="text-[#E65100] hover:text-[#FF7700] font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore 36 States &amp; UTs</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <a
                  href="https://www.bharatyatra.in/destinations"
                  className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200/90 block shadow-2xs"
                >
                  <img
                    src="./somnath-temple-bg.jpg"
                    alt="Somnath Temple Shore"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-black/20 to-transparent flex flex-col justify-end p-2 sm:p-2.5">
                    <span className="text-[10px] sm:text-xs font-black text-white leading-tight">Somnath</span>
                    <span className="text-[8px] sm:text-[9px] text-amber-300 font-semibold">Gujarat</span>
                  </div>
                </a>

                <a
                  href="https://www.bharatyatra.in/destinations"
                  className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200/90 block shadow-2xs"
                >
                  <img
                    src="./bhuj-kutch-bg.jpg"
                    alt="White Rann of Kutch"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-black/20 to-transparent flex flex-col justify-end p-2 sm:p-2.5">
                    <span className="text-[10px] sm:text-xs font-black text-white leading-tight">White Rann</span>
                    <span className="text-[8px] sm:text-[9px] text-amber-300 font-semibold">Kutch</span>
                  </div>
                </a>

                <a
                  href="https://www.bharatyatra.in/destinations"
                  className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200/90 block shadow-2xs"
                >
                  <img
                    src="./gir-national-park-bg.jpg"
                    alt="Gir National Park Safari"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-black/20 to-transparent flex flex-col justify-end p-2 sm:p-2.5">
                    <span className="text-[10px] sm:text-xs font-black text-white leading-tight">Sasan Gir</span>
                    <span className="text-[8px] sm:text-[9px] text-emerald-300 font-semibold">Wildlife</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
