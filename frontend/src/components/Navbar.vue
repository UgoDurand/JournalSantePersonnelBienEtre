<template>
  <aside
      :class="[
      /* mobile: sticky en haut -> reste visible ; desktop: static */
      'sticky top-0 md:static',
      'bg-white shadow-sm transition-width duration-200 border-b md:border-b-0 md:border-r border-gray-200',
      'z-50 md:z-auto',

      /* largeur / orientation selon état collapsed */
      collapsed
        ? 'w-full h-16 flex flex-row items-center justify-between px-4 md:w-16 md:h-screen md:flex-col md:px-2 md:py-4'
        : 'w-full md:w-56 lg:w-64 xl:w-72 h-auto md:h-screen flex flex-col px-2 py-4'
    ]"
  >
    <!-- HEADER -->
    <div
        :class="[
        'flex items-center w-full',
        collapsed ? 'justify-between md:justify-center h-16' : 'justify-between mb-6'
      ]"
    >
      <div class="flex items-center space-x-2">
        <!-- Logo -->
        <div
            class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold"
            :class="collapsed ? 'md:hidden' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <!-- Nom -->
        <span
            class="text-xl font-semibold text-gray-800"
            :class="collapsed ? 'block md:hidden' : 'block'"
        >
          Journal Santé
        </span>
      </div>

      <Bars3Icon
          @click="collapsed = !collapsed"
          class="w-6 h-6 text-black cursor-pointer hover:text-gray-700"
      />
    </div>

    <!-- INFO SEMAINE -->
    <div v-if="!collapsed" class="mb-6">
      <p class="text-xs text-gray-400">Week of Oct 21</p>
      <p class="text-sm text-gray-600">2024</p>
    </div>

    <!-- NAV -->
    <nav
        :class="[
        collapsed ? 'hidden md:flex md:mt-4 flex-col' : 'flex flex-col',
        'flex-1 gap-2 overflow-y-auto'
      ]"
    >
      <router-link
          v-for="item in menuItems"
          :key="item.key"
          :to="item.path"
          exact
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800"
          active-class="bg-indigo-100 text-indigo-900 font-medium"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span v-if="!collapsed">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- FOOTER -->
    <div
        :class="collapsed
        ? 'hidden md:flex flex-col gap-2 mt-auto'
        : 'mt-auto flex flex-col gap-2'"
    >
      <!-- Profil utilisateur -->
      <div v-if="!collapsed" class="px-3 py-2">
        <UserProfile />
      </div>
      
      <!-- Profil utilisateur condensé pour mobile/collapsed -->
      <div v-if="collapsed" class="px-1 py-2 md:px-2">
        <UserProfile />
      </div>
    </div>
  </aside>
</template>

<script>
import {
  HomeIcon,
  MoonIcon,
  PlayIcon,
  FaceSmileIcon,
  CakeIcon,
  Bars3Icon
} from '@heroicons/vue/24/outline'
import UserProfile from '@/components/UserProfile.vue'

export default {
  name: 'NavbarMenu',
  components: {
    HomeIcon,
    MoonIcon,
    PlayIcon,
    FaceSmileIcon,
    CakeIcon,
    Bars3Icon,
    UserProfile
  },
  data() {
    return {
      collapsed: false,
      menuItems: [
        { key: 'home', label: 'Accueil', path: '/', icon: 'HomeIcon' },
        { key: 'sleep', label: 'Sommeil', path: '/sleep', icon: 'MoonIcon' },
        { key: 'activity', label: 'Activité', path: '/activity', icon: 'PlayIcon' },
        { key: 'mood', label: 'Humeur', path: '/mood', icon: 'FaceSmileIcon' },
        { key: 'diet', label: 'Alimentation', path: '/diet', icon: 'CakeIcon' }
      ]
    }
  }
}
</script>

<style>
.transition-width {
  transition-property: width;
}
</style>
