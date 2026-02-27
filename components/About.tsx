import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Code, LineChart, Cpu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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
  const { isDark } = useTheme();

  return (
    <section id="about" className={`py-24 border-t overflow-hidden relative scroll-mt-16 ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute top-[10%] -left-[5%] w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-purple-900/20' : 'bg-blue-100/50'}`}></div>
        <div className={`absolute bottom-[10%] -right-[5%] w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-indigo-900/20' : 'bg-indigo-100/50'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-semibold tracking-wide uppercase text-sm mb-2 ${isDark ? 'text-purple-400' : 'text-blue-600'}`}>Who We Are</h2>
            <h3 className={`text-3xl md:text-5xl font-bold mb-6 ${isDark ? '' : 'text-slate-900'}`}>
              <span className={isDark ? 'rainbow-text' : ''}>Built by Experts.</span>
              {isDark ? <br /> : <br />}
              <span className={isDark ? 'text-slate-100' : ''}>Driven by Impact.</span>
            </h3>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
              className={`backdrop-blur-sm p-8 rounded-2xl shadow-lg border transition-all ${
                isDark
                  ? 'bg-slate-800/80 shadow-slate-900/50 border-slate-700 hover:border-purple-700/50'
                  : 'bg-white/80 shadow-slate-200/50 border-slate-100 hover:border-blue-100'
              }`}
            >
              <div className={`bg-${item.color}-50 w-14 h-14 rounded-xl flex items-center justify-center text-${item.color}-600 mb-6`}>
                <item.icon size={28} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{item.title}</h3>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Meet the Team</h2>
          <div className={`w-20 h-1 mx-auto mt-4 rounded-full ${isDark ? 'bg-purple-600' : 'bg-blue-600'}`}></div>
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
                  <div className={`absolute inset-0 rounded-[2rem] rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500 ${
                    index % 2 === 1 ? '-rotate-6 group-hover:-rotate-3' : ''
                  } ${isDark ? 'bg-purple-600' : 'bg-blue-600'}`}></div>
                  <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="flex-1 text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                  index % 2 === 1 ? 'md:ml-auto' : ''
                } ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-blue-50 text-blue-700'}`}>
                   Team Member 0{index + 1}
                </div>
                <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{member.name}</h3>
                <p className={`text-xl font-medium mb-6 ${isDark ? 'text-purple-400' : 'text-blue-600'}`}>{member.role}</p>
                <p className={`text-lg leading-relaxed max-w-lg mx-auto md:mx-0 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {member.bio}
                </p>

                {/* Decorative Line */}
                <div className={`w-12 h-1 mt-8 mx-auto md:mx-0 ${
                  index % 2 === 1 ? 'md:ml-auto' : ''
                } ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
