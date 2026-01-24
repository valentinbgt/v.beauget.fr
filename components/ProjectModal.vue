<template>
  <div
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="bg-vblack border-2 max-w-4xl w-full mx-4 border-white relative flex flex-row"
    >
      <div class="w-[680px] h-[600px] bg-white flex flex-col">
        <div
          class="flex-1 bg-cover bg-center"
          :style="`background-image: url(/images/${project?.image ?? ''})`"
        ></div>

        <div class="flex p-4 bg-vblack">
          <button
            v-if="!project.disabled"
            @click="handleButtonClick"
            :class="[
              'text-sm font-title border-2 border-white py-3 w-full text-center',
              'hover:bg-white hover:text-vblack transition-colors active:underline active:decoration-vlightblue active:transition-none',
            ]"
          >
            {{ project.button }}
          </button>
        </div>
      </div>

      <div class="p-6 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2 class="font-title text-vlightblue text-2xl">
            {{ project?.name }}
          </h2>
          <button
            @click="$emit('close')"
            class="text-vgray hover:text-white text-2xl flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <p class="text-vgray">{{ project?.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  disabled: boolean;
  hidden: boolean;
  name: string;
  description: string;
  button: string;
  image: string;
  lien: string;
}

const props = defineProps<{
  project: Project;
}>();

const emit = defineEmits<{
  close: [];
}>();

const handleButtonClick = () => {
  if (props.project?.lien) {
    window.open(props.project.lien, "_blank");
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    emit("close");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
