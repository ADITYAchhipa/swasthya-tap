import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ClipboardList, Users, CreditCard, History, LogOut, Edit } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'medical', label: 'Medical', icon: ClipboardList },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'logs', label: 'Access Logs', icon: History },
];

const mockLogs = [
  { date: '2026-06-19 14:32', location: 'Mumbai, MH', device: 'iPhone 15' },
  { date: '2026-06-18 09:15', location: 'Pune, MH', device: 'Samsung Galaxy' },
  { date: '2026-06-15 22:01', location: 'Delhi, DL', device: 'Pixel 8' },
];

import { LanguageProvider } from '@/i18n/LanguageProvider';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-primary">SwasthyaTap</a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary">Harshit Borana</span>
            <button className="text-secondary/60 hover:text-primary"><LogOut size={20} /></button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-btn text-left transition-colors ${
                  activeTab === tab.id ? 'bg-primary text-white' : 'text-secondary hover:bg-gray-100'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-card shadow-sm p-6"
          >
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-secondary">Profile</h2>
                  <button className="flex items-center gap-1 text-primary text-sm"><Edit size={14} /> Edit</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-btn">
                    <p className="text-xs text-secondary/60">Name</p>
                    <p className="font-medium">Harshit Borana</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-btn">
                    <p className="text-xs text-secondary/60">Phone</p>
                    <p className="font-medium">+91-98765XXXXX</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-btn">
                    <p className="text-xs text-secondary/60">SwasthyaTap ID</p>
                    <p className="font-medium font-mono">ST-A3B7K2</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-btn">
                    <p className="text-xs text-secondary/60">Blood Group</p>
                    <p className="font-medium text-primary">B+</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medical' && (
              <div>
                <h2 className="text-xl font-bold text-secondary mb-6">Medical Information</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-btn">
                    <p className="text-xs text-secondary/60">Allergies</p>
                    <p className="font-medium">Penicillin, Dust</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-btn">
                    <p className="text-xs text-secondary/60">Medications</p>
                    <p className="font-medium">None</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-btn">
                    <p className="text-xs text-secondary/60">Conditions</p>
                    <p className="font-medium">None</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-btn">
                    <p className="text-xs text-secondary/60">Organ Donor</p>
                    <p className="font-medium text-success">Yes — All organs</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-xl font-bold text-secondary mb-6">Emergency Contacts</h2>
                <div className="space-y-3">
                  {['Mom (+91-9876543210)', 'Dad (+91-9876543211)'].map((c) => (
                    <div key={c} className="flex items-center justify-between p-4 bg-gray-50 rounded-btn">
                      <span className="font-medium">{c}</span>
                      <button className="text-primary text-sm">Edit</button>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed border-gray-300 p-4 rounded-btn text-secondary/60 hover:border-primary hover:text-primary">+ Add Contact</button>
                </div>
              </div>
            )}

            {activeTab === 'cards' && (
              <div>
                <h2 className="text-xl font-bold text-secondary mb-6">My Cards</h2>
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-card border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-secondary">Standard PVC Card</p>
                      <p className="text-xs text-secondary/60">Active • Issued 15 Jun 2026</p>
                    </div>
                    <span className="bg-success text-white text-xs px-2 py-1 rounded-full">Active</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div>
                <h2 className="text-xl font-bold text-secondary mb-6">Access Logs</h2>
                <p className="text-sm text-secondary/60 mb-4">Who tapped your card, when, and where</p>
                <div className="space-y-3">
                  {mockLogs.map((log) => (
                    <div key={log.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-btn">
                      <div>
                        <p className="font-medium text-sm">{log.device}</p>
                        <p className="text-xs text-secondary/60">{log.location}</p>
                      </div>
                      <span className="text-xs text-secondary/60">{log.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
}
