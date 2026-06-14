# MetalBackground — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer un composant React `<MetalBackground />` avec crâne géométrique animé en SVG inline, intégré au niveau AppShell (toutes les pages), et remplacer le tick checkbox par des os croisés dans `CheckItem.tsx`.

**Architecture:** Composant `MetalBackground` fixe en `z-0` avec 3 couches internes (`GlowLayer`, `GrungeLayer`, `SkullLayer`). Le contenu existant est wrappé dans `z-10`. Les keyframes CSS vivent dans `index.css` wrappés dans `prefers-reduced-motion`. Le checkbox change est isolé dans `CheckItem.tsx` : un seul SVG remplace un autre.

**Tech Stack:** React 18, Tailwind CSS (classes utilitaires), SVG inline, CSS @keyframes

---

## Fichiers

| Action | Fichier | Rôle |
|---|---|---|
| CRÉER | `src/components/layout/MetalBackground.tsx` | Composant 3 couches : glow + grunge + skull |
| MODIFIER | `src/components/layout/AppShell.tsx` | Ajouter `<MetalBackground />`, wrapper `z-10` |
| MODIFIER | `src/index.css` | 4 @keyframes + 3 classes d'animation |
| MODIFIER | `src/components/checklist/CheckItem.tsx` | Remplacer tick SVG par crossed bones |

---

## Task 1 : Créer la branche de travail

**Files:** aucun fichier modifié

- [ ] **Vérifier que main est propre et à jour**

```bash
git status
git pull origin main
```

Expected : `nothing to commit, working tree clean`

- [ ] **Créer la branche**

```bash
git checkout -b feature/metal-background-design
```

Expected : `Switched to a new branch 'feature/metal-background-design'`

---

## Task 2 : Ajouter les @keyframes dans index.css

**Files:**
- Modify: `src/index.css` — ajouter après le bloc `@keyframes check-bounce`

- [ ] **Ajouter les 4 keyframes et 3 classes d'animation à la fin de `src/index.css`**

Ajouter exactement ce bloc après la règle `.checkbox-bounce { ... }` :

```css
/* === MetalBackground animations === */

@media (prefers-reduced-motion: no-preference) {
  .metal-skull-animate {
    animation:
      skull-spin  25s linear       infinite,
      skull-pulse  3s ease-in-out  infinite;
    transform-origin: center center;
    will-change: transform, opacity;
  }

  .metal-corner-float {
    animation: corner-float 5s ease-in-out infinite;
  }

  .metal-grunge-animate {
    animation: grunge-breathe 6s ease-in-out infinite;
  }
}

@keyframes skull-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes skull-pulse {
  0%, 100% {
    opacity: 0.22;
    filter: drop-shadow(0 0 4px #39ff14);
  }
  50% {
    opacity: 0.32;
    filter: drop-shadow(0 0 14px #39ff14) drop-shadow(0 0 28px #39ff1450);
  }
}

@keyframes corner-float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}

@keyframes grunge-breathe {
  0%, 100% { opacity: 0.03; }
  50%       { opacity: 0.07; }
}
```

- [ ] **Vérifier que les tests passent encore (pas de régression CSS)**

```bash
npm run test:run
```

Expected : tous les tests existants passent (22 tests)

- [ ] **Commit**

```bash
git add src/index.css
git commit -m "style: add MetalBackground animation keyframes"
```

---

## Task 3 : Créer MetalBackground.tsx

**Files:**
- Create: `src/components/layout/MetalBackground.tsx`

- [ ] **Créer le fichier `src/components/layout/MetalBackground.tsx` avec ce contenu exact**

