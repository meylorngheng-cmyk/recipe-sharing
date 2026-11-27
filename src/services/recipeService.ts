
import type { Recipe } from '../models/Recipe'
import { getRecipeImage } from '../data/images'
import { getRecipes, getRecipeById as fetchRecipeById } from '../api/recipes'

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
  const recipes = await getRecipes()
  return recipes.map(prepareRecipe)
}

// Get one recipe by ID
export async function getRecipeById(
  id: number
): Promise<Recipe | undefined> {
  try {
    const recipe = await fetchRecipeById(id)
    return prepareRecipe(recipe)
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return undefined
    }
    throw error
  }
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
