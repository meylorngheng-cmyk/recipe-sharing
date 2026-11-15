
<script setup lang="ts">
import type { Recipe } from '../../models/Recipe'
import '../../assets/styles/recipe-card.css'
import { RouterLink } from 'vue-router'

defineProps<{
  recipe: Recipe
}>()

const emit = defineEmits<{
  save: [recipeId: number]
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'recipe-detail', params: { id: recipe.id } }"
    class="recipe-card-link"
  >
    <article class="recipe-card">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="recipe-image"
      />

      <div class="recipe-content">
        <span class="recipe-category">{{ recipe.category }}</span>

        <h3>{{ recipe.title }}</h3>

        <p>{{ recipe.description }}</p>

        <div class="recipe-info">
          <span>⏱ {{ recipe.preparationTime + recipe.cookingTime }} min</span>
          <span>🥕 {{ recipe.ingredients.length }} ingredients</span>
        </div>

        <p class="recipe-author">By {{ recipe.author }}</p>

        <button
          type="button"
          class="save-recipe-button"
          @click.prevent="emit('save', recipe.id)"
        >
          ♡ Save Recipe
        </button>
      </div>
    </article>
  </RouterLink>
</template>
