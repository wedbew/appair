import vuex from 'vuex';
import axios from 'axios';
import vue from 'vue';

vue.use(vuex, axios);

export default new vuex.Store({
  state: {
    location: null,
    coordinates: null,
  },
  actions: {
    getCooridanates({ commit }) {
      if (this.state.coordinates === null) {
        return axios
          .get('https://ipapi.co/json')
          .then((result) => {
            const location = result.data.city;
            const coordinates = {
              longitude: result.data.longitude,
              latitude: result.data.latitude,
            };
            commit('SAVE_COORDINATES', coordinates);
            commit('SAVE_LOCATION', location);
          })
          .catch((err) => {
            throw new Error(`IP API ${err}`);
          });
      }
      return false;
    },
  },
  mutations: {
    SAVE_COORDINATES(state, coordinates) {
      state.coordinates = coordinates;
    },
    SAVE_LOCATION(state, location) {
      state.location = location;
    },
  },
});
