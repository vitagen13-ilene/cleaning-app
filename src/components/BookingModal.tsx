import React, { useState } from 'react';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  ShieldCheck,
  Home,
  Sparkles,
  Info,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { SERVICE_TIERS, SERVICE_ADDONS, CLEANER_SPECIALISTS } from '../data/mockData';
import { Booking, ServiceType, CleaningFrequency, ChecklistTask } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (newBooking: Booking) => void;
  initialPreset?: {
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed,
  initialPreset
}) => {
  const [step, setStep] = useState(1);

  // Form states
  const [propertyType, setPropertyType] = useState('apartment');
  const [bedrooms, setBedrooms] = useState(initialPreset?.bedrooms ?? 2);
  const [bathrooms, setBathrooms] = useState(initialPreset?.bathrooms ?? 2);
  const [squareFeet, setSquareFeet] = useState(1200);

  const [serviceType, setServiceType] = useState<ServiceType>(initialPreset?.serviceType ?? 'standard');
  const [frequency, setFrequency] = useState<CleaningFrequency>(initialPreset?.frequency ?? 'bi_weekly');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['eco_botanicals']);

  // Date and Time
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [scheduledDate, setScheduledDate] = useState(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState<'morning' | 'midday' | 'afternoon'>('morning');
  const [cleanerId, setCleanerId] = useState('cleaner-1');

  // Customer Contact & Access
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [unit, setUnit] = useState('');
  const [accessMethod, setAccessMethod] = useState<'home' | 'doorman' | 'lockbox' | 'hidden_key'>('doorman');
  const [accessCode, setAccessCode] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [petDetails, setPetDetails] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Confirmation screen state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  // Calculation logic
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
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const tax = subtotalAfterDiscount * 0.0825; // 8.25% standard sales tax
  const totalPrice = Number((subtotalAfterDiscount + tax).toFixed(2));
  const estimatedHours = Number((selectedTier.estimatedBaseHours + (bedrooms * 0.35) + (bathrooms * 0.4) + (selectedAddons.length * 0.45)).toFixed(1));

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !address) {
      alert('Please fill in your name and service address.');
      return;
    }

    // Build initial checklist for this booking
    const defaultChecklist: ChecklistTask[] = selectedTier.includedTasks.map((taskName, idx) => ({
      id: `task-${idx}-${Date.now()}`,
      task: taskName,
      category: idx < 3 ? 'kitchen' : idx < 5 ? 'bathrooms' : 'living_areas',
      completed: false
    }));

    selectedAddons.forEach(addonId => {
      const addon = SERVICE_ADDONS.find(a => a.id === addonId);
      if (addon) {
        defaultChecklist.push({
          id: `addon-${addon.id}-${Date.now()}`,
          task: `Add-on: ${addon.name}`,
          category: 'add_ons',
          completed: false
        });
      }
    });

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingCode: `PC-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName,
      customerEmail: customerEmail || 'client@pureclean.com',
      customerPhone: customerPhone || '(415) 555-0199',
      address,
      unit: unit || undefined,
      serviceType,
      bedrooms,
      bathrooms,
      squareFeet,
      frequency,
      addons: selectedAddons,
      scheduledDate,
      timeSlot,
      specialInstructions: specialInstructions ? `${specialInstructions} ${accessCode ? `[Access Code: ${accessCode}]` : ''}` : accessCode ? `Access Code: ${accessCode}` : undefined,
      accessMethod,
      hasPets,
      petDetails: hasPets ? petDetails : undefined,
      cleanerId,
      status: 'scheduled',
      subtotal: Math.round(rawSubtotal),
      discount: Math.round(discountAmount),
      tax: Number(tax.toFixed(2)),
      totalPrice,
      estimatedHours,
      checklist: defaultChecklist,
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {confirmedBooking ? 'Cleaning Reservation Confirmed' : 'Book PureClean Service'}
            </h2>
            {!confirmedBooking && (
              <p className="text-xs text-stone-500">
                Step {step} of 4 · Flat-rate guaranteed pricing
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {confirmedBooking ? (
            /* Confirmation View */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
                  Reservation Dispatched
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900 mt-1">
                  You're all set, {confirmedBooking.customerName}!
                </h3>
                <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
                  Booking code <span className="font-mono font-bold text-stone-900">{confirmedBooking.bookingCode}</span>. A certified specialist has been scheduled.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto bg-stone-50 rounded-xl p-5 border border-stone-200 text-left text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-stone-200 font-semibold text-stone-800">
                  <span>Service Tier</span>
                  <span className="capitalize">{selectedTier.name}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Scheduled Date & Window</span>
                  <span className="font-medium text-stone-800">
                    {confirmedBooking.scheduledDate} ({confirmedBooking.timeSlot === 'morning' ? '8:00 AM - 11:00 AM' : confirmedBooking.timeSlot === 'midday' ? '11:00 AM - 2:00 PM' : '2:00 PM - 5:00 PM'})
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Assigned Specialist</span>
                  <span className="font-medium text-stone-800">
                    {CLEANER_SPECIALISTS.find(c => c.id === confirmedBooking.cleanerId)?.name || 'Mei Ling Tan'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Property Address</span>
                  <span className="font-medium text-stone-800 text-right truncate max-w-[200px]">
                    {confirmedBooking.address} {confirmedBooking.unit ? `(${confirmedBooking.unit})` : ''}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-stone-900 font-bold text-sm">
                  <span>Total Due (Post-Clean)</span>
                  <span className="font-mono">${confirmedBooking.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Wizard */
            <div>
              
              {/* STEP 1: Property & Layout */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      1. Property Specifications
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Tell us about the space to calculate the required time and equipment.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'apartment', label: 'Apartment / Condo' },
                      { id: 'house', label: 'Single Family Home' },
                      { id: 'townhouse', label: 'Townhouse' },
                      { id: 'office', label: 'Commercial Studio' }
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPropertyType(p.id)}
                        className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                          propertyType === p.id
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Bedrooms
                      </label>
                      <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                          className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-sm font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-stone-900 font-mono text-sm">
                          {bedrooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBedrooms(bedrooms + 1)}
                          className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-sm font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Bathrooms
                      </label>
                      <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                          className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-sm font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-stone-900 font-mono text-sm">
                          {bathrooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBathrooms(bathrooms + 1)}
                          className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-sm font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Approx. Square Footage: <span className="font-mono text-emerald-800">{squareFeet} sq ft</span>
                      </label>
                      <input
                        type="range"
                        min="500"
                        max="4500"
                        step="50"
                        value={squareFeet}
                        onChange={(e) => setSquareFeet(Number(e.target.value))}
                        className="w-full accent-stone-900 mt-2"
                      />
                    </div>
                  </div>

                  {/* Frequency Selector */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-2">
                      Cleaning Cadence (Recurring Disount Applied)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'weekly', title: 'Weekly', discount: 'Save 20%' },
                        { id: 'bi_weekly', title: 'Bi-Weekly', discount: 'Save 15%' },
                        { id: 'monthly', title: 'Monthly', discount: 'Save 10%' },
                        { id: 'one_time', title: 'One-Time', discount: 'Standard' }
                      ].map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFrequency(f.id as CleaningFrequency)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            frequency === f.id
                              ? 'bg-emerald-950 text-white border-emerald-900 shadow-sm'
                              : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                          }`}
                        >
                          <div className="text-xs font-bold">{f.title}</div>
                          <div className={`text-[11px] mt-0.5 ${frequency === f.id ? 'text-emerald-300' : 'text-emerald-700 font-medium'}`}>
                            {f.discount}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Service Tier */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      2. Choose Your Service Level
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Select the thoroughness and scope required for your space.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {SERVICE_TIERS.map(tier => {
                      const isSelected = serviceType === tier.id;
                      return (
                        <div
                          key={tier.id}
                          onClick={() => setServiceType(tier.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-stone-50 border-stone-900 ring-2 ring-stone-900'
                              : 'bg-white border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-stone-900">
                                  {tier.name}
                                </span>
                                {tier.popular && (
                                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                    Most Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-600 mt-1">
                                {tier.tagline}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-mono font-bold text-sm text-stone-900">
                                ${tier.basePrice + (bedrooms * tier.pricePerBed) + (bathrooms * tier.pricePerBath)}
                              </span>
                              <span className="block text-[10px] text-stone-500">base rate</span>
                            </div>
                          </div>

                          {/* Included checklist preview */}
                          <div className="mt-3 pt-3 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-stone-600">
                            {tier.includedTasks.slice(0, 4).map((task, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-emerald-700 shrink-0" />
                                <span className="truncate">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Add-on Services */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      3. Select Detail Add-Ons (Optional)
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Tailor your clean with targeted deep cleaning treatments.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_ADDONS.map(addon => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-emerald-50/60 border-emerald-700 ring-1 ring-emerald-700'
                              : 'bg-white border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900">
                                {addon.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                              {addon.description}
                            </p>
                            <span className="inline-block mt-2 text-[10px] text-stone-400 font-mono">
                              +{addon.durationMinutes} min
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono font-bold text-xs text-stone-900">
                              +${addon.price}
                            </span>
                            <div className={`w-5 h-5 mt-2 ml-auto rounded flex items-center justify-center border ${
                              isSelected ? 'bg-emerald-800 border-emerald-800 text-white' : 'border-stone-300'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Schedule, Address & Specialist */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      4. Scheduling, Location & Contact
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Where and when should our bonded specialist arrive?
                    </p>
                  </div>

                  {/* Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Service Date
                      </label>
                      <input
                        type="date"
                        min={tomorrowStr}
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Arrival Window
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'morning', label: 'Morning', time: '8am-11am' },
                          { id: 'midday', label: 'Midday', time: '11am-2pm' },
                          { id: 'afternoon', label: 'Afternoon', time: '2pm-5pm' },
                        ].map(slot => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setTimeSlot(slot.id as any)}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                              timeSlot === slot.id
                                ? 'bg-stone-900 text-white border-stone-900'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            <span className="block text-[11px] font-bold">{slot.label}</span>
                            <span className="block text-[9px] opacity-80">{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Specialist Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Assigned Cleaning Specialist
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CLEANER_SPECIALISTS.slice(0, 2).map(cleaner => (
                        <div
                          key={cleaner.id}
                          onClick={() => setCleanerId(cleaner.id)}
                          className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                            cleanerId === cleaner.id
                              ? 'bg-emerald-50/60 border-emerald-800 ring-1 ring-emerald-800'
                              : 'bg-white border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <img
                            src={cleaner.avatarUrl}
                            alt={cleaner.name}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900 truncate">{cleaner.name}</span>
                              <span className="text-[11px] font-mono text-emerald-800 font-bold">{cleaner.rating}★</span>
                            </div>
                            <span className="text-[10px] text-stone-500 block truncate">{cleaner.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Address Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rachel Lim"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+65 9123 4567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Blk 284 Bishan St 22, #11-142"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Access Method
                      </label>
                      <select
                        value={accessMethod}
                        onChange={(e) => setAccessMethod(e.target.value as any)}
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      >
                        <option value="doorman">Front Desk / Doorman</option>
                        <option value="home">I will be home</option>
                        <option value="lockbox">Lockbox Key</option>
                        <option value="hidden_key">Hidden Key</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Access Code / Instructions
                      </label>
                      <input
                        type="text"
                        placeholder="Callbox code #1234 or key location"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  {/* Pets */}
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPets}
                        onChange={(e) => setHasPets(e.target.checked)}
                        className="rounded text-emerald-800 focus:ring-emerald-700"
                      />
                      <span>Pets in the household? (We use pet-safe organic solutions)</span>
                    </label>
                  </div>

                  {hasPets && (
                    <input
                      type="text"
                      placeholder="e.g. 1 friendly cat; will stay in bedroom"
                      value={petDetails}
                      onChange={(e) => setPetDetails(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900"
                    />
                  )}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer Bar with Price & Controls */}
        {!confirmedBooking && (
          <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-stone-900 font-mono">
                  ${totalPrice.toFixed(2)}
                </span>
                {discountAmount > 0 && (
                  <span className="text-xs text-emerald-700 font-medium font-mono">
                    Save ${discountAmount.toFixed(0)} ({frequency})
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-500 block">
                Estimated duration: ~{estimatedHours} hours
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Continue
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteBooking}
                  className="px-6 py-2.2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Confirm & Schedule Clean
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
