<template>
  <form class="card auth-card" @submit.prevent="registerHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >Поле email не должно быть пустым
        </small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >Поле email ведено некорректно
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >Поле пароль не должно быть пустым
        </small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >Введите не меньше {{ this.$v.password.$params.minLength.min }}
          символов. Сейчас он {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input 
          id="name" 
          type="text"
          v-model.trim="name"
          :class="{
            invalid:
            ($v.name.$dirty && !$v.name.required) ||
            ($v.name.$dirty && !$v.name.minLength),
          }"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >Введите ваше имя
        </small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
          >Введите не меньше {{ this.$v.name.$params.minLength.min }}-ми
          символов. Сейчас он {{ name.length }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
        <small
          v-if="$v.agree.$dirty && !agree"
          class="helper-text invalid"
          ><br/>Увы и ах. Возвращайтесь когда будете готовы согласиться с правилами
        </small>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
    name: { required, minLength: minLength(2) },
    agree: { checked: v => v },
  },
  methods: {
    registerHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      } 
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }   
      console.log(formData)
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
