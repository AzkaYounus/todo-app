import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import PlanTask from './views/PlanTask.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/plantask', component: PlanTask },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;