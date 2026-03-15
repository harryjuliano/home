import { Head, Link } from '@inertiajs/react';

const defaultProductBackground =
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

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

                            <p className="text-slate-700">{product.description ?? product.short_description ?? 'Deskripsi produk belum tersedia.'}</p>

                            <div className="pt-2">
                                <a
                                    href="/#kontak"
                                    className="inline-flex rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white"
                                >
                                    Minta Demo / Beli
                                </a>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
}
