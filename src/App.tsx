import React from 'react';
import { Navbar } from './components/Navbar';
import { SmartQrLanding } from './components/SmartQrLanding';
import { QrStudio } from './components/QrStudio';
import { QrScanner } from './components/QrScanner';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#102B4E] flex flex-col justify-between selection:bg-[#FF9933]/25 overflow-x-hidden font-sans">
      {/* 1. Universal Responsive Navbar with Mobile Drawer */}
      <Navbar />

      {/* 2. Primary Customer & Business Card Smart Pass Section */}
      <main className="flex-1 w-full">
        <SmartQrLanding />
        
        {/* 3. Live QR Code Generation Studio & Print Customizer */}
        <QrStudio initialUrl="https://www.bharatyatra.in/qr/" />

        {/* 4. Live Computer Vision QR Code Scanner */}
        <QrScanner />
      </main>

      {/* 5. Responsive Tricolour Footer */}
      <Footer />
    </div>
  );
}

export default App;