```tsx
const GlowLayer = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id="glow-blur">
        <feGaussianBlur stdDeviation="60" />
      </filter>
    </defs>
    <ellipse cx="60%" cy="40%" rx="300" ry="200" fill="#39ff14" opacity="0.06" filter="url(#glow-blur)" />
    <ellipse cx="10%" cy="80%" rx="200" ry="150" fill="#ff6600" opacity="0.05" filter="url(#glow-blur)" />
    <ellipse cx="85%" cy="15%" rx="180" ry="130" fill="#cc0000" opacity="0.04" filter="url(#glow-blur)" />
  </svg>
);

const GrungeLayer = () => (
  <svg
    className="absolute inset-0 w-full h-full metal-grunge-animate"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.04 }}
  >
    <defs>
      <pattern id="grunge-tile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <line x1="0" y1="40" x2="40" y2="0" stroke="#39ff14" strokeWidth="0.5" opacity="0.6" />
        <line x1="-10" y1="30" x2="30" y2="-10" stroke="#39ff14" strokeWidth="0.3" opacity="0.4" />
        <circle cx="8" cy="8" r="1" fill="#39ff14" opacity="0.5" />
        <circle cx="25" cy="30" r="0.8" fill="#ff6600" opacity="0.4" />
        <circle cx="35" cy="12" r="0.7" fill="#39ff14" opacity="0.3" />
        <circle cx="15" cy="35" r="1" fill="#39ff14" opacity="0.3" />
        <line x1="5" y1="20" x2="12" y2="20" stroke="#39ff14" strokeWidth="0.5" opacity="0.3" />
        <line x1="28" y1="6" x2="38" y2="6" stroke="#ff6600" strokeWidth="0.4" opacity="0.25" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grunge-tile)" />
  </svg>
);

const MiniSkull = ({ rotation }: { rotation: number }) => (
  <svg viewBox="0 0 60 56" width="60" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)` }}>
    <ellipse cx="30" cy="22" rx="22" ry="19" stroke="#39ff14" strokeWidth="1.5" />
    <polygon points="14,16 22,12 30,14 30,24 22,28 14,22" stroke="#39ff14" strokeWidth="1.3" />
    <polygon points="46,16 38,12 30,14 30,24 38,28 46,22" stroke="#39ff14" strokeWidth="1.3" />
    <polygon points="30,28 26,36 34,36" stroke="#39ff14" strokeWidth="1" />
    <rect x="14" y="38" width="32" height="14" rx="1" stroke="#39ff14" strokeWidth="1.2" />
    <line x1="22" y1="38" x2="22" y2="52" stroke="#39ff14" strokeWidth="0.8" />
    <line x1="30" y1="38" x2="30" y2="52" stroke="#39ff14" strokeWidth="0.8" />
    <line x1="38" y1="38" x2="38" y2="52" stroke="#39ff14" strokeWidth="0.8" />
  </svg>
);

