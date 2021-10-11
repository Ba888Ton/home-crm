<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="this.loading" />
    <p v-else-if="!categories.length">
      Категорий пока нет
      <router-link to="/categories">Создать новую категорию</router-link>
    </p>
    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>
      <div class="input-field">
        <input
          v-model.number="amount"
          id="amount"
          type="number"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Введите сумму > 1
        </span>
      </div>
      <div class="input-field">
        <input
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required,}"
          id="description"
          type="text"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание
        </span>
      </div>
      <button
        class="btn waves-effect waves-light blue text-white"
        type="submit"
      >
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import Loader from "../components/app/Loader.vue";
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from 'vuex'

export default {
  components: { Loader },
  name: "Record",
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields()
    }, 0);
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  data() {
    return {
      categories: [],
      category: null,
      loading: true,
      type: "outcome",
      amount: 1,
      description: "",
    };
  },
  destroyed() {
    this.select && this.select.destroy();
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' 
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {console.log(error);}
      } else {
        this.$message('Мало деняк. (надо еще: '+ (this.amount - this.info.bill) +')')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
