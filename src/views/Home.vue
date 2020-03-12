<template>
  <div class="home">
    <Logo desc />
    <Form />
    <CurrentWeather />
  </div>
</template>

<script>
// @ is an alias to /src

import Logo from '@/components/Logo.vue';
import Form from '@/components/Form.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';

export default {
  name: 'Home',
  components: {
    Logo,
    CurrentWeather,
    Form,
  },
};
</script>

<style scoped lang="scss">

</style>
