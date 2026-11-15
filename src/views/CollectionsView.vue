
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCollectionStore } from '../stores/collectionStore'
import { useRecipeStore } from '../stores/recipeStore'
import '../assets/styles/collections.css'

const collectionStore = useCollectionStore()
const recipeStore = useRecipeStore()

const showForm = ref(false)
const collectionName = ref('')
const collectionDescription = ref('')
const selectedCollectionId = ref<number | null>(null)

// Load recipes when the page opens
onMounted(() => {
  if (recipeStore.recipes.length === 0) {
    void recipeStore.fetchRecipes()
  }
})

// Find the selected collection
const selectedCollection = computed(() =>
  collectionStore.collections.find(
    collection => collection.id === selectedCollectionId.value,
  ),
)

// Get actual recipe objects using their IDs
const savedRecipes = computed(() => {
  if (!selectedCollection.value) return []

  return selectedCollection.value.recipeIds
    .map(id => recipeStore.recipes.find(recipe => recipe.id === id))
    .filter(recipe => recipe !== undefined)
})

function createCollection() {
  if (!collectionName.value.trim()) return

  collectionStore.createCollection(
    collectionName.value,
    collectionDescription.value,
  )

  collectionName.value = ''
  collectionDescription.value = ''
  showForm.value = false
}

function removeRecipe(recipeId: number) {
  if (selectedCollectionId.value === null) return

  collectionStore.removeRecipeFromCollection(
    selectedCollectionId.value,
    recipeId,
  )
}
</script>

<template>
  <div class="collections-page">

    <!-- COLLECTION DETAIL VIEW -->
    <section v-if="selectedCollection" class="collection-detail">

      <button
        class="back-collections-btn"
        @click="selectedCollectionId = null"
      >
        ← Back to Collections
      </button>

      <div class="collections-header">
        <div>
          <span class="collections-eyebrow">YOUR PERSONAL COOKBOOK</span>
          <h1>{{ selectedCollection.name }}</h1>
          <p>
            {{ selectedCollection.description || 'Your personal recipe collection.' }}
          </p>
        </div>
      </div>

      <div class="collections-section-heading">
        <h2>Saved Recipes</h2>
        <span>{{ savedRecipes.length }} recipes</span>
      </div>

      <div v-if="savedRecipes.length === 0" class="empty-collections">
        <div class="empty-collections-icon">♡</div>
        <h3>No recipes saved yet</h3>
        <p>Go to the home page and save some recipes to this collection.</p>
        <RouterLink to="/" class="back-collections-btn">
          Explore Recipes
        </RouterLink>
      </div>

      <div v-else class="saved-recipes-grid">
        <article
          v-for="recipe in savedRecipes"
          :key="recipe.id"
          class="saved-recipe-card"
        >
          <RouterLink
            :to="{ name: 'recipe-detail', params: { id: recipe.id } }"
            class="saved-recipe-link"
          >
            <img :src="recipe.image" :alt="recipe.title" />

            <div class="saved-recipe-content">
              <span>{{ recipe.category }}</span>
              <h3>{{ recipe.title }}</h3>
              <p>{{ recipe.description }}</p>
            </div>
          </RouterLink>

          <button
            class="remove-saved-recipe-btn"
            @click="removeRecipe(recipe.id)"
          >
            Remove
          </button>
        </article>
      </div>
    </section>

    <!-- COLLECTION LIST VIEW -->
    <template v-else>
      <section class="collections-header">
        <div>
          <span class="collections-eyebrow">YOUR PERSONAL COOKBOOK</span>
          <h1>My Collections</h1>
          <p>Keep your favorite recipes organized in one place.</p>
        </div>

        <button
          class="create-collection-btn"
          @click="showForm = !showForm"
        >
          + Create Collection
        </button>
      </section>

      <section v-if="showForm" class="collection-form">
        <h2>Create a New Collection</h2>

        <form @submit.prevent="createCollection">
          <label for="collection-name">Collection Name</label>
          <input
            id="collection-name"
            v-model="collectionName"
            placeholder="e.g. My Favorite Dinners"
            required
          />

          <label for="collection-description">Description</label>
          <textarea
            id="collection-description"
            v-model="collectionDescription"
            placeholder="What recipes will you save here?"
          />

          <div class="collection-form-actions">
            <button type="button" @click="showForm = false">
              Cancel
            </button>
            <button type="submit">Save Collection</button>
          </div>
        </form>
      </section>

      <section class="collections-content">
        <div class="collections-section-heading">
          <h2>Your Collections</h2>
          <span>{{ collectionStore.collectionCount }} collections</span>
        </div>

        <div
          v-if="collectionStore.collections.length === 0"
          class="empty-collections"
        >
          <div class="empty-collections-icon">♡</div>
          <h3>No collections yet</h3>
          <p>Create your first collection to organize your favorite recipes.</p>
          <button @click="showForm = true">
            Create Your First Collection
          </button>
        </div>

        <div v-else class="collections-grid">
          <article
            v-for="collection in collectionStore.collections"
            :key="collection.id"
            class="collection-card"
          >
            <div class="collection-card-icon">♡</div>
            <h3>{{ collection.name }}</h3>

            <p>
              {{ collection.description || 'Your personal recipe collection.' }}
            </p>

            <span>{{ collection.recipeIds.length }} saved recipes</span>

            <button
              class="view-collection-btn"
              @click="selectedCollectionId = collection.id"
            >
              View Collection →
            </button>

            <button
              class="delete-collection-btn"
              @click="collectionStore.deleteCollection(collection.id)"
            >
              Delete
            </button>
          </article>
        </div>
      </section>
    </template>

  </div>
</template>
