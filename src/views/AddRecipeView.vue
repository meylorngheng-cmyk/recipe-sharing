
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useRecipeStore } from '../stores/recipeStore'
import type { Recipe } from '../models/Recipe'
import '../assets/styles/add-recipe.css'
import { getRecipeImage } from '../data/images'

const router = useRouter()
const authStore = useAuthStore()
const recipeStore = useRecipeStore()

const title = ref('')
const description = ref('')
const category = ref('Breakfast')
const preparationTime = ref(10)
const cookingTime = ref(20)
const ingredients = ref('')
const instructions = ref('')
const errorMessage = ref('')

function handleAddRecipe() {
  errorMessage.value = ''

  if (
    !title.value.trim() ||
    !description.value.trim() ||
    !ingredients.value.trim() ||
    !instructions.value.trim()
  ) {
    errorMessage.value = 'Please complete all required fields.'
    return
  }

  if (!authStore.currentUser) {
    errorMessage.value = 'Please log in before adding a recipe.'
    return
  }

  const newRecipe: Recipe = {
    id: Date.now(),
    title: title.value.trim(),
    description: description.value.trim(),
    image: '/images/tofu-salad.jpg',
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
    <template v-if="!authStore.isAuthenticated">

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

     
    </template>

    <template v-else>
      <h1>Share Your Recipe</h1>
      <p>Welcome, {{ authStore.currentUser?.name }}! Add your favorite recipe.</p>

      <form class="recipe-form" @submit.prevent="handleAddRecipe">
        <label>
          Recipe Title
          <input v-model="title" type="text" placeholder="Enter recipe title" />
        </label>

        <label>
          Description
          <textarea v-model="description" placeholder="Describe your recipe" />
        </label>

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

        <div class="time-fields">
          <label>
            Preparation Time (minutes)
            <input v-model.number="preparationTime" type="number" min="0" />
          </label>

          <label>
            Cooking Time (minutes)
            <input v-model.number="cookingTime" type="number" min="0" />
          </label>
        </div>

        <label>
          Ingredients
          <textarea
            v-model="ingredients"
            placeholder="Write one ingredient per line"
          />
        </label>

        <label>
          Instructions
          <textarea
            v-model="instructions"
            placeholder="Write one step per line"
          />
        </label>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button type="submit" class="submit-recipe-button">
          Publish Recipe
        </button>
      </form>
    </template>
  </div>
</template>
