<script setup lang="ts">
import { materials, materialUrl } from '../materials'

const zipUrl = import.meta.env.VITE_COURSE_ZIP_URL || ''
const releaseUrl = 'https://github.com/Alena-Sergeevna/MetodKonkurs/releases'
</script>

<template>
  <h1>Скачать материалы</h1>
  <p class="muted" style="margin-bottom: 1.2rem">
    Архив учебного модуля и лекционные файлы. Для Linux EXE не нужен — в архиве файл
    <code>Курс</code> и скрипты установки.
  </p>

  <section class="card" style="margin-bottom: 1rem">
    <h2>Архив приложения</h2>
    <p class="muted">
      Полный комплект: <code>Курс.exe</code> + <code>_internal</code>, Laravel, Bruno, документация.
    </p>
    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 1rem">
      <a
        v-if="zipUrl"
        class="btn btn-primary"
        :href="zipUrl"
        target="_blank"
        rel="noreferrer"
      >
        Скачать ZIP курса
      </a>
      <a class="btn" :href="releaseUrl" target="_blank" rel="noreferrer">GitHub Releases</a>
    </div>
    <p v-if="!zipUrl" class="muted" style="margin-top: 0.8rem">
      Пока нет <code>VITE_COURSE_ZIP_URL</code>. Загрузите ZIP в Releases репозитория и пропишите
      ссылку в <code>.env</code>, либо положите файл в облако.
    </p>
  </section>

  <section class="card">
    <h2>Лекции</h2>
    <ul>
      <li v-for="item in materials" :key="item.id" style="margin-bottom: 0.55rem">
        <a :href="materialUrl(item.file)" download>{{ item.title }}</a>
        <span class="muted"> · {{ item.kind }}</span>
      </li>
    </ul>
  </section>
</template>
