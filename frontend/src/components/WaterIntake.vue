<template>
  <div class="bg-white p-6 rounded-lg shadow flex flex-col">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Water Intake</h2>
    <p class="text-sm text-gray-500 mb-2">
      Target: {{ targetCups }} cups ({{ targetVolume }} ml)
    </p>

    <div class="flex items-center mb-4">
      <DropletIcon class="w-6 h-6 text-blue-500 mr-2" />
      <p class="text-2xl font-bold text-gray-900">{{ water }} ml</p>
    </div>

    <div class="flex gap-2">
      <button
          @click="$emit('add-glass')"
          class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white
               font-medium py-1 px-3 text-sm rounded transition hover:scale-105"
      >
        <PlusIcon class="w-4 h-4 mr-1" /> Add
      </button>

      <button
          @click="$emit('remove-glass')"
          :disabled="water === 0"
          :class="[
                'inline-flex items-center bg-red-300 text-white font-medium py-1 px-3 text-sm rounded transition hover:scale-105',
                water === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-red-400'
              ]"
      >
        <MinusIcon class="w-4 h-4 mr-1" /> Remove
      </button>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
/* global defineProps, defineEmits, defineExpose, withDefaults */
import { PlusIcon, MinusIcon, DropletIcon } from '@heroicons/vue/24/solid'
defineProps({
  water: Number,
  targetVolume: Number,
  targetCups: Number
})
</script>
