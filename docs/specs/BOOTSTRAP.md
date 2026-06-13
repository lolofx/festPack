# 🤘 FestPack — Bootstrap Dev Prompt

> Projet : Application PWA de checklist festival, 100% locale, design metal/rock.
> Stack : React 18 + Vite + TypeScript + Tailwind CSS + vite-plugin-pwa
> Déploiement : Azure Static Web App via GitHub Actions
> Pas de backend. Pas d'auth. Tout en localStorage/IndexedDB.

---

## Contexte du projet

Créer une **Progressive Web App** (installable, offline-first) pour gérer sa checklist de
préparation de festival de musique (type Hellfest, Download, etc.).

L'utilisateur peut **créer plusieurs festivals**, sélectionner l'un d'eux, et cocher les
items de sa checklist. L'état de chaque checklist est persisté **localement dans le
navigateur** (aucun backend, aucune synchronisation cloud). L'application doit fonctionner
**sans connexion internet** une fois installée.

---

## Stack technique cible

| Besoin | Choix |
|---|---|
| Framework UI | **React 18** + TypeScript |
| Bundler | **Vite 5** |
| Styles | **Tailwind CSS 3** avec thème custom metal |
| PWA | **vite-plugin-pwa** + Workbox (stratégie cache-first) |
| Persistance | **localStorage** (simple) ou **IndexedDB** via `idb` si volume élevé |
| Icons | **Lucide React** |
| Routing | **React Router v6** (ou TanStack Router si tu préfères) |
| Déploiement | **Azure Static Web App** |
| CI/CD | **GitHub Actions** (workflow Azure SWA fourni) |
| Fonts | Google Fonts : `Metal Mania` (titres) + `Rajdhani` (body) |

---

## Structure du projet à scaffolder

```
festpack/
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml    # CI/CD Azure SWA
├── public/
│   ├── icons/                           # PWA icons (192, 512, maskable)
│   ├── favicon.ico
│   └── manifest.webmanifest             # généré par vite-plugin-pwa
├── src/
│   ├── assets/                          # textures, SVG décoratifs
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx             # shell PWA (header + nav + outlet)
│   │   │   └── MetalHeader.tsx          # header avec titre gothique
│   │   ├── festivals/
│   │   │   ├── FestivalCard.tsx         # card de sélection d'un festival
│   │   │   ├── FestivalList.tsx         # liste des festivals créés
│   │   │   └── CreateFestivalModal.tsx  # modale création festival
│   │   └── checklist/
│   │       ├── ChecklistPage.tsx        # page principale checklist
│   │       ├── CategorySection.tsx      # section catégorie (vêtements, camping…)
│   │       ├── CheckItem.tsx            # item individuel cochable
│   │       └── ProgressBar.tsx          # barre de progression metal style
│   ├── data/
│   │   └── defaultChecklist.ts          # checklist template hardcodée (voir §Données)
│   ├── hooks/
│   │   ├── useFestivals.ts              # CRUD festivals en localStorage
│   │   └── useChecklist.ts             # état coché par festival
│   ├── store/
│   │   └── festivalStore.ts            # Zustand ou Context+Reducer
│   ├── types/
│   │   └── index.ts                    # types Festival, CheckItem, Category…
│   ├── utils/
│   │   └── storage.ts                  # abstraction localStorage/IndexedDB
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                        # Tailwind + variables CSS métal
├── index.html
├── vite.config.ts                       # config Vite + PWA
├── tailwind.config.ts                   # thème métal custom
├── tsconfig.json
└── package.json
```

---

## Modèle de données (types/index.ts)

