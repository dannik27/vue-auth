<template>
  <div class="block reg-block">
    <span>
      Регистрация нового пользователя:
    </span>
    <label>Ваше имя: <input type="text" v-model="regForm.name"/></label>
    <label>Логин: <input type="text" v-model="regForm.login"/></label>
    <label>Пароль: <input type="text" v-model="regForm.password"/></label>
    <button @click="doRegister()">Регистрация</button>
    <span v-if="regResponse">Register: {{ regResponse }}</span>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {

      regForm: {
        name: "",
        login: "",
        password: ""
      },
      regResponse: null
    }
  },
  methods: {
    doRegister() {
      axios.post('http://localhost:3000/auth/register', this.regForm)
        .then((response) => {
          this.regResponse = response.data
        })
        .catch(error => {
          this.regResponse = error.response.data
        })
    }
  }
}
</script>

<style>
</style>
