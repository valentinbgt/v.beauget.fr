<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden bg-slate-50 dark:bg-slate-800"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="(skill, index) in skills"
      :key="skill.id"
      :ref="(el) => setBrickRef(el, index)"
      class="absolute px-5 py-4 rounded-xl border-2 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 shadow-sm select-none will-change-transform"
      :class="getBorderColor(skill)"
    >
      <div
        v-if="getImage(skill)"
        class="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center"
      >
        <img
          :src="getImage(skill)"
          :alt="skill.name[locale]"
          class="w-full h-full object-contain"
        />
      </div>
      <span
        class="font-mono text-xs sm:text-sm md:text-md font-bold text-slate-700 dark:text-slate-300 pointer-events-none"
      >
        {{ skill.name[locale] }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { gsap } from "gsap";

const { locale } = useI18n();

// Détection du thème avec réactivité
const isDark = ref(false);

const checkTheme = () => {
  if (typeof document !== "undefined") {
    isDark.value = document.documentElement.classList.contains("dark");
  }
};

// Observer les changements de thème
let themeObserver = null;

onMounted(() => {
  checkTheme();
  themeObserver = new MutationObserver(() => {
    checkTheme();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onUnmounted(() => {
  if (themeObserver) {
    themeObserver.disconnect();
  }
});

// Fonctions pour obtenir l'image et la couleur selon le thème
const getImage = (skill) => {
  // En dark mode, utilise imageDark si disponible, sinon image par défaut
  if (isDark.value && skill.imageDark) {
    return skill.imageDark;
  }
  // En light mode, utilise image par défaut
  return skill.image;
};

const getBorderColor = (skill) => {
  // En dark mode, utilise borderColorDark si disponible, sinon borderColor par défaut
  if (isDark.value && skill.borderColorDark) {
    return skill.borderColorDark;
  }
  // En light mode, utilise borderColor par défaut
  return skill.borderColor;
};

// --- Configuration Physique ---
const CONFIG = {
  baseSpeed: 0.4, // Vitesse de croisière
  maxSpeed: 3.5, // Vitesse max après impact souris
  friction: 0.994, // Ralentissement progressif après un boost (plus proche de 1 = glisse plus)
  mouseRepulsion: 1.5, // Force de la répulsion
  mouseRadius: 160, // Rayon d'action de la souris
};

// --- Données ---
const containerRef = ref(null);
const brickElements = ref([]); // Stocke les éléments DOM
const mousePos = ref({ x: -9999, y: -9999 }); // Hors écran par défaut
let containerBounds = { width: 0, height: 0 };

// Liste des skills avec leurs propriétés physiques initiales
const skillsData = ref([
  {
    id: 1,
    name: { fr: "Vue.js", en: "Vue.js" },
    borderColor: "border-[#3fb984]",
    borderColorDark: "border-[#3fb984]",
    image: "/icons/skills/vue.png",
    imageDark: "/icons/skills/vue.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 2,
    name: { fr: "TypeScript", en: "TypeScript" },
    borderColor: "border-[#2d79c7]",
    borderColorDark: "border-[#2d79c7]",
    image: "/icons/skills/typescript.png",
    imageDark: "/icons/skills/typescript.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 3,
    name: { fr: "Tailwind CSS", en: "Tailwind CSS" },
    borderColor: "border-[#39bef8]",
    borderColorDark: "border-[#39bef8]",
    image: "/icons/skills/tailwind.png",
    imageDark: "/icons/skills/tailwind.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 4,
    name: { fr: "Nuxt", en: "Nuxt" },
    borderColor: "border-[#00dc82]",
    borderColorDark: "border-[#00dc82]",
    image: "/icons/skills/nuxt.png",
    imageDark: "/icons/skills/nuxt.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 5,
    name: { fr: "Debian", en: "Debian" },
    borderColor: "border-red-600",
    borderColorDark: "border-red-600",
    image: "/icons/skills/debian.png",
    imageDark: "/icons/skills/debian.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 6,
    name: { fr: "Docker", en: "Docker" },
    borderColor: "border-[#5b87a9]",
    borderColorDark: "border-[#5b87a9]",
    image: "/icons/skills/docker.png",
    imageDark: "/icons/skills/docker.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 7,
    name: { fr: "Git", en: "Git" },
    borderColor: "border-[#f05030]",
    borderColorDark: "border-[#f05030]",
    image: "/icons/skills/git.png",
    imageDark: "/icons/skills/git.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 8,
    name: { fr: "Réseau", en: "Network" },
    borderColor: "border-[#54c3f1]",
    borderColorDark: "border-[#54c3f1]",
    image: "/icons/skills/network.png",
    imageDark: "/icons/skills/network.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 9,
    name: { fr: "Gestion d'équipe", en: "Team Management" },
    borderColor: "border-[#3a3a3a]",
    borderColorDark: "border-white-900",
    image: "/icons/skills/team_light.png",
    imageDark: "/icons/skills/team_dark.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 10,
    name: { fr: "Gestion de projets", en: "Project Management" },
    borderColor: "border-yellow-500",
    borderColorDark: "border-yellow-500",
    image: "/icons/skills/folder.png",
    imageDark: "/icons/skills/folder.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 11,
    name: { fr: "Dokploy", en: "Dokploy" },
    borderColor: "border-[#3a3a3a]",
    borderColorDark: "border-white-900",
    image: "/icons/skills/dokploy_light.png",
    imageDark: "/icons/skills/dokploy_dark.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 12,
    name: { fr: "CI/CD", en: "CI/CD" },
    borderColor: "border-red-500",
    borderColorDark: "border-red-500",
    image: "/icons/skills/pipeline.png",
    imageDark: "/icons/skills/pipeline.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 13,
    name: { fr: "Autonomie", en: "Autonomy" },
    borderColor: "border-green-500",
    borderColorDark: "border-green-500",
    image: "/icons/skills/arrow.png",
    imageDark: "/icons/skills/arrow.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 14,
    name: { fr: "Son", en: "Sound" },
    borderColor: "border-[#3a3a3a]",
    borderColorDark: "border-white-900",
    image: "/icons/skills/xlr.png",
    imageDark: "/icons/skills/xlr.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
  {
    id: 15,
    name: { fr: "DMX", en: "DMX" },
    borderColor: "border-[#3a3a3a]",
    borderColorDark: "border-white-900",
    image: "/icons/skills/dmx.png",
    imageDark: "/icons/skills/dmx.png",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: 0,
    height: 0,
  },
]);

// Computed to get skills with localized names for display
const skills = computed(() => skillsData.value);

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

  skillsData.value.forEach((skill, i) => {
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

  skillsData.value.forEach((skill, i) => {
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
    skillsData.value.forEach((skill) => {
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
