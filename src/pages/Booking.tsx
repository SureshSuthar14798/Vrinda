import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../App';

const bookingSchema = z.object({
  department: z.string().min(1, "Please select a department"),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  notes: z.string().optional(),
  patientName: z.string().min(2, "Name is required"),
  patientPhone: z.string().min(10, "Valid phone number is required"),
});

type BookingForm = z.infer<typeof bookingSchema>;

const departments = [
  "Maxillofacial Surgery",
  "Plastic Surgery",
  "Hair Transplant",
  "Dentistry",
  "Dermatology",
  "Trauma Care",
  "Radiology",
  "Pathology",
  "Homeopathy"
];

const doctors = [
  { id: '1', name: 'Dr. Vikram Sharma', dept: 'Maxillofacial Surgery' },
  { id: '2', name: 'Dr. Ananya Reddy', dept: 'Plastic Surgery' },
  { id: '3', name: 'Dr. Sameer Khan', dept: 'Dermatology' },
  { id: '4', name: 'Dr. Priya Mehta', dept: 'Hair Transplant' }
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, login } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      department: location.state?.department || '',
      doctorId: location.state?.doctorId || '',
      patientName: profile?.displayName || '',
      patientPhone: profile?.phone || ''
    }
  });

  const selectedDept = watch('department');
  const filteredDoctors = doctors.filter(d => d.dept === selectedDept);

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      let signedInUser = user;
      if (!signedInUser) {
        try {
          await login();
        } catch (error) {
          console.error('Login before booking failed:', error);
        }
        signedInUser = auth.currentUser;
      }

      if (!signedInUser) {
        setSubmitError('Please sign in to complete the booking (popup might be blocked).');
        return;
      }

      const doctor = doctors.find(d => d.id === data.doctorId);
      await addDoc(collection(db, 'appointments'), {
        ...data,
        patientId: signedInUser.uid,
        doctorName: doctor?.name || 'Unknown Doctor',
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      console.error("Booking error:", error);
      const maybeCode = (error as any)?.code as string | undefined;
      if (maybeCode === 'permission-denied') {
        setSubmitError('Permission denied while booking. Please login again and try.');
      } else {
        setSubmitError('Booking failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (formErrors: typeof errors) => {
    if (formErrors.department || formErrors.doctorId) {
      setStep(1);
      return;
    }
    if (formErrors.date || formErrors.timeSlot) {
      setStep(2);
      return;
    }
    setStep(3);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-slate-50 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-[2.5rem] max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-8">Your appointment has been successfully scheduled. You will receive a confirmation message shortly.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Book an Appointment</h1>
          <p className="text-slate-500">Secure your consultation with our specialists in a few simple steps.</p>
        </div>

        <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
          {/* Progress Bar */}
          <div className="h-2 bg-slate-100 flex">
            <div 
              className="h-full bg-teal-600 transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Stethoscope size={16} className="text-teal-600" /> Select Department
                      </label>
                      <select 
                        {...register('department')}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Choose a department</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <User size={16} className="text-teal-600" /> Select Doctor
                      </label>
                      <select 
                        {...register('doctorId')}
                        disabled={!selectedDept}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                      >
                        <option value="">Choose a doctor</option>
                        {filteredDoctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                      {errors.doctorId && <p className="text-xs text-red-500 mt-1">{errors.doctorId.message}</p>}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      onClick={() => setStep(2)}
                      disabled={!watch('department') || !watch('doctorId')}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <CalendarIcon size={16} className="text-teal-600" /> Select Date
                      </label>
                      <input 
                        type="date" 
                        {...register('date')}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      />
                      {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Clock size={16} className="text-teal-600" /> Select Time Slot
                      </label>
                      <input type="hidden" {...register('timeSlot')} />
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setValue('timeSlot', slot, { shouldValidate: true, shouldDirty: true })}
                            className={`p-3 text-sm rounded-xl border transition-all font-medium ${
                              watch('timeSlot') === slot 
                                ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/20' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-teal-200'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      {errors.timeSlot && <p className="text-xs text-red-500 mt-1">{errors.timeSlot.message}</p>}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary flex items-center gap-2">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setStep(3)}
                      disabled={!watch('date') || !watch('timeSlot')}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Patient Full Name</label>
                      <input 
                        {...register('patientName')}
                        placeholder="Enter full name"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      />
                      {errors.patientName && <p className="text-xs text-red-500 mt-1">{errors.patientName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number</label>
                      <input 
                        {...register('patientPhone')}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      />
                      {errors.patientPhone && <p className="text-xs text-red-500 mt-1">{errors.patientPhone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Additional Notes (Optional)</label>
                    <textarea 
                      {...register('notes')}
                      rows={4}
                      placeholder="Any specific concerns or medical history..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {!user && (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 text-amber-800 text-sm">
                      <AlertCircle size={20} />
                      <span>You need to be logged in to complete the booking.</span>
                    </div>
                  )}

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
                      <AlertCircle size={20} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary flex items-center gap-2">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Booking'} <CheckCircle2 size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
