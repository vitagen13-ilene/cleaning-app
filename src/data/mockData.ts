import { ServiceTier, ServiceAddon, CleanerSpecialist, Booking, ChecklistTask } from '../types';

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'standard',
    name: 'Routine Maintenance Clean',
    tagline: 'Ideal for weekly, bi-weekly, or recurring upkeep of tidy homes.',
    basePrice: 119,
    pricePerBed: 25,
    pricePerBath: 30,
    pricePerSqFt: 0.04,
    estimatedBaseHours: 2.5,
    popular: true,
    includedTasks: [
      'Dust all open reachable surfaces & furniture',
      'Sanitize kitchen countertops, sink & exterior appliances',
      'Scrub & disinfect toilet, shower, bathtub & vanity',
      'Vacuum all carpets, rugs & stairs with HEPA filtration',
      'Mop hard floors with eco-safe pH-neutral cleaner',
      'Empty all interior trash bins & reline liners',
      'Make beds and straighten linens (sheets changed if left out)',
      'Wipe down light switch plates & door handles',
    ]
  },
  {
    id: 'deep',
    name: 'Deep Restoration Scrub',
    tagline: 'Thorough, top-to-bottom detail scrub targeting built-up grime and scale.',
    basePrice: 189,
    pricePerBed: 35,
    pricePerBath: 45,
    pricePerSqFt: 0.065,
    estimatedBaseHours: 4.5,
    popular: false,
    includedTasks: [
      'Everything in Routine Maintenance Clean',
      'Hand-wash baseboards, window sills, door frames & moldings',
      'Deep scrub tile grout, lime scale & glass shower enclosure',
      'Detail degrease stovetop range burners and extractor hood',
      'Dust ceiling fans, high crown moldings & light fixtures',
      'Disinfect cabinet exteriors, under-cabinet lighting & toe kicks',
      'Intensive HEPA vacuuming under reachable sofa & bed bases',
      'Polish chrome, brass, and stainless steel hardware',
    ]
  },
  {
    id: 'move_in_out',
    name: 'Move-In / Move-Out Turnover',
    tagline: 'Deposit-back guarantee clean for vacant homes, tenants, and landlords.',
    basePrice: 229,
    pricePerBed: 40,
    pricePerBath: 50,
    pricePerSqFt: 0.075,
    estimatedBaseHours: 5.5,
    popular: false,
    includedTasks: [
      'Deep cleaning of all empty interior cabinets, drawers & shelves',
      'Full interior and exterior cleaning of refrigerator & freezer',
      'Interior oven degreasing and baked-on carbon removal',
      'Scrubbing inside dishwasher and laundry drum seals',
      'Full wall spot-washing and scuff mark mitigation',
      'All interior window panes, tracks and sill vacuuming',
      'Closet shelves, baseboard corners and floor registers vacuumed',
      'Final landlord-inspection certified sign-off checklist',
    ]
  },
  {
    id: 'post_renovation',
    name: 'Post-Construction Dust Extraction',
    tagline: 'Specialized airborne particulate and drywall residue eradication.',
    basePrice: 269,
    pricePerBed: 45,
    pricePerBath: 55,
    pricePerSqFt: 0.09,
    estimatedBaseHours: 6.0,
    popular: false,
    includedTasks: [
      'High-filtration multi-stage HEPA air scrub and surface vacuuming',
      'Drywall dust wiped down from walls, ledges, headers and trims',
      'Sticker, glue, and protective film residue removal from fixtures',
      'Paint splatter mitigation on tile, hardwood, and glass',
      'HVAC intake vent cleaning and filter perimeter wipe-down',
      'Double-wash mopping of all hard surface flooring',
      'Light fixtures, recessed cans, and chandelier dusting',
      'Interior cabinetry vacuuming and damp wipe down',
    ]
  },
  {
    id: 'office',
    name: 'Commercial & Creative Workspace',
    tagline: 'Tailored for tech studios, law firms, clinics, and creative agencies.',
    basePrice: 169,
    pricePerBed: 20, // per conference room
    pricePerBath: 35,
    pricePerSqFt: 0.05,
    estimatedBaseHours: 3.5,
    popular: false,
    includedTasks: [
      'Sanitize all workstation desks, monitor perimeters & keyboards',
      'Disinfect conference room tables, chairs & AV console glass',
      'Clean office kitchenette, espresso machines & staff fridge',
      'Restroom deep sanitization, hand towel restock & polish',
      'Commercial grade carpet vacuuming and hard floor buff/mop',
      'Empty confidential recycling and workstation waste baskets',
      'Clean glass partition fingerprints and reception entry door',
      'Keycard door contact points and elevator button sanitization',
    ]
  }
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'oven',
    name: 'Inside Oven Deep Scrub',
    description: 'Eco-safe fume-free degreasing of baked enamel walls, racks and glass door.',
    price: 49,
    durationMinutes: 45,
    iconName: 'Flame'
  },
  {
    id: 'fridge',
    name: 'Inside Refrigerator & Freezer',
    description: 'All shelves removed, sanitized, food expiration check & spill cleanup.',
    price: 45,
    durationMinutes: 40,
    iconName: 'Refrigerator'
  },
  {
    id: 'windows',
    name: 'Interior Window Panes & Tracks',
    description: 'Streak-free squeegee wipe of up to 10 interior windows, tracks and sills.',
    price: 55,
    durationMinutes: 50,
    iconName: 'Maximize'
  },
  {
    id: 'cabinets',
    name: 'Inside Kitchen Cabinets',
    description: 'Wipe down empty or occupied interior pantry shelving and organizers.',
    price: 59,
    durationMinutes: 60,
    iconName: 'Archive'
  },
  {
    id: 'laundry',
    name: 'Wash, Dry & Fold Laundry (2 Loads)',
    description: 'Washed with hypoallergenic detergent, folded or hung per your preference.',
    price: 39,
    durationMinutes: 45,
    iconName: 'Shirt'
  },
  {
    id: 'balcony',
    name: 'Balcony or Patio Sweep & Wash',
    description: 'Outdoor furniture wiped down, tile/concrete floor swept and mopped.',
    price: 35,
    durationMinutes: 30,
    iconName: 'Sun'
  },
  {
    id: 'eco_botanicals',
    name: '100% Organic Botanical Essential Oils',
    description: 'Infusion of cedarwood, tea tree, and eucalyptus child & pet-safe essences.',
    price: 25,
    durationMinutes: 15,
    iconName: 'Sparkles'
  },
  {
    id: 'pet_hair',
    name: 'Intensive Pet Hair Extraction',
    description: 'High-torque motorized upholstery brush over sofas, rugs, and pet beds.',
    price: 39,
    durationMinutes: 35,
    iconName: 'Dog'
  }
];

