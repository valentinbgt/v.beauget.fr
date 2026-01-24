<template>
  <div class="relative">
    <div
      class="video-mask w-screen h-screen blur brightness-75 fixed"
      ref="videoContainer"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    >
      <video
        class="w-screen h-screen object-cover"
        src="/bg-video.mp4"
        muted
        autoplay
        loop
      ></video>
    </div>
    <div class="absolute">
      <div id="home_anchor" class="h-screen">
        <div class="w-screen flex flex-row-reverse">
          <Socials></Socials>
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
            Développeur autodidacte depuis mes 15 ans, j'ai intégré la formation
            MMI à Troyes, en alternance chez Gravity Media.
          </p>
          <CircularTextLink link="#projects_anchor">
            Par ici la suite • Par ici la suite •
          </CircularTextLink>
        </div>
      </div>
      <div id="projects_anchor"></div>
      <ProjectModal
        v-if="showProjectsModal"
        :project="selectedProject"
        @close="closeProjectsModal"
      ></ProjectModal>
      <div
        class="p-6 md:p-7 xl:p-8 my-24 grid justify-items-center gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-screen-xl mx-auto border-vgray border-y-2 xl:border-2 bg-vblack"
      >
        <div
          v-for="(project, index) in projects"
          class="bg-vblack w-full max-w-md h-80 flex flex-col-reverse overflow-hidden border-2 border-white hover:-translate-x-2 hover:-translate-y-2 transition hover:shadow-vgray"
          style="box-shadow: 15px 15px 0px -5px var(--tw-shadow-color)"
        >
          <div class="bg-vblack w-full flex flex-col-reverse px-6 py-5">
            <button
              v-if="!project.disabled"
              @click="openProjectsModal(project)"
              :class="[
                'text-sm font-title border-2 border-white py-3 w-full mx-auto text-center',
                'hover:bg-white hover:text-vblack transition-colors active:underline active:decoration-vlightblue active:transition-none',
              ]"
            >
              {{ project.button }}
            </button>
            <button
              v-else
              :class="[
                'text-sm font-title border-2 border-white py-3 w-full mx-auto text-center',
                'text-vgray cursor-not-allowed',
              ]"
            >
              {{ project.button }}
            </button>
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
        <!--         <div
          class="border-vgray border-b-2 md:border-b-0 md:border-r-2 p-4 w-full md:w-1/2"
        >
          <div class="h-full flex flex-col">
            <h2
              class="font-title text-vlightblue text-3xl md:text-2xl xl:text-3xl text-center text-balance m-4"
            >
              Mes compétences
            </h2>
            <div class="w-10/12 h-px bg-vgray mx-auto"></div>
            <div class="flex-grow my-4"></div>
            <a
              href="/cv"
              target="_blank"
              class="text-xl font-title border-2 block px-4 border-vgray py-3 w-full mx-auto text-center hover:bg-white hover:text-vblack transition-colors hover:border-white active:underline active:decoration-vlightblue active:transition-none"
              >Curriculum vitæ</a
            >
          </div>
        </div> -->
        <div class="p-4 w-full">
          <!--md:w-1/2"-->
          <div>
            <h2
              class="font-title text-vlightblue text-3xl md:text-2xl xl:text-3xl text-center text-balance m-4"
            >
              Pour me contacter ⬇️
            </h2>
            <div class="w-10/12 h-px bg-vgray mx-auto my-8"></div>
            <form
              @submit.prevent="handleSubmit"
              class="w-full border-2 border-vgray mb-4"
            >
              <div class="flex">
                <input
                  v-model="formData.lastName"
                  class="h-20 bg-vblack w-1/2 border-vgray border-r-2 px-7 flex items-center text-xl outline-none focus:underline decoration-vlightblue caret-vlightblue"
                  type="text"
                  placeholder="Nom"
                  required
                />
                <input
                  v-model="formData.firstName"
                  class="h-20 bg-vblack w-1/2 px-7 flex items-center text-xl outline-none focus:underline decoration-vlightblue caret-vlightblue"
                  type="text"
                  placeholder="Prénom"
                  required
                />
              </div>

              <input
                v-model="formData.email"
                class="h-20 bg-vblack w-full px-7 flex items-center text-xl border-vgray border-y-2 invalid:text-vgray outline-none focus:underline decoration-vlightblue caret-vlightblue"
                type="email"
                placeholder="Adresse E-mail"
                required
              />
              <textarea
                v-model="formData.message"
                class="bg-vblack w-full px-7 py-6 flex items-center text-xl h-fit min-h-72 max-h-96 resize-none overflow-y-auto outline-none focus:underline decoration-vlightblue caret-vlightblue"
                @input="autoResize"
                placeholder="Message..."
                required
              ></textarea>
              <input
                class="h-20 bg-vblack w-full border-vgray border-t-2 font-title text-2xl text-center hover:bg-white hover:text-vblack transition-colors hover:border-white hover:cursor-pointer active:underline active:decoration-vlightblue active:transition-none"
                type="submit"
                value="Envoyer"
                :disabled="isSubmitting"
              />
            </form>
          </div>
        </div>
      </div>
      <footer
        class="border-t-2 border-vgray bg-vblack grid grid-cols-1 md:grid-cols-[450px_1fr]"
      >
        <div
          class="flex flex-col items-center md:border-r-2 md:border-vgray pb-12"
        >
          <Socials></Socials>
          <CircularTextLink link="#home_anchor" direction="up">
            Revenir en haut • Accueil • Up •
          </CircularTextLink>
        </div>

        <div class="flex flex-col items-center justify-center pb-12">
          <p
            class="w-10/12 mx-auto my-10 text-xl text-center text-balance max-w-screen-md"
          >
            Hormis le formulaire de contact, ce site web ne récolte aucune
            donnée personnelle.<br />Les cookies utilisés sont strictement
            esthétique
            <span class="text-nowrap">(ex: mémorisation du thème)</span> et ne
            servent aucunement de traceur.
          </p>
          <a
            href="https://github.com/valentinbgt/v.beauget.fr/"
            target="_blank"
            class="text-xl font-title border-2 border-vgray py-3 px-4 mt-4 text-center hover:bg-white hover:text-vblack transition-colors hover:border-white active:underline active:decoration-vlightblue active:transition-none"
            >Code Source</a
          >
        </div>
      </footer>
    </div>
    <Transition name="fade">
      <div
        v-if="notification.show"
        :class="[
          'fixed top-8 right-8 z-50 p-4 border-2 font-title text-xl',
          'backdrop-blur-md transition-all duration-300',
          notification.type === 'success'
            ? 'border-vlightblue bg-vblack/80'
            : 'border-red-500 bg-vblack/80',
        ]"
      >
        {{ notification.message }}
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, onMounted, reactive, computed, onUnmounted } from "vue";
import projectsData from "~/assets/data/projects.json";

