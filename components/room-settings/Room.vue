<template>
  <div class="flex gap-6">
    <UiHeadingFive class="basis-1/3 bg-red-500">Change Gamemode</UiHeadingFive>
    <button class="basis-2/3 bg-primary">World</button>
  </div>
  <!-- Room settings -->
  <div class="flex flex-col gap-2">
    <!-- Change gamemode (LINK TO CREATE-ROOM PAGE ?)-->
    <UiHeadingFive>Change Gamemode</UiHeadingFive>
    <UiButtonRegular class="w-full" :text-size="false">Change Gamemode</UiButtonRegular>

    <!-- Time for questions -->
    <UiHeadingFive>Question Length (Seconds)</UiHeadingFive>
    <input
      type="number"
      placeholder="Question Length (Seconds)"
      class="input input-bordered w-full"
    />

    <!-- Question count -->
    <UiHeadingFive>Question Count</UiHeadingFive>
    <input type="number" placeholder="Question Count" class="input input-bordered w-full" />

    <!-- Max player count -->
    <UiHeadingFive>Max Player Count</UiHeadingFive>
    <input type="number" placeholder="Max Player Count" class="input input-bordered w-full" />

    <!-- Max points per question -->
    <UiHeadingFive>Maximum Points Per Question</UiHeadingFive>
    <input
      type="number"
      placeholder="Maximum Points Per Question"
      class="input input-bordered w-full"
    />

    <!-- Min points per question -->
    <UiHeadingFive>Minimum Points Per Question</UiHeadingFive>
    <input
      type="number"
      placeholder="Minimum Points Per Question"
      class="input input-bordered w-full"
    />

    <!-- Steak bonus enabled -->
    <UiHeadingFive>Streak Bonus</UiHeadingFive>
    <input type="checkbox" :checked="true" class="checkbox" />

    <!-- Streak decay -->
    <UiHeadingFive>Point Decay</UiHeadingFive>
    <input type="checkbox" :checked="true" class="checkbox" />
  </div>
</template>