const SkullLayer = () => (
  <div className="absolute inset-0 overflow-hidden">

    {/* === Crâne principal === */}
    {/* Div 1: déplace le coin TL au centre du viewport */}
    <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
      {/* Div 2: recentre l'élément (translate statique, pas animé) */}
      <div style={{ transform: 'translate(-50%, -50%)' }}>
      {/* Div 3: rotation animée — ne touche pas au translate parent */}
      <div className="metal-skull-animate">
        <svg
          viewBox="0 0 300 280"
          width="280"
          height="260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cranium outer */}
          <ellipse cx="150" cy="115" rx="112" ry="96" stroke="#39ff14" strokeWidth="2" />
          {/* Cranium inner hatch detail */}
          <ellipse cx="150" cy="110" rx="88" ry="74" stroke="#39ff14" strokeWidth="0.7" opacity="0.35" />
          {/* Crown ridge */}
          <path d="M62,68 L95,42 L150,32 L205,42 L238,68" stroke="#39ff14" strokeWidth="1.5" opacity="0.6" />
          {/* Temple dashes */}
          <line x1="30" y1="105" x2="48" y2="108" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
          <line x1="270" y1="105" x2="252" y2="108" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
          {/* Cheekbone angular lines */}
          <path d="M38,140 L52,163 L88,170" stroke="#39ff14" strokeWidth="1.5" />
          <path d="M262,140 L248,163 L212,170" stroke="#39ff14" strokeWidth="1.5" />
          {/* Left eye socket — hexagonal angular */}
          <polygon points="74,88 100,72 130,80 134,112 108,130 78,118" stroke="#39ff14" strokeWidth="2" />
          {/* Right eye socket */}
          <polygon points="226,88 200,72 170,80 166,112 192,130 222,118" stroke="#39ff14" strokeWidth="2" />
          {/* Nasal cavity — sharp inverted triangle */}
          <polygon points="150,142 140,178 160,178" stroke="#39ff14" strokeWidth="1.6" />
          {/* Forehead hatch marks */}
          <line x1="110" y1="55" x2="118" y2="63" stroke="#39ff14" strokeWidth="0.8" opacity="0.4" />
          <line x1="150" y1="40" x2="150" y2="50" stroke="#39ff14" strokeWidth="0.8" opacity="0.4" />
          <line x1="190" y1="55" x2="182" y2="63" stroke="#39ff14" strokeWidth="0.8" opacity="0.4" />
          {/* Jaw rectangle */}
          <rect x="70" y="188" width="160" height="58" rx="3" stroke="#39ff14" strokeWidth="1.8" />
          {/* Tooth dividers — 7 lines = 8 teeth */}
          <line x1="90"  y1="188" x2="90"  y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="110" y1="188" x2="110" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="130" y1="188" x2="130" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="150" y1="188" x2="150" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="170" y1="188" x2="170" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="190" y1="188" x2="190" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="210" y1="188" x2="210" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          {/* Jaw connectors to cranium */}
          <line x1="70"  y1="188" x2="55"  y2="175" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
          <line x1="230" y1="188" x2="245" y2="175" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
        </svg>
      </div>
      </div>
    </div>

    {/* === Triangles de coin === */}
    {/* Top-left fire */}
    <svg className="absolute top-0 left-0" width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.15 }}>
      <polygon points="0,0 80,0 0,80" fill="#ff6600" />
    </svg>
    {/* Bottom-right blood */}
    <svg className="absolute bottom-0 right-0" width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.12 }}>
      <polygon points="80,80 0,80 80,0" fill="#cc0000" />
    </svg>
    {/* Top-right blood (small) */}
    <svg className="absolute top-0 right-0" width="50" height="50" viewBox="0 0 50 50" style={{ opacity: 0.08 }}>
      <polygon points="50,0 50,50 0,0" fill="#cc0000" />
    </svg>
    {/* Bottom-left fire (small) */}
    <svg className="absolute bottom-0 left-0" width="50" height="50" viewBox="0 0 50 50" style={{ opacity: 0.08 }}>
      <polygon points="0,50 0,0 50,50" fill="#ff6600" />
    </svg>

    {/* === Mini crânes de coin (opacity 0.08, rotations fixes) === */}
    <div className="absolute top-2 left-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '0s' }}>
      <MiniSkull rotation={0} />
    </div>
    <div className="absolute top-2 right-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '1.5s' }}>
      <MiniSkull rotation={90} />
    </div>
    <div className="absolute bottom-2 right-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '3s' }}>
      <MiniSkull rotation={180} />
    </div>
    <div className="absolute bottom-2 left-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '4.5s' }}>
      <MiniSkull rotation={270} />
    </div>

    {/* Ligne neon top et bottom */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: '#39ff14', opacity: 0.25 }} />
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#39ff14', opacity: 0.25 }} />
  </div>
);

export function MetalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <GlowLayer />
      <GrungeLayer />
      <SkullLayer />
    </div>
  );
}
```

- [ ] **Vérifier que le fichier compile sans erreur TypeScript**

```bash
npx tsc --noEmit
```

Expected : aucune erreur (ou seulement des erreurs préexistantes non liées)

- [ ] **Commit**

```bash
git add src/components/layout/MetalBackground.tsx
git commit -m "feat: add MetalBackground component with skull SVG + 3 layers"
```

---

## Task 4 : Intégrer MetalBackground dans AppShell.tsx

**Files:**
- Modify: `src/components/layout/AppShell.tsx`

- [ ] **Remplacer le contenu de `src/components/layout/AppShell.tsx` par**

```tsx
import { Outlet } from "react-router-dom";
import { MetalBackground } from "./MetalBackground";

