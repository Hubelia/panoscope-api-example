<template>
  <div>
    <h1>Movies</h1>
    <p v-if="moviesPending">
      Loading movies...
    </p>
    <ul v-if="movies">
      <li v-for="movie of movies" :key="movie.id">
        {{ movie.original_title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

// Fetch movies from the /api/movies route. See the route implementation at /server/api/movies.ts
const { data: movies, pending: moviesPending } = useFetch('/api/movies')
</script>
