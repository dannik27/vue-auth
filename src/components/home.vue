<template>
  <div class="container">
    {{checkResponse}}
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      checkResponse: null
    }
  },
  mounted() {
    axios.get('http://localhost:3000/auth/check')
      .then((response) => {
        this.checkResponse = response.data
      })
  },
}
</script>

<style>
</style>
