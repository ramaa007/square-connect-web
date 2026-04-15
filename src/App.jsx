import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Menu, X, Landmark, Calculator, ShieldCheck, Home, Cpu, Banknote, 
  ArrowRight, CheckCircle, Shield, Lock, Zap, Plus, 
  Compass, Network, Rocket, Heart, UserCheck, Quote, ChevronRight
} from 'lucide-react';

// --- DATA STRATEGY (AUDITED & COMPLETE) ---
const engines = [
  { id: "01", icon: Landmark, label: "LENDING", title: "EXPERT LENDING", desc: "Finding the right home loan for your dreams.", span: "col-span-2 md:col-span-1", img: "service-01.png" },
  { id: "02", icon: Calculator, label: "ACCOUNTING", title: "WEALTH SAVING", desc: "Managing your money and staying compliant.", span: "col-span-2 md:col-span-1", img: "service-02.png" },
  { id: "03", icon: ShieldCheck, label: "LEGAL", title: "FAMILY SHIELD", desc: "Protecting your business and your family's future.", span: "col-span-2", img: "service-03.png" },
  { id: "04", icon: Home, label: "ESTATE", title: "GROWTH PATH", desc: "Expert help with buying and managing property.", span: "col-span-2 md:col-span-1", img: "service-04.png" },
  { id: "05", icon: Cpu, label: "DIGITAL", title: "MODERN EDGE", desc: "Updating your business for the modern world.", span: "col-span-2 md:col-span-1", img: "service-05.png" },
  { id: "06", icon: Banknote, label: "FINANCE", title: "BUSINESS FUNDS", desc: "Unlocking cash to grow your business further.", span: "col-span-2", img: "service-06.png" },
];

const testimonials = [
  { quote: "Having my home loan and tax plan in one place saved me so much time. It's a total game-changer for us.", name: "Omkar Solanki", title: "Portfolio Growth" },
  { quote: "Bhavin knows what business owners need. He handled the experts so we could just focus on growing the company.", name: "Harshad Patel", title: "Business Expansion" },
  { quote: "The expert help we got here was amazing. Finally, every part of our financial life is speaking the same language.", name: "Jaydip Tank", title: "Investment Success" },
  { quote: "10/10 recommended. Square Connect doesn't just provide help; they build a solid foundation for your future.", name: "Maulin Parikh", title: "Master Architect Trust" }
];

const faqs = [
  { q: "Do I need to use all 6 services?", a: "No, you can utilize the specific engines you need right now. The bridge remains ready whenever you are ready to scale." },
  { q: "How do you charge for this?", a: "We provide complete transparency during our strategic consult based on the specific architectural requirements of your plan." },
  { q: "Will I still have control over my decisions?", a: "Absolutely. We provide the architecture and the experts, but you are always the final decision-maker." }
];

// --- HELPER COMPONENTS ---
const Reveal = ({ children, delay = 0, y = 40, x = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.33, 1, 0.68, 1] }}
  >
    {children}
  </motion.div>
);

const Counter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.5 });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={nodeRef} className="tabular-nums font-serif-display">{count}{suffix}</span>;
};

