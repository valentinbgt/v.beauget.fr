<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden bg-slate-50 dark:bg-slate-900"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="(skill, index) in skills"
      :key="skill.id"
      :ref="(el) => setBrickRef(el, index)"
      class="absolute px-5 py-4 rounded-xl border-2 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 shadow-sm select-none will-change-transform"
      :class="skill.borderColor"
    >
      <div
        class="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center"
        v-html="skill.logo"
      ></div>
      <span
        class="font-mono text-xs sm:text-sm md:text-md font-bold text-slate-700 dark:text-slate-300 pointer-events-none"
      >
        {{ skill.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";

// --- Configuration Physique ---
const CONFIG = {
  baseSpeed: 0.8, // Vitesse de croisière
  maxSpeed: 3.5, // Vitesse max après impact souris
  friction: 0.98, // Ralentissement progressif après un boost (plus proche de 1 = glisse plus)
  mouseRepulsion: 1.5, // Force de la répulsion
  mouseRadius: 200, // Rayon d'action de la souris
};

// --- Données ---
const containerRef = ref(null);
const brickElements = ref([]); // Stocke les éléments DOM
const mousePos = ref({ x: -9999, y: -9999 }); // Hors écran par défaut
let containerBounds = { width: 0, height: 0 };

// Liste des skills avec leurs propriétés physiques initiales
const skills = ref([
  {
    id: 1,
    name: "Vue.js",
    borderColor: "border-green-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 1.61H12.225L9.388 6.588 6.55 1.61H0L9.388 19.39 18.775 1.61H24Z" fill="#4FC08D"/><path d="M0 1.61L6.55 13.213 9.388 8.236 3.838 1.61H0Z" fill="#35495E"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 2,
    name: "TypeScript",
    borderColor: "border-blue-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.41 10.5c.612 0 1.227.03 1.84.06v2.527h-1.312c-.08 0-.16-.002-.24-.003-.08-.002-.16-.005-.24-.01-.08-.003-.16-.01-.24-.017-.08-.01-.16-.02-.24-.033a2.7 2.7 0 0 0-.24-.05c-.08-.02-.16-.04-.24-.07-.08-.03-.16-.06-.24-.1-.08-.04-.16-.08-.24-.13-.08-.05-.16-.1-.24-.16-.08-.06-.16-.12-.24-.19-.08-.07-.16-.14-.24-.22-.08-.08-.16-.16-.24-.25-.08-.09-.16-.18-.24-.28-.08-.1-.16-.2-.24-.31-.08-.11-.16-.22-.24-.34-.08-.12-.16-.24-.24-.37-.08-.13-.16-.26-.24-.4-.08-.14-.16-.28-.24-.43-.08-.15-.16-.3-.24-.46-.08-.16-.16-.32-.24-.48.08-.16.16-.32.24.48h2.88v-1.68H9.225v2.16h1.44c.08 0 .16.01.24.02.08.01.16.03.24.05.08.02.16.05.24.08.08.03.16.07.24.12.08.05.16.1.24.16.08.06.16.13.24.2.08.07.16.15.24.23.08.08.16.17.24.26.08.09.16.18.24.28.08.1.16.2.24.31.08.11.16.22.24.34.08.12.16.24.24.37.08.13.16.26.24.4.08.14.16.28.24.43.08.15.16.3.24.46.08.16.16.32.24.48.08.16.16.32.24.48h-2.88v1.68H17.535z" fill="#fff"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 3,
    name: "Tailwind",
    borderColor: "border-cyan-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" fill="#06B6D4"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 4,
    name: "React",
    borderColor: "border-blue-400",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#61DAFB"/><path d="M8.5 12c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5z" fill="#61DAFB"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 5,
    name: "Node.js",
    borderColor: "border-green-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.998 24c-2.246 0-4.122-.745-5.627-2.234-1.5-1.487-2.244-3.36-2.244-5.62 0-1.8.6-3.36 1.8-4.68L8.15 4.38c.3-.3.75-.3 1.05 0s.3.75 0 1.05L6.99 13.11c-.9 1.05-1.35 2.31-1.35 3.78 0 1.8.6 3.24 1.8 4.32 1.2 1.08 2.7 1.62 4.5 1.62 1.8 0 3.3-.54 4.5-1.62 1.2-1.08 1.8-2.52 1.8-4.32 0-1.47-.45-2.73-1.35-3.78L13.8 5.43c-.3-.3-.3-.75 0-1.05s.75-.3 1.05 0l3.223 6.086c1.2 1.32 1.8 2.88 1.8 4.68 0 2.26-.744 4.133-2.244 5.62-1.505 1.489-3.381 2.234-5.627 2.234z" fill="#339933"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 6,
    name: "PostgreSQL",
    borderColor: "border-blue-600",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.559 14.644c-.053-1.003-.146-2.008-.146-3.012 0-1.007.093-2.009.146-3.012.08-1.5.16-3.003.16-4.507 0-1.504-.08-3.007-.16-4.51-.053-1.003-.146-2.005-.146-3.012 0-.507.053-1.01.146-1.514H.44c-.093.504-.146 1.007-.146 1.514 0 1.007.053 2.009.146 3.012.08 1.503.16 3.006.16 4.51 0 1.504-.08 3.007-.16 4.507-.093 1.003-.146 2.005-.146 3.012 0 1.004.053 2.009.146 3.012.08 1.5.16 3.003.16 4.507 0 1.504-.08 3.007-.16 4.51-.093 1.003-.146 2.005-.146 3.012 0 .507.053 1.01.146 1.514h23.12c.093-.504.146-1.007.146-1.514 0-1.007-.053-2.009-.146-3.012-.08-1.503-.16-3.006-.16-4.51 0-1.504.08-3.007.16-4.507z" fill="#336791"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 7,
    name: "Docker",
    borderColor: "border-blue-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.983 10.807h2.119v2.121h-2.119v-2.121zm-2.12 0H9.744v2.121h2.119v-2.121zm-2.121 0H7.623v2.121h2.119v-2.121zm-2.12 0H5.503v2.121h2.119v-2.121zm-2.121 0H3.382v2.121h2.119v-2.121zM1.14 8.686h2.119v2.121H1.14V8.686zm15.963 0h2.119v2.121h-2.119V8.686zm-2.12 0h-2.12v2.121h2.12V8.686zm-2.121 0h-2.119v2.121h2.119V8.686zm4.241-2.121h2.119v2.121h-2.119V6.565zm-2.12 0h-2.12v2.121h2.12V6.565zm-2.121 0h-2.119v2.121h2.119V6.565zm-2.12 0h-2.12v2.121h2.12V6.565zm-2.121 0H7.623v2.121h2.119V6.565zm-2.12 0H5.503v2.121h2.119V6.565zm-2.121 0H3.382v2.121h2.119V6.565zM1.14 6.565h2.119v2.121H1.14V6.565zm0-2.121h2.119v2.121H1.14V4.444zm2.12 0h2.119v2.121H3.26V4.444zm2.121 0h2.119v2.121h-2.119V4.444zm2.12 0h2.12v2.121h-2.12V4.444zm2.121 0h2.119v2.121h-2.119V4.444zm2.12 0h2.12v2.121h-2.12V4.444zm2.121 0h2.119v2.121h-2.119V4.444zm2.12 0h2.12v2.121h-2.12V4.444zm2.121 0h2.119v2.121h-2.119V4.444z" fill="#2496ED"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 8,
    name: "Git",
    borderColor: "border-red-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.546 10.93L13.067.45a1.524 1.524 0 0 0-2.134 0L.454 10.93a1.524 1.524 0 0 0 0 2.134l10.479 10.48a1.524 1.524 0 0 0 2.134 0l10.479-10.48a1.524 1.524 0 0 0 0-2.134zM9.424 19.424l-1.9-1.9 2.134-2.134-2.134-2.134 1.9-1.9 2.134 2.134 2.134-2.134 1.9 1.9-2.134 2.134 2.134 2.134-1.9 1.9-2.134-2.134-2.134 2.134z" fill="#F05032"/></svg>`,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
]);

// Setters pour GSAP (Performance optimization)
let skillSetters = [];

const setBrickRef = (el, index) => {
  if (el) {
    brickElements.value[index] = el;
    // Crée un "quickSetter" pour optimiser les écritures dans le DOM
    skillSetters[index] = gsap.quickSetter(el, "css");
  }
};

const handleMouseMove = (e) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  mousePos.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const handleMouseLeave = () => {
  mousePos.value = { x: -9999, y: -9999 };
};

// Initialisation des positions aléatoires
const initPhysics = () => {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  containerBounds = { width: rect.width, height: rect.height };

  skills.value.forEach((skill, i) => {
    const el = brickElements.value[i];
    if (el) {
      skill.width = el.offsetWidth;
      skill.height = el.offsetHeight;

      // Vitesse de base individuelle avec variation (80% à 120% de la baseSpeed)
      skill.baseSpeed = CONFIG.baseSpeed * (0.8 + Math.random() * 0.4);

      // Position aléatoire (en évitant de toucher les bords au spawn)
      skill.x = Math.random() * (containerBounds.width - skill.width);
      skill.y = Math.random() * (containerBounds.height - skill.height);

      // Direction aléatoire
      const angle = Math.random() * Math.PI * 2;
      skill.vx = Math.cos(angle) * skill.baseSpeed;
      skill.vy = Math.sin(angle) * skill.baseSpeed;
    }
  });
};

const update = () => {
  const { width, height } = containerBounds;
  const minAngleRad = 2 * (Math.PI / 180); // 2 degrés

  skills.value.forEach((skill, i) => {
    // --- 1. Répulsion Souris ---
    const dx = skill.x + skill.width / 2 - mousePos.value.x;
    const dy = skill.y + skill.height / 2 - mousePos.value.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let isAffectedByMouse = false;

    if (dist < CONFIG.mouseRadius) {
      isAffectedByMouse = true;
      const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
      const angle = Math.atan2(dy, dx);

      // On ajoute la force
      skill.vx += Math.cos(angle) * force * CONFIG.mouseRepulsion;
      skill.vy += Math.sin(angle) * force * CONFIG.mouseRepulsion;
    }

    // --- 2. Calcul de la vitesse actuelle ---
    let currentSpeed = Math.sqrt(skill.vx * skill.vx + skill.vy * skill.vy);

    // --- 3. Friction (Ralentissement) ---
    // Si on va plus vite que la vitesse de base, on freine
    if (currentSpeed > skill.baseSpeed) {
      // Astuce : On applique la friction directement
      skill.vx *= CONFIG.friction;
      skill.vy *= CONFIG.friction;

      // IMPORTANT : On met à jour currentSpeed pour la suite des calculs
      currentSpeed *= CONFIG.friction;
    }
    // Si on est trop lent (cas rare), on relance un peu
    else if (currentSpeed < skill.baseSpeed * 0.5) {
      skill.vx *= 1.02;
      skill.vy *= 1.02;
      currentSpeed *= 1.02;
    }

    // --- 4. Plafond Vitesse Max ---
    if (currentSpeed > CONFIG.maxSpeed) {
      skill.vx = (skill.vx / currentSpeed) * CONFIG.maxSpeed;
      skill.vy = (skill.vy / currentSpeed) * CONFIG.maxSpeed;
      currentSpeed = CONFIG.maxSpeed; // Mise à jour forcée
    }

    // --- 5. Correction d'Angle (Anti-blocage) ---
    // On utilise 'currentSpeed' qui est maintenant à jour (après friction)
    if (!isAffectedByMouse && currentSpeed > 0.1) {
      const minComponent = currentSpeed * Math.sin(minAngleRad);

      // Correction Axe X (Trop horizontal)
      if (Math.abs(skill.vy) < minComponent) {
        const signVy = skill.vy >= 0 ? 1 : -1;
        // On force un vy minimum
        skill.vy = signVy * minComponent;

        // On recalcule vx pour que la vitesse totale reste exactement 'currentSpeed'
        // vx = sqrt(speed^2 - vy^2) * signe_original
        const signVx = skill.vx >= 0 ? 1 : -1;
        const remainingSq = currentSpeed * currentSpeed - skill.vy * skill.vy;
        skill.vx = signVx * Math.sqrt(Math.max(0, remainingSq));
      }

      // Correction Axe Y (Trop vertical)
      else if (Math.abs(skill.vx) < minComponent) {
        const signVx = skill.vx >= 0 ? 1 : -1;
        skill.vx = signVx * minComponent;

        const signVy = skill.vy >= 0 ? 1 : -1;
        const remainingSq = currentSpeed * currentSpeed - skill.vx * skill.vx;
        skill.vy = signVy * Math.sqrt(Math.max(0, remainingSq));
      }
    }

    // --- 6. Mouvement ---
    skill.x += skill.vx;
    skill.y += skill.vy;

    // --- 7. Collisions Murs ---
    if (skill.x + skill.width >= width) {
      skill.x = width - skill.width;
      skill.vx *= -1;
    } else if (skill.x <= 0) {
      skill.x = 0;
      skill.vx *= -1;
    }

    if (skill.y + skill.height >= height) {
      skill.y = height - skill.height;
      skill.vy *= -1;
    } else if (skill.y <= 0) {
      skill.y = 0;
      skill.vy *= -1;
    }

    // --- 8. Rendu ---
    if (skillSetters[i]) {
      skillSetters[i]({ x: skill.x, y: skill.y });
    }
  });
};

// Gestion du redimensionnement
let resizeObserver;
const handleResize = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    containerBounds = { width: rect.width, height: rect.height };
    // On réajuste ceux qui seraient sortis de l'écran
    skills.value.forEach((skill) => {
      if (skill.x > rect.width) skill.x = rect.width - skill.width;
      if (skill.y > rect.height) skill.y = rect.height - skill.height;
    });
  }
};

onMounted(async () => {
  await nextTick(); // Attendre que le DOM soit rendu
  initPhysics();

  // Utiliser le Ticker de GSAP pour une animation fluide synchronisée
  gsap.ticker.add(update);

  resizeObserver = new ResizeObserver(handleResize);
  if (containerRef.value) resizeObserver.observe(containerRef.value);
});

onUnmounted(() => {
  gsap.ticker.remove(update);
  if (resizeObserver) resizeObserver.disconnect();
});
</script>
