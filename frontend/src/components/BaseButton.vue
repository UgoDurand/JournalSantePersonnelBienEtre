<template>
  <button
      :class="[
      'flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition',
      variant === 'solid'
        ? 'text-white bg-emerald-600 hover:bg-emerald-700'
        : 'text-emerald-600 border border-emerald-600 hover:bg-emerald-50',
    ]"
      @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'solid' // or 'outline'
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
