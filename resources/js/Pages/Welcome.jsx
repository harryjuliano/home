import { Head, Link } from '@inertiajs/react';

const menu = [
    { label: 'Home', href: '#home' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Solusi', href: '#solusi' },
    { label: 'Produk', href: '#produk' },
    { label: 'Blog', href: '#blog' },
    { label: 'Portofolio', href: '#portofolio' },
    { label: 'Harga', href: '#harga' },
    { label: 'Kontak', href: '#kontak' },
];

const solutions = [
    'Design System',
    'Financial System',
    'Business Process Automation',
    'ERP Integration',
    'Custom Business Application',
];

const products = [
    {
        name: 'Julianoo Finance Suite',
        description: 'Kontrol cashflow, budgeting, dan laporan keuangan real-time.',
    },
    {
        name: 'Julianoo Inventory Suite',
        description: 'Manajemen stok, procurement, dan kontrol gudang terintegrasi.',
    },
    {
        name: 'Julianoo CRM Suite',
        description: 'Optimalkan pipeline sales, follow-up lead, dan retensi pelanggan.',
    },
    {
        name: 'Julianoo Custom ERP Solution',
        description: 'Solusi ERP modular sesuai proses bisnis perusahaan Anda.',
    },
];

const stats = [
    { label: 'Implementasi Sistem', value: '120+' },
    { label: 'Industri Dilayani', value: '18' },
    { label: 'Kenaikan Efisiensi Klien', value: '35%' },
    { label: 'Rata-rata Waktu Go-Live', value: '6 Minggu' },
];

const blogPosts = [
    'Panduan memilih ERP untuk perusahaan skala menengah',
    '5 tanda proses keuangan bisnis Anda perlu diotomasi',
    'Cara membangun dashboard operasional yang actionable',
];

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Julianoo Bisnis Partner" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                        <a href="#home" className="text-lg font-bold tracking-wide text-cyan-300">
                            Julianoo Bisnis Partner
                        </a>
                        <nav className="hidden gap-5 text-sm text-slate-200 md:flex">
                            {menu.map((item) => (
                                <a key={item.label} href={item.href} className="transition hover:text-cyan-300">
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center gap-3 text-sm">
                            {canLogin && (
                                auth.user ? (
                                    <Link href={route('dashboard')} className="rounded-lg border border-cyan-400/70 px-3 py-1.5 text-cyan-300">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-slate-200 hover:text-cyan-300">
                                            Masuk
                                        </Link>
                                        {canRegister && (
                                            <Link href={route('register')} className="rounded-lg bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950">
                                                Daftar
                                            </Link>
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-14">
                    <section id="home" className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <p className="inline-block rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                                Company Profile + Blog + B2B Commerce
                            </p>
                            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
                                Bangun Mesin Marketing & Lead Generation untuk
                                <span className="text-cyan-300"> Solusi ERP Bisnis Anda</span>
                            </h1>
                            <p className="text-lg text-slate-300">
                                Julianoo Bisnis Partner membantu bisnis melakukan digitalisasi proses, otomasi operasional,
                                dan integrasi sistem keuangan melalui pendekatan design system yang scalable.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a href="#konsultasi" className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950">
                                    Konsultasi Gratis
                                </a>
                                <a href="#produk" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white">
                                    Lihat Produk ERP
                                </a>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {stats.map((item) => (
                                <article key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-3xl font-bold text-cyan-300">{item.value}</p>
                                    <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="tentang" className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 p-8">
                        <h2 className="text-3xl font-bold text-white">Tentang Julianoo Bisnis Partner</h2>
                        <p className="mt-4 max-w-4xl text-slate-300">
                            Kami berfokus pada business solution, design system, financial system, dan business process automation.
                            Website ini didesain sebagai pusat edukasi, trust builder, dan sales engine B2B untuk konversi lead
                            menjadi klien implementasi ERP.
                        </p>
                    </section>

                    <section id="solusi" className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Solusi Utama</h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {solutions.map((solution) => (
                                <article key={solution} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <h3 className="font-semibold text-cyan-300">{solution}</h3>
                                    <p className="mt-2 text-sm text-slate-300">
                                        Strategi implementasi terukur, dokumentasi proses, serta roadmap transformasi digital yang jelas.
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="produk" className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Katalog Produk ERP</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {products.map((product) => (
                                <article key={product.name} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-6">
                                    <h3 className="text-xl font-semibold text-cyan-200">{product.name}</h3>
                                    <p className="mt-2 text-slate-300">{product.description}</p>
                                    <div className="mt-4 flex gap-3 text-sm">
                                        <button className="rounded-lg bg-cyan-400 px-3 py-2 font-semibold text-slate-950">Request Demo</button>
                                        <button className="rounded-lg border border-white/20 px-3 py-2">Minta Penawaran</button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="blog" className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Blog Edukasi untuk Inbound Marketing</h2>
                        <div className="grid gap-4 lg:grid-cols-3">
                            {blogPosts.map((post) => (
                                <article key={post} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-wide text-cyan-300">Kategori: ERP & Operasional</p>
                                    <h3 className="mt-2 text-lg font-semibold text-white">{post}</h3>
                                    <p className="mt-2 text-sm text-slate-300">Dilengkapi CTA menuju produk, demo, dan konsultasi untuk meningkatkan conversion.</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="portofolio" className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Portofolio & Case Study</h2>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                            <p>
                                Setiap studi kasus menampilkan problem, solution, result, dan impact bisnis agar visitor memahami
                                nilai implementasi ERP secara konkret.
                            </p>
                        </div>
                    </section>

                    <section id="harga" className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Harga & Paket Implementasi</h2>
                        <div className="grid gap-4 lg:grid-cols-3">
                            {['Starter', 'Growth', 'Enterprise'].map((pack) => (
                                <article key={pack} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <h3 className="text-xl font-semibold text-white">{pack}</h3>
                                    <p className="mt-2 text-sm text-slate-300">Paket fleksibel untuk software, implementasi, dan custom development.</p>
                                    <a href="#konsultasi" className="mt-4 inline-block text-sm font-semibold text-cyan-300">
                                        Diskusikan kebutuhan →
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="konsultasi" className="rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-8">
                        <h2 className="text-3xl font-bold text-white">Konsultasi Gratis / Request Demo</h2>
                        <p className="mt-3 max-w-3xl text-slate-200">
                            Jelaskan kebutuhan bisnis Anda (industri, jumlah user, masalah utama, dan range budget). Tim kami akan
                            menghubungi untuk sesi discovery dan solusi yang paling relevan.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="mailto:hello@julianoo.id" className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950">
                                Kirim Email
                            </a>
                            <a href="https://wa.me/6281234567890" className="rounded-lg border border-white/40 px-5 py-3 font-semibold text-white">
                                Chat WhatsApp
                            </a>
                        </div>
                    </section>
                </main>

                <footer id="kontak" className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
                    © {new Date().getFullYear()} Julianoo Bisnis Partner · Business Solution · Design System · Financial System · Automation
                </footer>
            </div>
        </>
    );
}
