import Vue from 'vue'
import Router from 'vue-router'
import FrontMain from '../components/reception/common/Main'
import homepage from '../components/reception/home/homepage'
import LibraryShowMain from '../components/reception/libraryShow/LibraryShowMain'
import BackMain from '../components/back/common/Main'
import LoginMain from '../components/login/LoginMain'
import RegisterMain from '../components/login/RegisterMain'
import LoginOut from '../components/login/LoginOut'
import LostSearchMain from '../components/reception/lostSearch/LostSearchMain'
import FoundSearchMain from '../components/reception/foundSearch/FoundSearchMain'
import LostSearchResult from '../components/reception/lostSearch/LostSearchResult'
import LostSearch from '../components/reception/lostSearch/LostSearch'
import FoundSearchResult from '../components/reception/foundSearch/FoundSearchResult'
import FoundSearch from '../components/reception/foundSearch/FoundSearch'
import LibraryNoticeMain from '../components/reception/libraryNotice/libraryNoticeMain'
import ReservationInfo from '../components/reception/libraryNotice/ReservationInfo'
import LoanInfo from '../components/reception/libraryNotice/LoanInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FrontMain',
      component: FrontMain,
      redirect: '/libraryShow',
      children: [{
        path: '/homepage',
        component: homepage,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/libraryShow',
        component: LibraryShowMain,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/lostSearch',
        component: LostSearchMain,
        meta: {
          requireAuth: true
        },
        redirect: '/lostSearch/search',
        children: [{
          path: '/lostSearch/search',
          component: LostSearch,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/lostSearch/result',
          component: LostSearchResult,
          meta: {
            requireAuth: true
          }
        }]
      },
      {
        path: '/foundSearch',
        component: FoundSearchMain,
        meta: {
          requireAuth: true
        },
        redirect: '/foundSearch/search',
        children: [{
          path: '/foundSearch/search',
          component: FoundSearch,
          meta: {requireAuth: true
          }},
        {
          path: '/foundSearch/result',
          component: FoundSearchResult,
          meta: {
            requireAuth: true
          }
        }]
      },
      {
        path: '/libraryNotice',
        component: LibraryNoticeMain,
        meta: {
          requireAuth: true
        },
        redirect: '/libraryNotice/reservationInfo',
        children: [{
          path: '/libraryNotice/reservationInfo',
          component: ReservationInfo,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/libraryNotice/loanInfo',
          component: LoanInfo,
          meta: {
            requireAuth: true
          }
        }]
      }
      ]
    },
    {
      path: '/back',
      name: 'BackMain',
      component: BackMain
      // children: [
      //   {
      //     path: '/back/library',
      //     component: LibraryManagement,
      //     meta: {
      //       requireAuth: true
      //     }
      //   },
      //   {
      //     path: '/back/home',
      //     component: backhome,
      //     meta: {
      //       requireAuth: true
      //     }
      //   }]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginMain
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterMain
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LoginOut
    }
  ]
})

export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FrontMain',
      component: FrontMain,
      redirect: '/libraryShow',
      children: [{
        path: '/homepage',
        component: homepage,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/libraryShow',
        component: LibraryShowMain,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/lostSearch',
        component: LostSearchMain,
        meta: {
          requireAuth: true
        },
        redirect: '/lostSearch/search',
        children: [{
          path: '/lostSearch/search',
          component: LostSearch,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/lostSearch/result',
          component: LostSearchResult,
          meta: {
            requireAuth: true
          }
        }]
      },
      {
        path: '/foundSearch',
        component: FoundSearchMain,
        meta: {
          requireAuth: true
        },
        redirect: '/foundSearch/search',
        children: [{
          path: '/foundSearch/search',
          component: FoundSearch,
          meta: {requireAuth: true
          }},
        {
          path: '/foundSearch/result',
          component: FoundSearchResult,
          meta: {
            requireAuth: true
          }
        }]
      }
      ]
    },
    {
      path: '/back',
      name: 'BackMain',
      component: BackMain
      // children: [
      //   {
      //     path: '/back/library',
      //     component: LibraryBack,
      //     meta: {
      //       requireAuth: true
      //     }
      //   },
      //   {
      //     path: '/back/home',
      //     component: backhome,
      //     meta: {
      //       requireAuth: true
      //     }
      //   }]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginMain
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterMain
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LoginOut
    }
  ]
})
