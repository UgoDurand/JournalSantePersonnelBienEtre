<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
      <p class="mt-1 text-gray-600">{{ subtitle }}</p>
    </div>
    <BaseButton
        @click="$emit('add')"
        class="mt-4 md:mt-0 inline-flex items-center …"
    >
      <PlusIcon class="w-5 h-5 mr-2" />
      {{ buttonText }}
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'PageHeader',
  components: { BaseButton, PlusIcon },
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    buttonText: { type: String, default: '' }
  }
}
</script>
