<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <Transition name="backdrop">
      <div
        @click="$emit('close')"
        class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
      ></div>
    </Transition>

    <!-- Modal Content -->
    <Transition name="modal" appear>
      <div
        class="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-slate-700"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 flex-shrink-0"
        >
          <div>
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                {{ project.title }}
              </h2>
              <span
                class="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-mono rounded"
                >{{ project.category }}</span
              >
            </div>
            <p class="text-slate-500 text-sm font-mono mt-1">
              {{ project.id }} • {{ project.year }}
            </p>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition flex-shrink-0"
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

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Image Gallery Grid -->
          <div class="p-2 bg-gray-50 dark:bg-slate-950/30">
            <div
              class="grid gap-1 w-full"
              :class="[
                getGridClass(displayImages.length),
                displayImages.length === 1 ? 'h-64 md:h-80' : 'h-64 md:h-96',
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
                  :alt="`${project.title} - Image ${idx + 1}`"
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
          <div class="p-6 md:p-10 max-w-4xl mx-auto">
            <div class="grid md:grid-cols-3 gap-10">
              <!-- Main Text -->
              <div class="md:col-span-2 space-y-6">
                <h3
                  class="text-xl font-bold border-b border-gray-100 dark:border-slate-800 pb-2 text-slate-900 dark:text-white"
                >
                  À propos
                </h3>
                <p
                  class="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line"
                >
                  {{ project.description }}
                </p>

                <template
                  v-if="project.features && project.features.length > 0"
                >
                  <h4
                    class="font-bold text-sm uppercase tracking-wide text-slate-400 mt-8"
                  >
                    Points clés
                  </h4>
                  <ul
                    class="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300"
                  >
                    <li v-for="feat in project.features" :key="feat">
                      {{ feat }}
                    </li>
                  </ul>
                </template>
              </div>

              <!-- Sidebar Details -->
              <div class="space-y-8">
                <!-- Links -->
                <div v-if="displayLinks.length > 0">
                  <h4
                    class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                  >
                    Liens
                  </h4>
                  <div class="flex flex-col gap-3">
                    <a
                      v-for="link in displayLinks"
                      :key="link.url"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium group transition-colors"
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
                <div v-if="project.stack && project.stack.length > 0">
                  <h4
                    class="font-bold text-sm uppercase tracking-wide text-slate-400 mb-3"
                  >
                    Technologies
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in project.stack"
                      :key="tech"
                      class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-md border border-slate-200 dark:border-slate-700"
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
                    {{ project.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="modal">
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
            :src="project.images[lightboxIndex]"
            :alt="`${project.title} - Image ${lightboxIndex + 1}`"
            class="max-h-screen max-w-full object-contain p-4 md:p-10"
          />

          <!-- Navigation -->
          <button
            v-if="project.images.length > 1"
            @click.stop="prevImage"
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
            v-if="project.images.length > 1"
            @click.stop="nextImage"
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
            {{ lightboxIndex + 1 }} / {{ project.images.length }}
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
  project: Project;
}>();

const emit = defineEmits<{
  close: [];
}>();

const lightboxIndex = ref<number | null>(null);

// Limit to 4 images in the grid
const displayImages = computed(() => {
  return props.project.images.slice(0, 4);
});

// Limit to 3 links
const displayLinks = computed(() => {
  return props.project.links.slice(0, 3);
});

const getGridClass = (count: number): string => {
  if (count === 1) return "grid-gallery-1";
  if (count === 2) return "grid-gallery-2";
  if (count === 3) return "grid-gallery-3";
  return "grid-gallery-4";
};

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
};

const closeLightbox = () => {
  lightboxIndex.value = null;
};

const nextImage = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % props.project.images.length;
};

const prevImage = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + props.project.images.length) %
    props.project.images.length;
};

const handleKeydown = (event: KeyboardEvent) => {
  // Si le lightbox est ouvert, on gère les touches pour le lightbox
  if (lightboxIndex.value !== null) {
    if (event.key === "Escape") {
      event.stopPropagation();
      event.preventDefault();
      closeLightbox();
      return;
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nextImage();
      return;
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevImage();
      return;
    }
  }

  // Si le lightbox n'est pas ouvert, on gère Échap pour fermer la modal
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

/* Modal content animation */
.modal-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-leave-active {
  transition: all 0.2s ease-in;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
