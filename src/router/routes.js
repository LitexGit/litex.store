import Shop from 'layouts/Shop'
import Phone from 'pages/Phone'

import Orders from 'layouts/Orders'

const routes = [
  {
    path: '/',
    redirect: '/shop'
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      { path: '', redirect: 'phone' },
      { path: 'phone', component: Phone }
    ]
  },
  {
    path: '/orders',
    component: Orders
  },
  {
    path: '/funds',
    component: () => import('layouts/Funds')
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
