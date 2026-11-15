
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="my-recipes-page">
    <div class="my-recipes-card">
      <div class="lock-icon">
        <span>♡</span>
      </div>

      <h1>Your Recipe Collection</h1>

      <p>
        Sign in to save your favorite recipes and manage
        your personal collection.
      </p>

      <div class="my-recipes-actions">
        <RouterLink to="/login" class="login-action">
          Log In
        </RouterLink>

        <RouterLink to="/register" class="register-action">
          Create Account
        </RouterLink>
      </div>

      <RouterLink to="/" class="back-home">
        ← Explore Recipes
      </RouterLink>
    </div>
  </div>
</template>

    