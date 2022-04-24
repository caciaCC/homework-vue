// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SlideVerify from 'vue-monoplasty-slide-verify'
import store from './save'
// import 'lib-flexible/flexible'
// 设置反向代理来连接java后端,默认把请求发送到http://localhost:8000/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.request.use(
  (config) => {
    let authorization = sessionStorage.getItem('Authorization')// 这个是登录时存进本地环境的token
    console.log(authorization)
    if (authorization !== '' && authorization !== null) {
      config.headers = {
        Authorization: authorization
      }
      return config
    }
    return config
  }, error => {
    return Promise.reject(error)
  })
// axios.defaults.baseURL = 'http://47.115.200.202:8443/api'
// axios.defaults.withCredentials = true
// 设置axios请求的token
// axios.defaults.headers.post['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE4MDI2NzcsImlhdCI6MTY1MDI2NjY3Nywiand0VXNlcklkIjo3fQ.7fO8qRrflFLB1358L2i6SNCf3TniYQQbdW44FDDq99Y'
// 设置请求头
Vue.use(SlideVerify)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

// 前端登录拦截器,必须登录后才能访问其他页面
// 每进入一个需要登录的页面都会进行一次登录状态检查
// router.beforeEach((to, from, next) => {
//   if (store.state.user.cardNo && to.path.startsWith('/back')) {
//     console.log(to.fullPath)
//     initBackMenu(router, store)
//   }
//   if (store.state.user.cardNo && to.path.startsWith('/login')) {
//     next({
//       path: 'libraryShow'
//     })
//   }
//   // 11
//   if (to.meta.requireAuth) {
//     if (store.state.user.cardNo) {
//       axios
//         .get('/authentication', {
//           // cardNo: store.state.user.cardNo
//         }).then(resp => {
//           if (resp.data) next()
//         })
//       // next()
//     } else {
//       next({
//         path: 'login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })

// const initBackMenu = (router, store) => {
//   if (store.state.backMenus.length > 0) {
//     return
//   }
//   axios.post('/back/menu', {
//     cardNo: store.state.user.cardNo
//   }).then(resp => {
//     if (resp && resp.data.code === 200) {
//       var fmtRoutes = formatRoutes(resp.data.result)
//       router.addRoutes(fmtRoutes)
//       store.commit('initBackMenu', fmtRoutes)
//       console.log(fmtRoutes)
//     }
//   })
// }

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) route.children = formatRoutes(route.children)
    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/back/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameCn: route.nameCn,
      icon: route.icon,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
