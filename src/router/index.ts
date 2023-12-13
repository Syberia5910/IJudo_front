import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/inscription',
      name: 'Inscription',
      component: () => import('../views/InscriptionView.vue')
    },
    {
      path: '/admin/',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue')
    },
    {
      path: '/admin/judokas',
      name: 'judokas',
      component: () => import('../views/admin/JudokasView.vue')
    },
    {
      path: '/admin/tournoi',
      name: 'tournoi',
      component: () => import('../views/admin/TournamentView.vue')
    },
    {
      path: '/admin/categorie',
      name: 'Categorie',
      component: () => import('../views/admin/CategoriesView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
