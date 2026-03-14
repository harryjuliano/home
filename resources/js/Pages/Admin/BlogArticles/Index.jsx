import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

const emptyForm = {
    id: null,
    category_id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    published_at: '',
    tag_ids: [],
};

const toTagIds = (tags = []) => tags.map((tag) => tag.id);

export default function BlogArticleIndex({ articles, categories, tags, filters }) {
    const createForm = useForm(emptyForm);
    const editForm = useForm(emptyForm);

    const toggleTag = (form, tagId) => {
        const hasTag = form.data.tag_ids.includes(tagId);
        form.setData(
            'tag_ids',
            hasTag ? form.data.tag_ids.filter((id) => id !== tagId) : [...form.data.tag_ids, tagId],
        );
    };

    const submitCreate = (e) => {
        e.preventDefault();
        createForm.post(route('blog-articles.store'), {
            preserveScroll: true,
            onSuccess: () => createForm.reset(),
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('blog-articles.update', editForm.data.id), {
            preserveScroll: true,
            onSuccess: () => editForm.reset(),
        });
    };

    const startEdit = (article) => {
        editForm.setData({
            id: article.id,
            category_id: article.category_id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt ?? '',
            content: article.content,
            status: article.status,
            published_at: article.published_at ? article.published_at.slice(0, 16) : '',
            tag_ids: toTagIds(article.tags),
        });
    };

    const columns = useMemo(() => [
        {
            key: 'title',
            label: 'Judul',
            render: (article) => article.title,
        },
        {
            key: 'category',
            label: 'Kategori',
            render: (article) => article.category?.name ?? '-',
        },
        {
            key: 'status',
            label: 'Status',
            render: (article) => article.status,
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (article) => (
                <div className="space-x-2">
                    <button className="rounded bg-blue-600 px-3 py-1 text-white" onClick={() => startEdit(article)}>Edit</button>
                    <button
                        className="rounded bg-red-600 px-3 py-1 text-white"
                        onClick={() => {
                            if (confirm('Hapus artikel ini?')) {
                                editForm.delete(route('blog-articles.destroy', article.id), { preserveScroll: true });
                            }
                        }}
                    >
                        Hapus
                    </button>
                </div>
            ),
        },
    ], [editForm]);

    const renderForm = (form, submitLabel, submitHandler) => (
        <form onSubmit={submitHandler} className="space-y-3">
            <select className="w-full rounded border-gray-300" value={form.data.category_id} onChange={(e) => form.setData('category_id', Number(e.target.value))}>
                <option value="">Pilih kategori</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <input className="w-full rounded border-gray-300" placeholder="Judul" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
            <input className="w-full rounded border-gray-300" placeholder="Slug" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
            <textarea className="w-full rounded border-gray-300" placeholder="Ringkasan" value={form.data.excerpt} onChange={(e) => form.setData('excerpt', e.target.value)} />
            <textarea className="w-full rounded border-gray-300" rows={4} placeholder="Konten" value={form.data.content} onChange={(e) => form.setData('content', e.target.value)} />
            <div className="grid gap-3 sm:grid-cols-2">
                <select className="w-full rounded border-gray-300" value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <input type="datetime-local" className="w-full rounded border-gray-300" value={form.data.published_at} onChange={(e) => form.setData('published_at', e.target.value)} />
            </div>
            <div>
                <p className="mb-1 text-sm font-medium">Tag</p>
                <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                        <label key={tag.id} className="text-sm">
                            <input type="checkbox" className="mr-1" checked={form.data.tag_ids.includes(tag.id)} onChange={() => toggleTag(form, tag.id)} />
                            {tag.name}
                        </label>
                    ))}
                </div>
            </div>
            <button className="rounded bg-indigo-600 px-4 py-2 text-white">{submitLabel}</button>
        </form>
    );

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Blog Management</h2>}>
            <Head title="Blog Articles" />

            <div className="py-8">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Tambah Artikel</h3>
                        {renderForm(createForm, 'Simpan', submitCreate)}
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Edit Artikel</h3>
                        {editForm.data.id
                            ? renderForm(editForm, 'Update', submitUpdate)
                            : <p className="text-sm text-gray-500">Klik tombol Edit pada tabel artikel.</p>}
                    </div>
                </div>

                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        rows={articles.data}
                        getRowKey={(article) => article.id}
                        routeName="blog-articles.index"
                        filters={filters}
                        searchPlaceholder="Cari judul atau konten..."
                        filterOptions={[
                            {
                                key: 'status',
                                label: 'Status',
                                options: [
                                    { value: 'draft', label: 'Draft' },
                                    { value: 'published', label: 'Published' },
                                ],
                                placeholder: 'Semua status',
                            },
                        ]}
                        pagination={articles}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
