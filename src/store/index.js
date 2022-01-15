import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: "",
    tasks: ""
  },
  mutations: {
    SET_USERS (state, value) {
      state.users = value;
    },
    SET_TASKS (state, value) {
      state.tasks = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
