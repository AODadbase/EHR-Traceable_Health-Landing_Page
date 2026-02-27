import React from 'react';
import { motion } from 'framer-motion';
import { FileWarning, Clock, Database, Search, FileDown, Brain, LayoutTemplate } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const realityPoints = [
  { icon: FileWarning, text: "Patient transfers involve hundreds of pages of PDF documents." },
  { icon: Clock, text: "Clinicians spend hours searching for history." },
  { icon: FileWarning, text: "Critical data gets missed in the noise." },
  { icon: Database, text: "Valuable information remains siloed in static files." },
];

const processSteps = [
  {
    icon: FileDown,
    title: "1. Ingest",
    desc: "We take the raw PDF transfer packet from any hospital system via our secure FastAPI backend."
  },
  {
    icon: Brain,
    title: "2. Analyze",
    desc: "Our engine (powered by Unstructured.io & LLMs) identifies clinical data points: meds, labs, imaging."
  },
  {
    icon: LayoutTemplate,
    title: "3. Summarize",
    desc: "We generate a concise discharge summary and create a fully searchable database."
  }
];

export const Features: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? 'bg-slate-950' : 'bg-white'}>
      {/* Section 1: The Problem (Current Reality) */}
      <section id="problem" className={`py-20 scroll-mt-16 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase mb-2">The Current Reality</h2>
              <h3 className={`text-3xl font-bold mb-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Clinicians are drowning in data but starving for information.</h3>
              <p className={`text-lg mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                In a high-stakes environment, scrolling through hundreds of pages of non-searchable PDFs isn't just inefficient—it's dangerous.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {realityPoints.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-xl shadow-sm border flex flex-col gap-3 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="bg-red-50 text-red-500 w-10 h-10 rounded-lg flex items-center justify-center">
                    <item.icon size={20} />
                  </div>
                  <p className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section id="solution" className={`py-24 scroll-mt-16 ${isDark ? 'bg-slate-950' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-base font-semibold tracking-wide uppercase ${isDark ? 'text-purple-400' : 'text-blue-600'}`}>How Traceable Health Works</h2>
            <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'rainbow-text' : 'text-slate-900'}`}>
              From PDF to Clinical Intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className={`hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 -z-10 ${isDark ? 'bg-slate-700' : 'bg-blue-100'}`}></div>

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-8 rounded-2xl border shadow-xl text-center relative ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 shadow-slate-900/50'
                    : 'bg-white border-slate-100 shadow-slate-200/50'
                }`}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl shadow-lg flex items-center justify-center text-white mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300 ${
                  isDark ? 'bg-purple-600 shadow-purple-600/30' : 'bg-blue-600 shadow-blue-600/30'
                }`}>
                  <step.icon size={32} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{step.title}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Value Props Split — already dark-themed, no changes needed */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800 p-8 rounded-2xl border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Clock size={24} />
                </div>
                <h3 className="text-2xl font-bold">For the Bedside</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2.5"></div>
                  <div>
                    <h4 className="font-semibold text-white">Quick Access</h4>
                    <p className="text-slate-400 text-sm mt-1">Get the patient's full story in seconds, not minutes. Instant summary generation upon transfer arrival.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2.5"></div>
                  <div>
                    <h4 className="font-semibold text-white">Smart Search</h4>
                    <p className="text-slate-400 text-sm mt-1">Find "Last MRI report" or "Discharge Meds" instantly within the document using semantic search.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800 p-8 rounded-2xl border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Database size={24} />
                </div>
                <h3 className="text-2xl font-bold">For the Hospital</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5"></div>
                  <div>
                    <h4 className="font-semibold text-white">Better Data</h4>
                    <p className="text-slate-400 text-sm mt-1">Fill gaps in your business analytics by structuring unstructured transfer data.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5"></div>
                  <div>
                    <h4 className="font-semibold text-white">Seamless Handoffs</h4>
                    <p className="text-slate-400 text-sm mt-1">Improve patient care and communication between teams with standardized discharge summaries.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
