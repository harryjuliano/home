import { Head, Link } from '@inertiajs/react';

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

const products = [
    { name: 'Accounting System', desc: 'Kontrol arus kas, buku besar, dan laporan keuangan dalam satu modul.', pricing: 'Mulai dari Rp4.500.000' },
    { name: 'CRM Solution', desc: 'Kelola prospek, pipeline penjualan, dan aktivitas tim sales secara terstruktur.', pricing: 'Mulai dari Rp3.900.000' },
    { name: 'HRD Management', desc: 'Absensi, payroll, evaluasi, dan administrasi karyawan dalam satu dashboard.', pricing: 'Mulai dari Rp4.200.000' },
    { name: 'Custom ERP Suite', desc: 'Sistem ERP fleksibel sesuai proses bisnis perusahaan Anda.', pricing: 'Custom Pricing' },
];

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

const insights = [
    {
        category: 'ERP',
        title: 'Kapan waktu yang tepat migrasi ke ERP terintegrasi?',
        date: '12 Januari 2026',
    },
    {
        category: 'Finance',
        title: '5 cara mempercepat closing laporan keuangan bulanan',
        date: '8 Januari 2026',
    },
    {
        category: 'Automation',
        title: 'Workflow approval digital untuk mengurangi bottleneck operasional',
        date: '2 Januari 2026',
    },
];

const faqItems = [
    'Apakah sistem bisa custom sesuai kebutuhan perusahaan?',
    'Apakah bisa integrasi antar modul dan aplikasi existing?',
    'Apakah cocok untuk perusahaan kecil dan menengah?',
    'Bagaimana skema implementasi dari awal sampai go-live?',
    'Apakah ada support setelah implementasi selesai?',
];

export default function Welcome({ auth, canLogin, canRegister }) {
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
                            <div className="mt-8 grid gap-5 md:grid-cols-2">
                                {products.map((product) => (
                                    <article key={product.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                        <h3 className="text-xl font-bold text-[#0F172A]">{product.name}</h3>
                                        <p className="mt-2 text-sm text-slate-600">{product.desc}</p>
                                        <p className="mt-4 text-sm font-semibold text-[#0f766e]">{product.pricing}</p>
                                        <div className="mt-5 flex gap-3">
                                            <a href="#" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Detail</a>
                                            <a href="#" className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white">Minta Demo / Beli</a>
                                        </div>
                                    </article>
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
                            {insights.map((item) => (
                                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <span className="inline-flex rounded-full bg-[#14B8A6]/15 px-3 py-1 text-xs font-semibold text-[#0f766e]">{item.category}</span>
                                    <h3 className="mt-4 text-lg font-bold text-[#0F172A]">{item.title}</h3>
                                    <p className="mt-2 text-sm text-slate-500">{item.date}</p>
                                    <a href="#" className="mt-4 inline-block text-sm font-semibold text-[#1D4ED8]">Baca artikel →</a>
                                </article>
                            ))}
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
                        <div className="rounded-3xl bg-[#0F172A] px-8 py-12 text-center text-white">
                            <h2 className="text-3xl font-bold md:text-4xl">Siap Membangun Sistem Bisnis yang Lebih Rapi dan Efisien?</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-slate-300">Diskusikan kebutuhan perusahaan Anda bersama tim Julianoo Bisnis Partner untuk mendapatkan strategi transformasi digital yang tepat.</p>
                            <div className="mt-7 flex flex-wrap justify-center gap-3">
                                <a href="#" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0F172A]">Konsultasi Gratis</a>
                                <a href="#" className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white">Lihat Produk Kami</a>
                            </div>
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
