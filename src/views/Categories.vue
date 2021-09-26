<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section v-if="loading">
      <div class="row">
        Loading ...
      </div>
    </section>
    <section v-else>
      <div class="row">
        <CategoriesCreate 
          @created="addNewCategory"
        />
        <CategoriesEdit 
          :categories="categories"
          @edited="editCategory"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/app/CategoriesCreate'
import CategoriesEdit from '@/components/app/CategoriesEdit'

export default {
  name: 'Categories',
  components: {
    CategoriesCreate, CategoriesEdit
  },
  data() {
    return {
      categories: [],
      loading: true,
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    async editCategory(name) {
      console.log('in categories :::', name);
      // this.categories = await this.$store.dispatch('fetchCategories')
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
};
</script>

<style lang="scss" scoped>
</style>
