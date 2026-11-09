"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Award,
  Users,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogIn,
  LogOut,
  Building2,
  FileText,
  Home,
  Phone,
} from 'lucide-react';
import { ThemeToggle } from '@/components/site/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ecosistemaOpen, setEcosistemaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ecosystemButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { userProfile, logout } = useAuth();

  const isHero = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const transparent = isHero && !scrolled;

  const isSuperOrAdmin = userProfile?.role === 'super' || userProfile?.role === 'admin';

  const navLinks = [
    { name: 'Mi Aula', href: '/mi-aula', icon: GraduationCap, highlight: true },
    { name: 'Manuales & Atlas', href: '/manuales', icon: BookOpen },
    { name: 'Simulador', href: '/simulador', icon: Briefcase },
    { name: 'Bolsa de Empleo', href: '/bolsa-empleo', icon: Briefcase },
  ];

  const ecosistemaLinks = [
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Empresas', href: '/empresas', icon: Building2 },
    { name: 'Consultores', href: '/consultores', icon: Users },
    { name: 'Talento', href: '/talento', icon: Award },
  ];

  if (isSuperOrAdmin) {
    navLinks.push({ name: 'Panel Admin', href: '/admin', icon: ShieldCheck });
  }

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent border-transparent'
          : 'backdrop-blur-xl bg-white/90 dark:bg-[#1a0533]/90 border-b border-slate-200/60 dark:border-white/[0.08]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3.5 group">
            <div className="w-24 h-12 relative group-hover:scale-105 transition-transform flex-shrink-0">
              <Image src="/logo.webp" alt="IIDEA Academy" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden xl:flex items-center gap-4 text-sm font-medium transition-colors ${
            transparent ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'
          }`}>
            <Link
              href="/"
              className={`flex flex-col justify-center min-h-[44px] px-1 py-1 transition-colors ${
                pathname === '/'
                  ? transparent ? 'text-white font-bold' : 'text-slate-900 dark:text-white font-bold'
                  : transparent ? 'text-white/80 hover:text-white' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-300'
              }`}
            >
              <span>Inicio</span>
              {pathname === '/' && <span className="h-[2.5px] rounded-full bg-gradient-to-r from-orange-400 to-purple-600 mt-0.5" />}
            </Link>

            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col justify-center min-h-[44px] px-1 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    isActive
                      ? transparent ? 'text-white font-bold' : 'text-slate-900 dark:text-white font-bold'
                      : transparent ? 'text-white/80 hover:text-white' : 'hover:text-orange-500 dark:hover:text-orange-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 opacity-75" />
                    <span>{link.name}</span>
                  </span>
                  {isActive && <span className="h-[2.5px] rounded-full bg-gradient-to-r from-orange-400 to-purple-600 mt-0.5" />}
                </Link>
              );
            })}

            {/* Ecosistema Dropdown */}
            <div className="relative group" onMouseEnter={() => setEcosistemaOpen(true)} onMouseLeave={e => { if (!e.currentTarget.contains(document.activeElement)) setEcosistemaOpen(false); }} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setEcosistemaOpen(false); }} onKeyDown={e => { if (e.key === 'Escape') { setEcosistemaOpen(false); ecosystemButton.current?.focus(); } }}>
              {(() => {
                const ecosistemaActive = ecosistemaLinks.some(l => pathname === l.href || pathname.startsWith(l.href));
                return (
                  <button ref={ecosystemButton} aria-expanded={ecosistemaOpen} aria-controls="ecosistema-links" onClick={() => setEcosistemaOpen(v => !v)} className={`flex flex-col justify-center min-h-[44px] px-1 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    ecosistemaActive
                      ? transparent ? 'text-white font-bold' : 'text-slate-900 dark:text-white font-bold'
                      : transparent ? 'text-white/80 hover:text-white' : 'hover:text-orange-500 dark:hover:text-orange-300'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 opacity-75" />
                      <span>Ecosistema</span>
                      <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />
                    </span>
                    {ecosistemaActive && <span className="h-[2.5px] rounded-full bg-gradient-to-r from-orange-400 to-purple-600 mt-0.5" />}
                  </button>
                );
              })()}
              <div id="ecosistema-links" className={"absolute top-full right-0 mt-2 w-48 transition-all duration-200 transform origin-top-right " + (ecosistemaOpen ? "opacity-100 visible" : "opacity-0 invisible")}>
                <div className="py-2 bg-white dark:bg-[#0b1320] rounded-xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden relative before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
                  {ecosistemaLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                    return (
                      <Link key={link.href} href={link.href} role="menuitem"
                        className={`flex min-h-[44px] items-center gap-2.5 px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 ${isActive ? 'text-orange-500 bg-white/5 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-white/5 hover:text-orange-500'}`}
                      >
                        <Icon className="w-4 h-4" /><span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Actions, Auth & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {userProfile ? (
              <div className="flex items-center gap-2">
                <Link
                  href={isSuperOrAdmin ? "/admin" : "/dashboard"}
                  className={`hidden sm:flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    transparent
                      ? 'border-white/30 text-white bg-white/10 hover:bg-white/20'
                      : 'border-slate-200 dark:border-white/10 hover:border-orange-500 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="w-5 h-5 rounded-md bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">
                    {(userProfile.name || 'U').charAt(0)}
                  </div>
                  <span className="line-clamp-1 max-w-[120px]">{userProfile.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={() => logout()}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    transparent ? 'border-white/20 text-white/80 hover:bg-white/10' : 'border-slate-200 dark:border-white/10 hover:bg-rose-500/10 hover:text-rose-500 text-slate-500'
                  }`}
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link href="/login" aria-label="Iniciar Sesión"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/30 transition-all active:scale-95 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden whitespace-nowrap sm:inline">Iniciar Sesión</span>
              </Link>
            )}

            {/* Hamburger: tablet only (md–xl), mobile uses bottom nav */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`hidden md:flex xl:hidden p-2 rounded-xl border transition-colors ${
                transparent
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tablet Menu Dropdown (md–xl) */}
        {mobileMenuOpen && (
          <div className="hidden md:block xl:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080d1a]/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3 max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  <Icon className="w-4 h-4 text-orange-500" /><span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Ecosistema</div>
              {ecosistemaLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    <Icon className="w-4 h-4 text-orange-500" /><span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/5">
              {userProfile ? (
                <button onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full text-left p-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold text-rose-500 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /><span>Cerrar Sesión</span>
                </button>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold block"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════
          MOBILE BOTTOM NAV — Solo en celulares (< md)
          App-web style con CTA central elevado
          ══════════════════════════════════════════════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        aria-label="Navegación móvil"
      >
        {/* Blur + background */}
        <div className="backdrop-blur-xl bg-white/95 dark:bg-[#140428]/95 border-t border-slate-200/80 dark:border-white/[0.1] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex items-end justify-around px-1 pb-5 pt-2">

            {/* Inicio */}
            <Link href="/"
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all min-w-[52px] ${
                pathname === '/' ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Home className={`w-[22px] h-[22px] transition-transform ${pathname === '/' ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wide">Inicio</span>
            </Link>

            {/* Mi Aula */}
            <Link href="/mi-aula"
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all min-w-[52px] ${
                pathname.startsWith('/mi-aula') ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <GraduationCap className={`w-[22px] h-[22px] transition-transform ${pathname.startsWith('/mi-aula') ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wide">Mi Aula</span>
            </Link>

            {/* ── CTA CENTRAL elevado ── */}
            <div className="relative flex flex-col items-center -mt-5">
              <Link
                href="/empresas#solicitud"
                aria-label="Consultar"
                className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 via-orange-500 to-purple-600 shadow-xl shadow-orange-500/40 ring-[3px] ring-white dark:ring-[#140428] text-white active:scale-95 transition-transform"
              >
                <Phone className="w-6 h-6" />
              </Link>
              <span className="text-[9px] font-semibold text-orange-500 mt-1 tracking-wide">Consultar</span>
            </div>

            {/* Simulador */}
            <Link href="/simulador"
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all min-w-[52px] ${
                pathname.startsWith('/simulador') ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Briefcase className={`w-[22px] h-[22px] transition-transform ${pathname.startsWith('/simulador') ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wide">Simulador</span>
            </Link>

            {/* Explorar */}
            <Link href="/bolsa-empleo"
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all min-w-[52px] ${
                pathname.startsWith('/bolsa-empleo') ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Award className={`w-[22px] h-[22px] transition-transform ${pathname.startsWith('/bolsa-empleo') ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wide">Explorar</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
