<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
      <p class="mt-1 text-gray-600">{{ subtitle }}</p>
    </div>
    <BaseButton
        @click="$emit('add')"
        class="mt-4 md:mt-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-transform duration-150 hover:scale-105"
    >
      <!-- ici on rend dynamiquement l’icône passée en prop -->
      <component :is="icon" class="w-5 h-5 mr-2" />
      {{ buttonText }}
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'PageHeader',
  components: { BaseButton },
  props: {
    title:      { type: String, default: '' },
    subtitle:   { type: String, default: '' },
    buttonText: { type: String, default: '' },
    // par défaut, on utilise PlusIcon
    icon:       { type: [Object, Function], default: () => PlusIcon }
  }
}
</script>
