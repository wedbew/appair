<template>
  <div class="logo">
    <div class="logo__wrapper" :class="{ 'logo__wrapper--left': !desc }">
      <span class="icon-cloud logo__icon" :class="{ 'logo__icon--small': !desc }"></span>
      <h1 class="logo__name" :class="{ 'logo__name--small': !desc }">AirApp</h1>
    </div>
    <p v-if="desc" class="logo__desc">Check the weather! Enter the city name,
        or leave empty for geolocation</p>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    desc: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import './../assets/icomoon/style.css';
  @import './../assets/styles/globals.scss';
  .logo {
    @include rwd('phone') {
      max-width: 100%;
    }
    width: 100%;
    margin-bottom: $gap;
    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      &--left {
        justify-content: start;
      }
    }
    &__icon {
      @include rwd('phone') {
        font-size: 50px;
      }
      font-size: 80px;
      margin: 0;
      margin-right: 20px;
      &--small {
        font-size: 50px;
      }
    }
    &__name {
      @include rwd('phone') {
        font-size: 30px;
      }
      font-size: 50px;
      font-weight: 800;
      &--small {
        font-size: 30px;
      }
    }
    &__desc {
      text-align: center;
    }
  }
</style>
