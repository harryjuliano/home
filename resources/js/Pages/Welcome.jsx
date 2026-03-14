import { Head, Link } from '@inertiajs/react';

const navItems = [
    'Products',
    'Industries',
    'Transform and Support',
    'Learning',
    'Community',
    'Partners',
    'About',
];

const pageItems = [
    'Understanding ERP migration',
    'Preparing for ERP migration',
    'Why businesses are migrating to cloud ERP',
    'Common challenges with ERP data migration',
    'ERP data migration best practices',
];

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="What is ERP migration?" />

            <div className="min-h-screen w-full bg-[#f4f6f8] text-[#0a2746]">
                <header className="w-full border-b border-slate-200 bg-[#eef1f4]">
                    <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-8 px-10 py-4">
                        <div className="flex items-center gap-8">
                            <div className="flex h-12 w-20 items-center justify-center rounded bg-[#009de0] text-3xl font-black italic text-white">
                                SAP
                            </div>
                            <nav className="hidden items-center gap-7 text-[24px] font-medium text-[#0a2746] xl:flex">
                                {navItems.map((item) => (
                                    <a key={item} href="#" className="transition hover:text-[#007cc0]">
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="flex items-center gap-5 text-[22px] font-medium text-[#0a2746]">
                            <a href="#" className="hidden sm:inline hover:text-[#007cc0]">
                                Explore SAP
                            </a>
                            <span className="text-2xl">⌕</span>
                            {canLogin && (
                                auth.user ? (
                                    <Link href={route('dashboard')} className="rounded border border-[#0a2746] px-4 py-2 text-base font-semibold">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="rounded border border-[#0a2746]/30 px-4 py-2 text-base font-semibold hover:border-[#0a2746]">
                                            Login
                                        </Link>
                                        {canRegister && (
                                            <Link href={route('register')} className="rounded bg-[#007cc0] px-4 py-2 text-base font-semibold text-white">
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-24 px-10 py-16">
                    <section className="grid min-h-[58vh] gap-14 xl:grid-cols-2 xl:items-center">
                        <div className="space-y-8">
                            <p className="text-[24px] font-bold uppercase tracking-wide text-[#0d3d66] underline">What is</p>
                            <h1 className="max-w-4xl text-6xl font-bold leading-tight text-[#001a33] 2xl:text-7xl">What is ERP migration?</h1>
                            <p className="max-w-4xl text-[38px] leading-snug text-[#143b5f]">
                                Enterprise resource planning (ERP) migration is the process of strategically moving data from
                                primary sources across a business into a new ERP system.
                            </p>
                            <p className="text-[28px] text-[#3b5975]">Published on December 13, 2024</p>
                            <span className="inline-flex rounded-md bg-slate-200 px-4 py-2 text-xl font-semibold text-[#23405e]">ERP</span>
                        </div>

                        <div className="overflow-hidden rounded-3xl shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=80"
                                alt="Team collaborating around a table"
                                className="h-full min-h-[420px] w-full object-cover"
                            />
                        </div>
                    </section>

                    <section className="grid gap-14 xl:grid-cols-[1fr_2.4fr_1.2fr] xl:items-start">
                        <aside className="space-y-7">
                            <h2 className="text-4xl font-bold text-[#0c2f4e]">What's on this page</h2>
                            <ul className="space-y-4 border-l-2 border-[#2c7eb9] pl-5">
                                {pageItems.map((item, index) => (
                                    <li key={item} className={index === 0 ? 'text-[#005f9c]' : 'text-[#0c2f4e]'}>
                                        <a href="#" className="text-2xl font-semibold leading-tight hover:text-[#007cc0]">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        <article className="space-y-7">
                            <h2 className="text-6xl font-bold leading-tight text-[#001a33]">Understanding ERP migration</h2>
                            <p className="text-[34px] leading-snug text-[#143b5f]">
                                <a className="text-[#0068aa] underline" href="#">
                                    ERP
                                </a>{' '}
                                is like a business’s central nervous system. ERP solutions give organizations visibility into
                                what’s happening across core business areas, including finance, supply chain, customer service,
                                and HR, to name a few. This helps companies manage multiple intertwined processes within a single
                                integrated system.
                            </p>
                            <p className="text-[34px] leading-snug text-[#143b5f]">
                                An ERP migration is necessary when a legacy ERP becomes obsolete, no longer keeps up with customer
                                needs, or limits a business’s ability to meet competitive demands. Whatever the case, data
                                migration is a critical and potentially painstaking part of getting a new ERP up and running.
                            </p>
                        </article>

                        <aside className="rounded-2xl bg-[#dbeaf4] p-6">
                            <div className="inline-flex h-24 w-36 items-center justify-center rounded bg-[#009de0] text-5xl font-black italic text-white">
                                SAP
                            </div>
                            <p className="mt-6 text-2xl font-bold uppercase text-[#0068aa]">SAP Product</p>
                            <h3 className="mt-2 text-5xl font-bold leading-tight text-[#001a33]">Future-proof your business</h3>
                            <p className="mt-4 text-2xl leading-snug text-[#23405e]">
                                See how migrating to an AI-enabled cloud ERP platform can streamline operations and unlock growth.
                            </p>
                        </aside>
                    </section>
                </main>
            </div>
        </>
    );
}
