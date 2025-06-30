<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8 min-w-0">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Today</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-8">
      <DashboardCard
          class="w-full"
          title="Sleep"
          subtitle="Rest and recovery"
          value="8h 15m"
          label="Total sleep"
          image="/img/sleep.png"
          :to="{ name: 'Sleep' }"
      />
      <DashboardCard
          class="w-full"
          title="Diet"
          subtitle="Nutrition intake"
          value="2,100 kcal"
          label="Calories consumed"
          image="/img/food.png"
          @add="onAdd"
          @view="onView"
      />
      <DashboardCard
          class="w-full"
          title="Physical Activity"
          subtitle="Movement and exercise"
          value="30 min"
          label="Exercise duration"
          image="/img/sport.png"
          :to="{ name: 'Activity' }"
      />
      <DashboardCard
          class="w-full"
          title="Mood"
          subtitle="Emotional well-being"
          value="Happy"
          label="Overall mood"
          image="/img/happy.png"
          @add="$router.push({ name: 'Mood' })"
          :show-view="false"
      />
    </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue'

export default {
  name: 'HomePage',
  components: { DashboardCard },
  methods: {
    onAdd(section) {
      console.log('Add data to', section)
    },
    onView(section) {
      console.log('View details of', section)
    }
  }
}
</script>
