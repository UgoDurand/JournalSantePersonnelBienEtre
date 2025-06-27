<template>
  <div class="relative bg-white rounded-xl shadow p-6 w-full">
    <!-- Boutons circulaires en haut à droite -->
    <div class="absolute top-4 right-4 flex space-x-2">
      <!-- + -->
      <BaseButton
          @click="handleAdd"
          class="!p-2 !bg-blue-600 hover:!bg-blue-700 !text-white !rounded-full"
      >
        <PlusIcon class="w-4 h-4" />
      </BaseButton>

      <!-- ← (ou utilisez une autre icône Heroicons si vous préférez) -->
      <BaseButton
          @click="handleView"
          class="!p-2 !bg-blue-600 hover:!bg-blue-700 !text-white !rounded-full"
      >
        <ArrowTopRightOnSquareIcon class="w-4 h-4" />
      </BaseButton>
    </div>

    <!-- Contenu principal -->
    <div class="pr-28">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>

      <div class="mt-4">
        <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
        <p class="mt-1 text-sm text-gray-500">{{ label }}</p>
      </div>
    </div>

    <!-- Image en bas à droite -->
    <img
        v-if="image"
        :src="image"
        alt=""
        class="absolute bottom-4 right-4 w-24 h-24 rounded-lg object-cover"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
// Import des icônes Heroicons
import { PlusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'DashboardCard',
  components: {
    BaseButton,
    PlusIcon,
    ArrowTopRightOnSquareIcon
  },
  props: {
    title:   String,
    subtitle:String,
    value:   String,
    label:   String,
    image: {
      type: String,
      default: null
    }
  },
  methods: {
    handleAdd()  { this.$emit('add',  this.title) },
    handleView() { this.$emit('view', this.title) }
  }
}
</script>
