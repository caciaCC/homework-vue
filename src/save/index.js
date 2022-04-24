import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      cardNo: window.sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).cardNo
      // role: window.sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).role
    },
    key: '',
    cid: '',
    backMenus: []
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = []
      window.sessionStorage.removeItem('user')
    },
    setKey (state, key) {
      state.key = key
    },
    setCid (state, cid) {
      state.cid = cid
    },
    initBackMenu (state, menus) {
      state.backMenus = menus
    }
  }
})
