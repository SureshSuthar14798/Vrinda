import React from 'react';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  HeartPulse,
  Award,
  Users,
  Clock,
  Scissors,
  Smile,
  Zap,
  Star,
  MapPin,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const allServices = [
  { title: 'Maxillofacial Surgery', icon: <Stethoscope />, desc: 'Expert care for face, jaw, and neck surgeries.' },
  { title: 'Plastic Surgery', icon: <Scissors />, desc: 'Aesthetic and reconstructive procedures.' },
  { title: 'Hair Transplant', icon: <Zap />, desc: 'Advanced FUE and FUT techniques.' },
  { title: 'Dermatology', icon: <ShieldCheck />, desc: 'Advanced skin care and cosmetic treatments.' },
  { title: 'Dentistry', icon: <Smile />, desc: 'Comprehensive dental care and implants.' },
  { title: 'Trauma Care', icon: <Activity />, desc: '24/7 emergency facial trauma surgery.' }
];

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Hospital Building" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                India's First Exclusive Face Surgery Center
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
                Excellence in <span className="text-teal-600 italic">Face Surgery</span> & Superspeciality Care.
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Vrinda Face & Superspeciality Hospital is a premier medical institution in Jodhpur, dedicated to providing world-class maxillofacial, plastic surgery, and comprehensive medical expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate('/booking')} className="btn-primary flex items-center gap-2">
                  Book Appointment <ChevronRight size={18} />
                </button>
                <button onClick={() => navigate('/services')} className="btn-secondary">
                  Our Specialities
                </button>
              </div>
              
              <div className="mt-16 flex items-center gap-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i}`} 
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                      alt="User"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-medium text-slate-600">Trusted by 15,000+ Patients</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-teal-600/20 border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" 
                  alt="Surgery Team" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-xl z-20 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certified</p>
                    <p className="font-bold text-slate-900">ISO 9001:2015</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-xl z-20 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experts</p>
                    <p className="font-bold text-slate-900">25+ Specialists</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Successful Surgeries', value: '15,000+' },
              { label: 'Expert Doctors', value: '25+' },
              { label: 'Years of Excellence', value: '20+' },
              { label: 'Patient Satisfaction', value: '100%' }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{stat.value}</p>
                <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500" 
                  className="rounded-3xl shadow-lg mt-12" 
                  alt="Medical Equipment"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=500" 
                  className="rounded-3xl shadow-lg" 
                  alt="Hospital Interior"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-white">
                <HeartPulse size={48} className="animate-pulse" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Why Vrinda Face Hospital?</h2>
              <p className="text-slate-500 mb-10 leading-relaxed">
                We are more than just a hospital; we are a center of excellence dedicated to the art and science of facial surgery and superspeciality medical care.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Advanced Technology', desc: 'Equipped with the latest surgical and diagnostic tools.' },
                  { title: 'Personalized Care', desc: 'Every patient receives a tailored treatment plan.' },
                  { title: 'Safety First', desc: 'Adhering to international medical safety protocols.' },
                  { title: 'Holistic Approach', desc: 'Combining modern surgery with holistic recovery.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Specialities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">From facial reconstruction to general superspeciality care, we cover a wide range of medical needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <Link to="/services" className="text-teal-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button onClick={() => navigate('/services')} className="btn-secondary">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Patients Say</h2>
            <p className="text-slate-500">Real stories from people who trusted us with their care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Verma', text: 'The maxillofacial surgery I had here was life-changing. The doctors are incredibly skilled and caring.', role: 'Patient' },
              { name: 'Priya Singh', text: 'Best dermatology treatment in Jodhpur. My skin has never looked better. Highly recommend!', role: 'Patient' },
              { name: 'Amit Jha', text: 'Professional staff and world-class facilities. The hair transplant procedure was seamless.', role: 'Patient' }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="flex text-amber-500 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-8 md:p-12 rounded-[3rem] overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Visit Us in Jodhpur</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Our Address</h4>
                      <p className="text-sm text-slate-500">9-A, Main Pal Road, Opp. Hanwant School, Dalle Khan Chakki Circle, Baldev Nagar, Jodhpur, Rajasthan 342001</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Call Us</h4>
                      <p className="text-sm text-slate-500">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Working Hours</h4>
                      <p className="text-sm text-slate-500">Mon - Sat: 09:00 AM - 08:00 PM<br />Sunday: Emergency Only</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.625368367988!2d72.9941625!3d26.2679131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sVRINDA+Face+%26+Superspeciality+Hospital!2s26.2679131,72.9941625!5e0!3m2!1sen!2sin!4v1711276800000" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-teal-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to transform your life?</h2>
          <p className="text-teal-100 mb-12 max-w-2xl mx-auto text-lg">
            Book a consultation with our experts today and take the first step towards a better you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => navigate('/booking')} className="px-8 py-4 bg-white text-teal-600 rounded-2xl font-bold hover:bg-teal-50 transition-all shadow-xl shadow-teal-900/20">
              Book Appointment Now
            </button>
            <button onClick={() => navigate('/doctors')} className="px-8 py-4 bg-teal-700 text-white rounded-2xl font-bold hover:bg-teal-800 transition-all border border-teal-500/30">
              Consult with Doctors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
