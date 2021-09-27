<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="updateCategory">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cats in categories" :key="cats.id" :value="cats.id">
              {{ cats.name }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input
            id="newName"
            type="text"
            v-model="newName"
            :class="{ invalid: $v.newName.$dirty && !$v.newName.required }"
          />
          <label for="newName">Новое название</label>
          <span v-if="!$v.newName.required" class="helper-text invalid">
            Введите название категории
          </span>
        </div>
        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="newLimit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Новый лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная величина
          </span>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn waves-effect waves-light blue" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </div>
          <div class="col">
            <button
              class="btn waves-effect waves-blue disabled blue m-l-2 ml-2"
              type="button"
              @click="deleteCategory"
            >
              Удалить<i class="material-icons right">delete</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      select: null,
      current: null,
      newName: "",
      newLimit: 100,
    };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  validations: {
    newName: { required },
    limit: { minValue: minValue(10) },
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  created() {
    const { id, name, limit } = this.categories[0];
    this.current = id;
    this.newName = name;
    this.newLimit = limit;
  },
  watch: {
    current(catId) {
      const { name, limit } = this.categories.find((c) => c.id === catId);
      this.newLimit = limit;
      this.newName = name;
    },
  },
  destroyed() {
    this.select && this.select.destroy();
  },
  methods: {
    async updateCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const idx = this.categories.findIndex(el => el.id === this.current)
      if (this.categories[idx].name === this.newName && 
          this.categories[idx].limit === this.newLimit
      ) {
        this.$message('Не дурно бы сначала что-нибудь поменять')
        return
      }
      try {
        const categoryData = {
          catId: this.current,
          name: this.newName,
          limit: this.newLimit,
        };
        await this.$store.dispatch("editCategory", categoryData);
        this.$v.$reset();
        this.$message(`Категория "${this.newName}" была изменена`);
        this.$emit("edited", categoryData);
      } catch (error) {
        new Error(error);
      }
    },
    async deleteCategory() {
      await this.$store.dispatch("deleteCategory", this.current);
      this.$v.$reset();
      this.$message(`Категория "${this.newName}" была удалена`);
      this.$emit("deleted", this.newName);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
