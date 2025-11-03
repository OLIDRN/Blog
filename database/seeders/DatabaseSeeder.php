<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Post::factory(5)->create([
            'user_id' => $testUser->id,
        ]);
        User::factory(3)->create()->each(function ($user) {
            Post::factory(rand(2, 4))->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
