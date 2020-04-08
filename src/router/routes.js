import Shop from 'layouts/Shop'
import Phone from 'pages/Phone'
import Gas from 'pages/Gas'
import AddCard from 'pages/AddCard'
import Fund from 'pages/Fund'
import Order from 'pages/Order'
import CardList from 'pages/CardList'
import Life from 'pages/Life'
import LifeAccountList from 'pages/LifeAccountList'
import LifeAdd from 'pages/LifeAdd'
import LifeDeal from 'pages/LifeDeal'
import LifeDealDetail from 'pages/LifeDealDetail'
import LifeRecords from 'pages/LifeRecords'
import PhoneRecords from 'pages/PhoneRecords'
import GasRecords from 'pages/GasRecords'
import CityPicker from 'pages/CityPicker'
import Vip from 'pages/Vip'
import Contact from 'pages/Contact'

import { Notify } from 'quasar'
function notify () {
  Notify.create({ message: '即将上线, 敬请期待...', position: 'top', color: 'positive', timeout: 1500 })
}
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
    { path: 'phoneRecords', component: PhoneRecords },
    { path: 'gas', component: Gas },
    { path: 'addcard', component: AddCard },
    { path: 'cardList', component: CardList },
    { path: 'gasRecords', component: GasRecords },
    { path: 'fund', component: Fund },
    { path: 'order', component: Order },
    { path: 'contact', component: Contact },
    {
      path: 'vip',
      component: Vip,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },
    {
      path: 'life',
      component: Life,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },
    {
      path: 'lifeAccountList',
      component: LifeAccountList,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },
    {
      path: 'lifeAdd',
      component: LifeAdd,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },
    {
      path: 'lifeDeal',
      component: LifeDeal,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },
    {
      path: 'lifeDealDetail',
      component: LifeDealDetail,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },
    {
      path: 'lifeRecords',
      component: LifeRecords,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },

    {
      path: 'cityPicker',
      component: CityPicker,
      beforeEnter: (to, from, next) => {
        notify()
      }
    },
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
