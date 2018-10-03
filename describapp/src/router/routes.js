

const routes = [
  {
    path: '/',
    component: () => import('layouts/Index.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // { path: 'dashboard', component: () => import('pages/dashboard.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/dashboard.vue'),
    children: [
      {
        path: 'client',
        name: 'dashboard-client',
        component: () => import('pages/dashboard.vue'),
      },
      {
        path: 'adjuster',
        name: 'dashboard-adjuster',
        component: () => import('pages/dashboard-adjuster.vue')
      },
      {
        path: 'alert/:id',
        component: () => import('pages/alert.vue')
      }
    ]
  },
  {
    path: '/chat',
    component: () => import('layouts/chat.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/chat-list.vue')
      }
    ]
  },
  {
    path: '/chat-room/:id',
    component: () => import('layouts/chat-room.vue')
  },
  {
    path: '/contacts',
    component: () => import('layouts/contacts')
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