```typescript
export interface Festival {
  id: string;               // uuid
  name: string;             // ex: "Hellfest 2025"
  location?: string;        // ex: "Clisson"
  dateStart?: string;       // ISO date
  dateEnd?: string;
  emoji?: string;           // ex: "🤘" personnalisable
  createdAt: string;        // ISO datetime
}

export interface ChecklistItem {
  id: string;               // slug stable, ex: "vetements-tshirts"
  categoryId: string;
  label: string;
  optional: boolean;
  note?: string;            // ex: "⚠️ Gourdes interdites sur le fest !"
  isWarning?: boolean;      // affiche en rouge/orange si vrai
}

export interface ChecklistCategory {
  id: string;               // ex: "vetements"
  label: string;            // ex: "Vêtements"
  icon: string;             // emoji ou nom d'icône Lucide
  items: ChecklistItem[];
}

export interface FestivalProgress {
  festivalId: string;
  checkedItems: string[];   // tableau des item.id cochés
  lastUpdated: string;      // ISO datetime
}

// localStorage keys
// "festpack:festivals"    → Festival[]
// "festpack:progress:{id}" → FestivalProgress
```

---

## Données par défaut (defaultChecklist.ts)

La checklist hardcodée reprend la "Papa Rock Checklist Hellfest" :

