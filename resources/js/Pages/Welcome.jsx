import { Head, Link, useForm } from '@inertiajs/react';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Solusi / Produk', href: '#solusi-produk' },
    { label: 'Blog', href: '#blog' },
    { label: 'Kontak', href: '#kontak' },
];

const trustMetrics = [
    { value: '20+', label: 'Proyek Digitalisasi' },
    { value: '10+', label: 'Modul Bisnis' },
    { value: '8+', label: 'Industri Ditangani' },
    { value: '24/7', label: 'Support Implementasi' },
];

const services = [
    {
        title: 'Business System Design',
        description: 'Merancang sistem bisnis yang lebih rapi, terukur, dan selaras dengan alur kerja perusahaan.',
    },
    {
        title: 'Financial Process Setup',
        description: 'Menyusun proses finance dan pelaporan agar pengambilan keputusan lebih cepat dan akurat.',
    },
    {
        title: 'ERP Development',
        description: 'Mengembangkan ERP custom untuk mendukung kebutuhan operasional lintas divisi.',
    },
    {
        title: 'Workflow Automation',
        description: 'Mengurangi pekerjaan manual dengan alur approval dan otomatisasi proses bisnis.',
    },
    {
        title: 'Dashboard & Reporting',
        description: 'Menyediakan dashboard real-time agar performa bisnis dapat dipantau dengan mudah.',
    },
    {
        title: 'Integration Services',
        description: 'Menghubungkan data antar aplikasi dan modul agar operasional lebih terintegrasi.',
    },
];



const productTypeMeta = {
    solution_catalog: {
        title: 'Solution Catalog',
        subtitle: 'Katalog solusi siap implementasi untuk kebutuhan operasional inti perusahaan.',
    },
    lead_generation: {
        title: 'Lead Generation',
        subtitle: 'Produk untuk menangkap prospek, nurture pipeline, dan meningkatkan konversi.',
    },
    digital_product_sales: {
        title: 'Digital Product Sales',
        subtitle: 'Produk digital siap jual untuk monetisasi layanan dan automasi transaksi.',
    },
};



const buildContactRequestLink = (productName) => {
    const params = new URLSearchParams({
        request_type: 'request_demo',
        subject: `Permintaan Demo ${productName}`,
    });

    return `/?${params.toString()}#kontak`;
};

const defaultProductBackground =
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

const getProductBackground = (product) => product.banner_image ?? product.thumbnail ?? defaultProductBackground;

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

const advantages = [
    'Custom sesuai alur bisnis perusahaan',
    'Bisa dikembangkan bertahap per modul',
    'Fokus pada efisiensi proses dan kontrol data',
    'Integrasi mulus antar aplikasi',
    'Teknologi modern, aman, dan scalable',
    'Pendampingan implementasi hingga go-live',
];

const workflow = [
    'Analisa kebutuhan bisnis',
    'Perancangan proses & sistem',
    'Pengembangan solusi',
    'Uji coba dan implementasi',
    'Support lanjutan',
];

const faqItems = [
    'Apakah sistem bisa custom sesuai kebutuhan perusahaan?',
    'Apakah bisa integrasi antar modul dan aplikasi existing?',
    'Apakah cocok untuk perusahaan kecil dan menengah?',
    'Bagaimana skema implementasi dari awal sampai go-live?',
    'Apakah ada support setelah implementasi selesai?',
];


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

