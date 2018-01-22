import Vue from 'vue'
import Router from 'vue-router'

import * as partials from 'src/partials'
import * as pages from 'src/pages'

Vue.use(Router)

export default ({ store }) => {
  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/', redirect: '/signin' },
      {
        path: '/signin',
        component: pages.SignIn,
        meta: { requiresNoAuth: true }
      },
      {
        path: '/signup',
        component: pages.SignUp,
        meta: { requiresNoAuth: true }
      },
      {
        path: '/forgot',
        component: pages.Forgot,
        meta: { requiresNoAuth: true }
      },
      { path: '/confirm/:check', component: pages.Confirm },
      { path: '/confirm', component: pages.Confirm },
      { path: '/recover/:check', component: pages.Recover },
      { path: '/recover', component: pages.Recover },
      { path: '/private/passwd/:check', component: pages.Passwd },
      {
        path: '/private',
        component: pages.Private,
        meta: { requiresAuth: true },
        children: [
          { path: '', redirect: 'projects' },
          {
            path: 'projects',
            component: pages.Projects,
            children: [
              { path: '', redirect: 'dashboard' },
              { path: 'dashboard', component: partials.ProjectsDashboard }
            ]
          }
        ]
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.state.account.principal) {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    }
    if (to.matched.some(record => record.meta.requiresNoAuth)) {
      if (store.state.account.principal) {
        next({ path: '/private' })
      }
    }
    next() // make sure to always call next()!
  })

  return router
}
