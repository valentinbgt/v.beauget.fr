# Styling Documentation

## Overview

The project uses Tailwind CSS with a modern design system supporting dark mode, supplemented by scoped CSS for animations and special effects. The design follows an admin-panel aesthetic with clean lines and interactive elements.

---

## Design System

### Color Palette

The design uses Tailwind's default color system with dark mode support:

| Usage          | Light Mode      | Dark Mode          |
|----------------|-----------------|--------------------|
| Background     | `bg-gray-50`    | `bg-dark-bg` (#0f172a) |
| Surface        | `bg-white`      | `bg-slate-800`     |
| Primary Text   | `text-slate-800` | `text-slate-100`   |
| Secondary Text | `text-slate-500` | `text-slate-400`   |
| Accent/Links   | `text-primary-600` | `text-primary-400` |
| Borders        | `border-gray-200` | `border-slate-700` |

### Typography

| Class | Font Family | Usage |
|-------|-------------|-------|
| Default | Inter | Body text, descriptions |
| `font-mono` | JetBrains Mono | Code, terminal, labels |

**Font Sources**:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap");
```

---

## Tailwind Configuration

**File**: `tailwind.config.js`

The configuration uses Tailwind's default theme with dark mode support via class strategy:

```javascript
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          border: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
```

---

## Global Styles

**File**: `app.vue` (scoped styles)

### Base Styles

```css
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-gray-50 text-slate-800 dark:bg-dark-bg dark:text-slate-100 transition-colors duration-300;
}
```

### Key Features

- Smooth scroll enabled globally
- Dark mode support with system preference detection
- Color transitions for theme switching
- Custom scrollbar styling for admin-panel feel

---

## Hero Section - Terminal Visualization

The hero section features a real-time terminal that displays actual network requests captured from the browser.

### Terminal Styling

```vue
<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 p-6">
  <div class="font-mono text-[10px] leading-relaxed">
    <!-- Network logs displayed here -->
  </div>
</div>
```

### Network Log Format

Each log entry shows:

- **Time**: HH:MM:SS format
- **Method**: GET, POST, PUT (color-coded)
- **Path**: Request path (truncated if long)
- **Status**: HTTP status code (color-coded)
- **Duration**: Response time in milliseconds

### Color Coding

- **GET requests**: Green (`text-green-500`)
- **POST requests**: Blue (`text-blue-500`)
- **PUT requests**: Yellow (`text-yellow-500`)
- **Status codes**:
  - 2xx: Green
  - 3xx: Yellow
  - 4xx/5xx: Red

---

## Animations

### Modal Transitions

**ProjectModal carousel and lightbox**:

```css
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
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
<article class="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 
                overflow-hidden cursor-pointer hover:shadow-xl hover:border-primary-400 
                dark:hover:border-primary-500 transition-all duration-300">
```

**Hover Effect**: Card lifts with shadow and border color change

### Buttons

**Primary Button**:

```vue
<button class="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 
               font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-slate-200 
               transition shadow-lg">
```

**Secondary Button**:

```vue
<button class="px-6 py-3 border border-slate-300 dark:border-slate-600 
               text-slate-700 dark:text-slate-300 font-medium rounded-lg 
               hover:bg-gray-50 dark:hover:bg-slate-800 transition">
```

### Form Inputs

```vue
<input class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 
              border border-gray-200 dark:border-slate-700 
              focus:ring-2 focus:ring-primary-500 outline-none transition" />
```

**Focus Indicator**: Ring with primary color

---

## Responsive Breakpoints

Using Tailwind's default breakpoints:

| Prefix   | Min Width | Usage   |
|----------|-----------|---------|
| (none)   | 0px       | Mobile  |
| `md:`    | 768px     | Tablet  |
| `xl:`    | 1280px    | Desktop |

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
| Navigation | `z-40` | Fixed navigation bar |
| Content | `z-10` | Main content sections |
| Modal | `z-50` | ProjectModal overlay |
| Lightbox | `z-[60]` | Image lightbox |
| Notification | `z-50` | Toast notification |

---

## Design Tokens Summary

```javascript
// Colors (Tailwind)
--primary-500: #3b82f6
--primary-600: #2563eb
--dark-bg: #0f172a
--dark-surface: #1e293b
--dark-border: #334155

// Fonts
--font-sans: "Inter", sans-serif
--font-mono: "JetBrains Mono", monospace

// Animations
--transition-duration: 0.3s
--transition-timing: ease

// Shadows
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```
