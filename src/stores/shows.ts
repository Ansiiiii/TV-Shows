import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { getShows } from "../service/showService";
import type { Show } from "../model/show";

export const useShowsStore = defineStore("shows", () => {
  const shows = ref<Show[]>([]);
  const page = ref(0);

  const isLoading = ref(false);
  const error = ref<string>("");

  /**
   * We do not have an indicator about how many more results are there, thus
   * we will just assume that if the request is successful and we still have results,
   * then there will be more in the next page
   */
  const hasMoreShows = ref(true);

  const loadMoreShows = async () => {
    isLoading.value = true;
    error.value = "";

    await getShows(page.value)
      .then((response) => {
        shows.value = shows.value.concat(response);
        page.value++;

        if (response.length === 0) {
          hasMoreShows.value = false;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const showsCount = computed(() => shows.value.length);

  const showsByGenre = computed(() => {
    return (genre: string) => {
      return shows.value.filter((show) => {
        return show.genres.includes(genre);
      });
    };
  });

  const genres = computed(() => {
    return shows.value.reduce((allGenres, show) => {
      for (const genre of show.genres) {
        allGenres.add(genre);
      }
      return allGenres;
    }, new Set<string>());
  });

  return {
    shows,
    isLoading,
    error,
    hasMoreShows,
    loadMoreShows,
    showsCount,
    showsByGenre,
    genres,
  };
});
