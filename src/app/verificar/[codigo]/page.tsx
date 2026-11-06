import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { VerificationForm } from './VerificationForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: 'Verificación de Certificado | IIDEA Academy' },
  description: 'Consulta la autenticidad de un certificado de IIDEA Academy mediante su código.',
  robots: { index: false, follow: false },
};

export default async function VerificarCertificadoPage({ params }: { params: Promise<{ codigo: string }> }) {
  const codigo = (await params).codigo.trim().toUpperCase();
  return (
    <div className="min-h-screen flex flex-col relative isolate overflow-hidden bg-gradient-to-br from-orange-100/70 via-white to-purple-100/70 dark:bg-none dark:bg-[#070b14] text-slate-900 dark:text-gray-100">
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-orange-300/40 blur-[110px] dark:bg-orange-500/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-violet-300/35 blur-[110px] dark:bg-purple-700/15" />
      <Navbar />
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <Link href="/verificar" className="text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline">← Verificar otro código</Link>
        <h1 className="text-3xl font-extrabold tracking-tight">Verificar certificado</h1>
        <VerificationForm code={codigo} />
      </main>
      <Footer />
    </div>
  );
}
