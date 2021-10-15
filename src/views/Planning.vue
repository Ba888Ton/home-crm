<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4> {{info.bill}} </h4>
    </div>
    <loader v-if="loading" />
    <p v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Создать новую категорию</router-link> </p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.name }}</strong>
          {{ cat.spend }} 
          из 
          {{cat.limit}}
        </p>
        <div class="progress" v-tooltip="cat.tooltipText">
          <div 
          class="determinate" 
          :class="[cat.progressColor]"
          :style="{width: `${cat.percentSpend}%`}"
          ></div>
        </div>
        <hr />
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue';
import {mapGetters} from 'vuex'

export default {
  components: { Loader },
  name: 'Planning',
  data() {
    return {
      loading: true,
      categories: [],
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
      .filter(rec => rec.categoryId === cat.id)
      .filter(rec => rec.type === "outcome")
      .reduce((total, rec) => total + rec.amount, 0)
      const percent = (spend * 100 / cat.limit).toFixed()
      const percentSpend = percent > 100 ? 100 : percent
      const progressColor = percentSpend < 60 
        ? "green" 
        : percentSpend > 95 
          ? "red" 
          : "yellow"
      const tooltip = cat.limit - spend
      const tooltipText = tooltip > 0 ? `Осталось в категории ${tooltip}` : `Вы превысили лимит на ${Math.abs(tooltip)}`
      return {...cat, spend, percentSpend, progressColor, tooltipText}
    }
    )
    this.loading = false
  },
};
</script>

<style lang="scss" scoped>
</style>
