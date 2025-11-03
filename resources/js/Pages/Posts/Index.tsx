import { Head, Link } from '@inertiajs/react'
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import MainLayout from '@/Layouts/MainLayout'
import { Calendar, User2 } from 'lucide-react'

type Post = { id:number; title:string; excerpt:string; author?:string; created_at:string }
type Paginated<T> = { data:T[]; current_page:number; last_page:number; links:{ url:string|null; label:string; active:boolean }[] }

export default function Index({ posts }: { posts: Paginated<Post> }) {
  return (
    <MainLayout>
      <Head title="Articles" />

      {/* Hero section */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight">📝 Blog</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Découvrez nos derniers articles
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {posts.data.length > 0 ? (
          <div className="space-y-6">
            {posts.data.map(p => (
              <Card key={p.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <Link
                      href={`/posts/${p.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {p.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">{p.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {p.author && (
                      <div className="flex items-center gap-1">
                        <User2 className="h-4 w-4" />
                        <span>{p.author}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <Link href={`/posts/${p.id}`}>
                      <Button variant="outline" size="sm">
                        Lire l'article →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun article pour le moment.</p>
          </div>
        )}

        {/* Pagination */}
        {posts.links.length > 3 && (
          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            {posts.links.map((l, i) => (
              <Link
                key={i}
                href={l.url ?? '#'}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  l.active
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-accent'
                }`}
                dangerouslySetInnerHTML={{ __html: l.label }}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