```typescript
export const DEFAULT_CHECKLIST: ChecklistCategory[] = [
  {
    id: "vetements",
    label: "Vêtements",
    icon: "shirt",
    items: [
      { id: "vet-linge", categoryId: "vetements", label: "Sac à linge sale", optional: false },
      { id: "vet-sous-vet", categoryId: "vetements", label: "Sous-vêtements", optional: false },
      { id: "vet-chaussettes", categoryId: "vetements", label: "Chaussettes", optional: false },
      { id: "vet-shorts-cu", categoryId: "vetements", label: "Shorts / Culottes", optional: false },
      { id: "vet-soutif", categoryId: "vetements", label: "Soutien-gorge / Brassières", optional: true },
      { id: "vet-tshirts", categoryId: "vetements", label: "T-shirts / Tops", optional: false },
      { id: "vet-sweat", categoryId: "vetements", label: "Sweat-shirt / Veste", optional: false },
      { id: "vet-imperm", categoryId: "vetements", label: "Imperméable + poncho pliable ☂️", optional: false },
      { id: "vet-pantalon", categoryId: "vetements", label: "Pantalon & ceinture", optional: false },
      { id: "vet-shorts", categoryId: "vetements", label: "Shorts", optional: false },
      { id: "vet-pyjama", categoryId: "vetements", label: "Pyjama (ou kigurumi 🦄)", optional: true },
    ],
  },
  {
    id: "chaussures",
    label: "Chaussures",
    icon: "footprints",
    items: [
      { id: "cha-marche", categoryId: "chaussures", label: "Chaussures de marche confortables", optional: false },
      { id: "cha-tongs", categoryId: "chaussures", label: "Tongs pour la douche", optional: false },
      { id: "cha-bottes", categoryId: "chaussures", label: "Bottes style rangers si pluie", optional: true },
    ],
  },
  {
    id: "accessoires",
    label: "Accessoires",
    icon: "sparkles",
    items: [
      { id: "acc-bijoux", categoryId: "accessoires", label: "Boîte à bijoux", optional: true },
      { id: "acc-makeup", categoryId: "accessoires", label: "Maquillage", optional: true },
      { id: "acc-demaq", categoryId: "accessoires", label: "Démaquillant & cotons", optional: true },
      { id: "acc-banane", categoryId: "accessoires", label: "Banane / Sacoche", optional: false },
      { id: "acc-foulard", categoryId: "accessoires", label: "Foulard / Bandana", optional: true },
      { id: "acc-lunettes", categoryId: "accessoires", label: "Lunettes de soleil", optional: false },
    ],
  },
  {
    id: "electronique",
    label: "Électronique",
    icon: "zap",
    items: [
      { id: "elec-chargeurs", categoryId: "electronique", label: "Chargeurs / Câbles", optional: false },
      { id: "elec-batteries", categoryId: "electronique", label: "Batteries portables", optional: false },
      { id: "elec-saciso", categoryId: "electronique", label: "Sac isotherme pour les ranger", optional: false },
      { id: "elec-adaptateur", categoryId: "electronique", label: "Adaptateur prise", optional: true },
    ],
  },
  {
    id: "toilette",
    label: "Trousse de toilette",
    icon: "heart-pulse",
    items: [
      { id: "toi-creme", categoryId: "toilette", label: "Crème solaire ☀️", optional: false },
      { id: "toi-apres", categoryId: "toilette", label: "Après-solaire", optional: false },
      { id: "toi-baume-levres", categoryId: "toilette", label: "Baume à lèvres", optional: false },
      { id: "toi-brosse", categoryId: "toilette", label: "Brosse à dents + dentifrice", optional: false },
      { id: "toi-hydrat", categoryId: "toilette", label: "Soin hydratant visage & corps", optional: false },
      { id: "toi-shampooing", categoryId: "toilette", label: "Shampooing", optional: false },
      { id: "toi-gel", categoryId: "toilette", label: "Gel douche", optional: false },
      { id: "toi-cheveux", categoryId: "toilette", label: "Brosse à cheveux + élastiques", optional: false },
      { id: "toi-deo", categoryId: "toilette", label: "Déodorant", optional: false },
      { id: "toi-rasoirs", categoryId: "toilette", label: "Rasoirs", optional: true },
      { id: "toi-manucure", categoryId: "toilette", label: "Kit manucure", optional: true },
      { id: "toi-protec", categoryId: "toilette", label: "Protections hygiéniques", optional: true },
    ],
  },
  {
    id: "camping",
    label: "Camping",
    icon: "tent",
    items: [
      { id: "cam-tente", categoryId: "camping", label: "Tente", optional: false },
      { id: "cam-piquets", categoryId: "camping", label: "Piquets de rechange", optional: false },
      { id: "cam-marteau", categoryId: "camping", label: "Marteau", optional: false },
      { id: "cam-sol", categoryId: "camping", label: "Plaid de sol", optional: false },
      { id: "cam-matelas", categoryId: "camping", label: "Matelas gonflable + gonfleur", optional: false },
      { id: "cam-sac-couch", categoryId: "camping", label: "Sac de couchage", optional: false },
      { id: "cam-oreiller", categoryId: "camping", label: "Oreiller", optional: true },
      { id: "cam-lampe", categoryId: "camping", label: "Lampe de poche", optional: false },
      { id: "cam-moustique", categoryId: "camping", label: "Anti-moustique", optional: false },
      { id: "cam-cadenas", categoryId: "camping", label: "Cadenas", optional: false },
      { id: "cam-diable", categoryId: "camping", label: "Diable / Chariot", optional: true },
      { id: "cam-chaise", categoryId: "camping", label: "Chaise de camping", optional: true },
    ],
  },
  {
    id: "hygiene",
    label: "Hygiène camping",
    icon: "droplets",
    items: [
      { id: "hyg-lingettes", categoryId: "hygiene", label: "Lingettes nettoyantes", optional: false },
      { id: "hyg-serviette", categoryId: "hygiene", label: "Serviette douche", optional: false },
      { id: "hyg-pq", categoryId: "hygiene", label: "Papier toilette", optional: false },
      { id: "hyg-mouchoirs", categoryId: "hygiene", label: "Mouchoirs", optional: false },
      { id: "hyg-lessive", categoryId: "hygiene", label: "Lessive à main & corde à linge", optional: true },
    ],
  },
  {
    id: "alimentation",
    label: "Alimentation",
    icon: "utensils",
    items: [
      { id: "ali-glaciere", categoryId: "alimentation", label: "Glacière / Sac isotherme + pain de glace", optional: false },
      { id: "ali-sacs", categoryId: "alimentation", label: "Sacs de sécurité", optional: false },
      { id: "ali-tuppers", categoryId: "alimentation", label: "Tupperwares", optional: false },
      { id: "ali-verres", categoryId: "alimentation", label: "Verres", optional: false },
      { id: "ali-couverts", categoryId: "alimentation", label: "Couverts", optional: false },
      { id: "ali-decaps", categoryId: "alimentation", label: "Décapsuleur 🍺", optional: false },
      { id: "ali-table", categoryId: "alimentation", label: "Table / Tonnelle", optional: true },
    ],
  },
  {
    id: "sac-jour",
    label: "Dans le sac (10L max)",
    icon: "backpack",
    items: [
      { id: "sac-cadenas", categoryId: "sac-jour", label: "Petit cadenas de sûreté", optional: false },
      { id: "sac-creme", categoryId: "sac-jour", label: "Crème solaire (toujours sur soi)", optional: false },
      { id: "sac-prot-audit", categoryId: "sac-jour", label: "Protections auditives (bouchons / casque)", optional: false },
      { id: "sac-lunettes", categoryId: "sac-jour", label: "Lunettes de soleil + boîtier rigide", optional: false },
      { id: "sac-casquette", categoryId: "sac-jour", label: "Casquette / Foulard / Chapeau", optional: false },
      { id: "sac-brumis", categoryId: "sac-jour", label: "Brumisateur", optional: false },
      { id: "sac-running-order", categoryId: "sac-jour", label: "Running order imprimé", optional: false },
      { id: "sac-gobelet", categoryId: "sac-jour", label: "Gobelet / Gourde", optional: false, note: "⚠️ Gourdes interdites sur le fest !", isWarning: true },
      { id: "sac-snacks", categoryId: "sac-jour", label: "Snacks", optional: false },
      { id: "sac-trousse", categoryId: "sac-jour", label: "Petite trousse de secours", optional: false },
      { id: "sac-photo", categoryId: "sac-jour", label: "Appareil photo & accessoires", optional: true },
      { id: "sac-serviette", categoryId: "sac-jour", label: "Serviette de sol", optional: false },
      { id: "sac-mouchoirs", categoryId: "sac-jour", label: "Mouchoirs", optional: false },
    ],
  },
  {
    id: "pharmacie",
    label: "Petite pharmacie",
    icon: "plus-circle",
    items: [
      { id: "pha-gel", categoryId: "pharmacie", label: "Gel hydroalcoolique", optional: false },
      { id: "pha-tigre", categoryId: "pharmacie", label: "Baume du tigre", optional: false },
      { id: "pha-doliprane", categoryId: "pharmacie", label: "Doliprane", optional: false },
      { id: "pha-citrate", categoryId: "pharmacie", label: "Citrate de bétaïne", optional: false },
      { id: "pha-smecta", categoryId: "pharmacie", label: "Smecta", optional: false },
      { id: "pha-biafine", categoryId: "pharmacie", label: "Biafine + petits bobos", optional: false },
      { id: "pha-desinfect", categoryId: "pharmacie", label: "Désinfectant", optional: false },
      { id: "pha-bandages", categoryId: "pharmacie", label: "Bandages / Pansements", optional: false },
      { id: "pha-compresses", categoryId: "pharmacie", label: "Compresses & scotch", optional: false },
      { id: "pha-ampoules", categoryId: "pharmacie", label: "Pansements spéciaux ampoules", optional: false },
    ],
  },
  {
    id: "papiers",
    label: "Papiers & Argent",
    icon: "wallet",
    items: [
      { id: "pap-telephone", categoryId: "papiers", label: "Téléphone", optional: false },
      { id: "pap-clefs", categoryId: "papiers", label: "Clés (possible de laisser en tente)", optional: false },
      { id: "pap-billet", categoryId: "papiers", label: "Billet festival imprimé", optional: false },
      { id: "pap-bracelet", categoryId: "papiers", label: "Bracelet festival (si pré-commandé)", optional: true },
      { id: "pap-portefeuille", categoryId: "papiers", label: "Portefeuille", optional: false },
      { id: "pap-cni", categoryId: "papiers", label: "Carte d'identité", optional: false },
      { id: "pap-vitale", categoryId: "papiers", label: "Carte vitale / Mutuelle", optional: false },
      { id: "pap-cb", categoryId: "papiers", label: "Carte de crédit", optional: false },
      { id: "pap-especes", categoryId: "papiers", label: "Espèces", optional: false },
    ],
  },
  {
    id: "transport",
    label: "Transport / Voiture",
    icon: "car",
    items: [
      { id: "tra-permis", categoryId: "transport", label: "Permis de conduire", optional: false },
      { id: "tra-pneus", categoryId: "transport", label: "Pneus en bon état", optional: false },
      { id: "tra-gilets", categoryId: "transport", label: "Gilets de sécurité", optional: false },
      { id: "tra-assurance", categoryId: "transport", label: "Carte d'assurance auto", optional: false },
    ],
  },
];
```

