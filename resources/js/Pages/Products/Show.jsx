import { Head, Link } from '@inertiajs/react';

const defaultProductBackground =
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

const demoLoginOnlyProducts = new Set([
    'pos system',
    'inventory management system',
    'finance management system',
    'accounting system',
    'hr management system (hrd)',
    'payroll system',
    'maintenance management system',
]);

const shouldRedirectDemoToLogin = (productName = '') => demoLoginOnlyProducts.has(productName.trim().toLowerCase());

const buildContactRequestLink = (productName) => {
    const params = new URLSearchParams({
        request_type: 'request_demo',
        subject: `Permintaan Demo ${productName}`,
    });

    return `/?${params.toString()}#kontak`;
};

const formatProductPrice = (product) => {
    if (product.pricing_type === 'custom' || (!product.price && !product.sale_price)) {
        return 'Custom Pricing';
    }

    const amount = product.sale_price ?? product.price;

    if (!amount) {
        return 'Hubungi kami';
    }

    const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: product.currency ?? 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(amount));

    return product.pricing_type === 'starting_from' ? `Mulai dari ${formatted}` : formatted;
};

export default function Show({ product }) {
    const heroImage = product.banner_image ?? product.thumbnail ?? defaultProductBackground;
    const productDescription = product.description ?? product.short_description ?? 'Deskripsi produk belum tersedia.';

    return (
        <>
            <Head title={`${product.name} - Detail Produk`} />

            <main className="min-h-screen bg-[#F8FAFC]">
                <section className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8">
                    <Link href="/#solusi-produk" className="text-sm font-semibold text-[#1D4ED8]">
                        ← Kembali ke daftar solusi
                    </Link>

                    <article className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <img src={heroImage} alt={product.name} className="h-72 w-full object-cover" />

                        <div className="space-y-4 p-7">
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#1D4ED8]">
                                {product.category?.name ?? 'Produk'}
                            </p>
                            <h1 className="text-3xl font-bold text-[#0F172A]">{product.name}</h1>
                            <p className="text-lg font-semibold text-emerald-600">{formatProductPrice(product)}</p>

                            <div
                                className="space-y-4 text-slate-700 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_a]:font-semibold [&_a]:text-[#1D4ED8] [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: productDescription }}
                            />

                            <div className="flex flex-wrap gap-3 pt-2">
                                <a
                                    href={buildContactRequestLink(product.name)}
                                    className="inline-flex rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white"
                                >
                                    Hubungi Kami
                                </a>
                                {shouldRedirectDemoToLogin(product.name) ? (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex rounded-xl border border-[#1D4ED8] px-5 py-3 text-sm font-semibold text-[#1D4ED8]"
                                    >
                                        Live Demo
                                    </Link>
                                ) : product.demo_url ? (
                                    <a
                                        href={product.demo_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex rounded-xl border border-[#1D4ED8] px-5 py-3 text-sm font-semibold text-[#1D4ED8]"
                                    >
                                        Live Demo
                                    </a>
                                ) : (
                                    <span className="inline-flex cursor-not-allowed rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-400">
                                        Live Demo
                                    </span>
                                )}
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
}
