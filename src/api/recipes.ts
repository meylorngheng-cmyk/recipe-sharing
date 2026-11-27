
import type { Recipe } from '../models/Recipe'
import { http } from './http'

export function getRecipes(): Promise<Recipe[]> {
  return http<Recipe[]>('/recipes')
}

export function getRecipeById(id: number): Promise<Recipe> {
  return http<Recipe>(`/recipes/${id}`)
}
