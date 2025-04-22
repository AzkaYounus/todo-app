import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import PlanTask from './views/PlanTask.vue';
import Test from './views/Test.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/plantask', component: PlanTask },
  { path: '/test', component: Test },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;