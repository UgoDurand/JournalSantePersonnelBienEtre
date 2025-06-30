<template>
  <main class="bg-gray-50 p-4 sm:p-8 min-h-screen min-w-0">
    <!-- header + bouton -->
    <PageHeader
        title="Physical Activity"
        subtitle="Movement and exercise"
        buttonText="Add Activity"
        @add="onAddActivity"
    />

    <!-- Today's Activities -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Today's Activities</h2>
      <div class="space-y-4">
        <!-- on utilise ActivityItem -->
        <ActivityItem
            v-for="(act,i) in todayActivities"
            :key="i"
            :name="act.name"
            :duration="act.duration"
            :time="act.time"
            :icon="act.icon"
        />
      </div>
    </section>
  </main>
</template>

<script>
import PageHeader  from '@/components/PageHeader.vue'
import ActivityItem from '@/components/ActivityItem.vue'

import { CalendarIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'ActivityDetails',
  components: { PageHeader, ActivityItem },
  data() {
    return {
      todayActivities: [
        { name: 'Morning Run',   duration: '30 min', time: '8:00 AM',  icon: CalendarIcon },
        { name: 'Yoga Session',  duration: '45 min', time: '9:00 AM',  icon: CalendarIcon },
        { name: 'Weightlifting', duration: '60 min', time: '10:00 AM', icon: CalendarIcon }
      ]
    }
  },
  methods: {
    onAddActivity() {
      // ta logique pour ajouter une activité
      console.log('Ajouter une nouvelle activité')
    }
  }
}
</script>
