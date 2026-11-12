import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Flame, Droplets, Wind, Home } from 'lucide-react';
import { SERVICE_TIERS, SERVICE_ADDONS } from '../data/mockData';
import { ServiceType } from '../types';

interface ServiceShowcaseProps {
  onSelectTier: (tierId: ServiceType) => void;
}

export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({ onSelectTier }) => {
  const [activeTab, setActiveTab] = useState<ServiceType>('standard');
  const currentTier = SERVICE_TIERS.find(t => t.id === activeTab) || SERVICE_TIERS[0];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span>Specialized Protocols</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Detail</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 text-balance">
            Engineered cleaning programs tailored to your architecture.
          </h2>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            From routine weekly maintenance to full move-out restorations and post-construction particulate scrubbing, explore our hospital-grade protocols.
          </p>

          {/* Interactive Tier Switcher */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center p-1.5 bg-stone-100 rounded-2xl gap-1 border border-stone-200">
            {SERVICE_TIERS.map(tier => (
              <button
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tier.id
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tier.name.split(' ')[0]} {tier.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Spotlight Card for Active Tier */}
        <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Details & Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  Service Specification
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900 mt-1">
                  {currentTier.name}
                </h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  {currentTier.tagline}
                </p>
              </div>

              {/* Tasks Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentTier.includedTasks.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="leading-tight">{task}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center gap-4">
                <button
                  onClick={() => onSelectTier(currentTier.id)}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2"
                >
                  Book {currentTier.name.split(' ')[0]} Clean
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-stone-500 font-mono">
                  From ${currentTier.basePrice} base flat-rate
                </span>
              </div>
            </div>

            {/* Right Col: Visual Spotlight */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-4/3 group">
                <img
                  src={activeTab === 'deep' || activeTab === 'move_in_out' 
                    ? '/src/assets/images/cleaning_deep_bathroom_1794458449943.jpg'
                    : '/src/assets/images/cleaning_kitchen_pristine_1794458450958.jpg'
                  }
                  alt={currentTier.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <div className="font-bold text-sm">Pristine Quality Standard</div>
                  <div className="text-stone-300 text-[11px]">Eco-safe botanicals · HEPA allergen filtration</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Add-on Detail Gallery */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Custom Detail Enhancements
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                Add-on specialty treatments for complete perfection.
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-2 sm:mt-0 font-mono">
              Selectable during booking checkout
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_ADDONS.slice(0, 4).map(addon => (
              <div
                key={addon.id}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-2 border-b border-stone-200/60">
                    <span>+{addon.durationMinutes} min</span>
                    <span className="font-bold text-stone-900 text-sm">${addon.price}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mt-3">{addon.name}</h4>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{addon.description}</p>
                </div>
                <div className="mt-4 pt-3 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Eco-Certified Treatment
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
