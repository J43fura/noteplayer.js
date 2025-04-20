<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <body class="flex flex-col items-center text-center pt-8 gap-4">
    <RouterView />
  </body>
</template>
