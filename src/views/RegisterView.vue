
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import '../assets/styles/register.css'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!fullName.value.trim()) {
    errorMessage.value = 'Please enter your full name.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must contain at least 8 characters.'
    return
  }

  if (!agreeToTerms.value) {
    errorMessage.value = 'Please agree to the Terms and Conditions.'
    return
  }

  const registered = authStore.register(
    fullName.value.trim(),
    email.value.trim(),
    password.value,
  )

  if (!registered) {
    errorMessage.value = 'This email is already registered. Please log in.'
    return
  }

  successMessage.value = 'Account created successfully!'

  router.push('/')
}
</script>


<template>
  <div class="register-page">
    <div class="register-decoration"></div>

    <div class="register-card">
      <div class="register-food-image">
        <img
          src="https://i.pinimg.com/1200x/8d/54/2a/8d542adb54c32191cedd748b8844beaf.jpg"
          alt="Delicious food"
        />
      </div>

      <div class="register-content">
        <h1>Sign Up</h1>
        <p class="register-subtitle">
          Join the Tasteit food community!
        </p>

        <form @submit.prevent="handleRegister">
          <div class="register-input">
            <span>♙</span>
            <input
              v-model.trim="fullName"
              type="text"
              placeholder="Full name"
              required
            />
          </div>

          <div class="register-input">
            <span>✉</span>
            <input
              v-model.trim="email"
              type="email"
              placeholder="Email address"
              required
            />
          </div>

          <div class="register-input">
            <span>♙</span>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              minlength="8"
              required
            />
          </div>

          <div class="register-input">
            <span>♙</span>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
            />
          </div>

          <label class="register-terms">
            <input v-model="agreeToTerms" type="checkbox" />
            <span>I agree to the Terms and Conditions.</span>
          </label>

          <p v-if="errorMessage" class="form-message error">
            {{ errorMessage }}
          </p>

          <p v-if="successMessage" class="form-message success">
            {{ successMessage }}
          </p>

          <button type="submit" class="register-submit">
            Continue
          </button>
        </form>

        <div class="register-divider">
          <span>Or sign up with</span>
        </div>

        <div class="register-social">
          <button type="button" class="social-button">
            Google
          </button>

          <button type="button" class="social-button">
            Facebook
          </button>
        </div>

        <p class="login-prompt">
          Already have an account?
          <RouterLink to="/login">Log in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
