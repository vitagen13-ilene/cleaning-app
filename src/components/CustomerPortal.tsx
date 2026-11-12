import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Star,
  Download,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Heart
} from 'lucide-react';
import { Booking } from '../types';
import { CLEANER_SPECIALISTS } from '../data/mockData';

interface CustomerPortalProps {
  bookings: Booking[];
  onAddTip: (bookingId: string, tipAmount: number) => void;
  onSubmitReview: (bookingId: string, rating: number, review: string) => void;
  onOpenBooking: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  bookings,
  onAddTip,
  onSubmitReview,
  onOpenBooking,
}) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string>(bookings[0]?.id || '');
  const selectedBooking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  const [tipInput, setTipInput] = useState<number>(20);
  const [customTip, setCustomTip] = useState('');
  const [tipSuccess, setTipSuccess] = useState(false);

  const [ratingInput, setRatingInput] = useState(5);
  const [reviewInput, setReviewInput] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!selectedBooking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h3 className="text-xl font-bold text-stone-900">No Reservations Yet</h3>
        <p className="text-sm text-stone-600 mt-2">
          Schedule your first pristine home or studio clean in under 2 minutes.
        </p>
        <button
          onClick={onOpenBooking}
          className="mt-6 px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800"
        >
          Book a Cleaning
        </button>
      </div>
    );
  }

  const cleaner = CLEANER_SPECIALISTS.find(c => c.id === selectedBooking.cleanerId) || CLEANER_SPECIALISTS[0];
  const totalTasks = selectedBooking.checklist.length;
  const completedTasks = selectedBooking.checklist.filter(t => t.completed).length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customTip ? parseFloat(customTip) : tipInput;
    if (amount > 0) {
      onAddTip(selectedBooking.id, amount);
      setTipSuccess(true);
      setTimeout(() => setTipSuccess(false), 3500);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewInput.trim() || ratingInput) {
      onSubmitReview(selectedBooking.id, ratingInput, reviewInput);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
            <span>Client Dashboard</span>
            <span aria-hidden="true">·</span>
            <span>Live Quality Transparency</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            My Cleans & Service Records
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Track active visits in real-time, view itemized inspection receipts, and tip your dedicated specialist.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Schedule Another Clean
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Booking Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-1">
            Booking History & Upcoming ({bookings.length})
          </span>

          {bookings.map(b => {
            const isSelected = b.id === selectedBooking.id;
            const bCleaner = CLEANER_SPECIALISTS.find(c => c.id === b.cleanerId);
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBookingId(b.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-stone-50 border-stone-900 ring-2 ring-stone-900'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-stone-900">
                    {b.bookingCode}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    b.status === 'in_progress'
                      ? 'bg-amber-100 text-amber-800'
                      : b.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {b.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-2 text-xs font-semibold text-stone-800 truncate">
                  {b.address}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>{b.scheduledDate}</span>
                  <span className="font-bold text-stone-900">${b.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Booking Detail & Operations Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Inspection Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <span className="text-xs font-mono text-stone-500">
                  Confirmation #{selectedBooking.bookingCode}
                </span>
                <h2 className="text-xl font-bold text-stone-900 mt-0.5 capitalize">
                  {selectedBooking.serviceType.replace('_', ' ')} Clean
                </h2>
                <p className="text-xs text-stone-600 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {selectedBooking.address} {selectedBooking.unit ? `(${selectedBooking.unit})` : ''}
                </p>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${
                  selectedBooking.status === 'in_progress'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : selectedBooking.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-stone-100 text-stone-700'
                }`}>
                  {selectedBooking.status === 'in_progress' ? '● In Progress On-Site' : selectedBooking.status}
                </span>
                <span className="block text-[11px] font-mono text-stone-500 mt-1">
                  Scheduled for {selectedBooking.scheduledDate}
                </span>
              </div>
            </div>

            {/* Cleaner Specialist Lockup */}
            <div className="py-5 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={cleaner.avatarUrl}
                  alt={cleaner.name}
                  className="w-12 h-12 rounded-full object-cover border border-stone-200 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-semibold text-emerald-800">Your Dedicated Specialist</div>
                  <div className="text-sm font-bold text-stone-900">{cleaner.name}</div>
                  <div className="text-xs text-stone-500">{cleaner.title} · {cleaner.rating}★ ({cleaner.completedJobs} cleans)</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-stone-500">Cadence</div>
                <div className="text-xs font-bold text-stone-900 capitalize">
                  {selectedBooking.frequency.replace('_', '-')}
                </div>
              </div>
            </div>

            {/* Live Progress Bar if in-progress */}
            <div className="py-5 border-b border-stone-200">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-stone-900">
                  50-Point Quality Checklist Audit:
                </span>
                <span className="font-mono text-emerald-800 font-bold">
                  {completedTasks} of {totalTasks} Tasks Verified ({completionPercent}%)
                </span>
              </div>

              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                <div
                  className="h-full bg-emerald-700 transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>

              {/* Checklist items pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs">
                {selectedBooking.checklist.slice(0, 6).map(task => (
                  <div key={task.id} className="flex items-center gap-2 text-stone-700">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${task.completed ? 'text-emerald-700' : 'text-stone-300'}`} />
                    <span className={`truncate ${task.completed ? 'line-through text-stone-400' : ''}`}>
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown / Receipt */}
            <div className="py-5 border-b border-stone-200 text-xs space-y-2">
              <span className="font-bold text-stone-900 block mb-2">Itemized Financial Receipt:</span>
              <div className="flex justify-between text-stone-600">
                <span>Base Service ({selectedBooking.bedrooms} Bed, {selectedBooking.bathrooms} Bath, ~{selectedBooking.squareFeet} sq ft)</span>
                <span className="font-mono">${selectedBooking.subtotal.toFixed(2)}</span>
              </div>

              {selectedBooking.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Recurring Cadence Savings</span>
                  <span className="font-mono">-${selectedBooking.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Sales Tax (8.25%)</span>
                <span className="font-mono">${selectedBooking.tax.toFixed(2)}</span>
              </div>

              {selectedBooking.tipAmount && (
                <div className="flex justify-between text-stone-800 font-medium">
                  <span>Specialist Tip</span>
                  <span className="font-mono">+${selectedBooking.tipAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                <span>Total Paid</span>
                <span className="font-mono">
                  ${(selectedBooking.totalPrice + (selectedBooking.tipAmount || 0)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Tip Specialist Form */}
            <div className="py-5 border-b border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Tip Specialist ({cleaner.name})
                </span>
                {selectedBooking.tipAmount && (
                  <span className="text-xs text-emerald-700 font-semibold font-mono">
                    Tipped ${selectedBooking.tipAmount}
                  </span>
                )}
              </div>

              {tipSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium border border-emerald-200">
                  Thank you! 100% of your tip has been directly transferred to {cleaner.name}.
                </div>
              ) : (
                <form onSubmit={handleTipSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {[15, 20, 30, 40].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setTipInput(amt); setCustomTip(''); }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          tipInput === amt && !customTip
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                    <input
                      type="number"
                      placeholder="Custom $"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      className="w-24 text-xs bg-stone-50 border border-stone-200 rounded-lg p-1.5 text-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Send Tip
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Leave a Review */}
            <div className="pt-5">
              <span className="text-xs font-bold text-stone-900 block mb-2">
                Quality Feedback & Review:
              </span>

              {selectedBooking.review ? (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(selectedBooking.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-stone-700 italic">"{selectedBooking.review}"</p>
                </div>
              ) : reviewSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium border border-emerald-200">
                  Thank you for your feedback! Your review helps maintain our 5-star standard.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= ratingInput ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Tell us about the detail in your bathrooms, kitchen, or floors..."
                    value={reviewInput}
                    onChange={(e) => setReviewInput(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Submit Inspection Review
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
