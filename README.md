# Blog Laravel

Blog avec Laravel, Inertia, React.

## 🔐 Choix de la solution d'authentification

### Laravel Breeze

Ce projet utilise **Laravel Breeze** pour l'authentification.

#### Justification :

- **Simplicité et clarté** : Breeze fournit une implémentation minimale de l'authentification Laravel. Tout le code est publié dans l'application.

- **Fonctionnalités** :
  - Connexion / Déconnexion
  - Inscription avec validation
  - Réinitialisation de mot de passe
  - Vérification d'email
  - Confirmation de mot de passe
  - Gestion du profil utilisateur

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone
cd blog
```

### 2. Installer les dépendances PHP

```bash
composer install
```

### 3. Configurer l'environnement

```bash
cp .env.example .env

php artisan key:generate
```

### 4. Configurer la base de données

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Exécuter les migrations

```bash
php artisan migrate
```

### 6. Remplir la base de donées

```bash
php artisan db:seed
```

Cette commande crée :
- 1 utilisateur de test : `test@example.com` (mot de passe : `password`)
- 5 articles pour l'utilisateur de test
- 3 utilisateurs supplémentaires avec 2-4 articles chacun

### 7. Installer les dépendances front-end

```bash
npm install
```

### 8. Compiler les assets

```bash
npm run dev

npm run build
```

### 9. Démarrer le serveur

```bash
php artisan serve
```

L'application sera accessible à l'adresse : `http://localhost:8000`

## 🛠️ Commandes utiles

### Développement

```bash
php artisan serve

npm run dev
```

### Base de données

```bash
php artisan migrate

php artisan migrate:fresh

php artisan migrate:fresh --seed

php artisan db:seed
```

## 📍 Documentation des routes

### Routes Web

#### Routes publiques

| Méthode | URI | Action | Description |
|---------|-----|--------|-------------|
| `GET` | `/` | Redirection | Redirige vers la liste des posts |
| `GET` | `/posts` | `PostController@index` | Affiche tous les posts |
| `GET` | `/posts/{post}` | `PostController@show` | Affiche un post spécifique |

### Routes d'authentification

#### Inscription / Connexion (Guest uniquement)

| Méthode | URI | Nom | Description |
|---------|-----|-----|-------------|
| `GET` | `/register` | `register` | Affiche le formulaire d'inscription |
| `POST` | `/register` | - | Traite l'inscription |
| `GET` | `/login` | `login` | Affiche le formulaire de connexion |
| `POST` | `/login` | - | Traite la connexion |

#### Routes protégées (Authentification requise)

| Méthode | URI | Nom | Middleware | Description |
|---------|-----|-----|-----------|-------------|
| `GET` | `/dashboard` | `dashboard` | `auth, verified` | Tableau de bord |
| `POST` | `/logout` | `logout` | `auth` | Déconnexion |

### Routes des Posts (CRUD)

#### Routes publiques

| Méthode | URI | Nom | Description |
|---------|-----|-----|-------------|
| `GET` | `/posts` | `posts.index` | Liste tous les posts |
| `GET` | `/posts/{post}` | `posts.show` | Affiche un post |

#### Routes protégées (Authentification requise)

| Méthode | URI | Nom | Middleware | Description |
|---------|-----|-----|-----------|-------------|
| `GET` | `/posts/create` | `posts.create` | `auth` | Formulaire de création |
| `POST` | `/posts` | `posts.store` | `auth` | Crée un nouveau post |
| `GET` | `/posts/{post}/edit` | `posts.edit` | `auth` | Formulaire d'édition |
| `PUT` | `/posts/{post}` | `posts.update` | `auth` | Met à jour un post |
| `DELETE` | `/posts/{post}` | `posts.destroy` | `auth` | Supprime un post |

### Routes du Profil (Authentification requise)

| Méthode | URI | Nom | Middleware | Description |
|---------|-----|-----|-----------|-------------|
| `GET` | `/profile` | `profile.edit` | `auth` | Éditer le profil |
| `PATCH` | `/profile` | `profile.update` | `auth` | Mettre à jour le profil |
| `DELETE` | `/profile` | `profile.destroy` | `auth` | Supprimer le compte |

---

### Routes API disponibles

#### Routes publiques (pas d'authentification requise)

| Méthode | Endpoint | Description | Paramètres |
|---------|----------|-------------|------------|
| `GET` | `/api/posts` | Liste tous les posts (paginée) | `page` (optionnel) |
| `GET` | `/api/posts/{id}` | Détails d'un post spécifique | - |

#### Routes protégées (authentification Sanctum requise)

| Méthode | Endpoint | Description | Body (JSON) |
|---------|----------|-------------|-------------|
| `GET` | `/api/user` | Obtenir l'utilisateur authentifié | - |
| `POST` | `/api/posts` | Créer un nouveau post | `title`, `content`, `published_at` (optionnel) |
| `PUT` | `/api/posts/{id}` | Mettre à jour un post | `title`, `content`, `published_at` (optionnel) |
| `DELETE` | `/api/posts/{id}` | Supprimer un post | - |

## 🧪 Tests de l'authentification

### Compte de test

Un compte de test est créé automatiquement :

**Email** : `test@example.com`  
**Mot de passe** : `password`

### Instructions pour tester l'authentification

#### 1. Inscription d'un nouvel utilisateur

1. Accédez à `http://localhost:8000/register`
2. Remplissez le formulaire :
   - Nom : `John Doe`
   - Email : `john@example.com`
   - Mot de passe : `password` (min. 8 caractères)
   - Confirmation du mot de passe : `password`
3. Cliquez sur "Register"
4. Vous serez automatiquement connecté et redirigé vers le dashboard

#### 2. Connexion avec le compte de test

1. Accédez à `http://localhost:8000/login`
2. Utilisez les identifiants :
   - Email : `test@example.com`
   - Mot de passe : `password`
3. Cliquez sur "Log in"

#### 5. Gestion du profil

1. Une fois connecté, cliquez sur votre nom en haut à droite
2. Sélectionnez "Profile"
3. Vous pouvez :
   - Mettre à jour votre nom et email
   - Changer votre mot de passe
   - Supprimer votre compte

#### 6. Tester les permissions des posts

1. Connectez-vous avec `test@example.com`
2. Accédez à `/posts`
3. Vous verrez tous les posts (public)
4. Cliquez sur un post qui vous appartient → boutons "Edit" et "Delete" visibles
5. Cliquez sur un post d'un autre utilisateur → pas de boutons d'édition
6. Essayez de créer un nouveau post via `/posts/create` (accessible uniquement connecté)

#### 7. Test de la déconnexion

1. Cliquez sur votre nom en haut à droite
2. Cliquez sur "Log Out"
3. Vous serez redirigé vers la page d'accueil
4. Les routes protégées ne seront plus accessibles
