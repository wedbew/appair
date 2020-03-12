<template>
  <div class="wheather">
    <router-link class="wheather__more" to="/more">More</router-link>
    <div v-if="isLoading == false" class="wheather__wrapper">
      <div class="wheather__temp">
        <h2>{{ temp }}&#xb0;C</h2>
      </div>
      <div class="wheather__info">
        <h2 class="wheather__item">
          <span class="wheather__title">Date:</span> {{ date }}
        </h2>
        <h2 class="wheather__item">
          <span class="wheather__title">Location:</span> {{ city }}
        </h2>
        <h2 class="wheather__item">
          <span class="wheather__title">Description:</span> {{ description }}
        </h2>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'CurrentWeather',
  data() {
    return {
      isLoading: true,
      temp: null,
      date: null,
      city: this.$store.state.location,
      description: null,
    };
  },
  computed: mapState(['coordinates', 'location']),
  watch: {
    // eslint-disable-next-line no-unused-vars
    coordinates(newValue, oldValue) {
      this.getWeather();
    },
    // eslint-disable-next-line no-unused-vars
    location(newValue, oldValue) {
      this.city = newValue;
    },
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      if (this.$store.state.coordinates === null) {
        return;
      }
      const lat = this.$store.state.coordinates.latitude;
      const lon = this.$store.state.coordinates.longitude;
      const key = 'd0fd632de5a6a004c911c07e43f9fc2a';
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        .then((result) => {
          this.isLoading = false;
          this.temp = result.data.main.temp.toFixed(0);
          this.description = result.data.weather[0].description;
          this.date = moment(result.data.dt * 1000).format('DD.MM.YYYY');
        })
        .catch((err) => {
          throw new Error(`Open whether API ${err}`);
        });
    },
  },
};
</script>

<style scoped lang="scss">
  @import './../assets/styles/globals.scss';
  .wheather {
    width: 100%;
    color: $white;
    background: $opacity;
    margin-top: $gap;
    padding: $padding;
    position: relative;
    &__wrapper {
      margin: $gap 0;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    &__temp,
    &__info {
      flex: 2;
    }
    &__item {
      padding: 3px 0;
    }
    &__title {
      font-weight: 700;
    }
    &__temp {
      @include rwd('large-phone') {
        min-width: 100%;
        margin-bottom: $gap;
      }
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
    }
    &__more {
      position: absolute;
      bottom: $padding;
      right: $padding;
    }
  }
</style>
