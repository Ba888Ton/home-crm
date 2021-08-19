<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesCreate @created="addNewCategory"/>
        <CategoriesEdit 
          :categories="categories"
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
      categories: []
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories);
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
  },
};
</script>

<style lang="scss" scoped>
</style>
