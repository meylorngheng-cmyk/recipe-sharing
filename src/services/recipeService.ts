
import type { Recipe } from '../models/Recipe'
import { getRecipeImage } from '../data/images'

const API_URL = 'http://localhost:3000/recipes'

// Convert image filenames into Vue asset URLs
function prepareRecipe(recipe: Recipe): Recipe {
  return {
    ...recipe,
    image: getRecipeImage(recipe.image),
  }
}

// Get all recipes
export async function getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }

  const recipes: Recipe[] = await response.json()
  return recipes.map(prepareRecipe)
}

// Get one recipe by ID
export async function getRecipeById(
  id: number
): Promise<Recipe | undefined> {
  const response = await fetch(`${API_URL}/${id}`)

  if (response.status === 404) {
    return undefined
  }

  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }

  const recipe: Recipe = await response.json()
  return prepareRecipe(recipe)
}

// Get recipes by category
export async function getRecipesByCategory(
  category: string
): Promise<Recipe[]> {
  const recipes = await getAllRecipes()

  return recipes.filter(
    (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
  )
}

// Search recipes
export async function searchRecipes(keyword: string): Promise<Recipe[]> {
  const recipes = await getAllRecipes()
  const search = keyword.toLowerCase().trim()

  return recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipe.category.toLowerCase().includes(search) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search)
      )
    )
  })
}
