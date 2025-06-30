<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th v-for="col in columns" :key="col.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          {{ col.label }}
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
      <tr v-for="(row, i) in data" :key="i">
        <td v-for="col in columns" :key="col.key" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ row[col.key] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    columns: Array,  // [{ key: 'date', label: 'Date' }, …]
    data: Array
  }
}
</script>
