import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { User, LogOut, Settings, PenSquare } from 'lucide-react';

export default function MainLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex h-16 items-center justify-between px-4">
                        {/* Logo et navigation */}
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                    <span className="text-lg font-bold text-primary-foreground">B</span>
                                </div>
                                <span className="text-xl font-bold">Mini Blog</span>
                            </Link>
                            
                            <nav className="hidden md:flex items-center gap-6">
                                <Link
                                    href="/posts"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    Articles
                                </Link>
                                {auth?.user && (
                                    <Link
                                        href="/dashboard"
                                        className="text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </nav>
                        </div>

                        {/* Actions utilisateur */}
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <>
                                    <Link href="/posts/create">
                                        <Button size="sm" className="gap-2">
                                            <PenSquare className="h-4 w-4" />
                                            <span className="hidden sm:inline">Nouvel article</span>
                                        </Button>
                                    </Link>
                                    
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="gap-2">
                                                <User className="h-4 w-4" />
                                                <span className="hidden sm:inline">{auth.user.name}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem asChild>
                                                <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                                                    <Settings className="h-4 w-4" />
                                                    Profil
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    className="flex w-full items-center gap-2 cursor-pointer text-destructive"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Déconnexion
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm">
                                            Connexion
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm">
                                            Inscription
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}

