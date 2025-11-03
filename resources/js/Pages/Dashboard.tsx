import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { PenSquare, FileText, User2, Settings } from 'lucide-react';

export default function Dashboard() {
    const { auth } = usePage().props as any;

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">👋 Bienvenue, {auth.user.name} !</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <PenSquare className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Nouvel article</CardTitle>
                                    <CardDescription>Créer un article</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Link href="/posts/create">
                                <Button className="w-full">
                                    Créer un article
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle>Mes articles</CardTitle>
                                    <CardDescription>Voir tous les articles</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Link href="/posts">
                                <Button variant="outline" className="w-full">
                                    Voir les articles
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                                    <Settings className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle>Profil</CardTitle>
                                    <CardDescription>Gérer mon compte</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Link href="/profile">
                                <Button variant="outline" className="w-full">
                                    Voir le profil
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Informations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <User2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Email :</span>
                                <span className="font-medium">{auth.user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Name :</span>
                                <span className="font-medium">{auth.user.name}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
