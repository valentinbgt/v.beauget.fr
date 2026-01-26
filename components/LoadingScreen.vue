<template>
  <Transition name="loader-fade">
    <div
      class="fixed inset-0 z-50 bg-gray-50 dark:bg-dark-bg text-slate-800 dark:text-slate-100 flex items-center justify-center overflow-hidden transition-colors duration-300"
    >
      <!-- Background Decoration -->
      <div class="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        <div
          class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500 rounded-full filter blur-[120px]"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px]"
        ></div>
      </div>

      <!-- Main Loader Container -->
      <div class="relative z-10 w-full max-w-lg px-6">
        <!-- Top Identity -->
        <div class="flex flex-col items-center mb-12">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            ></div>
            <h1 class="font-mono font-bold text-2xl tracking-tighter">
              v.beauget.fr
            </h1>
          </div>
          <p
            class="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-[0.2em]"
          >
            System Initialization
          </p>
        </div>

        <!-- Terminal Box -->
        <div
          class="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-2xl mb-8 font-mono text-sm overflow-hidden min-h-[160px]"
        >
          <div id="terminal-content" class="space-y-1.5">
            <div
              v-for="(log, index) in terminalLogs"
              :key="index"
              class="text-slate-500 dark:text-slate-400 line-fade flex gap-3"
            >
              <span class="text-slate-400 dark:text-slate-600">{{ String(index + 1).padStart(2, '0') }}</span>
              <span>{{ log.text }}</span>
            </div>
          </div>
          <div class="mt-2 text-primary-600 dark:text-primary-500 terminal-cursor">
            {{ currentTask }}
          </div>
        </div>

        <!-- Progress Bar Section -->
        <div class="space-y-3">
          <div
            class="flex justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest"
          >
            <span>Kernel Status: OK</span>
            <span>{{ progressPercent }}%</span>
          </div>

          <!-- The Bar -->
          <div
            class="h-2 w-full bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden p-[2px]"
          >
            <div
              class="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              :style="{ width: `${progressPercent}%` }"
            ></div>
          </div>

          <div class="grid grid-cols-4 gap-1">
            <div
              class="h-1 rounded-full transition-colors"
              :class="progressPercent > 25 ? 'bg-primary-500/40 dark:bg-primary-500/40' : 'bg-gray-200 dark:bg-slate-800'"
            ></div>
            <div
              class="h-1 rounded-full transition-colors"
              :class="progressPercent > 50 ? 'bg-primary-500/40 dark:bg-primary-500/40' : 'bg-gray-200 dark:bg-slate-800'"
            ></div>
            <div
              class="h-1 rounded-full transition-colors"
              :class="progressPercent > 75 ? 'bg-primary-500/40 dark:bg-primary-500/40' : 'bg-gray-200 dark:bg-slate-800'"
            ></div>
            <div
              class="h-1 rounded-full transition-colors"
              :class="progressPercent >= 100 ? 'bg-primary-500/40 dark:bg-primary-500/40' : 'bg-gray-200 dark:bg-slate-800'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["complete"]);

const logs = [
  { text: "> Mounting network drives...", delay: 400 },
  { text: "> Loading environment variables...", delay: 600 },
  { text: "> Fetching projects from portfolio.json", delay: 300 },
  { text: "> Initializing i18n [FR/EN]...", delay: 500 },
  { text: "> Applying Tailwind system theme...", delay: 400 },
  { text: "> Optimizing assets & shaders...", delay: 700 },
  { text: "> Establishing secure connection...", delay: 400 },
  { text: "> READY. Starting GUI...", delay: 200 },
];

const terminalLogs = ref([]);
const currentTask = ref("Initializing...");
const progressPercent = ref(0);

async function runLoader() {
  let progress = 0;

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];

    // Update text
    currentTask.value = log.text.replace("> ", "");

    // Add to terminal history
    terminalLogs.value.push({ text: log.text });

    // Update progress
    progress += Math.floor(100 / logs.length);
    if (i === logs.length - 1) progress = 100;

    progressPercent.value = progress;

    await new Promise((resolve) => setTimeout(resolve, log.delay));
  }

  // End animation
  setTimeout(() => {
    emit("complete");
  }, 500);
}

onMounted(() => {
  runLoader();
});
</script>

<style scoped>
.terminal-cursor::after {
  content: "_";
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.line-fade {
  animation: slideUp 0.3s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.8s ease-out;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}
</style>