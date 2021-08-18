<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cur, key) in currency" :key="cur">
              <td>{{ key }}</td>
                <EditableInput @new-currency-value="newCurrencyValue({[key]: $event})" :currency="cur"/>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import EditableInput from "../../views/EditableInput.vue";
export default {
  components: { EditableInput },
  props: ["currency"],
  methods: {
    async newCurrencyValue(newValue) {
      await this.$store.dispatch('setCurrencyValue', newValue)
      this.$emit('refresh')
    }
  },
};
</script>
<style lang="scss">
  td {
    padding: 10px 5px;
  }
</style>
