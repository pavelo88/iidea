import React from 'react';
import Link from 'next/link';
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
        {/* HERO SECTION DE LA ESCUELA */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-finix-blue/20 via-sky-500/15 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Main Header */}
            <div className="text-center max-w-4xl mx-auto space-y-6 py-4 sm:py-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 text-xs font-bold text-orange-600 dark:text-orange-400">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Nuevo Curso 🚀 Exclusivo para Estudiantes IIDEA
              </div>

              {/* H1 Exacto (45-65 chars) -> 53 caracteres */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                Potencia tus Habilidades con SAP Finix
              </h1>

              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                IIDEA te presenta acceso exclusivo a nuestro simulador SAP Finix. Aprende procesos empresariales, realiza prácticas en laboratorio y prepárate para triunfar en tu carrera profesional.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/capacitacion"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-5 h-5" />
                  Explorar rutas de formación
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/mi-aula"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/[0.04] text-slate-800 dark:text-white font-semibold text-sm sm:text-base hover:border-orange-500/50 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  Ingresar a Mi Aula Virtual
                </Link>
              </div>

              {/* Datos del programa */}
              <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-slate-200 dark:border-white/[0.08]">
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">{SPECIALTY_DIPLOMAS.length}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Diplomas de Especialidad</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-extrabold text-orange-500 dark:text-orange-400 font-display">{OFFICIAL_SYLLABUS.length}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Módulos de estudio</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-display">{OFFICIAL_SYLLABUS.reduce((total, module) => total + module.classes.length, 0)}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Clases guiadas</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-display">{new Set(OFFICIAL_SYLLABUS.map(module => module.block)).size}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Áreas temáticas</p>
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

        {/* IIDEA COLORED SECTION 1: Negro y Morado */}
        <section className="py-20 bg-black dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-orange-500 font-bold">
                  Proceso de Admisión
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  Inicia tu Carrera Profesional
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  IIDEA te guía paso a paso en tu formación empresarial con SAP Finix.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-3xl font-extrabold text-white font-display">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Solicitud</h3>
                    <p className="text-sm text-purple-100">
                      Completa el formulario de admisión y proporciona tu información académica y profesional.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-3xl font-extrabold text-white font-display">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Evaluación</h3>
                    <p className="text-sm text-purple-100">
                      Nuestro equipo revisa tu perfil y te propone la ruta de especialidad más adecuada.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-3xl font-extrabold text-white font-display">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Acceso</h3>
                    <p className="text-sm text-purple-100">
                      Accede a tu aula virtual y comienza a dominar SAP Finix desde el primer día.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/capacitacion"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transition-all active:scale-95 cursor-pointer"
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
