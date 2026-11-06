import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { articles, getArticle } from '../articles';
import { publicUrl } from '@/lib/site-url';

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { robots: { index: false } };
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: publicUrl(`/blog/${article.slug}`) },
    openGraph: { title: article.title, description: article.summary, url: publicUrl(`/blog/${article.slug}`), type: 'article' },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <div className="min-h-screen flex flex-col relative isolate overflow-hidden bg-gradient-to-br from-orange-100/70 via-white to-purple-100/70 dark:bg-none dark:bg-[#080d1a]">
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-orange-300/40 blur-[110px] dark:bg-orange-500/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-violet-300/35 blur-[110px] dark:bg-purple-700/15" />
      <Navbar />
      <main className="flex-1 px-4 py-16 sm:px-6 max-w-3xl mx-auto w-full">
        <Link href="/blog" className="text-sm font-semibold text-finix-blue hover:underline">← Todas las guías</Link>
        <article className="mt-8 prose prose-slate dark:prose-invert max-w-none">
          <h1>{article.title}</h1>
          <p className="lead">{article.summary}</p>
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  );
}
