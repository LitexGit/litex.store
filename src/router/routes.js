import Shop from 'layouts/Shop'
import Phone from 'pages/Phone'
import Gas from 'pages/Gas'
import AddCard from 'pages/AddCard'
import Fund from 'pages/Fund'
import Order from 'pages/Order'
import CardList from 'pages/CardList'
import Life from 'pages/Life'
import LifeAdd from 'pages/LifeAdd'
import LifeDeal from 'pages/LifeDeal'
import LifeDealDetail from 'pages/LifeDealDetail'
import LifeRecords from 'pages/LifeRecords'
import PhoneRecords from 'pages/PhoneRecords'
import GasRecords from 'pages/GasRecords'
import CityPicker from 'pages/CityPicker'

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
    { path: 'lifeAdd', component: LifeAdd },
    { path: 'lifeDeal', component: LifeDeal },
    { path: 'lifeDealDetail', component: LifeDealDetail },
    { path: 'lifeRecords', component: LifeRecords },
    { path: 'phoneRecords', component: PhoneRecords },
    { path: 'gasRecords', component: GasRecords },
    { path: 'cityPicker', component: CityPicker },
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
