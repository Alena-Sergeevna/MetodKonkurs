<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  collection,
  getDocs,
  orderBy,
  query,
  type DocumentData,
} from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'

type StudentRow = {
  id: string
  name: string
  group: string
  overallPercent: number
  lastLesson: string
  updatedAt: string
  lessons: Record<string, DocumentData>
  final?: DocumentData
  reportText?: string
}

const rows = ref<StudentRow[]>([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const selected = ref<StudentRow | null>(null)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return rows.value
  return rows.value.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.group.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q),
  )
})

function asDate(value: unknown): string {
  if (!value) return '—'
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'seconds' in value) {
    const sec = Number((value as { seconds: number }).seconds)
    return new Date(sec * 1000).toLocaleString('ru-RU')
  }
  return String(value)
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    if (!firebaseConfigured || !db) {
      error.value = 'Firebase не настроен.'
      return
    }
    const snap = await getDocs(query(collection(db, 'students'), orderBy('updatedAt', 'desc')))
    rows.value = snap.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: String(data.name || 'Студент'),
        group: String(data.group || ''),
        overallPercent: Number(data.overallPercent || 0),
        lastLesson: String(data.lastLessonLabel || data.lastLessonId || '—'),
        updatedAt: asDate(data.updatedAt),
        lessons: (data.lessons as Record<string, DocumentData>) || {},
        final: data.final as DocumentData | undefined,
        reportText: data.reportText ? String(data.reportText) : '',
      }
    })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Ошибка загрузки'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div style="display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap">
    <div>
      <h1>Студенты</h1>
      <p class="muted">Поиск по ФИО или группе. Данные приходят из кнопки «Отправить результат» в курсе.</p>
    </div>
    <button class="btn" type="button" :disabled="loading" @click="load">Обновить</button>
  </div>

  <label class="field" style="margin: 1rem 0; max-width: 420px">
    <span>Поиск</span>
    <input v-model="search" type="search" placeholder="Иванов или ИС-23" />
  </label>

  <p v-if="error" style="color: #fca5a5">{{ error }}</p>
  <p v-else-if="loading" class="muted">Загрузка…</p>
  <p v-else-if="!filtered.length" class="muted">Пока нет отправленных результатов.</p>

  <div v-else class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Студент</th>
          <th>Группа</th>
          <th>Прогресс</th>
          <th>Последняя отправка</th>
          <th>Когда</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in filtered" :key="row.id">
          <td>{{ row.name }}</td>
          <td>{{ row.group || '—' }}</td>
          <td>{{ row.overallPercent }}%</td>
          <td>{{ row.lastLesson }}</td>
          <td>{{ row.updatedAt }}</td>
          <td><button class="btn" type="button" @click="selected = row">Открыть</button></td>
        </tr>
      </tbody>
    </table>
  </div>

  <section v-if="selected" class="card" style="margin-top: 1.2rem">
    <div style="display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap">
      <h2>{{ selected.name }} <span class="muted">· {{ selected.group || 'без группы' }}</span></h2>
      <button class="btn" type="button" @click="selected = null">Закрыть</button>
    </div>
    <p>Общий прогресс: <strong>{{ selected.overallPercent }}%</strong></p>
    <div class="grid-2" style="margin-top: 0.8rem">
      <article v-for="(lesson, key) in selected.lessons" :key="key" class="card" style="padding: 0.9rem">
        <h3>Занятие {{ key }}</h3>
        <p class="muted">Статус: {{ lesson.status || '—' }}</p>
        <p>
          Практика: {{ lesson.practiceDone || 0 }}/{{ lesson.practiceTotal || 0 }} · Тест:
          {{ lesson.quizScore || 0 }}/{{ lesson.quizTotal || 0 }}
        </p>
      </article>
    </div>
    <p v-if="selected.final" style="margin-top: 0.8rem">
      Итог: {{ selected.final.score || 0 }}/{{ selected.final.total || 15 }}
      · {{ selected.final.passed ? 'зачёт' : 'без зачёта' }}
    </p>
    <pre
      v-if="selected.reportText"
      style="white-space: pre-wrap; background: #0d1526; padding: 1rem; border-radius: 12px; margin-top: 1rem"
    >{{ selected.reportText }}</pre>
  </section>
</template>