export const CLEANER_SPECIALISTS: CleanerSpecialist[] = [
  {
    id: 'cleaner-1',
    name: 'Elena Vance',
    avatarUrl: '/src/assets/images/cleaner_pro_specialist_1794458451003.jpg',
    title: 'Lead Cleaning Specialist & Sanitation Auditor',
    rating: 4.98,
    completedJobs: 412,
    experienceYears: 6,
    specialties: ['Deep Restoration', 'Eco-Botanical', 'Luxury Stone Care'],
    bio: 'Passionate about pristine Scandinavian order and non-toxic sanitation. Trained in delicate marble, natural brass, and high-end textiles.',
    available: true
  },
  {
    id: 'cleaner-2',
    name: 'Marcus Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Senior Move-Out & Turnover Expert',
    rating: 4.95,
    completedJobs: 338,
    experienceYears: 5,
    specialties: ['Move In/Out Turnover', 'Kitchen Detailing', 'Post-Reno Dust'],
    bio: 'Renowned for meticulous attention to appliance interiors, tile grout recovery, and landlord-grade inspection standards.',
    available: true
  },
  {
    id: 'cleaner-3',
    name: 'Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    title: 'Residential Care Specialist',
    rating: 4.97,
    completedJobs: 285,
    experienceYears: 4,
    specialties: ['Routine Maintenance', 'Pet-Friendly Homes', 'Organizing'],
    bio: 'Specializes in busy family homes with children and pets. Known for swift, gentle, and quiet execution with zero disruption.',
    available: true
  },
  {
    id: 'cleaner-4',
    name: 'David Miller',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    title: 'Commercial & Detail Technician',
    rating: 4.92,
    completedJobs: 194,
    experienceYears: 3,
    specialties: ['Creative Workspaces', 'Window Panes', 'Floor Buffing'],
    bio: 'Expert in modern open-plan studios, architectural glazing, and sensitive electronics cleaning protocols.',
    available: true
  }
];

