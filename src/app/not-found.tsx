import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative isolate overflow-hidden bg-gradient-to-br from-orange-100/70 via-white to-purple-100/70 dark:bg-none dark:bg-[#080d1a] p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-orange-300/40 blur-[110px] dark:bg-orange-500/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-violet-300/35 blur-[110px] dark:bg-purple-700/15" />
      <ShieldCheck className="mb-4 w-12 h-12 text-finix-blue" />
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
        404 – Página no encontrada
      </h1>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-6 max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="rounded-full bg-finix-blue px-6 py-2 text-sm font-medium text-white hover:bg-finix-blue/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
