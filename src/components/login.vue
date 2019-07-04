<template>
  <div>
    <div class="block login-block">
      <span>
        Авторизация:
      </span>
      <label>Логин: <input type="text" v-model="loginForm.login"/></label>
      <label>Пароль: <input type="text" v-model="loginForm.password"/></label>
      <button @click="doLogin()">Войти</button>
      <span v-if="loginResponse">{{ loginResponse }}</span>
    </div>

    <div class="block user-block">
      <span>User: {{ session.username }}</span>
      <span>Token: {{ session.token }}</span>
      <button @click="doLogout()">Выйти</button>
    </div>

    <div class="block">
      <button @click="doCheck()">Проверка доступа</button>
      <span v-if="checkResponse">Check: {{ checkResponse }}</span>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

function authHeaders() {
  return {
    headers: {
      authorization: localStorage.token
    }
  }
}

export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      session: {
        username: null,
        token: null
      },
      loginForm: {
        login: "",
        password: ""
      },
      regResponse: null,
      loginResponse: null,
      checkResponse: null,
    }
  },
  methods: {
    doLogin() {
      axios.post('http://localhost:3000/auth/login', this.loginForm)
        .then((response) => {
          this.session.username = response.data.user
          this.session.token = response.data.token

          this.loginResponse = null
        })
        .catch(() => {
          this.loginResponse = 'Login failed'
        })
    },
    doLogout() {
      this.session.username = null
      this.session.token = null
    },
    doCheck() {
      axios.get('http://localhost:3000/auth/check', authHeaders())
        .then((response) => {
          this.checkResponse = response.data
        })
        .catch(() => {
          this.checkResponse = "Check failed"
        })
    }
  },
  mounted() {
    if (localStorage.session) {
      this.session.username = localStorage.username
      this.session.token = localStorage.token
    }
  },
  watch: {
    session: {
      handler: (session) => {
        localStorage.username = session.username
        localStorage.token = session.token
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
