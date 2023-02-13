<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router'
import { useShowsStore } from './stores/shows'


const showsStore = useShowsStore()
let errorMessage = ref<string>('');

onMounted(async () => {
  if (showsStore.showsCount === 0) {
    await showsStore.loadMoreShows().catch((error) => {
      errorMessage.value = error.message;
    });
  }
});

</script>

<template>
   <h1 v-if="errorMessage" class="error">
    {{ errorMessage }}. Please try again...
  </h1>
  <RouterView  />
</template>

