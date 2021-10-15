<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валютах</span>
        <p v-for="(item, title) in currency" :key="item.id" class="currency-line">
          <span> <i>{{ title }}</i> &nbsp;&nbsp;&nbsp;&nbsp; </span>
          <span>  {{ item }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeBill',
  props: {
    cur: {type: Object},
  },
  computed: {
    currency() {
      let billByCurrency = {}
      for (const curName in this.cur) {
        if (Object.hasOwnProperty.call(this.cur, curName)) {
          const equivalent = (this.bill / this.cur[curName]).toFixed(2)
          billByCurrency[curName] = equivalent
        }
      }
      return billByCurrency
    },
    bill() {
      return this.$store.getters.info.bill
    }
  },
}
</script>
