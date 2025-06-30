<template>
  <main class="bg-gray-50 p-4 sm:p-8 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-3xl font-bold text-gray-900">Today's Food Log</h1>
      <div class="flex items-center gap-2">
        <button
            @click="onAddAllMeals"
            class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition hover:scale-105"
        >
          <PlusIcon class="w-5 h-5 mr-2" /> Add Food
        </button>
        <button
            @click="onSaveLog"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition hover:scale-105"
        >
          <CheckIcon class="w-5 h-5 mr-2" /> Save Log
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Meals -->
      <div class="lg:col-span-2 space-y-6">
        <MealSection
            v-for="meal in meals"
            :key="meal.key"
            v-model="entries[meal.key]"
            :label="meal.label"
            :placeholder="meal.placeholder"
        />
      </div>

      <!-- Summary & Water -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Daily Summary</h2>
          <div class="grid grid-cols-2 gap-4">
            <SummaryCard title="Calories" :value="summary.calories" unit="kcal" />
            <SummaryCard title="Protein"  :value="summary.protein"  unit="g"   bg="bg-rose-100" />
            <SummaryCard title="Carbs"    :value="summary.carbs"    unit="g"   bg="bg-amber-100" />
            <SummaryCard title="Lipids"   :value="summary.fats"     unit="g"   bg="bg-emerald-100" />
          </div>
        </div>

        <WaterIntake
            :water="water"
            :target-volume="targetVolume"
            :target-cups="targetCups"
            @add-glass="onLogWater"
            @remove-glass="onRemoveWater"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { PlusIcon, CheckIcon } from '@heroicons/vue/24/solid'
import MealSection  from '@/components/MealSection.vue'
import SummaryCard  from '@/components/SummaryCard.vue'
import WaterIntake  from '@/components/WaterIntake.vue'

/* ---------- repas & entrées ---------- */
const meals = [
  { key: 'breakfast', label: 'Breakfast', placeholder: 'Oatmeal with berries' },
  { key: 'lunch',     label: 'Lunch',     placeholder: 'Chicken salad sandwich' },
  { key: 'dinner',    label: 'Dinner',    placeholder: 'Salmon with veggies' },
  { key: 'snacks',    label: 'Snacks',    placeholder: 'Apple + peanut butter' }
]
const entries = reactive({ breakfast: '', lunch: '', dinner: '', snacks: '' })
function onAddAllMeals() {
  meals.forEach(m => {
    if (entries[m.key]) {
      console.log(`Add ${entries[m.key]} to ${m.label}`)
      entries[m.key] = ''
    }
  })
}

/* ---------- résumé nutritionnel (statique démo) ---------- */
const summary = reactive({ calories: 1800, protein: 75, carbs: 220, fats: 60 })

/* ---------- eau ---------- */
const glassSize = 250        // ml
const targetVolume = 1500    // ml
const targetCups = targetVolume / glassSize
const water = ref(0)
function onLogWater() { water.value += glassSize }
function onRemoveWater() { if (water.value >= glassSize) water.value -= glassSize }

/* ---------- sauvegarde ---------- */
function onSaveLog() {
  console.log('Save log', { entries: { ...entries }, summary: { ...summary }, water: water.value })
}
</script>
