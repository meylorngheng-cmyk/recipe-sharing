
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useRecipeStore } from '../stores/recipeStore'
import type { Recipe } from '../models/Recipe'
import '../assets/styles/add-recipe.css'
import { getRecipeImage } from '../data/images'

const router = useRouter()
const authStore = useAuthStore()
const recipeStore = useRecipeStore()

// Form fields
const title = ref('')
const description = ref('')
const category = ref('Breakfast')
const preparationTime = ref(10)
const cookingTime = ref(20)
const ingredients = ref('')
const instructions = ref('')

// Validation errors
const errors = reactive({
  title: '',
  description: '',
  preparationTime: '',
  cookingTime: '',
  ingredients: '',
  instructions: '',
  general: '',
})

// Validate form fields
function validateForm(): boolean {
  errors.title = ''
  errors.description = ''
  errors.preparationTime = ''
  errors.cookingTime = ''
  errors.ingredients = ''
  errors.instructions = ''
  errors.general = ''

  if (!title.value.trim()) {
    errors.title = 'Recipe title is required.'
  }

  if (!description.value.trim()) {
    errors.description = 'Description is required.'
  }

  if (!Number.isFinite(preparationTime.value) || preparationTime.value < 0) {
    errors.preparationTime = 'Enter a valid preparation time.'
  }

  if (!Number.isFinite(cookingTime.value) || cookingTime.value < 0) {
    errors.cookingTime = 'Enter a valid cooking time.'
  }

  if (!ingredients.value.trim()) {
    errors.ingredients = 'Please enter at least one ingredient.'
  }

  if (!instructions.value.trim()) {
    errors.instructions = 'Please enter the instructions.'
  }

  return !Object.values(errors).some(message => message !== '')
}

// Publish recipe
function handleAddRecipe() {
  if (!validateForm()) return

  if (!authStore.currentUser) {
    errors.general = 'Please log in before adding a recipe.'
    return
  }

  const newRecipe: Recipe = {
    id: Date.now(),
    title: title.value.trim(),
    description: description.value.trim(),
    image: getRecipeImage('tofu-salad.jpg'),
    category: category.value,
    ingredients: ingredients.value
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0),
    instructions: instructions.value
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0),
    preparationTime: preparationTime.value,
    cookingTime: cookingTime.value,
    author: authStore.currentUser.name,
  }

  recipeStore.addRecipe(newRecipe)
  router.push('/')
}
</script>

<template>
  <div class="add-recipe-page">

    <!-- Guest Page -->
    <template v-if="!authStore.isAuthenticated">
      <section class="guest-add-page">
        <div class="guest-hero">

          <div class="guest-content">
            <span class="guest-eyebrow">YOUR KITCHEN, YOUR STORY</span>

            <h1>
              Every Great Recipe
              <span>Has a Story.</span>
            </h1>

            <p class="guest-description">
              Have a recipe worth sharing? Join Tasteit and
              bring your favorite dishes to a community of
              food lovers.
            </p>

            <div class="guest-benefits">
              <div>✓ Share your own recipes</div>
              <div>✓ Manage your personal recipe collection</div>
              <div>✓ Inspire other food lovers</div>
            </div>

            <div class="guest-buttons">
              <RouterLink to="/register" class="guest-signup">
                Create Your Account
              </RouterLink>

              <RouterLink to="/login" class="guest-login">
                Already a member? Log in
              </RouterLink>
            </div>
          </div>

          <div class="guest-image">
            <img
              :src="getRecipeImage('tofu-salad.jpg')"
              alt="A delicious homemade recipe"
            />

            <div class="image-caption">
              <span>MADE WITH LOVE</span>
              <strong>Good food brings us together.</strong>
            </div>
          </div>

        </div>

        <div class="guest-features">
          <div class="guest-feature">
            <span>01</span>
            <h3>Share</h3>
            <p>Publish your favorite homemade dishes.</p>
          </div>

          <div class="guest-feature">
            <span>02</span>
            <h3>Organize</h3>
            <p>Keep your recipes together in one place.</p>
          </div>

          <div class="guest-feature">
            <span>03</span>
            <h3>Inspire</h3>
            <p>Share your cooking ideas with others.</p>
          </div>
        </div>
      </section>
    </template>

    <!-- Authenticated User Form -->
    <template v-else>
      <h1>Share Your Recipe</h1>

      <p>
        Welcome, {{ authStore.currentUser?.name }}!
        Add your favorite recipe.
      </p>

      <form class="recipe-form" @submit.prevent="handleAddRecipe">

        <!-- Recipe Title -->
        <label>
          Recipe Title
          <input
            v-model="title"
            type="text"
            placeholder="Enter recipe title"
          />
          <p v-if="errors.title" class="error-message">
            {{ errors.title }}
          </p>
        </label>

        <!-- Description -->
        <label>
          Description
          <textarea
            v-model="description"
            placeholder="Describe your recipe"
          />
          <p v-if="errors.description" class="error-message">
            {{ errors.description }}
          </p>
        </label>

        <!-- Category -->
        <label>
          Category
          <select v-model="category">
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Dessert</option>
            <option>Snack</option>
          </select>
        </label>

        <!-- Preparation and Cooking Time -->
        <div class="time-fields">

          <label>
            Preparation Time (minutes)
            <input
              v-model.number="preparationTime"
              type="number"
              min="0"
            />
            <p v-if="errors.preparationTime" class="error-message">
              {{ errors.preparationTime }}
            </p>
          </label>

          <label>
            Cooking Time (minutes)
            <input
              v-model.number="cookingTime"
              type="number"
              min="0"
            />
            <p v-if="errors.cookingTime" class="error-message">
              {{ errors.cookingTime }}
            </p>
          </label>

        </div>

        <!-- Ingredients -->
        <label>
          Ingredients
          <textarea
            v-model="ingredients"
            placeholder="Write one ingredient per line"
          />
          <p v-if="errors.ingredients" class="error-message">
            {{ errors.ingredients }}
          </p>
        </label>

        <!-- Instructions -->
        <label>
          Instructions
          <textarea
            v-model="instructions"
            placeholder="Write one step per line"
          />
          <p v-if="errors.instructions" class="error-message">
            {{ errors.instructions }}
          </p>
        </label>

        <!-- General Error -->
        <p v-if="errors.general" class="error-message">
          {{ errors.general }}
        </p>

        <button type="submit" class="submit-recipe-button">
          Publish Recipe
        </button>

      </form>
    </template>

  </div>
</template>
