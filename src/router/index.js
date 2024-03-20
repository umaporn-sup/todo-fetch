import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import TodoManager from '../components/TodoManager.vue'
import TodoDetail from '../components/TodoDetail.vue'
import { getItemById } from '../libs/fetchUtils.js'
//set history object to store path when visiting
const history = createWebHistory()
//give route paths
const routes = [
  { path: '/todo-detail/:todoId', name: 'TodoDetail', component: TodoDetail },
  { path: '/login', name: 'Login', component: Login },
  { path: '/', redirect: '/todo-manager' },
  { path: '/aboutus', name: 'AboutUs', component: About },
  { path: '/todo-manager', name: 'TodoManager', component: TodoManager },
  { path: '/:notfoundpath(.*)', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history,
  routes,
  linkActiveClass: 'text-purple-500',
  linkExactActiveClass: 'text-blue-500'
})
let isMember = true
try {
  await getItemById('http://localhost:5000/users', 'member-123')
  // await getItemById('http://localhost:5000/users', 'guest')
} catch (error) {
  isMember = false
}
router.beforeEach(async (to, from) => {
  if (!isMember && to.name !== 'Login') return '/login'
})
export default router
