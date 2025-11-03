<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index','show']);
    }

    public function index()
    {
        $posts = Post::with('user:id,name')
            ->latest()
            ->paginate(10)
            ->through(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'excerpt' => str()->limit(strip_tags($p->content), 140),
                'author' => $p->user?->name,
            ]);

        return Inertia::render('Posts/Index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(StorePostRequest $request)
    {
        $post = Post::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('posts.show', $post)->with('success', 'Article créé.');
    }

    public function show(Post $post)
    {
        $post->load('user:id,name');
        return Inertia::render('Posts/Show', ['post' => $post]);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);
        return Inertia::render('Posts/Edit', ['post' => $post]);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $this->authorize('update', $post);
        $post->update($request->validated());
        return redirect()->route('posts.show', $post)->with('success', 'Article mis à jour.');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return redirect()->route('posts.index')->with('success', 'Article supprimé.');
    }
}
