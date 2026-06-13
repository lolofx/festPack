# FestPack — Guide Claude

PWA React festival checklist. 100% localStorage, no backend, no auth. Design metal/dark.

---

## Stack et conventions

| Domaine | Règle |
|---|---|
| State | Hooks React uniquement (`useState`, prop drilling minimal) — **pas de Zustand** |
| Persistance | `StorageAdapter` dans `src/utils/storage.ts` — **pas d'accès direct à localStorage** hors de ce module |
| IDs | `crypto.randomUUID()` — **pas de lib uuid** |
| Styles | Tailwind CSS custom — **pas de UI lib externe** (MUI, shadcn, etc.) |
| Icons | Lucide React — imports nommés explicites uniquement (pas `import *`) |
| Tests | `npm run test:run` — **pas `npx vitest`** (intercepté par RTK proxy) |
| Commits | Courts et précis, sans Co-Authored-By ni signature Claude |

---

## Architecture

```
src/
├── components/
│   ├── layout/          # AppShell (shell PWA) + MetalHeader (sticky header)
│   ├── festivals/       # FestivalCard, FestivalList, CreateFestivalModal
│   └── checklist/       # ChecklistPage, CategorySection, CheckItem, ProgressBar, progressColor
├── data/
│   └── defaultChecklist.ts   # 14 catégories hardcodées, source de vérité
├── hooks/
│   ├── useFestivals.ts        # CRUD festivals + sync localStorage
│   └── useChecklist.ts        # toggle/reset items, calcul progression
├── types/index.ts             # Festival, ChecklistItem, ChecklistCategory, FestivalProgress
├── utils/storage.ts           # StorageAdapter interface + localStorageAdapter
└── App.tsx                    # Routes : / et /festival/:id
```

**Règle de séparation des configs :** `vite.config.ts` (build uniquement) et `vitest.config.ts` (tests uniquement) sont séparés — TypeScript strict mode est incompatible avec les deux dans le même fichier.

---

## localStorage — clés et format

```
festpack:festivals          → Festival[]
festpack:progress:{id}      → FestivalProgress  (checkedItems: string[])
festpack:collapsed:{id}     → string[]           (IDs catégories réduites)
```

Toujours passer par `localStorageAdapter` (get/set/remove) — jamais `localStorage.getItem` directement.

---

## Thème Tailwind (metal)

```
metal-bg:      #080808   fond principal
metal-surface: #111111   cards
metal-border:  #222222   séparateurs
metal-neon:    #39ff14   vert acide — accent principal, checkboxes cochées
metal-fire:    #ff6600   orange feu — accent secondaire
metal-blood:   #cc0000   rouge sang — warnings et progress faible
metal-bone:    #d4c5a9   beige os — texte secondaire
metal-silver:  #9ca3af   gris métal — texte muted / items cochés
```

Fonts : `font-metal` (Metal Mania, Google Fonts) pour les titres, `font-body` (Rajdhani) pour tout le reste.

Classes utilitaires définies dans `src/index.css` : `.btn-metal`, `.btn-fire`, `.btn-ghost`, `.card-metal`, `.check-item`, `.checkbox-metal`, `.badge-optional`, `@keyframes checkbox-bounce`.

---

## Progress bar — couleur dynamique

`src/components/checklist/progressColor.ts` — `getProgressColor(percent)` :
- 0–33 % → `blood` (#cc0000)
- 34–66 % → `fire` (#ff6600)
- 67–100 % → `neon` (#39ff14)

---

## Checklist par défaut — 14 catégories

Fichier source : `src/data/defaultChecklist.ts`

IDs des items : slugs stables préfixés par catégorie (`vet-`, `chaus-`, `acc-`, `elec-`, `toi-`, `camp-`, `hyg-`, `alim-`, `sacs-`, `sacj-`, `pharma-`, `papiers-`, `transport-`, `perso-`).

**Attention :** `sacs-` (catégorie Sacs) et `sacj-` (Dans le sac / sac-jour) ont des préfixes différents pour éviter les collisions d'IDs.

---

## Tests

22 tests unitaires couvrant :
- `progressColor.ts` — cas limites (0, 33, 34, 66, 67, 100)
- `useFestivals.ts` — create, delete (avec nettoyage localStorage)
- `useChecklist.ts` — toggle, reset, getProgressPercent, isChecked
- `storage.ts` — get/set/remove, JSON corrompu

Commande : `npm run test:run`

---

## Migration Firebase (future v2)

L'interface `StorageAdapter` dans `src/utils/storage.ts` est le point d'entrée :

```typescript
interface StorageAdapter {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}
```

Pour migrer vers Firebase : implémenter `firebaseAdapter` avec les mêmes 3 méthodes, injecter dans les hooks via prop ou Context. Aucun autre fichier à modifier.

Firebase conviendrait pour : auth (Firebase Auth), checklist par défaut (Firestore), items custom par user, sync multi-appareils.

---

## Déploiement

Azure Static Web Apps (Free tier) + GitHub Actions.

- `staticwebapp.config.json` : navigation fallback vers `index.html` (SPA routing)
- Secret requis : `AZURE_STATIC_WEB_APPS_API_TOKEN` dans les secrets GitHub
- Build : `npm ci && npm run build` → `dist/`

---

## Hors périmètre v1

- Items custom (ajout/suppression par l'utilisateur)
- SummaryPage (`/festival/:id/summary`)
- Export PDF
- Notifications push
- Synchronisation cloud
- PWA icons réelles (actuellement placeholder `.gitkeep` dans `public/icons/`)
- Décorations visuelles metal (têtes de mort, textures) — prévu pour une itération future
