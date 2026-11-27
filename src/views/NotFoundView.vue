
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>

    <RouterLink to="/" class="home-link">
      Back to Home
    </RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
}

h1 {
  font-size: 5rem;
  margin: 0;
}

h2 {
  margin: 8px 0;
}

p {
  margin-bottom: 24px;
}

.home-link {
  padding: 10px 20px;
  border-radius: 8px;
  background:var(--color-primary);
  color: white;
  text-decoration: none;
}
</style>
