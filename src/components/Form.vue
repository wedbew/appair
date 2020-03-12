<template>
  <form @submit.prevent class="form">
    <input v-model="city" class="form__input" type="text">
    <button @click="submit" class="form__button" type="submit">Check</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Form',
  data() {
    return {
      city: null,
    };
  },
  computed: mapState(['coordinates']),
  methods: {
    submit() {
      if (this.city !== null) {
        this.getCoordinates();
      }
    },
    getCoordinates() {
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.city}&key=AIzaSyAAS1YlwyzftFSMKVWfx3kjAYA3MjwKW6Q`)
        .then((result) => {
          const coordinates = {
            longitude: result.data.results[0].geometry.location.lng,
            latitude: result.data.results[0].geometry.location.lat,
          };
          const location = result.data.results[0].address_components[0].long_name;
          this.$store.commit('SAVE_COORDINATES', coordinates);
          this.$store.commit('SAVE_LOCATION', location);
        })
        .catch((err) => {
          throw new Error(`Geocode API ${err}`);
        });
    },
  },
};
</script>

<style scoped lang="scss">
  @import './../assets/styles/globals.scss';
  .form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &__input,
    &__button{
      background: $opacity;
      padding: $padding;
    }
    &__input {
      @include rwd('large-phone') {
        margin-right: unset;
        margin-bottom: $gap;
        min-width: 100%;
      }
      border: 1px solid $white;
      flex: 2;
      margin-right: $gap;
      color: $white;
    }
    &__button {
      flex: 1;
      text-transform: uppercase;
      color: $white;
    }
  }
</style>
