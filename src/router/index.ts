
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'
import AddRecipeView from '../views/AddRecipeView.vue'
import MyRecipesView from '../views/MyRecipesView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import CollectionsView from '../views/CollectionsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipes/:id',
      name: 'recipe-detail',
      component: RecipeDetailView,
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: AddRecipeView,
    },
    {
      path: '/my-recipes',
      name: 'my-recipes',
      component: MyRecipesView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    { path: '/profile',
       name: 'profile', 
       component: ProfileView
    },
    { path: '/collections',
       name: 'collections', 
       component: CollectionsView },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
