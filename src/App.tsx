/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceShowcase } from './components/ServiceShowcase';
import { CleanersRoster } from './components/CleanersRoster';
import { PricingCalculatorSection } from './components/PricingCalculatorSection';
import { CleanerOperationsDashboard } from './components/CleanerOperationsDashboard';
import { CustomerPortal } from './components/CustomerPortal';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { INITIAL_BOOKINGS, FAQ_ITEMS } from './data/mockData';
import { Booking, ServiceType, CleaningFrequency } from './types';
import { ShieldCheck, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'calculator' | 'cleaner_ops' | 'portal'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<{
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
  } | undefined>(undefined);

  // Persistent bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('pureclean_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('pureclean_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Unable to persist bookings to localStorage', e);
    }
  }, [bookings]);

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status } : b)
    );
  };

  const handleToggleTask = (bookingId: string, taskId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          checklist: b.checklist.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          )
        };
      })
    );
  };

  const handleAddNote = (bookingId: string, note: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        const currentNotes = b.specialInstructions ? `${b.specialInstructions}\n[Cleaner Note]: ${note}` : `[Cleaner Note]: ${note}`;
        return { ...b, specialInstructions: currentNotes };
      })
    );
  };

  const handleAddTip = (bookingId: string, tipAmount: number) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, tipAmount: (b.tipAmount || 0) + tipAmount } : b)
    );
  };

  const handleSubmitReview = (bookingId: string, rating: number, review: string) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, rating, review } : b)
    );
  };

  const handleStartCustomBooking = (preset?: {
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
  }) => {
    setBookingPreset(preset);
    setIsBookingModalOpen(true);
  };

  const handleSelectTierFromShowcase = (tierId: ServiceType) => {
    handleStartCustomBooking({
      serviceType: tierId,
      bedrooms: 2,
      bathrooms: 2,
      frequency: 'bi_weekly'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenBooking={() => handleStartCustomBooking()}
        activeBookingCount={bookings.filter(b => b.status === 'in_progress' || b.status === 'scheduled').length}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <HeroSection
              onStartCustomBooking={handleStartCustomBooking}
              onExploreCalculator={() => setCurrentTab('calculator')}
            />

            <ServiceShowcase
              onSelectTier={handleSelectTierFromShowcase}
            />

            <CleanersRoster
              onSelectSpecialist={(cleanerId) => {
                handleStartCustomBooking();
              }}
            />

            <PricingCalculatorSection
              onBookWithConfig={(config) => {
                handleStartCustomBooking(config);
              }}
            />

            {/* Guarantee & FAQ Section */}
            <section className="py-16 sm:py-24 bg-stone-100/60 border-b border-stone-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
                    <span>Peace of Mind</span>
                    <span aria-hidden="true">·</span>
                    <span>Transparent Answers</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-stone-900">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm text-stone-600 mt-2">
                    Everything you need to know about our standards, supplies, and free re-clean guarantee.
                  </p>
                </div>

                <div className="space-y-3">
                  {FAQ_ITEMS.map((item, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <span className="text-sm font-bold text-stone-900">
                            {item.q}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>
          </div>
        )}

        {currentTab === 'calculator' && (
          <div className="py-4">
            <PricingCalculatorSection
              onBookWithConfig={(config) => {
                handleStartCustomBooking(config);
              }}
            />
          </div>
        )}

        {currentTab === 'cleaner_ops' && (
          <CleanerOperationsDashboard
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onToggleTask={handleToggleTask}
            onAddNote={handleAddNote}
          />
        )}

        {currentTab === 'portal' && (
          <CustomerPortal
            bookings={bookings}
            onAddTip={handleAddTip}
            onSubmitReview={handleSubmitReview}
            onOpenBooking={() => handleStartCustomBooking()}
          />
        )}
      </main>

      {/* Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
        initialPreset={bookingPreset}
      />

      {/* Footer */}
      <Footer
        onSelectTab={setCurrentTab}
        onOpenBooking={() => handleStartCustomBooking()}
      />

    </div>
  );
}
