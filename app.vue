<template>
  <!-- Main Content (always rendered, visible behind loading screen) -->
  <div
    class="min-h-screen flex flex-col bg-gray-50 text-slate-800 dark:bg-dark-bg dark:text-slate-100 transition-colors duration-300 font-sans"
  >
    <!-- Navigation -->
    <nav
      class="fixed top-0 w-full z-40 border-b border-gray-200 dark:border-dark-border admin-glass transition-colors"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span class="font-mono font-bold text-lg tracking-tight"
              >v.beauget.fr</span
            >
          </div>

          <div class="hidden md:flex items-center space-x-8 font-mono text-sm">
            <a
              href="#home"
              class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >{{ $t("nav.home") }}</a
            >
            <a
              href="#projects"
              class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >{{ $t("nav.projects") }}</a
            >
            <a
              href="#skills"
              class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >{{ $t("nav.skills") }}</a
            >
            <a
              href="#contact"
              class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >{{ $t("nav.contact") }}</a
            >
          </div>

          <div class="flex items-center gap-2">
            <!-- Language Toggle -->
            <button
              @click="toggleLocale"
              class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle language"
            >
              <span class="text-base leading-none">{{
                locale === "fr" ? "🇬🇧" : "🇫🇷"
              }}</span>
            </button>
            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section
      id="home"
      class="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden"
    >
      <!-- Background Decoration -->
      <div
        class="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none"
      >
        <div
          class="absolute top-20 left-10 w-64 h-64 bg-primary-500 rounded-full filter blur-[100px]"
        ></div>
        <div
          class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-[120px]"
        ></div>
        <!-- Grid lines -->
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(#64748b 1px, transparent 1px);
            background-size: 40px 40px;
          "
        ></div>
      </div>

      <div
        class="relative z-10 max-w-7xl mx-auto px-4 xs:px-6 md:px-8 lg:px-10 text-center md:text-left w-full"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div class="flex-1 space-y-2 sm:space-y-4 md:space-y-6">
            <!--             <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-mono border border-primary-200 dark:border-primary-700/50"
            >
              <span class="w-2 h-2 rounded-full bg-primary-500"></span>
              Disponible pour missions
            </div> -->
            <h1
              class="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
            >
              {{ $t("hero.title") }}<span class="text-primary-600">.</span>
            </h1>
            <h2
              class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light"
            >
              {{ $t("hero.subtitle") }}
            </h2>
            <p
              class="max-w-lg text-lg text-slate-600 dark:text-slate-300 leading-relaxed indent-6 xs:indent-8 md:indent-10 whitespace-pre-line"
            >
              {{ $t("hero.description") }}
            </p>
            <div
              class="flex flex-wrap gap-2 md:gap-4 pt-2 md:pt-4 mx-2 justify-center md:justify-start"
            >
              <a
                href="#projects"
                class="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-slate-200 transition shadow-lg shadow-primary-500/20"
              >
                {{ $t("hero.cta.projects") }}
              </a>
              <a
                href="#contact"
                class="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                {{ $t("hero.cta.contact") }}
              </a>
            </div>
          </div>

          <!-- Abstract Visualization -->
          <div class="flex-1 w-full max-w-md hidden md:block">
            <div class="relative aspect-square">
              <div
                class="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 p-6 flex flex-col gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500"
              >
                <!-- Terminal Header -->
                <div
                  class="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-4"
                >
                  <div class="flex gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                    ></span>
                    <span class="font-mono text-xs text-slate-400">live</span>
                  </div>
                </div>
                <!-- Terminal Content - Real Network Requests -->
                <div
                  class="flex-1 flex flex-col-reverse bg-gray-50 dark:bg-slate-900 rounded-xl p-3 font-mono text-[10px] leading-relaxed overflow-hidden"
                >
                  <div class="space-y-1">
                    <div
                      v-for="(log, index) in terminalLogs"
                      :key="index"
                      class="flex gap-2 whitespace-nowrap"
                    >
                      <span class="text-slate-400">{{ log.time }}</span>
                      <span
                        :class="{
                          'text-green-500': log.method === 'GET',
                          'text-blue-500': log.method === 'POST',
                          'text-yellow-500': log.method === 'PUT',
                        }"
                        >{{ log.method }}</span
                      >
                      <span
                        class="text-slate-600 dark:text-slate-300 truncate"
                        >{{ log.path }}</span
                      >
                      <span
                        :class="{
                          'text-green-500': log.status < 300,
                          'text-yellow-500':
                            log.status >= 300 && log.status < 400,
                          'text-red-500': log.status >= 400,
                        }"
                        >{{ log.status }}</span
                      >
                      <span class="text-slate-400">{{ log.duration }}ms</span>
                    </div>
                  </div>
                </div>
                <div
                  class="h-10 bg-gray-50 dark:bg-slate-900 rounded-lg flex items-center px-4 font-mono text-xs text-green-500"
                >
                  <span class="animate-pulse">●</span>
                  <span class="ml-2 text-slate-400"
                    >{{ $t("terminal.serverActive") }} {{ currentHost }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section
      id="projects"
      class="py-24 bg-white dark:bg-dark-bg transition-colors"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-3xl font-bold mb-4">
            {{ $t("projects.dashboard") }}
          </h2>
          <p class="text-slate-500 dark:text-slate-400 max-w-3xl">
            {{ $t("projects.dashboardDesc") }}
          </p>
        </div>

        <!-- Admin Panel Container -->
        <div
          class="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[600px]"
        >
          <!-- Sidebar -->
          <div
            class="w-full md:w-64 bg-white dark:bg-slate-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 flex flex-col"
          >
            <div class="p-4 border-b border-gray-200 dark:border-slate-700">
              <span
                class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider"
                >{{ $t("projects.workspace") }}</span
              >
              <div class="mt-2 flex items-center gap-2 font-medium">
                <div
                  class="w-5 h-5 rounded bg-primary-600 flex items-center justify-center text-white text-xs"
                >
                  V
                </div>
                {{ $t("projects.portfolio") }}
              </div>
            </div>
            <div
              class="p-4 space-y-1 overflow-x-auto md:overflow-visible flex md:block gap-4 md:gap-0"
            >
              <div
                class="flex items-center gap-3 px-3 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium cursor-pointer whitespace-nowrap"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
                {{ $t("projects.all") }}
              </div>
              <!--               <div
                class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-md text-sm cursor-not-allowed opacity-60 whitespace-nowrap"
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Récents
              </div>
              <div
                class="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-md text-sm cursor-not-allowed opacity-60 whitespace-nowrap"
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
                Archivés
              </div> -->
            </div>
          </div>

          <!-- Main Content Area -->
          <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top Bar -->
            <div
              class="h-14 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between px-6"
            >
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <span>Valentin</span>
                <span class="text-gray-300">/</span>
                <span class="text-slate-900 dark:text-slate-100 font-medium">{{
                  $t("nav.projects").replace("./", "")
                }}</span>
              </div>
              <div class="flex gap-2 items-center">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <span class="text-xs font-mono text-slate-500">{{
                  $t("projects.systemOnline")
                }}</span>
              </div>
            </div>

            <!-- Scrollable Grid -->
            <div
              class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900/50"
            >
              <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Project Card -->
                <article
                  v-for="project in visibleProjects"
                  :key="project.id"
                  @click="openProject(project)"
                  class="group bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-xl hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 flex flex-col"
                >
                  <!-- Header Image -->
                  <div class="relative h-48 overflow-hidden bg-slate-200">
                    <img
                      :src="project.images[0]"
                      :alt="project.title[locale]"
                      width="800"
                      height="400"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      :fetchpriority="visibleProjects.indexOf(project) === 0 ? 'high' : 'auto'"
                    />
                    <div
                      class="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded"
                    >
                      {{ project.id }}
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-4 flex flex-col flex-1">
                    <div class="flex justify-between items-start mb-2">
                      <h3
                        class="font-bold text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                      >
                        {{ project.title[locale] }}
                      </h3>
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      >
                        {{ project.status[locale] }}
                      </span>
                    </div>
                    <p
                      class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1"
                    >
                      {{ project.shortDesc[locale] }}
                    </p>
                    <div
                      class="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-slate-700"
                    >
                      <span
                        v-for="tech in project.stack[locale].slice(0, 3)"
                        :key="tech"
                        class="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded"
                      >
                        {{ tech }}
                      </span>
                      <span
                        v-if="project.stack[locale].length > 3"
                        class="text-[10px] text-slate-400"
                        >+{{ project.stack[locale].length - 3 }}</span
                      >
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <Transition name="modal">
      <LazyProjectModal
        v-if="isModalOpen"
        :projects="visibleProjects"
        :initial-index="selectedProjectIndex"
        :locale="locale"
        @close="closeProject"
        @update:index="updateProjectIndex"
      />
    </Transition>

    <!-- Skills Section -->
    <section
      id="skills"
      class="relative overflow-hidden min-h-[600px] xs:min-h-[700px] md:min-h-[500px] 2xl:min-h-[400px]"
    >
      <!-- Titre positionné au-dessus -->
      <div class="absolute top-8 left-0 right-0 z-20 pointer-events-none">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center md:text-left">
            {{ $t("skills.title") }}
          </h2>
        </div>
      </div>

      <!-- Canvas qui prend tout l'espace -->
      <div class="absolute inset-0 z-10">
        <LazySkillsFloating />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 bg-white dark:bg-dark-bg">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-2">{{ $t("contact.title") }}</h2>
        <p class="text-slate-500 dark:text-slate-400 max-w-3xl mb-8">
          {{ $t("contact.subtitle") }}
        </p>

        <form
          @submit.prevent="handleSubmit"
          class="text-left bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >{{ $t("contact.form.lastName") }}</label
              >
              <input
                v-model="formData.lastName"
                :placeholder="$t('contact.form.lastNamePlaceholder')"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >{{ $t("contact.form.firstName") }}</label
              >
              <input
                v-model="formData.firstName"
                :placeholder="$t('contact.form.firstNamePlaceholder')"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >{{ $t("contact.form.email") }}</label
            >
            <input
              v-model="formData.email"
              :placeholder="$t('contact.form.emailPlaceholder')"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition text-slate-900 dark:text-slate-100"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >{{ $t("contact.form.message") }}</label
            >
            <textarea
              v-model="formData.message"
              :placeholder="$t('contact.form.messagePlaceholder')"
              rows="4"
              required
              class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition resize-none text-slate-900 dark:text-slate-100"
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-4 bg-slate-900 dark:bg-primary-600 text-white font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-primary-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{
              isSubmitting
                ? $t("contact.form.sending")
                : $t("contact.form.submit")
            }}
          </button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="py-8 text-center border-t border-gray-100 dark:border-slate-800 text-slate-400 text-sm font-mono"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p>&copy; {{ new Date().getFullYear() }} | Valentin BEAUGET</p>
          <div class="flex items-center gap-4">
            <a
              href="https://github.com/valentinbgt"
              target="_blank"
              class="hover:text-primary-500 transition-colors"
              >GitHub</a
            >
            <a
              href="https://linkedin.com/in/valentin-beauget"
              target="_blank"
              class="hover:text-primary-500 transition-colors"
              >LinkedIn</a
            >
            <a
              href="https://github.com/valentinbgt/v.beauget.fr/"
              target="_blank"
              class="hover:text-primary-500 transition-colors"
              >{{ $t("footer.source") }}</a
            >
          </div>
        </div>
      </div>
    </footer>

    <!-- Notification -->
    <Transition name="fade">
      <div
        v-if="notification.show"
        :class="[
          'fixed top-24 right-8 z-50 p-4 rounded-lg shadow-lg font-medium',
          'backdrop-blur-md transition-all duration-300',
          notification.type === 'success'
            ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
            : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800',
        ]"
      >
        {{ notification.message }}
      </div>
    </Transition>
  </div>

  <!-- Loading Screen (overlay on top) -->
  <LoadingScreen v-if="isPageLoading" @complete="handleLoadingComplete" />
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import projectsData from "~/assets/data/projects.json";

