import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Menu, X, Landmark, Calculator, ShieldCheck, Home, Cpu, Banknote, 
  ArrowRight, CheckCircle, Shield, Lock, Zap, Plus, 
  Compass, Network, Rocket, Heart, UserCheck, Quote, ChevronRight
} from 'lucide-react';

// --- DATA STRATEGY (AUDITED FROM YOUR UPLOADS) ---
const engines = [
  { id: "01", icon: Landmark, label: "LENDING", title: "EXPERT LENDING", desc: "Finding the right home loan for your dreams.", span: "col-span-2 md:col-span-1" },
  { id: "02", icon: Calculator, label: "ACCOUNTING", title: "WEALTH SAVING", desc: "Managing your money and staying compliant.", span: "col-span-2 md:col-span-1" },
  { id: "03", icon: ShieldCheck, label: "LEGAL", title: "FAMILY SHIELD", desc: "Protecting your business and your family's future.", span: "col-span-2" },
  { id: "04", icon: Home, label: "ESTATE", title: "GROWTH PATH", desc: "Expert help with buying and managing property.", span: "col-span-2 md:col-span-1" },
  { id: "05", icon: Cpu, label: "DIGITAL", title: "MODERN EDGE", desc: "Updating your business for the modern world.", span: "col-span-2 md:col-span-1" },
  { id: "06", icon: Banknote, label: "FINANCE", title: "BUSINESS FUNDS", desc: "Unlocking cash to grow your business further.", span: "col-span-2" },
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
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
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
  
  // Adaptive Colors for Nav based on Scroll positions
  const navTextColor = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.45, 0.6, 0.8], ["#1A1A1A", "#1A1A1A", "#F5F5F5", "#1A1A1A", "#F5F5F5", "#1A1A1A"]);
  const glassBg = useTransform(scrollYProgress, [0, 0.1], ["rgba(245,245,245,0.4)", "rgba(245,245,245,0.7)"]);

  return (
    <div className="bg-[#F5F5F5] text-[#1A1A1A] font-sans selection:bg-[#C8A24A] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        
        .font-serif-display { font-family: 'Instrument Serif', serif; }
        
        .hero-grid { background-image: radial-gradient(rgba(200, 162, 74, 0.12) 1px, transparent 1px); background-size: 50px 50px; }
        .gold-glow { filter: drop-shadow(0 0 20px rgba(200, 162, 74, 0.4)); }
        
        /* Steady Parallax - The Window Effect */
        .parallax-window { position: relative; height: 80vh; overflow: hidden; clip-path: inset(0 0 0 0); }
        .parallax-fixed-content { position: fixed; inset: 0; height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: -1; pointer-events: none; }
        .parallax-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

        /* Curtain Footer Architecture */
        .reveal-footer-container { position: relative; z-index: 30; background: #F5F5F5; box-shadow: 0 50px 150px rgba(0,0,0,0.5); }
        .sticky-footer { position: sticky; bottom: 0; z-index: 10; height: auto; }
        
        .arch-texture { background-image: linear-gradient(rgba(26, 26, 26, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 26, 26, 0.03) 1px, transparent 1px); background-size: 100px 100px; }
        .cube-container { perspective: 1500px; }
        .bubble-tip { position: absolute; bottom: -16px; left: 56px; width: 32px; height: 32px; background: #F5F5F5; border-right: 1px solid rgba(26, 26, 26, 0.05); border-bottom: 1px solid rgba(26, 26, 26, 0.05); transform: rotate(45deg); }
        
        .glass-nav { backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.2); }
      `}</style>

      {/* INDEPENDENT LOGO (1.5X BIGGER, DETACHED, ALWAYS VISIBLE) */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-[110]">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-32 h-32 md:w-[180px] md:h-[180px]">
          <img src="logo.gif" alt="Square Connect" className="w-full h-full object-contain" style={{ background: 'transparent' }} />
        </motion.div>
      </div>

      {/* FROZEN GLASS HEADER MENU (VISIBLE FROM FIRST SCROLL) */}
      <div className="fixed top-8 right-8 md:top-12 md:right-12 z-[110]">
        <motion.div 
          style={{ background: glassBg }}
          className="glass-nav px-10 py-5 rounded-full flex items-center gap-10 shadow-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.4em] uppercase font-black">
            <motion.a style={{ color: navTextColor }} href="#transformation" className="hover:text-[#C8A24A] transition-all">Services</motion.a>
            <motion.a style={{ color: navTextColor }} href="#founder" className="hover:text-[#C8A24A] transition-all">Founder</motion.a>
            <motion.a style={{ color: navTextColor }} href="#contact" className="hover:text-[#C8A24A] transition-all">Connect</motion.a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden md:block w-px h-6 bg-black/10 mx-2" />
          <a href="#contact" className="px-8 py-3 bg-[#C8A24A] text-[#1A1A1A] text-[10px] font-black tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-all shadow-xl">
            ACCESS PORTAL
          </a>
        </motion.div>
      </div>

      {/* CONTENT LAYER (THE CURTAIN THAT SLIDES OVER THE FOOTER) */}
      <div className="reveal-footer-container">
        
        {/* 1. HERO - AUDITED & MATCHED TO IMAGE 55b6c8 */}
        <header id="home" className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden hero-grid bg-[#F5F5F5]">
          <img src="hero-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none" />
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="text-[11px] tracking-[0.6em] font-black text-[#1A1A1A]/30 mb-8 uppercase text-left">OUR SIMPLE PHILOSOPHY</div>
                <h1 className="font-serif-display text-7xl md:text-[140px] leading-[0.85] tracking-tighter uppercase mb-16 text-left">
                  <span className="text-[#1A1A1A] block">ONE PLAN.</span>
                  <span className="text-[#C8A24A] italic font-light lowercase">one result.</span>
                </h1>
                <div className="mt-12 text-left">
                  <a href="#transformation" className="px-16 py-8 bg-[#C8A24A] text-[#1A1A1A] text-xs font-black tracking-[0.4em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 shadow-2xl">EXPLORE THE BRIDGE</a>
                </div>
              </Reveal>
            </div>
            
            {/* The Logo Circle Visualization from Image 55b6c8 */}
            <div className="lg:col-span-5 flex justify-center relative">
               <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
                  <div className="absolute inset-0 border border-[#1A1A1A]/5 rounded-full animate-spin-slow" />
                  <div className="absolute inset-[10%] border border-[#1A1A1A]/5 rounded-full animate-spin-slow-reverse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-64 h-64 md:w-[350px] md:h-[350px] bg-white border border-black/5 rounded-full flex items-center justify-center shadow-[0_50px_100px_rgba(0,0,0,0.05)]">
                        <div className="text-center">
                           <div className="w-16 h-16 border-2 border-[#1A1A1A] mx-auto mb-6 flex items-center justify-center bg-white gold-glow">
                              <div className="w-4 h-4 bg-[#C8A24A] rounded-full" />
                           </div>
                           <h2 className="font-serif-display text-6xl uppercase leading-none text-[#1A1A1A]">Square</h2>
                           <div className="text-[11px] tracking-[0.5em] text-[#C8A24A] font-black uppercase">CONNECT</div>
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
                  <h2 className="font-serif-display text-5xl md:text-[140px] tracking-tighter uppercase font-bold text-white leading-none">FROM FRAGMENTATION<br />TO STRUCTURE.</h2>
                  <div className="mt-12 text-[#C8A24A] text-[11px] tracking-[2em] font-black uppercase">MASTER ARCHITECT</div>
                </Reveal>
              </div>
           </div>
        </section>

        {/* 3. PROBLEM SECTION (BEYOND FRAGMENTATION) */}
        <section className="py-32 lg:py-64 bg-[#F5F5F5] relative z-10">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-24 items-end mb-40 reveal">
              <div>
                <div className="text-[11px] tracking-[0.4em] font-black text-[#1A1A1A]/30 mb-6 uppercase">THE PROBLEM</div>
                <h2 className="font-serif-display text-7xl md:text-9xl tracking-tight leading-[0.85] text-[#1A1A1A]">It's hard to do<br />it yourself.</h2>
              </div>
              <div className="max-w-xl"><p className="text-[#1A1A1A]/50 text-2xl font-light leading-relaxed border-l-2 border-[#C8A24A]/40 pl-12 italic">Managing six different specialists on your own is exhausting and slows down your success. The traditional system is broken.</p></div>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { t: "TOO MANY MEETINGS", d: "Time is lost coordinating disparate calendars instead of executing your wealth strategy." },
                { t: "NO COMMUNICATION", d: "Experts working in silos create gaps in your protection and tax architecture." },
                { t: "UNNECESSARY RISK", d: "Fragmented advice leads to structural failures. One master plan eliminates the noise." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-16 bg-white border border-[#1A1A1A]/5 hover:border-[#C8A24A]/40 transition-all duration-700 group overflow-hidden shadow-sm hover:shadow-2xl">
                  <div className="absolute top-4 left-6 font-serif-display text-[140px] text-[#1A1A1A]/5 italic leading-none pointer-events-none">0{idx+1}</div>
                  <div className="relative z-10 mt-20">
                    <h3 className="text-[13px] font-black tracking-[0.4em] uppercase mb-10 text-[#1A1A1A]">{item.t}</h3>
                    <p className="text-base text-[#1A1A1A]/40 leading-relaxed font-light">{item.d}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#C8A24A] group-hover:w-full transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. THE BRIDGE / TRANSFORMATION */}
        <section id="transformation" className="min-h-[180vh] py-32 lg:py-56 bg-white border-y border-[#1A1A1A]/5 relative overflow-hidden flex flex-col justify-center arch-texture">
          <img src="transformation-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none" />
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
            <div className="text-center mb-40 reveal">
               <span className="text-[11px] tracking-[1em] uppercase text-[#C8A24A] font-black mb-12 block uppercase">THE TRANSFORMATION</span>
               <h2 className="font-serif-display text-8xl md:text-9xl lg:text-[140px] leading-[0.8] tracking-tighter text-[#1A1A1A] uppercase">One Source.<br /><span className="text-[#C8A24A] italic font-light lowercase leading-none">The Bridge.</span></h2>
            </div>
            <div className="grid lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-7 bg-[#F5F5F5] border-2 border-[#1A1A1A]/5 p-8 md:p-24 shadow-2xl relative flex items-center justify-center h-[600px] md:h-[900px]">
                <svg width="700" height="700" viewBox="0 0 700 700" className="w-full h-full">
                  {engines.map((e, i) => {
                    const angle = (i * 60 - 90) * (Math.PI / 180);
                    const x = 350 + Math.cos(angle) * 260;
                    const y = 350 + Math.sin(angle) * 260;
                    return (
                      <g key={i}>
                        <line x1="350" y1="350" x2={x} y2={y} stroke="#C8A24A" strokeWidth="1" strokeDasharray="6 12" opacity="0.3" />
                        <motion.circle whileHover={{ scale: 1.1 }} cx={x} cy={y} r="52" fill="white" stroke="#C8A24A" strokeWidth="1" className="shadow-2xl cursor-pointer" />
                        <text x={x} y={y + 5} textAnchor="middle" fill="#1A1A1A" fontSize="9" fontWeight="bold" className="pointer-events-none">{e.label}</text>
                      </g>
                    );
                  })}
                  <circle cx="350" cy="350" r="65" fill="#1A1A1A" className="gold-glow" />
                  <text x="350" y="358" textAnchor="middle" fill="#C8A24A" fontSize="14" fontWeight="900" letterSpacing="4">YOU</text>
                </svg>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-8 pt-10">
                {engines.map((e, i) => (
                  <div key={i} className="p-12 border border-[#1A1A1A]/5 bg-white transition-all hover:border-[#C8A24A] hover:translate-x-6 shadow-sm group">
                    <h3 className="font-serif-display text-5xl mb-6 uppercase group-hover:text-[#1A1A1A] leading-none">{e.title}</h3>
                    <p className="text-[15px] text-[#1A1A1A]/40 font-light leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. STEADY PARALLAX WINDOW 2 */}
        <section className="parallax-window">
           <div className="parallax-fixed-content">
              <img src="parallax-2.png" className="parallax-image" alt="" />
              <div className="absolute inset-0 bg-black/85" />
              <div className="relative z-10 text-center px-6">
                <Reveal y={60}>
                  <h2 className="font-serif-display text-5xl md:text-[140px] tracking-tighter uppercase font-bold text-white leading-none">BEYOND FRAGMENTATION<br /><span className="text-[#C8A24A] italic font-light lowercase capitalize leading-none">Unified Execution.</span></h2>
                  <div className="mt-12 text-[#C8A24A] text-[10px] tracking-[1.5em] font-black uppercase opacity-60">SIX ENGINES • ONE ARCHITECTURE</div>
                </Reveal>
              </div>
           </div>
        </section>

        {/* 6. THE SYSTEM (LIFESTYLE) */}
        <section id="system" className="min-h-[150vh] py-32 lg:py-[20vh] bg-white relative overflow-hidden flex flex-col justify-center z-10 shadow-2xl">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-ink text-center max-w-4xl mx-auto mb-32">
            <span className="text-[11px] tracking-[1em] uppercase text-[#C8A24A] font-black mb-8 block uppercase">THE SYSTEM</span>
            <h2 className="font-serif-display text-7xl md:text-9xl lg:text-[120px] leading-[0.8] tracking-tighter mb-10 text-[#1A1A1A]">How We Operate.</h2>
            <p className="text-[#1A1A1A]/40 text-xl md:text-2xl font-light leading-relaxed uppercase tracking-[0.4em]">Engineered for speed and absolute precision.</p>
          </div>
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 space-y-48 lg:space-y-72 mt-32 relative z-10">
              {[
                { id: "01", t: "STRATEGIC CONSULT", d: "The foundation ensuring every step forward is aligned with your vision. We audit the gaps and missing structural links.", img: "system-01.png", side: "right" },
                { id: "02", t: "UNIFIED BLUEPRINT", d: "Experts across all six engines sync to create one architecture. Every decision cascades seamlessly through your financial setup.", img: "system-02.png", side: "left" },
                { id: "03", t: "EXECUTION", d: "Paperwork and management in the background. Your focus stays on high-impact growth and family protection.", img: "system-03.png", side: "right" }
              ].map((step, idx) => (
                <div key={idx} className={`grid md:grid-cols-2 gap-24 lg:gap-40 items-center reveal ${step.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
                  <div className={step.side === 'left' ? 'md:order-2' : ''}>
                    <div className="font-serif-display text-[120px] text-[#C8A24A]/20 mb-4 leading-none">0{step.id}</div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-8 text-[#1A1A1A]">{step.t}</h3>
                    <p className="text-[#1A1A1A]/50 text-xl leading-relaxed font-light italic border-l-2 border-[#C8A24A]/40 pl-12">{step.d}</p>
                  </div>
                  <div className={`w-full aspect-[4/3] bg-[#F5F5F5] border border-[#1A1A1A]/10 relative group overflow-hidden shadow-2xl ${step.side === 'left' ? 'md:order-1' : ''}`}>
                     <img src={step.img} alt={step.t} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700" />
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* 7. ECOSYSTEM (BENTO GRID CAPABILITIES) */}
        <section id="ecosystem" className="py-32 lg:py-72 bg-[#F5F5F5] relative overflow-hidden z-10 shadow-2xl">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-center mb-40 reveal">
            <span className="text-[11px] tracking-[1.2em] text-[#C8A24A] font-black block mb-12 uppercase">OUR CAPABILITIES</span>
            <h2 className="font-serif-display text-7xl md:text-[140px] tracking-tighter uppercase leading-[0.8] text-[#1A1A1A]">The Ecosystem.</h2>
          </div>
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr">
            {engines.map((engine, i) => (
              <motion.div 
                key={i} 
                className={`${engine.span} relative group bg-white border border-[#1A1A1A]/5 p-16 transition-all duration-700 hover:shadow-[0_80px_100px_-30px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-between`}
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-16 h-16 border-2 border-[#C8A24A]/30 flex items-center justify-center mb-16 bg-[#C8A24A]/5 group-hover:bg-[#C8A24A] transition-all duration-500">
                      <engine.icon size={28} strokeWidth={1} className="text-[#C8A24A] group-hover:text-white" />
                    </div>
                    <h3 className="font-serif-display text-6xl mb-6 uppercase tracking-tighter leading-none text-[#1A1A1A]">{engine.label}</h3>
                    <p className="text-[11px] text-[#C8A24A] font-black uppercase tracking-[0.5em] italic mb-10">{engine.title}</p>
                  </div>
                  <p className="text-[15px] text-[#1A1A1A]/40 font-light leading-relaxed group-hover:text-[#1A1A1A] transition-colors">{engine.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#C8A24A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. 3D VAULT (DATA EXCLUSIVITY) */}
        <section className="py-32 lg:py-80 bg-[#1A1A1A] text-white relative overflow-hidden border-y border-white/5">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-24 items-center">
            <Reveal x={-40}>
              <h2 className="font-serif-display text-7xl md:text-[100px] tracking-tight leading-[0.85] mb-16 uppercase text-white">Stop repeating<br />your story.</h2>
              <p className="text-white/40 text-2xl font-light leading-relaxed mb-20 max-w-xl italic border-l border-[#C8A24A]/40 pl-12">One secure vault. All domains perfectly in sync.</p>
              <ul className="space-y-10">
                {["Single secure data repository", "Expert coordination across engines", "Unified life-goal strategy"].map((text, i) => (
                  <li key={i} className="flex items-center gap-8 group">
                    <div className="w-10 h-10 border border-[#C8A24A] flex items-center justify-center group-hover:bg-[#C8A24A] transition-all duration-500 shadow-2xl"><CheckCircle size={18} className="text-[#C8A24A] group-hover:text-black" /></div>
                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/50 group-hover:text-white transition-colors">{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="flex justify-center items-center py-20 relative scale-110">
               <div className="cube-container relative w-80 h-80 md:w-[500px] md:h-[500px]">
                  <motion.div animate={{ rotateY: 360, rotateX: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-[#C8A24A]/20 flex items-center justify-center" />
                  <motion.div animate={{ rotateX: -360, rotateZ: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-20 border-2 border-[#C8A24A]/40 flex items-center justify-center" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-32 h-32 md:w-56 md:h-56 bg-[#C8A24A]/10 border border-[#C8A24A]/60 flex items-center justify-center gold-glow backdrop-blur-3xl group cursor-pointer hover:scale-110 transition-all duration-700 shadow-[0_0_100px_rgba(200,162,74,0.1)]">
                        <Lock size={72} strokeWidth={1} className="text-[#C8A24A]" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 9. FOUNDER SECTION (MATCHED TO IMAGE be1465) */}
        <section id="founder" className="py-28 lg:py-64 bg-[#F5F5F5] border-t border-[#1A1A1A]/5 relative z-10 shadow-2xl text-ink">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-20 lg:gap-48 items-center">
            <Reveal x={-50}>
              <div className="relative w-full max-w-md aspect-[4/5] bg-[#1A1A1A] border border-white/5 p-12 flex flex-col justify-end shadow-3xl group overflow-hidden">
                <img src="founder-bhavin.png" alt="Bhavin Patel" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-80 z-10" />
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none z-0">
                  <span className="font-serif-display text-[45rem] text-[#C8A24A] leading-none transform translate-y-20 -translate-x-10 uppercase">B</span>
                </div>
                <div className="relative z-20 text-left">
                  <span className="text-[10px] tracking-[0.8em] uppercase text-[#C8A24A] font-black block mb-10">THE MASTER ARCHITECT</span>
                  <h2 className="font-serif-display text-8xl text-white uppercase leading-[0.85] tracking-tighter">BHAVIN<br />PATEL.</h2>
                </div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-white/20 group-hover:border-[#C8A24A]/40 transition-colors duration-700 z-20" />
              </div>
            </Reveal>
            <div className="reveal text-left">
              <span className="text-[11px] tracking-[0.5em] text-[#C8A24A] font-black block mb-16 uppercase">JOIN THE NETWORK</span>
              <h2 className="font-serif-display text-7xl lg:text-[110px] tracking-tighter uppercase leading-[0.8] font-bold mb-20 text-[#1A1A1A]">
                <span className="text-[#C8A24A] italic font-light lowercase capitalize leading-none block mb-2">Lead</span>
                WITH CONFIDENCE.
              </h2>
              <div className="relative mb-20 pl-16 border-l-2 border-[#C8A24A]/30">
                <p className="text-3xl md:text-4xl font-serif-display italic text-[#1A1A1A]/70 leading-relaxed font-light">"Bhavin started Square Connect because he believed financial help should be masterfully structured, easy and proactive."</p>
              </div>
              <a href="#contact" className="group inline-flex items-center gap-10 text-[12px] tracking-[1em] uppercase text-[#1A1A1A] font-black border-b-2 border-black/10 pb-8 hover:border-[#C8A24A] transition-all duration-500">
                LET'S CONNECT <ArrowRight size={24} className="text-[#C8A24A] transition-transform group-hover:translate-x-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 10. HAPPY CLIENTS (POPUP CARDS) */}
        <section id="results" className="py-24 lg:py-64 bg-white border-t border-[#1A1A1A]/5 text-ink relative z-10 shadow-2xl">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-center mb-40 reveal">
            <span className="text-[11px] tracking-[1.5em] uppercase text-[#C8A24A] font-black mb-12 block uppercase">RESULTS</span>
            <h2 className="font-serif-display text-7xl md:text-[110px] lg:text-[130px] tracking-tighter uppercase font-bold leading-none text-[#1A1A1A]">Happy Clients.</h2>
          </div>
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid md:grid-cols-2 gap-x-20 gap-y-40">
            {testimonials.map((test, i) => (
              <motion.div key={i} className="flex flex-col group">
                <div className="relative p-16 lg:p-20 bg-[#F5F5F5] border border-[#1A1A1A]/5 shadow-xl transition-all duration-700 group-hover:shadow-[0_100px_100px_-40px_rgba(0,0,0,0.1)] group-hover:-translate-y-4">
                  <div className="absolute top-10 right-10 text-[#C8A24A]/10"><Quote size={80} strokeWidth={1} /></div>
                  
                  {/* Testimonial - Reverted to Clean Serif per your instruction */}
                  <p className="font-serif-display text-4xl md:text-5xl text-[#1A1A1A] relative z-10 leading-[1.2] mb-6 italic font-light">
                    "{test.quote}"
                  </p>
                  <div className="bubble-tip" />
                </div>
                <div className="flex items-center gap-10 mt-20 ml-20">
                  <div className="relative w-28 h-28 rounded-full border-2 border-[#C8A24A]/30 overflow-hidden flex items-center justify-center bg-stone-100 group-hover:border-[#C8A24A] transition-all duration-500 shadow-2xl scale-110">
                    <img src={`client-${i+1}.png`} alt={test.name} className="w-full h-full object-cover" />
                    <UserCheck className="absolute text-[#C8A24A] opacity-20" size={56} strokeWidth={1} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-black uppercase tracking-[0.3em] text-[#1A1A1A]">{test.name}</h4>
                    <p className="text-[11px] text-[#C8A24A] uppercase font-black tracking-[0.6em] italic mt-3">{test.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 11. OUR GUARANTEE (ICON GRID MATCHED TO c81493) */}
        <section id="guarantee" className="py-32 lg:py-72 bg-[#1A1A1A] border-y border-white/5 relative overflow-hidden text-white z-0 shadow-2xl">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-center">
            <Reveal>
              <span className="text-[11px] tracking-[1.5em] uppercase text-[#C8A24A] font-black mb-12 block uppercase">OUR GUARANTEE</span>
              <h2 className="font-serif-display text-6xl md:text-9xl lg:text-[130px] tracking-tighter uppercase font-bold leading-[1] mb-24">ZERO HIDDEN FEES.<br /><span className="italic font-light lowercase capitalize leading-none opacity-80 text-white">Total Transparency.</span></h2>
            </Reveal>
            <div className="max-w-7xl mx-auto border-y border-white/10 py-32 mt-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
                {[
                  { lbl: "LICENSED", icn: CheckCircle },
                  { lbl: "VETTED", icn: Shield },
                  { lbl: "SECURE", icn: Lock },
                  { lbl: "DIRECT", icn: Zap }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center group">
                    <item.icn size={64} strokeWidth={1} className="text-[#C8A24A] mb-12 group-hover:scale-110 transition-transform duration-700" />
                    <span className="text-[13px] font-black uppercase tracking-[0.6em] text-white/50 group-hover:text-[#C8A24A] transition-all">{item.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-24 max-w-4xl mx-auto px-6">
              <p className="text-3xl md:text-4xl font-serif-display italic text-white/30 leading-relaxed font-light">"We align our success directly with yours. Mastery-level architecture designed to protect and multiply your assets."</p>
            </div>
          </div>
        </section>

        {/* 12. FINAL STEP (THE LIGHT CURTAIN REVEALER) */}
        <section id="contact" className="py-32 lg:py-[35vh] bg-[#F5F5F5] text-center border-b border-[#1A1A1A]/10 shadow-[0_100px_200px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 hero-grid" />
          <div className="container mx-auto max-w-6xl px-6 relative z-10">
            <Reveal>
              <span className="text-[12px] tracking-[2.5em] text-[#C8A24A] font-black block mb-20 uppercase pl-8">PRIVATE ACCESS</span>
              <h2 className="font-serif-display text-8xl lg:text-[220px] uppercase mb-20 font-bold leading-none tracking-tighter text-[#1A1A1A]">Final Step.</h2>
              <p className="text-4xl lg:text-7xl font-serif-display text-[#C8A24A] mb-40 italic font-light leading-snug">Ready to build your bridge?<br />Secure your unified future now.</p>
              <form className="flex flex-col sm:flex-row gap-8 max-w-5xl mx-auto mb-20" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="YOUR EMAIL ADDRESS" required className="flex-1 bg-white border-2 border-black/10 px-16 py-10 text-lg font-bold tracking-widest outline-none focus:border-[#C8A24A] transition-all rounded-none" />
                <button type="submit" className="bg-[#C8A24A] text-[#1A1A1A] px-24 py-10 text-[14px] font-black tracking-[0.6em] uppercase hover:bg-black hover:text-white transition-all duration-700 shadow-3xl">REQUEST ACCESS</button>
              </form>
              <p className="text-[#1A1A1A]/30 text-[12px] tracking-[1.5em] font-black uppercase">CONFIDENTIALITY ASSURED • ADVISORY COVERAGE</p>
            </Reveal>
          </div>
        </section>
      </div>

      {/* 13. FOOTER (STEADY BASE REVEALED AS CURTAIN ABOVE LIFTS) */}
      <footer className="sticky-footer py-32 bg-[#1A1A1A] text-white">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid md:grid-cols-4 gap-24 text-white/90 relative z-10">
          <div className="col-span-1">
            <div className="w-32 h-32 mb-16">
               <img src="logo.gif" alt="Square Connect" className="w-full h-full object-contain filter grayscale brightness-200" />
            </div>
            <p className="text-[11px] tracking-[0.8em] text-white/40 font-black uppercase leading-relaxed text-left">UNIFIED INTELLIGENCE<br />ADVISORY GROUP</p>
          </div>
          <div className="col-span-1 text-left">
            <h4 className="text-[12px] text-[#C8A24A] mb-12 font-black uppercase tracking-[0.5em]">Office</h4>
            <p className="text-base text-white/40 leading-relaxed font-bold uppercase tracking-widest">1644 Logan Road,<br />Mount Gravatt QLD 4122</p>
          </div>
          <div className="col-span-1 text-left">
            <h4 className="text-[12px] text-[#C8A24A] mb-12 font-black uppercase tracking-[0.5em]">Channels</h4>
            <div className="flex flex-col gap-8 text-[11px] text-white/40 font-black tracking-[0.6em] uppercase font-bold">
              <a href="#" className="hover:text-[#C8A24A] transition-all">Mortgage Finance</a>
              <a href="#" className="hover:text-[#C8A24A] transition-all">Tax & Accounting</a>
              <a href="#" className="hover:text-[#C8A24A] transition-all">Legal Services</a>
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-between items-start md:items-end text-left md:text-right">
             <div className="flex gap-12 text-[11px] text-white/20 uppercase font-black tracking-[0.8em] mb-32 md:mb-0">
                <a href="#" className="hover:text-[#C8A24A] transition-all">Privacy</a>
                <a href="#" className="hover:text-[#C8A24A] transition-all">Terms</a>
             </div>
             <p className="text-[11px] text-white/10 uppercase font-black tracking-[0.4em]">© 2026 SQUARE CONNECT ADVISORY GROUP</p>
          </div>
        </div>
      </footer>
    </div>
  );
}