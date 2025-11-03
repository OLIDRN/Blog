<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::with('user:id,name')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }

    public function store(StorePostRequest $request): JsonResponse
    {
        $post = Post::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        $post->load('user:id,name');

        return response()->json([
            'success' => true,
            'message' => 'Article créé avec succès',
            'data' => $post
        ], 201);
    }

    public function show(Post $post): JsonResponse
    {
        $post->load('user:id,name,email');

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }
    public function update(UpdatePostRequest $request, Post $post): JsonResponse
    {
        if ($request->user()->id !== $post->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
                'errors' => ['authorization' => ['Vous n\'êtes pas autorisé à modifier cet article.']]
            ], 403);
        }

        $post->update($request->validated());
        $post->load('user:id,name');

        return response()->json([
            'success' => true,
            'message' => 'Article mis à jour avec succès',
            'data' => $post
        ]);
    }
    
    public function destroy(Post $post): JsonResponse
    {
        if (request()->user()->id !== $post->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
                'errors' => ['authorization' => ['Vous n\'êtes pas autorisé à supprimer cet article.']]
            ], 403);
        }

        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article supprimé avec succès'
        ]);
    }
}

