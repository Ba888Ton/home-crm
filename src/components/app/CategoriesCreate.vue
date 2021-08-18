<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <form>
        <div class="input-field">
          <input 
            id="name" 
            type="text" 
            v-model="value"
            :class="{
              invalid: $v.name.dirty || $v.name.required
            }"
          />
          <label for="name">Название</label>
          <span 
            v-if="$v.name.dirty || $v.name.required" 
            class="helper-text invalid"
          >Введите название</span>
        </div>
        <div class="input-field">
          <input 
            id="limit" 
            type="number"
            v-model="limit"
              :class="{
              invalid: $v.name.dirty || $v.name.required
            }"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">Минимальная величина</span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  name: 'CategoriesCreate',
  data: () => ({
      value: '',
      limit: 1
    })
  ,
  validations: {
    name: { required },
    limit: { minValue: minValue(10) },
  },
  methods: {
    create() {
      
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
