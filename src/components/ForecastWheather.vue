<template>
  <div class="forecast" >
    <div class="forecast__info">
      <h2 class="forecast__item forecast__item--info">
        <span class="forecast__item--bold">Date: </span>
        {{date}}
      </h2>
      <h2 class="forecast__item forecast__item--info">
        <span class="forecast__item--bold">Location: </span>
        {{ this.$store.state.location}}
      </h2>
    </div>
    <div class="forecast__table">
      <div class="forecast__row">
        <span class="forecast__item forecast__item--header"
        v-for="(header, index) in headers" :key="index">
          {{ mobile ? header.short : header.title }}
        </span>
      </div>
      <div class="forecast__row" v-for="(item, index) in forecasts" :key="index">
        <h3 class="forecast__item">{{item.date}}</h3>
        <h3 class="forecast__item">{{item.temp}}&#xb0;C</h3>
        <h3 class="forecast__item">{{item.desc}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'ForecastWheather',
  data() {
    return {
      mobile: false,
      forecasts: [],
      date: null,
      headers: [
        {
          title: 'Hour',
          short: 'Hour',
        },
        {
          title: 'Temperature',
          short: 'Temp',
        },
        {
          title: 'Description',
          short: 'Desc',
        },
      ],
    };
  },
  computed: mapState(['coordinates']),
  mounted() {
    this.$store.dispatch('getCooridanates').then(
      () => {
        this.getWeather();
      },
    );
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  },
  methods: {
    checkIfMobile() {
      if (window.innerWidth < 476) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
    getWeather() {
      const lat = this.$store.state.coordinates.latitude;
      const lon = this.$store.state.coordinates.longitude;
      const key = 'd0fd632de5a6a004c911c07e43f9fc2a';
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        .then((result) => {
          for (let index = 0; index <= 6; index += 1) {
            this.date = moment(result.data.list[index].dt * 1000).format('DD.MM.YYYY');
            const item = {};
            item.date = moment(result.data.list[index].dt * 1000).format('hh:mm');
            item.temp = result.data.list[index].main.temp.toFixed(0);
            item.desc = result.data.list[index].weather[0].description;
            this.forecasts.push(item);
          }
        })
        .catch((err) => {
          throw new Error(`IP API ${err}`);
        });
    },
  },
};
</script>

<style scoped lang="scss">
  @import './../assets/styles/globals.scss';
  .forecast {
    width: 100%;
    &__info {
      width: 100%;
      display: flex;
    }
    &__table {
      width: 100%;
    }
    &__row {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: $gap 0;
    }
    &__item {
      @include rwd('large-phone') {
        padding: $padding 0;
        &:nth-of-type(3) {
        flex: 2;
        }
      }
      flex: 1;
      padding: $gap 0;
      background: $opacity;
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-of-type(2) {
        margin: 0 $gap;
      }
      &--header,
      &--info {
        &:nth-of-type(2) {
        margin: unset;
        }
      }
      &--header {
        padding: unset;
        background: unset;
        font-weight: 700;
      }
      &--info {
        width: unset;
        flex: 1;
      }
      &--bold {
        font-weight: 700;
      }
    }
  }
</style>
