import Shop from 'layouts/Shop'
import Phone from 'pages/Phone'
import Gas from 'pages/Gas'
import AddCard from 'pages/AddCard'
import Fund from 'pages/Fund'
import Order from 'pages/Order'
import CardList from 'pages/CardList'
import Life from 'pages/Life'

const routes = [{
  path: '/',
  redirect: '/shop'
},
{
  path: '/shop',
  component: Shop,
  children: [
    { path: '', redirect: 'phone' },
    { path: 'phone', component: Phone },
    { path: 'gas', component: Gas },
    { path: 'addcard', component: AddCard },
    { path: 'fund', component: Fund },
    { path: 'order', component: Order },
    { path: 'cardList', component: CardList },
    { path: 'life', component: Life },
    {
      path: '*',
      component: () =>
        import('pages/Error404.vue')
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
