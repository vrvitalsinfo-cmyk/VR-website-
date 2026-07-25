import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './Reveal';
import {
  Download, 
  Mail, 
  Send, 
  CheckCircle, 
  Smartphone, 
  MessageSquare, 
  ShieldAlert, 
  User, 
  Check, 
  AlertCircle,
  X 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'support',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setToastMessage('Please fill out all required fields (Name and Email).');
      return;
    }
    setSubmitted(true);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    // Auto close toast after 5 seconds
    setTimeout(() => {
      setToastMessage((prev) => prev === msg ? null : prev);
    }, 5000);
  };

  return (
    <div className="space-y-12">
      
      {/* State Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center gap-3 bg-slate-900 border border-violet-500/30 text-violet-100 px-5 py-4 rounded-2xl shadow-2xl sm:max-w-md"
          >
            <AlertCircle className="h-5 w-5 text-violet-400 shrink-0" />
            <div className="font-sans text-xs flex-1 font-medium">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer p-2 -m-2"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Reveal className="border border-white/5 bg-[#080812]/95 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-violet-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="space-y-2.5 max-w-2xl">
          <span className="text-[10px] font-mono tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded-full uppercase font-bold">
            GET IN TOUCH
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            Support Desk & Mobile Apps
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed font-light">
            Download our mathematical telemetry trackers or contact our support grievance desk directly.
          </p>
        </div>
        <div className="bg-[#111122]/90 border border-white/5 p-4 rounded-xl flex items-center gap-3 shrink-0">
          <Mail className="h-4.5 w-4.5 text-violet-400" />
          <span className="text-xs font-mono text-slate-300 font-semibold">support@vrvitals.com</span>
        </div>
      </Reveal>

      {/* Grid: Support Form Left (7 Columns), Downloads & Communities Right (5 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Contact Support Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: '0 0 35px rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.15)' }}
          className="lg:col-span-7 bg-[#080812]/95 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 transition-colors duration-300"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-violet-300 bg-violet-500/10 border border-violet-500/15 px-2.5 py-0.5 rounded uppercase font-bold">
              CUSTOMER ASSISTANCE
            </span>
            <h3 className="text-md font-bold text-white">Write to Our Support Desk</h3>
            <p className="text-xs text-slate-500 font-light font-sans">
              Average response time: &lt; 2 Hours during market sessions.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-violet-500/5 border border-violet-500/20 p-6 rounded-2xl text-center space-y-3"
              >
                <div className="w-12 h-12 bg-violet-500/10 border border-violet-500/30 text-violet-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Support Ticket Issued!</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto font-sans leading-relaxed font-light">
                  Thank you, <strong>{formData.name}</strong>. A support ticket has been registered on our sandbox servers. An operator will reach out to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-mono text-violet-400 hover:text-violet-200 underline cursor-pointer"
                >
                  Create another ticket
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 block font-bold">Full Name *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Shiva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111122] border border-white/5 focus:border-violet-500/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 block font-bold">Email Address *</label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. user@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111122] border border-white/5 focus:border-violet-500/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 block font-bold">Inquiry Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-[#111122] border border-white/5 focus:border-violet-500/50 rounded-xl px-4 py-3 text-slate-400 focus:outline-none transition-all"
                  >
                    <option value="support">General Technical Support</option>
                    <option value="billing">Billing & Refund Inquiry</option>
                    <option value="cohort">Mentorship Cohort Slot Registry</option>
                    <option value="grievance">Compliance & Grievance Officer Escalation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 block font-bold">Support Request message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your request in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111122] border border-white/5 focus:border-violet-500/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none font-sans font-light transition-all"
                  />
                </div>

                <motion.button
                  type="submit"
                  animate={{
                    scale: [1, 1.015, 1],
                    boxShadow: [
                      '0 10px 15px -3px rgba(124, 58, 237, 0.15), 0 0 0 0 rgba(139, 92, 246, 0)',
                      '0 10px 15px -3px rgba(124, 58, 237, 0.15), 0 0 0 8px rgba(139, 92, 246, 0.35)',
                      '0 10px 15px -3px rgba(124, 58, 237, 0.15), 0 0 0 0 rgba(139, 92, 246, 0)'
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut'
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] hover:from-[#bfa9ff] hover:to-[#8c4df5] text-white font-bold py-3.5 px-6 rounded-xl transition-colors duration-300 cursor-pointer text-xs"
                >
                  Submit Support Ticket
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Downloads & Social Communities Right Panel (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-6"
        >
          
          {/* Download Mobile App section */}
          <div className="bg-[#080812]/95 border border-white/5 p-5 sm:p-6 rounded-3xl space-y-4">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-2">
              MOBILE COMPANION TERMINAL
            </span>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
              Access real-time telemetry scanners and position sizing calculators on the go. Available for Apple iOS and Android OS.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* iOS Button simulation */}
              <motion.button
                whileHover={{ scale: 1.03, borderColor: '#8B5CF6', boxShadow: '0 0 15px rgba(139, 92, 246, 0.25)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => showToast('APP STORE: Accessing "V R Vitals Trading Sandbox" iOS App details. The test build is active on TestFlight.')}
                className="flex items-center justify-center gap-2.5 bg-[#111122] border border-white/5 text-slate-200 py-3 px-4 rounded-xl cursor-pointer transition-colors duration-300"
              >
                <Smartphone className="h-4 w-4 text-violet-400" />
                <div className="text-left leading-none">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold font-mono">DOWNLOAD ON THE</span>
                  <span className="text-xs font-bold font-sans text-slate-300">App Store</span>
                </div>
              </motion.button>

              {/* Play Store Button simulation */}
              <motion.button
                whileHover={{ scale: 1.03, borderColor: '#38BDF8', boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => showToast('PLAY STORE: Accessing "V R Vitals Trading Sandbox" Android App package. Direct APK available in sandbox downloads.')}
                className="flex items-center justify-center gap-2.5 bg-[#111122] border border-white/5 text-slate-200 py-3 px-4 rounded-xl cursor-pointer transition-colors duration-300"
              >
                <Smartphone className="h-4 w-4 text-sky-400" />
                <div className="text-left leading-none">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold font-mono">ANDROID APP ON</span>
                  <span className="text-xs font-bold font-sans text-slate-300">Google Play</span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Social Communities Links */}
          <div className="bg-[#080812]/95 border border-white/5 p-5 sm:p-6 rounded-3xl space-y-4">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-2">
              TELEGRAM / WHATSAPP SANDBOXES
            </span>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
              Join 8,000+ active retail students in our simulated trading chats. Discuss price setups, macro indicators, and structural blocks.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => showToast('TELEGRAM: Redirecting to V R Vitals Official Telegram group. Access restricted to approved students.')}
                className="w-full flex justify-between items-center bg-[#111122] border border-white/5 hover:border-white/10 p-3 rounded-xl cursor-pointer text-xs font-mono text-slate-300 transition-colors"
              >
                <span>Telegram Public Group</span>
                <span className="text-violet-400 font-bold">&rarr; Join Channel</span>
              </button>
              <button
                onClick={() => showToast('WHATSAPP: Redirecting to WhatsApp community broadcast list. Alerts updates only.')}
                className="w-full flex justify-between items-center bg-[#111122] border border-white/5 hover:border-white/10 p-3 rounded-xl cursor-pointer text-xs font-mono text-slate-300 transition-colors"
              >
                <span>WhatsApp Alerts Stream</span>
                <span className="text-emerald-400 font-bold">&rarr; Subscribe</span>
              </button>
            </div>
          </div>

          {/* Grievance Panel */}
          <div className="bg-[#111122]/90 border border-white/5 p-4.5 rounded-2xl text-[10px] space-y-1.5 font-mono text-slate-500">
            <div className="flex items-center gap-1 text-slate-300 font-bold uppercase tracking-wider">
              <AlertCircle className="h-3.5 w-3.5 text-slate-400" /> GRIEVANCE OFFICER DETAILS
            </div>
            <p className="font-sans font-light leading-normal text-slate-400">
              For regulatory complaints, legal audits, or subscription cancellations escalation:
            </p>
            <div className="text-slate-300">
              <span className="block font-bold">Officer Email: grievance@vrvitals.com</span>
              <span className="block text-slate-500">Response standard: 48 working hours</span>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Persistent Disclaimer */}
      <Reveal delay={0.1} className="p-4 bg-[#111122]/50 border border-white/5 rounded-2xl flex items-start gap-3 text-[11px] text-slate-400 font-sans leading-relaxed">
        <ShieldAlert className="h-4 w-4 shrink-0 text-violet-400 mt-0.5" />
        <span>
          <strong>COMMUNITY SAFETY NOTICE:</strong> V R Vitals Private Limited operates exclusively for quantitative academic training. Avoid direct or indirect solicitation from copy channels claiming connection with our desk officers. Shiva Kumar, Dr. Ashith Sanjay, and staff will never ask for funds, wallet keys, or payment transfers.
        </span>
      </Reveal>
    </div>
  );
}
