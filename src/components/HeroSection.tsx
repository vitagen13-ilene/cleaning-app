import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Clock, Home, CheckCircle2 } from 'lucide-react';
import { SERVICE_TIERS } from '../data/mockData';
import { ServiceType, CleaningFrequency } from '../types';

interface HeroSectionProps {
  onStartCustomBooking: (preset?: {
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
  }) => void;
  onExploreCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCustomBooking,
  onExploreCalculator
}) => {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [serviceType, setServiceType] = useState<ServiceType>('standard');
  const [frequency, setFrequency] = useState<CleaningFrequency>('bi_weekly');

  // Compute live estimate
  const currentTier = SERVICE_TIERS.find(t => t.id === serviceType) || SERVICE_TIERS[0];
  const baseSubtotal = currentTier.basePrice + (bedrooms * currentTier.pricePerBed) + (bathrooms * currentTier.pricePerBath);
  const discountRate = frequency === 'weekly' ? 0.20 : frequency === 'bi_weekly' ? 0.15 : frequency === 'monthly' ? 0.10 : 0;
  const estimatedDiscount = baseSubtotal * discountRate;
  const estimatedFinalPrice = Math.round(baseSubtotal - estimatedDiscount);
  const estimatedDuration = (currentTier.estimatedBaseHours + (bedrooms * 0.4) + (bathrooms * 0.4)).toFixed(1);

  const handleQuickBook = () => {
    onStartCustomBooking({
      serviceType,
      bedrooms,
      bathrooms,
      frequency
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200 bg-gradient-to-b from-stone-50 via-stone-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Proposition & Quick Interactive Configurator */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-3">
              <span>Bonded & Insured Care</span>
              <span aria-hidden="true">·</span>
              <span>Hospital-Grade HEPA Sanitization</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Pristine Scandinavian cleanliness for modern residences & creative studios.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Transparent instant pricing, vetted 5-star cleaning specialists, and a strict 50-point quality audit checklist tracked in real time. No surprise estimates or hidden fees.
            </p>

            {/* Quick Interactive Pricing Card in Hero */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Instant Estimate Generator
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  Guaranteed Flat-Rate
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {/* Bedrooms */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full text-sm font-medium bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full text-sm font-medium bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Bathroom' : 'Bathrooms'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tier */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Service Plan
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as ServiceType)}
                    className="w-full text-sm font-medium bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="standard">Routine Upkeep</option>
                    <option value="deep">Deep Restoration</option>
                    <option value="move_in_out">Move-In / Move-Out</option>
                    <option value="post_renovation">Post-Construction</option>
                    <option value="office">Office Studio</option>
                  </select>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as CleaningFrequency)}
                    className="w-full text-sm font-medium bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="one_time">One-time visit</option>
                    <option value="weekly">Weekly (Save 20%)</option>
                    <option value="bi_weekly">Bi-weekly (Save 15%)</option>
                    <option value="monthly">Monthly (Save 10%)</option>
                  </select>
                </div>
              </div>

              {/* Estimate Output Strip */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                    ${estimatedFinalPrice}
                  </span>
                  <span className="text-xs text-stone-500">
                    est. {estimatedDuration} hrs · {discountRate > 0 ? `${discountRate * 100}% recurring discount included` : 'standard rate'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleQuickBook}
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  >
                    Customize & Book Clean
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Micro proof line */}
            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-500">
              <span className="flex items-center gap-1 text-stone-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                100% Satisfaction Guarantee
              </span>
              <span aria-hidden="true">·</span>
              <span>Zero-toxic eco botanicals</span>
              <span aria-hidden="true">·</span>
              <span>Cancel or reschedule anytime</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] lg:min-h-[480px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm relative group">
              <img
                src="/src/assets/images/hdb_livingroom_pristine_1794470014732.jpg"
                alt="Immaculate modern Singapore HDB apartment living room after PureClean service"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Scrim Callout */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-200">
                    Live Quality Inspection
                  </p>
                  <p className="text-sm font-bold text-white">
                    50-Point Standard Checklist Verified
                  </p>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  <Star className="w-3.5 h-3.5 fill-emerald-400" />
                  4.98 / 5.0
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency Row: 3 Concrete Quantitative Proof Tiles */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200/60">
            <div className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
              4,820+
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Residential Cleans Completed
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Across Singapore HDB Estates, BTOs & Condominiums
            </div>
          </div>

          <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200/60">
            <div className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Background-Checked & Bonded
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              W2 certified staff with minimum 3+ years experience
            </div>
          </div>

          <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200/60">
            <div className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
              24-Hour
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-1">
              Free Re-Clean Guarantee
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Flag any missed detail for immediate complimentary return
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
