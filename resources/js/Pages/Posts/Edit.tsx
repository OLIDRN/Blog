import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import MainLayout from '@/Layouts/MainLayout'
import { ArrowLeft, Save, X } from 'lucide-react'

export default function Edit({ post }: any) {
  const { data, setData, put, processing, errors } = useForm({
    title: post.title ?? '',
    content: post.content ?? '',
    published_at: post.published_at ? new Date(post.published_at).toISOString().slice(0,16) : ''
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    put(`/posts/${post.id}`)
  }

  return (
    <MainLayout>
      <Head title={`Éditer — ${post.title}`} />
      
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href={`/posts/${post.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'article
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">✏️ Éditer l'article</CardTitle>
            <CardDescription>
              Modifiez les informations de votre article
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Titre <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="title" 
                  value={data.title} 
                  onChange={e => setData('title', e.target.value)}
                  className={errors.title ? 'border-destructive' : ''} 
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  Contenu <span className="text-destructive">*</span>
                </Label>
                <Textarea 
                  id="content" 
                  rows={12} 
                  value={data.content} 
                  onChange={e => setData('content', e.target.value)}
                  className={errors.content ? 'border-destructive' : ''} 
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="published_at">
                  Date de publication (optionnel)
                </Label>
                <Input 
                  id="published_at" 
                  type="datetime-local"
                  value={data.published_at}
                  onChange={e => setData('published_at', e.target.value)}
                  className={errors.published_at ? 'border-destructive' : ''} 
                />
                {errors.published_at && (
                  <p className="text-sm text-destructive">{errors.published_at}</p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={processing} className="gap-2">
                  <Save className="h-4 w-4" />
                  {processing ? 'Mise à jour...' : 'Mettre à jour'}
                </Button>
                <Link href={`/posts/${post.id}`}>
                  <Button variant="outline" type="button" className="gap-2">
                    <X className="h-4 w-4" />
                    Annuler
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
