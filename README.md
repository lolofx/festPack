# 🤘 FestPack

> PWA de checklist festival — métal, offline-first, sans backend.

[![Build & Deploy](https://github.com/lolofx/festPack/actions/workflows/azure-static-web-apps.yml/badge.svg)](https://github.com/lolofx/festPack/actions/workflows/azure-static-web-apps.yml)
![PWA](https://img.shields.io/badge/PWA-installable-blueviolet)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

---

## À propos

FestPack est une PWA installable pour préparer ses festivals de musique (Hellfest, Download, Rock en Seine…). Multi-festivals, 100% locale — aucun compte, aucun backend, aucune donnée quittant ton appareil.

**Fonctionnalités :**

- Créer et gérer plusieurs festivals
- Checklist de 100+ items répartis en 14 catégories
- Progression dynamique par festival (rouge → orange → vert)
- Catégories collapsibles, filtre Tout / À faire / Faits
- Installable sur mobile et desktop (PWA offline-first)
- 100% persisté en localStorage

---

## Stack

| Couche | Choix |
|---|---|
| Framework | React 18 + TypeScript strict |
| Bundler | Vite 5 |
| Styles | Tailwind CSS 3 — thème metal custom, pas de UI lib |
| PWA | vite-plugin-pwa + Workbox (cache-first) |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Metal Mania (titres) + Rajdhani (body) |
| State | Hooks React uniquement — pas de Zustand |
| Persistance | localStorage via `StorageAdapter` (swappable Firebase) |
| Tests | Vitest + @testing-library/react |
| Deploy | Azure Static Web Apps via GitHub Actions |

---

## Développement local

```bash
npm install
npm run dev        # http://localhost:5173
npm run test:run   # 22 tests unitaires
npm run build      # build de production
```

> **Note :** Utilise `npm run test:run` et non `npx vitest` directement.

---

## Structure du projet

```
src/
├── components/
│   ├── layout/          # AppShell, MetalHeader
│   ├── festivals/       # FestivalCard, FestivalList, CreateFestivalModal
│   └── checklist/       # ChecklistPage, CategorySection, CheckItem, ProgressBar
├── data/
│   └── defaultChecklist.ts   # 14 catégories, 100+ items
├── hooks/
│   ├── useFestivals.ts        # CRUD festivals
│   └── useChecklist.ts        # état des coches par festival
├── types/index.ts
├── utils/storage.ts           # StorageAdapter (localStorage)
└── App.tsx
```

---

## Déploiement Azure Static Web Apps

Le workflow `.github/workflows/azure-static-web-apps.yml` est préconfigured. Pour activer le déploiement :

1. Crée une **Azure Static Web App** (Free tier) liée à ce repo
2. Récupère le **Deployment Token** depuis le portail Azure
3. Ajoute-le en secret GitHub : `AZURE_STATIC_WEB_APPS_API_TOKEN`

Chaque push sur `main` déclenche le build + déploiement automatiquement.

---

## Roadmap v2 (hors périmètre v1)

- [ ] Items custom par utilisateur (ajout/suppression)
- [ ] Migration Firebase (auth + sync multi-appareils) — `StorageAdapter` déjà prévu
- [ ] Export PDF de la checklist
- [ ] PWA icons (192px, 512px, maskable) — placeholder actuellement
- [ ] Décorations visuelles metal (têtes de mort, textures)

---

## Licence

MIT
