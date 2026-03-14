import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

export default function BlogCategoryIndex({ categories, filters }) {
    const createForm = useForm({
        name: '',
        slug: '',
        description: '',
        is_active: true,
    });

    const editForm = useForm({
        id: null,
        name: '',
        slug: '',
        description: '',
        is_active: true,
    });

    const submitCreate = (e) => {
        e.preventDefault();
        createForm.post(route('blog-categories.store'), {
            preserveScroll: true,
            onSuccess: () => createForm.reset('name', 'slug', 'description'),
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('blog-categories.update', editForm.data.id), {
            preserveScroll: true,
            onSuccess: () => editForm.reset(),
        });
    };

    const startEdit = (category) => {
        editForm.setData({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description ?? '',
            is_active: Boolean(category.is_active),
        });
    };

    const columns = useMemo(() => [
        {
            key: 'name',
            label: 'Nama',
            render: (category) => category.name,
        },
        {
            key: 'slug',
            label: 'Slug',
            render: (category) => category.slug,
        },
        {
            key: 'posts_count',
            label: 'Jumlah Artikel',
            render: (category) => category.posts_count,
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (category) => (category.is_active ? 'Aktif' : 'Nonaktif'),
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (category) => (
                <div className="space-x-2">
                    <button className="rounded bg-blue-600 px-3 py-1 text-white" onClick={() => startEdit(category)}>Edit</button>
                    <button
                        className="rounded bg-red-600 px-3 py-1 text-white"
                        onClick={() => {
                            if (confirm('Hapus kategori ini?')) {
                                editForm.delete(route('blog-categories.destroy', category.id), { preserveScroll: true });
                            }
                        }}
                    >
                        Hapus
                    </button>
                </div>
            ),
        },
    ], [editForm]);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kategori Artikel</h2>}
        >
            <Head title="Kategori Artikel" />

            <div className="py-8">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Tambah Kategori</h3>
                        <form onSubmit={submitCreate} className="space-y-3">
                            <input className="w-full rounded border-gray-300" placeholder="Nama" value={createForm.data.name} onChange={(e) => createForm.setData('name', e.target.value)} />
                            <input className="w-full rounded border-gray-300" placeholder="Slug" value={createForm.data.slug} onChange={(e) => createForm.setData('slug', e.target.value)} />
                            <textarea className="w-full rounded border-gray-300" rows="4" placeholder="Deskripsi (opsional)" value={createForm.data.description} onChange={(e) => createForm.setData('description', e.target.value)} />
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={createForm.data.is_active} onChange={(e) => createForm.setData('is_active', e.target.checked)} />
                                Kategori aktif
                            </label>
                            <button className="rounded bg-indigo-600 px-4 py-2 text-white">Simpan</button>
                        </form>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Edit Kategori</h3>
                        {editForm.data.id ? (
                            <form onSubmit={submitUpdate} className="space-y-3">
                                <input className="w-full rounded border-gray-300" placeholder="Nama" value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} />
                                <input className="w-full rounded border-gray-300" placeholder="Slug" value={editForm.data.slug} onChange={(e) => editForm.setData('slug', e.target.value)} />
                                <textarea className="w-full rounded border-gray-300" rows="4" placeholder="Deskripsi (opsional)" value={editForm.data.description} onChange={(e) => editForm.setData('description', e.target.value)} />
                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={editForm.data.is_active} onChange={(e) => editForm.setData('is_active', e.target.checked)} />
                                    Kategori aktif
                                </label>
                                <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                            </form>
                        ) : (
                            <p className="text-sm text-gray-500">Klik tombol Edit pada tabel kategori.</p>
                        )}
                    </div>
                </div>

                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        rows={categories.data}
                        getRowKey={(category) => category.id}
                        routeName="blog-categories.index"
                        filters={filters}
                        searchPlaceholder="Cari nama, slug, atau deskripsi..."
                        filterOptions={[
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
                        pagination={categories}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
