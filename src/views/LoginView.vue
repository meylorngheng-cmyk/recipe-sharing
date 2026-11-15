
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import '../assets/styles/login.css'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

function handleLogin() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  const loggedIn = authStore.login(email.value.trim(), password.value)

  if (!loggedIn) {
    errorMessage.value = 'Incorrect email or password.'
    return
  }

  successMessage.value = 'Login successful!'

  router.push('/')
}
</script>

<template>
  <div class="login-page">
    <div class="login-decoration"></div>

    <div class="login-card">
      <div class="login-food-image">
        <img
        src="https://i.pinimg.com/1200x/8d/54/2a/8d542adb54c32191cedd748b8844beaf.jpg"
        alt="Delicious grilled chicken"
        />
      </div>

      <div class="login-content">
        <h1>Login</h1>

        <form @submit.prevent="handleLogin">
          <div class="login-input">
            <span>✉</span>
            <input v-model.trim="email" type="email"
              placeholder="Email address" required />
          </div>

          <div class="login-input">
            <span>♙</span>
            <input v-model="password" type="password"
              placeholder="Password" required />
          </div>

          <div class="login-options">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#" @click.prevent>Forgot password?</a>
          </div>

          <p v-if="errorMessage" class="form-message error">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="form-message success">
            {{ successMessage }}
          </p>

          <button type="submit" class="login-submit">Continue</button>
        </form>

        <div class="login-divider">
          <span>Or sign in with</span>
        </div>

        <div class="social-login">
          <button type="button" class="social-button">
             Google
          </button>
          <button type="button" class="social-button">
            Facebook
          </button>
        </div>

        <p class="signup-prompt">
          Don't have an account?
          <RouterLink to="/register">Create an account</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
