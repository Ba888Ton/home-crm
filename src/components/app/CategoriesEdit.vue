<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="updateCategory">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option 
              v-for="cats in categories" 
              :key="cats.id"
              :value="cats.id"
            > 
              {{cats.name}} 
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input 
            id="newName" 
            type="text" 
            v-model="newName"
            :class="{invalid: $v.newName.$dirty && !$v.newName.required}"
          />
          <label for="newName">Новое название</label>
          <span 
            v-if="!$v.newName.required" 
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>
        <div class="input-field">
          <input 
            id="limit" 
            type="number"
            v-model.number="newLimit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">Новый лимит</label>
          <span 
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная величина 
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  data() {
  return {
      select: null,
      name: '',
      limit: 100,
      current: null,
      newName: '',
      newLimit: ''
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
  },
  created () {
    if (this.categories.length) {
      const { id, name, limit} = this.categories[0]
      this.current = id
      this.newName = name
      this.newLimit = limit
    }
  },
  mounted () {
    window.M.updateTextFields();
    this.select = window.M.FormSelect.init(this.$refs.select)
  },
  validations: {
    name: { required },
    newName: { required },
    limit: { minValue: minValue(10) },
  },
  watch: {
    current(catId) {
      const {name, limit} = this.categories.find(c => c.id === catId)
      this.limit = limit
      this.name = name
    },
    categories() {
      console.log(this.categories);
    }
  },
  destroyed() {
    this.select && this.select.destroy()
  },
  methods: {
    async updateCategory () {
      const newValues = {
        name: this.newName,
        limit: this.newLimit
      }
      const category = await this.$store.dispatch('editCategory', newValues)
      console.log(category);
      debugger
      this.$v.$reset()
      this.$message(`Категория "${this.newName}" была изменена`)
      this.$emit('edited', this.newName)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
