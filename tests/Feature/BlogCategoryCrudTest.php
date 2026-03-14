<?php

namespace Tests\Feature;

use App\Models\BlogCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogCategoryCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_blog_category(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson(route('blog-categories.store'), [
            'name' => 'Teknologi',
            'slug' => 'teknologi',
            'description' => 'Kategori untuk artikel teknologi',
            'is_active' => true,
        ]);

        $response->assertCreated()
            ->assertJsonPath('name', 'Teknologi')
            ->assertJsonPath('slug', 'teknologi');

        $this->assertDatabaseHas('blog_categories', [
            'slug' => 'teknologi',
            'is_active' => true,
        ]);
    }

    public function test_authenticated_user_can_update_and_delete_blog_category(): void
    {
        $user = User::factory()->create();

        $category = BlogCategory::create([
            'name' => 'Marketing',
            'slug' => 'marketing',
            'is_active' => true,
        ]);

        $updateResponse = $this->actingAs($user)->putJson(route('blog-categories.update', $category), [
            'name' => 'Digital Marketing',
            'slug' => 'digital-marketing',
            'description' => 'Kategori marketing digital',
            'is_active' => false,
        ]);

        $updateResponse->assertOk()
            ->assertJsonPath('name', 'Digital Marketing')
            ->assertJsonPath('is_active', false);

        $this->assertDatabaseHas('blog_categories', [
            'id' => $category->id,
            'slug' => 'digital-marketing',
            'is_active' => false,
        ]);

        $deleteResponse = $this->actingAs($user)->deleteJson(route('blog-categories.destroy', $category));

        $deleteResponse->assertOk()
            ->assertJsonPath('message', 'Kategori artikel berhasil dihapus.');

        $this->assertDatabaseMissing('blog_categories', [
            'id' => $category->id,
        ]);
    }

    public function test_authenticated_user_can_list_blog_categories(): void
    {
        $user = User::factory()->create();

        BlogCategory::create([
            'name' => 'Bisnis',
            'slug' => 'bisnis',
            'description' => 'Kategori bisnis',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->getJson(route('blog-categories.index'));

        $response->assertOk()
            ->assertJsonPath('data.0.name', 'Bisnis')
            ->assertJsonPath('data.0.slug', 'bisnis');
    }
}
