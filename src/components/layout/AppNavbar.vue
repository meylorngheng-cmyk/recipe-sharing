
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import '../../assets/styles/navbar.css'
import tasteitLogo from '../../assets/images/logo.png'

const authStore = useAuthStore()

const userInitial = computed(() => {
  return authStore.currentUser?.name.charAt(0).toUpperCase() || 'U'
})
</script>

<template>
  <header class="navbar">

    <!-- Logo -->
    <RouterLink to="/" class="logo">
      <img
        :src="tasteitLogo"
        alt="Tasteit Logo"
        class="logo-image"
      />

      <span class="logo-text">
        <strong>Tasteit</strong>
        <small>Discover · Cook · Share</small>
      </span>
    </RouterLink>

    <!-- Navigation -->
    <nav class="nav-links">
      <RouterLink to="/" class="nav-link">Recipes</RouterLink>
      <RouterLink to="/collections" class="nav-link">Collections</RouterLink>
      <RouterLink to="/#seasonal">Seasonal</RouterLink>
      <RouterLink to="/plan" class="nav-link">Plan</RouterLink>
    </nav>

    <!-- User actions -->
    <div class="nav-actions">
      <template v-if="!authStore.isAuthenticated">
        <RouterLink to="/login" class="login-button">
          Login
        </RouterLink>

        <RouterLink to="/register" class="signup-button">
          Sign Up
        </RouterLink>
      </template>

      <RouterLink
        v-else
        to="/profile"
        class="profile-avatar"
        title="My Profile"
        aria-label="Go to my profile"
      >
        {{ userInitial }}
      </RouterLink>
    </div>

  </header>
</template>
