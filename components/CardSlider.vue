<script setup lang="ts">
interface CardItem {
  title: string
  link?: string
  description: string
  image: string
  alt?: string
  openLinkFunction?: () => void
  badge?: string
}

defineProps({
  items: {
    type: Array as PropType<CardItem[]>,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: null,
  },
  altPrefix: {
    type: String,
    required: false,
    default: null,
  },
  altSuffix: {
    type: String,
    required: false,
    default: null,
  },
})

const cardBreakpoints = () => {
  if (useViewport().isGreaterOrEquals('desktopWide')) {
    return 4
  } else if (useViewport().isGreaterOrEquals('desktop')) {
    return 3
  } else if (useViewport().isGreaterOrEquals('tablet')) {
    return 2
  } else {
    return 1
  }
}

const cardCount = ref(3)
const updateCardCount = () => {
  cardCount.value = cardBreakpoints()
}

watch(useViewport().breakpoint, () => {
  updateCardCount()
})

updateCardCount()
</script>

<template>
  <div class="content-wrapper flex flex-col items-center justify-center justify-items-center">
    <UiHeadingThree v-if="title" class="m-auto flex w-full justify-center font-[500]">
      {{ title }}
    </UiHeadingThree>
    <div class="w-full max-w-full">
      <swiper-container
        v-if="items.length > 0"
        :slides-per-view="cardCount"
        :space-between="10"
        class="drop-shadow-l m-auto mb-4 flex w-full max-w-[95vw] items-center overflow-clip rounded-2xl sm:max-h-[60vh] sm:max-w-[85vw] lg:max-h-[70vh] lg:max-w-[80vw] xl:max-w-[75vw]"
        :class="{ 'cursor-grab': items.length > cardCount }"
        :navigation="true"
        :pagination="true"
        :pagination-dynamic-bullets="true"
      >
        <swiper-slide
          v-for="item in items"
          :key="item.title"
          class="w-items-center flex justify-center rounded-2xl p-2 pb-8 pt-4"
        >
          <CategoryCard
            :title="item.title"
            :link="item.link"
            :image="item.image"
            :description="item.description"
            :badge="item.badge"
            :open-link-function="item.openLinkFunction"
            :alt="
              item.alt
                ? item.alt
                : (altPrefix ? altPrefix : '') + item.title + (altSuffix ? altSuffix : '')
            "
          />
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>
