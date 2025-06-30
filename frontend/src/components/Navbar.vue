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
            class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold border border-gray-200"
            :class="collapsed ? 'md:hidden' : ''"
        >
          U
        </div>
        <!-- Nom -->
        <span
            class="text-xl font-semibold text-gray-800"
            :class="collapsed ? 'block md:hidden' : 'block'"
        >
          User
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
          v-for="day in days"
          :key="day.key"
          :to="day.path"
          exact
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800"
          active-class="bg-gray-200 text-gray-900 font-medium"
      >
        <CalendarIcon class="w-5 h-5" />
        <span v-if="!collapsed">{{ day.label }}</span>
        <div v-if="day.key === 'mon' && !collapsed" class="flex items-center gap-1 ml-auto">
          <BadgeIcon color="bg-blue-500" />
          <BadgeIcon color="bg-green-500" />
          <BadgeIcon color="bg-orange-500" />
          <BadgeIcon color="bg-red-500" />
        </div>
      </router-link>
    </nav>

    <!-- FOOTER -->
    <div
        :class="collapsed
        ? 'hidden md:flex flex-col gap-2 mt-auto'
        : 'mt-auto flex flex-col gap-2'"
    >
      <button class="flex items-center justify-start gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
        <Cog6ToothIcon class="w-5 h-5 text-gray-400" />
        <span v-if="!collapsed">Settings</span>
      </button>
      <button class="flex items-center justify-start gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
        <ArrowRightEndOnRectangleIcon class="w-5 h-5 text-gray-400" />
        <span v-if="!collapsed">Log out</span>
      </button>
    </div>
  </aside>
</template>

<script>
import {
  CalendarIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon,
  Bars3Icon
} from '@heroicons/vue/24/outline'
import BadgeIcon from '@/components/Badge.vue'

export default {
  name: 'NavbarMenu',
  components: {
    CalendarIcon,
    Cog6ToothIcon,
    ArrowRightEndOnRectangleIcon,
    Bars3Icon,
    BadgeIcon
  },
  data() {
    return {
      collapsed: false,
      days: [
        { key: 'mon', label: 'Mon', path: '/' },
        { key: 'tue', label: 'Tue', path: '/tue' },
        { key: 'wed', label: 'Wed', path: '/wed' },
        { key: 'thu', label: 'Thu', path: '/thu' },
        { key: 'fri', label: 'Fri', path: '/fri' },
        { key: 'sat', label: 'Sat', path: '/sat' },
        { key: 'sun', label: 'Sun', path: '/sun' }
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
