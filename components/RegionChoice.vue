<script setup lang="ts">
const props = defineProps({
  singlePlayer: {
    type: Boolean,
    required: true,
  },
})

interface CardItem {
  title: string
  link?: string
  description: string
  image: string
  alt?: string
  openLinkFunction?: () => void
  badge?: string
}

const socketStore = useSocketStore()
const socket = computed({
  get: () => socketStore.socket,
  set: (value) => {
    socketStore.socket = value
  },
})

const router = useRouter()

watch(socket, () => {
  if (socket.value === null) {
    return
  }

  socket.value.on('room-created', () => {
    router.push('/waiting-room')
  })
})

const generateQuestion = (category: string, region: string) => {
  if (props.singlePlayer) {
    const singlePlayerStore = useSingleplayerStore()
    singlePlayerStore.reset()
    singlePlayerStore.region = region
    singlePlayerStore.state = 'generate-question'
    router.push(`/question`)
  } else {
    socketStore.connect()
    socket.value?.emit('create-room', region)
  }
}

const world: CardItem[] = [
  {
    title: 'World',
    openLinkFunction() {
      generateQuestion('countries', 'world')
    },
    image: 'images/World.jpg',
    description: 'Countries all over the world.',
  },
]

const continents: CardItem[] = [
  {
    title: 'Africa',
    openLinkFunction() {
      generateQuestion('countries', 'africa')
    },
    image: 'images/Africa.jpg',
    description: 'Countries specific to Africa.',
  },
  {
    title: 'Americas',
    openLinkFunction() {
      generateQuestion('countries', 'americas')
    },
    image: 'images/Central America and the Caribbean.jpg',
    description: 'Countries specific to North and South America.',
  },
  {
    title: 'Asia',
    openLinkFunction() {
      generateQuestion('countries', 'asia')
    },
    image: 'images/Asia.jpg',
    description: 'Countries specific to Asia.',
  },
  {
    title: 'Europe',
    openLinkFunction() {
      generateQuestion('countries', 'europe')
    },
    image: 'images/Europe.jpg',
    description: 'Countries specific to Europe.',
  },
  {
    title: 'Oceania',
    openLinkFunction() {
      generateQuestion('countries', 'oceania')
    },
    image: 'images/Oceania.jpg',
    description: 'Countries specific to Oceania.',
  },
]
</script>

<template>
  <CardSlider :items="world" title="World" />
  <CardSlider :items="continents" title="Continents" />
</template>
