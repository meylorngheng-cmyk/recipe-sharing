
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'  
import '../assets/styles/home.css'
import { useRecipeStore } from '../stores/recipeStore'
import RecipeCard from '../components/recipe/RecipeCard.vue'
import { useCollectionStore } from '../stores/collectionStore'

const recipeStore = useRecipeStore()
const collectionStore = useCollectionStore()
const showSaveMessage = ref(false)
const saveMessage = ref('')

onMounted(() => {
  recipeStore.fetchRecipes()
})

// Hero carousel data
const slides = [
  {
    label: "CHEF'S PICKS",
    title: 'Freshness',
    subtitle: 'in every bite',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400',
  },
  {
    label: 'HEALTHY CHOICES',
    title: 'Eat better',
    subtitle: 'feel better',
    
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1400',
  },
  {
    label: 'MADE WITH LOVE',
    title: 'Good food',
    subtitle: 'shared with joy',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400',
  },
]

const currentSlide = ref(0)

const activeSlide = computed(() => {
  return slides[currentSlide.value] ?? slides[0]!
})

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function previousSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + slides.length) % slides.length
}

function selectCategory(category: string) {
  recipeStore.selectedCategory = category
}

function handleSaveRecipe(recipeId: number) {
  const firstCollection = collectionStore.collections[0]

  if (!firstCollection) {
    saveMessage.value = 'Please create a collection first!'
    showSaveMessage.value = true
    return
  }

  const alreadySaved = firstCollection.recipeIds.includes(recipeId)

  collectionStore.addRecipeToCollection(
    firstCollection.id,
    recipeId,
  )

  saveMessage.value = alreadySaved
    ? 'This recipe is already in your collection.'
    : `Recipe saved to ${firstCollection.name}!`

  showSaveMessage.value = true
}

// Cuisine categories
const categories = [
  {
    name: 'Breakfast',
    count: 124,
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=300',
  },
  {
    name: 'Lunch',
    count: 236,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=300',
  },
  {
    name: 'Dinner',
    count: 312,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=300',
  },
  {
    name: 'Dessert',
    count: 180,
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300',
  },
  {
    name: 'Salad',
    count: 96,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300',
  },
  {
    name: 'Vegetarian',
    count: 88,
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300',
  },
]

</script>

<template>
  <div class="home-page">
    <!-- Hero carousel -->
    <section class="hero">
      <img
        class="hero-image"
        :src="activeSlide.image"
        alt="Fresh and delicious food"
      />

      <div class="hero-overlay"></div>

      <button
        class="hero-arrow hero-arrow-left"
        aria-label="Previous slide"
        @click="previousSlide"
      >
        ‹
      </button>


      <div class="hero-content">
        <p class="hero-label">
          <span></span>
          {{ activeSlide.label }}
        </p>

        <h1>
          {{ activeSlide.title }}
          <br />
          <em>{{ activeSlide.subtitle }}</em>
        </h1>

        

        <a href="#popular-recipes" class="hero-button">
          <p>Explore recipes</p>
        </a>
      </div>

      <button
        class="hero-arrow hero-arrow-right"
        aria-label="Next slide"
        @click="nextSlide"
      >
        ›
      </button>

      <div class="hero-dots">
        <button
          v-for="(slide, index) in slides"
          :key="slide.label"
          :class="{ active: currentSlide === index }"
          :aria-label="`Go to slide ${index + 1}`"
          @click="currentSlide = index"
        ></button>
      </div>
    </section>

  <div class="search-actions"> 
  <div class="recipe-search">
    <span class="search-icon">⌕</span>

    <input
      v-model="recipeStore.searchKeyword"
      type="text"
      placeholder="What would you like to cook today?"
      aria-label="Search recipes"
    />

    <span class="search-hint">Search</span>
      </div>
      <RouterLink
        to="/add-recipe"
        class="add-recipe-home"
        aria-label="Add Recipe"
        title="Add Recipe"
      >
        +
      </RouterLink>
    </div>


    <!-- Cuisine categories -->
    <section id="categories" class="section">
      <div class="section-heading">
        <h2>Explore by Cuisine</h2>
         <a href="#categories">View All</a>
       
      </div>

      <div class="category-list">
        <article
              v-for="category in categories"
              :key="category.name"
              class="category-card"
              :class="{
                selected: recipeStore.selectedCategory === category.name
              }"
              role="button"
              tabindex="0"
              @click="selectCategory(category.name)"
              @keydown.enter="selectCategory(category.name)"
              @keydown.space.prevent="selectCategory(category.name)"
         >
          <img :src="category.image" :alt="category.name" />

          <div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.count }} recipes</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Popular recipes -->
    <section id="popular-recipes" class="section">
      <div class="section-heading">
        <h2>Popular Recipes</h2>
        <a href="#popular-recipes">View All</a>
      </div>

      <div class="recipe-grid">
        <p v-if="recipeStore.loading">
          Loading recipes...
        </p>

        <p v-else-if="recipeStore.error">
          {{ recipeStore.error }}
        </p>

        <p v-else-if="recipeStore.filteredRecipes.length === 0">
          No recipes found.
        </p>

       <RecipeCard
        v-else
        v-for="recipe in recipeStore.filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @save="handleSaveRecipe"
      />
    </div>

      <section id="seasonal" class="seasonal-section">
  <div class="section-heading">
    <h2>Seasonal Picks</h2>
    <p>Fresh inspiration for your next meal</p>
  </div>

  <div class="seasonal-grid">
    <RecipeCard
      v-for="recipe in recipeStore.recipes.slice(0, 2)"
      :key="recipe.id"
      :recipe="recipe"
      @save="handleSaveRecipe"
    />
  </div>
</section>
      
    </section>

    <!-- Save Recipe Popup -->
<div
  v-if="showSaveMessage"
  class="save-popup-overlay"
  @click.self="showSaveMessage = false"
>
  <div class="save-popup-card">
    <div class="save-popup-icon">♡</div>

    <h2>Recipe Saved!</h2>

    <p>{{ saveMessage }}</p>

    <button @click="showSaveMessage = false">
      Okay
    </button>
  </div>
</div>
  </div>
</template>
