<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="shell">
    <AppHeader />
    <main class="main">
      <RouterView />
    </main>
    <footer class="footer">
      <p>
        Номинация 2 · УГПС 09.00.00 ·
        <a href="https://github.com/Alena-Sergeevna/MetodKonkurs" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  </div>
</template>
