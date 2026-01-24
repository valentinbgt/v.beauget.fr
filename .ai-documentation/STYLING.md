# Styling Documentation

## Overview

The project uses Tailwind CSS with a custom theme, supplemented by scoped CSS for animations and special effects.

---

## Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| `vblack` | `#1F1F1F` | Background, cards |
| `vgray` | `#BFBFBF` | Borders, secondary text |
| `vwhite` | `#F2F2F2` | Primary text |
| `vlightblue` | `#8FA5FF` | Accents, highlights, links |
| `vblue` | `#0020A0` | Reserved (unused currently) |

### Color Usage Patterns

```
Background:     vblack (#1F1F1F)
Primary Text:   vwhite (#F2F2F2)
Secondary Text: vgray (#BFBFBF)
Accent/Links:   vlightblue (#8FA5FF)
Borders:        vgray or white
```

### Typography

| Class | Font Family | Usage |
|-------|-------------|-------|
| `font-title` | Krona One | Headings, buttons, navigation |
| `font-text` | Kufam | Body text, descriptions |

**Fallbacks**: Arial, sans-serif

### Font Sources

```css
/* main.css */
@import url("https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400..900;1,400..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");
```

---

## Tailwind Configuration

**File**: `tailwind.config.js`

```javascript
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        vblack: "#1F1F1F",
        vgray: "#BFBFBF",
        vwhite: "#F2F2F2",
        vlightblue: "#8FA5FF",
        vblue: "#0020A0",
      },
      fontFamily: {
        title: ["Krona One", "Arial", "sans-serif"],
        text: ["Kufam", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

---

## Global Styles

**File**: `app.vue` (scoped to root)

### CSS Reset

```css
* {
  @apply p-0 m-0 box-border text-vwhite font-text scroll-smooth select-none;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-vblack overflow-x-hidden;
}
```

### Key Resets

- All elements use `font-text` (Kufam) by default
- All text is `vwhite` by default
- User selection disabled (`select-none`)
- Smooth scroll enabled globally
- Horizontal overflow hidden on body

---

## Video Background Effect

### Diagonal Mask

The background video uses a PNG mask (`vmask.png`) to create a diagonal line effect, not showing the full screen.

```css
.video-mask {
  -webkit-mask-image: url("/vmask.png");
  mask-image: url("/vmask.png");
  mask-repeat: no-repeat;
  mask-size: cover;
  mask-position: center;
}
```

**Visual Effect**:
```
┌─────────────────────────┐
│ ████████████████░░░░░░░ │
│ █████████████░░░░░░░░░░ │
│ ██████████░░░░░░░░░░░░░ │
│ ███████░░░░░░░░░░░░░░░░ │
│ ████░░░░░░░░░░░░░░░░░░░ │
│ █░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────┘
  █ = visible video
  ░ = masked (transparent)
```

### Parallax Effect

```vue
<div
  class="video-mask w-screen h-screen blur brightness-75 fixed"
  :style="{ transform: `translateY(${parallaxOffset}px)` }"
>
```

```javascript
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  parallaxOffset.value = scrollPosition * -0.5; // parallax intensity
};
```

**Effect**: Video moves at 50% of scroll speed (negative = opposite direction)

### Video Filters

| Filter | Value | Effect |
|--------|-------|--------|
| `blur` | Default | Slight blur for depth |
| `brightness` | `75%` | Darkened for readability |

---

## Animations

### Circular Text Rotation

**File**: `components/CircularTextLink.vue`

```css
.circular-text {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
```

- **Duration**: 20 seconds per rotation
- **Direction**: Counter-clockwise
- **Timing**: Linear (constant speed)

### Social Icon Press Effect

```css
.social-icon:hover {
  filter: drop-shadow(0px 3px 0px white);
  @apply transition;
}

.social-icon:active {
  transform: translateY(3px);
  filter: drop-shadow(0px 0px 0px white);
}
```

**Visual**:
```
Hover:          Active (pressed):
  ○               ○
  ▓ (shadow)      (no shadow, moved down)
```

### Notification Fade Transition

```css
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

**Effect**: Slide in from right with fade

---

## Component Styling Patterns

### Project Cards

```vue
<div
  class="bg-vblack w-full max-w-md h-80 flex flex-col-reverse overflow-hidden 
         border-2 border-white hover:-translate-x-2 hover:-translate-y-2 
         transition hover:shadow-vgray"
  style="box-shadow: 15px 15px 0px -5px var(--tw-shadow-color)"
>
```

**Hover Effect**:
```
Normal:         Hovered:
┌────────┐      ┌────────┐
│        │  →   │        │ ↖ moves up-left
│        │      │        │
└────────┘      └────────┘
                    ▓▓▓▓▓▓ (shadow appears)
```

### Buttons

**Standard Button**:
```vue
<button class="text-sm font-title border-2 border-white py-3 w-full 
               hover:bg-white hover:text-vblack transition-colors 
               active:underline active:decoration-vlightblue">
```

**States**:
| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | `vblack` | `vwhite` | `white` |
| Hover | `white` | `vblack` | `white` |
| Active | `white` | `vblack` + underline | `vlightblue` decoration |
| Disabled | `vblack` | `vgray` | `white` |

### Form Inputs

```vue
<input class="h-20 bg-vblack w-full px-7 text-xl 
              outline-none focus:underline decoration-vlightblue 
              caret-vlightblue" />
```

**Focus Indicator**: Underline with `vlightblue` color

---

## Responsive Breakpoints

Using Tailwind's default breakpoints:

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile |
| `md:` | 768px | Tablet |
| `xl:` | 1280px | Desktop |

### Common Responsive Patterns

```vue
<!-- Text sizes -->
<h1 class="text-5xl md:text-7xl xl:text-8xl">

<!-- Spacing -->
<div class="m-5 md:m-10 xl:m-16">

<!-- Grid columns -->
<div class="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

<!-- Icon sizes -->
<img class="w-10 md:w-14">
```

---

## Z-Index Layers

| Layer | Z-Index | Element |
|-------|---------|---------|
| Background | - | Video (fixed, behind content) |
| Content | `absolute` | Main content wrapper |
| Modal | `z-[9999]` | ProjectModal overlay |
| Notification | `z-50` | Toast notification |

---

## Design Tokens Summary

```javascript
// Colors
--vblack: #1F1F1F
--vgray: #BFBFBF
--vwhite: #F2F2F2
--vlightblue: #8FA5FF
--vblue: #0020A0

// Fonts
--font-title: "Krona One", Arial, sans-serif
--font-text: "Kufam", Arial, sans-serif

// Animations
--rotation-duration: 20s
--transition-duration: 0.3s
--parallax-intensity: 0.5

// Shadows
--card-shadow: 15px 15px 0px -5px
--icon-shadow: 0px 3px 0px white
```
