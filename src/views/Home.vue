<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :cur="currency" />
      <HomeCurrency :currency="currency" @refresh="refresh" />
    </div>
  </div>
</template>
<script>
import HomeBill from "@/components/app/HomeBill";
import HomeCurrency from "@/components/app/HomeCurrency";
import Loader from "../components/app/Loader.vue";
export default {
  name: "Home",
  data: () => ({
    loading: true,
    currency: null,
    changeValue: {},
  }),
  components: {
    HomeBill,
    HomeCurrency,
    Loader,
  },
  async mounted() {
    this.currency = await this.$store.dispatch("getCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.currency = await this.$store.dispatch("getCurrency");
    },
  },
};
</script>
