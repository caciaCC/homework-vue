import Vue from 'vue'
import Router from 'vue-router'
import FrontMain from '../components/reception/common/Main'
import homepage from '../components/reception/home/homepage'
import LibraryShowMain from '../components/reception/libraryShow/LibraryShowMain'
import BackMain from '../components/back/common/Main'
import LoginMain from '../components/login/LoginMain'
import RegisterMain from '../components/login/RegisterMain'
import LoginOut from '../components/login/LoginOut'
import LibraryReservationMain from '../components/reception/libraryReservation/LibraryReservationMain'
import LibraryResultMain from '../components/reception/libraryReservation/libraryResultMain'
import LibraryReservation from '../components/reception/libraryReservation/LibraryReservation'
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
        path: '/libraryReservation',
        component: LibraryReservationMain,
        meta: {
          requireAuth: true
        },
        redirect: '/libraryReservation/reserve',
        children: [{
          path: '/libraryReservation/reserve',
          component: LibraryReservation,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/libraryReservation/result',
          component: LibraryResultMain,
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
        path: '/libraryReservation',
        component: LibraryReservationMain,
        meta: {
          requireAuth: true
        },
        redirect: '/libraryReservation/reserve',
        children: [{
          path: '/libraryReservation/reserve',
          component: LibraryReservation,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/libraryReservation/result',
          component: LibraryResultMain,
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
