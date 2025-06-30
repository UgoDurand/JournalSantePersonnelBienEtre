<template>
  <div :class="['p-4 rounded-lg', bg]">
    <p class="text-sm text-gray-500">{{ title }}</p>
    <p class="text-2xl font-bold text-gray-900">
      {{ value }}<span v-if="unit" class="text-base font-normal"> {{ unit }}</span>
    </p>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  /* global defineProps, defineEmits, defineExpose, withDefaults */
defineProps({
  title: String,
  value: [Number, String],
  unit:  String,
  bg:    { type: String, default: 'bg-gray-50' } // couleur pastel
})
</script>
