import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import MainLayout from '@/Layouts/MainLayout'
import { ArrowLeft, Save, X } from 'lucide-react'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    published_at: ''
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post('/posts')
  }

  return (
    <MainLayout>
      <Head title="Nouvel article" />

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">✍️ Créer un article</CardTitle>
            <CardDescription>
              Remplissez les informations ci-dessous pour publier un nouvel article
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
                  placeholder="Le titre de votre article..."
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
                  placeholder="Écrivez le contenu de votre article..."
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
                <p className="text-sm text-muted-foreground">
                  Laissez vide pour publier immédiatement
                </p>
                {errors.published_at && (
                  <p className="text-sm text-destructive">{errors.published_at}</p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={processing} className="gap-2">
                  <Save className="h-4 w-4" />
                  {processing ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
                <Link href="/posts">
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
