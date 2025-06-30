<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-sm font-medium text-gray-500 mb-2">{{ label }}</h3>
    <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
    <p v-if="delta" class="mt-2 flex items-center text-sm" :class="delta > 0 ? 'text-green-500' : 'text-red-500'">
      <component :is="delta > 0 ? ArrowDownIcon : ArrowUpIcon" class="w-4 h-4" />
      <span class="ml-1">{{ Math.abs(delta) }}%</span>
    </p>
  </div>
</template>

<script>
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'StatsCard',
  components: { ArrowDownIcon, ArrowUpIcon },
  props: {
    label: String,
    value: String,
    delta: { type: Number, default: null }
  }
}
</script>
