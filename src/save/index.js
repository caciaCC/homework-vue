import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      phoneNumber: window.sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).phoneNumber
      // role: window.sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).role
    },
    Authorization: window.sessionStorage.getItem('Authorization') == null ? window.sessionStorage.getItem('Authorization') : '',
    key: '',
    cid: '',
    backMenus: []
  },
  mutations: {
    login (state, token) {
      console.log(token)
      state.Authorization = token
      window.sessionStorage.setItem('Authorization', token)
    },
    logout (state) {
      state.Authorization = ''
      window.sessionStorage.removeItem('Authorization')
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
