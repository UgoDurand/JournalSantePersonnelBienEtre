<!-- src/pages/HomePage.vue -->
<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8 min-w-0">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Today</h1>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-8">
      <!-- Sleep (view only) -->
      <DashboardCard
          class="w-full"
          title="Sleep"
          subtitle="Rest and recovery"
          value="8h 15m"
          label="Total sleep"
          image="/img/sleep.png"
          :to="{ name: 'Sleep' }"
          :show-add="false"
      />

      <!-- Diet (view only) -->
      <DashboardCard
          class="w-full"
          title="Diet"
          subtitle="Nutrition intake"
          value="2,100 kcal"
          label="Calories consumed"
          image="/img/food.png"
          :to="{ name: 'Diet' }"
          :show-add="false"
      />

      <!-- Physical Activity (view only) -->
      <DashboardCard
          class="w-full"
          title="Physical Activity"
          subtitle="Movement and exercise"
          value="30 min"
          label="Exercise duration"
          image="/img/sport.png"
          :to="{ name: 'Activity' }"
          :show-add="false"
      />

      <!-- Mood (add only) -->
      <DashboardCard
          class="w-full"
          title="Mood"
          subtitle="Emotional well-being"
          value="Happy"
          label="Overall mood"
          image="/img/happy.png"
          :to="{ name: 'Mood' }"
          :show-add="false"
      />
    </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue'

export default {
  name: 'HomePage',
  components: { DashboardCard }
}
</script>
