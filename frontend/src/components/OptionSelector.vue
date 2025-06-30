<!-- src/components/OptionSelector.vue -->
<template>
  <section :class="sectionClass">
    <div class="flex items-center mb-2">
      <span :class="['text-2xl mr-2', iconColor]">{{ icon }}</span>
      <h2 class="text-lg font-medium text-gray-900">{{ title }}</h2>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
          v-for="opt in options"
          :key="opt.value"
          @click="$emit('update:modelValue', opt.value)"
          :class="buttonClasses(modelValue === opt.value)"
      >
        <span class="text-xl mr-2">{{ opt.emoji }}</span>
        {{ opt.value }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OptionSelector',
  props: {
    title:       { type: String, required: true },
    icon:        { type: String, required: true },     // un emoji
    iconColor:   { type: String, default: 'text-indigo-500' },
    options:     { type: Array,  required: true },     // [{ value, emoji }]
    modelValue:  { type: String, required: true },     // v-model
    sectionClass:{ type: String, default: 'mt-8' }
  },
  methods: {
    buttonClasses(isSelected) {
      return [
        'flex items-center px-4 py-2 rounded-lg border transition-colors duration-150',
        isSelected
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
      ]
    }
  }
}
</script>
