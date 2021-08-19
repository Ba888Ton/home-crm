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
            id="name" 
            type="text" 
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
          />
          <label for="name">Новое название</label>
          <span 
            v-if="$v.name.$dirty && !$v.name.required" 
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>
        <div class="input-field">
          <input 
            id="limit" 
            type="number"
            v-model.number="limit"
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
      this.name = name
      this.limit = limit
    }
  },
  mounted () {
    window.M.updateTextFields();
    this.select = window.M.FormSelect.init(this.$refs.select)
  },
  data() {
    return {
      select: null,
      name: '',
      limit: 100,
      current: null
    }
  },
  validations: {
    name: { required },
    limit: { minValue: minValue(10) },
  },
  watch: {
    current(catId) {
      const {name, limit} = this.categories.find(c => c.id === catId)
      this.limit = limit
      this.name = name
    }
  },
  destroyed() {
    this.select && this.select.destroy()
  },
  methods: {
    updateCatrgory () {
      
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
