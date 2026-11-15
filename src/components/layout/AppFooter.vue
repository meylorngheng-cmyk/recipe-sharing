
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import '../../assets/styles/footer.css'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">

      <!-- Brand -->
      <div class="footer-brand">
        <RouterLink to="/" class="footer-logo">
          <span class="footer-logo-icon">T</span>
          <span>
            <strong>Tasteit</strong>
            <small>Discover · Cook · Share</small>
          </span>
        </RouterLink>

        <p>
          Discover delicious recipes, organize your favorites,
          and plan your next meal.
        </p>
      </div>

      <!-- Explore links -->
      <div class="footer-links">
        <h3>Explore</h3>
        <RouterLink to="/">Recipes</RouterLink>
        <RouterLink to="/collections">Collections</RouterLink>
        <RouterLink to="/#seasonal">Seasonal</RouterLink>
        <RouterLink to="/plan">Plan</RouterLink>
      </div>

      <!-- Account links -->
      <div class="footer-links">
        <h3>Account</h3>
        <RouterLink to="/profile">My Profile</RouterLink>
        <RouterLink to="/my-recipes">My Recipes</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Sign Up</RouterLink>
      </div>

      <!-- Newsletter -->
      <div class="footer-newsletter">
        <h3>Stay Inspired!</h3>
        <p>Get inspired to try something delicious.</p>

        <form @submit.prevent>
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Your email address"
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      <p>© 2026 Tasteit. Made with care for food lovers.</p>
    </div>
  </footer>
</template>
