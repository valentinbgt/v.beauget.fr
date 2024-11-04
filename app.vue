<template>
  <div class="relative">
    <div class="video-mask w-screen h-screen blur brightness-75 absolute">
      <video
        class="w-screen h-screen object-cover"
        src="/bg-video.mp4"
        muted
        autoplay
        controls="false"
      ></video>
    </div>
    <div class="absolute">
      <div class="h-screen">
        <div>
          <ul>
            <li>github</li>
            <li>linkedin</li>
            <li>cv</li>
          </ul>
        </div>
        <div class="flex flex-col items-center w-10/12 mx-auto">
          <h1 class="font-title uppercase w-full text-5xl mb-4">
            Valentin BEAUGET
          </h1>
          <h2
            class="font-title text-vlightblue w-full text-right text-4xl mb-4"
          >
            Fullstack Developper
          </h2>
          <p class="text-vgray w-full text-justify text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud. 
          </p>
        </div>
      </div>
    </div>
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
