<script setup lang="ts">
defineProps({
  questionNumber: {
    type: Number,
    required: true,
  },
  maxQuestionNumber: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  host: {
    type: Boolean,
    default: false,
  },
  quizName: {
    type: String,
    default: 'Quiz',
  },
})

const socketStore = useSocketStore()

const openModal = () => {
  const modal = document.getElementById('exit_modal') as HTMLDialogElement
  if (modal) {
    modal.showModal()
  }
}

const exitModal = () => {
  const modal = document.getElementById('exit_modal') as HTMLDialogElement
  if (modal) {
    modal.close()
  }
}

const router = useRouter()

const leaveRoom = () => {
  socketStore.disconnect()
  router.replace('/')
}
</script>

<template>
  <div>
    <div class="navbar bg-base-200">
      <div class="navbar-start">
        <span v-if="questionNumber !== 0"
          ><UiHeadingFive>{{ questionNumber }}/{{ maxQuestionNumber }}</UiHeadingFive></span
        >
        <span v-else></span>
      </div>
      <div class="navbar-center">
        <span v-if="questionNumber !== 0 && !host"
          ><UiHeadingFive>Score: {{ score }}</UiHeadingFive>
        </span>
        <span v-else>
          <UiHeadingFive>{{ quizName }}</UiHeadingFive>
        </span>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-md text-[16px]" @click="openModal()">
          <UiHeadingFive class="font-[600]">Exit</UiHeadingFive>
        </button>
      </div>
    </div>
    <dialog id="exit_modal" class="modal modal-middle">
      <div ref="el" class="modal-box w-80 md:w-96">
        <form method="dialog">
          <button class="btn btn-circle btn-ghost btn-md absolute right-2 top-2">✕</button>
        </form>
        <UiHeadingFour class="bottom-2 mb-2 text-center font-[600]">Exit</UiHeadingFour>
        <UiHeadingFive class="my-4 text-center text-lg">
          Are you sure you want to exit?
        </UiHeadingFive>
        <form method="dialog">
          <div class="form-control w-full">
            <span class="mt-4 grid grid-cols-2 justify-center gap-2">
              <button class="btn btn-primary btn-md px-4 font-[500]" @click="leaveRoom()">
                Quit
              </button>
              <input
                type="submit"
                class="btn btn-error px-4 font-[500]"
                value="Cancel"
                @click="exitModal()"
              />
            </span>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
