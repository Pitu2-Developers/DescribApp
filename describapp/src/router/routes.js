

const routes = [
  {
    path: '/',
    component: () => import('layouts/Index'),
    children: [
      { path: '', component: () => import('pages/Index') },
      // { path: 'dashboard', component: () => import('pages/dashboard') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/dashboard'),
    children: [
      {
        path: 'client',
        name: 'dashboard-client',
        component: () => import('pages/dashboard'),
      },
      {
        path: 'adjuster',
        name: 'dashboard-adjuster',
        component: () => import('pages/dashboard-adjuster')
      },
      {
        path: 'alert/:id',
        component: () => import('pages/alert')
      }
    ]
  },
  {
    path: '/chat',
    component: () => import('layouts/chat'),
    children: [
      {
        path: '',
        component: () => import('pages/chat-list')
      }
    ]
  },
  {
    path: '/chat-room/:id',
    component: () => import('layouts/chat-room')
  },
  {
    path: '/contacts',
    component: () => import('layouts/contacts'),
    children: [
      {
        path: '',
        component: () => import('pages/contacts')
      }
    ]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404')
  })
}

export default routes