---

## Design System metal (tailwind.config.ts)

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        metal: {
          bg:       "#080808",   // noir profond
          surface:  "#111111",   // cards
          border:   "#222222",   // séparateurs
          neon:     "#39ff14",   // vert acide — accent principal
          fire:     "#ff6600",   // orange feu — accent secondaire
          blood:    "#cc0000",   // rouge sang — warnings
          bone:     "#d4c5a9",   // beige os — texte secondaire
          silver:   "#9ca3af",   // gris métal — texte muted
        },
      },
      fontFamily: {
        metal:  ['"Metal Mania"', "cursive"],   // titres, noms de festivals
        body:   ['"Rajdhani"', "sans-serif"],   // contenu
      },
      backgroundImage: {
        "noise": "url('/assets/noise.svg')",    // texture légère
        "gradient-metal": "linear-gradient(180deg, #111 0%, #080808 100%)",
      },
      boxShadow: {
        "neon":  "0 0 10px #39ff14, 0 0 20px #39ff1440",
        "fire":  "0 0 10px #ff6600, 0 0 20px #ff660040",
      },
      animation: {
        "pulse-neon": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

**Classes utilitaires à créer dans index.css :**
```css
@import url('https://fonts.googleapis.com/css2?family=Metal+Mania&family=Rajdhani:wght@400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-metal {
    @apply bg-metal-surface border border-metal-neon text-metal-neon font-body font-semibold
           px-4 py-2 uppercase tracking-widest text-sm
           hover:bg-metal-neon hover:text-metal-bg
           transition-all duration-200 shadow-neon;
  }
  .btn-fire {
    @apply btn-metal border-metal-fire text-metal-fire hover:bg-metal-fire shadow-fire;
  }
  .card-metal {
    @apply bg-metal-surface border border-metal-border rounded-sm p-4
           hover:border-metal-neon transition-colors duration-200;
  }
  .check-item {
    @apply flex items-start gap-3 py-2 border-b border-metal-border/30
           cursor-pointer group transition-all;
  }
  .checkbox-metal {
    @apply w-5 h-5 border-2 border-metal-silver flex-shrink-0 mt-0.5
           group-hover:border-metal-neon transition-colors;
  }
  .checkbox-metal.checked {
    @apply border-metal-neon bg-metal-neon/20;
  }
}
```

---

## Pages et routes

```
/                     → FestivalListPage  (liste des festivals + bouton créer)
/festival/:id         → ChecklistPage     (checklist complète d'un festival)
/festival/:id/summary → SummaryPage       (récap de ce qui reste à faire — optionnel v1)
```

---

## Comportements clés à implémenter

### Gestion festivals
- Créer un festival : nom (requis) + lieu (optionnel) + dates (optionnel) + emoji (picker simple)
- Supprimer un festival avec confirmation ("Are you sure ? \nTHIS IS METAL 🤘")
- La liste montre : nom, emoji, dates, **barre de progression globale** (% d'items cochés)

### Checklist
- Groupée par catégories, chaque catégorie collapsible (état mémorisé en localStorage)
- Chaque item : cochable, label, badge "optionnel" si `optional: true`
- Les items `isWarning: true` affichent leur `note` en orange avec icône ⚠️
- Filtre rapide : Tout / À faire / Faits (toggle 3 états, persisté en session)
- Bouton **"Reset checklist"** par festival (remet tout à zéro pour ce festival)
- **Progress bar** en header de la checklist : X/Y items cochés (% en neon vert)

### PWA
- Installable sur Android/iOS/Desktop
- Fonctionne **offline** (service worker Workbox cache-first)
- Icônes générées via `@vite-pwa/assets-generator` à partir d'un SVG source

---

## Configuration vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: { cacheName: "google-fonts-cache", expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
      manifest: {
        name: "FestPack — Festival Checklist",
        short_name: "FestPack",
        description: "Ta checklist métal pour survivre au festival",
        theme_color: "#080808",
        background_color: "#080808",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "icons/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
});
```

---

## GitHub Actions — Azure Static Web App

Fichier `.github/workflows/azure-static-web-apps.yml` :

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches: [main]

jobs:
  build_and_deploy:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: "dist"

  close_pull_request:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close PR Environment
    steps:
      - name: Close staging environment
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

> **Prérequis** :
> 1. Créer la ressource Azure Static Web App dans le portail Azure
> 2. Copier le `Deployment Token` dans un secret GitHub nommé `AZURE_STATIC_WEB_APPS_API_TOKEN`
> 3. Le fichier `staticwebapp.config.json` à la racine pour le routing SPA :
>
> ```json
> { "navigationFallback": { "rewrite": "/index.html" } }
> ```

---

## Commandes pour démarrer

```bash
# Scaffold
npm create vite@latest festpack -- --template react-ts
cd festpack

# Dépendances
npm install
npm install -D tailwindcss postcss autoprefixer vite-plugin-pwa
npm install lucide-react react-router-dom
npx tailwindcss init -p

# Optionnel mais recommandé
npm install zustand          # state management simple
npm install idb              # IndexedDB avec une bonne API Promise

# Dev
npm run dev

# Build
npm run build && npm run preview
```

---

## Prompt Claude Code pour démarrer le dev

> Colle ce bloc dans Claude Code une fois le repo initialisé :

```
Tu travailles sur FestPack, une PWA React + Vite + TypeScript + Tailwind CSS.
C'est une checklist de festival 100% locale (localStorage), sans backend, sans auth.
Lis le fichier BOOTSTRAP.md à la racine pour comprendre l'architecture complète,
les types de données, le design system metal, et les comportements attendus.

Commence par :
1. Mettre en place le tailwind.config.ts avec le thème metal décrit dans BOOTSTRAP.md
2. Créer les types dans src/types/index.ts
3. Créer le defaultChecklist.ts dans src/data/
4. Créer le hook useFestivals.ts (CRUD localStorage)
5. Créer le hook useChecklist.ts (état des coches par festival)
6. Créer le composant FestivalList avec le design metal (dark, neon vert, font Metal Mania)
7. Créer le composant ChecklistPage avec les catégories collapsibles et la progress bar

Priorité design : sombre, metal, lisible sur mobile, checkboxes satisfaisantes à cocher.
Pas de librairie de composants UI externe — tout en Tailwind custom.
```

---

## Hors périmètre v1

- ❌ Synchronisation cloud / partage
- ❌ Authentification
- ❌ Édition de la checklist template (ajout/suppression d'items)
- ❌ Notifications push
- ❌ Mode multi-utilisateurs
- ❌ Export PDF/impression (nice to have v2)

---

*🤘 See you in Hell !*