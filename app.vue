<template>
  <div class="relative">
    <div class="video-mask w-screen h-screen blur brightness-75 absolute">
      <video
        class="w-screen h-screen object-cover"
        src="/bg-video.mp4"
        muted
        autoplay
        loop
        controls="false"
      ></video>
    </div>
    <div class="absolute">
      <div class="h-screen">
        <div class="w-screen flex flex-row-reverse">
          <ul class="flex flex-row m-5 md:m-10 xl:m-16">
            <li>
              <a href="https://github.com/valentinbgt"
                ><img
                  class="w-10 md:w-14 m-2.5 md:m-4"
                  src="/icons/github.svg"
                  alt=""
              /></a>
            </li>
            <li>
              <a href="https://v.beauget.fr/linkedin"
                ><img
                  class="w-10 md:w-14 m-2.5 md:m-4"
                  src="/icons/linkedin.svg"
                  alt=""
              /></a>
            </li>
            <li>
              <a href="https://v.beauget.fr/cv"
                ><img
                  class="w-10 md:w-14 m-2.5 md:m-4"
                  src="/icons/cv.svg"
                  alt=""
              /></a>
            </li>
          </ul>
        </div>
        <div
          class="flex flex-col items-center w-10/12 mx-auto mt-10 md:mt-6 xl:mt-2"
        >
          <h1
            class="font-title uppercase w-full mb-4 text-5xl md:text-7xl xl:text-8xl"
          >
            Valentin BEAUGET
          </h1>
          <h2
            class="font-title text-vlightblue w-full text-right text-4xl md:text-5xl xl:text-6xl mb-4 mix-blend-difference"
          >
            Fullstack Developper
          </h2>
          <p class="text-vgray w-full text-justify text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>
          <div
            class="size-40 border-8 rounded-full border-vlightblue mt-20 md:mt-16 xl:mt-10"
          ></div>
        </div>
      </div>
      <div
        class="p-6 md:p-7 xl:p-8 grid justify-items-center gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-screen-xl mx-auto"
      >
        <div
          class="bg-vblack w-full max-w-md h-80 flex flex-col-reverse overflow-hidden border-2 border-white hover:-translate-x-4 hover:-translate-y-4 transition hover:shadow-vgray"
          style="box-shadow: 15px 15px 0px -5px var(--tw-shadow-color)"
        >
          <div class="bg-vblack w-full flex flex-col-reverse px-6 py-5">
            <a
              href=""
              class="text-base font-title border-2 border-white py-3 w-full mx-auto text-center"
              >Cliquez ici c'est super !</a
            >
            <p
              class="text-ellipsis overflow-hidden whitespace-nowrap w-full text-lg text-vgray pt-1 pb-2"
            >
              Un moyen de stocker ses fichier sur Internet et les partager p...
            </p>
            <h3 class="font-title text-vlightblue text-2xl">BledMarket</h3>
          </div>
          <img
            class="flex-1 w-full object-cover h-4/6"
            src="https://plus.unsplash.com/premium_photo-1686729237226-0f2edb1e8970?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyfGVufDB8fDB8fHww"
            alt=""
          />
        </div>
        <div class="w-full max-w-md h-80 bg-white"></div>
        <div class="w-full max-w-md h-80 bg-white"></div>
        <div class="w-full max-w-md h-80 bg-white"></div>
        <div class="w-full max-w-md h-80 bg-white"></div>
        <div class="w-full max-w-md h-80 bg-white"></div>
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
  @apply bg-vblack overflow-x-hidden;
}

.video-mask {
  -webkit-mask-image: url("/vmask.png");
  mask-image: url("/vmask.png");
  mask-repeat: no-repeat;
  mask-size: cover;
  mask-position: center;
}
</style>
