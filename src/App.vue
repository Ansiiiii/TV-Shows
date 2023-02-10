<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useShowsStore } from './stores/shows'


const showsStore = useShowsStore()

onMounted(async () => {
  if (showsStore.showsCount === 0) {
    showsStore.loadMoreShows()
  }
})

</script>

<template>
  <RouterView  />
</template>

