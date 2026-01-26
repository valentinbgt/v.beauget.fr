<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <Transition name="backdrop">
      <div
        v-if="true"
        @click="$emit('close')"
        class="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-0"
      ></div>
    </Transition>

    <div
      class="relative w-full h-full overflow-hidden flex items-center justify-center z-10"
    >
      <button
        v-if="prevProject"
        @click.stop="goToPrev"
        class="absolute left-4 lg:left-8 z-40 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110 border border-white/10"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        v-if="nextProject"
        @click.stop="goToNext"
        class="absolute right-4 lg:right-8 z-40 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-110 border border-white/10"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <TransitionGroup
        tag="div"
        class="relative w-full h-full flex items-center justify-center perspective-container"
        name="carousel"
      >
        <article
          v-for="project in visibleProjects"
          :key="project.id"
          class="absolute w-full max-w-4xl lg:max-w-5xl h-[85vh] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center will-change-transform rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col"
          :class="getCardStyle(project)"
          @click="handleCardClick(project)"
        >
          <div
            class="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 flex-shrink-0"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 flex-wrap">
                <h2
                  class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate"
                >
                  {{ project.title[locale] }}
                </h2>
                <span
                  class="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-mono rounded flex-shrink-0"
                >
                  {{ project.category[locale] }}
                </span>
              </div>
              <p class="text-slate-500 text-sm font-mono mt-1">
                {{ project.id }} • {{ project.year }}
              </p>
            </div>

            <div
              v-if="project === currentProject"
              class="flex items-center gap-2 flex-shrink-0"
            >
              <span class="text-xs font-mono text-slate-400 hidden sm:block">
                {{ currentIndex + 1 }} / {{ projects.length }}
              </span>
              <button
                @click.stop="$emit('close')"
                class="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"
              >
                <svg
                  class="w-6 h-6 text-slate-600 dark:text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div
            class="flex-1 overflow-y-auto"
            :class="{
              'overflow-hidden pointer-events-none': project !== currentProject,
            }"
          >
            <div class="p-2 bg-gray-50 dark:bg-slate-950/30">
              <div
                class="grid gap-1 w-full"
                :class="[
                  getGridClass(project.images.slice(0, 4).length),
                  project.images.slice(0, 4).length === 1
                    ? 'h-48 md:h-64'
                    : 'h-48 md:h-72',
                ]"
              >
                <div
                  v-for="(img, idx) in project.images.slice(0, 4)"
                  :key="idx"
                  class="relative group overflow-hidden cursor-pointer bg-slate-200 dark:bg-slate-800"
                  @click.stop="project === currentProject && openLightbox(idx)"
                >
                  <img
                    :src="img"
                    :alt="`${project.title[locale]} - Image ${idx + 1}`"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    v-if="project === currentProject"
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors"
                  ></div>
                </div>
              </div>
            </div>

            <div class="p-4 md:p-8 max-w-4xl mx-auto">
              <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-2 space-y-4">
                  <h3
                    class="text-lg font-bold border-b border-gray-100 dark:border-slate-800 pb-2 text-slate-900 dark:text-white"
                  >
                    {{ $t("projects.about") }}
                  </h3>
                  <p
                    class="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base"
                  >
                    {{ project.description[locale] }}
                  </p>

                  <template v-if="project.features?.[locale]?.length">
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mt-6"
                    >
                      {{ $t("projects.keyPoints") }}
                    </h4>
                    <ul
                      class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-sm"
                    >
                      <li v-for="feat in project.features[locale]" :key="feat">
                        {{ feat }}
                      </li>
                    </ul>
                  </template>
                </div>

                <div class="space-y-6">
                  <div v-if="project.links && project.links.length > 0">
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                    >
                      {{ $t("projects.links") }}
                    </h4>
                    <div class="flex flex-col gap-2">
                      <a
                        v-for="link in project.links.slice(0, 3)"
                        :key="link.url"
                        :href="link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                        @click.stop
                      >
                        <svg
                          class="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                        {{ link.label[locale] }}
                      </a>
                    </div>
                  </div>

                  <div v-if="project.stack?.[locale]?.length">
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                    >
                      {{ $t("projects.technologies") }}
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tech in project.stack[locale]"
                        :key="tech"
                        class="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                    >
                      {{ $t("projects.status") }}
                    </h4>
                    <span
                      class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-medium rounded-full"
                    >
                      <span class="w-2 h-2 rounded-full bg-green-500"></span>
                      {{ project.status[locale] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="project !== currentProject"
            class="absolute inset-0 bg-slate-900/10 dark:bg-slate-950/40 z-50 transition-opacity duration-500"
          ></div>
        </article>
      </TransitionGroup>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxIndex !== null && currentProject"
          class="fixed inset-0 z-[60] bg-black flex items-center justify-center"
        >
          <button
            @click="closeLightbox"
            class="absolute top-4 right-4 text-white p-2 z-20 hover:bg-white/10 rounded-full transition"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div class="w-full h-full flex items-center justify-center relative">
            <img
              :src="currentProject.images[lightboxIndex]"
              :alt="currentProject.title[locale]"
              class="max-h-screen max-w-full object-contain p-4 md:p-10"
            />
            <button
              v-if="currentProject.images.length > 1"
              @click.stop="prevLightboxImage"
              class="absolute left-4 text-white bg-black/50 p-2 rounded-full hover:bg-white/20 transition"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              v-if="currentProject.images.length > 1"
              @click.stop="nextLightboxImage"
              class="absolute right-4 text-white bg-black/50 p-2 rounded-full hover:bg-white/20 transition"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
            <div
              class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-mono"
            >
              {{ lightboxIndex + 1 }} / {{ currentProject.images.length }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n"; // Assurez-vous d'importer useI18n correctement selon votre setup

// ... Vos interfaces (LocalizedString, Project, etc.) restent identiques ...
interface LocalizedString {
  fr: string;
  en: string;
  [key: string]: string;
}
interface LocalizedStringArray {
  fr: string[];
  en: string[];
  [key: string]: string[];
}
interface ProjectLink {
  label: LocalizedString;
  url: string;
}
interface Project {
  id: string;
  hidden: boolean;
  title: LocalizedString;
  shortDesc: LocalizedString;
  description: LocalizedString;
  images: string[];
  stack: LocalizedStringArray;
  status: LocalizedString;
  category: LocalizedString;
  year: string;
  links: ProjectLink[];
  features?: LocalizedStringArray;
}

const { t } = useI18n();

const props = defineProps<{
  projects: Project[];
  initialIndex: number;
  locale: string;
}>();

const emit = defineEmits<{
  close: [];
  "update:index": [index: number];
}>();

const currentIndex = ref(props.initialIndex);
const lightboxIndex = ref<number | null>(null);

// Current project shortcut
const currentProject = computed(() => props.projects[currentIndex.value]);

// Previous/Next helper logic
const prevProject = computed(() =>
  currentIndex.value > 0 ? props.projects[currentIndex.value - 1] : null,
);
const nextProject = computed(() =>
  currentIndex.value < props.projects.length - 1
    ? props.projects[currentIndex.value + 1]
    : null,
);

/**
 * Calcul des projets à afficher dans le DOM.
 * On affiche toujours [Index - 1, Index, Index + 1].
 * Vue TransitionGroup se chargera d'animer l'entrée/sortie et le déplacement.
 */
const visibleProjects = computed((): Project[] => {
  const visible: Project[] = [];
  // On inclut le projet précédent s'il existe
  if (currentIndex.value > 0) {
    visible.push(props.projects[currentIndex.value - 1]!);
  }
  // Le projet actuel
  visible.push(props.projects[currentIndex.value]!);
  // Le projet suivant s'il existe
  if (currentIndex.value < props.projects.length - 1) {
    visible.push(props.projects[currentIndex.value + 1]!);
  }
  return visible;
});

/**
 * Détermine les classes CSS pour positionner la carte (Left, Center, Right)
 */
const getCardStyle = (project: Project) => {
  const diff = props.projects.indexOf(project) - currentIndex.value;

  // Projet Actif (Centre)
  if (diff === 0) {
    return "z-30 opacity-100 scale-100 translate-x-0 shadow-2xl cursor-default";
  }

  // Projet Précédent (Gauche)
  if (diff < 0) {
    return "z-10 opacity-50 scale-[0.85] -translate-x-[60%] lg:-translate-x-[55%] cursor-pointer hover:opacity-70 hover:scale-[0.87] grayscale-[30%]";
  }

  // Projet Suivant (Droite)
  if (diff > 0) {
    return "z-10 opacity-50 scale-[0.85] translate-x-[60%] lg:translate-x-[55%] cursor-pointer hover:opacity-70 hover:scale-[0.87] grayscale-[30%]";
  }

  return ""; // Fallback
};

const getGridClass = (count: number): string => {
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-2 md:grid-cols-3"; // Ajustement grille
  return "grid-cols-2";
};

// Actions
const goToPrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    emit("update:index", currentIndex.value);
  }
};

const goToNext = () => {
  if (currentIndex.value < props.projects.length - 1) {
    currentIndex.value++;
    emit("update:index", currentIndex.value);
  }
};

const handleCardClick = (project: Project) => {
  const diff = props.projects.indexOf(project) - currentIndex.value;
  if (diff < 0) goToPrev();
  if (diff > 0) goToNext();
  // Si diff === 0, on ne fait rien (ou on pourrait ouvrir la lightbox sur la première image)
};

// Lightbox logic (inchangé)
const openLightbox = (index: number) => {
  lightboxIndex.value = index;
};
const closeLightbox = () => {
  lightboxIndex.value = null;
};
const nextLightboxImage = () => {
  if (lightboxIndex.value !== null && currentProject.value)
    lightboxIndex.value =
      (lightboxIndex.value + 1) % currentProject.value.images.length;
};
const prevLightboxImage = () => {
  if (lightboxIndex.value !== null && currentProject.value)
    lightboxIndex.value =
      (lightboxIndex.value - 1 + currentProject.value.images.length) %
      currentProject.value.images.length;
};

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (lightboxIndex.value !== null) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") nextLightboxImage();
    if (event.key === "ArrowLeft") prevLightboxImage();
    return;
  }

  if (event.key === "ArrowRight") goToNext();
  if (event.key === "ArrowLeft") goToPrev();
  if (event.key === "Escape") emit("close");
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<style scoped>
/* Backdrop Fade */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.4s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Lightbox Fade */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* CAROUSEL ANIMATION LOGIC 
  L'astuce réside ici : Vue TransitionGroup gère les éléments qui entrent/sortent.
  Les éléments existants qui changent de place sont gérés par la classe CSS `transition-all` sur l'article.
*/

/* Quand un nouvel élément (ex: le nouveau "Suivant" qui arrive de droite) entre */
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

/* État de départ pour un élément qui entre (Il arrive de loin sur les côtés) */
/* Note: On doit savoir si on va à gauche ou droite, mais une astuce simple est de le faire partir "plus loin" que sa position finale */
.carousel-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px); /* Un léger effet pop-up */
}

/* État de fin pour un élément qui quitte (Il disparaît) */
.carousel-leave-to {
  opacity: 0;
  transform: scale(0.8);
  /* L'élément qui part est en absolute, donc il restera à sa place "logique" (gauche ou droite) pendant qu'il disparait */
}

/* Perspective pour donner de la profondeur si souhaité (optionnel) */
.perspective-container {
  perspective: 1000px;
}
</style>
