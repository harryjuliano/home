<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    private const DEFAULT_PRODUCT_TYPES = [
        'solution_catalog' => 'Solution Catalog',
        'lead_generation' => 'Lead Generation',
        'digital_product_sales' => 'Digital Product Sales',
    ];

    public function index(Request $request): JsonResponse|Response
    {
        $search = trim((string) $request->string('search', ''));
        $type = trim((string) $request->string('type', ''));
        $active = trim((string) $request->string('active', ''));
        $perPage = max(1, min((int) $request->integer('per_page', 10), 100));

        $categories = $this->ensureDefaultCategories();

        $products = Product::query()
            ->with('category:id,name,slug')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%");
                });
            })
            ->when($type !== '', fn ($query) => $query->where('product_type', $type))
            ->when($active !== '', fn ($query) => $query->where('is_active', $active === '1'))
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();

        if ($request->wantsJson()) {
            return response()->json($products);
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'productTypeOptions' => $this->productTypeOptions(),
            'filters' => [
                'search' => $search,
                'type' => $type,
                'active' => $active,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $this->ensureDefaultCategories();

        $validated = $request->validate([
            'category_id' => ['required', 'exists:product_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'product_type' => ['required', Rule::in(array_keys(self::DEFAULT_PRODUCT_TYPES))],
            'price' => ['nullable', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0'],
            'pricing_type' => ['required', Rule::in(['starting_from', 'fixed', 'custom'])],
            'currency' => ['required', 'string', 'size:3'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['currency'] = strtoupper($validated['currency']);

        $product = Product::create($validated);

        if ($request->wantsJson()) {
            return response()->json($product->load('category:id,name,slug'), 201);
        }

        return back()->with('success', 'Produk berhasil dibuat.');
    }

    public function update(Request $request, Product $product): JsonResponse|RedirectResponse
    {
        $this->ensureDefaultCategories();

        $validated = $request->validate([
            'category_id' => ['required', 'exists:product_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($product->id)],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'product_type' => ['required', Rule::in(array_keys(self::DEFAULT_PRODUCT_TYPES))],
            'price' => ['nullable', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0'],
            'pricing_type' => ['required', Rule::in(['starting_from', 'fixed', 'custom'])],
            'currency' => ['required', 'string', 'size:3'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['currency'] = strtoupper($validated['currency']);

        $product->update($validated);

        if ($request->wantsJson()) {
            return response()->json($product->load('category:id,name,slug'));
        }

        return back()->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Request $request, Product $product): JsonResponse|RedirectResponse
    {
        $product->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Produk berhasil dihapus.',
            ]);
        }

        return back()->with('success', 'Produk berhasil dihapus.');
    }

    public static function productTypeOptions(): array
    {
        return collect(self::DEFAULT_PRODUCT_TYPES)
            ->map(fn ($label, $value) => ['value' => $value, 'label' => $label])
            ->values()
            ->all();
    }

    private function ensureDefaultCategories()
    {
        foreach (self::DEFAULT_PRODUCT_TYPES as $slug => $name) {
            ProductCategory::query()->firstOrCreate(
                ['slug' => $slug],
                [
                    'name' => $name,
                    'description' => "Kategori produk {$name}",
                    'is_active' => true,
                ],
            );
        }

        return ProductCategory::query()
            ->whereIn('slug', array_keys(self::DEFAULT_PRODUCT_TYPES))
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);
    }
}
