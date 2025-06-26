<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <img alt="Vue logo" src="./assets/logo.png" class="w-24 h-24 mx-auto mb-8">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
/* Tailwind CSS styles are now handled via the @import in main.js */
</style>
