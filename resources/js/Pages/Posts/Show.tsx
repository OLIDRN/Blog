import { Head, Link, usePage } from '@inertiajs/react'
  import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import MainLayout from '@/Layouts/MainLayout'
import { Calendar, User2, Edit, Trash2, ArrowLeft } from 'lucide-react'

export default function Show({ post }: any) {
  const { auth } = usePage().props as any
  const canEdit = auth?.user?.id === post.user_id
  
  return (
    <MainLayout>
      <Head title={post.title} />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/posts" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
        </div>

        {/* Article header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            {post.user?.name && (
              <div className="flex items-center gap-1.5">
                <User2 className="h-4 w-4" />
                <span>{post.user.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.created_at).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Actions */}
          {canEdit && (
            <div className="flex gap-2">
              <Link href={`/posts/${post.id}/edit`}>
                <Button size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Éditer
                </Button>
              </Link>
              <Link href={`/posts/${post.id}`} method="delete" as="button">
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Article content */}
        <Card>
          <CardContent className="pt-6">
            <article 
              className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-lg" 
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
