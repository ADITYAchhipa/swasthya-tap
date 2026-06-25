import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const stepLabels = ['Phone', 'Basic Info', 'Medical', 'Contacts', 'Card'];

import { LanguageProvider } from '@/i18n/LanguageProvider';

function RegisterContent() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({ name: '', bloodGroup: '', allergies: '', medications: '', conditions: '', contact1Name: '', contact1Phone: '', contact2Name: '', contact2Phone: '', cardType: 'free' });

  const next = () => setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <a href="/" className="flex items-center gap-2 text-secondary mb-8 hover:text-primary">
          <ArrowLeft size={20} /> Back to Home
        </a>

        <div className="bg-white rounded-card shadow-lg p-8">
          <h1 className="text-2xl font-bold text-secondary mb-2">Get Your SwasthyaTap Card</h1>
          <p className="text-secondary/60 text-sm mb-6">Step {step + 1} of {stepLabels.length}: {stepLabels[step]}</p>

          {/* Progress bar */}
          <div className="flex gap-1 mb-8">
            {stepLabels.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200'}`} />
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-secondary">Phone Number</span>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-gray-100 px-3 py-2 rounded-btn text-sm">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="flex-1 border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary"
                      maxLength={10}
                    />
                  </div>
                </label>
                {!otpSent ? (
                  <button
                    onClick={() => setOtpSent(true)}
                    disabled={phone.length !== 10}
                    className="w-full bg-primary text-white py-2 rounded-btn font-bold disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary"
                      maxLength={6}
                    />
                    <button
                      onClick={next}
                      disabled={otp.length !== 6}
                      className="w-full bg-primary text-white py-2 rounded-btn font-bold disabled:opacity-50"
                    >
                      Verify &amp; Continue
                    </button>
                  </>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-secondary">Full Name</span>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-secondary">Blood Group</span>
                  <select value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary">
                    <option value="">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-secondary">Allergies</span>
                  <input type="text" value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} placeholder="e.g. Penicillin, Peanuts" className="mt-1 w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-secondary">Current Medications</span>
                  <input type="text" value={form.medications} onChange={(e) => setForm({ ...form, medications: e.target.value })} placeholder="e.g. Metformin 500mg" className="mt-1 w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-secondary">Medical Conditions</span>
                  <input type="text" value={form.conditions} onChange={(e) => setForm({ ...form, conditions: e.target.value })} placeholder="e.g. Diabetes, Asthma" className="mt-1 w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-secondary/60">These contacts will be alerted in an emergency</p>
                <div className="space-y-3">
                  <input type="text" value={form.contact1Name} onChange={(e) => setForm({ ...form, contact1Name: e.target.value })} placeholder="Contact 1 Name" className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                  <input type="tel" value={form.contact1Phone} onChange={(e) => setForm({ ...form, contact1Phone: e.target.value })} placeholder="Contact 1 Phone" className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                  <input type="text" value={form.contact2Name} onChange={(e) => setForm({ ...form, contact2Name: e.target.value })} placeholder="Contact 2 Name" className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                  <input type="tel" value={form.contact2Phone} onChange={(e) => setForm({ ...form, contact2Phone: e.target.value })} placeholder="Contact 2 Phone" className="w-full border border-gray-200 rounded-btn px-3 py-2 focus:outline-none focus:border-primary" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                {[
                  { id: 'free', name: 'Standard PVC Card', price: 'FREE' },
                  { id: 'metal', name: 'Premium Metal Card', price: '₹499' },
                  { id: 'wristband', name: 'NFC Wristband', price: '₹299' },
                ].map((card) => (
                  <label key={card.id} className={`flex items-center justify-between p-4 rounded-card border-2 cursor-pointer ${form.cardType === card.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="cardType" value={card.id} checked={form.cardType === card.id} onChange={(e) => setForm({ ...form, cardType: e.target.value })} className="accent-primary" />
                      <span className="font-medium text-secondary">{card.name}</span>
                    </div>
                    <span className="font-bold text-primary">{card.price}</span>
                  </label>
                ))}
                <button className="w-full bg-primary text-white py-3 rounded-btn font-bold text-lg hover:scale-105 transition-transform mt-4">
                  Complete Registration
                </button>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          {step > 0 && step < 4 && (
            <div className="flex justify-between mt-8">
              <button onClick={prev} className="flex items-center gap-1 text-secondary hover:text-primary">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={next} className="flex items-center gap-1 bg-primary text-white px-6 py-2 rounded-btn font-bold">
                Next <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <LanguageProvider>
      <RegisterContent />
    </LanguageProvider>
  );
}
