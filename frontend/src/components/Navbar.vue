<template>
  <aside class="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between px-4 py-6 shadow-sm">
    <!-- Logo + Titre -->
    <div>
      <div class="flex items-center space-x-2 mb-10">
        <div class="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center text-white font-bold">
          W
        </div>
        <span class="text-xl font-semibold text-gray-800">Wellness</span>
      </div>

      <!-- Semaine -->
      <div class="mb-6">
        <p class="text-xs text-gray-400">Week of Oct 21</p>
        <p class="text-sm text-gray-600">2024</p>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col gap-2">
        <!-- Lundi avec pastilles -->
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 font-medium">
          <CalendarIcon class="w-5 h-5 text-gray-500" />
          Mon
          <div class="flex items-center gap-1 ml-auto">
            <BadgeIcon color="bg-blue-500" />
            <BadgeIcon color="bg-green-500" />
            <BadgeIcon color="bg-orange-500" />
            <BadgeIcon color="bg-red-500" />
          </div>
        </button>

        <!-- Les autres jours -->
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <CalendarIcon class="w-5 h-5 text-gray-400" />
          Tue
        </button>
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <CalendarIcon class="w-5 h-5 text-gray-400" />
          Wed
        </button>
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <CalendarIcon class="w-5 h-5 text-gray-400" />
          Thu
        </button>
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <CalendarIcon class="w-5 h-5 text-gray-400" />
          Fri
        </button>
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <CalendarIcon class="w-5 h-5 text-gray-400" />
          Sat
        </button>
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <CalendarIcon class="w-5 h-5 text-gray-400" />
          Sun
        </button>
      </nav>
    </div>

    <!-- Bas de la navbar -->
    <div class="flex flex-col gap-2">
      <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
        <Cog6ToothIcon class="w-5 h-5 text-gray-400" />
        Settings
      </button>
      <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
        <ArrowRightEndOnRectangleIcon class="w-5 h-5 text-gray-400" />
        Log out
      </button>
    </div>
  </aside>
</template>

<script>
import { CalendarIcon, Cog6ToothIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/outline'
import BadgeIcon from '@/components/Badge.vue'

export default {
  name: 'NavbarMenu',
  components: {
    CalendarIcon,
    Cog6ToothIcon,
    ArrowRightEndOnRectangleIcon,
    BadgeIcon
  }
}
</script>