export const INITIAL_CHECKLIST: ChecklistTask[] = [
  // Kitchen
  { id: 'k1', task: 'Degrease cooktop range and backsplash tile', category: 'kitchen', completed: true },
  { id: 'k2', task: 'Disinfect quartz/granite counters & prep islands', category: 'kitchen', completed: true },
  { id: 'k3', task: 'Wipe stainless refrigerator, oven & dishwasher exterior', category: 'kitchen', completed: true },
  { id: 'k4', task: 'Scrub and polish stainless sink and gooseneck faucet', category: 'kitchen', completed: false },
  { id: 'k5', task: 'Wipe microwave interior turntable and door seal', category: 'kitchen', completed: false },
  { id: 'k6', task: 'Vacuum and steam mop kitchen hard floors', category: 'kitchen', completed: false },

  // Bathrooms
  { id: 'b1', task: 'Descale glass shower enclosure & scrub wall tiles', category: 'bathrooms', completed: true },
  { id: 'b2', task: 'Disinfect toilet bowl, tank, hinges & surrounding floor', category: 'bathrooms', completed: true },
  { id: 'b3', task: 'Polish vanity mirror, basin, and chrome faucets', category: 'bathrooms', completed: false },
  { id: 'b4', task: 'Hand-wipe bathroom baseboards and towel warmer', category: 'bathrooms', completed: false },
  { id: 'b5', task: 'Mop terrazzo/ceramic tile floors with botanical rinse', category: 'bathrooms', completed: false },

  // Bedrooms & Living
  { id: 'l1', task: 'Dust all furniture surfaces, shelving, and frames', category: 'living_areas', completed: true },
  { id: 'l2', task: 'HEPA vacuum living room rug, sofa cushions & edges', category: 'living_areas', completed: true },
  { id: 'l3', task: 'Polish glass coffee table and side stands', category: 'living_areas', completed: false },
  { id: 'l4', task: 'Mop Scandinavian oak hardwood floors', category: 'living_areas', completed: false },
  { id: 'l5', task: 'Empty bins, replace liners and spray deodorizer', category: 'living_areas', completed: false },

  // Add-ons
  { id: 'a1', task: 'Inside oven deep carbon cleaning', category: 'add_ons', completed: false },
  { id: 'a2', task: 'Interior window tracks vacuum & glass squeegee', category: 'add_ons', completed: false },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    bookingCode: 'PC-84920',
    customerName: 'Claire Tremblay',
    customerEmail: 'claire.t@gmail.com',
    customerPhone: '(415) 890-4421',
    address: '742 Evergreen Terrace, Apt 4B',
    unit: 'Apt 4B',
    serviceType: 'deep',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1250,
    frequency: 'bi_weekly',
    addons: ['oven', 'windows', 'eco_botanicals'],
    scheduledDate: new Date().toISOString().split('T')[0], // Today!
    timeSlot: 'morning',
    specialInstructions: 'Please take extra care around the natural marble coffee table. Code for building callbox is #4412.',
    accessMethod: 'doorman',
    hasPets: true,
    petDetails: 'One gentle Golden Retriever named Ollie (will be in guest room during clean).',
    cleanerId: 'cleaner-1',
    status: 'in_progress',
    subtotal: 384,
    discount: 57.6, // 15% bi-weekly
    tax: 26.11,
    totalPrice: 352.51,
    estimatedHours: 4.5,
    checklist: INITIAL_CHECKLIST,
    createdAt: '2026-11-10T14:22:00Z',
    beforeAfterPhotos: [
      {
        room: 'Living Room & Windows',
        beforeUrl: '/src/assets/images/cleaning_hero_livingroom_1794458449549.jpg',
        afterUrl: '/src/assets/images/cleaning_hero_livingroom_1794458449549.jpg'
      },
      {
        room: 'Kitchen Island',
        beforeUrl: '/src/assets/images/cleaning_kitchen_pristine_1794458450958.jpg',
        afterUrl: '/src/assets/images/cleaning_kitchen_pristine_1794458450958.jpg'
      }
    ]
  },
  {
    id: 'book-102',
    bookingCode: 'PC-84921',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@agency.co',
    customerPhone: '(415) 321-9980',
    address: '108 Montgomery St, Suite 500',
    unit: 'Floor 5',
    serviceType: 'office',
    bedrooms: 3, // conference rooms
    bathrooms: 2,
    squareFeet: 2200,
    frequency: 'weekly',
    addons: ['fridge', 'windows'],
    scheduledDate: '2026-11-13',
    timeSlot: 'afternoon',
    specialInstructions: 'Sanitize podcast studio glass and clean espresso portafilters in kitchenette.',
    accessMethod: 'lockbox',
    hasPets: false,
    cleanerId: 'cleaner-2',
    status: 'scheduled',
    subtotal: 419,
    discount: 83.8, // 20% weekly
    tax: 26.81,
    totalPrice: 362.01,
    estimatedHours: 4.0,
    checklist: INITIAL_CHECKLIST.map(t => ({ ...t, completed: false })),
    createdAt: '2026-11-09T18:10:00Z',
  },
  {
    id: 'book-103',
    bookingCode: 'PC-83915',
    customerName: 'Victoria & James Wong',
    customerEmail: 'v.wong@family.org',
    customerPhone: '(415) 774-1209',
    address: '382 Marina Blvd',
    serviceType: 'standard',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1850,
    frequency: 'bi_weekly',
    addons: ['eco_botanicals'],
    scheduledDate: '2026-11-06',
    timeSlot: 'morning',
    accessMethod: 'home',
    hasPets: true,
    petDetails: 'One Siamese cat, very shy.',
    cleanerId: 'cleaner-1',
    status: 'completed',
    subtotal: 284,
    discount: 42.6,
    tax: 19.31,
    totalPrice: 260.71,
    estimatedHours: 3.5,
    checklist: INITIAL_CHECKLIST.map(t => ({ ...t, completed: true })),
    createdAt: '2026-11-02T10:00:00Z',
    rating: 5,
    review: 'Elena was phenomenal. The house smelled like crisp eucalyptus and every corner of the master bathroom looked like a five-star hotel. We set up bi-weekly recurring immediately!',
    tipAmount: 30
  }
];

export const FAQ_ITEMS = [
  {
    q: 'What supplies and equipment do PureClean specialists bring?',
    a: 'Every specialist arrives fully equipped with commercial-grade HEPA filtration vacuums, clean color-coded microfibre cloths, telescopic extension dusters, squeegees, and EPA-certified, non-toxic cleaning formulations safe for pets, children, and luxury materials.'
  },
  {
    q: 'How does your 100% Satisfaction Guarantee work?',
    a: 'If any room or item in your customized checklist does not meet your high standards, notify us within 24 hours via your Client Portal. We will dispatch a specialist within 24 hours to re-clean the flagged areas completely free of charge.'
  },
  {
    q: 'Can I request the exact same cleaner for recurring visits?',
    a: 'Yes! When booking weekly, bi-weekly, or monthly cleans, your designated specialist (such as Elena or Marcus) is locked in as your primary dedicated provider to ensure consistent familiarity with your home.'
  },
  {
    q: 'What is your cancellation or rescheduling policy?',
    a: 'You can reschedule or cancel any scheduled visit with zero fee up to 24 hours before your booking window directly through your Client Portal with a single click.'
  }
];
