import React, { useState } from 'react';
import { DollarSign, Clock, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SERVICE_TIERS, SERVICE_ADDONS } from '../data/mockData';
import { ServiceType, CleaningFrequency } from '../types';

interface PricingCalculatorSectionProps {
  onBookWithConfig: (config: {
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
  }) => void;
}

export const PricingCalculatorSection: React.FC<PricingCalculatorSectionProps> = ({
  onBookWithConfig
}) => {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [squareFeet, setSquareFeet] = useState(1350);
  const [serviceType, setServiceType] = useState<ServiceType>('standard');
  const [frequency, setFrequency] = useState<CleaningFrequency>('bi_weekly');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['oven']);

  const selectedTier = SERVICE_TIERS.find(t => t.id === serviceType) || SERVICE_TIERS[0];
  const tierBase = selectedTier.basePrice;
  const bedsCost = bedrooms * selectedTier.pricePerBed;
  const bathsCost = bathrooms * selectedTier.pricePerBath;
  const sqFtCost = Math.max(0, (squareFeet - 800)) * selectedTier.pricePerSqFt;

  const addonsCost = selectedAddons.reduce((acc, id) => {
    const addon = SERVICE_ADDONS.find(a => a.id === id);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const rawSubtotal = tierBase + bedsCost + bathsCost + sqFtCost + addonsCost;
  const discountRate = frequency === 'weekly' ? 0.20 : frequency === 'bi_weekly' ? 0.15 : frequency === 'monthly' ? 0.10 : 0;
  const discountAmount = rawSubtotal * discountRate;
  const finalPrice = Math.round(rawSubtotal - discountAmount);
  const estimatedHours = (selectedTier.estimatedBaseHours + (bedrooms * 0.35) + (bathrooms * 0.4) + (selectedAddons.length * 0.45)).toFixed(1);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span>Transparent Flat Rates</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hidden Estimates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 text-balance">
            Interactive Transparent Price Calculator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Customize room counts, service levels, and recurring cadence to view your exact guaranteed flat rate.
          </p>
        </div>

        <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Sliders & Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Service Tier Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  1. Service Plan Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_TIERS.map(tier => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setServiceType(tier.id)}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                        serviceType === tier.id
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.name}</div>
                      <div className="text-[11px] opacity-75 mt-0.5 truncate">{tier.tagline}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms & Bathrooms Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                    Bedrooms: <span className="font-mono text-emerald-800">{bedrooms}</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setBedrooms(num)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          bedrooms === num
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                    Bathrooms: <span className="font-mono text-emerald-800">{bathrooms}</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setBathrooms(num)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          bathrooms === num
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Square Footage Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  <span>Home Size</span>
                  <span className="font-mono text-emerald-800">{squareFeet} sq ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="4500"
                  step="50"
                  value={squareFeet}
                  onChange={(e) => setSquareFeet(Number(e.target.value))}
                  className="w-full accent-emerald-800"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                  <span>500 sq ft</span>
                  <span>2,500 sq ft</span>
                  <span>4,500+ sq ft</span>
                </div>
              </div>

              {/* Recurring Cadence Discount */}
              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Cleaning Cadence (Save with recurring)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'weekly', label: 'Weekly', save: '20% Off' },
                    { id: 'bi_weekly', label: 'Bi-Weekly', save: '15% Off' },
                    { id: 'monthly', label: 'Monthly', save: '10% Off' },
                    { id: 'one_time', label: 'One-Time', save: 'Standard' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrequency(f.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        frequency === f.id
                          ? 'bg-emerald-950 text-white border-emerald-900'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{f.label}</div>
                      <div className={`text-[10px] mt-0.5 ${frequency === f.id ? 'text-emerald-300' : 'text-emerald-700 font-semibold'}`}>
                        {f.save}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Addons Grid */}
              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Detail Add-Ons
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_ADDONS.slice(0, 4).map(a => {
                    const active = selectedAddons.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleAddon(a.id)}
                        className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          active
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span className="truncate">{a.name}</span>
                        <span className="font-mono text-stone-500 font-normal shrink-0 ml-1">+${a.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Live Quote Receipt Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Instant Quote Breakdown
                  </span>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Guaranteed Flat Rate
                  </span>
                </div>

                <div className="py-4 space-y-2.5 text-xs text-stone-600 border-b border-stone-100">
                  <div className="flex justify-between">
                    <span>{selectedTier.name} Base</span>
                    <span className="font-mono">${tierBase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{bedrooms} Bedrooms</span>
                    <span className="font-mono">${bedsCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{bathrooms} Bathrooms</span>
                    <span className="font-mono">${bathsCost}</span>
                  </div>
                  {sqFtCost > 0 && (
                    <div className="flex justify-between">
                      <span>Area adjustment ({squareFeet} sq ft)</span>
                      <span className="font-mono">${Math.round(sqFtCost)}</span>
                    </div>
                  )}
                  {addonsCost > 0 && (
                    <div className="flex justify-between">
                      <span>Add-on treatments ({selectedAddons.length})</span>
                      <span className="font-mono">${addonsCost}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Recurring Cadence Discount ({frequency})</span>
                      <span className="font-mono">-${Math.round(discountAmount)}</span>
                    </div>
                  )}
                </div>

                <div className="py-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-500 block">Total Due Post-Clean</span>
                    <span className="text-3xl font-extrabold text-stone-900 font-mono">
                      ${finalPrice}
                    </span>
                  </div>
                  <div className="text-right text-xs text-stone-500 font-mono">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-emerald-700" />
                    ~{estimatedHours} hours on-site
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-[11px] text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    PureClean Quality Assurance
                  </div>
                  <p>Includes complete supplies, hospital-grade HEPA extraction, and our 24h complimentary touch-up guarantee.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => onBookWithConfig({
                    serviceType,
                    bedrooms,
                    bathrooms,
                    frequency
                  })}
                  className="w-full py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  Schedule This Clean
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
