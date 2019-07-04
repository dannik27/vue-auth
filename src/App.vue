<template>
  <div class="container">
    <router-link to="/register" tag="button">Регистрация</router-link>
    <router-link to="/login" tag="button">Авторизация</router-link>
    <router-link to="/home" tag="button">Личный кабинет</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
}
</script>

<style>
.container {
  background-color: #f3f3f3;
  padding: 20px;
  max-width: 500px;
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
button {
  margin: 10px;
}
</style>
