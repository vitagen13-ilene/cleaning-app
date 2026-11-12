import React from 'react';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'calculator' | 'cleaner_ops' | 'portal') => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenBooking }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-stone-950 flex items-center justify-center font-bold text-base">
                P
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                PureClean Pro
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Hospital-grade HEPA sanitization and meticulous Scandinavian cleaning standards for residential homes, apartments, and commercial creative studios.
            </p>
            <div className="text-xs text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Bonded, Insured & W2 Certified Staff</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Instant Quote Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Portal & Receipts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('cleaner_ops')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cleaner Dispatch Console
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Service Areas
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serving San Francisco (Pacific Heights, Marina, Mission, SoMa), Oakland Hills, Berkeley, Marin County (Sausalito, Mill Valley), and Silicon Valley.
            </p>
            <div className="pt-2 text-xs text-stone-400">
              <span className="font-semibold text-stone-300">Client Support:</span> support@purecleanpro.com · (415) 555-0199
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} PureClean Pro Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Guarantee Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