// --- MAIN APPLICATION ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  
  const navTextColor = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.45, 0.6, 0.8], ["#1A1A1A", "#1A1A1A", "#F5F5F5", "#1A1A1A", "#F5F5F5", "#1A1A1A"]);
  const glassBg = useTransform(scrollYProgress, [0, 0.1], ["rgba(245,245,245,0.3)", "rgba(245,245,245,0.85)"]);

  return (
    <div className="bg-[#F5F5F5] text-[#1A1A1A] font-sans selection:bg-[#C8A24A] selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-serif-display { font-family: 'Instrument Serif', serif; }
        .gold-glow { filter: drop-shadow(0 0 20px rgba(200, 162, 74, 0.4)); }
        
        /* Steady Parallax Windows */
        .parallax-window { position: relative; height: 60vh; md:height: 80vh; overflow: hidden; clip-path: inset(0 0 0 0); }
        .parallax-fixed-content { position: fixed; inset: 0; height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: -1; pointer-events: none; }
        .parallax-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

        /* Curtain Footer Reveal Architecture */
        .reveal-footer-container { position: relative; z-index: 30; background: #F5F5F5; box-shadow: 0 50px 150px rgba(0,0,0,0.6); margin-bottom: 0; }
        .sticky-footer { position: sticky; bottom: 0; z-index: 10; height: auto; }
        
        .arch-texture { background-image: linear-gradient(rgba(26, 26, 26, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 26, 26, 0.03) 1px, transparent 1px); background-size: 100px 100px; }
        .cube-container { perspective: 1500px; }
        .bubble-tip { position: absolute; bottom: -16px; left: 30px; md:left: 56px; width: 32px; height: 32px; background: #F5F5F5; border-right: 1px solid rgba(26, 26, 26, 0.05); border-bottom: 1px solid rgba(26, 26, 26, 0.05); transform: rotate(45deg); }
        
        .glass-nav { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.15); }
        
        @keyframes linear-flow { 0% { offset-distance: 0%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
        .energy-pulse { animation: linear-flow 6s infinite linear; }
        
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 45s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow 60s linear infinite reverse; }
      `}</style>

      {/* INDEPENDENT LOGO (MOBILE RESPONSIVE, ALWAYS VISIBLE) */}
      <div className="fixed top-4 left-4 md:top-12 md:left-12 z-[110]">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-24 h-24 md:w-[180px] md:h-[180px]">
          <img src="logo.gif" alt="Square Connect" className="w-full h-full object-contain" style={{ background: 'transparent' }} />
        </motion.div>
      </div>

      {/* FROZEN GLASS HEADER MENU */}
      <div className="fixed top-6 right-4 md:top-12 md:right-12 z-[110]">
        <motion.div style={{ background: glassBg }} className="glass-nav px-4 md:px-10 py-3 md:py-5 rounded-full flex items-center gap-4 md:gap-10 shadow-2xl">
          <div className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.4em] uppercase font-black">
            <motion.a style={{ color: navTextColor }} href="#home" className="hover:text-[#C8A24A] transition-all">Home</motion.a>
            <motion.a style={{ color: navTextColor }} href="#transformation" className="hover:text-[#C8A24A] transition-all">Services</motion.a>
            <motion.a style={{ color: navTextColor }} href="#founder" className="hover:text-[#C8A24A] transition-all">Founder</motion.a>
          </div>
          <button className="md:hidden text-[#1A1A1A] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:block w-px h-6 bg-black/10 mx-2" />
          <a href="#contact" className="px-5 md:px-8 py-2 md:py-3 bg-[#C8A24A] text-[#1A1A1A] text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all shadow-xl rounded-full md:rounded-none">PORTAL</a>
        </motion.div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[105] bg-[#F5F5F5] flex flex-col items-center justify-center p-10 md:hidden"
          >
            <div className="flex flex-col gap-12 text-center">
              {['Home', 'Services', 'Founder', 'Connect'].map((item) => (
                <a key={item} href={`#${item.toLowerCase() === 'home' ? 'home' : item.toLowerCase() === 'services' ? 'transformation' : item.toLowerCase()}`} 
                   onClick={() => setIsMenuOpen(false)}
                   className="font-serif-display text-5xl uppercase tracking-tighter text-[#1A1A1A]">{item}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="reveal-footer-container">
        
        {/* 1. HERO - 100% VISIBLE BG & ORIGINAL BRANDING */}
        <header id="home" className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden bg-[#F5F5F5]">
          <div className="absolute inset-0 z-0">
             <img src="hero-bg.png" alt="" className="w-full h-full object-cover opacity-100" />
          </div>
          
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <Reveal>
                <div className="text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] font-black text-[#1A1A1A]/30 mb-8 uppercase">OUR SIMPLE PHILOSOPHY</div>
                <h1 className="font-serif-display text-6xl md:text-7xl lg:text-[140px] leading-[0.9] md:leading-[0.85] tracking-tighter uppercase mb-12 md:mb-16">
                  <span className="text-[#1A1A1A] block leading-none">ONE PLAN.</span>
                  <span className="text-[#C8A24A] italic font-light lowercase leading-none">one result.</span>
                </h1>
                <div className="mt-8">
                  <a href="#transformation" className="px-10 md:px-16 py-6 md:py-8 bg-[#C8A24A] text-[#1A1A1A] text-[10px] md:text-xs font-black tracking-[0.4em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all shadow-2xl">EXPLORE THE BRIDGE</a>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-5 flex justify-center relative scale-75 md:scale-100">
               <div className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px]">
                  <div className="absolute inset-0 border border-[#1A1A1A]/5 rounded-full animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] bg-white border border-black/5 rounded-full flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                        {/* Original Branding Logic: Square + Text */}
                        <div className="text-center">
                           <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#1A1A1A] mx-auto mb-6 flex items-center justify-center bg-white gold-glow relative">
                              <div className="w-3 h-3 md:w-4 md:h-4 bg-[#C8A24A] rounded-full" />
                           </div>
                           <h2 className="font-serif-display text-5xl md:text-7xl uppercase leading-none text-[#1A1A1A] tracking-tighter">Square</h2>
                           <div className="text-[9px] md:text-[11px] tracking-[0.6em] text-[#C8A24A] font-black uppercase mt-1">CONNECT</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* 2. STEADY PARALLAX WINDOW 1 */}
        <section className="parallax-window">
           <div className="parallax-fixed-content">
              <img src="parallax-1.png" className="parallax-image" alt="" />
              <div className="absolute inset-0 bg-black/85" />
              <div className="relative z-10 text-center px-6">
                <Reveal y={60}>
                  <h2 className="font-serif-display text-4xl md:text-[140px] tracking-tighter uppercase font-bold text-white leading-none">FROM FRAGMENTATION<br />TO STRUCTURE.</h2>
                  <div className="mt-8 md:mt-12 text-[#C8A24A] text-[10px] md:text-[11px] tracking-[1.5em] md:tracking-[2em] font-black uppercase">MASTER ARCHITECTURE</div>
                </Reveal>
              </div>
           </div>
        </section>

        {/* 3. PROBLEM SECTION */}
        <section className="py-24 md:py-64 bg-[#F5F5F5] relative z-10 shadow-2xl border-y border-black/5">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-left">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-end mb-24 md:mb-40 reveal">
              <div>
                <div className="text-[10px] md:text-[11px] tracking-[0.4em] font-black text-[#1A1A1A]/30 mb-6 uppercase">THE PROBLEM</div>
                <h2 className="font-serif-display text-6xl md:text-9xl tracking-tight leading-[0.9] text-[#1A1A1A]">It's hard to do<br />it yourself.</h2>
              </div>
              <div className="max-w-xl"><p className="text-[#1A1A1A]/50 text-xl md:text-2xl font-light leading-relaxed border-l-2 border-[#C8A24A]/40 pl-8 md:pl-12 italic">Managing six different specialists on your own is exhausting. The traditional system is fundamentally broken.</p></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {["TOO MANY MEETINGS", "NO COMMUNICATION", "UNNECESSARY RISK"].map((t, idx) => (
                <div key={idx} className="relative p-10 md:p-16 bg-white border border-[#1A1A1A]/5 hover:border-[#C8A24A]/40 transition-all duration-700 group overflow-hidden shadow-sm hover:shadow-2xl">
                  <div className="absolute top-4 left-6 font-serif-display text-[100px] md:text-[140px] text-[#1A1A1A]/5 italic leading-none pointer-events-none">0{idx+1}</div>
                  <div className="relative z-10 mt-12 md:mt-20">
                    <h3 className="text-[12px] md:text-[13px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mb-8 md:mb-10 text-[#1A1A1A]">{t}</h3>
                    <p className="text-sm md:text-base text-[#1A1A1A]/40 leading-relaxed font-light">Disconnected advice leads to structural failures. One master plan eliminates the noise.</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#C8A24A] group-hover:w-full transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. THE LIVE BRIDGE (SLOW LINEAR PULSE) */}
        <section id="transformation" className="min-h-[120vh] md:min-h-[180vh] py-24 md:py-56 bg-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute inset-0 z-0"><img src="transformation-bg.png" alt="" className="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" /></div>
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-left">
            <div className="text-center mb-24 md:mb-40 reveal">
               <span className="text-[10px] md:text-[11px] tracking-[1em] uppercase text-[#C8A24A] font-black mb-12 block">THE TRANSFORMATION</span>
               <h2 className="font-serif-display text-6xl md:text-9xl lg:text-[140px] leading-[0.9] md:leading-[0.8] tracking-tighter text-[#1A1A1A] uppercase">One Source.<br /><span className="text-[#C8A24A] italic font-light lowercase leading-none">The Bridge.</span></h2>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-start">
              <div className="lg:col-span-7 bg-[#F5F5F5]/40 backdrop-blur-sm border-2 border-[#1A1A1A]/5 p-4 md:p-24 shadow-2xl relative flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 700 700" className="w-full h-auto max-w-[700px] relative z-10">
                  <defs>
                    {engines.map((e, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180);
                        const x2 = 350 + Math.cos(angle) * 260;
                        const y2 = 350 + Math.sin(angle) * 260;
                        return <path key={`path-${i}`} id={`linear-path-${i}`} d={`M 350 350 L ${x2} ${y2}`} />;
                    })}
                  </defs>
                  {engines.map((e, i) => {
                    const angle = (i * 60 - 90) * (Math.PI / 180);
                    const x = 350 + Math.cos(angle) * 260;
                    const y = 350 + Math.sin(angle) * 260;
                    return (
                      <g key={i}>
                        <line x1="350" y1="350" x2={x} y2={y} stroke="#C8A24A" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.25" />
                        <circle r="6" fill="#C8A24A" className="energy-pulse shadow-xl" style={{ offsetPath: `path('M 350 350 L ${x} ${y}')`, animationDelay: `${i * 1.0}s` }} />
                        <motion.circle whileHover={{ scale: 1.1 }} cx={x} cy={y} r="55" fill="white" stroke="#C8A24A" strokeWidth="1" className="shadow-2xl cursor-pointer" />
                        <text x={x} y={y + 5} textAnchor="middle" fill="#1A1A1A" fontSize="10" fontWeight="900" className="pointer-events-none uppercase tracking-tighter">{e.label}</text>
                      </g>
                    );
                  })}
                  <foreignObject x="305" y="305" width="90" height="90">
                    <div className="w-full h-full flex items-center justify-center bg-transparent rounded-full overflow-hidden">
                        <img src="logo.gif" alt="Core" className="w-full h-full object-contain" />
                    </div>
                  </foreignObject>
                </svg>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 md:pt-10">
                {engines.map((e, i) => (
                  <div key={i} className="p-10 md:p-12 border border-[#1A1A1A]/5 bg-white transition-all hover:border-[#C8A24A] hover:translate-x-4 shadow-sm group">
                    <h3 className="font-serif-display text-4xl md:text-5xl mb-4 uppercase group-hover:text-[#1A1A1A] leading-none">{e.title}</h3>
                    <p className="text-sm md:text-[15px] text-[#1A1A1A]/40 font-light leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. METHODOLOGY */}
        <section id="methodology" className="py-20 md:py-56 bg-[#F5F5F5] border-b border-[#1A1A1A]/5 relative z-10 shadow-2xl text-left">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-left">
            <Reveal>
               <span className="text-[10px] md:text-[11px] tracking-[0.6em] uppercase text-[#C8A24A] font-black mb-8 block">OUR METHODOLOGY</span>
               <h2 className="font-serif-display text-5xl md:text-8xl lg:text-[130px] leading-[0.9] md:leading-[0.8] tracking-tighter mb-8 md:mb-10 text-[#1A1A1A]">Architecting Growth.</h2>
               <p className="text-[#1A1A1A]/50 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">A meticulous 3-step process to total clarity and absolute speed.</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-12 md:gap-24 mt-20 md:mt-32">
              {[
                { id: "01", t: "STRATEGIC CONSULT", d: "We map out your exact goals and identify the missing links in your current financial structure." },
                { id: "02", t: "UNIFIED BLUEPRINT", d: "Our experts across all six engines sync together to create one powerful, unified growth plan." },
                { id: "03", t: "EXECUTION", d: "We handle the meetings and paperwork in the background, delivering only the finalized results to you." }
              ].map((step, i) => (
                <div key={i} className="reveal group text-left" style={{ transitionDelay: `${i * 200}ms` }}>
                   <div className="text-[12px] md:text-[14px] font-black tracking-[0.3em] text-[#C8A24A] mb-8 block text-left">0{step.id}</div>
                   <h3 className="text-xl md:text-[16px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mb-8 text-[#1A1A1A] group-hover:text-[#C8A24A] transition-colors duration-700">{step.t}</h3>
                   <p className="text-sm text-[#1A1A1A]/50 leading-relaxed font-light max-w-xs">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. STEADY PARALLAX WINDOW 2 */}
        <section className="parallax-window">
           <div className="parallax-fixed-content">
              <img src="parallax-2.png" className="parallax-image" alt="" />
              <div className="absolute inset-0 bg-black/85" />
              <div className="relative z-10 text-center px-6">
                <Reveal y={60}>
                  <h2 className="font-serif-display text-4xl md:text-5xl lg:text-[140px] tracking-tighter uppercase font-bold text-white leading-none">BEYOND FRAGMENTATION<br /><span className="text-[#C8A24A] italic font-light lowercase capitalize leading-none opacity-80 text-6xl md:text-[100px]">Unified Execution.</span></h2>
                </Reveal>
              </div>
           </div>
        </section>

        {/* 7. THE SYSTEM (LIFESTYLE VISUALS) */}
        <section id="system" className="min-h-[150vh] py-24 md:py-72 bg-white relative overflow-hidden flex flex-col justify-center z-10 shadow-2xl text-left">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-ink text-center max-w-4xl mx-auto mb-16 md:mb-32">
            <span className="text-[10px] md:text-[11px] tracking-[1em] uppercase text-[#C8A24A] font-black mb-8 block uppercase text-center">THE SYSTEM</span>
            <h2 className="font-serif-display text-5xl md:text-9xl lg:text-[120px] leading-[0.9] md:leading-[0.8] tracking-tighter mb-8 md:mb-10 text-[#1A1A1A] text-center">How We Operate.</h2>
            <p className="text-[#1A1A1A]/40 text-lg md:text-xl font-light leading-relaxed uppercase tracking-[0.4em] text-center">Engineered for speed and absolute precision.</p>
          </div>
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 space-y-24 md:space-y-72 mt-10 md:mt-32 relative z-10">
              {[
                { id: "01", t: "STRATEGIC CONSULT", d: "The foundation ensuring every step forward is aligned with your vision. We audit the gaps and missing structural links.", img: "system-01.png", side: "right" },
                { id: "02", t: "UNIFIED BLUEPRINT", d: "Experts across all six engines sync to create one architecture. Every decision cascades seamlessly through your financial setup.", img: "system-02.png", side: "left" },
                { id: "03", t: "EXECUTION", d: "Paperwork and management in the background. Your focus stays on high-impact growth and family protection.", img: "system-03.png", side: "right" }
              ].map((step, idx) => (
                <div key={idx} className={`grid md:grid-cols-2 gap-12 lg:gap-40 items-center reveal ${step.side === 'left' ? 'md:flex-row-reverse' : ''} text-left`}>
                  <div className="text-left">
                    <div className="font-serif-display text-7xl md:text-[120px] text-[#C8A24A]/20 mb-4 leading-none">0{step.id}</div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 md:mb-8 text-[#1A1A1A]">{step.t}</h3>
                    <p className="text-[#1A1A1A]/50 text-base md:text-xl leading-relaxed font-light italic border-l-2 border-[#C8A24A]/40 pl-6 md:pl-12">{step.d}</p>
                  </div>
                  <div className={`w-full aspect-[4/3] bg-[#F5F5F5] border border-[#1A1A1A]/10 relative group overflow-hidden shadow-2xl`}>
                     <img src={step.img} alt={step.t} className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/10 transition-all duration-700" />
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* 8. IMPACT STATS */}
        <section className="py-24 md:py-44 bg-[#1A1A1A] relative overflow-hidden text-center border-b border-white/5">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
              {[
                { v: 150, s: "+", l: "FAMILIES SERVED", i: Heart },
                { v: 6, s: "", l: "SPECIALIZED ENGINES", i: Zap },
                { v: 1, s: "", l: "SINGLE CONTACT", i: UserCheck }
              ].map((s, i) => (
                <div key={i} className="text-center p-12 md:p-16 border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#C8A24A]/40 transition-all duration-700 group shadow-xl">
                  <div className="flex justify-center mb-10"><s.i size={44} className="text-[#C8A24A]/40 group-hover:text-[#C8A24A] transition-colors" /></div>
                  <div className="font-serif-display text-7xl lg:text-[130px] text-[#C8A24A] mb-6 leading-none text-center"><Counter end={s.v} suffix={s.s} /></div>
                  <p className="text-[10px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-black text-white/30 group-hover:text-white/60 transition-colors text-center text-ink">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. THE ECOSYSTEM (BENTO GRID WITH HOVER BACKGROUNDS) */}
        <section id="ecosystem" className="py-24 md:py-72 bg-[#F5F5F5] relative overflow-hidden z-10 shadow-2xl border-y border-black/5 text-left">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-center mb-24 md:mb-40 reveal text-center">
            <span className="text-[10px] md:text-[11px] tracking-[1.2em] text-[#C8A24A] font-black block mb-12 uppercase text-center">OUR CAPABILITIES</span>
            <h2 className="font-serif-display text-7xl md:text-[140px] tracking-tighter uppercase leading-[0.8] text-[#1A1A1A] text-center">The Ecosystem.</h2>
          </div>
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 auto-rows-fr text-left">
            {engines.map((engine, i) => (
              <motion.div key={i} className={`${engine.span} relative group bg-white border border-[#1A1A1A]/5 p-12 md:p-16 transition-all duration-700 hover:shadow-2xl overflow-hidden flex flex-col justify-between text-left`}>
                <div className="absolute inset-0 z-0">
                    <img src={engine.img} alt="" className="w-full h-full object-cover opacity-0 group-hover:opacity-30 group-hover:scale-110 grayscale transition-all duration-1000" />
                    <div className="absolute inset-0 bg-white opacity-100 group-hover:opacity-70 transition-opacity duration-700" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between text-left">
                  <div>
                    <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#C8A24A]/30 flex items-center justify-center mb-10 md:mb-16 bg-[#C8A24A]/5 group-hover:bg-[#C8A24A] transition-all duration-500">
                      <engine.icon size={24} strokeWidth={1} className="text-[#C8A24A] group-hover:text-white" />
                    </div>
                    <h3 className="font-serif-display text-5xl md:text-6xl mb-4 md:mb-6 uppercase tracking-tighter leading-none text-[#1A1A1A]">{engine.label}</h3>
                    <p className="text-[10px] md:text-[11px] text-[#C8A24A] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] italic mb-8 md:mb-10">{engine.title}</p>
                  </div>
                  <p className="text-sm md:text-[15px] text-[#1A1A1A]/40 font-light leading-relaxed group-hover:text-ink transition-colors">{engine.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#C8A24A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 10. 3D VAULT (MOBILE SCALING) */}
        <section className="py-24 md:py-80 bg-[#1A1A1A] text-white relative overflow-hidden border-y border-white/5 text-left">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <Reveal x={-40}>
              <h2 className="font-serif-display text-5xl md:text-7xl lg:text-[100px] tracking-tight leading-[0.9] md:leading-[0.85] mb-12 md:mb-16 uppercase text-white text-left">Stop repeating<br />your story.</h2>
              <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed mb-12 md:mb-20 max-w-xl italic border-l border-[#C8A24A]/40 pl-6 md:pl-12 text-left">One secure vault. All domains perfectly in sync.</p>
              <ul className="space-y-8 md:space-y-10 text-left">
                {["Single secure data repository", "Expert coordination across engines", "Unified life-goal strategy"].map((text, i) => (
                  <li key={i} className="flex items-center gap-6 md:gap-8 group">
                    <div className="w-8 h-8 md:w-10 md:h-10 border border-[#C8A24A] flex items-center justify-center group-hover:bg-[#C8A24A] transition-all"><CheckCircle size={16} className="text-[#C8A24A] group-hover:text-black" /></div>
                    <span className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/50 group-hover:text-white transition-colors">{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="flex justify-center items-center py-12 md:py-20 relative scale-75 md:scale-110">
               <div className="cube-container relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                  <motion.div animate={{ rotateY: 360, rotateX: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-[#C8A24A]/20 flex items-center justify-center" />
                  <motion.div animate={{ rotateX: -360, rotateZ: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-16 md:inset-24 border-2 border-[#C8A24A]/40 flex items-center justify-center" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-32 h-32 md:w-56 md:h-56 bg-[#C8A24A]/10 border border-[#C8A24A]/60 flex items-center justify-center gold-glow backdrop-blur-3xl group cursor-pointer hover:scale-110 transition-all duration-700 shadow-[0_0_100px_rgba(200,162,74,0.1)]">
                        <Lock size={44} md:size={72} strokeWidth={1} className="text-[#C8A24A]" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 11. FOUNDER SECTION */}
        <section id="founder" className="py-20 md:py-[30vh] bg-[#F5F5F5] border-t border-[#1A1A1A]/5 relative z-10 shadow-2xl text-ink text-left">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-12 md:gap-48 items-center text-left">
            <Reveal x={-50}>
              <div className="relative w-full max-w-md aspect-[4/5] bg-[#1A1A1A] border border-white/5 p-8 md:p-12 flex flex-col justify-end shadow-3xl group overflow-hidden">
                <img src="founder-bhavin.png" alt="Bhavin Patel" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-80 z-10" />
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none z-0">
                  <span className="font-serif-display text-[25rem] md:text-[45rem] text-[#C8A24A] leading-none transform translate-y-10 md:translate-y-20 -translate-x-10 uppercase">B</span>
                </div>
                <div className="relative z-20 text-left">
                  <span className="text-[9px] md:text-[10px] tracking-[0.8em] uppercase text-[#C8A24A] font-black block mb-6 md:mb-10 text-left text-ink">THE MASTER ARCHITECT</span>
                  <h2 className="font-serif-display text-6xl md:text-8xl text-white uppercase leading-[0.9] md:leading-[0.85] tracking-tighter">BHAVIN<br />PATEL.</h2>
                </div>
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 md:w-24 md:h-24 border-r border-b border-white/20 group-hover:border-[#C8A24A]/40 transition-colors duration-700 z-20" />
              </div>
            </Reveal>
            <div className="reveal text-left">
              <span className="text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] text-[#C8A24A] font-black block mb-8 md:mb-16 uppercase">JOIN THE NETWORK</span>
              <h2 className="font-serif-display text-5xl md:text-8xl lg:text-[110px] tracking-tighter uppercase leading-[0.9] md:leading-[0.8] font-bold mb-12 md:mb-20 text-[#1A1A1A]">
                <span className="text-[#C8A24A] italic font-light lowercase capitalize leading-none block mb-2">Lead</span>
                WITH CONFIDENCE.
              </h2>
              <div className="relative mb-12 md:mb-20 pl-6 md:pl-16 border-l-2 border-[#C8A24A]/30">
                <p className="text-2xl md:text-4xl font-serif-display italic text-[#1A1A1A]/70 leading-relaxed font-light">"Bhavin started Square Connect because he believed financial help should be masterful, structure-led, and proactive."</p>
              </div>
              <a href="#contact" className="group inline-flex items-center gap-6 md:gap-10 text-[11px] md:text-[12px] tracking-[0.6em] md:tracking-[1em] uppercase text-[#1A1A1A] font-black border-b-2 border-black/10 pb-6 md:pb-8 hover:border-[#C8A24A] transition-all duration-500">
                LET'S CONNECT <ArrowRight size={24} className="text-[#C8A24A] transition-transform group-hover:translate-x-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 12. HAPPY CLIENTS (AUDITED FONT) */}
        <section id="results" className="py-24 md:py-64 bg-white border-t border-[#1A1A1A]/5 text-ink relative z-10 shadow-2xl">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-center mb-24 md:mb-40 reveal text-center">
            <span className="text-[10px] md:text-[11px] tracking-[1.5em] uppercase text-[#C8A24A] font-black mb-10 md:mb-12 block uppercase text-center">RESULTS</span>
            <h2 className="font-serif-display text-5xl md:text-8xl lg:text-[130px] tracking-tighter uppercase font-bold leading-none text-[#1A1A1A] text-center">Happy Clients.</h2>
          </div>
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-24 md:gap-y-40 text-left">
            {testimonials.map((test, i) => (
              <motion.div key={i} className="flex flex-col group">
                <div className="relative p-10 md:p-20 bg-[#F5F5F5] border border-[#1A1A1A]/5 shadow-xl transition-all duration-700 md:group-hover:shadow-2xl md:group-hover:-translate-y-4">
                  <div className="absolute top-8 right-8 text-[#C8A24A]/10 text-left"><Quote size={64} md:size={80} strokeWidth={1} /></div>
                  <p className="font-serif-display text-3xl md:text-5xl text-[#1A1A1A] relative z-10 leading-[1.2] mb-6 italic font-light text-left">
                    "{test.quote}"
                  </p>
                  <div className="bubble-tip text-left" />
                </div>
                <div className="flex items-center gap-8 md:gap-10 mt-12 md:mt-20 ml-6 md:ml-20">
                  <div className="relative w-16 h-16 md:w-28 md:h-28 rounded-full border-2 border-[#C8A24A]/30 overflow-hidden flex items-center justify-center bg-stone-100 group-hover:border-[#C8A24A] transition-all duration-500 shadow-2xl scale-110">
                    <img src={`client-${i+1}${i === 3 ? '.gif' : '.png'}`} alt={test.name} className="w-full h-full object-cover" />
                    <UserCheck className="absolute text-[#C8A24A] opacity-20" size={32} md:size={56} strokeWidth={1} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base md:text-xl font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#1A1A1A] text-left">{test.name}</h4>
                    <p className="text-[10px] text-[#C8A24A] uppercase font-black tracking-[0.4em] md:tracking-[0.6em] italic mt-2 md:mt-3 text-left">{test.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 13. OUR GUARANTEE */}
        <section id="guarantee" className="py-24 md:py-72 bg-[#1A1A1A] border-y border-white/5 relative overflow-hidden text-white z-0 shadow-2xl text-center">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-center">
            <Reveal>
              <span className="text-[10px] md:text-[11px] tracking-[1em] md:tracking-[1.5em] uppercase text-[#C8A24A] font-black mb-10 md:mb-12 block uppercase text-center">OUR GUARANTEE</span>
              <h2 className="font-serif-display text-5xl md:text-8xl lg:text-[130px] tracking-tighter uppercase font-bold leading-[1] mb-16 md:mb-24 text-center text-white">ZERO HIDDEN FEES.<br /><span className="italic font-light lowercase capitalize leading-none opacity-80 text-white text-center">Total Transparency.</span></h2>
            </Reveal>
            <div className="max-w-7xl mx-auto border-y border-white/10 py-16 md:py-32 mt-10 md:mt-16 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 text-center">
                {[
                  { lbl: "LICENSED", icn: CheckCircle }, { lbl: "VETTED", icn: Shield }, { lbl: "SECURE", icn: Lock }, { lbl: "DIRECT", icn: Zap }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center group text-center">
                    <item.icn size={44} md:size={64} strokeWidth={1} className="text-[#C8A24A] mb-8 md:mb-12 md:group-hover:scale-110 transition-transform duration-700" />
                    <span className="text-[9px] md:text-[13px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/50 group-hover:text-[#C8A24A] transition-all text-center">{item.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 md:mt-24 max-w-4xl mx-auto px-6 text-center">
               <p className="text-2xl md:text-4xl font-serif-display italic text-white/30 leading-relaxed font-light text-center">"Mastery-level architecture designed to protect and multiply your life's assets."</p>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section id="faq" className="py-20 md:py-56 bg-[#1A1A1A] border-t border-white/5 text-white text-left">
          <div className="container mx-auto max-w-4xl px-6 text-center mb-16 md:mb-32 text-center">
            <span className="text-[10px] md:text-[11px] tracking-[1.2em] md:tracking-[1.5em] uppercase text-[#C8A24A] font-black mb-10 block uppercase text-center">CLARITY</span>
            <h2 className="font-serif-display text-7xl lg:text-[130px] tracking-tighter uppercase text-white/95 leading-none text-center">Questions.</h2>
          </div>
          <div className="container mx-auto max-w-4xl px-6 space-y-4 text-left">
            {faqs.map((faq, i) => (
              <div key={i} className={`border border-white/10 transition-all duration-700 ${openFaq === i ? 'bg-white/5 border-[#C8A24A]/40' : 'bg-transparent'} text-left`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-10 flex justify-between items-center text-left hover:bg-white/5 transition-all">
                  <h4 className="text-base md:text-lg font-black uppercase tracking-[0.3em] pr-6 text-left">{faq.q}</h4>
                  <Plus className={`text-[#C8A24A] transition-transform duration-500 ${openFaq === i ? 'rotate-45 scale-125' : ''} text-left`} size={28} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-left">
                      <p className="px-12 pb-12 text-base md:text-lg text-white/40 leading-relaxed font-light italic border-l-2 border-[#C8A24A]/20 ml-12 text-left">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 15. FINAL STEP (LIGHT CURTAIN REVEALER) */}
        <section id="contact" className="py-24 md:py-[35vh] bg-[#F5F5F5] text-center border-b border-[#1A1A1A]/10 shadow-[0_100px_200px_rgba(0,0,0,0.6)] relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-20 hero-grid text-center" />
          <div className="container mx-auto max-w-6xl px-6 relative z-10 text-center">
            <Reveal>
              <span className="text-[10px] md:text-[12px] tracking-[1.5em] md:tracking-[2.5em] text-[#C8A24A] font-black block mb-12 md:mb-20 uppercase pl-4 md:pl-8 text-center text-ink">PRIVATE ACCESS</span>
              <h2 className="font-serif-display text-7xl lg:text-[220px] uppercase mb-12 md:mb-20 font-bold leading-none tracking-tighter text-[#1A1A1A] text-center">Final Step.</h2>
              <p className="text-2xl md:text-4xl lg:text-7xl font-serif-display text-[#C8A24A] mb-20 md:mb-40 italic font-light leading-snug text-center">Ready to build your bridge?<br />Secure your unified future now.</p>
              <form className="flex flex-col sm:flex-row gap-6 max-w-5xl mx-auto mb-20 text-center" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="YOUR EMAIL ADDRESS" required className="flex-1 bg-white border-2 border-black/10 px-8 md:px-16 py-6 md:py-10 text-base md:text-lg font-bold tracking-widest outline-none focus:border-[#C8A24A] transition-all rounded-none text-ink" />
                <button type="submit" className="bg-[#C8A24A] text-[#1A1A1A] px-10 md:px-24 py-6 md:py-10 text-[11px] md:text-[14px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase hover:bg-black hover:text-white transition-all duration-700 shadow-3xl text-center">REQUEST ACCESS</button>
              </form>
              <p className="text-[#1A1A1A]/30 text-[10px] md:text-[12px] tracking-[0.8em] md:tracking-[1.5em] font-black uppercase text-center">CONFIDENTIALITY ASSURED • ADVISORY COVERAGE</p>
            </Reveal>
          </div>
        </section>
      </div>

      {/* 16. FOOTER (STEADY BASE REVEALED) */}
      <footer className="sticky-footer py-24 md:py-32 bg-[#1A1A1A] text-white text-left">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid md:grid-cols-4 gap-24 text-white/90 relative z-10 text-left">
          <div className="col-span-1 text-left">
            <div className="w-24 md:w-32 h-24 md:h-32 mb-10 md:mb-16 text-left">
               <img src="logo.gif" alt="Square Connect" className="w-full h-full object-contain filter grayscale brightness-200 text-left" />
            </div>
            <p className="text-[10px] md:text-[11px] tracking-[0.8em] text-white/40 font-black uppercase leading-relaxed text-left">UNIFIED INTELLIGENCE<br />ADVISORY GROUP</p>
          </div>
          <div className="col-span-1 text-left">
            <h4 className="text-[12px] text-[#C8A24A] mb-12 font-black uppercase tracking-[0.5em] text-left">Office</h4>
            <p className="text-base text-white/40 leading-relaxed font-bold uppercase tracking-widest text-left">1644 Logan Road,<br />Mount Gravatt QLD 4122</p>
          </div>
          <div className="col-span-1 text-left">
            <h4 className="text-[12px] text-[#C8A24A] mb-12 font-black uppercase tracking-[0.5em] text-left">Channels</h4>
            <div className="flex flex-col gap-8 text-[11px] text-white/40 font-black tracking-[0.6em] uppercase font-bold text-left">
              <a href="#" className="hover:text-[#C8A24A] transition-all text-left">Mortgage Finance</a>
              <a href="#" className="hover:text-[#C8A24A] transition-all text-left">Tax & Accounting</a>
              <a href="#" className="hover:text-[#C8A24A] transition-all text-left">Legal Services</a>
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-between items-start md:items-end text-left md:text-right">
             <div className="flex gap-12 text-[11px] text-white/20 uppercase font-black tracking-[0.8em] mb-32 md:mb-0 text-left">
                <a href="#" className="hover:text-[#C8A24A] transition-all text-left">Privacy</a>
                <a href="#" className="hover:text-[#C8A24A] transition-all text-left">Terms</a>
             </div>
             <p className="text-[11px] text-white/10 uppercase font-black tracking-[0.4em] text-left">© 2026 SQUARE CONNECT ADVISORY GROUP</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
