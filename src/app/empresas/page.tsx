import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, BookOpen, PanelsTopLeft, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { BusinessLeadForm } from '@/components/site/BusinessLeadForm';

export const metadata: Metadata = {
  title: 'Formación ERP para equipos de empresas',
  description: 'Explora las rutas de IIDEA Academy para equipos que necesitan practicar compras, ventas, operaciones y finanzas en un simulador educativo.',
  alternates: { canonical: '/empresas' },
};

export default function EmpresasPage() {
  return (
    <div className="min-h-screen flex flex-col relative isolate overflow-hidden bg-gradient-to-br from-orange-100/70 via-white to-purple-100/70 dark:bg-none dark:bg-[#080d1a] text-slate-900 dark:text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-orange-300/40 blur-[110px] dark:bg-orange-500/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-violet-300/35 blur-[110px] dark:bg-purple-700/15" />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/70 dark:border-orange-500/30 px-3 py-1 text-xs font-bold text-finix-blue dark:text-orange-300"><Building2 className="h-4 w-4" /> Para equipos de pymes</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Formación ERP para aprender procesos completos</h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">Las rutas de IIDEA Academy permiten estudiar funciones empresariales y practicar en un entorno separado de los sistemas reales. Elige las áreas relevantes para tu equipo y revisa el temario antes de comenzar.</p>
          <Link href="#solicitud" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all active:scale-95">Solicitar capacitación <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { icon: BookOpen, title: 'Aprender', text: 'Clases guiadas por función, con manuales y objetivos de cada módulo.' },
            { icon: PanelsTopLeft, title: 'Practicar', text: 'Ejercicios de compras, ventas, producción y finanzas en un laboratorio educativo.' },
            { icon: ShieldCheck, title: 'Comprobar', text: 'Constancias de la academia consultables mediante un código de verificación.' },
          ].map(({ icon: Icon, title, text }) => (
            <section key={title} className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
              <Icon className="h-7 w-7 text-finix-blue" />
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
            </section>
          ))}
        </div>
        <BusinessLeadForm />
      </main>
      <Footer />
    </div>
  );
}
