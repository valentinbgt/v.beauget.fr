<template>
  <div class="relative">
    <svg class="circular-text" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <path
          id="circle"
          d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
        />
      </defs>
      <text class="rotating-text">
        <textPath
          xlink:href="#circle"
          class="text-xl font-title tracking-wider"
        >
          <slot>Click to scroll • Click to scroll •</slot>
        </textPath>
      </text>
    </svg>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <a :href="link">
        <svg
          class="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :d="arrowPath"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    default: "down",
    validator: (value) => ["up", "down", "left", "right"].includes(value),
  },
});

const arrowPaths = {
  down: "M12 5L12 19M12 19L19 12M12 19L5 12",
  up: "M12 19L12 5M12 5L19 12M12 5L5 12",
  right: "M5 12L19 12M19 12L12 19M19 12L12 5",
  left: "M19 12L5 12M5 12L12 19M5 12L12 5",
};

const arrowPath = arrowPaths[props.direction];
</script>

<style scoped>
.circular-text {
  animation: rotate 20s linear infinite;
}

.rotating-text {
  fill: currentColor;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
