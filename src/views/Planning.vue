<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>12 212</h4>
    </div>
    <loader v-if="loading" />
    <p v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Создать новую категорию</router-link> </p>
    <section v-else>
      <div>
        <p>
          <strong>Девушка:</strong>
          12 122 из 14 0000
        </p>
        <div class="progress">
          <div class="determinate green" style="width: 40%"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue';
export default {
  components: { Loader },
  name: 'Planning',
  data() {
    return {
      loading: true,
      categories: []
    }
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    console.log(records, categories);
    this.loading = false
  },
};
</script>

<style lang="scss" scoped>
</style>
