<?php

use App\Http\Controllers\BlogArticleController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\ContactRequestController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\BlogPost;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::get('/landing', function (Request $request) {
    $publishedArticles = BlogPost::query()
        ->with(['category:id,name,slug'])
        ->where('status', 'published')
        ->whereNotNull('published_at')
        ->where('published_at', '<=', now())
        ->latest('published_at')
        ->limit(3)
        ->get(['id', 'category_id', 'title', 'slug', 'published_at']);

    $featuredProducts = Product::query()
        ->with('category:id,name,slug')
        ->where('is_active', true)
        ->whereIn('product_type', ['solution_catalog', 'lead_generation', 'digital_product_sales'])
        ->orderByDesc('is_featured')
        ->orderBy('sort_order')
        ->limit(9)
        ->get([
            'id',
            'category_id',
            'name',
            'slug',
            'short_description',
            'thumbnail',
            'banner_image',
            'price',
            'sale_price',
            'pricing_type',
            'currency',
            'demo_url',
            'product_type',
        ]);

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'publishedArticles' => $publishedArticles,
        'featuredProducts' => $featuredProducts,
        'prefilledContactRequest' => [
            'request_type' => (string) $request->query('request_type', 'request_demo'),
            'subject' => (string) $request->query('subject', ''),
        ],
    ]);
})->name('landing');

Route::post('/contact-requests', [ContactRequestController::class, 'store'])->name('contact-requests.store');

Route::get('/blog/{slug}', function (string $slug) {
    $article = BlogPost::query()
        ->with(['category:id,name,slug', 'author:id,name', 'tags:id,name,slug'])
        ->where('slug', $slug)
        ->where('status', 'published')
        ->whereNotNull('published_at')
        ->where('published_at', '<=', now())
        ->firstOrFail([
            'id',
            'category_id',
            'author_id',
            'title',
            'slug',
            'excerpt',
            'content',
            'published_at',
        ]);

    return Inertia::render('Blog/Show', [
        'article' => $article,
    ]);
})->name('blog.show');

Route::get('/produk/{slug}', function (string $slug) {
    $product = Product::query()
        ->with('category:id,name,slug')
        ->where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail([
            'id',
            'category_id',
            'name',
            'slug',
            'short_description',
            'description',
            'thumbnail',
            'banner_image',
            'price',
            'sale_price',
            'pricing_type',
            'currency',
            'demo_url',
            'product_type',
        ]);

    return Inertia::render('Products/Show', [
        'product' => $product,
    ]);
})->name('products.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');

    Route::get('/blog-articles', [BlogArticleController::class, 'index'])->name('blog-articles.index');
    Route::post('/blog-articles', [BlogArticleController::class, 'store'])->name('blog-articles.store');
    Route::get('/blog-articles/{blogArticle}', [BlogArticleController::class, 'show'])->name('blog-articles.show');
    Route::put('/blog-articles/{blogArticle}', [BlogArticleController::class, 'update'])->name('blog-articles.update');
    Route::delete('/blog-articles/{blogArticle}', [BlogArticleController::class, 'destroy'])->name('blog-articles.destroy');

    Route::get('/blog-categories', [BlogCategoryController::class, 'index'])->name('blog-categories.index');
    Route::post('/blog-categories', [BlogCategoryController::class, 'store'])->name('blog-categories.store');
    Route::put('/blog-categories/{blogCategory}', [BlogCategoryController::class, 'update'])->name('blog-categories.update');
    Route::delete('/blog-categories/{blogCategory}', [BlogCategoryController::class, 'destroy'])->name('blog-categories.destroy');

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

require __DIR__.'/auth.php';
