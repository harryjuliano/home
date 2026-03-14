# Blueprint Migration Laravel untuk Database Company Profile + Blog + ERP Product Catalog + Lead Management

Dokumen ini melanjutkan perencanaan teknis agar tim bisa langsung menurunkan struktur database ke migration Laravel.

## 1) Urutan migration database

Urutan migration penting agar relasi **foreign key** aman saat proses `php artisan migrate` dijalankan.

```text
1_create_users_table
2_create_roles_table
3_create_role_user_table

4_create_pages_table
5_create_page_sections_table

6_create_blog_categories_table
7_create_blog_tags_table
8_create_blog_posts_table
9_create_blog_post_tag_table

10_create_product_categories_table
11_create_products_table
12_create_product_features_table
13_create_product_modules_table
14_create_product_images_table
15_create_pricing_packages_table
16_create_pricing_package_features_table
17_create_product_faqs_table

18_create_portfolios_table
19_create_testimonials_table

20_create_inquiries_table
21_create_leads_table

22_create_orders_table
23_create_order_items_table

24_create_subscribers_table
25_create_settings_table

26_create_menus_table
27_create_menu_items_table
```

## 2) Migration Users

Laravel default sudah menyediakan migration user. Jika dibutuhkan profil admin yang lebih lengkap, tambahkan field berikut.

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();

    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();

    $table->string('password');

    $table->string('phone')->nullable();
    $table->string('avatar')->nullable();

    $table->boolean('is_active')->default(true);
    $table->timestamp('last_login_at')->nullable();

    $table->rememberToken();
    $table->timestamps();
});
```

## 3) Migration Pages (CMS)

```php
Schema::create('pages', function (Blueprint $table) {
    $table->id();

    $table->string('title');
    $table->string('slug')->unique();

    $table->string('page_type')->nullable();

    $table->text('excerpt')->nullable();
    $table->longText('content')->nullable();

    $table->string('template_name')->nullable();

    $table->string('meta_title')->nullable();
    $table->text('meta_description')->nullable();
    $table->text('meta_keywords')->nullable();

    $table->string('og_image')->nullable();

    $table->string('status')->default('draft');

    $table->timestamp('published_at')->nullable();

    $table->foreignId('created_by')->nullable();
    $table->foreignId('updated_by')->nullable();

    $table->timestamps();
});
```

## 4) Migration Page Sections

Untuk homepage builder.

```php
Schema::create('page_sections', function (Blueprint $table) {
    $table->id();

    $table->foreignId('page_id')->constrained()->cascadeOnDelete();

    $table->string('section_key');
    $table->string('section_name');

    $table->string('title')->nullable();
    $table->string('subtitle')->nullable();

    $table->json('content_json')->nullable();

    $table->integer('sort_order')->default(0);

    $table->boolean('is_active')->default(true);

    $table->timestamps();
});
```

## 5) Migration Blog Categories

```php
Schema::create('blog_categories', function (Blueprint $table) {
    $table->id();

    $table->string('name');
    $table->string('slug')->unique();

    $table->text('description')->nullable();

    $table->boolean('is_active')->default(true);

    $table->timestamps();
});
```

## 6) Migration Blog Posts

```php
Schema::create('blog_posts', function (Blueprint $table) {
    $table->id();

    $table->foreignId('category_id')
        ->constrained('blog_categories')
        ->cascadeOnDelete();

    $table->foreignId('author_id')
        ->constrained('users')
        ->cascadeOnDelete();

    $table->string('title');
    $table->string('slug')->unique();

    $table->text('excerpt')->nullable();
    $table->longText('content');

    $table->string('featured_image')->nullable();

    $table->string('meta_title')->nullable();
    $table->text('meta_description')->nullable();

    $table->integer('reading_time')->nullable();

    $table->boolean('is_featured')->default(false);

    $table->string('status')->default('draft');

    $table->timestamp('published_at')->nullable();

    $table->integer('views_count')->default(0);

    $table->timestamps();
});
```

## 7) Migration Product Categories

```php
Schema::create('product_categories', function (Blueprint $table) {
    $table->id();

    $table->string('name');
    $table->string('slug')->unique();

    $table->text('description')->nullable();

    $table->string('icon')->nullable();

    $table->integer('sort_order')->default(0);

    $table->boolean('is_active')->default(true);

    $table->timestamps();
});
```

## 8) Migration Products

Ini tabel inti katalog ERP.

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();

    $table->foreignId('category_id')
        ->constrained('product_categories')
        ->cascadeOnDelete();

    $table->string('name');
    $table->string('slug')->unique();

    $table->text('short_description')->nullable();
    $table->longText('description')->nullable();

    $table->string('product_type')->nullable();

    $table->string('sku')->nullable();

    $table->string('thumbnail')->nullable();
    $table->string('banner_image')->nullable();

    $table->decimal('price', 15, 2)->nullable();
    $table->decimal('sale_price', 15, 2)->nullable();

    $table->string('pricing_type')->nullable();
    $table->string('billing_cycle')->nullable();

    $table->string('currency')->default('IDR');

    $table->string('demo_url')->nullable();
    $table->string('video_url')->nullable();

    $table->string('brochure_file')->nullable();

    $table->boolean('is_featured')->default(false);
    $table->boolean('is_active')->default(true);

    $table->integer('sort_order')->default(0);

    $table->string('meta_title')->nullable();
    $table->text('meta_description')->nullable();

    $table->timestamps();
});
```

