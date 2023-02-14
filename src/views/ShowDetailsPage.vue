<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

import { getShow } from "../service/showService";
import type { Show } from "../model/show";

// Get the id of the movie from the url
const route = useRoute();
const id = route.params.id as unknown as number;

// Load the show details
const show = ref<Show | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string>('');

const loadShow = async () => {
  isLoading.value = true;
  await getShow(id)
    .then((response) => {
      show.value = response;
    })
    .catch((error) => {
      errorMessage.value = error;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(async () => {
  loadShow();
});
</script>

<template>
  <div class="ShowDetails">
    <div v-if="errorMessage || !show" class="ShowDetails__Reload">
      <h1 class="error">{{ errorMessage }}</h1>
    </div>

    <template v-else>
    <div class="ShowDetails__Columns shadow-13">
      <div class="ShowDetails__Columns__Poster">
        <img :src="show?.image?.medium" :name="show?.name" />
      </div>

      <div class="ShowDetails__Columns__Info">
        <h1 class="text-h4 no-top-margin">{{ show?.name }}</h1>

        <h2 class="text-h5">Summary</h2>
        <div v-html="show?.summary" />

        <h2 class="text-h5">Genre</h2>
        <div>
          <span v-for="genre in show?.genres" :key="genre" class="genre">{{
            genre
          }}</span>
        </div>

        <h2 class="text-h5">Premiere</h2>
        <div>{{ show?.premiered }}</div>

        <h2 class="text-h5">Language</h2>
        <div>{{ show?.language }}</div>

        <h2 class="text-h5">Status</h2>
        <div>{{ show?.status }}</div>
      </div>
      <div>
        <RouterLink :to="`/`">
          <button class="backButton">BACK</button>
        </RouterLink>
      </div>
    </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ShowDetails {
  margin-top: 20px;

  .no-top-margin {
    margin-top: 0;
  }

  .genre {
    padding: 0px 10px 10px 0px;
  }

  &__Reload,
  &__Loader {
    height: 100%;
    min-height: 300px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    &_title {
      margin-right: 20px;
    }
  }

  &__BackButton {
    margin-bottom: 20px;
  }

  &__Columns {
    display: flex;
    padding: 20px;

    &__Poster {
      flex: 0 0 210px;
    }

    &__Info {
      flex: 1;
      padding-left: 20px;
    }
  }

  .backButton {
    background-color: white;
    color: black;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
  }
}
</style>
