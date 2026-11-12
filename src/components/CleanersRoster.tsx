import React from 'react';
import { ShieldCheck, Star, Award, CheckCircle } from 'lucide-react';
import { CLEANER_SPECIALISTS } from '../data/mockData';

interface CleanersRosterProps {
  onSelectSpecialist: (cleanerId: string) => void;
}

export const CleanersRoster: React.FC<CleanersRosterProps> = ({ onSelectSpecialist }) => {
  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span>Vetted & Insured Staff</span>
            <span aria-hidden="true">·</span>
            <span>Zero Contractors</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
            Meet our certified sanitization specialists.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Every specialist is a direct W2 employee, fully insured, background-checked, and trained in modern architectural materials and allergen extraction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLEANER_SPECIALISTS.map(cleaner => (
            <div
              key={cleaner.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border border-stone-100">
                  <img
                    src={cleaner.avatarUrl}
                    alt={cleaner.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-mono flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {cleaner.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
                  <span>{cleaner.experienceYears} Years Exp.</span>
                  <span>{cleaner.completedJobs} Cleans</span>
                </div>

                <h3 className="text-base font-bold text-stone-900">{cleaner.name}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{cleaner.title}</p>

                <p className="text-xs text-stone-600 mt-3 leading-relaxed line-clamp-3">
                  {cleaner.bio}
                </p>

                {/* Specialties */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cleaner.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Bonded & Vetted
                </span>
                <button
                  onClick={() => onSelectSpecialist(cleaner.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-900 hover:text-white hover:bg-stone-900 border border-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Request Specialist
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
