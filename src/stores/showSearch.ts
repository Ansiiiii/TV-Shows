import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Show } from '../model/show'
import { getSearchShows } from '../service/showService'

export const useShowSearchStore = defineStore('showSearch', () => {
  const searchResults = ref<Show[]>([])

  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  const findShows = async (searchTerm: string) => {
    error.value = ''
    try {
      const result = await getSearchShows(searchTerm)
      isLoading.value = true
      searchResults.value = result
    } catch (e) {
      const err = e as Error
      error.value = err.message
    }
  }

  return { searchResults, isLoading, error, findShows }
})