export default {
  setup() {
    const projects = ref(projectsData);
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

    const parallaxOffset = ref(0);
    const videoContainer = ref(null);

    const visibleProjects = computed(() => {
      return projects.value.filter((project) => !project.hidden);
    });

    const selectedProject = ref(null);
    const showProjectsModal = ref(false);

    const autoResize = (e) => {
      e.target.style.height = "";
      e.target.style.height = e.target.scrollHeight + "px";
    };

    const config = useRuntimeConfig();

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

        console.log("Response:", response);

        if (response.status !== 200) {
          throw new Error("Failed to send message");
        }

        formData.firstName = "";
        formData.lastName = "";
        formData.email = "";
        formData.message = "";

        notification.value = {
          show: true,
          message: "Message envoyé avec succès !",
          type: "success",
        };
      } catch (error) {
        console.error("Error saving message:", error);
        notification.value = {
          show: true,
          message: "Une erreur est survenue lors de l'envoi du message.",
          type: "error",
        };
      } finally {
        isSubmitting.value = false;
        setTimeout(() => {
          notification.value.show = false;
        }, 10000);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      parallaxOffset.value = scrollPosition * -0.5; // parallax intensity
    };

    onMounted(async () => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const openProjectsModal = (project) => {
      selectedProject.value = project;
      showProjectsModal.value = true;
    };

    const closeProjectsModal = () => {
      showProjectsModal.value = false;
      selectedProject.value = null;
    };

    return {
      projects: visibleProjects,
      isSubmitting,
      formData,
      handleSubmit,
      autoResize,
      notification,
      parallaxOffset,
      videoContainer,
      selectedProject,
      showProjectsModal,
      openProjectsModal,
      closeProjectsModal,
    };
  },
};
</script>

<style>
/* reset */
* {
  @apply p-0 m-0 box-border text-vwhite font-text scroll-smooth select-none;
}

html {
  scroll-behavior: smooth;
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