// Loading Screen
const isPageLoading = ref(true);

const handleLoadingComplete = () => {
  isPageLoading.value = false;
};

// i18n
const { locale, setLocale, t } = useI18n();

const toggleLocale = () => {
  setLocale(locale.value === "fr" ? "en" : "fr");
};

// Theme
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// Initialize theme and terminal
onMounted(() => {
  // Theme is already initialized by inline script in head
  // Just sync the reactive state
  const theme = localStorage.getItem("theme");
  // Dark mode by default, unless explicitly set to 'light'
  const shouldBeDark = theme !== "light";
  
  isDark.value = shouldBeDark;
  
  // Ensure classes are applied (should already be done by inline script)
  if (shouldBeDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
  }

  // Start capturing real network requests
  startNetworkCapture();

  // Set current host
  currentHost.value = window.location.host;
});

onUnmounted(() => {
  stopNetworkCapture();
});

// Projects
const projects = ref(projectsData);
const selectedProjectIndex = ref(null);

const visibleProjects = computed(() => {
  return projects.value.filter((project) => !project.hidden);
});

const isModalOpen = computed(() => selectedProjectIndex.value !== null);

const openProject = (project) => {
  const index = visibleProjects.value.findIndex((p) => p.id === project.id);
  selectedProjectIndex.value = index >= 0 ? index : 0;
  document.body.style.overflow = "hidden";
};

