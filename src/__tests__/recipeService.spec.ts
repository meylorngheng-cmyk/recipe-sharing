
import { describe, expect, it } from 'vitest'
import {
  getAllRecipes,
  getRecipeById,
  getRecipesByCategory,
  searchRecipes,
} from '../services/recipeService'

describe('RecipeService', () => {
  it('returns all recipes', async () => {
    const result = await getAllRecipes()

    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an array of recipes', async () => {
    const result = await getAllRecipes()

    expect(Array.isArray(result)).toBe(true)
  })

  it('finds a recipe by its ID', async () => {
    const result = await getRecipeById(1)

    expect(result).toBeDefined()
    expect(result?.id).toBe(1)
  })

  it('returns undefined for an unknown recipe ID', async () => {
    const result = await getRecipeById(-1)

    expect(result).toBeUndefined()
  })

  it('filters recipes by category', async () => {
    const result = await getRecipesByCategory('Lunch')

    expect(result.length).toBeGreaterThan(0)
    expect(result.every(recipe => recipe.category.toLowerCase() === 'lunch')).toBe(true)
  })

  it('searches recipes by title', async () => {
    const result = await searchRecipes('tofu')

    expect(result.length).toBeGreaterThan(0)
    expect(result.some(recipe => recipe.title.toLowerCase().includes('tofu'))).toBe(true)
  })

  it('returns all recipes when searching with an empty keyword', async () => {
    const result = await searchRecipes('')

    expect(result.length).toBeGreaterThan(0)
  })
})
