<!-- src/App.vue -->
<template>
  <!-- Sur mobile / zoom fort : colonne (navbar en haut), sur md+ : ligne (navbar à gauche) -->
  <div class="flex flex-col md:flex-row min-h-screen">
    <Navbar />
    <!-- Le main doit pouvoir défiler indépendamment -->
    <main class="flex-1 overflow-auto min-w-0">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default { components: { Navbar } }
</script>
