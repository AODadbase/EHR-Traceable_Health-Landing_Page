import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, BrainCircuit, Download } from 'lucide-react';

const GeometricSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Configuration - HUGE background and SLOWER
    // Responsive radius: larger on desktop
    const isMobile = width < 768;
    const baseRadius = isMobile ? 250 : 450; 
    const particleCount = isMobile ? 60 : 100;
    const connectionDistance = isMobile ? 180 : 300;
    const rotationSpeed = 0.0005; // Much slower

    // State
    let angleX = 0;
    let angleY = 0;

    interface Point3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }

    const points: Point3D[] = [];

    // Initialize points
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = baseRadius * Math.sin(phi) * Math.cos(theta);
      const y = baseRadius * Math.sin(phi) * Math.sin(theta);
      const z = baseRadius * Math.cos(phi);

      points.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.2, // Slower internal movement
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.2
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate entire system
      angleY += rotationSpeed;
      angleX += rotationSpeed * 0.5;

      const projectedPoints: {x: number, y: number, z: number}[] = [];

      points.forEach(point => {
        // Apply irregular movement (noise)
        point.x += point.vx;
        point.y += point.vy;
        point.z += point.vz;

        // Occasional jitter
        if (Math.random() < 0.01) {
             point.vx += (Math.random() - 0.5) * 0.05;
             point.vy += (Math.random() - 0.5) * 0.05;
             point.vz += (Math.random() - 0.5) * 0.05;
        }
        
        // Spring force
        const currentDist = Math.sqrt(point.x**2 + point.y**2 + point.z**2);
        const targetRadius = baseRadius;
        
        if (currentDist > targetRadius * 1.2) {
             point.vx -= point.x * 0.0005;
             point.vy -= point.y * 0.0005;
             point.vz -= point.z * 0.0005;
        } else if (currentDist < targetRadius * 0.5) {
             point.vx += point.x * 0.0005;
             point.vy += point.y * 0.0005;
             point.vz += point.z * 0.0005;
        }

        // 3D Rotation
        let y1 = point.y * Math.cos(angleX) - point.z * Math.sin(angleX);
        let z1 = point.y * Math.sin(angleX) + point.z * Math.cos(angleX);

        let x2 = point.x * Math.cos(angleY) - z1 * Math.sin(angleY);
        let z2 = point.x * Math.sin(angleY) + z1 * Math.cos(angleY);

        // Perspective
        const fov = 1000; // Flatter field of view for background
        const scale = fov / (fov + z2 + 500); 
        const x2d = x2 * scale + centerX;
        const y2d = y1 * scale + centerY;

        projectedPoints.push({ x: x2d, y: y2d, z: z2 });
      });

      // Draw Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = 1 - dist / connectionDistance;
            
            // Faint blue lines for background
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.3})`; 
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      points.forEach((_, i) => {
          const p = projectedPoints[i];
          ctx.beginPath();
          const size = Math.max(1, (1000 / (1000 + p.z + 500)) * 3); 
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          
          // Blue nodes
          ctx.fillStyle = `rgba(37, 99, 235, ${0.5})`; 
          ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        if(canvas) {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
       <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center scroll-mt-28">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white opacity-70"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* 3D Animation Background - Positioned absolutely to cover section */}
      <GeometricSphere />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
            EHR Data Pipeline & Intelligence
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-5xl"
        >
          We turn static PDF patient records into
          <span className="text-blue-600 block mt-2">Searchable, Structured Summaries</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed bg-white/30 backdrop-blur-sm rounded-xl p-2"
        >
          Patient transfers involve hundreds of pages of unsearchable documents. 
          Our pipeline ingests raw PDFs, analyzes clinical data points, and delivers 
          instant, accurate insights to the bedside.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20"
        >
          <a href="/download.txt" download className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group">
            Download
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Quick Stats/Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full max-w-5xl relative z-20"
        >
          {[
            { icon: FileSearch, title: "Unstructured to Structured", desc: "Ingest PDF transfer packets from any hospital system." },
            { icon: BrainCircuit, title: "Clinical Analysis", desc: "Identify meds, labs, and imaging automatically." },
            { icon: FileSearch, title: "Smart Search", desc: "Find 'Last MRI report' instantly within the document." },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};