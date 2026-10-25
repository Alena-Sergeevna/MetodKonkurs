<script setup lang="ts">
import { materials, materialUrl } from '../materials'
</script>

<template>
  <h1>Лекции и презентации</h1>
  <p class="muted" style="margin-bottom: 1.2rem">
    Можно скачать файл или открыть презентацию прямо на сайте (просмотр через Microsoft Office Online).
  </p>
  <div class="grid-2">
    <article v-for="item in materials" :key="item.id" class="card">
      <span class="badge">{{ item.kind.toUpperCase() }}</span>
      <h3 style="margin-top: 0.7rem">{{ item.title }}</h3>
      <p class="muted">{{ item.description }}</p>
      <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 1rem">
        <RouterLink class="btn btn-primary" :to="`/materials/${item.id}`">Открыть на сайте</RouterLink>
        <a class="btn" :href="materialUrl(item.file)" download>Скачать</a>
      </div>
    </article>
  </div>
</template>
