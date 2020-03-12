<template>
  <div class="more">
    <router-link to="/"><Logo /></router-link>
    <ForecastWheather />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';
import ForecastWheather from '@/components/ForecastWheather.vue';

export default {
  name: 'More',
  components: {
    Logo,
    ForecastWheather,
  },
};
</script>

<style scoped lang="scss">

</style>
