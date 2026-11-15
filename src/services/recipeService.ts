
import type { Recipe } from '../models/Recipe'
import { recipes } from '../data/recipes'

// Get all recipes
export async function getAllRecipes(): Promise<Recipe[]> {
  return recipes
}

// Get one recipe by ID
export async function getRecipeById(
  id: number
): Promise<Recipe | undefined> {
  return recipes.find((recipe) => recipe.id === id)
}

// Get recipes by category
export async function getRecipesByCategory(
  category: string
): Promise<Recipe[]> {
  return recipes.filter(
    (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
  )
}

// Search recipes by title
export async function searchRecipes(keyword: string): Promise<Recipe[]> {
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
