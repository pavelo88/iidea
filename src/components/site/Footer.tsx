import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BotonConfigurarCookies } from '@/components/legal/CookieConsent';

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/iidea.edu.ec',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/iidea_ec',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/iidea.edu.ec',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@iidea',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#09090f] border-t border-white/[0.06]">
      {/* Cosmic corner glows */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-purple-700/12 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Col 1: Brand + description + social */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image src="/logo-footer.webp" alt="IIDEA Academy" width={140} height={56} className="object-contain" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma exclusiva para estudiantes <strong className="text-slate-300">IIDEA</strong>. Domina procesos empresariales con SAP Finix a través de simulación práctica.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Explora el programa */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-5">
              Explora el programa
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Rutas de especialidad', href: '/capacitacion' },
                { label: 'Manuales y atlas', href: '/manuales' },
                { label: 'Laboratorio ERP', href: '/simulador' },
                { label: 'Verificar una constancia', href: '/verificar' },
              ].map((item) => (
                <li key={item.href} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <Link href={item.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Plataforma */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-5">
              Plataforma
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link href="/mi-aula" className="hover:text-white transition-colors flex items-center gap-2"><span>🎓</span> Mi Aula Virtual</Link></li>
              <li><Link href="/simulador" className="hover:text-white transition-colors flex items-center gap-2"><span>🚀</span> Simulador SAP Business One</Link></li>
              <li><Link href="/manuales" className="hover:text-white transition-colors flex items-center gap-2"><span>📖</span> Manuales & Atlas Visual</Link></li>
              <li><Link href="/bolsa-empleo" className="hover:text-white transition-colors flex items-center gap-2"><span>💼</span> Bolsa de Empleo (Job-Ready)</Link></li>
            </ul>
          </div>

          {/* Col 4: Admisiones & Soporte */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-5">
              Admisiones & Soporte
            </h4>
            <div className="text-xs text-slate-400 space-y-3">
              <p className="leading-relaxed">¿Necesitas orientación? Explora las rutas o consulta la ayuda del sitio.</p>
              <Link href="/empresas#solicitud" className="text-orange-400 hover:text-orange-300 transition-colors block">
                Solicitar formación para empresas
              </Link>
              <p className="text-slate-600">Términos y condiciones</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © 2026 Todos los Derechos Reservados — Instituto Superior Tecnológico de Innovación y Desarrollo Empresarial Alemán — IIDEA · <span className="text-slate-600">Powered by SinergIA</span>
          </p>
          <nav className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-slate-300 transition-colors">Privacidad</Link>
            <span className="text-slate-700">|</span>
            <Link href="/terminos" className="hover:text-slate-300 transition-colors">Términos</Link>
            <span className="text-slate-700">|</span>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
            <span className="text-slate-700">|</span>
            <BotonConfigurarCookies className="hover:text-slate-300 transition-colors" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
