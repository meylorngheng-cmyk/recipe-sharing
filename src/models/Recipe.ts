
export interface Recipe {
  id: number
  title: string
  description: string
  image: string
  category: string
  ingredients: string[]
  instructions: string[]
  preparationTime: number
  cookingTime: number
  author: string
}
