<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogCategoryController extends Controller
{
    public function index(Request $request): JsonResponse|Response
    {
        $search = trim((string) $request->string('search', ''));
        $active = trim((string) $request->string('active', ''));
        $perPage = max(1, min((int) $request->integer('per_page', 10), 100));

        $categories = BlogCategory::query()
            ->withCount('posts')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($active !== '', function ($query) use ($active) {
                $query->where('is_active', $active === '1');
            })
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();

        if ($request->wantsJson()) {
            return response()->json($categories);
        }

        return Inertia::render('Admin/BlogCategories/Index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'active' => $active,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:blog_categories,slug'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ]);

        $category = BlogCategory::create($validated);

        if ($request->wantsJson()) {
            return response()->json($category->loadCount('posts'), 201);
        }

        return back()->with('success', 'Kategori artikel berhasil dibuat.');
    }

    public function update(Request $request, BlogCategory $blogCategory): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('blog_categories', 'slug')->ignore($blogCategory->id)],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ]);

        $blogCategory->update($validated);

        if ($request->wantsJson()) {
            return response()->json($blogCategory->loadCount('posts'));
        }

        return back()->with('success', 'Kategori artikel berhasil diperbarui.');
    }

    public function destroy(Request $request, BlogCategory $blogCategory): JsonResponse|RedirectResponse
    {
        $blogCategory->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Kategori artikel berhasil dihapus.',
            ]);
        }

        return back()->with('success', 'Kategori artikel berhasil dihapus.');
    }
}
