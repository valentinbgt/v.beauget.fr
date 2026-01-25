<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="(skill, index) in visibleSkills"
      :key="index"
      :ref="(el) => setBrickRef(el, index)"
      class="absolute px-5 py-4 rounded-xl border-2 flex items-center justify-center gap-1 sm:gap-2 bg-white dark:bg-slate-800 transition-colors"
      :class="skill.borderColor"
      :style="{ willChange: 'transform' }"
    >
      <div
        class="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
        v-html="skill.logo"
      ></div>
      <span
        class="font-mono text-xs sm:text-sm md:text-md font-bold text-slate-700 dark:text-slate-300 text-center px-1 sm:px-2"
      >
        {{ skill.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const containerRef = ref(null);
const brickRefs = ref([]);
const mousePosition = ref({ x: 0, y: 0 });
const isMouseActive = ref(false);
const animations = ref([]);
const isMobile = ref(false);

// Détection mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640;
};

// Données bidon des technologies
const allSkills = ref([
  {
    name: "Vue.js",
    borderColor: "border-green-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 1.61H12.225L9.388 6.588 6.55 1.61H0L9.388 19.39 18.775 1.61H24Z" fill="#4FC08D"/><path d="M0 1.61L6.55 13.213 9.388 8.236 3.838 1.61H0Z" fill="#35495E"/></svg>`,
  },
  {
    name: "TypeScript",
    borderColor: "border-blue-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.41 10.5c.612 0 1.227.03 1.84.06v2.527h-1.312c-.08 0-.16-.002-.24-.003-.08-.002-.16-.005-.24-.01-.08-.003-.16-.01-.24-.017-.08-.01-.16-.02-.24-.033a2.7 2.7 0 0 0-.24-.05c-.08-.02-.16-.04-.24-.07-.08-.03-.16-.06-.24-.1-.08-.04-.16-.08-.24-.13-.08-.05-.16-.1-.24-.16-.08-.06-.16-.12-.24-.19-.08-.07-.16-.14-.24-.22-.08-.08-.16-.16-.24-.25-.08-.09-.16-.18-.24-.28-.08-.1-.16-.2-.24-.31-.08-.11-.16-.22-.24-.34-.08-.12-.16-.24-.24-.37-.08-.13-.16-.26-.24-.4-.08-.14-.16-.28-.24-.43-.08-.15-.16-.3-.24-.46-.08-.16-.16-.32-.24-.48-.08-.16-.16-.32-.24-.48h2.88v-1.68H9.225v2.16h1.44c.08 0 .16.01.24.02.08.01.16.03.24.05.08.02.16.05.24.08.08.03.16.07.24.12.08.05.16.1.24.16.08.06.16.13.24.2.08.07.16.15.24.23.08.08.16.17.24.26.08.09.16.18.24.28.08.1.16.2.24.31.08.11.16.22.24.34.08.12.16.24.24.37.08.13.16.26.24.4.08.14.16.28.24.43.08.15.16.3.24.46.08.16.16.32.24.48.08.16.16.32.24.48h-2.88v1.68H17.535z" fill="#fff"/></svg>`,
  },
  {
    name: "Tailwind",
    borderColor: "border-cyan-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" fill="#06B6D4"/></svg>`,
  },
  {
    name: "React",
    borderColor: "border-blue-400",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#61DAFB"/><path d="M8.5 12c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5z" fill="#61DAFB"/></svg>`,
  },
  {
    name: "Node.js",
    borderColor: "border-green-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.998 24c-2.246 0-4.122-.745-5.627-2.234-1.5-1.487-2.244-3.36-2.244-5.62 0-1.8.6-3.36 1.8-4.68L8.15 4.38c.3-.3.75-.3 1.05 0s.3.75 0 1.05L6.99 13.11c-.9 1.05-1.35 2.31-1.35 3.78 0 1.8.6 3.24 1.8 4.32 1.2 1.08 2.7 1.62 4.5 1.62 1.8 0 3.3-.54 4.5-1.62 1.2-1.08 1.8-2.52 1.8-4.32 0-1.47-.45-2.73-1.35-3.78L13.8 5.43c-.3-.3-.3-.75 0-1.05s.75-.3 1.05 0l3.223 6.086c1.2 1.32 1.8 2.88 1.8 4.68 0 2.26-.744 4.133-2.244 5.62-1.505 1.489-3.381 2.234-5.627 2.234z" fill="#339933"/></svg>`,
  },
  {
    name: "PostgreSQL",
    borderColor: "border-blue-600",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.559 14.644c-.053-1.003-.146-2.008-.146-3.012 0-1.007.093-2.009.146-3.012.08-1.5.16-3.003.16-4.507 0-1.504-.08-3.007-.16-4.51-.053-1.003-.146-2.005-.146-3.012 0-.507.053-1.01.146-1.514H.44c-.093.504-.146 1.007-.146 1.514 0 1.007.053 2.009.146 3.012.08 1.503.16 3.006.16 4.51 0 1.504-.08 3.007-.16 4.507-.093 1.003-.146 2.005-.146 3.012 0 1.004.053 2.009.146 3.012.08 1.5.16 3.003.16 4.507 0 1.504-.08 3.007-.16 4.51-.093 1.003-.146 2.005-.146 3.012 0 .507.053 1.01.146 1.514h23.12c.093-.504.146-1.007.146-1.514 0-1.007-.053-2.009-.146-3.012-.08-1.503-.16-3.006-.16-4.51 0-1.504.08-3.007.16-4.507z" fill="#336791"/></svg>`,
  },
  {
    name: "Docker",
    borderColor: "border-blue-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.983 10.807h2.119v2.121h-2.119v-2.121zm-2.12 0H9.744v2.121h2.119v-2.121zm-2.121 0H7.623v2.121h2.119v-2.121zm-2.12 0H5.503v2.121h2.119v-2.121zm-2.121 0H3.382v2.121h2.119v-2.121zM1.14 8.686h2.119v2.121H1.14V8.686zm15.963 0h2.119v2.121h-2.119V8.686zm-2.12 0h-2.12v2.121h2.12V8.686zm-2.121 0h-2.119v2.121h2.119V8.686zm4.241-2.121h2.119v2.121h-2.119V6.565zm-2.12 0h-2.12v2.121h2.12V6.565zm-2.121 0h-2.119v2.121h2.119V6.565zm-2.12 0h-2.12v2.121h2.12V6.565zm-2.121 0H7.623v2.121h2.119V6.565zm-2.12 0H5.503v2.121h2.119V6.565zm-2.121 0H3.382v2.121h2.119V6.565zM1.14 6.565h2.119v2.121H1.14V6.565zm0-2.121h2.119v2.121H1.14V4.444zm2.12 0h2.119v2.121H3.26V4.444zm2.121 0h2.119v2.121h-2.119V4.444zm2.12 0h2.12v2.121h-2.12V4.444zm2.121 0h2.119v2.121h-2.119V4.444zm2.12 0h2.12v2.121h-2.12V4.444zm2.121 0h2.119v2.121h-2.119V4.444zm2.12 0h2.12v2.121h-2.12V4.444zm2.121 0h2.119v2.121h-2.119V4.444z" fill="#2496ED"/></svg>`,
  },
  {
    name: "Git",
    borderColor: "border-red-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.546 10.93L13.067.45a1.524 1.524 0 0 0-2.134 0L.454 10.93a1.524 1.524 0 0 0 0 2.134l10.479 10.48a1.524 1.524 0 0 0 2.134 0l10.479-10.48a1.524 1.524 0 0 0 0-2.134zM9.424 19.424l-1.9-1.9 2.134-2.134-2.134-2.134 1.9-1.9 2.134 2.134 2.134-2.134 1.9 1.9-2.134 2.134 2.134 2.134-1.9 1.9-2.134-2.134-2.134 2.134z" fill="#F05032"/></svg>`,
  },
  {
    name: "Express",
    borderColor: "border-gray-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.49 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-1.32 1.151-1.803-.653-.293-1.216-.662-1.555-1.144-.232-.334-.282-.768-.23-1.189.052-.42.194-.808.417-1.16.224-.35.52-.65.848-.889.327-.24.68-.413 1.05-.516.37-.103.75-.135 1.13-.094.38.04.75.15 1.09.32.34.17.65.4.91.68.26.28.47.6.62.95.15.35.24.72.27 1.1.03.38 0 .76-.09 1.12-.09.36-.23.7-.41 1.02-.18.32-.4.61-.66.86-.26.25-.55.46-.87.63-.32.17-.66.29-1.02.36-.36.07-.72.09-1.08.05-.36-.04-.71-.13-1.04-.26-.33-.13-.64-.3-.93-.5-.29-.2-.55-.44-.78-.71a4.04 4.04 0 01-.51-1.02c-.13-.35-.2-.72-.21-1.09-.01-.37.04-.74.14-1.1.1-.36.25-.7.44-1.02.19-.32.42-.61.68-.86.26-.25.55-.46.87-.63.32-.17.66-.29 1.02-.36.36-.07.72-.09 1.08-.05.36.04.71.13 1.04.26.33.13.64.3.93.5.29.2.55.44.78.71.23.27.43.57.51 1.02H.002z" fill="#000"/></svg>`,
  },
  {
    name: "Linux",
    borderColor: "border-orange-500",
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.504 0c-.155 0-.315.008-.48.022-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.052-2.038 2.76-2.699 4.338-.852 2.02-1.625 4.217-.97 6.628.838 2.465 2.863 3.843 5.155 4.377 2.464.565 4.849-.31 6.716-2.23 1.753-1.832 2.038-4.1 1.875-6.234-.163-2.18-1.126-4.024-2.73-5.48-1.6-1.453-3.787-2.38-6.08-2.58-.455-.04-.92-.064-1.388-.064zm.057 2.21c.208 0 .406.006.595.016 2.744.22 4.476 1.22 5.796 2.84 1.225 1.5 1.705 3.2 1.83 4.992.11 1.65-.07 3.27-.75 4.63-1.01 1.99-2.497 3.24-4.4 3.75-1.815.48-3.637.2-5.1-1.05-1.38-1.18-2.15-2.87-2.25-4.65-.1-1.78.4-3.42 1.5-4.85 1.05-1.36 2.48-2.2 4.18-2.58.3-.07.61-.12.93-.15.3-.02.61-.03.92-.03zm-.64 3.13c-.3.01-.6.03-.89.06-.93.1-1.8.4-2.52.95-.72.55-1.26 1.3-1.55 2.2-.3.92-.32 1.9-.07 2.8.24.88.7 1.66 1.35 2.25.64.58 1.43.95 2.28 1.08.86.13 1.74.02 2.55-.32.82-.34 1.54-.9 2.08-1.6.55-.72.88-1.55.96-2.43.08-.9-.08-1.8-.45-2.62-.36-.8-.94-1.5-1.68-1.98-.74-.47-1.6-.75-2.5-.8-.28-.02-.57-.02-.86-.01zm.05 1.87c.2 0 .4.02.59.05.6.06 1.15.25 1.62.55.47.3.85.7 1.1 1.18.26.48.38 1.02.35 1.57-.03.54-.18 1.06-.45 1.52-.27.45-.64.83-1.1 1.1-.46.27-.98.42-1.52.45-.54.03-1.08-.09-1.57-.35-.48-.25-.88-.63-1.18-1.1-.3-.47-.49-1.02-.55-1.62-.06-.6.02-1.2.24-1.75.22-.55.57-1.03 1.05-1.4.48-.37 1.05-.6 1.65-.68.2-.03.4-.04.6-.04z" fill="#FCC624"/></svg>`,
  },
]);

// Limiter le nombre de briques sur mobile
const visibleSkills = computed(() => {
  if (isMobile.value) {
    return allSkills.value.slice(0, 6); // 6 briques sur mobile
  }
  return allSkills.value;
});

const setBrickRef = (el, index) => {
  if (el) {
    brickRefs.value[index] = el;
  }
};

const getRandomPosition = () => {
  if (!containerRef.value) return { x: 0, y: 0 };

  const container = containerRef.value;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const brickWidth = isMobile.value ? 100 : 120;
  const brickHeight = isMobile.value ? 70 : 80;

  return {
    x: Math.random() * (containerWidth - brickWidth),
    y: Math.random() * (containerHeight - brickHeight),
  };
};

const getRandomDirection = () => {
  const angle = Math.random() * Math.PI * 2;
  const speed = 30 + Math.random() * 40; // 30-70 pixels par mouvement
  return {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed,
  };
};

const checkBoundaries = (x, y, brick) => {
  if (!containerRef.value || !brick) return { x, y, needsBounce: false };

  const container = containerRef.value;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const brickWidth = isMobile.value ? 100 : 120;
  const brickHeight = isMobile.value ? 70 : 80;

  let newX = x;
  let newY = y;
  let needsBounce = false;

  if (x < 0) {
    newX = 0;
    needsBounce = true;
  } else if (x > containerWidth - brickWidth) {
    newX = containerWidth - brickWidth;
    needsBounce = true;
  }

  if (y < 0) {
    newY = 0;
    needsBounce = true;
  } else if (y > containerHeight - brickHeight) {
    newY = containerHeight - brickHeight;
    needsBounce = true;
  }

  return { x: newX, y: newY, needsBounce };
};

const animateBrick = (brick, index) => {
  if (!brick || !containerRef.value) return;

  const currentX = gsap.getProperty(brick, "x") || 0;
  const currentY = gsap.getProperty(brick, "y") || 0;

  const direction = getRandomDirection();
  const targetX = currentX + direction.x;
  const targetY = currentY + direction.y;

  const boundary = checkBoundaries(targetX, targetY, brick);

  const duration = 2 + Math.random() * 2; // 2-4 secondes

  const tween = gsap.to(brick, {
    x: boundary.x,
    y: boundary.y,
    duration: duration,
    ease: "none",
    onComplete: () => {
      // Si on a touché un bord, générer une nouvelle direction
      if (boundary.needsBounce) {
        const newDirection = getRandomDirection();
        const newTargetX = boundary.x + newDirection.x;
        const newTargetY = boundary.y + newDirection.y;
        const newBoundary = checkBoundaries(newTargetX, newTargetY, brick);

        gsap.to(brick, {
          x: newBoundary.x,
          y: newBoundary.y,
          duration: duration,
          ease: "none",
          onComplete: () => animateBrick(brick, index),
        });
      } else {
        animateBrick(brick, index);
      }
    },
  });

  animations.value[index] = tween;
};

const handleMouseMove = (event) => {
  if (!containerRef.value || isMobile.value) return; // Désactiver sur mobile

  const rect = containerRef.value.getBoundingClientRect();
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  isMouseActive.value = true;

  const repulsionRadius = isMobile.value ? 100 : 150;
  const maxForce = isMobile.value ? 50 : 80;

  brickRefs.value.forEach((brick, index) => {
    if (!brick) return;

    const brickX = gsap.getProperty(brick, "x") || 0;
    const brickY = gsap.getProperty(brick, "y") || 0;
    const brickWidth = isMobile.value ? 100 : 120;
    const brickHeight = isMobile.value ? 70 : 80;
    const brickCenterX = brickX + brickWidth / 2;
    const brickCenterY = brickY + brickHeight / 2;

    const dx = mousePosition.value.x - brickCenterX;
    const dy = mousePosition.value.y - brickCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius && distance > 0) {
      const force = (repulsionRadius - distance) / repulsionRadius;
      const repulsionX = -(dx / distance) * force * maxForce;
      const repulsionY = -(dy / distance) * force * maxForce;

      const newX = brickX + repulsionX;
      const newY = brickY + repulsionY;

      const boundary = checkBoundaries(newX, newY, brick);

      // Tuer l'animation en cours
      if (animations.value[index]) {
        animations.value[index].kill();
      }

      // Appliquer la répulsion
      gsap.to(brick, {
        x: boundary.x,
        y: boundary.y,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Reprendre l'animation normale après un court délai
          setTimeout(() => {
            animateBrick(brick, index);
          }, 500);
        },
      });
    }
  });
};

const handleMouseLeave = () => {
  isMouseActive.value = false;
};

const initAnimations = () => {
  // Vérifier si l'utilisateur préfère les animations réduites
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  brickRefs.value.forEach((brick, index) => {
    if (!brick) return;

    // Position initiale aléatoire
    const initialPos = getRandomPosition();
    gsap.set(brick, { x: initialPos.x, y: initialPos.y });

    // Démarrer l'animation
    setTimeout(() => {
      animateBrick(brick, index);
    }, index * 100); // Délai progressif pour éviter le démarrage simultané
  });
};

const cleanup = () => {
  animations.value.forEach((tween) => {
    if (tween) {
      tween.kill();
    }
  });
  animations.value = [];
};

onMounted(() => {
  checkMobile();

  // Attendre que le DOM soit prêt
  setTimeout(() => {
    initAnimations();
  }, 100);

  // Gérer le redimensionnement
  const handleResize = () => {
    checkMobile();
    cleanup();
    setTimeout(() => {
      initAnimations();
    }, 100);
  };

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});

onUnmounted(() => {
  cleanup();
});
</script>
