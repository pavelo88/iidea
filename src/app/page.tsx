import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Server, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Building2,
  Package,
  ShoppingCart,
  Factory,
  Landmark,
  Settings2,
  Compass,
  Wrench,
  Layers
} from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { 
  SPECIALTY_DIPLOMAS, 
  OFFICIAL_SYLLABUS, 
  SYLLABUS_BLOCKS, 
  MASTER_PROGRAM, 
  getModuleById, 
  moduleMinutes,
  type SyllabusBlock 
} from '@/lib/curriculum-data';

export const metadata = {
  title: 'Nuevo Curso SAP Finix | IIDEA Academy - Potencia tus Habilidades',
  description: 'Acceso exclusivo para estudiantes IIDEA. Simulador SAP Finix con procesos empresariales, clases guiadas y laboratorio de práctica. Prepárate para la vida profesional.',
};

const BLOCK_ICONS: Record<SyllabusBlock, typeof Building2> = {
  'Administración y Talento Humano': Building2,
  'Logística y Cadena de Suministro': Package,
  'Gestión Comercial y CRM': ShoppingCart,
  'Producción y Planificación': Factory,
  'Finanzas y Fiscalidad': Landmark,
  'Tecnología y Analítica': Settings2,
  'Consultoría y Business Analyst': Compass,
  'Proyecto Final': Award,
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080d1a] selection:bg-finix-blue selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION — Fondo cósmico animado + layout IIDEA-style
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden flex items-center min-h-[600px] lg:min-h-[680px] py-10 sm:py-14 bg-[#1a0533]">

          {/* ── CAPA 1: Gradiente base profundo ── */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#2d0a4e] to-[#0f0218]" />

          {/* ── CAPA 2: Ondas de energía animadas (SVG) ── */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes floatWave1 { 0%,100%{transform:translateY(0) scaleX(1)} 50%{transform:translateY(-30px) scaleX(1.05)} }
            @keyframes floatWave2 { 0%,100%{transform:translateY(0) scaleX(1)} 50%{transform:translateY(25px) scaleX(0.97)} }
            @keyframes pulseGlow  { 0%,100%{opacity:0.18;r:3px} 50%{opacity:1;r:7px} }
            @keyframes pulseGlowBig { 0%,100%{opacity:0.3;r:5px} 50%{opacity:0.9;r:11px} }
            @keyframes driftLine  { 0%,100%{opacity:0.08} 50%{opacity:0.35} }
            @keyframes spinOrb    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes particleFade { 0%,100%{opacity:0} 40%,60%{opacity:0.8} }
            .hero-wave-1{animation:floatWave1 8s ease-in-out infinite}
            .hero-wave-2{animation:floatWave2 11s ease-in-out infinite}
            .hero-node{animation:pulseGlow 3s ease-in-out infinite}
            .hero-node-big{animation:pulseGlowBig 4s ease-in-out infinite}
            .hero-line{animation:driftLine 4s ease-in-out infinite}
            .hero-particle{animation:particleFade 5s ease-in-out infinite}
          ` }} />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 680" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6b00" stopOpacity="1"/>
                <stop offset="100%" stopColor="#ff6b00" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="glowOrange2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff9500" stopOpacity="1"/>
                <stop offset="100%" stopColor="#ff9500" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="glowPurple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c026d3" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#c026d3" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="1"/>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
              </radialGradient>
              <filter id="blur8">
                <feGaussianBlur stdDeviation="8"/>
              </filter>
              <filter id="blur20">
                <feGaussianBlur stdDeviation="20"/>
              </filter>
              <filter id="blur30">
                <feGaussianBlur stdDeviation="30"/>
              </filter>
              <filter id="blur4">
                <feGaussianBlur stdDeviation="4"/>
              </filter>
            </defs>

            {/* Orbes de luz de fondo — más intensos */}
            <ellipse className="hero-wave-1" cx="180" cy="180" rx="380" ry="260" fill="url(#glowOrange)" filter="url(#blur30)" opacity="0.75"/>
            <ellipse className="hero-wave-2" cx="1250" cy="500" rx="320" ry="230" fill="url(#glowPurple)" filter="url(#blur20)" opacity="0.7"/>
            <ellipse className="hero-wave-1" cx="700" cy="300" rx="250" ry="160" fill="url(#glowOrange2)" filter="url(#blur20)" opacity="0.4" style={{animationDelay:'2s'}}/>
            <ellipse className="hero-wave-2" cx="90" cy="560" rx="220" ry="170" fill="url(#glowPurple)" filter="url(#blur20)" opacity="0.55" style={{animationDelay:'3s'}}/>
            <ellipse className="hero-wave-1" cx="1350" cy="80" rx="280" ry="200" fill="url(#glowOrange)" filter="url(#blur20)" opacity="0.5" style={{animationDelay:'5s'}}/>
            <ellipse cx="550" cy="600" rx="180" ry="120" fill="url(#glowOrange2)" filter="url(#blur20)" opacity="0.35"/>

            {/* Ondas de energía naranjas — bezier curves al estilo referencia */}
            <path className="hero-wave-1" d="M-50 350 C200 100, 500 500, 750 200 S1100 50, 1450 300"
              stroke="url(#glowOrange)" strokeWidth="80" fill="none" opacity="0.18" filter="url(#blur20)"/>
            <path className="hero-wave-2" d="M-50 500 C150 250, 450 600, 700 350 S1050 150, 1450 450"
              stroke="#ff6b00" strokeWidth="50" fill="none" opacity="0.14" filter="url(#blur20)" style={{animationDelay:'2s'}}/>
            <path className="hero-wave-1" d="M300 -50 C400 200, 200 400, 500 500 S700 650, 600 750"
              stroke="#ff9500" strokeWidth="60" fill="none" opacity="0.12" filter="url(#blur20)" style={{animationDelay:'4s'}}/>
            <path className="hero-wave-2" d="M900 -20 C1000 150, 800 350, 1100 400 S1300 500, 1500 350"
              stroke="url(#glowOrange2)" strokeWidth="70" fill="none" opacity="0.16" filter="url(#blur20)" style={{animationDelay:'6s'}}/>

            {/* Red de constelaciones — líneas */}
            <g opacity="1">
              {/* triángulo superior izquierdo */}
              <line className="hero-line" x1="120" y1="80"  x2="380" y2="200" stroke="#ff9500" strokeWidth="1.2" style={{animationDelay:'0s'}}/>
              <line className="hero-line" x1="380" y1="200" x2="220" y2="380" stroke="#ff9500" strokeWidth="1" style={{animationDelay:'0.5s'}}/>
              <line className="hero-line" x1="220" y1="380" x2="120" y2="80"  stroke="#ff9500" strokeWidth="0.8" style={{animationDelay:'1s'}}/>
              {/* brazos izquierda */}
              <line className="hero-line" x1="380" y1="200" x2="580" y2="150" stroke="#ff9500" strokeWidth="1" style={{animationDelay:'0.3s'}}/>
              <line className="hero-line" x1="380" y1="200" x2="490" y2="390" stroke="#c084fc" strokeWidth="0.9" style={{animationDelay:'0.8s'}}/>
              {/* centro */}
              <line className="hero-line" x1="580" y1="150" x2="750" y2="260" stroke="#ff9500" strokeWidth="1.1" style={{animationDelay:'0.2s'}}/>
              <line className="hero-line" x1="750" y1="260" x2="490" y2="390" stroke="#c084fc" strokeWidth="0.8" style={{animationDelay:'1.2s'}}/>
              <line className="hero-line" x1="750" y1="260" x2="980" y2="180" stroke="#ff9500" strokeWidth="1.2" style={{animationDelay:'0.6s'}}/>
              {/* derecha */}
              <line className="hero-line" x1="980" y1="180" x2="1150" y2="300" stroke="#ff9500" strokeWidth="1" style={{animationDelay:'1.5s'}}/>
              <line className="hero-line" x1="1150" y1="300" x2="1280" y2="160" stroke="#c084fc" strokeWidth="0.9" style={{animationDelay:'0.4s'}}/>
              <line className="hero-line" x1="1280" y1="160" x2="980"  y2="180" stroke="#ff9500" strokeWidth="0.8" style={{animationDelay:'1.1s'}}/>
              {/* inferior */}
              <line className="hero-line" x1="490" y1="390" x2="680" y2="530" stroke="#c084fc" strokeWidth="1" style={{animationDelay:'0.7s'}}/>
              <line className="hero-line" x1="680" y1="530" x2="900" y2="460" stroke="#ff9500" strokeWidth="0.9" style={{animationDelay:'1.3s'}}/>
              <line className="hero-line" x1="900" y1="460" x2="1150" y2="300" stroke="#c084fc" strokeWidth="1" style={{animationDelay:'0.9s'}}/>
              <line className="hero-line" x1="680" y1="530" x2="220" y2="380" stroke="#ff9500" strokeWidth="0.7" style={{animationDelay:'2s'}}/>
            </g>

            {/* Nodos brillantes principales */}
            <g>
              {([
                [120,80,8,'#ff9500',0],  [380,200,12,'#ffb733',0.3], [220,380,8,'#ff6b00',0.8],
                [580,150,10,'#fbbf24',0.5], [750,260,14,'#ff9500',1.0], [490,390,9,'#c084fc',0.2],
                [980,180,11,'#ffb733',0.7], [1150,300,13,'#ff9500',0.4], [1280,160,8,'#c084fc',1.2],
                [680,530,10,'#ff6b00',0.6], [900,460,9,'#fbbf24',1.5], [120,80,0,'',0],
              ] as [number,number,number,string,number][]).filter(n=>n[2]>0).map(([cx,cy,r,color,delay],i) => (
                <g key={i}>
                  {/* halo */}
                  <circle cx={cx} cy={cy} r={r*3} fill={color} filter="url(#blur8)" opacity="0.4"
                    style={{animation:`pulseGlow ${3+i*0.3}s ease-in-out infinite`, animationDelay:`${delay}s`}}/>
                  {/* núcleo */}
                  <circle cx={cx} cy={cy} r={r===14?7:r===12?5:r===13?6:4} fill={color}
                    className="hero-node" style={{animationDelay:`${delay}s`}}/>
                  {/* punto central blanco */}
                  <circle cx={cx} cy={cy} r="1.5" fill="white" opacity="0.9"/>
                </g>
              ))}
            </g>

            {/* Partículas dispersas */}
            {([
              [60,320,2],[170,490,1.5],[320,580,2],[450,100,1.5],[600,470,2],
              [780,80,1.5],[830,590,2],[1050,420,1.5],[1200,540,2],[1350,380,1.5],
              [1050,60,2],[330,280,1.5],[950,580,2],[1300,440,1.5],
            ] as [number,number,number][]).map(([cx,cy,r],i)=>(
              <circle key={i} cx={cx} cy={cy} r={r} fill="#fbbf24" opacity="0.6"
                className="hero-particle" style={{animationDelay:`${(i*0.7)%5}s`}}/>
            ))}
          </svg>

          {/* ── CAPA 3: Contenido ── */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* ─── Columna izquierda: Texto + CTAs ─── */}
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400/40 bg-orange-500/10 backdrop-blur-sm text-xs font-bold text-orange-300 shadow-lg shadow-orange-900/20">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-sm shadow-orange-400" />
                  Nuevo Curso · Exclusivo para Estudiantes IIDEA
                </div>

                {/* Título */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
                  Potencia tus{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                    Habilidades
                  </span>{' '}
                  con SAP Finix
                </h1>

                {/* Subtítulo */}
                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-md">
                  IIDEA te presenta acceso exclusivo al simulador SAP Finix. Aprende procesos empresariales reales y prepárate para tu carrera profesional.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/capacitacion"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm hover:from-orange-400 hover:to-amber-400 transition-all shadow-xl shadow-orange-500/30 active:scale-95"
                  >
                    <Award className="w-4 h-4" />
                    Explorar rutas
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/mi-aula"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all shadow-lg active:scale-95"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Mi Aula Virtual
                  </Link>
                </div>
              </div>

              {/* ─── Columna derecha: Imagen con Stats overlay en la parte inferior ─── */}
              <div className="relative h-[360px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                {/* Foto */}
                <Image
                  src="/hero.webp"
                  alt="IIDEA Academy - SAP Finix Training"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Gradiente que oscurece la parte de abajo para que los stats sean legibles */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Stats — glassmorphism DENTRO de la foto, en la parte baja */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: SPECIALTY_DIPLOMAS.length, label: 'Diplomas' },
                      { value: OFFICIAL_SYLLABUS.length, label: 'Módulos' },
                      { value: OFFICIAL_SYLLABUS.reduce((t,m)=>t+m.classes.length,0), label: 'Clases' },
                      { value: new Set(OFFICIAL_SYLLABUS.map(m=>m.block)).size, label: 'Áreas' },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                      >
                        <span className="text-xl sm:text-2xl font-extrabold text-white font-display leading-none">{stat.value}</span>
                        <span className="text-[9px] sm:text-[11px] text-white/70 mt-0.5 font-semibold text-center leading-tight">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECCIÓN PRINCIPAL: LOS 14 DIPLOMAS DE ESPECIALIDAD */}
        <section id="diplomas" className="py-20 bg-slate-100/70 dark:bg-white/[0.01] border-y border-slate-200 dark:border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400 font-bold">
                Especialidades Profesionales
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                 Elige tu ruta de aprendizaje
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                 Selecciona la función que deseas dominar. 14 rutas de especialidad para prepararte como profesional en SAP.
              </p>
            </div>

             {/* Tres rutas de entrada; el catálogo completo está en capacitación. */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {SPECIALTY_DIPLOMAS.filter((diploma) => ['dip-compras', 'dip-contable', 'dip-consultor'].includes(diploma.id)).map((diploma, index) => {
                const isMaster = diploma.id === 'dip-consultor' || diploma.id === 'dip-business-analyst';
                return (
                  <div
                    key={diploma.id}
                    className={`rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between hover:border-finix-blue/40 hover:shadow-lg transition-all group ${
                      isMaster ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-b from-finix-blue/5 to-transparent border-finix-blue/30' : ''
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-finix-blue/10 text-finix-blue">
                           Ruta 0{index + 1}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                          {diploma.role}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-finix-blue transition-colors font-display leading-snug">
                          {diploma.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {diploma.description}
                      </p>

                      <div className="space-y-2 border-t border-slate-100 dark:border-white/5 pt-3">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Módulos Requeridos ({diploma.requiredModules.length}):</p>
                        <div className="flex flex-wrap gap-1.5">
                          {diploma.requiredModules.map((mId) => {
                            const mod = getModuleById(mId);
                            return (
                              <span key={mId} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                                 {mod?.badge || mod?.title.split(':')[0]}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        {diploma.requiredModules.length} módulos incluidos
                      </span>
                      <Link
                        href="/capacitacion"
                        className="inline-flex items-center gap-1 text-xs font-bold text-finix-blue hover:text-sky-500 transition-colors"
                      >
                        Ver Detalle <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
             </div>

             <div className="text-center">
               <Link href="/capacitacion" className="inline-flex items-center gap-2 rounded-xl border border-finix-blue/40 px-6 py-3 text-sm font-bold text-finix-blue dark:text-sky-300 hover:bg-finix-blue/10 transition-colors">
                 Ver las 14 rutas <ArrowRight className="h-4 w-4" />
               </Link>
             </div>

             {/* PROGRAMA CUMBRE MÁSTER */}
            <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-8 sm:p-10 space-y-4 text-center max-w-4xl mx-auto shadow-xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
                 <Award className="w-4 h-4" /> Proyecto integrador de la academia
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                {MASTER_PROGRAM.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                 Reúne lo aprendido en los módulos del itinerario y practícalo en un escenario integrado del simulador educativo.
              </p>
              <div className="pt-2">
                <Link
                  href="/mi-aula"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5" />
                  Iniciar Carrera de Súper Analista
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* METODOLOGÍA: APRENDER HACIENDO */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-finix-blue dark:text-sky-400 font-bold">
                 Cómo se aprende
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                Modelo de Formación Práctico y Empleable
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Formación diseñada con estándares reales de consultoría e implementación en empresas de Ecuador.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-finix-blue flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                   Clases guiadas por procesos
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Lecciones en formato diapositivas interactivas, guías de parametrización SRI/IESS y ejercicios prácticos paso a paso.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Simulador Sandbox B1 Center
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                   Ensaya compras, ventas, documentos, asientos y nómina con datos de laboratorio. Las operaciones no se envían al SRI ni a bancos.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                   Constancias verificables
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                   Consulta la autenticidad de una constancia emitida por la academia mediante su código de verificación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IIDEA COLORED SECTION 1: Fondo cósmico naranja/púrpura */}
        <section className="relative py-20 overflow-hidden bg-[#1a0533]">
          {/* Fondo cósmico reutilizado */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d0a4e] via-[#1a0533] to-[#0f0218]" />
          <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="adm-orange" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff7700" stopOpacity="1"/>
                <stop offset="100%" stopColor="#ff7700" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="adm-purple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="1"/>
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0"/>
              </radialGradient>
              <filter id="admBlur">
                <feGaussianBlur stdDeviation="25"/>
              </filter>
            </defs>
            <ellipse cx="150" cy="150" rx="300" ry="200" fill="url(#adm-orange)" filter="url(#admBlur)" opacity="0.6"/>
            <ellipse cx="1250" cy="350" rx="280" ry="180" fill="url(#adm-purple)" filter="url(#admBlur)" opacity="0.6"/>
            <ellipse cx="700" cy="250" rx="200" ry="150" fill="url(#adm-orange)" filter="url(#admBlur)" opacity="0.3"/>
            <path d="M-50 300 C250 100, 600 400, 900 200 S1200 50, 1450 250"
              stroke="#ff7700" strokeWidth="80" fill="none" opacity="0.12" filter="url(#admBlur)"/>
            <path d="M200 -20 C350 150, 250 300, 500 380 S750 500, 650 520"
              stroke="#ff9500" strokeWidth="60" fill="none" opacity="0.10" filter="url(#admBlur)"/>
          </svg>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-orange-400 font-bold">
                  <span className="w-6 h-px bg-orange-400/60" />
                  Proceso de Admisión
                  <span className="w-6 h-px bg-orange-400/60" />
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  Inicia tu Carrera Profesional
                </h2>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  IIDEA te guía paso a paso en tu formación empresarial con SAP Finix.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { n: '01', title: 'Solicitud', desc: 'Completa el formulario de admisión y proporciona tu información académica y profesional.' },
                  { n: '02', title: 'Evaluación', desc: 'Nuestro equipo revisa tu perfil y te propone la ruta de especialidad más adecuada.' },
                  { n: '03', title: 'Acceso', desc: 'Accede a tu aula virtual y comienza a dominar SAP Finix desde el primer día.' },
                ].map((step) => (
                  <div key={step.n} className="relative group">
                    {/* Halo naranja en hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/20 to-purple-700/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-orange-500/30 transition-all space-y-5">
                      {/* Número con glow */}
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
                          <span className="text-xl font-extrabold text-white font-display">{step.n}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">{step.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/capacitacion"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:from-orange-400 hover:to-amber-400 transition-all active:scale-95 cursor-pointer"
                >
                  Solicitar Admisión
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

{/* WHITE SECTION: Beneficios */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-orange-500 dark:text-orange-400 font-bold">
                Ventajas IIDEA
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                ¿Por qué Elegir IIDEA Academy?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Formación integral diseñada para profesionales que buscan dominar SAP Business One.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Award, title: 'Certificación', desc: 'Constancias verificables de IIDEA Academy' },
                { icon: Users, title: 'Comunidad', desc: 'Red de profesionales en formación SAP' },
                { icon: TrendingUp, title: 'Empleabilidad', desc: 'Bolsa de empleo y oportunidades laborales' },
                { icon: Clock, title: 'Flexible', desc: 'Aprende a tu propio ritmo' }
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:border-orange-500 dark:hover:border-orange-500 transition-colors space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
