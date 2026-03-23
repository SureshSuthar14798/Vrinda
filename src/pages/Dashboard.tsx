import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  FileText, 
  Bell, 
  User, 
  Settings, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Plus,
  Activity,
  Search,
  MessageSquare,
  Video
} from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../App';
import { Appointment, MedicalRecord } from '../types';
import SymptomChecker from '../components/SymptomChecker';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'records' | 'ai'>('appointments');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const qAppts = query(
      collection(db, 'appointments'),
      where('patientId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const qRecords = query(
      collection(db, 'medicalRecords'),
      where('patientId', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubAppts = onSnapshot(qAppts, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment)));
      setLoading(false);
    });

    const unsubRecords = onSnapshot(qRecords, (snapshot) => {
      setRecords(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MedicalRecord)));
    });

    return () => {
      unsubAppts();
      unsubRecords();
    };
  }, [user]);

  if (!user) return <div className="pt-32 text-center">Please login to view your dashboard.</div>;

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {profile?.displayName}</h1>
            <p className="text-slate-500">Manage your health records and upcoming consultations.</p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass p-6 rounded-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl">
                  {profile?.displayName?.[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{profile?.displayName}</p>
                  <p className="text-xs text-slate-500">{profile?.role.toUpperCase()}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'appointments', label: 'Appointments', icon: <Calendar size={18} /> },
                  { id: 'records', label: 'Medical Records', icon: <FileText size={18} /> },
                  { id: 'ai', label: 'AI Symptom Checker', icon: <Activity size={18} /> }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl text-sm font-medium transition-all ${
                      activeTab === item.id 
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="glass p-6 rounded-3xl bg-teal-600 text-white">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-xs text-teal-100 mb-6 leading-relaxed">Our support team is available 24/7 for any medical assistance.</p>
              <button className="w-full py-3 bg-white/20 backdrop-blur rounded-xl text-sm font-bold hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                <MessageSquare size={16} /> Chat Support
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'appointments' && (
                <motion.div
                  key="appointments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Upcoming Appointments</h3>
                    <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                      <Plus size={16} /> New Booking
                    </button>
                  </div>

                  {loading ? (
                    <div className="p-12 text-center text-slate-400">Loading appointments...</div>
                  ) : appointments.length === 0 ? (
                    <div className="glass p-12 rounded-[2.5rem] text-center">
                      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar size={32} />
                      </div>
                      <p className="text-slate-500">No appointments found.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {appointments.map(appt => (
                        <div key={appt.id} className="glass p-6 rounded-3xl border-l-4 border-l-teal-600">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">{appt.department}</p>
                              <h4 className="font-bold text-slate-900">{appt.doctorName}</h4>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              appt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              appt.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {appt.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-teal-600" /> {appt.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-teal-600" /> {appt.timeSlot}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                              <Video size={14} /> Join Call
                            </button>
                            <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'records' && (
                <motion.div
                  key="records"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Medical History</h3>
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search records..." 
                        className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  {records.length === 0 ? (
                    <div className="glass p-12 rounded-[2.5rem] text-center">
                      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={32} />
                      </div>
                      <p className="text-slate-500">No medical records available yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {records.map(record => (
                        <div key={record.id} className="glass p-4 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              record.type === 'prescription' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              <FileText size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{record.description}</h4>
                              <p className="text-xs text-slate-500">{record.doctorName} • {new Date(record.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <ChevronRight size={20} className="text-slate-300" />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'ai' && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <SymptomChecker />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
