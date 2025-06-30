<template>
  <div class="bg-white p-4 rounded-lg shadow flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <!-- on passe l’icône en prop -->
      <component :is="icon" class="w-6 h-6 text-indigo-500" />
      <div>
        <p class="text-gray-900 font-medium">{{ name }}</p>
        <p class="text-sm text-gray-500">{{ duration }}</p>
      </div>
    </div>
    <p class="text-sm text-gray-500">{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: 'ActivityItem',
  props: {
    name:     { type: String, required: true },
    duration: { type: String, required: true },
    time:     { type: String, required: true },
    icon:     { type: [Object, Function], required: true }
  }
}
</script>
