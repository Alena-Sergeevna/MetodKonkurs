<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { materials, materialUrl, officeViewerUrl, absolutePublicUrl } from '../materials'

const route = useRoute()
const item = computed(() => materials.find((m) => m.id === route.params.id))

const downloadHref = computed(() => (item.value ? materialUrl(item.value.file) : '#'))
const viewerSrc = computed(() => {
  if (!item.value) return ''
  const abs = absolutePublicUrl(materialUrl(item.value.file))
  return officeViewerUrl(abs)
})
</script>

<template>
  <div v-if="item">
    <p>
      <RouterLink to="/materials">← К списку лекций</RouterLink>
    </p>
    <h1>{{ item.title }}</h1>
    <p class="muted">{{ item.description }}</p>
    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin: 1rem 0">
      <a class="btn btn-primary" :href="downloadHref" download>Скачать файл</a>
      <a class="btn" :href="viewerSrc" target="_blank" rel="noreferrer">Открыть в новой вкладке</a>
    </div>
    <iframe
      v-if="item.kind === 'pptx' || item.kind === 'docx'"
      class="iframe-box"
      :src="viewerSrc"
      title="Просмотр презентации"
    />
    <p class="muted" style="margin-top: 0.75rem; font-size: 0.9rem">
      Если встроенный просмотр пустой, файл ещё не опубликован на GitHub Pages или Office Online
      временно недоступен — используйте скачивание.
    </p>
  </div>
  <div v-else class="card">
    <p>Материал не найден.</p>
    <RouterLink to="/materials">Вернуться</RouterLink>
  </div>
</template>
