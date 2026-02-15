import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Code, LineChart, Cpu } from 'lucide-react';

const teamMembers = [
  {
    name: "Kelly Brennan, MS",
    role: "CI MED",
    bio: "MS in Computational and Mathematical Engineering from Stanford University. Leading clinical strategy and medical validation.",
    image: "/images/kelly.jpg"
  },
  {
    name: "George Wang",
    role: "UIUC CS",
    bio: "UI/UX Design & Frontend Development. Crafting the landing page and ensuring a seamless, responsive application interface.",
    image: "/images/george.jpg"
  },
  {
    name: "Keshav Trikha",
    role: "UIUC CS",
    bio: "Data Engineering Lead. Architecting the backend infrastructure and implementing advanced AI categorization logic.",
    image: "/images/keshav.png"
  },
  {
    name: "Arjun Marwah",
    role: "UIUC Gies Business",
    bio: "Specializing in Finance and Marketing. Orchestrating business strategy, growth initiatives, and market positioning.",
    image: "/images/arjun.jpg"
  },
  {
    name: "Junseong Lee",
    role: "UIUC CS",
    bio: "Human Interaction Design & AI Research Engineer. Bridging the gap between complex algorithms and intuitive user experiences.",
    image: "/images/junseong.png"
  }
];

const missionStats = [
  { label: "Pages Analyzed", value: "50k+" },
  { label: "Hospitals", value: "12" },
  { label: "Accuracy", value: "99.8%" },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden relative scroll-mt-16">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[5%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] -right-[5%] w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">Who We Are</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Built by Experts.<br/>Driven by Impact.</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We are a multidisciplinary team of engineers, clinicians, and strategists uniting to solve the interoperability crisis in healthcare.
            </p>
          </motion.div>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Target, title: "Our Mission", desc: "To empower clinicians with instant access to the full patient story, eliminating data blindness during critical care transitions.", color: "blue" },
            { icon: Users, title: "The Problem", desc: "Fragmented legacy systems force doctors to scroll through hundreds of PDF pages to find a single lab result.", color: "indigo" },
            { icon: Lightbulb, title: "Our Solution", desc: "Proprietary ingestion pipelines combining advanced OCR with clinical LLMs to structure data that others leave behind.", color: "emerald" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-blue-100 transition-all"
            >
              <div className={`bg-${item.color}-50 w-14 h-14 rounded-xl flex items-center justify-center text-${item.color}-600 mb-6`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Meet the Team</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Zig-Zag Team Layout */}
        <div className="space-y-20">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="flex-1 w-full max-w-md">
                <div className="relative group">
                  <div className={`absolute inset-0 bg-blue-600 rounded-[2rem] rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500 ${index % 2 === 1 ? '-rotate-6 group-hover:-rotate-3' : ''}`}></div>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] bg-slate-200">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="flex-1 text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                   Team Member 0{index + 1}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-xl text-blue-600 font-medium mb-6">{member.role}</p>
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                  {member.bio}
                </p>
                
                {/* Decorative Line */}
                <div className={`w-12 h-1 bg-slate-200 mt-8 mx-auto md:mx-0 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};