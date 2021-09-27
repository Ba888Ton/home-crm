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
          :key="categories.length + updateCount"
          v-if="categories.length"
          :categories="categories"
          @edited="editCategory"
          @deleted="deleteCategory"
        />
        <div v-else class="fff">There is nothing to reduct. Sorry.</div>
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
      updateCount: 0
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    async editCategory(category) {
      const idx = this.categories.findIndex(c => c.id === category.catId)
      this.categories[idx].name = category.name
      this.categories[idx].limit = category.limit
      this.updateCount++
    },
    async deleteCategory() {
      await this.$store.dispatch('fetchCategories')
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
