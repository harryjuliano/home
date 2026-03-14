import { Head, Link } from '@inertiajs/react';

const formatPublishedDate = (value) => {
    if (!value) {
        return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

export default function BlogShow({ article }) {
    return (
        <>
            <Head title={`${article.title} - Blog`} />

            <div className="min-h-screen bg-[#F8FAFC] text-[#0B1220]">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4 lg:px-8">
                        <Link href="/" className="text-lg font-bold tracking-tight text-[#0F172A]">
                            Julianoo Bisnis Partner
                        </Link>
                        <Link href="/#blog" className="text-sm font-semibold text-[#1D4ED8]">
                            ← Kembali ke daftar artikel
                        </Link>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-3xl px-6 py-10 lg:px-8">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <span className="inline-flex rounded-full bg-[#14B8A6]/15 px-3 py-1 text-xs font-semibold text-[#0f766e]">
                            {article.category?.name ?? 'Blog'}
                        </span>
                        <h1 className="mt-4 text-3xl font-bold text-[#0F172A] md:text-4xl">{article.title}</h1>
                        <p className="mt-3 text-sm text-slate-500">
                            {formatPublishedDate(article.published_at)}
                            {article.author?.name ? ` • ${article.author.name}` : ''}
                        </p>

                        {article.excerpt ? (
                            <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{article.excerpt}</p>
                        ) : null}

                        <div className="prose prose-slate mt-6 max-w-none whitespace-pre-line text-slate-700">
                            {article.content}
                        </div>
                    </article>
                </main>
            </div>
        </>
    );
}