const closeProject = () => {
  selectedProjectIndex.value = null;
  document.body.style.overflow = "auto";
};

const updateProjectIndex = (index) => {
  selectedProjectIndex.value = index;
};

// Real Terminal Logs - Captures actual network requests
const terminalLogs = ref([]);
const currentHost = ref("v.beauget.fr:443");
let performanceObserver = null;
let originalFetch = null;

const formatTime = (date) => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
};

const getPathFromUrl = (url) => {
  try {
    const urlObj = new URL(url, window.location.origin);
    // Only show path for same-origin, full URL for external
    if (urlObj.origin === window.location.origin) {
      return urlObj.pathname + urlObj.search;
    }
    return urlObj.hostname + urlObj.pathname;
  } catch {
    return url;
  }
};

const addLog = (log) => {
  terminalLogs.value.push(log);
  // Keep only last 18 logs
  if (terminalLogs.value.length > 18) {
    terminalLogs.value.shift();
  }
};

const generateInitialLogs = () => {
  const now = new Date();
  const fakeLogs = [
    { method: "GET", path: "/", status: 200, duration: 12 },
    { method: "GET", path: "/_nuxt/entry.js", status: 200, duration: 45 },
    { method: "GET", path: "/_nuxt/entry.css", status: 200, duration: 23 },
    { method: "GET", path: "/api/projects", status: 200, duration: 89 },
    { method: "GET", path: "/fonts/Inter.woff2", status: 200, duration: 156 },
    { method: "GET", path: "/favicon.ico", status: 200, duration: 8 },
    { method: "GET", path: "/_nuxt/chunks/vue.js", status: 200, duration: 67 },
    { method: "GET", path: "/images/hero.webp", status: 200, duration: 234 },
    {
      method: "GET",
      path: "/_nuxt/builds/meta.json",
      status: 200,
      duration: 15,
    },
    { method: "GET", path: "/api/skills", status: 200, duration: 42 },
    { method: "POST", path: "/api/analytics", status: 201, duration: 78 },
    { method: "GET", path: "/robots.txt", status: 200, duration: 5 },
    { method: "GET", path: "/_nuxt/components.js", status: 200, duration: 38 },
    {
      method: "GET",
      path: "/images/projects/bde.png",
      status: 200,
      duration: 189,
    },
    { method: "GET", path: "/_nuxt/composables.js", status: 200, duration: 29 },
    { method: "GET", path: "/api/contact", status: 200, duration: 56 },
    { method: "GET", path: "/fonts/Mono.woff2", status: 200, duration: 112 },
    { method: "GET", path: "/_nuxt/utils.js", status: 200, duration: 21 },
  ];

  fakeLogs.forEach((log, i) => {
    const time = new Date(now.getTime() - (fakeLogs.length - i) * 500);
    terminalLogs.value.push({
      time: formatTime(time),
      ...log,
    });
  });
};

