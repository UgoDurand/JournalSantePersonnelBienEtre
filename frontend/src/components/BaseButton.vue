<template>
  <button
      :class="[
      // ✅ plein écran sur mobile, retour à auto sur sm
      'w-full sm:w-auto max-w-xs flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition',
      variant === 'solid'
        ? 'text-white bg-blue-600 hover:bg-blue-700'
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
      default: 'solid' // ou 'outline'
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
