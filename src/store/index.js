
import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
  },
  getters: {
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status;
    }
  },
  actions: {
  },
  modules: {
  }
})