const startNetworkCapture = () => {
  // Add initial fake logs so terminal isn't empty
  generateInitialLogs();

  // 1. Capture resource timing (images, scripts, CSS, etc.)
  performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "resource") {
        const path = getPathFromUrl(entry.name);
        // Skip very long data URIs or blob URLs
        if (path.startsWith("data:") || path.startsWith("blob:")) continue;

        addLog({
          time: formatTime(new Date()),
          method: "GET",
          path: path.length > 35 ? path.substring(0, 32) + "..." : path,
          status: 200, // Resource timing doesn't give status, assume 200 if loaded
          duration: Math.round(entry.duration),
        });
      }
    }
  });

  performanceObserver.observe({ entryTypes: ["resource"] });

  // 2. Intercept fetch for API calls with actual status codes
  originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const startTime = performance.now();
    const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
    const method = args[1]?.method || "GET";

    try {
      const response = await originalFetch(...args);
      const duration = Math.round(performance.now() - startTime);
      const path = getPathFromUrl(url);

      addLog({
        time: formatTime(new Date()),
        method: method.toUpperCase(),
        path: path.length > 35 ? path.substring(0, 32) + "..." : path,
        status: response.status,
        duration,
      });

      return response;
    } catch (error) {
      const duration = Math.round(performance.now() - startTime);
      const path = getPathFromUrl(url);

      addLog({
        time: formatTime(new Date()),
        method: method.toUpperCase(),
        path: path.length > 35 ? path.substring(0, 32) + "..." : path,
        status: 0,
        duration,
      });

      throw error;
    }
  };
};

