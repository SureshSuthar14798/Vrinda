import React from 'react';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  Activity, 
  Scissors, 
  Smile, 
  Zap, 
  Microscope, 
  Dna, 
  FlaskConical,
  Leaf,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    title: "Maxillofacial Surgery",
    icon: <Stethoscope size={32} />,
    desc: "Specialized surgery for face, jaw, and neck reconstruction and trauma care.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Plastic Surgery",
    icon: <Scissors size={32} />,
    desc: "Aesthetic and reconstructive procedures to enhance appearance and function.",
    color: "bg-teal-50 text-teal-600"
  },
  {
    title: "Hair Transplant",
    icon: <Zap size={32} />,
    desc: "Advanced FUE and FUT techniques for natural-looking hair restoration.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Dentistry",
    icon: <Smile size={32} />,
    desc: "Comprehensive dental care, from routine checkups to complex implants.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Dermatology",
    icon: <Activity size={32} />,
    desc: "Expert skin care, anti-aging treatments, and medical dermatology.",
    color: "bg-rose-50 text-rose-600"
  },
  {
    title: "Trauma Care",
    icon: <FlaskConical size={32} />,
    desc: "Emergency facial trauma and reconstructive surgery available 24/7.",
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Radiology",
    icon: <Dna size={32} />,
    desc: "High-resolution imaging for precise diagnosis and surgical planning.",
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Pathology",
    icon: <Microscope size={32} />,
    desc: "Advanced laboratory services for accurate medical testing.",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Homeopathy",
    icon: <Leaf size={32} />,
    desc: "Alternative medicine for holistic healing and longevity.",
    color: "bg-green-50 text-green-600"
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Our Specialities</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We offer a comprehensive range of medical services with a primary focus on facial surgery and aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl card-hover group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${service.color} group-hover:bg-teal-600 group-hover:text-white`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{service.desc}</p>
                <button className="text-teal-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  View Details <ChevronRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