export default function Welcome({ auth, canLogin, canRegister, publishedArticles = [], featuredProducts = [], prefilledContactRequest = {} }) {

    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        name: '',
        email: '',
        whatsapp_number: '',
        company_name: '',
        request_type: prefilledContactRequest.request_type ?? 'request_demo',
        subject: prefilledContactRequest.subject ?? '',
        message: '',
    });

    const submitContactRequest = (e) => {
        e.preventDefault();

        post(route('contact-requests.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('message');
            },
        });
    };

    const groupedProducts = Object.keys(productTypeMeta).map((type) => ({
        type,
        ...productTypeMeta[type],
        products: featuredProducts.filter((product) => product.product_type === type),
    }));

    return (
        <>
            <Head title="Julianoo Bisnis Partner" />

            <div id="home" className="min-h-screen scroll-smooth bg-[#F8FAFC] text-[#0B1220]">
                <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                        <div className="text-lg font-bold tracking-tight text-[#0F172A]">Julianoo Bisnis Partner</div>

                        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} className="transition hover:text-[#1D4ED8]">
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#1D4ED8] hover:text-[#1D4ED8] sm:inline-flex"
                            >
                                Lihat Produk
                            </a>
                            <a
                                href="#"
                                className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e40af]"
                            >
                                Konsultasi Gratis
                            </a>
                            {canLogin && (
                                auth.user ? (
                                    <Link href={route('dashboard')} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                                            Login
                                        </Link>
                                        {canRegister && (
                                            <Link href={route('register')} className="hidden rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white sm:inline-flex">
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </header>

                <main>
                    <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-20 pt-16 lg:grid-cols-2 lg:items-center lg:px-8">
                        <div className="space-y-6">
                            <span className="inline-flex rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#0f766e]">
                                Corporate SaaS Minimalism
                            </span>
                            <h1 className="text-4xl font-bold leading-tight text-[#0F172A] md:text-5xl">
                                Solusi Sistem Bisnis, Keuangan, dan Otomatisasi untuk Perusahaan yang Ingin Bertumbuh Lebih Cepat
                            </h1>
                            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                                Julianoo Bisnis Partner membantu perusahaan membangun sistem bisnis yang lebih rapi, terukur, dan efisien melalui pengembangan ERP, desain proses, dan integrasi operasional.
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <a href="#" className="rounded-2xl bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e40af]">
                                    Konsultasi Sekarang
                                </a>
                                <a href="#" className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#1D4ED8] hover:text-[#1D4ED8]">
                                    Lihat Solusi
                                </a>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li>• Dipercaya untuk implementasi sistem bisnis</li>
                                <li>• Custom sesuai proses perusahaan</li>
                                <li>• Siap integrasi antar divisi</li>
                            </ul>
                        </div>

                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1280&q=80"
                                alt="Dashboard ERP"
                                className="h-full min-h-[320px] w-full rounded-2xl object-cover"
                            />
                            <div className="absolute bottom-8 left-8 rounded-xl border border-white/60 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                                ERP Dashboard • Real-time Insight
                            </div>
                        </div>
                    </section>

                    <section className="border-y border-slate-200 bg-white">
                        <div className="mx-auto grid w-full max-w-7xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
                            {trustMetrics.map((metric) => (
                                <div key={metric.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
                                    <p className="text-3xl font-bold text-[#0F172A]">{metric.value}</p>
                                    <p className="mt-2 text-sm text-slate-600">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="tentang-kami" className="mx-auto grid w-full max-w-7xl scroll-mt-28 gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
                        <div className="space-y-5">
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#1D4ED8]">Tentang Julianoo</p>
                            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">Partner transformasi digital untuk bisnis yang ingin naik kelas</h2>
                            <p className="text-slate-600">
                                Kami berfokus pada design sistem bisnis, financial process, dan business automation agar operasional perusahaan lebih efisien, data lebih terkontrol, dan keputusan lebih cepat.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a href="#" className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white">Pelajari Perusahaan</a>
                                <a href="#" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Jadwalkan Diskusi</a>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80"
                                alt="Team discussion"
                                className="h-full min-h-[280px] w-full rounded-2xl object-cover"
                            />
                        </div>
                    </section>

                    <section id="layanan" className="mx-auto w-full max-w-7xl scroll-mt-28 px-6 pb-20 lg:px-8">
                        <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">Layanan Utama</h2>
                        <p className="mt-3 max-w-2xl text-slate-600">Layanan dirancang untuk merapikan proses bisnis, meningkatkan kontrol operasional, dan mempercepat pertumbuhan perusahaan.</p>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#14B8A6]/40 hover:shadow-md">
                                    <div className="mb-4 h-10 w-10 rounded-xl bg-[#1D4ED8]/10" />
                                    <h3 className="text-lg font-bold text-[#0F172A]">{service.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
                                    <a href="#" className="mt-4 inline-block text-sm font-semibold text-[#1D4ED8]">Pelajari lebih lanjut →</a>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="solusi-produk" className="scroll-mt-28 bg-white py-20">
                        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">Solusi / Produk ERP</h2>
                            <p className="mt-3 max-w-2xl text-slate-600">Solution Catalog + Lead Generation + Digital Product Sales.</p>

                            <div className="mt-8 space-y-8">
                                {groupedProducts.map((group) => (
                                    <div key={group.type} className="space-y-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#0F172A]">{group.title}</h3>
                                            <p className="text-sm text-slate-600">{group.subtitle}</p>
                                        </div>
                                        <div className="grid gap-5 md:grid-cols-2">
                                            {group.products.length > 0 ? group.products.map((product) => (
                                                <article
                                                    key={product.id}
                                                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                                    style={{
                                                        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.86), rgba(15, 118, 110, 0.58)), url(${getProductBackground(product)})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}
                                                >
                                                    <div className="relative z-10">
                                                        <h4 className="text-xl font-bold text-white">{product.name}</h4>
                                                        <p className="mt-2 text-sm text-slate-100">{product.short_description ?? '-'}</p>
                                                        <p className="mt-4 text-sm font-semibold text-emerald-100">{formatProductPrice(product)}</p>
                                                        <div className="mt-5 flex gap-3">
                                                            <Link href={route('products.show', product.slug)} className="rounded-xl border border-white/40 px-4 py-2 text-sm font-semibold text-white">Detail</Link>
                                                            <a href={buildContactRequestLink(product.name)} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0F172A]">Minta Demo / Beli</a>
                                                        </div>
                                                    </div>
                                                </article>
                                            )) : (
                                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                                                    Belum ada produk aktif pada kategori ini.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
                        <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">Why Choose Us</h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            {advantages.map((adv) => (
                                <div key={adv} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700 shadow-sm">
                                    ✓ {adv}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white py-20">
                        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">How We Work</h2>
                            <div className="mt-8 grid gap-4 md:grid-cols-5">
                                {workflow.map((item, index) => (
                                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="text-xs font-bold text-[#1D4ED8]">Step {index + 1}</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="blog" className="mx-auto w-full max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8">
                        <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">Insight Terbaru</h2>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {publishedArticles.length > 0 ? publishedArticles.map((item) => (
                                <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <span className="inline-flex rounded-full bg-[#14B8A6]/15 px-3 py-1 text-xs font-semibold text-[#0f766e]">{item.category?.name ?? 'Blog'}</span>
                                    <h3 className="mt-4 text-lg font-bold text-[#0F172A]">{item.title}</h3>
                                    <p className="mt-2 text-sm text-slate-500">{formatPublishedDate(item.published_at)}</p>
                                    <Link href={route('blog.show', item.slug)} className="mt-4 inline-block text-sm font-semibold text-[#1D4ED8]">Baca artikel →</Link>
                                </article>
                            )) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600 md:col-span-3">
                                    Belum ada artikel yang dipublikasikan.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="bg-white py-20">
                        <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">FAQ</h2>
                            <div className="mt-8 space-y-3">
                                {faqItems.map((question) => (
                                    <details key={question} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <summary className="cursor-pointer text-sm font-semibold text-slate-700">{question}</summary>
                                        <p className="mt-3 text-sm text-slate-600">Kami akan menyesuaikan solusi berdasarkan proses bisnis Anda dan menyiapkan roadmap implementasi yang jelas.</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="kontak" className="mx-auto w-full max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8">
                        <div className="rounded-3xl bg-[#0F172A] px-8 py-12 text-white">
                            <h2 className="text-3xl font-bold md:text-4xl">Hubungi Kami</h2>
                            <p className="mt-4 max-w-2xl text-slate-300">Gunakan form ini untuk request demo, pertanyaan umum, penawaran kerja sama, atau konsultasi kebutuhan sistem.</p>

                            <form onSubmit={submitContactRequest} className="mt-8 grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-slate-200">Nama</label>
                                    <input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-500 bg-slate-900 px-4 py-2 text-sm text-white" />
                                    {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-slate-200">Email</label>
                                    <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-500 bg-slate-900 px-4 py-2 text-sm text-white" />
                                    {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="whatsapp_number" className="text-sm font-medium text-slate-200">No Whatsapp</label>
                                    <input id="whatsapp_number" type="text" value={data.whatsapp_number} onChange={(e) => setData('whatsapp_number', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-500 bg-slate-900 px-4 py-2 text-sm text-white" />
                                    {errors.whatsapp_number && <p className="mt-1 text-xs text-rose-300">{errors.whatsapp_number}</p>}
                                </div>
                                <div>
                                    <label htmlFor="company_name" className="text-sm font-medium text-slate-200">Nama Perusahaan</label>
                                    <input id="company_name" type="text" value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-500 bg-slate-900 px-4 py-2 text-sm text-white" />
                                    {errors.company_name && <p className="mt-1 text-xs text-rose-300">{errors.company_name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="request_type" className="text-sm font-medium text-slate-200">Jenis Permintaan</label>
                                    <select id="request_type" value={data.request_type} onChange={(e) => setData('request_type', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-500 bg-slate-900 px-4 py-2 text-sm text-white">
                                        <option value="request_demo">Request demo</option>
                                        <option value="general_question">Pertanyaan umum</option>
                                        <option value="partnership_offer">Penawaran kerja sama</option>
                                        <option value="system_consultation">Konsultasi kebutuhan sistem</option>
                                    </select>
                                    {errors.request_type && <p className="mt-1 text-xs text-rose-300">{errors.request_type}</p>}
                                </div>
                                <div>
                                    <label htmlFor="subject" className="text-sm font-medium text-slate-200">Subjek</label>
                                    <input id="subject" type="text" value={data.subject} onChange={(e) => setData('subject', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-500 bg-slate-900 px-4 py-2 text-sm text-white" />
                                    {errors.subject && <p className="mt-1 text-xs text-rose-300">{errors.subject}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-200">Pesan</label>
                                    <textarea id="message" rows={5} value={data.message} onChange={(e) => setData('message', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-500 bg-slate-900 px-4 py-2 text-sm text-white" />
                                    {errors.message && <p className="mt-1 text-xs text-rose-300">{errors.message}</p>}
                                </div>
                                <div className="md:col-span-2 flex items-center justify-between gap-3">
                                    <button type="submit" disabled={processing} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0F172A] disabled:opacity-70">
                                        {processing ? 'Mengirim...' : 'Kirim Permintaan'}
                                    </button>
                                    {(wasSuccessful) && <p className="text-sm text-emerald-300">Permintaan berhasil dikirim.</p>}
                                </div>
                            </form>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-slate-200 bg-white">
                    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                        <div>
                            <h3 className="text-lg font-bold text-[#0F172A]">Julianoo Bisnis Partner</h3>
                            <p className="mt-3 text-sm text-slate-600">Solusi ERP, finance, dan business automation untuk perusahaan yang ingin transformasi digital secara terukur.</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#0F172A]">Menu</p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                <li>Home</li>
                                <li>Tentang Kami</li>
                                <li>Layanan</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#0F172A]">Solusi</p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                <li>Accounting</li>
                                <li>CRM</li>
                                <li>HRD</li>
                                <li>Custom ERP</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#0F172A]">Kontak</p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                <li>hello@julianoo.id</li>
                                <li>+62 812-0000-0000</li>
                                <li>Jakarta, Indonesia</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-500">
                        © {new Date().getFullYear()} Julianoo Bisnis Partner. Privacy Policy • Terms
                    </div>
                </footer>
            </div>
        </>
    );
}
