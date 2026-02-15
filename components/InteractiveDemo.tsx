import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, CheckCircle, Search, FileJson, ArrowRight, UploadCloud, Terminal } from 'lucide-react';

interface PipelineLog {
  id: string;
  step: string;
  detail: string;
}

export const InteractiveDemo: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [logs, setLogs] = useState<PipelineLog[]>([]);
  const [activeSearch, setActiveSearch] = useState("Last MRI Brain");

  const runSimulation = () => {
    setStatus('processing');
    setLogs([]);
    
    const steps = [
      { step: "INGEST", detail: "POST /api/documents - Uploading transfer_packet_102.pdf", delay: 200 },
      { step: "OCR", detail: "unstructured.io - Extracting text from 58 pages", delay: 1200 },
      { step: "EXTRACT", detail: "Identifying Sections: H&P, Labs, Imaging, Meds", delay: 2200 },
      { step: "LLM", detail: "OpenAI gpt-4o-mini - Generating clinical summary", delay: 3500 },
      { step: "INDEX", detail: "Updating vector database for semantic search", delay: 4500 },
    ];

    let accumDelay = 0;
    steps.forEach((s) => {
      accumDelay += s.delay;
      setTimeout(() => {
        setLogs(prev => [...prev, { id: Math.random().toString(), step: s.step, detail: s.detail }]);
      }, s.delay);
    });

    setTimeout(() => {
      setStatus('complete');
    }, accumDelay + 500);
  };

  return (
    <section id="demo" className="py-24 bg-white relative overflow-hidden scroll-mt-16">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-slate-50 opacity-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              Live Pipeline Simulation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Experience the Engine</h2>
            <p className="text-slate-500 mt-4 max-w-xl">
              See how our FastAPI backend processes raw PDFs and creates structured, queryable data in real-time.
            </p>
          </div>
          
          {status === 'idle' && (
            <button 
              onClick={runSimulation}
              className="mt-6 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all"
            >
              <UploadCloud size={20} />
              Process Sample PDF
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
          {/* Left Panel: Raw Input / Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Input Representation */}
            <div className={`flex-1 bg-white rounded-xl border-2 border-dashed ${status === 'processing' ? 'border-blue-400 bg-blue-50' : 'border-slate-300'} p-6 flex flex-col items-center justify-center transition-colors duration-500`}>
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-xl flex items-center justify-center mb-4">
                <FileText size={32} />
              </div>
              <h3 className="font-semibold text-slate-900">Transfer_Packet_JohnDoe.pdf</h3>
              <p className="text-slate-500 text-sm">58 Pages • Scanned Image • Non-searchable</p>
              {status === 'processing' && (
                <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium">
                  <Loader2 size={16} className="animate-spin" />
                  Uploading to Backend...
                </div>
              )}
            </div>

            {/* Terminal Output */}
            <div className="flex-1 bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-hidden flex flex-col shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2">
                <Terminal size={14} />
                <span>api_server.py (FastAPI)</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                 <div className="text-slate-500">Waiting for requests on port 8000...</div>
                 <AnimatePresence>
                   {logs.map((log) => (
                     <motion.div 
                       key={log.id}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="flex gap-2"
                     >
                       <span className="text-blue-400 font-bold w-16 shrink-0">[{log.step}]</span>
                       <span className="text-white">{log.detail}</span>
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 {status === 'complete' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 mt-2">
                     {'>'} Process finished successfully. 200 OK
                   </motion.div>
                 )}
              </div>
            </div>
          </div>

          {/* Center Arrow */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
             <div className={`p-3 rounded-full ${status === 'complete' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'} transition-colors duration-500`}>
                <ArrowRight size={24} />
             </div>
          </div>

          {/* Right Panel: Structured Output */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileJson size={18} className="text-blue-600" />
                <span className="font-semibold text-slate-700">Clinical Summary Preview</span>
              </div>
              {status === 'complete' && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                  <CheckCircle size={12} /> Ready
                </span>
              )}
            </div>

            {status !== 'complete' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <FileJson size={24} />
                </div>
                <p>Waiting for analysis to complete...</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex-1 p-6 overflow-y-auto bg-slate-50/50"
              >
                {/* Simulated Search Bar */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center gap-3 mb-6 shadow-sm">
                  <Search size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    value={activeSearch} 
                    onChange={(e) => setActiveSearch(e.target.value)}
                    className="flex-1 outline-none text-sm text-slate-700" 
                    disabled
                  />
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Semantic Match Found</span>
                </div>

                {/* Structured Data Cards */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Imaging Findings (Page 42)</h4>
                    <p className="text-sm text-slate-800 font-medium">MRI Brain w/o contrast (2023-10-15)</p>
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="bg-yellow-100 text-yellow-800 px-1 rounded">Acute infarct</span> in the right MCA territory. 
                      No hemorrhage or mass effect. Ventricles are normal in size.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm opacity-70">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Active Medications</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li className="flex justify-between"><span>Atorvastatin 40mg</span> <span className="text-slate-400">Daily</span></li>
                      <li className="flex justify-between"><span>Lisinopril 10mg</span> <span className="text-slate-400">Daily</span></li>
                      <li className="flex justify-between"><span>Aspirin 81mg</span> <span className="text-slate-400">Daily</span></li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm opacity-70">
                     <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Discharge Instructions</h4>
                     <p className="text-sm text-slate-600">Patient is stable for transfer to rehabilitation facility. Follow up with Neurology in 2 weeks.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};