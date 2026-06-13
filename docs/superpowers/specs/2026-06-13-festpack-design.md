# FestPack — Design Spec v1

> PWA React + Vite + TypeScript + Tailwind CSS  
> Festival checklist 100% locale, design metal/rock

---

## Contexte

Application installable (PWA) permettant de gérer sa checklist de préparation festival.
Multi-festivals, persistance localStorage, offline-first. Aucun backend, aucune auth.

---

## Stack

| Besoin | Choix |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styles | Tailwind CSS 3 + thème metal custom |
| PWA | vite-plugin-pwa + Workbox (cache-first) |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Metal Mania (titres) + Rajdhani (body) |
| IDs | `crypto.randomUUID()` — pas de lib uuid |
| Persistance | localStorage uniquement — pas d'idb |
| State | Hooks React (useState + prop drilling minimal) — pas de Zustand |
| Deploy | Azure Static Web Apps via GitHub Actions |

---

## Architecture des fichiers

```
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx          # shell PWA (header + outlet)
│   │   └── MetalHeader.tsx       # header titre gothique
│   ├── festivals/
│   │   ├── FestivalCard.tsx      # card avec progress bar
│   │   ├── FestivalList.tsx      # liste des festivals
│   │   └── CreateFestivalModal.tsx
│   └── checklist/
│       ├── ChecklistPage.tsx     # page principale
│       ├── CategorySection.tsx   # section collapsible
│       ├── CheckItem.tsx         # item cochable avec animation
│       └── ProgressBar.tsx       # barre couleur dynamique
├── data/
│   └── defaultChecklist.ts       # template complet hardcodé
├── hooks/
│   ├── useFestivals.ts           # CRUD festivals localStorage
│   └── useChecklist.ts           # état des coches par festival
├── types/
│   └── index.ts
├── utils/
│   └── storage.ts                # wrappers localStorage typés
├── App.tsx
├── main.tsx
└── index.css
```

Pas de dossier `store/` — les hooks sont la seule couche d'état.

---

## Modèle de données

```typescript
interface Festival {
  id: string;           // crypto.randomUUID()
  name: string;
  location?: string;
  dateStart?: string;   // ISO date
  dateEnd?: string;
  emoji?: string;
  createdAt: string;
}

interface ChecklistItem {
  id: string;           // slug stable ex: "vet-tshirts"
  categoryId: string;
  label: string;
  optional: boolean;
  note?: string;
  isWarning?: boolean;
}

interface ChecklistCategory {
  id: string;
  label: string;
  icon: string;         // nom d'icône Lucide
  items: ChecklistItem[];
}

interface FestivalProgress {
  festivalId: string;
  checkedItems: string[];
  lastUpdated: string;
}

// localStorage keys
// "festpack:festivals"         → Festival[]
// "festpack:progress:{id}"     → FestivalProgress
// "festpack:collapsed:{id}"    → string[] (catégories réduites)
```

---

## Données par défaut

14 catégories (ajout de 2 vs BOOTSTRAP.md original) :

1. Vêtements
2. Chaussures
3. Accessoires
4. Électronique
5. Trousse de toilette
6. Camping
7. Hygiène camping
8. Alimentation
9. **Sacs** ← ajouté (sac à dos, sacoche, trousse 1ers secours)
10. Dans le sac (10L max)
11. Petite pharmacie
12. Papiers & Argent
13. Transport / Voiture
14. **Spécifique à chacun** ← ajouté (traitements, mode éco batterie)

---

## Routes

```
/                     → FestivalListPage
/festival/:id         → ChecklistPage
```

La SummaryPage (`/festival/:id/summary`) est hors périmètre v1.

---

## Comportements

### Festivals
- Créer : nom (requis) + lieu + dates + emoji picker simple
- Supprimer : confirmation métal `"THIS IS METAL 🤘 — Vraiment supprimer ?"` 
- Card : nom, emoji, dates, progress bar couleur dynamique

### Checklist
- Groupée par catégorie, chaque catégorie collapsible
- État collapsed persisté : `festpack:collapsed:{festivalId}` en localStorage
- Item : cochable, label, badge "optionnel" si `optional: true`
- Item `isWarning: true` : note affichée en orange avec ⚠️
- Filtre **Tout / À faire / Faits** — toggle 3 états, état session uniquement (sessionStorage)
- Bouton **Reset** par festival avec confirmation
- Progress bar en header : `X/Y cochés` — couleur dynamique

### Animation checkbox
- Au clic : `scale(0.9) → scale(1)` + fade du fond neon sur 150ms
- Quand coché : checkmark SVG, fond `metal-neon/20`, bordure `metal-neon`
- Quand décoché : retour état initial avec transition

### Progress bar couleur dynamique
- 0–33 % : `metal-blood` (#cc0000)
- 34–66 % : `metal-fire` (#ff6600)
- 67–100 % : `metal-neon` (#39ff14)
- Transition CSS `transition-all duration-500`

---

## Design system

### Palette Tailwind
```
metal-bg:      #080808   noir profond
metal-surface: #111111   cards
metal-border:  #222222   séparateurs
metal-neon:    #39ff14   vert acide — accent principal
metal-fire:    #ff6600   orange feu — accent secondaire
metal-blood:   #cc0000   rouge sang — warnings
metal-bone:    #d4c5a9   beige os — texte secondaire
metal-silver:  #9ca3af   gris métal — texte muted
```

### Fonts
- `font-metal` : Metal Mania — titres, noms de festivals
- `font-body` : Rajdhani — tout le reste

### Classes utilitaires
- `.btn-metal` — bouton neon border + hover fill
- `.btn-fire` — variante orange
- `.card-metal` — surface + border + hover neon
- `.check-item` — ligne item avec transitions
- `.checkbox-metal` — checkbox custom avec état checked

---

## PWA

- `registerType: "autoUpdate"` — SW mis à jour silencieusement
- Workbox cache-first sur assets statiques
- Cache Google Fonts 1 an
- Icons : 192px, 512px, maskable
- `theme_color: "#080808"`

---

## Hors périmètre v1

- Édition de la template checklist (ajout/suppression d'items custom)
- Synchronisation cloud
- Export PDF
- Notifications push
- SummaryPage
