export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  addons: string[];
  date: string;
  timeSlot: string;
  price: number;
  status: 'Confirmed' | 'In Bay' | 'Completed' | 'Pending';
  createdAt: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 'SKR-801',
    name: 'Vikram Shekhawat',
    phone: '+91 98290 84120',
    email: 'vikram.shekhawat@rajasthan.co',
    vehicle: 'Toyota Fortuner Legender 4x4',
    service: 'Elite 5-Year Graphene Matrix + Wheels',
    addons: ['Hydrophobic Glass Shield', 'Interior Leather Guard & Steam Ozone'],
    date: 'Tomorrow, Nov 7',
    timeSlot: '09:00 AM',
    price: 38498,
    status: 'In Bay',
    createdAt: '2026-11-05T18:20:00Z',
  },
  {
    id: 'SKR-802',
    name: 'Pooja Choudhary',
    phone: '+91 94140 33219',
    email: 'pooja.c@choudharygroup.in',
    vehicle: 'Mahindra Thar Roxx 4x4',
    service: '2-Stage Swirl Correction & 3-Yr Ceramic',
    addons: ['Hydrophobic Glass Shield'],
    date: 'Nov 8, 2026',
    timeSlot: '11:30 AM',
    price: 23499,
    status: 'Confirmed',
    createdAt: '2026-11-05T19:40:00Z',
  },
  {
    id: 'SKR-803',
    name: 'Aditya Rathore',
    phone: '+91 97840 55102',
    email: 'aditya.rathore@heritage.in',
    vehicle: 'Audi RS Q8 Vorsprung',
    service: 'Full Body Self-Healing PPF Film',
    addons: ['Wheels-Off Ceramic & Calipers', 'Engine Bay Steam & Dressing'],
    date: 'Nov 9, 2026',
    timeSlot: '02:00 PM',
    price: 94498,
    status: 'Confirmed',
    createdAt: '2026-11-05T20:15:00Z',
  },
  {
    id: 'SKR-804',
    name: 'Rajendra Singh Sikarwar',
    phone: '+91 99280 12044',
    email: 'rajendra@sikarwarinfra.com',
    vehicle: 'Mahindra Scorpio-N Z8L',
    service: '2-Stage Swirl Correction & 3-Yr Ceramic',
    addons: ['Interior Leather Guard & Steam Ozone'],
    date: 'Nov 10, 2026',
    timeSlot: '10:00 AM',
    price: 24500,
    status: 'Pending',
    createdAt: '2026-11-05T21:05:00Z',
  },
  {
    id: 'SKR-800',
    name: 'Manish Agarwal',
    phone: '+91 98285 77011',
    email: 'manish.agarwal@sikartextiles.com',
    vehicle: 'BMW M340i xDrive',
    service: 'Elite 5-Year Graphene Matrix + Wheels',
    addons: ['Wheels-Off Ceramic & Calipers', 'Hydrophobic Glass Shield'],
    date: 'Nov 4, 2026',
    timeSlot: '08:30 AM',
    price: 37497,
    status: 'Completed',
    createdAt: '2026-11-04T14:10:00Z',
  },
];

const STORAGE_KEY = 'detailing_sikar_leads_v1';

export function getStoredLeads(): Lead[] {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADS;
  }
}

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const current = getStoredLeads();
  const newLead: Lead = {
    ...lead,
    id: `SKR-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newLead, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead['status']): Lead[] {
  const current = getStoredLeads();
  const updated = current.map((l) => (l.id === id ? { ...l, status } : l));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}
