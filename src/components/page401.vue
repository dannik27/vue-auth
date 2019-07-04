<template>
  <div class="block">
    <div>Для доступа к этой странице необходимо авторизоваться.</div>
    <router-link to="/login" tag="button">Авторизация</router-link>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
