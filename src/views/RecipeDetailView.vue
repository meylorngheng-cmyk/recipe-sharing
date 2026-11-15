
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getRecipeById } from '../services/recipeService'
import type { Recipe } from '../models/Recipe'
import '../assets/styles/recipe-detail.css'

const route = useRoute()

const recipe = ref<Recipe | undefined>()
const loading = ref(true)

onMounted(async () => {
  const id = Number(route.params.id)
  recipe.value = await getRecipeById(id)
  loading.value = false
})
</script>

<template>
  <main class="recipe-detail-page">

    <!-- Loading -->
    <div v-if="loading" class="recipe-loading">
      <div class="loading-spinner"></div>
      <p>Preparing your recipe...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!recipe" class="recipe-not-found">
      <span class="not-found-icon">🍽️</span>
      <h2>Recipe Not Found</h2>
      <p>Sorry, we couldn't find this recipe.</p>
      <RouterLink to="/" class="back-home-button">
        Back to Recipes
      </RouterLink>
    </div>

    <!-- Recipe Details -->
    <div v-else class="recipe-detail">

      <RouterLink to="/" class="back-link">
        <span>←</span> Back to Recipes
      </RouterLink>

      <!-- Recipe Hero -->
      <section class="recipe-hero">

        <div class="recipe-hero-image">
          <img
            :src="recipe.image"
            :alt="recipe.title"
          />
          <span class="hero-category">
            {{ recipe.category }}
          </span>
        </div>

        <div class="recipe-hero-information">

          <span class="recipe-eyebrow">
            TASTEIT RECIPE COLLECTION
          </span>

          <h1>{{ recipe.title }}</h1>

          <p class="recipe-description">
            {{ recipe.description }}
          </p>

          <div class="recipe-author">
            <div class="author-avatar">
              {{ recipe.author.charAt(0).toUpperCase() }}
            </div>

            <div>
              <span class="author-label">RECIPE BY</span>
              <strong>{{ recipe.author }}</strong>
            </div>
          </div>

          <div class="recipe-stats">

            <div class="stat-card">
              <span class="stat-icon">◷</span>
              <span class="stat-label">Preparation</span>
              <strong>{{ recipe.preparationTime }} min</strong>
            </div>

            <div class="stat-card">
              <span class="stat-icon">♨</span>
              <span class="stat-label">Cooking</span>
              <strong>{{ recipe.cookingTime }} min</strong>
            </div>

            <div class="stat-card total-stat">
              <span class="stat-icon">⏱</span>
              <span class="stat-label">Total Time</span>
              <strong>
                {{ recipe.preparationTime + recipe.cookingTime }} min
              </strong>
            </div>

          </div>
        </div>
      </section>

      <!-- Recipe Content -->
      <section class="recipe-detail-content">

        <!-- Ingredients -->
        <div class="ingredients-card">
          <div class="section-heading">
            <span class="section-icon">🥕</span>
            <div>
              <h2>Ingredients</h2>
              <p>{{ recipe.ingredients.length }} ingredients needed</p>
            </div>
          </div>

          <ul class="ingredients-list">
            <li
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
            >
              <span class="ingredient-check">✓</span>
              <span>{{ ingredient }}</span>
            </li>
          </ul>
        </div>

        <!-- Instructions -->
        <div class="instructions-card">
          <div class="section-heading">
            <span class="section-icon">👩‍🍳</span>
            <div>
              <h2>Cooking Instructions</h2>
              <p>Follow these steps to prepare your dish</p>
            </div>
          </div>

          <div class="instructions-list">
            <div
              v-for="(instruction, index) in recipe.instructions"
              :key="index"
              class="instruction-item"
            >
              <span class="step-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <p>{{ instruction }}</p>
            </div>
          </div>
        </div>

      </section>

      <div class="recipe-footer">
        <span>Made with love, shared on Tasteit.</span>
        <RouterLink to="/">Explore more recipes →</RouterLink>
      </div>

    </div>
  </main>
</template>
