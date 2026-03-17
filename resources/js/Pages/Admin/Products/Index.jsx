import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

const pricingTypeLabels = {
    starting_from: 'Mulai dari',
    fixed: 'Harga tetap',
    custom: 'Custom pricing',
};

const formatCurrency = (amount, currency = 'IDR') => {
    if (amount === null || amount === undefined || amount === '') {
        return '-';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(Number(amount));
};

export default function ProductIndex({ products, categories, productTypeOptions, filters }) {
    const createForm = useForm({
        category_id: categories[0]?.id ?? '',
        product_type: productTypeOptions[0]?.value ?? 'solution_catalog',
        name: '',
        slug: '',
        short_description: '',
        description: '',
        price: '',
        sale_price: '',
        pricing_type: 'starting_from',
        currency: 'IDR',
        demo_url: '',
        is_featured: false,
        is_active: true,
        sort_order: 0,
    });

    const editForm = useForm({
        id: null,
        category_id: '',
        product_type: 'solution_catalog',
        name: '',
        slug: '',
        short_description: '',
        description: '',
        price: '',
        sale_price: '',
        pricing_type: 'starting_from',
        currency: 'IDR',
        demo_url: '',
        is_featured: false,
        is_active: true,
        sort_order: 0,
    });

    const submitCreate = (e) => {
        e.preventDefault();
        createForm.post(route('products.store'), {
            preserveScroll: true,
            onSuccess: () => createForm.reset('name', 'slug', 'short_description', 'description', 'price', 'sale_price', 'demo_url', 'is_featured'),
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('products.update', editForm.data.id), {
            preserveScroll: true,
            onSuccess: () => editForm.reset(),
        });
    };

    const startEdit = (product) => {
        editForm.setData({
            id: product.id,
            category_id: product.category_id,
            product_type: product.product_type,
            name: product.name,
            slug: product.slug,
            short_description: product.short_description ?? '',
            description: product.description ?? '',
            price: product.price ?? '',
            sale_price: product.sale_price ?? '',
            pricing_type: product.pricing_type ?? 'starting_from',
            currency: product.currency ?? 'IDR',
            demo_url: product.demo_url ?? '',
            is_featured: Boolean(product.is_featured),
            is_active: Boolean(product.is_active),
            sort_order: product.sort_order ?? 0,
        });
    };

    const columns = useMemo(() => [
        {
            key: 'name',
            label: 'Produk',
            render: (product) => (
                <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.slug}</p>
                </div>
            ),
        },
        {
            key: 'product_type',
            label: 'Tipe',
            render: (product) => productTypeOptions.find((option) => option.value === product.product_type)?.label ?? '-',
        },
        {
            key: 'category',
            label: 'Kategori',
            render: (product) => product.category?.name ?? '-',
        },
        {
            key: 'pricing',
            label: 'Harga',
            render: (product) => (
                <div>
                    <p>{formatCurrency(product.price, product.currency)}</p>
                    {product.sale_price ? <p className="text-xs text-emerald-600">Promo: {formatCurrency(product.sale_price, product.currency)}</p> : null}
                    <p className="text-xs text-gray-500">{pricingTypeLabels[product.pricing_type] ?? '-'}</p>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (product) => (
                <div className="space-y-1 text-xs">
                    <p className={product.is_active ? 'text-emerald-600' : 'text-red-600'}>{product.is_active ? 'Aktif' : 'Nonaktif'}</p>
                    {product.is_featured ? <p className="text-indigo-600">Unggulan</p> : null}
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (product) => (
                <div className="space-x-2">
                    <button className="rounded bg-blue-600 px-3 py-1 text-white" onClick={() => startEdit(product)}>Edit</button>
                    <button
                        className="rounded bg-red-600 px-3 py-1 text-white"
                        onClick={() => {
                            if (confirm('Hapus produk ini?')) {
                                editForm.delete(route('products.destroy', product.id), { preserveScroll: true });
                            }
                        }}
                    >
                        Hapus
                    </button>
                </div>
            ),
        },
    ], [editForm, productTypeOptions]);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Product Management</h2>}>
            <Head title="Product Management" />

            <div className="py-8">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Tambah Produk</h3>
                        <form onSubmit={submitCreate} className="space-y-3">
                            <input className="w-full rounded border-gray-300" placeholder="Nama produk" value={createForm.data.name} onChange={(e) => createForm.setData('name', e.target.value)} />
                            <input className="w-full rounded border-gray-300" placeholder="Slug" value={createForm.data.slug} onChange={(e) => createForm.setData('slug', e.target.value)} />
                            <select className="w-full rounded border-gray-300" value={createForm.data.product_type} onChange={(e) => createForm.setData('product_type', e.target.value)}>
                                {productTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <select className="w-full rounded border-gray-300" value={createForm.data.category_id} onChange={(e) => createForm.setData('category_id', e.target.value)}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <textarea className="w-full rounded border-gray-300" rows="3" placeholder="Deskripsi singkat" value={createForm.data.short_description} onChange={(e) => createForm.setData('short_description', e.target.value)} />
                            <textarea className="w-full rounded border-gray-300" rows="4" placeholder="Deskripsi detail (opsional)" value={createForm.data.description} onChange={(e) => createForm.setData('description', e.target.value)} />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" className="w-full rounded border-gray-300" placeholder="Harga" value={createForm.data.price} onChange={(e) => createForm.setData('price', e.target.value)} />
                                <input type="number" className="w-full rounded border-gray-300" placeholder="Harga promo" value={createForm.data.sale_price} onChange={(e) => createForm.setData('sale_price', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <select className="w-full rounded border-gray-300" value={createForm.data.pricing_type} onChange={(e) => createForm.setData('pricing_type', e.target.value)}>
                                    <option value="starting_from">Mulai dari</option>
                                    <option value="fixed">Harga tetap</option>
                                    <option value="custom">Custom pricing</option>
                                </select>
                                <input className="w-full rounded border-gray-300" maxLength="3" placeholder="Currency (IDR)" value={createForm.data.currency} onChange={(e) => createForm.setData('currency', e.target.value.toUpperCase())} />
                            </div>
                            <input className="w-full rounded border-gray-300" type="url" placeholder="Live Demo URL (opsional)" value={createForm.data.demo_url} onChange={(e) => createForm.setData('demo_url', e.target.value)} />
                            <input type="number" min="0" className="w-full rounded border-gray-300" placeholder="Urutan tampil" value={createForm.data.sort_order} onChange={(e) => createForm.setData('sort_order', e.target.value)} />
                            <div className="flex flex-wrap gap-4">
                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={createForm.data.is_active} onChange={(e) => createForm.setData('is_active', e.target.checked)} />
                                    Aktif
                                </label>
                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={createForm.data.is_featured} onChange={(e) => createForm.setData('is_featured', e.target.checked)} />
                                    Produk unggulan
                                </label>
                            </div>
                            <button className="rounded bg-indigo-600 px-4 py-2 text-white">Simpan</button>
                        </form>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Edit Produk</h3>
                        {editForm.data.id ? (
                            <form onSubmit={submitUpdate} className="space-y-3">
                                <input className="w-full rounded border-gray-300" placeholder="Nama produk" value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} />
                                <input className="w-full rounded border-gray-300" placeholder="Slug" value={editForm.data.slug} onChange={(e) => editForm.setData('slug', e.target.value)} />
                                <select className="w-full rounded border-gray-300" value={editForm.data.product_type} onChange={(e) => editForm.setData('product_type', e.target.value)}>
                                    {productTypeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <select className="w-full rounded border-gray-300" value={editForm.data.category_id} onChange={(e) => editForm.setData('category_id', e.target.value)}>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                <textarea className="w-full rounded border-gray-300" rows="3" placeholder="Deskripsi singkat" value={editForm.data.short_description} onChange={(e) => editForm.setData('short_description', e.target.value)} />
                                <textarea className="w-full rounded border-gray-300" rows="4" placeholder="Deskripsi detail (opsional)" value={editForm.data.description} onChange={(e) => editForm.setData('description', e.target.value)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="number" className="w-full rounded border-gray-300" placeholder="Harga" value={editForm.data.price} onChange={(e) => editForm.setData('price', e.target.value)} />
                                    <input type="number" className="w-full rounded border-gray-300" placeholder="Harga promo" value={editForm.data.sale_price} onChange={(e) => editForm.setData('sale_price', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <select className="w-full rounded border-gray-300" value={editForm.data.pricing_type} onChange={(e) => editForm.setData('pricing_type', e.target.value)}>
                                        <option value="starting_from">Mulai dari</option>
                                        <option value="fixed">Harga tetap</option>
                                        <option value="custom">Custom pricing</option>
                                    </select>
                                    <input className="w-full rounded border-gray-300" maxLength="3" placeholder="Currency (IDR)" value={editForm.data.currency} onChange={(e) => editForm.setData('currency', e.target.value.toUpperCase())} />
                                </div>
                                <input className="w-full rounded border-gray-300" type="url" placeholder="Live Demo URL (opsional)" value={editForm.data.demo_url} onChange={(e) => editForm.setData('demo_url', e.target.value)} />
                                <input type="number" min="0" className="w-full rounded border-gray-300" placeholder="Urutan tampil" value={editForm.data.sort_order} onChange={(e) => editForm.setData('sort_order', e.target.value)} />
                                <div className="flex flex-wrap gap-4">
                                    <label className="inline-flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={editForm.data.is_active} onChange={(e) => editForm.setData('is_active', e.target.checked)} />
                                        Aktif
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={editForm.data.is_featured} onChange={(e) => editForm.setData('is_featured', e.target.checked)} />
                                        Produk unggulan
                                    </label>
                                </div>
                                <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                            </form>
                        ) : (
                            <p className="text-sm text-gray-500">Klik tombol Edit pada tabel produk.</p>
                        )}
                    </div>
                </div>

                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        rows={products.data}
                        getRowKey={(product) => product.id}
                        routeName="products.index"
                        filters={filters}
                        searchPlaceholder="Cari nama, slug, atau deskripsi singkat..."
                        filterOptions={[
                            {
                                key: 'type',
                                label: 'Tipe Produk',
                                placeholder: 'Semua tipe',
                                options: productTypeOptions,
                            },
                            {
                                key: 'active',
                                label: 'Status',
                                placeholder: 'Semua status',
                                options: [
                                    { value: '1', label: 'Aktif' },
                                    { value: '0', label: 'Nonaktif' },
                                ],
                            },
                        ]}
                        pagination={products}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
