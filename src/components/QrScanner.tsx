import React, { useState, useRef, useCallback } from 'react';
import jsQR from 'jsqr';
import {
  ScanLine,
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  X,
  FileImage,
} from 'lucide-react';
import { AshokaChakraIcon } from './AshokaChakraIcon';

export function QrScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isBharatYatraUrl, setIsBharatYatraUrl] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Process image data with jsQR
  const processImageFile = (file: File) => {
    setErrorMsg(null);
    setScanResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setPreviewSrc(img.src);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          setScanResult(code.data);
          const isOfficial = code.data.includes('bharatyatra.in') || code.data.includes('bharatyatra');
          setIsBharatYatraUrl(isOfficial);
        } else {
          setErrorMsg('No readable QR code found in this image. Please ensure the QR code is clear, well-lit, and in focus.');
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    setErrorMsg(null);
    setScanResult(null);
    setPreviewSrc(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMsg('Camera access is not supported by your browser. Please upload a QR code image instead.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setScanning(true);
        scanFrame();
      }
    } catch {
      setErrorMsg('Camera permission denied or camera unavailable. Please upload a QR image or grant camera permissions.');
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  }, []);

  const scanFrame = () => {
    if (!videoRef.current || !scanning) return;

    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          setScanResult(code.data);
          const isOfficial = code.data.includes('bharatyatra.in') || code.data.includes('bharatyatra');
          setIsBharatYatraUrl(isOfficial);
          stopCamera();
          return;
        }
      }
    }

    if (scanning) {
      requestAnimationFrame(scanFrame);
    }
  };

  return (
    <section id="qr-scanner" className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
            <AshokaChakraIcon size={14} color="#000080" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0A192F]">
              Live QR Scanner &amp; Reader
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#0A192F] tracking-tight">
            Verify &amp; Test Any BharatYatra QR
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Scan your physical business card or upload a digital flyer image to test reading accuracy with our in-browser computer vision engine.
          </p>
        </div>

        {/* Scanner Card */}
        <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">

          {/* Controls: Upload vs Camera */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                fileInputRef.current?.click();
              }}
              className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#0A192F] transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Upload className="w-4 h-4 text-blue-700" />
              <span>Upload QR Image</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {!scanning ? (
              <button
                type="button"
                onClick={startCamera}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#102B4E] to-[#1E3A8A] text-white text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 active:scale-98 shadow-2xs"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Open Live Camera</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopCamera}
                className="py-3 px-4 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <X className="w-4 h-4 text-white" />
                <span>Stop Camera</span>
              </button>
            )}
          </div>

          {/* Camera Viewport */}
          {scanning && (
            <div className="relative max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden bg-black border-2 border-[#FF9933] shadow-lg">
              <video ref={videoRef} className="w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none border-2 border-white/50 rounded-xl m-8 flex items-center justify-center">
                <div className="w-full h-0.5 bg-[#FF9933] shadow-[0_0_12px_#FF9933] animate-pulse" />
              </div>
            </div>
          )}

          {/* Uploaded Image Preview */}
          {previewSrc && !scanning && (
            <div className="max-w-[220px] mx-auto p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1">
              <img src={previewSrc} alt="Uploaded QR" className="max-h-36 object-contain rounded-lg" />
              <span className="text-[10px] text-slate-500 font-semibold">Analyzed Image</span>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5 max-w-lg mx-auto">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Scan Result Box */}
          {scanResult && (
            <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-emerald-200/90 text-emerald-950 space-y-3 max-w-lg mx-auto shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-900 block">
                    QR Decoded Successfully!
                  </span>
                  {isBharatYatraUrl ? (
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      ✓ Official Verified BharatYatra Portal URL
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-600">External Encoded URL</span>
                  )}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 font-mono text-xs text-slate-800 break-all select-all">
                {scanResult}
              </div>

              <a
                href={scanResult}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#138808] to-[#0F6B06] text-white text-xs font-bold hover:brightness-105 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Open Decoded Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

