
import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import RecipeCard from '../components/recipe/RecipeCard.vue'
import type { Recipe } from '../models/Recipe'

const mockRecipe: Recipe = {
  id: 1,
  title: 'Korean Chili Tofu Salad',
  description: 'A delicious and healthy tofu salad.',
  image: '/images/tofu-salad.jpg',
  category: 'Lunch',
  ingredients: ['Tofu', 'Chili', 'Lettuce'],
  instructions: ['Prepare the tofu', 'Mix the ingredients'],
  preparationTime: 15,
  cookingTime: 20,
  author: 'Heng',
}

describe('RecipeCard', () => {
  const createWrapper = () =>
    mount(RecipeCard, {
      props: {
        recipe: mockRecipe,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

  it('renders the recipe title', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Korean Chili Tofu Salad')
  })

  it('renders the recipe category', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Lunch')
  })

  it('renders the recipe description', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('A delicious and healthy tofu salad.')
  })

  it('displays the correct recipe image', () => {
    const wrapper = createWrapper()
    const image = wrapper.find('img')

    expect(image.attributes('src')).toBe('/images/tofu-salad.jpg')
    expect(image.attributes('alt')).toBe('Korean Chili Tofu Salad')
  })

  it('calculates the total preparation and cooking time', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('35 min')
  })

  it('displays the correct number of ingredients', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('3 ingredients')
  })

  it('displays the recipe author', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('By Heng')
  })
})
