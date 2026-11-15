
import type { Recipe } from '../models/Recipe'
import { getRecipeImage } from './images'

export const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Korean Chili Tofu Salad',
    description: 'A fresh salad with tofu and vegetables.',
    image: getRecipeImage('tofu-salad.jpg'),
    category: 'Lunch',
    ingredients: ['Tofu', 'Lettuce', 'Carrot', 'Kimchi'],
    instructions: [
      'Prepare and wash the vegetables.',
      'Cut the tofu into small pieces.',
      'Mix everything together and serve.'
    ],
    preparationTime: 15,
    cookingTime: 10,
    author: 'Tasteit Kitchen'
  },
  {
    id: 2,
    title: 'Grilled Chicken',
    description: 'Delicious grilled chicken with fresh herbs.',
    image: getRecipeImage('Grilled chichken.jpg'),
    category: 'Dinner',
    ingredients: ['Chicken', 'Garlic', 'Salt', 'Pepper'],
    instructions: [
      'Prepare the chicken.',
      'Season with garlic, salt and pepper.',
      'Cook until fully cooked and serve.'
    ],
    preparationTime: 20,
    cookingTime: 30,
    author: 'Tasteit Kitchen'
  },
  {
    id: 3,
    title: 'Pancakes',
    description: 'Soft and fluffy pancakes for breakfast.',
    image:getRecipeImage('pancakes.jpg'),
    category: 'Breakfast',
    ingredients: ['Flour', 'Milk', 'Eggs', 'Sugar'],
    instructions: [
      'Mix all ingredients.',
      'Pour the mixture into a pan.',
      'Cook both sides until golden.'
    ],
    preparationTime: 10,
    cookingTime: 15,
    author: 'Tasteit Kitchen'
  }
]
