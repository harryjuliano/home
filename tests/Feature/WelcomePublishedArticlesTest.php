<?php

namespace Tests\Feature;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class WelcomePublishedArticlesTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_only_shows_published_articles_in_published_articles_prop(): void
    {
        $user = User::factory()->create();
        $category = BlogCategory::create([
            'name' => 'Inventory',
            'slug' => 'inventory',
            'is_active' => true,
        ]);

        BlogPost::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Artikel Publish',
            'slug' => 'artikel-publish',
            'content' => 'Konten publish',
            'status' => 'published',
            'published_at' => now()->subHour(),
        ]);

        BlogPost::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Artikel Draft',
            'slug' => 'artikel-draft',
            'content' => 'Konten draft',
            'status' => 'draft',
        ]);

        BlogPost::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Artikel Publish Masa Depan',
            'slug' => 'artikel-publish-masa-depan',
            'content' => 'Konten publish masa depan',
            'status' => 'published',
            'published_at' => now()->addHour(),
        ]);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Welcome')
                ->has('publishedArticles', 1)
                ->where('publishedArticles.0.title', 'Artikel Publish')
            );
    }
}
