import React from 'react';
import { Calculator, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface CalculatorBannerProps {
  onOpenCalculator: () => void;
}

export const CalculatorBanner: React.FC<CalculatorBannerProps> = ({ onOpenCalculator }) => {
  return (
    <section className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 sm:p-12 lg:p-16 shadow-lg border border-stone-800">
          
          {/* Subtle ambient lighting decoration */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-emerald-700/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Instant Flat-Rate Estimator</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span>Zero Hidden Fees</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
                Interactive Transparent Price Calculator
              </h2>

              <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
                Customize room counts, service levels, and recurring cadence to view your exact guaranteed flat rate.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time instant quotes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Room & add-on breakdown</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Up to 20% recurring discount</span>
                </div>
              </div>
            </div>

            {/* Right Action Area */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-stone-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-xl transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>View calculator</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-xs text-stone-400 font-mono">
                Takes less than 30 seconds
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
