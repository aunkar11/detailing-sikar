import React, { useState, useEffect } from 'react';
import { X, Search, Filter, Download, Plus, CheckCircle, Clock, AlertTriangle, ArrowUpRight, DollarSign, Users, Car, TrendingUp } from 'lucide-react';
import { Lead, getStoredLeads, updateLeadStatus } from '../utils/crmStore';
import { soundManager } from '../utils/audio';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setLeads(getStoredLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = leads.reduce((acc, l) => acc + l.price, 0);
  const inBayCount = leads.filter((l) => l.status === 'In Bay').length;
  const confirmedCount = leads.filter((l) => l.status === 'Confirmed').length;

  const handleStatusChange = (id: string, newStatus: Lead['status']) => {
    soundManager.playClick();
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const exportCSV = () => {
    soundManager.playClick();
    const headers = 'ID,Name,Phone,Email,Vehicle,Service,Date,Time,Price_INR,Status\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.phone}","${l.email}","${l.vehicle}","${l.service}","${l.date}","${l.timeSlot}","${l.price}","${l.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detailing_sikar_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl max-h-[92vh] overflow-hidden rounded-3xl glass-panel-glow border border-white/20 bg-[#09090d] flex flex-col shadow-2xl">
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0e0e14]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h2 className="text-xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
                <span>DETAILING SIKAR CRM</span>
                <span className="text-neutral-500 text-sm">/</span>
                <span className="text-cyan-400 text-sm">ACTIVE BOOKINGS & BAY SCHEDULE</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Studio Management Portal · Sikar, Rajasthan Cleanroom Facility
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={exportCSV}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Business Metrics Strip in Rupees (₹) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-white/10 bg-black/30">
          <div className="p-4 rounded-2xl glass-panel border border-white/5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Booked Pipeline</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">₹</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">+34% vs last month</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Active Leads</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums mt-1">
              {leads.length}
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{confirmedCount} confirmed bookings</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Vehicles In Bay</span>
              <Car className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums mt-1">
              {inBayCount} / 3 Bays
            </div>
            <div className="text-[11px] text-amber-300 font-mono mt-0.5">85% capacity utilized</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Avg Ticket Size</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums mt-1">
              ₹{leads.length > 0 ? Math.round(totalRevenue / leads.length).toLocaleString('en-IN') : 0}
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">High ceramic & PPF share</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 text-xs font-mono">
            {['All', 'Confirmed', 'In Bay', 'Completed', 'Pending'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setFilterStatus(status);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search client, vehicle, phone..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Leads Data Table with Rupee Values */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead className="bg-[#0e0e14] text-neutral-400 border-b border-white/10 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 font-medium">Lead ID</th>
                <th className="py-3 px-4 font-medium">Customer & Contact</th>
                <th className="py-3 px-4 font-medium">Vehicle</th>
                <th className="py-3 px-4 font-medium">Package & Addons</th>
                <th className="py-3 px-4 font-medium">Schedule Slot</th>
                <th className="py-3 px-4 font-medium text-right">Value (INR)</th>
                <th className="py-3 px-4 font-medium">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-neutral-400 font-bold">{lead.id}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-neutral-400 text-[11px]">{lead.phone}</div>
                    </td>
                    <td className="py-4 px-4 text-cyan-300 font-semibold">{lead.vehicle}</td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="text-white truncate">{lead.service}</div>
                      {lead.addons && lead.addons.length > 0 && (
                        <div className="text-neutral-500 text-[10px] truncate">
                          +{lead.addons.join(', ')}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white">{lead.date}</div>
                      <div className="text-neutral-400 text-[11px]">{lead.timeSlot}</div>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-white tabular-nums text-sm">
                      ₹{lead.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            lead.status === 'Confirmed'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : lead.status === 'In Bay'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : lead.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          }`}
                        >
                          {lead.status}
                        </span>

                        {/* Status Transition Select */}
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                          className="bg-white/5 border border-white/10 rounded px-1.5 py-1 text-[10px] text-neutral-400 hover:text-white cursor-pointer focus:outline-none"
                        >
                          <option value="Confirmed" className="bg-[#121218]">Confirmed</option>
                          <option value="In Bay" className="bg-[#121218]">In Bay</option>
                          <option value="Completed" className="bg-[#121218]">Completed</option>
                          <option value="Pending" className="bg-[#121218]">Pending</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="p-4 bg-[#0e0e14] border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Total Records: {filteredLeads.length}</span>
          <span>Detailing Sikar · Piprali Road, Sikar Detailing Bay Management</span>
        </div>
      </div>
    </div>
  );
};
