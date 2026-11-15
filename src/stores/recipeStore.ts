
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Recipe } from '../models/Recipe'
import { getAllRecipes } from '../services/recipeService'

export const useRecipeStore = defineStore('recipe', () => {
  // State
  const recipes = ref<Recipe[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchKeyword = ref('')
  const selectedCategory = ref('All')

  // Getters
  const filteredRecipes = computed(() => {
    return recipes.value.filter((recipe) => {
      const keyword = searchKeyword.value.toLowerCase().trim()

const matchesSearch =
  recipe.title.toLowerCase().includes(keyword) ||
  recipe.description.toLowerCase().includes(keyword) ||
  recipe.category.toLowerCase().includes(keyword) ||
  recipe.ingredients.some((ingredient) =>
    ingredient.toLowerCase().includes(keyword)
  )

      const matchesCategory =
        selectedCategory.value === 'All' ||
        recipe.category.toLowerCase() ===
          selectedCategory.value.toLowerCase()

      return matchesSearch && matchesCategory
    })
  })

  // Actions
  async function fetchRecipes() {
    loading.value = true
    error.value = null

    try {
      recipes.value = await getAllRecipes()
    } catch {
      error.value = 'Unable to load recipes. Please try again.'
    } finally {
      loading.value = false
    }
  }

  function addRecipe(recipe: Recipe) {
  recipes.value.unshift(recipe)
}

  return {
  recipes,
  loading,
  error,
  searchKeyword,
  selectedCategory,
  filteredRecipes,
  fetchRecipes,
  addRecipe,
}
})

