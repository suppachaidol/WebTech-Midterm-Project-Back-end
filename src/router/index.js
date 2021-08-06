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
import AddReward from '@/views/reward/AddReward'
import EditReward from '@/views/reward/EditReward'
import DeleteReward from '@/views/reward/DeleteReward'
import GetReward from '@/views/reward/GetReward'

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
  {
    path: '/addreward',
    name: 'AddReward',
    component: AddReward
  },
  {
    path: "/reward/:id/editreward",
    name: "EditReward",
    component: EditReward,
  },
  {
    path: "/reward/:id/deletereward",
    name: "DeleteReward",
    component: DeleteReward,
  },
  {
    path: "/reward/:id/getreward",
    name: "GetReward",
    component: GetReward,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
