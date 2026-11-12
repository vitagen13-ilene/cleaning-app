export type ServiceType = 
  | 'standard'
  | 'deep'
  | 'move_in_out'
  | 'post_renovation'
  | 'office';

export type CleaningFrequency = 
  | 'one_time'
  | 'weekly'
  | 'bi_weekly'
  | 'monthly';

export interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  iconName: string;
}

export interface CleanerSpecialist {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  rating: number;
  completedJobs: number;
  experienceYears: number;
  specialties: string[];
  bio: string;
  available: boolean;
}

export interface ChecklistTask {
  id: string;
  task: string;
  category: 'kitchen' | 'bathrooms' | 'bedrooms' | 'living_areas' | 'add_ons';
  completed: boolean;
  notes?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  unit?: string;
  serviceType: ServiceType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  frequency: CleaningFrequency;
  addons: string[]; // addon IDs
  scheduledDate: string;
  timeSlot: 'morning' | 'midday' | 'afternoon';
  specialInstructions?: string;
  accessMethod: 'home' | 'doorman' | 'lockbox' | 'hidden_key';
  hasPets: boolean;
  petDetails?: string;
  cleanerId: string;
  status: 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';
  subtotal: number;
  discount: number;
  tax: number;
  totalPrice: number;
  estimatedHours: number;
  checklist: ChecklistTask[];
  createdAt: string;
  beforeAfterPhotos?: {
    room: string;
    beforeUrl: string;
    afterUrl: string;
  }[];
  rating?: number;
  review?: string;
  tipAmount?: number;
}

export interface ServiceTier {
  id: ServiceType;
  name: string;
  tagline: string;
  basePrice: number;
  pricePerBed: number;
  pricePerBath: number;
  pricePerSqFt: number;
  estimatedBaseHours: number;
  popular?: boolean;
  includedTasks: string[];
}
