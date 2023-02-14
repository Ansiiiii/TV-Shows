<script setup lang="ts">
import ShowsByGenre from "../components/ShowsByGenre.vue";
import ShowsList from "../components/SearchShowsList.vue";
import { useShowsStore } from "../stores/shows";
import { ref } from "vue";
import { useShowSearchStore } from "../stores/showSearch";
const showsStore = useShowsStore();
const searchstore = useShowSearchStore();
const searchValue = ref<string>('');
let errorMessage = ref<string>('');

const searchResults = () => {
  searchstore.findShows(searchValue.value).catch((error) => {
    errorMessage.value = error.message;
  });
};
</script>

<template>
  <h1>TV App</h1>
  <input
    v-model="searchValue"
    type="search"
    name="search"
    placeholder="Search show...."
    autofocus
    required
    @keyup="searchResults"
  />

  <template v-if="searchstore.isLoading">
    <ShowsList
      v-if="searchstore.searchResults.length >= 0 && searchValue"
      title="Search results"
      no-results-text="There are no shows matching your search criteria."
      load-more-results-text="Load more shows"
      :shows="searchstore.searchResults"
      :is-loading="searchstore.isLoading"
      :error-message="errorMessage"
    />
  </template>
  <template v-else-if="errorMessage">
    <ShowsList
      title="Search Results not found"
      :error-message="errorMessage"
    />
  </template>

  <ShowsByGenre
    v-for="genre in showsStore.genres"
    :key="genre"
    :title="genre"
    :shows="showsStore.showsByGenre(genre)"
    :is-loading="showsStore.isLoading"
    no-results-text="There are no shows to display yet."
  />
</template>

<style scoped>
h1 {
  text-align: center;
}
input[type="search"] {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
