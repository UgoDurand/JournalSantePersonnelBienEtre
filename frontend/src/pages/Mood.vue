<!-- src/pages/Mood.vue -->
<template>
  <main class="bg-gray-50 p-4 sm:p-8 min-h-screen min-w-0">
    <!-- En-tête avec Save Entry + coche -->
    <PageHeader
        title="How are you feeling today?"
        subtitle="Rate your mood and energy level to keep track of your journey."
        buttonText="Save Entry"
        :icon="CheckIcon"
        @add="onSave"
    />

    <!-- Mood -->
    <OptionSelector
        v-model="selectedMood"
        title="Mood"
        icon="😊"
        icon-color="text-indigo-500"
        :options="moodOptions"
    />

    <!-- Energy Level -->
    <OptionSelector
        v-model="selectedEnergy"
        title="Energy Level"
        icon="⚡️"
        icon-color="text-yellow-500"
        :options="energyOptions"
    />
  </main>
</template>

<script>
import PageHeader     from '@/components/PageHeader.vue'
import OptionSelector from '@/components/OptionSelector.vue'
import {CheckIcon} from "@heroicons/vue/16/solid";

export default {
  name: 'MoodPage',
  components: { PageHeader, OptionSelector },
  data() {
    return {
      moodOptions: [
        { value: 'Awful',   emoji: '😢' },
        { value: 'Bad',     emoji: '😞' },
        { value: 'Neutral', emoji: '😐' },
        { value: 'Good',    emoji: '🙂' },
        { value: 'Great',   emoji: '😃' }
      ],
      energyOptions: [
        { value: 'Sick',      emoji: '🤒' },
        { value: 'Tired',     emoji: '😴' },
        { value: 'Neutral',   emoji: '😐' },
        { value: 'Fit',       emoji: '💪' },
        { value: 'Energetic', emoji: '⚡️' }
      ],
      selectedMood:   'Neutral',
      selectedEnergy: 'Neutral'
    }
  },
  methods: {
    CheckIcon,
    onSave() {
      console.log(
          'Mood:', this.selectedMood,
          'Energy Level:', this.selectedEnergy
      )
      this.$router.back()
    }
  }
}
</script>
