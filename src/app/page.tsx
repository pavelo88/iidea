import React from 'react';
import { HeroConstellation } from '@/components/site/HeroConstellation';
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
        <section className="relative overflow-hidden flex items-center -mt-20 pt-36 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#1a0533]">

          {/* ── CAPA 1: Imagen de fondo + velo para legibilidad del texto ── */}
          <Image
            src="/hero-vocacional.webp"
            alt=""
            fill
            priority
            aria-hidden="true"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0533]/80 via-[#1a0533]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0218]/50 via-transparent to-transparent" />
          <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden="true" />

          {/* ── CAPA 2: Constelación animada alineada a las estrellas de la imagen ── */}
          <HeroConstellation />

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
              <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto h-[270px] sm:h-[300px] lg:h-[330px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10">
                {/* Foto */}
                <Image
                  src="/administracion.webp"
                  alt="IIDEA Academy - SAP Finix Training"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
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
                        <span className="text-lg sm:text-xl font-extrabold text-white font-display leading-none">{stat.value}</span>
                        <span className="text-[8px] sm:text-[10px] text-white/70 mt-0.5 font-semibold text-center leading-tight">{stat.label}</span>
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
