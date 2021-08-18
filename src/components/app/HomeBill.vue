<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в рублях</span>
        <p class="currency-line">
          <span> {{ bill }} р</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeBill',
  computed: {
     bill() {
      return this.$store.getters.info.bill
    }
  },
}
</script>
