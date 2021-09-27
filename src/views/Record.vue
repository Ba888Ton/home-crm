<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="this.loading" />
    <p v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Создать новую категорию</router-link> </p>
    <form class="form">
      <div class="input-field">
        <select ref="select">
          <option>name cat</option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" />
          <span>Доход</span>
        </label>
      </p>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" />
          <span>Расход</span>
        </label>
      </p>
      <div class="input-field">
        <input id="amount" type="number" />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>
      <div class="input-field">
        <input id="description" type="text" />
        <label for="description">Описание</label>
        <span class="helper-text invalid">description пароль</span>
      </div>
      <button class="btn waves-effect waves-light blue text-white " type="submit">
        Создать
        <i class="material-icons right ">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import Loader from '../components/app/Loader.vue';
export default {
  components: { Loader },
  name: 'Record',
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    this.select = await window.M.FormSelect.init(this.$refs.select);
    // window.M.updateTextFields();
  },
  data() {
    return {
      categories: [],
      loading: true
    }
  },
  destroyed() {
    this.select && this.select.destroy();
  },
};
</script>

<style lang="scss" scoped>
</style>
