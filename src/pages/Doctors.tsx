import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import userImage from '../assets/images/user.jpg';

const doctors = [
  {
    id: '1',
    name: 'Dr. Ashok Suthar',
    specialization: 'Maxillofacial Surgeon',
    experience: '15+ Years',
    bio: 'Expert in facial reconstruction and jaw surgery with international training.',
    photoUrl: userImage,
    department: 'Maxillofacial Surgery'
  },
  {
    id: '2',
    name: 'Dr. Ananya Reddy',
    specialization: 'Plastic Surgeon',
    experience: '12+ Years',
    bio: 'Specializes in aesthetic facial procedures and reconstructive plastic surgery.',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    department: 'Plastic Surgery'
  },
  {
    id: '3',
    name: 'Dr. Sameer Khan',
    specialization: 'Dermatologist',
    experience: '10+ Years',
    bio: 'Advanced skin care expert focusing on cosmetic dermatology and laser treatments.',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    department: 'Dermatology'
  },
  {
    id: '4',
    name: 'Dr. Parth Mehta',
    specialization: 'Hair Transplant Surgeon',
    experience: '8+ Years',
    bio: 'Leading expert in FUE hair restoration and scalp health.',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    department: 'Hair Transplant'
  }
];

export default function Doctors() {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Meet Our Experts</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our team of world-class surgeons and specialists is dedicated to providing you with the best medical care.
            </p>
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth" style={{ scrollPaddingLeft: 'calc((100vw - 288px) / 2)' }}>
            <div className="flex gap-4 w-max" style={{ paddingLeft: 'calc((100vw - 288px) / 2)', paddingRight: 'calc((100vw - 288px) / 2)' }}>
              {doctors.map((doctor, i) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl overflow-hidden card-hover group flex-shrink-0 w-72 snap-center"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={doctor.photoUrl} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-teal-600 shadow-sm">
                      <Star size={12} fill="currentColor" /> 4.9
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2 block">{doctor.specialization}</span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{doctor.name}</h3>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">{doctor.bio}</p>
                    
                    <div className="flex items-center gap-4 mb-6 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Award size={14} /> {doctor.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} /> Available
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate('/booking', { state: { doctorId: doctor.id, doctorName: doctor.name, department: doctor.department } })}
                      className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                    >
                      Book Consultation <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl overflow-hidden card-hover group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={doctor.photoUrl} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-teal-600 shadow-sm">
                    <Star size={12} fill="currentColor" /> 4.9
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2 block">{doctor.specialization}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{doctor.name}</h3>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-2">{doctor.bio}</p>
                  
                  <div className="flex items-center gap-4 mb-6 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Award size={14} /> {doctor.experience}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> Available
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/booking', { state: { doctorId: doctor.id, doctorName: doctor.name, department: doctor.department } })}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Book Consultation <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
