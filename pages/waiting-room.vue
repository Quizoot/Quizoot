<script setup lang="ts">
import xss from 'xss'
import { copyRoomCode } from '~/utils/client'

const roomSettingPage = ref<'room' | 'question' | 'advanced'>('room')

const singlePlayerStore = useSingleplayerStore()
singlePlayerStore.reset()

const multiplayerStore = useMultiplayerStore()
multiplayerStore.reset()

const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
  event.preventDefault()
  event.returnValue = true
}

useEventListener('beforeunload', beforeUnloadHandler)

const socketStore = useSocketStore()
const socket = computed({
  get: () => socketStore.socket,
  set: (value) => {
    socketStore.socket = value
  },
})

const roomUrl = useRequestURL().origin + '/join'

const router = useRouter()
if (socket.value === null) {
  router.replace('/')
} else {
  socket.value?.emit('request-user-info')
}

function getPlayerList() {
  const list: { username: string; emoji: string }[] = []
  for (const player of multiplayerStore.playerList) {
    if (multiplayerStore.host && player.uuid !== multiplayerStore.uuid) {
      list.push({ username: player.username, emoji: player.emoji })
    }
  }
  return list
}

const modal = ref<HTMLDialogElement | null>(null)

const showModal = () => {
  if (modal.value) {
    modal.value.showModal()
  }
}

const closeModal = () => {
  if (modal.value) {
    modal.value.close()
  }
}

const el = ref(null)
useSwipe(el, {
  onSwipeEnd(_, direction) {
    if (direction === 'down') {
      closeModal()
    }
  },
})
</script>

<template>
  <div class="flex h-dvh max-h-dvh flex-col">
    <RoomTopNavigation
      :max-question-number="multiplayerStore.maxQuestions"
      :question-number="multiplayerStore.questionNumber"
      :score="multiplayerStore.score"
    />
    <button
      class="mb-2 mt-4 text-center"
      :class="[multiplayerStore.host ? 'md:hidden' : '']"
      @click="copyRoomCode(xss(multiplayerStore.roomCode))"
    >
      <UiHeadingThree>
        Room Code: <b>{{ multiplayerStore.roomCode }}</b>
      </UiHeadingThree>
    </button>
    <div v-if="multiplayerStore.host">
      <UiHeadingThree class="mb-2 mt-4 text-center font-[500] md:ml-8 md:text-left">
        Players:
      </UiHeadingThree>
      <div class="grid h-[60vh] max-h-[60vh] md:h-[70vh] md:max-h-[70vh] md:grid-cols-3">
        <div class="mx-8 overflow-y-auto md:col-span-2 md:overflow-y-auto">
          <PlayerList :players="getPlayerList()" />
        </div>
        <div class="hidden grid-flow-row items-center justify-center md:grid">
          <div class="mb-8">
            <RoomCode :room-code="multiplayerStore.roomCode" class="mx-auto w-[18vw]" />
            <UiHeadingFour class="text-center">{{ roomUrl }}</UiHeadingFour>
            <div class="text-center" @click="copyRoomCode(xss(multiplayerStore.roomCode))">
              <button>
                <UiHeadingFour>
                  Room code: <b>{{ multiplayerStore.roomCode }}</b>
                </UiHeadingFour>
              </button>
            </div>
            <!-- Start button larger screens -->
            <div class="mt-4 flex w-full items-center justify-center">
              <UiButtonRegular
                class="big-button-size btn-primary"
                @click="
                  () => {
                    if (socket) {
                      socket.emit('host-start-game')
                    } else {
                      console.log('Socket not connected')
                    }
                  }
                "
              >
                Start
              </UiButtonRegular>

              <button
                class="setting-button-placement btn btn-circle fixed mx-1"
                @click="showModal()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-7 w-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Start Button Smaller Screens -->
      <div class="mt-8 flex w-screen items-center justify-center md:hidden">
        <div class="fixed bottom-8">
          <UiButtonBottom
            class="small-button-size"
            @click="
              () => {
                if (socket) {
                  socket.emit('host-start-game')
                } else {
                  console.log('Socket not connected')
                }
              }
            "
          >
            Start
          </UiButtonBottom>
          <!-- Setting button on smaller devices -->
          <div class="btn btn-circle fixed mx-1 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-7 w-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex h-1/2 items-center justify-center">
      <div class="mx-4">
        <!-- Waiting for host... on small -> largest screens -->
        <UiHeadingOne class="hidden items-center justify-center text-center sm:flex">
          <span>Waiting for host to start the game</span>
          <CSSLoader class="ml-1 mt-1" />
        </UiHeadingOne>
        <!-- Waiting for host... on very small screens -->
        <UiHeadingOne class="items-center justify-center text-center sm:hidden">
          <div>Waiting for host to</div>
          <div class="flex justify-center">
            <span>start the game</span><CSSLoader class="ml-1 mt-1" />
          </div>
        </UiHeadingOne>
      </div>
    </div>
    <!-- Settings modal -->
    <dialog id="room_settings_modal" ref="modal" class="modal modal-bottom sm:modal-middle">
      <div ref="el" class="modal-box">
        <form method="dialog">
          <button class="btn btn-circle btn-ghost btn-md absolute right-2 top-2">✕</button>
        </form>
        <UiHeadingFour class="bottom-2 mb-2 text-center text-lg font-bold"
          >Room Settings</UiHeadingFour
        >
        <!-- Join element with the 3 options -->
        <div class="join mb-4 flex">
          <input
            v-model="roomSettingPage"
            value="room"
            class="btn join-item basis-1/3 font-[500]"
            type="radio"
            name="options"
            aria-label="Room"
            checked
          />
          <input
            v-model="roomSettingPage"
            value="question"
            class="btn join-item basis-1/3 font-[500]"
            type="radio"
            name="options"
            aria-label="Question"
          />
          <input
            v-model="roomSettingPage"
            value="advanced"
            class="btn join-item basis-1/3 font-[500]"
            type="radio"
            name="options"
            aria-label="Advanced"
          />
        </div>
        <RoomSettingsRoom v-if="roomSettingPage === 'room'" />
        <RoomSettingsQuestion v-if="roomSettingPage === 'question'" />
        <RoomSettingsAdvanced v-if="roomSettingPage === 'advanced'" />
      </div>
    </dialog>
  </div>
</template>

<style scoped>
/* Devices such as iPhone 5 */
@media (max-width: 381px) {
  .small-button-size {
    width: 60vw;
  }
}

/* Smaller width devices */
@media (max-width: 949px) {
  .big-button-size {
    width: 150px;
  }
  .setting-button-placement {
    margin-left: 210px;
  }
}

/* All other devices */
@media (min-width: 950px) {
  .big-button-size {
    width: 200px;
  }
  .setting-button-placement {
    margin-left: 260px;
  }
}
</style>
