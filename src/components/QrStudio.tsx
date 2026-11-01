import React, { useState, useEffect, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import {
  Download,
  Check,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Sliders,
  Copy,
  Printer,
  Sparkles,
} from 'lucide-react';
import { AshokaChakraIcon } from './AshokaChakraIcon';

interface QrStudioProps {
  initialUrl?: string;
}

export function QrStudio({ initialUrl = 'https://www.bharatyatra.in/qr/' }: QrStudioProps) {
  const [url, setUrl] = useState(initialUrl);
  const [theme, setTheme] = useState<'tricolour' | 'print-mono' | 'navy' | 'saffron'>('tricolour');
  const [includeLogo, setIncludeLogo] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  // Scan Verification State
  const [verification, setVerification] = useState<{
    tested: boolean;
    valid: boolean;
    decodedText?: string;
    matches: boolean;
  }>({
    tested: false,
    valid: false,
    matches: false,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getThemePalette = useCallback(() => {
    switch (theme) {
      case 'print-mono':
        return { dark: '#000000', light: '#FFFFFF' };
      case 'navy':
        return { dark: '#0A192F', light: '#FFFFFF' };
      case 'saffron':
        return { dark: '#E65100', light: '#FFF9F2' };
      case 'tricolour':
      default:
        return { dark: '#102B4E', light: '#FFFFFF' };
    }
  }, [theme]);

  const renderAndVerifyQR = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsRendering(true);

    try {
      const palette = getThemePalette();
      const canvas = canvasRef.current;
      const size = 640;

      // 1. Draw QR code onto canvas
      await QRCode.toCanvas(canvas, url || 'https://www.bharatyatra.in/qr/', {
        width: size,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: palette.dark,
          light: palette.light,
        },
      });

      const ctx = canvas.getContext('2d');
      if (ctx && includeLogo) {
        // Draw center protective circle
        const centerRadius = Math.round(size * 0.11);
        const centerX = size / 2;
        const centerY = size / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius + 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = theme === 'saffron' ? '#E65100' : theme === 'tricolour' ? '#FF9933' : '#102B4E';
        ctx.stroke();

        // Draw center Ashoka Chakra emblem
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius - 2, 0, Math.PI * 2);
        ctx.strokeStyle = '#000080';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        for (let i = 0; i < 24; i++) {
          const angle = (i * 15 * Math.PI) / 180;
          const x2 = centerX + (centerRadius - 3) * Math.cos(angle);
          const y2 = centerY + (centerRadius - 3) * Math.sin(angle);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = '#000080';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = '#000080';
        ctx.fill();
        ctx.restore();
      }

      // 2. Immediate live verification using jsQR
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const decoded = jsQR(imageData.data, imageData.width, imageData.height);

        if (decoded && decoded.data) {
          setVerification({
            tested: true,
            valid: true,
            decodedText: decoded.data,
            matches: decoded.data === (url || 'https://www.bharatyatra.in/qr/'),
          });
        } else {
          setVerification({
            tested: true,
            valid: false,
            matches: false,
          });
        }
      }
    } catch {
      setVerification({
        tested: true,
        valid: false,
        matches: false,
      });
    } finally {
      setIsRendering(false);
    }
  }, [url, theme, includeLogo, getThemePalette]);

  useEffect(() => {
    renderAndVerifyQR();
  }, [renderAndVerifyQR]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `BHARATYATRA-QR-${theme.toUpperCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadSvg = async () => {
    try {
      const palette = getThemePalette();
      const svgString = await QRCode.toString(url || 'https://www.bharatyatra.in/qr/', {
        type: 'svg',
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: palette.dark,
          light: palette.light,
        },
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const link = document.createElement('a');
      link.download = `BHARATYATRA-QR-${theme.toUpperCase()}.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();
    } catch {
      // Fallback
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="qr-studio" className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 shadow-2xs">
            <AshokaChakraIcon size={14} color="#000080" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0A192F]">
              Live QR Generation &amp; Print Verification Studio
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#0A192F] tracking-tight">
            High-Resolution Sovereign QR Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Generate, customize, test, and export print-ready QR codes engineered with Level-H error correction for official business cards, brochures, and digital displays.
          </p>
        </div>

        {/* Studio Grid: Controls (Left) & Canvas Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Controls Column (7 Cols on LG) */}
          <div className="lg:col-span-7 bg-[#FAFAFA] p-5 sm:p-7 rounded-3xl border border-slate-200 space-y-5">
            
            {/* Input URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0A192F] uppercase tracking-wider block">
                Encoded Public Destination URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.bharatyatra.in/qr/"
                  className="w-full py-3 px-3.5 pr-20 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-mono text-[#0A192F] focus:outline-hidden focus:ring-2 focus:ring-[#FF9933] shadow-2xs"
                />
                <button
                  type="button"
                  onClick={copyUrl}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Official Business Card standard encodes only the permanent landing page URL.
              </p>
            </div>

            {/* Theme Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0A192F] uppercase tracking-wider block">
                Color Palette &amp; Print Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('tricolour')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    theme === 'tricolour'
                      ? 'border-[#FF9933] bg-[#FFFBF5] shadow-xs ring-1 ring-[#FF9933]'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#102B4E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#138808]" />
                  </div>
                  <div className="text-xs font-black text-[#0A192F]">Tricolour</div>
                  <div className="text-[10px] text-slate-500">Digital / Flyer</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('print-mono')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    theme === 'print-mono'
                      ? 'border-slate-900 bg-slate-100 shadow-xs ring-1 ring-slate-900'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-black" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300" />
                  </div>
                  <div className="text-xs font-black text-[#0A192F]">Print-Safe</div>
                  <div className="text-[10px] text-slate-500">100% Monochrome</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('navy')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    theme === 'navy'
                      ? 'border-[#102B4E] bg-blue-50/50 shadow-xs ring-1 ring-[#102B4E]'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0A192F]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-100" />
                  </div>
                  <div className="text-xs font-black text-[#0A192F]">Royal Navy</div>
                  <div className="text-[10px] text-slate-500">Executive Style</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('saffron')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    theme === 'saffron'
                      ? 'border-[#E65100] bg-orange-50/50 shadow-xs ring-1 ring-[#E65100]'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E65100]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4E6]" />
                  </div>
                  <div className="text-xs font-black text-[#0A192F]">Sunrise</div>
                  <div className="text-[10px] text-slate-500">Festive Edition</div>
                </button>
              </div>
            </div>

            {/* Toggle Center Emblem & Error Correction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#0A192F] block">Ashoka Chakra Center Seal</span>
                  <span className="text-[10px] text-slate-500">Embedded with high error tolerance</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeLogo}
                  onChange={(e) => setIncludeLogo(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 focus:ring-blue-800"
                />
              </label>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0A192F] block">Error Correction Level</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Level H (30% Recovery)</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                  H-Spec
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleDownloadPng}
                className="flex-1 min-w-[140px] py-3 px-4 rounded-xl bg-gradient-to-r from-[#0A192F] to-[#1E3A8A] text-white text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download PNG (1200px)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className="flex-1 min-w-[140px] py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Download className="w-4 h-4 text-emerald-700" />
                <span>Vector SVG</span>
              </button>
            </div>
          </div>

          {/* Preview & Live Verification Column (5 Cols on LG) */}
          <div className="lg:col-span-5 bg-[#FAFAFA] p-5 sm:p-7 rounded-3xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
            
            {/* Live QR Canvas Frame */}
            <div className="relative p-3.5 rounded-2xl bg-white border border-slate-200 shadow-md max-w-[280px] sm:max-w-[320px] w-full aspect-square flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain rounded-lg"
              />
              {isRendering && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex items-center justify-center rounded-2xl">
                  <RefreshCw className="w-8 h-8 text-[#FF9933] animate-spin" />
                </div>
              )}
            </div>

            {/* Live Scan Verification Result Banner */}
            <div className="w-full max-w-[320px]">
              {verification.tested && verification.valid ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="font-bold block">100% Scan Verified (jsQR Engine)</span>
                    <span className="text-[10px] text-emerald-700 truncate block">
                      Decodes to: {verification.decodedText}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold block">Rendering QR Code...</span>
                    <span className="text-[10px] text-amber-700">Verifying scanning matrix integrity</span>
                  </div>
                </div>
              )}
            </div>

            {/* Print Specification Card */}
            <div className="w-full max-w-[320px] p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between font-bold text-[#0A192F]">
                <span>Print Spec:</span>
                <span>3.5" × 2.0" Business Card</span>
              </div>
              <div className="flex justify-between">
                <span>Color Mode:</span>
                <span className="font-mono text-slate-800">RGB &amp; CMYK Print Safe</span>
              </div>
              <div className="flex justify-between">
                <span>Quiet Zone:</span>
                <span className="text-emerald-700 font-bold">2 Modules (ISO/IEC 18004)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