export function AppShell() {
  return (
    <div className="min-h-screen bg-metal-bg relative">
      <MetalBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
```

- [ ] **Lancer le dev server et vérifier visuellement**

```bash
npm run dev
```

Ouvrir `http://localhost:5173` — vérifier :
- Le crâne est visible en watermark semi-transparent
- Le crâne tourne lentement
- Les cards festivals sont lisibles par-dessus
- Aucun clic n'est bloqué par le background
- Sur `/festival/:id` (checklist) le skull est aussi présent

- [ ] **Commit**

```bash
git add src/components/layout/AppShell.tsx
git commit -m "feat: integrate MetalBackground into AppShell"
```

---

## Task 5 : Crossed bones dans CheckItem.tsx

**Files:**
- Modify: `src/components/checklist/CheckItem.tsx:31-38`

- [ ] **Dans `src/components/checklist/CheckItem.tsx`, remplacer le bloc SVG tick existant**

Remplacer :
```tsx
{checked && (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
    <path
      d="M1 5L4.5 8.5L11 1"
      stroke="#39ff14"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)}
```

Par :
```tsx
{checked && (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* os 1 : diagonale haut-gauche → bas-droit */}
    <line x1="2" y1="2" x2="12" y2="12" stroke="#39ff14" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="1.8" cy="1.8" r="2" stroke="#39ff14" strokeWidth="1.3" />
    <circle cx="12.2" cy="12.2" r="2" stroke="#39ff14" strokeWidth="1.3" />
    {/* os 2 : diagonale haut-droit → bas-gauche */}
    <line x1="12" y1="2" x2="2" y2="12" stroke="#39ff14" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12.2" cy="1.8" r="2" stroke="#39ff14" strokeWidth="1.3" />
    <circle cx="1.8" cy="12.2" r="2" stroke="#39ff14" strokeWidth="1.3" />
  </svg>
)}
```

- [ ] **Vérifier les tests existants (aucun test ne cible le SVG, doit passer à 22/22)**

```bash
npm run test:run
```

Expected : 22 tests, tous verts

- [ ] **Vérifier visuellement dans le browser**

Aller sur `/festival/:id` → cocher plusieurs items → vérifier :
- L'icône crossed bones ☠ est visible en neon vert
- La taille est proportionnée dans le carré 20×20px
- L'animation `checkbox-bounce` fonctionne toujours
- Le texte rayé + grisé fonctionne toujours

- [ ] **Commit**

```bash
git add src/components/checklist/CheckItem.tsx
git commit -m "feat: replace checkbox tick with crossed bones SVG"
```

---

## Task 6 : Vérification finale & nettoyage

**Files:** aucun

- [ ] **Run complet des tests**

```bash
npm run test:run
```

Expected : 22 tests, 0 failed

- [ ] **Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected : aucune erreur

- [ ] **Vérifier le build de prod**

```bash
npm run build
```

Expected : `dist/` généré sans erreur

- [ ] **Vérification visuelle finale (dev server)**

```bash
npm run dev
```

Checklist de validation :
- [ ] Skull watermark visible sur la home (`/`)
- [ ] Skull tourne (25s / tour)
- [ ] Skull pulse glow toutes les ~3s
- [ ] Mini crânes aux 4 coins flottent
- [ ] Pattern grunge visible (très subtil)
- [ ] Halos de couleur visibles (très subtils)
- [ ] Cards festivals lisibles au-dessus du background
- [ ] Skull visible sur la page checklist (`/festival/:id`)
- [ ] Crossed bones ☠ sur les items cochés
- [ ] Animation bounce checkbox toujours présente
- [ ] Aucun clic bloqué par le background
- [ ] Scroll fluide (pas de lag)

- [ ] **Si le skull ne convient pas visuellement**

L'utilisateur peut fournir une image JPEG/PNG de référence directement dans le chat. Analyser la géométrie (proportions, angles des orbites, style de mâchoire) et mettre à jour les `<polygon>` et `<path>` dans `MetalBackground.tsx` pour coller au style de référence.

- [ ] **Proposer un aperçu PR** (ne pas pousser sans accord explicite)

```bash
git log main..HEAD --oneline
```

Expected :
```
feat: replace checkbox tick with crossed bones SVG
feat: integrate MetalBackground into AppShell
feat: add MetalBackground component with skull SVG + 3 layers
style: add MetalBackground animation keyframes
```

Présenter le résumé à l'utilisateur et attendre son feu vert avant `git push`.
