import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import ProductPage from '@/views/ProductPage'
import RewardPage from '@/views/RewardPage'
import LeaderboardPage from '@/views/LeaderboardPage'
import ProfilePage from '@/views/ProfilePage'
import LoginPage from '@/views/auth/LoginPage'
import LogoutPage from '@/views/auth/LogoutPage'
import RegisterPage from '@/views/auth/RegisterPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/product',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/reward',
    name: 'RewardPage',
    component: RewardPage
  },
  {
    path: '/leaderboard',
    name: 'LeaderboardPage',
    component: LeaderboardPage
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/logout',
    name: 'LogoutPage',
    component: LogoutPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
