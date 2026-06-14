# MetalBackground — Design Spec
_Date: 2026-06-14_

## Décisions validées

| Paramètre | Choix | Raison |
|---|---|---|
| Palette | Neon `#39ff14` / Fire `#ff6600` / Blood `#cc0000` | Cohérence avec le thème existant, moins dramatique que gold/purple |
| Placement | AppShell global (toutes les pages) | Atmosphère constante home + checklist |
| Animations | Full — rotation + glow pulse + coins flottants + grunge breathing | Impact maximal |
| Architecture | Composant layered, 3 couches internes | Lisibilité + `prefers-reduced-motion` par couche, sans sur-ingénierie |
| Fallback skull | Images JPEG/PNG de référence utilisateur si le SVG généré ne convient pas | Filet de sécurité validé |

---

## Fichiers à créer / modifier

```
src/components/layout/
├── MetalBackground.tsx   ← CRÉER
└── AppShell.tsx          ← MODIFIER (ajouter MetalBackground)
src/index.css             ← MODIFIER (ajouter @keyframes)
```

---

## AppShell.tsx — changement

```tsx
import { MetalBackground } from './MetalBackground'

export function AppShell() {
  return (
    <div className="min-h-screen bg-metal-bg relative">
      <MetalBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  )
}
```

`MetalBackground` : `fixed inset-0 z-0 pointer-events-none overflow-hidden` — aucun impact sur les interactions.

---

## MetalBackground.tsx — architecture

Trois `const` internes, pas de sous-composants exportés.

### Couche 1 — SkullLayer

Crâne géométrique anguleux, centré, `opacity: 0.22`.

**Skull SVG spec :**
- Forme globale : ellipse aplatie (largeur > hauteur), angles pointus
- Front large, crâne arrière court — style punk agressif
- Orbites : polygones angulaires (losanges / hexagones tronqués), pas de cercles
- Nasal : triangle inversé étroit
- Mâchoire : rectangle avec dents séparées par des `<line>` verticales (6–7 dents)
- Tracé : `stroke` neon `#39ff14`, `fill: none`, `stroke-width: 1.5–2`
- Taille viewBox : `0 0 300 280`, rendu à `~280px` centré

**Coins (4x) :**
- Top-left : triangle `#ff6600`, `opacity: 0.15`, taille ~80px
- Bottom-right : triangle `#cc0000`, `opacity: 0.12`, taille ~80px
- Top-right : triangle `#cc0000`, `opacity: 0.08`, taille ~50px
- Bottom-left : triangle `#ff6600`, `opacity: 0.08`, taille ~50px

**Crânes secondaires (4 coins) :**
- Mini crânes (~60px) aux 4 coins, `opacity: 0.08`
- Rotations fixes : TL 0°, TR 90°, BR 180°, BL 270°
- Animation : `corner-float` (flottement vertical ±8px), décalages `animation-delay` de 0/1.5/3/4.5s

**Animations :**
- `skull-spin` : rotation 0→360deg, 25s, linear, infinite — sur le groupe crâne+orbites
- `skull-pulse` : opacity 0.18→0.28→0.18, filter glow 4px→14px, 3s ease-in-out infinite

### Couche 2 — GrungeLayer

Pattern SVG repeat `40×40px` :
- Diagonales cassantes : `<line>` à 45° tous les 8px, `stroke-width: 0.5`, `opacity: 0.6`
- Impacts ponctuels : `<circle r="1">` dispersés aléatoirement (5–6 par tile)
- Traits horizontaux brisés : segments courts, espacés

Rendu : `<pattern>` + `<rect width="100%" height="100%">` couvrant le viewport.  
Opacité globale : `0.04`.

**Animation :**
- `grunge-breathe` : opacity 0.03→0.07→0.03, 6s ease-in-out infinite

### Couche 3 — GlowLayer

3 ellipses avec `filter: blur(60px)` :

| Position | Couleur | Taille | Opacity |
|---|---|---|---|
| Centre (60%, 40%) | `#39ff14` | 300×200px | 0.06 |
| Bas-gauche (10%, 80%) | `#ff6600` | 200×150px | 0.05 |
| Haut-droit (85%, 15%) | `#cc0000` | 180×130px | 0.04 |

Pas d'animation propre — l'effet visuel vient du `skull-pulse` parent.

---

## CSS @keyframes (dans index.css)

```css
@keyframes skull-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes skull-pulse {
  0%, 100% { opacity: 0.18; filter: drop-shadow(0 0 4px #39ff14); }
  50%       { opacity: 0.28; filter: drop-shadow(0 0 14px #39ff14) drop-shadow(0 0 28px #39ff1450); }
}

@keyframes corner-float {
  0%, 100% { transform: translateY(0px);  opacity: 0.12; }
  50%       { transform: translateY(-8px); opacity: 0.18; }
}

@keyframes grunge-breathe {
  0%, 100% { opacity: 0.03; }
  50%       { opacity: 0.07; }
}
```

**Respect `prefers-reduced-motion` :** wrap chaque animation dans `@media (prefers-reduced-motion: no-preference)` — si désactivé, le composant reste statique mais visible.

---

## Contraintes techniques

- `pointer-events: none` sur tout le composant — aucune interaction captée
- `position: fixed` (pas `absolute`) pour rester en place lors du scroll
- `will-change: transform` sur SkullLayer pour accélérer la rotation GPU
- **Conflit transform/centrage** : skull-spin tourne le SVG, mais le centrage est fait via un wrapper `translate(-50%, -50%)`. Solution : div parent pour le positionnement, div enfant pour l'animation de rotation — évite l'écrasement des transforms
- Pas d'images externes, pas de PNG — 100% SVG inline + CSS
- Pas de lib externe (conforme CLAUDE.md)

---

## Checkbox — Bone design (ajout validé)

**Fichier touché :** `src/components/checklist/CheckItem.tsx`

**Comportement :**
- Non coché : carré identique à l'actuel (`border-metal-silver`, pas d'icône)
- Coché : carré `border-metal-neon bg-metal-neon/12` + **crossed bones SVG** à la place du tick ✓

**SVG crossed bones (14×14px, viewBox `0 0 14 14`) :**
```svg
<!-- os 1 : diagonale haut-gauche → bas-droit -->
<line x1="2" y1="2" x2="12" y2="12" stroke="#39ff14" stroke-width="1.8" stroke-linecap="round"/>
<circle cx="1.8" cy="1.8" r="2" stroke="#39ff14" stroke-width="1.3" fill="none"/>
<circle cx="12.2" cy="12.2" r="2" stroke="#39ff14" stroke-width="1.3" fill="none"/>
<!-- os 2 : diagonale haut-droit → bas-gauche -->
<line x1="12" y1="2" x2="2" y2="12" stroke="#39ff14" stroke-width="1.8" stroke-linecap="round"/>
<circle cx="12.2" cy="1.8" r="2" stroke="#39ff14" stroke-width="1.3" fill="none"/>
<circle cx="1.8" cy="12.2" r="2" stroke="#39ff14" stroke-width="1.3" fill="none"/>
```

Remplace le `<path d="M1 5L4.5 8.5L11 1" .../>` existant dans `CheckItem.tsx`. Aucun autre changement dans ce composant.

---

## Hors périmètre de ce ticket

- Items SVG customisables via props (taille, opacité) — v2 si besoin
- Variante légère pour checklist page (opacité réduite) — décision post-test
- Crânes custom importés depuis une image utilisateur — fallback prévu mais pas implémenté par défaut
