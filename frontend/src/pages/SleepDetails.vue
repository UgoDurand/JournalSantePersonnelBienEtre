<template>
  <main class="bg-gray-50 p-4 sm:p-8 min-h-screen min-w-0">
    <!-- Header de page -->
    <PageHeader
        title="Sleep"
        subtitle="Track your sleep to understand your patterns and improve your rest."
        buttonText="Add Sleep Data"
        @add="onAddSleep"
    />

    <!-- Today's Entry -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Today's Entry</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard label="Bedtime" value="22 h 30" />
        <StatsCard label="Wake-up" value="06 h 45" />
        <StatsCard label="Duration" value="8 h 15" />
        <StatsCard label="Quality" value="Good" />
      </div>
    </section>

    <!-- Sleep Analysis -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Sleep Analysis</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Average Sleep Duration" value="7 h 30 m" :delta="5" />
        <StatsCard label="Sleep Efficiency" value="85 %" :delta="-2" />
        <StatsCard label="Consistency" value="70 %" :delta="3" />
      </div>
    </section>

    <!-- Sleep History -->
    <section>
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Sleep History</h2>
      <HistoryTable
          :columns="[
          { key: 'date',      label: 'Date'       },
          { key: 'duration',  label: 'Duration'   },
          { key: 'efficiency',label: 'Efficiency' },
          { key: 'consistency',label:'Consistency'}
        ]"
          :data="history"
      />
    </section>
  </main>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import StatsCard from '@/components/StatsCard.vue'
import HistoryTable from '@/components/HistoryTable.vue'

export default {
  name: 'SleepDetails',
  components: {
    PageHeader,
    StatsCard,
    HistoryTable
  },
  data() {
    return {
      history: [
        { date: 'July 14, 2024', duration: '7 h 45 m', efficiency: '88 %', consistency: '75 %' },
        { date: 'July 13, 2024', duration: '7 h 15 m', efficiency: '82 %', consistency: '68 %' },
        { date: 'July 12, 2024', duration: '8 h 00 m', efficiency: '90 %', consistency: '80 %' },
        { date: 'July 11, 2024', duration: '6 h 50 m', efficiency: '78 %', consistency: '65 %' },
        { date: 'July 10, 2024', duration: '7 h 30 m', efficiency: '85 %', consistency: '70 %' }
      ]
    }
  },
  methods: {
    onAddSleep() {
      console.log('Ajouter une nouvelle donnée de sommeil')
    }
  }
}
</script>
