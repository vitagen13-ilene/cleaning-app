import React from 'react';
import { Sparkles, Calendar, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'calculator' | 'cleaner_ops' | 'portal';
  onSelectTab: (tab: 'home' | 'calculator' | 'cleaner_ops' | 'portal') => void;
  onOpenBooking: () => void;
  activeBookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenBooking,
  activeBookingCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Brand Wordmark (Strict single line, no descriptor pill) */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-md"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-50 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-800 transition-colors">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
              PureClean Pro
            </span>
          </button>

          {/* Zone 2: Single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectTab('home')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'home' ? 'text-stone-900 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
              }`}
            >
              Services & Overview
            </button>
            <button
              onClick={() => onSelectTab('calculator')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'calculator' ? 'text-stone-900 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
              }`}
            >
              Instant Quote Calculator
            </button>
            <button
              onClick={() => onSelectTab('portal')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'portal' ? 'text-stone-900 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
              }`}
            >
              Client Portal
              {activeBookingCount > 0 && (
                <span className="text-xs font-mono tabular-nums text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                  {activeBookingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onSelectTab('cleaner_ops')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'cleaner_ops' ? 'text-stone-900 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              Cleaner Dispatch Ops
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-4.5 py-2.2 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-[0.98] rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Book a Cleaning
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200/80 bg-stone-100/90 px-3 py-2 text-xs font-medium text-stone-700 overflow-x-auto">
        <button
          onClick={() => onSelectTab('home')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'home' ? 'bg-stone-900 text-white font-semibold' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => onSelectTab('calculator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'calculator' ? 'bg-stone-900 text-white font-semibold' : ''}`}
        >
          Quote Calculator
        </button>
        <button
          onClick={() => onSelectTab('portal')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'portal' ? 'bg-stone-900 text-white font-semibold' : ''}`}
        >
          My Bookings ({activeBookingCount})
        </button>
        <button
          onClick={() => onSelectTab('cleaner_ops')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'cleaner_ops' ? 'bg-stone-900 text-white font-semibold' : ''}`}
        >
          Cleaner Ops
        </button>
      </div>
    </header>
  );
};
