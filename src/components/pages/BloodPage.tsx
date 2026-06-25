import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, MapPin, Clock, Award, ArrowLeft } from 'lucide-react';

import { LanguageProvider } from '@/i18n/LanguageProvider';

function BloodContent() {
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', bloodGroup: '', city: '' });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a href="/" className="flex items-center gap-2 text-secondary mb-8 hover:text-primary">
          <ArrowLeft size={20} /> Back to Home
        </a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-secondary mb-2">Blood Donor Network</h1>
          <p className="text-secondary/60 mb-8">Register as a donor. Save lives. Earn Life Credits.</p>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-4 rounded-card text-center">
              <MapPin className="mx-auto text-primary mb-2" size={24} />
              <p className="font-bold">5 km</p>
              <p className="text-xs text-secondary/60">Match radius</p>
            </div>
            <div className="bg-white p-4 rounded-card text-center">
              <Clock className="mx-auto text-accent mb-2" size={24} />
              <p className="font-bold">15 min</p>
              <p className="text-xs text-secondary/60">Avg response</p>
            </div>
            <div className="bg-white p-4 rounded-card text-center">
              <Droplets className="mx-auto text-red-500 mb-2" size={24} />
              <p className="font-bold">SMS Based</p>
              <p className="text-xs text-secondary/60">No app needed</p>
            </div>
            <div className="bg-white p-4 rounded-card text-center">
              <Award className="mx-auto text-success mb-2" size={24} />
              <p className="font-bold">Life Credits</p>
              <p className="text-xs text-secondary/60">Earn rewards</p>
            </div>
          </div>

          {!registered ? (
            <div className="bg-white rounded-card shadow-sm p-6 max-w-md">
              <h2 className="text-xl font-bold text-secondary mb-4">Register as Donor</h2>
              <div className="space-y-4">
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                <select value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary">
                  <option value="">Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                <button onClick={() => setRegistered(true)} className="w-full bg-primary text-white py-3 rounded-btn font-bold hover:scale-105 transition-transform">
                  Register as Donor
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-card text-center">
              <p className="text-2xl mb-2">✓</p>
              <p className="text-lg font-bold text-success">You're registered as a Blood Donor!</p>
              <p className="text-sm text-secondary/60 mt-2">You'll receive SMS alerts when someone near you needs blood.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function BloodPage() {
  return (
    <LanguageProvider>
      <BloodContent />
    </LanguageProvider>
  );
}
