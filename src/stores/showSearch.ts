import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Show } from '../model/show'
import { getSearchShows } from '../service/showService'

export const useShowSearchStore = defineStore('showSearch', () => {
  const searchResults = ref<Show[]>([])

  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  const findShows = async (searchTerm: string) => {
    error.value = "";
    await getSearchShows(searchTerm)
      .then((response) => {
        isLoading.value = true;
        searchResults.value = response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return { searchResults, isLoading, error, findShows }
})
