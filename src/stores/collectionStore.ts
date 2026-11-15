
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Collection } from '../models/Collection'

function loadCollections(): Collection[] {
  try {
    const saved = localStorage.getItem('tasteit_collections')
    return saved ? (JSON.parse(saved) as Collection[]) : []
  } catch {
    return []
  }
}

export const useCollectionStore = defineStore('collection', () => {
  const collections = ref<Collection[]>(loadCollections())

  function saveToStorage() {
    localStorage.setItem(
      'tasteit_collections',
      JSON.stringify(collections.value),
    )
  }

  function createCollection(name: string, description: string) {
    const newCollection: Collection = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      recipeIds: [],
      createdAt: new Date().toISOString(),
    }

    collections.value.push(newCollection)
    saveToStorage()
  }

  function deleteCollection(id: number) {
    collections.value = collections.value.filter(
      collection => collection.id !== id,
    )
    saveToStorage()
  }

  function addRecipeToCollection(collectionId: number, recipeId: number) {
    const collection = collections.value.find(
      item => item.id === collectionId,
    )

    if (!collection || collection.recipeIds.includes(recipeId)) return

    collection.recipeIds.push(recipeId)
    saveToStorage()
  }

  function removeRecipeFromCollection(
    collectionId: number,
    recipeId: number,
  ) {
    const collection = collections.value.find(
      item => item.id === collectionId,
    )

    if (!collection) return

    collection.recipeIds = collection.recipeIds.filter(
      id => id !== recipeId,
    )
    saveToStorage()
  }

  const collectionCount = computed(() => collections.value.length)

  return {
    collections,
    collectionCount,
    createCollection,
    deleteCollection,
    addRecipeToCollection,
    removeRecipeFromCollection,
  }
})
