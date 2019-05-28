<template>
  <q-page padding>
    <q-markup-table separator="horizontal" flat>
      <thead>
        <tr>
          <th class="text-center">时间</th>
          <th class="text-center">用途</th>
          <th class="text-center">金额</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.index" class="text-center">
          <td>
            <div class="column">
              <div class="col">{{ dateFormat(record.date) }}</div>
              <div class="col">{{ timeFormat(record.date) }}</div>
            </div>
          </td>
          <td>{{ record.use }}</td>
          <td>
            <div class="column">
              <div class="col">
                <span v-if="record.flat < 0">-</span>
                <span v-else>+</span>
                ¥{{ Math.abs(record.flat) }}
              </div>
              <div class="col">{{ record.token }}{{ currentToken }}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import { dateFormat, timeFormat } from '../../utils/DateFormatter'
import { mapState } from 'vuex'

export default {
  name: 'Records',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('fund', [
      'currentToken', 'records'
    ])
  },
  methods: {
    dateFormat, timeFormat
  }
}
</script>

<style>
</style>
