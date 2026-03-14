<?php

namespace Tests\Feature;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogArticleCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_blog_article(): void
    {
        $user = User::factory()->create();
        $category = BlogCategory::create([
            'name' => 'Teknologi',
            'slug' => 'teknologi',
            'is_active' => true,
        ]);
        $tagA = BlogTag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        $tagB = BlogTag::create(['name' => 'Backend', 'slug' => 'backend']);

        $response = $this->actingAs($user)->postJson(route('blog-articles.store'), [
            'category_id' => $category->id,
            'title' => 'Artikel Pertama',
            'slug' => 'artikel-pertama',
            'excerpt' => 'Ringkasan artikel',
            'content' => 'Konten artikel yang lengkap',
            'status' => 'published',
            'published_at' => now()->toDateTimeString(),
            'tag_ids' => [$tagA->id, $tagB->id],
        ]);

        $response->assertCreated()
            ->assertJsonPath('title', 'Artikel Pertama')
            ->assertJsonPath('author.id', $user->id);

        $this->assertDatabaseHas('blog_posts', [
            'slug' => 'artikel-pertama',
            'author_id' => $user->id,
        ]);

        $postId = $response->json('id');

        $this->assertDatabaseHas('blog_post_tag', [
            'blog_post_id' => $postId,
            'blog_tag_id' => $tagA->id,
        ]);
    }

    public function test_authenticated_user_can_update_and_delete_blog_article(): void
    {
        $user = User::factory()->create();
        $category = BlogCategory::create([
            'name' => 'Bisnis',
            'slug' => 'bisnis',
            'is_active' => true,
        ]);
        $newTag = BlogTag::create(['name' => 'Tips', 'slug' => 'tips']);

        $post = BlogPost::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Judul Lama',
            'slug' => 'judul-lama',
            'content' => 'Konten lama',
            'status' => 'draft',
        ]);

        $updateResponse = $this->actingAs($user)->putJson(route('blog-articles.update', $post), [
            'category_id' => $category->id,
            'title' => 'Judul Baru',
            'slug' => 'judul-baru',
            'content' => 'Konten baru',
            'status' => 'published',
            'published_at' => now()->toDateTimeString(),
            'tag_ids' => [$newTag->id],
        ]);

        $updateResponse->assertOk()
            ->assertJsonPath('title', 'Judul Baru')
            ->assertJsonPath('slug', 'judul-baru');

        $this->assertDatabaseHas('blog_posts', [
            'id' => $post->id,
            'title' => 'Judul Baru',
            'status' => 'published',
        ]);

        $deleteResponse = $this->actingAs($user)->deleteJson(route('blog-articles.destroy', $post));

        $deleteResponse->assertOk()
            ->assertJsonPath('message', 'Artikel blog berhasil dihapus.');

        $this->assertDatabaseMissing('blog_posts', [
            'id' => $post->id,
        ]);
    }

    public function test_authenticated_user_can_list_blog_articles(): void
    {
        $user = User::factory()->create();
        $category = BlogCategory::create([
            'name' => 'Marketing',
            'slug' => 'marketing',
            'is_active' => true,
        ]);

        BlogPost::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Artikel Pemasaran',
            'slug' => 'artikel-pemasaran',
            'content' => 'Konten pemasaran',
            'status' => 'draft',
        ]);

        $response = $this->actingAs($user)->getJson(route('blog-articles.index'));

        $response->assertOk()
            ->assertJsonPath('data.0.title', 'Artikel Pemasaran')
            ->assertJsonPath('data.0.category.name', 'Marketing');
    }
}
