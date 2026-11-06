import React, { useState } from 'react';
import { Calendar, CheckCircle2, Shield, Sparkles, Clock, Car, Phone, Mail, ArrowRight, User } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { saveLead } from '../utils/crmStore';
import { Magnetic } from './Magnetic';

interface BookingConfiguratorProps {
  onBookingSuccess?: () => void;
}

export const BookingConfigurator: React.FC<BookingConfiguratorProps> = ({ onBookingSuccess }) => {
  // Vehicle Category
  const [vehicleType, setVehicleType] = useState<'Coupe / Sedan' | 'SUV / Crossover' | 'Large 4x4 / Truck'>('SUV / Crossover');
  
  // Package Selection with Indian Rupee (₹) pricing
  const packages = [
    {
      id: 'decon',
      name: 'Signature Decon & Gloss Wash',
      price: 2499,
      duration: '3.5 Hours',
      features: ['Iron fallout decontaminate', 'Clay bar treatment', 'Gloss polymer sealant', 'Tire dressing'],
    },
    {
      id: 'stage1',
      name: '1-Stage Enhancement Polish',
      price: 7999,
      duration: '1 Full Day',
      features: ['Single-stage machine polish', '60-70% defect removal', '12-Month ceramic spray coat', 'Door jambs & glass'],
    },
    {
      id: 'ceramic3',
      name: '2-Stage Swirl Correction & 3-Yr Ceramic',
      price: 18500,
      duration: '2 Days',
      popular: true,
      features: ['Multi-step compound & jewel polish', '90%+ swirl removal', '3-Year 9H ceramic coating', 'Infrared curing'],
    },
    {
      id: 'graphene5',
      name: 'Elite 5-Year Graphene Matrix + Wheels',
      price: 29999,
      duration: '3 Days',
      features: ['Full multi-stage concours correction', '5-Year Graphene 10H Matrix', 'Wheels-off barrel ceramic', 'Leather barrier'],
    },
    {
      id: 'ppf',
      name: 'Full Body Self-Healing PPF Film',
      price: 85000,
      duration: '4-5 Days',
      features: ['XPEL Ultimate Plus 8mil film', '10-Year manufacturer warranty', 'Rock chip & scratch immunity', 'Full wrapped edges'],
    },
  ];

  const [selectedPackageId, setSelectedPackageId] = useState<string>('ceramic3');

  // Add-ons in Indian Rupees (₹)
  const availableAddons = [
    { id: 'glass', name: 'Hydrophobic Glass Shield (All Windows)', price: 2499 },
    { id: 'interior', name: 'Interior Leather Guard & Steam Ozone', price: 3500 },
    { id: 'wheels', name: 'Wheels-Off Ceramic & Calipers', price: 4999 },
    { id: 'engine', name: 'Engine Bay Steam & Dressing', price: 1999 },
  ];

  const [selectedAddons, setSelectedAddons] = useState<string[]>(['glass']);

  // Date & Time
  const dates = ['Tomorrow, Nov 7', 'Saturday, Nov 8', 'Monday, Nov 10', 'Tuesday, Nov 11'];
  const timeSlots = ['08:30 AM', '10:00 AM', '01:30 PM', '03:00 PM'];
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, Nov 7');
  const [selectedTime, setSelectedTime] = useState<string>('08:30 AM');

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<{ id: string; price: number } | null>(null);

  // Price Calculation in Rupees
  const currentPkg = packages.find((p) => p.id === selectedPackageId) || packages[2];
  const vehicleSurcharge = vehicleType === 'SUV / Crossover' ? 2500 : vehicleType === 'Large 4x4 / Truck' ? 4500 : 0;
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = availableAddons.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);
  const totalPrice = currentPkg.price + vehicleSurcharge + addonsTotal;

  const toggleAddon = (id: string) => {
    soundManager.playClick();
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (!clientName.trim() || !clientPhone.trim() || !vehicleModel.trim()) {
      alert('Please fill in your name, contact phone, and vehicle model to confirm your reservation at Detailing Sikar.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newLead = saveLead({
        name: clientName,
        phone: clientPhone,
        email: clientEmail || 'client@vip.com',
        vehicle: `${vehicleType} - ${vehicleModel}`,
        service: currentPkg.name,
        addons: selectedAddons.map((id) => availableAddons.find((a) => a.id === id)?.name || id),
        date: selectedDate,
        timeSlot: selectedTime,
        price: totalPrice,
        status: 'Confirmed',
      });

      setIsSubmitting(false);
      setIsBooked(true);
      setBookedDetails({ id: newLead.id, price: totalPrice });
      soundManager.playChime();
      if (onBookingSuccess) onBookingSuccess();
    }, 700);
  };

  return (
    <section id="packages" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 mb-2">
          Step 04 · Studio Bay Reservation · Detailing Sikar
        </p>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase text-balance">
          CHOOSE YOUR DETAIL.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2">
          Select your vehicle scale, bespoke protection package, and scheduled arrival bay in Sikar.
        </p>
      </div>

      <div id="book" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vehicle & Package Selector */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Vehicle Scale Selection */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-4 flex items-center gap-2">
              <Car className="w-4 h-4 text-cyan-400" />
              <span>Select Vehicle Class</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['Coupe / Sedan', 'SUV / Crossover', 'Large 4x4 / Truck'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setVehicleType(type);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    vehicleType === type
                      ? 'bg-cyan-600/25 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{type}</div>
                  <div className="text-xs font-mono text-cyan-300 mt-1">
                    {type === 'Coupe / Sedan' ? 'Standard Base' : type === 'SUV / Crossover' ? '+₹2,500 Surcharge' : '+₹4,500 Surcharge'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Detail & Protection Packages */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Select Core Package</span>
            </h3>

            <div className="space-y-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedPackageId(pkg.id);
                  }}
                  className={`p-6 rounded-2xl glass-panel border transition-all cursor-pointer relative ${
                    selectedPackageId === pkg.id
                      ? 'border-cyan-400 bg-cyan-950/20 shadow-xl shadow-cyan-950/30'
                      : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest uppercase bg-cyan-500 text-black px-2.5 py-0.5 rounded-full font-bold">
                      Most Popular
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-300">
                        {pkg.name}
                      </h4>
                      <div className="text-xs font-mono text-neutral-400 flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-cyan-300">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{pkg.duration}</span>
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-2xl font-bold font-mono text-white tabular-nums">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-neutral-500">Base Price</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. High-Value Addons */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Recommended Protection Add-ons</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableAddons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-950/30 border-cyan-400 text-white'
                        : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-white">{addon.name}</div>
                    <div className="text-xs font-mono font-bold text-cyan-400 shrink-0">
                      +₹{addon.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Booking Ledger & Submission Form */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 bg-[#0c0c12]">
            {isBooked && bookedDetails ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/40">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                  CONFIRMATION ID: {bookedDetails.id}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  YOU'RE BOOKED. SEE YOU SOON.
                </h3>
                <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                  We have reserved Cleanroom Bay 01 at <span className="text-white font-medium">Detailing Sikar</span> for your <span className="text-white font-medium">{vehicleModel}</span> on <span className="text-cyan-300 font-medium">{selectedDate} at {selectedTime}</span>.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs font-mono space-y-2 mt-4">
                  <div className="flex justify-between text-neutral-400">
                    <span>Package:</span>
                    <span className="text-white">{currentPkg.name}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Final Total:</span>
                    <span className="text-cyan-400 font-bold">₹{bookedDetails.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Studio Address:</span>
                    <span className="text-neutral-300">Piprali Road, Near Jaipur-Bikaner Bypass, Sikar, Rajasthan</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBooked(false);
                      setClientName('');
                      setClientPhone('');
                      setVehicleModel('');
                    }}
                    className="px-6 py-2.5 rounded-xl glass-panel text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Modify / Book Another Vehicle
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                    Reservation Summary
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">
                    Detailing Sikar · Cleanroom bay allocation
                  </p>
                </div>

                {/* Selected Package Breakdown */}
                <div className="space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span>{currentPkg.name}</span>
                    <span className="text-white font-bold">₹{currentPkg.price.toLocaleString('en-IN')}</span>
                  </div>
                  {vehicleSurcharge > 0 && (
                    <div className="flex justify-between text-neutral-400">
                      <span>{vehicleType} Surcharge</span>
                      <span>+₹{vehicleSurcharge.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {selectedAddons.map((id) => {
                    const addon = availableAddons.find((a) => a.id === id);
                    return addon ? (
                      <div key={id} className="flex justify-between text-neutral-400">
                        <span>{addon.name}</span>
                        <span>+₹{addon.price.toLocaleString('en-IN')}</span>
                      </div>
                    ) : null;
                  })}
                  <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                    <span>Total Investment:</span>
                    <span className="text-cyan-400 text-lg tabular-nums">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Select Date & Time Slot */}
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                    Arrival Date & Time (Sikar Studio)
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {dates.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedDate(d);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                          selectedDate === d
                            ? 'bg-cyan-600/30 border-cyan-400 text-white'
                            : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedTime(t);
                        }}
                        className={`py-1.5 rounded-lg text-[11px] font-mono transition-all border cursor-pointer ${
                          selectedTime === t
                            ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                            : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Information Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Vikram Shekhawat"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+91 98290 12345"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Vehicle Make & Model *
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder="Toyota Fortuner / Thar Roxx"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Confirmation Button */}
                <Magnetic strength={0.2} className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold uppercase tracking-wider text-sm transition-all shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Securing Bay Allocation...' : 'CONFIRM YOUR DETAIL'}</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
