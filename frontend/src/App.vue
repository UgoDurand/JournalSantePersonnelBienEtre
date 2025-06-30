<template>
  <div class="flex flex-col md:flex-row h-screen overflow-hidden">
    <Navbar />
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: { Navbar }
}
</script>
