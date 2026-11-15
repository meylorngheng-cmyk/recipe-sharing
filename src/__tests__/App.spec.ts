
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'

describe('App', () => {
  it('mounts and renders properly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          component: { template: '<div>Home page</div>' },
        },
        {
          path: '/login',
          component: { template: '<div>Login page</div>' },
        },
        {
          path: '/register',
          component: { template: '<div>Register page</div>' },
        },
        {
          path: '/profile',
          component: { template: '<div>Profile page</div>' },
        },
        {
          path: '/collections',
          component: { template: '<div>Collections page</div>' },
        },
        {
          path: '/plan',
          component: { template: '<div>Plan page</div>' },
        },
        {
          path: '/my-recipes',
          component: { template: '<div>My Recipes page</div>' },
        },
      ],
    })

    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    })

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tasteit')
  })
})
