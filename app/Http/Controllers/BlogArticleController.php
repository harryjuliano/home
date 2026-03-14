<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class BlogArticleController extends Controller
{
    public function index(Request $request): JsonResponse|Response
    {
        $search = trim((string) $request->string('search', ''));
        $status = trim((string) $request->string('status', ''));
        $perPage = max(1, min((int) $request->integer('per_page', 10), 100));

        $posts = BlogPost::query()
            ->with(['category:id,name,slug', 'author:id,name', 'tags:id,name,slug'])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        if ($request->wantsJson()) {
            return response()->json($posts);
        }

        return Inertia::render('Admin/BlogArticles/Index', [
            'articles' => $posts,
            'categories' => BlogCategory::query()->orderBy('name')->get(['id', 'name']),
            'tags' => BlogTag::query()->orderBy('name')->get(['id', 'name']),
            'filters' => [
                'search' => $search,
                'status' => $status,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'integer', Rule::exists('blog_categories', 'id')],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:blog_posts,slug'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'string', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'reading_time' => ['nullable', 'integer', 'min:1'],
            'is_featured' => ['boolean'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'published_at' => ['nullable', 'date'],
            'tag_ids' => ['array'],
            'tag_ids.*' => ['integer', Rule::exists('blog_tags', 'id')],
        ]);

        if (($validated['status'] ?? 'draft') === 'published' && empty($validated['published_at'])) {
            throw ValidationException::withMessages([
                'published_at' => 'Tanggal publish wajib diisi ketika status published.',
            ]);
        }

        $post = BlogPost::create([
            ...$validated,
            'author_id' => $request->user()->id,
        ]);

        $post->tags()->sync($validated['tag_ids'] ?? []);

        if ($request->wantsJson()) {
            return response()->json($post->load(['category:id,name,slug', 'author:id,name', 'tags:id,name,slug']), 201);
        }

        return back()->with('success', 'Artikel blog berhasil dibuat.');
    }

    public function show(BlogPost $blogArticle): JsonResponse
    {
        return response()->json($blogArticle->load(['category:id,name,slug', 'author:id,name', 'tags:id,name,slug']));
    }

    public function update(Request $request, BlogPost $blogArticle): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'integer', Rule::exists('blog_categories', 'id')],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('blog_posts', 'slug')->ignore($blogArticle->id)],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'string', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'reading_time' => ['nullable', 'integer', 'min:1'],
            'is_featured' => ['boolean'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'published_at' => ['nullable', 'date'],
            'tag_ids' => ['array'],
            'tag_ids.*' => ['integer', Rule::exists('blog_tags', 'id')],
        ]);

        if (($validated['status'] ?? 'draft') === 'published' && empty($validated['published_at'])) {
            throw ValidationException::withMessages([
                'published_at' => 'Tanggal publish wajib diisi ketika status published.',
            ]);
        }

        $blogArticle->update($validated);
        $blogArticle->tags()->sync($validated['tag_ids'] ?? []);

        if ($request->wantsJson()) {
            return response()->json($blogArticle->load(['category:id,name,slug', 'author:id,name', 'tags:id,name,slug']));
        }

        return back()->with('success', 'Artikel blog berhasil diperbarui.');
    }

    public function destroy(Request $request, BlogPost $blogArticle): JsonResponse|RedirectResponse
    {
        $blogArticle->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Artikel blog berhasil dihapus.',
            ]);
        }

        return back()->with('success', 'Artikel blog berhasil dihapus.');
    }
}
