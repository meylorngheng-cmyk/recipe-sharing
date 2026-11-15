
<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import '../assets/styles/profile.css'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="profile-page">
    <section class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar-large">
          {{ authStore.currentUser?.name.charAt(0).toUpperCase() }}
        </div>

        <div class="profile-heading">
          <span class="profile-label">MY ACCOUNT</span>
          <h1>{{ authStore.currentUser?.name }}</h1>
          <p>{{ authStore.currentUser?.email }}</p>
        </div>
      </div>

      <div class="profile-divider"></div>

      <div class="profile-information">
        <h2>Personal Information</h2>

        <div class="profile-info-item">
          <span>Full Name</span>
          <strong>{{ authStore.currentUser?.name }}</strong>
        </div>

        <div class="profile-info-item">
          <span>Email Address</span>
          <strong>{{ authStore.currentUser?.email }}</strong>
        </div>
      </div>

      <div class="profile-divider"></div>

      <div class="profile-actions">
        <h2>Recipe Management</h2>

        <RouterLink to="/my-recipes" class="profile-action-button">
          My Recipes
        </RouterLink>

        <RouterLink to="/add-recipe" class="profile-action-button primary">
          + Add New Recipe
        </RouterLink>
      </div>

      <button class="logout-button" @click="handleLogout">
        Log Out
      </button>
    </section>
  </div>
</template>
