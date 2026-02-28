import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileSearch, BrainCircuit, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface GeometricSphereProps {
  onLongRelease: () => void;
}

const GeometricSphere: React.FC<GeometricSphereProps> = ({ onLongRelease }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  const onLongReleaseRef = useRef(onLongRelease);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);
  useEffect(() => { onLongReleaseRef.current = onLongRelease; }, [onLongRelease]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width  = canvas.width  = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const isMobile           = width < 768;
    const baseRadius         = isMobile ? 250 : 450;
    const particleCount      = isMobile ? 60  : 100;
    const baseConnectionDist = isMobile ? 180 : 300;
    const rotationSpeed      = 0.0005;
    const LONG_HOLD_MS       = 5000;

    // mouse
    let mouseX      = width / 2;
    let mouseY      = height / 2;
    let isMouseDown = false;
    let mouseDownStartTime = 0;

    // animation state
    let sizeMultiplier = 1.0;   // 1→0.25 (hold), 1→2→1 (long release)
    let rotationMult   = 1.0;   // 1→0 on hold, restores on release
    let expandPhase    = false;
    let expandTimer    = 0;
    let lastTimestamp  = 0;

    let angleX    = 0;
    let angleY    = 0;
    let frameCount = 0;

    interface Point3D {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      dx: number; dy: number;
    }

    const points: Point3D[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos((Math.random() * 2) - 1);
      points.push({
        x: baseRadius * Math.sin(phi) * Math.cos(theta),
        y: baseRadius * Math.sin(phi) * Math.sin(theta),
        z: baseRadius * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.2,
        dx: 0, dy: 0,
      });
    }

    let animationId: number;

    const animate = (timestamp: number) => {
      const dt = lastTimestamp
        ? Math.min((timestamp - lastTimestamp) / 1000, 0.05)
        : 0.016;
      lastTimestamp = timestamp;

      ctx.clearRect(0, 0, width, height);
      frameCount++;

      const centerX = width  / 2;
      const centerY = height / 2;
      const dark    = isDarkRef.current;

      // ── State machine ──────────────────────────────────────────
      if (isMouseDown) {
        const heldSec = (performance.now() - mouseDownStartTime) / 1000;
        const t = Math.min(heldSec / 5, 1);
        sizeMultiplier = 1.0 - 0.75 * t;   // 1.0 → 0.25 over 5 s
        rotationMult   = 0;                  // stop rotation immediately
      } else if (expandPhase) {
        expandTimer += dt;
        if (expandTimer < 2.5) {
          sizeMultiplier = 1.0 + (expandTimer / 2.5);         // 1→2 in 2.5 s (gentle)
        } else if (expandTimer < 8.5) {
          sizeMultiplier = 2.0 - ((expandTimer - 2.5) / 6.0); // 2→1 in 6 s (slow settle)
        } else {
          sizeMultiplier = 1.0;
          expandPhase    = false;
        }
        rotationMult = Math.min(1.0, rotationMult + dt * 0.3);
      } else {
        // Quick restore after short hold
        if (sizeMultiplier < 1.0) {
          sizeMultiplier = Math.min(1.0, sizeMultiplier + dt * 2.5);
        }
        rotationMult = Math.min(1.0, rotationMult + dt * 0.6);
      }

      angleY += rotationSpeed * rotationMult;
      angleX += rotationSpeed * 0.5 * rotationMult;

      // Sphere radius and connection distance scale with sizeMultiplier
      const clampedSize     = Math.max(0.25, Math.min(sizeMultiplier, 2.0));
      const dynamicRadius   = baseRadius * clampedSize;
      const dynamicConnDist = baseConnectionDist * Math.min(clampedSize, 1.2);

      const projectedPoints: { x: number; y: number; z: number }[] = [];

      points.forEach(point => {
        // During hold: damp 3D velocity so sphere "freezes" while 2D pull takes over
        // During expand: gentle damping so burst doesn't pop wildly
        if (isMouseDown) {
          point.vx *= 0.97;
          point.vy *= 0.97;
          point.vz *= 0.97;
        } else if (expandPhase) {
          point.vx *= 0.96;
          point.vy *= 0.96;
          point.vz *= 0.96;
        }

        point.x += point.vx;
        point.y += point.vy;
        point.z += point.vz;

        if (Math.random() < 0.01) {
          point.vx += (Math.random() - 0.5) * 0.05;
          point.vy += (Math.random() - 0.5) * 0.05;
          point.vz += (Math.random() - 0.5) * 0.05;
        }

        // Sphere boundary — contracts/expands with sizeMultiplier
        const currentDist = Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
        if (currentDist > dynamicRadius * 1.15) {
          point.vx -= point.x * 0.002;
          point.vy -= point.y * 0.002;
          point.vz -= point.z * 0.002;
        } else if (currentDist < dynamicRadius * 0.5 && !isMouseDown) {
          point.vx += point.x * 0.001;
          point.vy += point.y * 0.001;
          point.vz += point.z * 0.001;
        }

        // Rotate
        const y1 = point.y * Math.cos(angleX) - point.z * Math.sin(angleX);
        const z1 = point.y * Math.sin(angleX) + point.z * Math.cos(angleX);
        const x2 = point.x * Math.cos(angleY) - z1 * Math.sin(angleY);
        const z2 = point.x * Math.sin(angleY) + z1 * Math.cos(angleY);

        const fov   = 1000;
        const scale = fov / (fov + z2 + 500);
        let x2d = x2 * scale + centerX;
        let y2d = y1 * scale + centerY;

        // ── 2D attraction toward mouse while holding ──
        if (isMouseDown) {
          const tdx   = mouseX - x2d;
          const tdy   = mouseY - y2d;
          const angle = Math.atan2(tdy, tdx);
          point.dx += Math.cos(angle) * 1.5;
          point.dy += Math.sin(angle) * 1.5;
        }

        point.dx *= 0.88;
        point.dy *= 0.88;
        x2d += point.dx;
        y2d += point.dy;

        projectedPoints.push({ x: x2d, y: y2d, z: z2 });
      });

      // ── Draw connections ──
      ctx.lineWidth = Math.max(0.2, clampedSize * 0.8);
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          const ddx  = p1.x - p2.x;
          const ddy  = p1.y - p2.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < dynamicConnDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = 1 - dist / dynamicConnDist;
            if (dark) {
              const baseHue = ((i + j) * 3 + frameCount * 0.15) % 360;
              const hue     = 240 + (baseHue / 360) * 160;
              ctx.strokeStyle = `hsla(${hue % 360}, 70%, 40%, ${alpha * 0.5})`;
            } else {
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.3})`;
            }
            ctx.stroke();
          }
        }
      }

      // ── Draw nodes (base 6 px so 1/4 shrink is clearly visible) ──
      points.forEach((_, i) => {
        const p        = projectedPoints[i];
        const baseSize = Math.max(0.5, (1000 / (1000 + p.z + 500)) * 6);
        const size     = Math.max(0.2, baseSize * clampedSize);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        if (dark) {
          const baseHue = (i * 7 + frameCount * 0.2) % 360;
          const hue     = 240 + (baseHue / 360) * 160;
          ctx.fillStyle = `hsla(${hue % 360}, 75%, 45%, 0.8)`;
        } else {
          ctx.fillStyle = `rgba(37, 99, 235, 0.5)`;
        }
        ctx.fill();
      });

      // ── Hold progress ring (so user knows hold is registering) ──
      if (isMouseDown) {
        const heldSec  = (performance.now() - mouseDownStartTime) / 1000;
        const progress = Math.min(heldSec / 10, 1);
        const ringR    = 28;

        // background track
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
        ctx.lineWidth   = 2.5;
        ctx.stroke();

        // progress arc
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, ringR, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
        ctx.strokeStyle = dark ? 'rgba(255,255,255,0.85)' : 'rgba(37,99,235,0.85)';
        ctx.lineWidth   = 2.5;
        ctx.stroke();

        // center dot
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.7)' : 'rgba(37,99,235,0.7)';
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    // ── Event handlers ──────────────────────────────────────────
    const handleResize = () => {
      if (canvas) {
        width  = canvas.width  = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };

    const isInHero = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return (
        clientX >= rect.left && clientX <= rect.right &&
        clientY >= rect.top  && clientY <= rect.bottom
      );
    };

    const getPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Don't intercept interactive elements
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (['a', 'button', 'input', 'select', 'textarea'].includes(tag)) return;
      if (!isInHero(e.clientX, e.clientY)) return;

      const pos = getPos(e.clientX, e.clientY);
      mouseX = pos.x;
      mouseY = pos.y;
      isMouseDown      = true;
      mouseDownStartTime = performance.now();
      expandPhase      = false;
      expandTimer      = 0;
      // Reset 2D offsets so dots start fresh
      points.forEach(p => { p.dx = 0; p.dy = 0; });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getPos(e.clientX, e.clientY);
      mouseX = pos.x;
      mouseY = pos.y;
    };

    const handleMouseUp = () => {
      if (!isMouseDown) return;
      const heldMs = performance.now() - mouseDownStartTime;
      isMouseDown  = false;

      if (heldMs >= LONG_HOLD_MS) {
        // Long hold: expand burst + title change
        expandPhase = true;
        expandTimer = 0;
        points.forEach(p => {
          const dist = Math.sqrt(p.x ** 2 + p.y ** 2 + p.z ** 2);
          if (dist > 0) {
            p.vx += (p.x / dist) * 1.5;
            p.vy += (p.y / dist) * 1.5;
            p.vz += (p.z / dist) * 1.5;
          }
          p.dx = 0; p.dy = 0; // clear 2D offsets
        });
        onLongReleaseRef.current?.();
      } else {
        // Short hold: spring back — give each particle an outward nudge
        points.forEach(p => {
          const dist = Math.sqrt(p.x ** 2 + p.y ** 2 + p.z ** 2);
          if (dist > 0) {
            p.vx += (p.x / dist) * 1.5;
            p.vy += (p.y / dist) * 1.5;
            p.vz += (p.z / dist) * 1.5;
          }
          p.dx *= 0.3; p.dy *= 0.3; // quickly damp 2D offsets
        });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const pos   = getPos(touch.clientX, touch.clientY);
      mouseX = pos.x; mouseY = pos.y;
      isMouseDown        = true;
      mouseDownStartTime = performance.now();
      expandPhase = false; expandTimer = 0;
      points.forEach(p => { p.dx = 0; p.dy = 0; });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const pos   = getPos(touch.clientX, touch.clientY);
      mouseX = pos.x; mouseY = pos.y;
    };

    const handleTouchEnd = () => { handleMouseUp(); };

    window.addEventListener('mousedown',  handleMouseDown);
    window.addEventListener('mousemove',  handleMouseMove);
    window.addEventListener('mouseup',    handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove',  handleTouchMove,  { passive: true });
    window.addEventListener('touchend',   handleTouchEnd);
    window.addEventListener('resize',     handleResize);
    handleResize();
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousedown',  handleMouseDown);
      window.removeEventListener('mousemove',  handleMouseMove);
      window.removeEventListener('mouseup',    handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove',  handleTouchMove);
      window.removeEventListener('touchend',   handleTouchEnd);
      window.removeEventListener('resize',     handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

// Shared framer-motion variants for the pixel-dissolve title transition
const titleVariants = {
  initial: { opacity: 0, filter: 'blur(16px)', scale: 1.04 },
  animate: { opacity: 1, filter: 'blur(0px)',  scale: 1    },
  exit:    { opacity: 0, filter: 'blur(16px)', scale: 0.96 },
};
const titleTransition = { duration: 0.55, ease: 'easeInOut' as const };

export const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const [titleVersion, setTitleVersion] = useState(0);

  // Simply toggle title — AnimatePresence handles the blur transition
  const handleLongRelease = useCallback(() => {
    setTitleVersion((v: number) => (v + 1) % 2);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center scroll-mt-28">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-950/50 via-slate-950 to-slate-950 opacity-70" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white opacity-70" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />
          </>
        )}
      </div>

      <GeometricSphere onLongRelease={handleLongRelease} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm border ${
            isDark
              ? 'bg-purple-950/50 border-purple-800/50 text-purple-300'
              : 'bg-blue-50 border-blue-100 text-blue-600'
          }`}>
            EHR Data Pipeline & Intelligence
          </span>
        </motion.div>

        {/* Title — AnimatePresence handles pixel-dissolve on version toggle */}
        <div className="max-w-5xl w-full mb-10 min-h-[12rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {titleVersion === 0 ? (
              <motion.h1
                key="v0"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={titleTransition}
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                We turn static PDF patient records into
                <span className={`block mt-2 ${isDark ? 'rainbow-text' : 'text-blue-600'}`}>
                  Searchable, Structured Summaries
                </span>
              </motion.h1>
            ) : (
              <motion.div
                key="v1"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={titleTransition}
                className="w-full"
              >
                <div className={`text-xl sm:text-2xl font-light mb-4 tracking-wide ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Hundreds of pages. Unsearchable.
                </div>
                <div className={`text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight ${
                  isDark ? 'rainbow-text' : 'text-blue-600'
                }`}>
                  One instant answer.
                </div>
                <div className={`text-xl sm:text-2xl font-light mb-8 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Clinical intelligence, at the bedside.
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                  {['Searchable records', 'Structured summaries', 'Bedside delivery'].map(tag => (
                    <span key={tag} className={`px-5 py-2 rounded-full text-sm font-semibold border ${
                      isDark
                        ? 'border-slate-600 text-slate-300 bg-slate-800/60'
                        : 'border-blue-200 text-blue-700 bg-blue-50'
                    }`}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20"
        >
          <a
            href="/download.txt"
            download
            className={`px-8 py-4 rounded-lg font-semibold text-sm transition-all shadow-xl flex items-center justify-center gap-2 group ${
              isDark
                ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-600/20'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            Download
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full max-w-5xl relative z-20"
        >
          {[
            { icon: FileSearch,   title: 'Unstructured to Structured', desc: 'Ingest PDF transfer packets from any hospital system.' },
            { icon: BrainCircuit, title: 'Clinical Analysis',          desc: 'Identify meds, labs, and imaging automatically.'      },
            { icon: FileSearch,   title: 'Smart Search',               desc: "Find 'Last MRI report' instantly within the document." },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-6 backdrop-blur-sm border rounded-2xl shadow-sm hover:shadow-md transition-shadow ${
                isDark ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white/80 border-slate-100'
              }`}
            >
              <div className={`p-3 rounded-xl mb-4 ${
                isDark ? 'bg-purple-900/50 text-purple-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <item.icon size={24} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {item.title}
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
