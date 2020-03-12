<template>
  <div class="container">
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    } else {
      // eslint-disable-next-line no-console
      console.error('Geolocation is not supported by this browser.');
      this.$store.dispatch('getCooridanates');
    }
  },
  methods: {
    success(position) {
      const coordinates = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      };
      this.getCityName(coordinates.latitude, coordinates.longitude);
      this.$store.commit('SAVE_COORDINATES', coordinates);
    },
    error() {
      this.$store.dispatch('getCooridanates');
    },
    getCityName(lat, lon) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAAS1YlwyzftFSMKVWfx3kjAYA3MjwKW6Q`)
        .then((result) => {
          const city = result.data.results[0].address_components[0].long_name;
          this.$store.commit('SAVE_LOCATION', city);
        })
        .catch((err) => {
          throw new Error(`Geocode API ${err}`);
        });
    },
  },
};
</script>

<style lang="scss">
  @import '/assets/styles/globals.scss';
  #app {
    width: 100%;
  }
</style>
