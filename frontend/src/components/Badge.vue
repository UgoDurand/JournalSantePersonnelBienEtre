<template>
  <!-- petit rond, la taille reste fixe et ne déborde jamais -->
  <span :class="['w-2 h-2 rounded-full', color]"></span>
</template>

<script>
export default {
  name: 'BadgeIcon',
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>
