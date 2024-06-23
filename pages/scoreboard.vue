<script setup lang="ts">
const score = ref(0)
const questionNumber = ref(0)
const maxQuestions = ref(0)

const multiplayerStore = useMultiplayerStore()

const router = useRouter()

if (multiplayerStore.state === 'not-started') {
  router.replace('/')
}

function loadMultiplayer() {
  score.value = multiplayerStore.score
  questionNumber.value = multiplayerStore.questionNumber
  maxQuestions.value = multiplayerStore.maxQuestions
}

watch(multiplayerStore, () => {
  loadMultiplayer()
})

loadMultiplayer()

const socketStore = useSocketStore()
const socket = computed({
  get: () => socketStore.socket,
  set: (value) => {
    socketStore.socket = value
  },
})

onMounted(async () => {
  if (
    import.meta.client &&
    (multiplayerStore.host ||
      (multiplayerStore.rankings[0] &&
        multiplayerStore.rankings[0].player.uuid === multiplayerStore.uuid) ||
      (multiplayerStore.rankings[1] &&
        multiplayerStore.rankings[1].player.uuid === multiplayerStore.uuid) ||
      (multiplayerStore.rankings[2] &&
        multiplayerStore.rankings[2].player.uuid === multiplayerStore.uuid))
  ) {
    await import('canvas-confetti').then((value) => {
      if (value)
        value.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
    })
  }
})
</script>

<template>
  <div>
    <div class="box-border h-dvh max-h-dvh">
      <RoomTopNavigation
        :host="multiplayerStore.host"
        :max-question-number="multiplayerStore.maxQuestions"
        :question-number="multiplayerStore.questionNumber"
        :score="multiplayerStore.score"
      />
      <!-- Scoreboard title and "New Game button for larger screens" -->
      <div class="hidden w-full grid-cols-3 sm:grid">
        <div></div>
        <div class="m-[2vh] mb-0 text-center">
          <UiHeadingOne class="font-[600]">Scoreboard</UiHeadingOne>
        </div>
        <div v-if="multiplayerStore.host" class="mt-4 hidden text-right sm:block">
          <UiButtonTopRight @click="socket?.emit('host-restart-game')">New Game</UiButtonTopRight>
        </div>
      </div>
      <!-- Scoreboard title for smaller screens -->
      <div class="m-[2vh] mb-0 text-center sm:hidden">
        <UiHeadingOne class="font-[600]">Scoreboard</UiHeadingOne>
      </div>
      <!--Container for screen under nav bar-->
      <div
        class="flex h-[calc(70vh-6rem)] flex-col justify-around overflow-hidden sm:fixed sm:bottom-0 sm:w-full sm:flex-row"
        :class="[!multiplayerStore.host ? 'mt-[10vh]' : '']"
      >
        <!--Begin First Column-->
        <UiPodiumContainer
          :position="1"
          :name="
            (multiplayerStore.rankings[0] && multiplayerStore.rankings[0].player.username) ?? ''
          "
          :emoji="(multiplayerStore.rankings[0] && multiplayerStore.rankings[0].player.emoji) ?? ''"
          :score="(multiplayerStore.rankings[0] && multiplayerStore.rankings[0].score) ?? 0"
          :hide="!multiplayerStore.rankings[0]"
        />
        <UiPodiumContainer
          :position="2"
          :name="
            (multiplayerStore.rankings[1] && multiplayerStore.rankings[1].player.username) ?? ''
          "
          :emoji="(multiplayerStore.rankings[1] && multiplayerStore.rankings[1].player.emoji) ?? ''"
          :score="(multiplayerStore.rankings[1] && multiplayerStore.rankings[1].score) ?? 0"
          :hide="!multiplayerStore.rankings[1]"
        />
        <UiPodiumContainer
          :position="3"
          :name="
            (multiplayerStore.rankings[2] && multiplayerStore.rankings[2].player.username) ?? ''
          "
          :emoji="(multiplayerStore.rankings[2] && multiplayerStore.rankings[2].player.emoji) ?? ''"
          :score="(multiplayerStore.rankings[2] && multiplayerStore.rankings[2].score) ?? 0"
          :hide="!multiplayerStore.rankings[2]"
        />
      </div>
      <div v-if="multiplayerStore.host" class="fixed w-full text-center sm:hidden">
        <UiButtonBottom
          class="mx-auto mt-8 flex justify-center"
          @click="socket?.emit('host-restart-game')"
        >
          New Game
        </UiButtonBottom>
      </div>
    </div>
  </div>
</template>
