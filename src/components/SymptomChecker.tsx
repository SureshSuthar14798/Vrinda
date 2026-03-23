import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { checkSymptoms } from '../services/gemini';

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    const response = await checkSymptoms(symptoms);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="glass rounded-[2.5rem] overflow-hidden">
      <div className="bg-teal-600 p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <h3 className="text-2xl font-bold">AI Symptom Checker</h3>
        </div>
        <p className="text-teal-100 text-sm leading-relaxed">
          Describe your symptoms in detail, and our AI will provide a preliminary assessment and recommend the right department at Vrinda Hospital.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleCheck} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">How are you feeling today?</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., I have a persistent pain in my lower jaw and some swelling near the ear..."
              rows={4}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Analyzing Symptoms...
              </>
            ) : (
              <>
                <Send size={20} /> Analyze Symptoms
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-12 pt-12 border-t border-slate-100"
            >
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-2 text-teal-600 mb-6">
                  <Activity size={20} />
                  <span className="font-bold uppercase tracking-widest text-xs">AI Assessment Result</span>
                </div>
                
                <div className="prose prose-slate prose-sm max-w-none">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>

                <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3 text-amber-800 text-xs leading-relaxed">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>
                    <strong>Disclaimer:</strong> This AI-generated assessment is for informational purposes only and is NOT a medical diagnosis. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
