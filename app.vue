<template>
  <div class="relative">
    <div class="video-mask w-screen h-screen blur brightness-75 fixed">
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
                  class="w-10 md:w-14 m-2.5 md:m-4 social-icon"
                  src="/icons/github.svg"
                  alt=""
              /></a>
            </li>
            <li>
              <a href="https://v.beauget.fr/linkedin"
                ><img
                  class="w-10 md:w-14 m-2.5 md:m-4 social-icon"
                  src="/icons/linkedin.svg"
                  alt=""
              /></a>
            </li>
            <li>
              <a href="https://v.beauget.fr/cv"
                ><img
                  class="w-10 md:w-14 m-2.5 md:m-4 social-icon"
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
        class="p-6 md:p-7 xl:p-8 grid justify-items-center gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-screen-xl mx-auto border-vgray border-y-2 xl:border-2 bg-vblack"
      >
        <div
          v-for="(project, index) in projects"
          class="bg-vblack w-full max-w-md h-80 flex flex-col-reverse overflow-hidden border-2 border-white hover:-translate-x-2 hover:-translate-y-2 transition hover:shadow-vgray"
          style="box-shadow: 15px 15px 0px -5px var(--tw-shadow-color)"
        >
          <div class="bg-vblack w-full flex flex-col-reverse px-6 py-5">
            <a
              href=""
              class="text-sm font-title border-2 border-white py-3 w-full mx-auto text-center hover:bg-white hover:text-vblack transition-colors active:underline active:decoration-vlightblue active:transition-none"
              >{{ project.button }}</a
            >
            <p
              class="text-ellipsis overflow-hidden whitespace-nowrap w-full text-base text-vgray pt-1 pb-2"
            >
              {{ project.description }}
            </p>
            <h3 class="font-title text-vlightblue text-2xl">
              {{ project.name }}
            </h3>
          </div>
          <img
            class="flex-1 w-full object-cover h-4/6"
            :src="`/images/${project.image}`"
            :alt="project.name"
          />
        </div>
      </div>
      <div
        class="mx-auto my-24 w-9/12 md:w-10/12 xl:w-11/12 max-w-screen-xl border-2 border-vgray bg-vblack flex flex-col md:flex-row"
      >
        <div
          class="border-vgray border-b-2 md:border-b-0 md:border-r-2 p-4 w-full md:w-1/2"
        >
          <div>
            <h2
              class="font-title text-vlightblue text-3xl md:text-2xl xl:text-3xl text-center text-balance m-4"
            >
              Mes compétences
            </h2>
            <div class="w-10/12 h-px bg-vgray mx-auto"></div>
            <div></div>
            <a
              href=""
              class="text-xl font-title border-2 block px-4 border-vgray py-3 w-full mx-auto text-center hover:bg-white hover:text-vblack transition-colors hover:border-white active:underline active:decoration-vlightblue active:transition-none"
              >Curriculum vitæ</a
            >
          </div>
        </div>
        <div class="p-4 w-full md:w-1/2">
          <div>
            <form action="" class="w-full border-2 border-vgray mb-4">
              <div class="flex">
                <input
                  class="h-20 bg-vblack w-1/2 border-vgray border-r-2 px-7 flex items-center text-xl outline-none focus:underline decoration-vlightblue caret-vlightblue"
                  type="text"
                  placeholder="Nom"
                />
                <input
                  class="h-20 bg-vblack w-1/2 px-7 flex items-center text-xl outline-none focus:underline decoration-vlightblue caret-vlightblue"
                  type="text"
                  placeholder="Prénom"
                />
              </div>

              <input
                class="h-20 bg-vblack w-full px-7 flex items-center text-xl border-vgray border-y-2 invalid:text-vgray outline-none focus:underline decoration-vlightblue caret-vlightblue"
                type="email"
                placeholder="Adresse E-mail"
              />
              <textarea
                class="bg-vblack w-full px-7 py-6 flex items-center text-xl h-fit min-h-72 max-h-96 resize-none overflow-y-auto outline-none focus:underline decoration-vlightblue caret-vlightblue"
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                name=""
                id=""
                placeholder="Message..."
              ></textarea>
              <input
                class="h-20 bg-vblack w-full border-vgray border-t-2 font-title text-2xl text-center hover:bg-white hover:text-vblack transition-colors hover:border-white hover:cursor-pointer active:underline active:decoration-vlightblue active:transition-none"
                type="submit"
                value="Envoyer"
              />
            </form>
            <div class="w-10/12 h-px bg-vgray mx-auto my-8"></div>
            <h2
              class="font-title text-vlightblue text-3xl md:text-2xl xl:text-3xl text-center text-balance m-4"
            >
              On reste en contact ?
            </h2>
          </div>
        </div>
      </div>
      <footer class="border-t-2 border-vgray bg-vblack">
        <ul class="flex flex-row m-5 md:m-10 xl:m-16">
          <li>
            <a href="https://github.com/valentinbgt"
              ><img
                class="w-10 md:w-14 m-2.5 md:m-4 social-icon"
                src="/icons/github.svg"
                alt=""
            /></a>
          </li>
          <li>
            <a href="https://v.beauget.fr/linkedin"
              ><img
                class="w-10 md:w-14 m-2.5 md:m-4 social-icon"
                src="/icons/linkedin.svg"
                alt=""
            /></a>
          </li>
          <li>
            <a href="https://v.beauget.fr/cv"
              ><img
                class="w-10 md:w-14 m-2.5 md:m-4 social-icon"
                src="/icons/cv.svg"
                alt=""
            /></a>
          </li>
        </ul>
        <div
          class="size-40 border-8 rounded-full border-vlightblue mt-20 md:mt-16 xl:mt-10"
        ></div>
        <div>
          <p>
            Ce site web ne récolte aucune donnée personnelle.<br />Les cookies
            utilisés sont strictement esthétique (ex: mémorisation du thème) et
            ne servent aucunement de traceur.
          </p>
          <a href="">Code Source</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const projects = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch("/data/projects.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        projects.value = await response.json();
      } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
      }
    });

    return { projects };
  },
};
</script>

<style>
/* reset */
* {
  @apply p-0 m-0 box-border text-vwhite font-text;
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

.social-icon:hover {
  filter: drop-shadow(0px 3px 0px white);
  @apply transition;
}
.social-icon:active {
  transform: translateY(3px);
  filter: drop-shadow(0px 0px 0px white);
}
</style>
