<template>
  <div class="flex">
    <Navbar />

    <main class="flex-1 bg-gray-50 p-8">
      <!-- En-tête avec juste le titre -->
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Today</h1>

      <!-- Grille 2×2, cartes plein largeur de colonne -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DashboardCard
            title="Sleep"
            subtitle="Rest and recovery"
            value="8h 15m"
            label="Total sleep"
            image="/img/sleep.png"
            @add="onAdd"
            @view="onView"
        />
        <DashboardCard
            title="Diet"
            subtitle="Nutrition intake"
            value="2,100 kcal"
            label="Calories consumed"
            image="/img/food.png"
            @add="onAdd"
            @view="onView"
        />
        <DashboardCard
            title="Physical Activity"
            subtitle="Movement and exercise"
            value="30 min"
            label="Exercise duration"
            image="/img/sport.png"
            @add="onAdd"
            @view="onView"
        />
        <DashboardCard
            title="Mood"
            subtitle="Emotional well-being"
            value="Happy"
            label="Overall mood"
            image="/img/happy.png"
            @add="onAdd"
            @view="onView"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import DashboardCard from '@/components/DashboardCard.vue';

export default {
  name: 'HomePage',
  components: {
    Navbar,
    DashboardCard
  },
  methods: {
    onAdd(section) {
      console.log('Add data to', section);
    },
    onView(section) {
      console.log('View details of', section);
    }
  }
};
</script>
