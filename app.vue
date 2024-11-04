<template>
  <div class="relative">
    <div class="video-mask w-screen h-screen">
      <div class="bg-vlightblue w-screen h-screen">
        <p class="font-title text-9xl">CECI EST UN TEST</p>
      </div>
    </div>
    <div class="absolute top-0 bottom-0 left-0 right-0">content</div>
  </div>
</template>

<style>
/* reset */
* {
  @apply p-0 m-0 box-border text-vwhite;
}

body {
  @apply bg-vblack;
}

.video-mask {
  -webkit-mask-image: url("/vmask.png");
  mask-image: url("/vmask.png");
  mask-repeat: no-repeat;
  mask-size: cover;
  mask-position: center;
}
</style>
