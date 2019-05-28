import Shop from 'layouts/Shop'
import Phone from 'pages/Phone'

import Orders from 'layouts/Orders'
import OrderList from 'pages/OrderList'

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
    component: Orders,
    children: [
      { path: '', redirect: 'list' },
      { path: 'list', component: OrderList }
    ]
  },
  {
    path: '/funds',
    component: () => import('layouts/Funds'),
    children: [
      { path: '', redirect: 'records/ETH' },
      {
        path: 'records/:token',
        component: () => import('pages/funds/Records')
      }
    ]
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