const stopNetworkCapture = () => {
  if (performanceObserver) {
    performanceObserver.disconnect();
  }
  if (originalFetch) {
    window.fetch = originalFetch;
  }
};

// Skills
const skills = {
  frontend: [
    { name: "Vue.js / Nuxt", version: "v3", level: 90, color: "bg-green-500" },
    { name: "TypeScript", version: "v5", level: 85, color: "bg-blue-500" },
    { name: "Tailwind CSS", version: "v3", level: 95, color: "bg-cyan-500" },
    { name: "React", version: "v18", level: 70, color: "bg-blue-400" },
  ],
  backend: [
    { name: "Node.js", color: "bg-green-500" },
    { name: "Express", color: "bg-gray-500" },
    { name: "PostgreSQL", color: "bg-blue-600" },
    { name: "Docker", color: "bg-blue-500" },
    { name: "Linux", color: "bg-orange-500" },
    { name: "Git", color: "bg-red-500" },
  ],
};

// Contact Form
const config = useRuntimeConfig();
const isSubmitting = ref(false);
const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});
const notification = ref({
  show: false,
  message: "",
  type: "success",
});

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    const response = await fetch(config.public.formUrl, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    formData.firstName = "";
    formData.lastName = "";
    formData.email = "";
    formData.message = "";

    notification.value = {
      show: true,
      message: t("contact.success"),
      type: "success",
    };
  } catch (error) {
    console.error("Error saving message:", error);
    notification.value = {
      show: true,
      message: t("contact.error"),
      type: "error",
    };
  } finally {
    isSubmitting.value = false;
    setTimeout(() => {
      notification.value.show = false;
    }, 5000);
  }
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>
