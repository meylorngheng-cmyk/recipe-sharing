
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  name: string
  email: string
}

interface Account extends User {
  password: string
}

function loadAccounts(): Account[] {
  try {
    const savedAccounts = localStorage.getItem('tasteit_accounts')
    return savedAccounts ? JSON.parse(savedAccounts) as Account[] : []
  } catch {
    return []
  }
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const accounts = ref<Account[]>(loadAccounts())

  const isAuthenticated = computed(() => currentUser.value !== null)

  function saveAccounts() {
    localStorage.setItem('tasteit_accounts', JSON.stringify(accounts.value))
  }

  function register(name: string, email: string, password: string): boolean {
    const existingAccount = accounts.value.find(
      account => account.email.toLowerCase() === email.toLowerCase(),
    )

    if (existingAccount) {
      return false
    }

    accounts.value.push({ name, email, password })
    saveAccounts()

    currentUser.value = { name, email }

    return true
  }

  function login(email: string, password: string): boolean {
    const account = accounts.value.find(
      account =>
        account.email.toLowerCase() === email.trim().toLowerCase() &&
        account.password === password,
    )

    if (!account) {
      return false
    }

    currentUser.value = {
      name: account.name,
      email: account.email,
    }

    return true
  }

  function logout() {
    currentUser.value = null
  }

  return {
    currentUser,
    accounts,
    isAuthenticated,
    register,
    login,
    logout,
  }
})
