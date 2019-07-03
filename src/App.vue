<template>
  <div class="container">
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
// import HelloWorld from './components/HelloWorld.vue'

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
        username: "empty",
        token: "empty"
      },
      regForm: {
        name: "",
        login: "",
        password: ""
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

    doRegister() {
      axios.post('http://localhost:3000/auth/register', this.regForm)
        .then((response) => {
          this.regResponse = response.data
        })
        .catch(error => {
          this.regResponse = error.response.data
        })
    },

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
      this.session.username = "empty"
      this.session.token = "empty"
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
.container {
  background-color: #f3f3f3;
  padding: 20px;
  max-width: 500px;
}

.reg-block {
}

.user-block {
}

.block {
  margin-bottom: 20px;
  background-color: #ffffff;
  width: 500px;
  border-radius: 5px;
}

.block > * {
  display: block;
  margin-bottom: 10px;
}

.block span {
  word-wrap: break-word;
}
</style>
