<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <Transition name="backdrop">
      <div
        @click="$emit('close')"
        class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
      ></div>
    </Transition>

    <!-- Carousel Container -->
    <div class="relative w-full h-full flex items-center justify-center px-4 py-6 overflow-hidden">
      <!-- Previous Project Preview (left side) -->
      <div
        v-if="prevProject"
        @click="goToPrev"
        class="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[15%] h-[70%] cursor-pointer z-10 transition-all duration-300 hover:w-[17%] group"
      >
        <div class="w-full h-full bg-white/50 dark:bg-slate-800/50 rounded-l-2xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          <div class="w-full h-full flex flex-col opacity-60 group-hover:opacity-80 transition-opacity">
            <div class="h-1/2 overflow-hidden">
              <img
                :src="prevProject.images[0]"
                :alt="prevProject.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 flex-1">
              <h3 class="font-bold text-sm text-slate-700 dark:text-slate-300 truncate">
                {{ prevProject.title }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {{ prevProject.shortDesc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Project Preview (right side) -->
      <div
        v-if="nextProject"
        @click="goToNext"
        class="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[15%] h-[70%] cursor-pointer z-10 transition-all duration-300 hover:w-[17%] group"
      >
        <div class="w-full h-full bg-white/50 dark:bg-slate-800/50 rounded-r-2xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          <div class="w-full h-full flex flex-col opacity-60 group-hover:opacity-80 transition-opacity">
            <div class="h-1/2 overflow-hidden">
              <img
                :src="nextProject.images[0]"
                :alt="nextProject.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 flex-1">
              <h3 class="font-bold text-sm text-slate-700 dark:text-slate-300 truncate">
                {{ nextProject.title }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {{ nextProject.shortDesc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        v-if="prevProject"
        @click="goToPrev"
        class="absolute left-4 lg:left-[16%] top-1/2 -translate-y-1/2 z-20 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all hover:scale-110"
      >
        <svg class="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        v-if="nextProject"
        @click="goToNext"
        class="absolute right-4 lg:right-[16%] top-1/2 -translate-y-1/2 z-20 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all hover:scale-110"
      >
        <svg class="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Main Modal Content with Slide Animation -->
      <Transition :name="slideDirection" mode="out-in">
        <div
          :key="currentProject.id"
          class="relative bg-white dark:bg-slate-900 w-full max-w-4xl lg:max-w-5xl max-h-[90vh] lg:max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-slate-700 mx-auto lg:mx-[17%]"
        >
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 flex-shrink-0"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 flex-wrap">
                <h2 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate">
                  {{ currentProject.title }}
                </h2>
                <span
                  class="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-mono rounded flex-shrink-0"
                >{{ currentProject.category }}</span>
              </div>
              <p class="text-slate-500 text-sm font-mono mt-1">
                {{ currentProject.id }} • {{ currentProject.year }}
              </p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <!-- Project counter -->
              <span class="text-xs font-mono text-slate-400 hidden sm:block">
                {{ currentIndex + 1 }} / {{ projects.length }}
              </span>
              <button
                @click="$emit('close')"
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

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto">
            <!-- Image Gallery Grid -->
            <div class="p-2 bg-gray-50 dark:bg-slate-950/30">
              <div
                class="grid gap-1 w-full"
                :class="[
                  getGridClass(displayImages.length),
                  displayImages.length === 1 ? 'h-48 md:h-64' : 'h-48 md:h-72',
                ]"
              >
                <div
                  v-for="(img, idx) in displayImages"
                  :key="idx"
                  class="relative group overflow-hidden cursor-pointer bg-slate-200 dark:bg-slate-800"
                  @click="openLightbox(idx)"
                >
                  <img
                    :src="img"
                    :alt="`${currentProject.title} - Image ${idx + 1}`"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Details Body -->
            <div class="p-4 md:p-8 max-w-4xl mx-auto">
              <div class="grid md:grid-cols-3 gap-8">
                <!-- Main Text -->
                <div class="md:col-span-2 space-y-4">
                  <h3
                    class="text-lg font-bold border-b border-gray-100 dark:border-slate-800 pb-2 text-slate-900 dark:text-white"
                  >
                    À propos
                  </h3>
                  <p
                    class="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base"
                  >
                    {{ currentProject.description }}
                  </p>

                  <template
                    v-if="currentProject.features && currentProject.features.length > 0"
                  >
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mt-6"
                    >
                      Points clés
                    </h4>
                    <ul
                      class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-sm"
                    >
                      <li v-for="feat in currentProject.features" :key="feat">
                        {{ feat }}
                      </li>
                    </ul>
                  </template>
                </div>

                <!-- Sidebar Details -->
                <div class="space-y-6">
                  <!-- Links -->
                  <div v-if="displayLinks.length > 0">
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                    >
                      Liens
                    </h4>
                    <div class="flex flex-col gap-2">
                      <a
                        v-for="link in displayLinks"
                        :key="link.url"
                        :href="link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm transition-colors"
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
                        {{ link.label }}
                      </a>
                    </div>
                  </div>

                  <!-- Tech Stack -->
                  <div v-if="currentProject.stack && currentProject.stack.length > 0">
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                    >
                      Technologies
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tech in currentProject.stack"
                        :key="tech"
                        class="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <!-- Status -->
                  <div>
                    <h4
                      class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                    >
                      Statut
                    </h4>
                    <span
                      class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-medium rounded-full"
                    >
                      <span class="w-2 h-2 rounded-full bg-green-500"></span>
                      {{ currentProject.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="lightboxIndex !== null"
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
            :alt="`${currentProject.title} - Image ${lightboxIndex + 1}`"
            class="max-h-screen max-w-full object-contain p-4 md:p-10"
          />

          <!-- Navigation -->
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

          <!-- Image counter -->
          <div
            class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-mono"
          >
            {{ lightboxIndex + 1 }} / {{ currentProject.images.length }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  hidden: boolean;
  title: string;
  shortDesc: string;
  description: string;
  images: string[];
  stack: string[];
  status: string;
  category: string;
  year: string;
  links: ProjectLink[];
  features?: string[];
}

const props = defineProps<{
  projects: Project[];
  initialIndex: number;
}>();

const emit = defineEmits<{
  close: [];
  "update:index": [index: number];
}>();

const currentIndex = ref(props.initialIndex);
const lightboxIndex = ref<number | null>(null);
const slideDirection = ref<"slide-left" | "slide-right">("slide-left");

// Current project
const currentProject = computed(() => props.projects[currentIndex.value]);

// Previous project
const prevProject = computed(() => {
  if (currentIndex.value <= 0) return null;
  return props.projects[currentIndex.value - 1];
});

// Next project
const nextProject = computed(() => {
  if (currentIndex.value >= props.projects.length - 1) return null;
  return props.projects[currentIndex.value + 1];
});

// Limit to 4 images in the grid
const displayImages = computed(() => {
  return currentProject.value.images.slice(0, 4);
});

// Limit to 3 links
const displayLinks = computed(() => {
  return currentProject.value.links.slice(0, 3);
});

const getGridClass = (count: number): string => {
  if (count === 1) return "grid-gallery-1";
  if (count === 2) return "grid-gallery-2";
  if (count === 3) return "grid-gallery-3";
  return "grid-gallery-4";
};

// Navigation between projects
const goToNext = () => {
  if (!nextProject.value) return;
  slideDirection.value = "slide-left";
  currentIndex.value++;
  emit("update:index", currentIndex.value);
};

const goToPrev = () => {
  if (!prevProject.value) return;
  slideDirection.value = "slide-right";
  currentIndex.value--;
  emit("update:index", currentIndex.value);
};

// Lightbox functions
const openLightbox = (index: number) => {
  lightboxIndex.value = index;
};

const closeLightbox = () => {
  lightboxIndex.value = null;
};

const nextLightboxImage = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % currentProject.value.images.length;
};

const prevLightboxImage = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + currentProject.value.images.length) %
    currentProject.value.images.length;
};

const handleKeydown = (event: KeyboardEvent) => {
  // Si le lightbox est ouvert
  if (lightboxIndex.value !== null) {
    if (event.key === "Escape") {
      event.stopPropagation();
      event.preventDefault();
      closeLightbox();
      return;
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nextLightboxImage();
      return;
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevLightboxImage();
      return;
    }
  } else {
    // Navigation entre projets
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
      return;
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrev();
      return;
    }
  }

  if (event.key === "Escape") {
    emit("close");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown, true);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown, true);
});
</script>

<style scoped>
/* Backdrop animation */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Slide animations */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Lightbox animation */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
