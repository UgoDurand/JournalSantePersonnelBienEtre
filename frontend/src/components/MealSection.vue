<!-- src/components/MealSection.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ label }}</h3>

    <input
        v-model="model"
        :placeholder="placeholder"
        class="w-full border border-gray-300 rounded-lg px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <p v-if="!model" class="mt-2 text-sm text-gray-400">
      No items added yet.
    </p>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
/* global defineProps, defineEmits, defineExpose, withDefaults */

import { computed } from 'vue'

/* Props */
const props = defineProps({
  label:        { type: String, required: true },
  placeholder:  { type: String, default: '' },
  modelValue:   { type: String, default: '' }
})

/* Emit */
const emit = defineEmits(['update:modelValue'])

/* v-model proxy */
const model = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>