## 9) Migration Product Modules

Untuk modul ERP.

```php
Schema::create('product_modules', function (Blueprint $table) {
    $table->id();

    $table->foreignId('product_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('module_name');

    $table->text('module_description')->nullable();

    $table->integer('sort_order')->default(0);

    $table->boolean('is_highlight')->default(false);

    $table->timestamps();
});
```

## 10) Migration Pricing Packages

```php
Schema::create('pricing_packages', function (Blueprint $table) {
    $table->id();

    $table->foreignId('product_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('package_name');
    $table->string('slug');

    $table->text('description')->nullable();

    $table->decimal('price', 15, 2)->nullable();

    $table->string('currency')->default('IDR');

    $table->string('billing_cycle')->nullable();

    $table->integer('user_limit')->nullable();
    $table->integer('branch_limit')->nullable();
    $table->integer('implementation_days')->nullable();

    $table->string('support_type')->nullable();

    $table->boolean('is_popular')->default(false);

    $table->boolean('is_active')->default(true);

    $table->integer('sort_order')->default(0);

    $table->timestamps();
});
```

## 11) Migration Inquiries (Lead Capture)

```php
Schema::create('inquiries', function (Blueprint $table) {
    $table->id();

    $table->string('inquiry_no')->unique();

    $table->string('inquiry_type');

    $table->string('name');

    $table->string('company_name')->nullable();

    $table->string('email');
    $table->string('phone')->nullable();

    $table->string('industry')->nullable();

    $table->integer('employee_size')->nullable();

    $table->string('subject')->nullable();

    $table->text('message')->nullable();

    $table->foreignId('product_id')->nullable();

    $table->string('source_page')->nullable();
    $table->string('source_url')->nullable();
    $table->string('lead_source')->nullable();

    $table->string('status')->default('new');

    $table->foreignId('assigned_to')->nullable();

    $table->text('notes')->nullable();

    $table->timestamps();
});
```

## 12) Migration Leads

```php
Schema::create('leads', function (Blueprint $table) {
    $table->id();

    $table->foreignId('inquiry_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('lead_code')->unique();

    $table->string('name');

    $table->string('company_name')->nullable();

    $table->string('email');

    $table->string('phone')->nullable();

    $table->string('industry')->nullable();

    $table->string('budget_range')->nullable();

    $table->string('timeline')->nullable();

    $table->string('status')->default('new');

    $table->foreignId('assigned_to')->nullable();

    $table->timestamp('next_follow_up_at')->nullable();

    $table->text('notes')->nullable();

    $table->timestamps();
});
```

## 13) Migration Orders

```php
Schema::create('orders', function (Blueprint $table) {
    $table->id();

    $table->string('order_no')->unique();

    $table->string('customer_name');

    $table->string('company_name')->nullable();

    $table->string('email');

    $table->string('phone')->nullable();

    $table->string('order_type');

    $table->decimal('subtotal', 15, 2)->nullable();
    $table->decimal('discount_amount', 15, 2)->nullable();
    $table->decimal('tax_amount', 15, 2)->nullable();
    $table->decimal('grand_total', 15, 2)->nullable();

    $table->string('currency')->default('IDR');

    $table->string('status')->default('pending');

    $table->string('payment_status')->default('unpaid');

    $table->text('notes')->nullable();

    $table->timestamps();
});
```

## 14) Seeder awal yang disarankan

Seeder penting untuk bootstrap aplikasi.

```text
UserSeeder
RoleSeeder
SettingSeeder
PageSeeder
BlogCategorySeeder
ProductCategorySeeder
ProductSeeder
PricingPackageSeeder
```

## 15) Package Laravel yang sangat direkomendasikan

Untuk proyek seperti ini, gunakan package berikut.

### Permission

```text
spatie/laravel-permission
```

### Media Library

```text
spatie/laravel-medialibrary
```

### Slug otomatis

```text
spatie/laravel-sluggable
```

### Activity log

```text
spatie/laravel-activitylog
```

### SEO

```text
artesaos/seotools
```

## 16) Struktur route Laravel

### Public route

```php
Route::get('/', HomeController::class);

Route::get('/tentang-kami', AboutController::class);

Route::get('/produk', ProductController::class);
Route::get('/produk/{slug}', ProductDetailController::class);

Route::get('/blog', BlogController::class);
Route::get('/blog/{slug}', BlogDetailController::class);

Route::get('/portofolio', PortfolioController::class);

Route::get('/kontak', ContactController::class);

Route::post('/inquiry', InquiryController::class);
```

### Admin route

```php
Route::prefix('admin')->middleware('auth')->group(function () {
    Route::resource('pages', PageController::class);

    Route::resource('blog-posts', BlogPostController::class);

    Route::resource('products', ProductController::class);

    Route::resource('inquiries', InquiryController::class);

    Route::resource('orders', OrderController::class);
});
```

## 17) Hasil akhir dari blueprint ini

Dengan desain ini website **Julianoo Bisnis Partner** akan menjadi:

- company profile profesional
- mesin edukasi blog
- katalog produk ERP
- mesin lead generation
- mini CRM untuk sales
- semi e-commerce B2B

Sehingga website bukan hanya profil perusahaan tetapi juga **marketing engine**.
