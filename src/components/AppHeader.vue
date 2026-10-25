<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { auth, firebaseConfigured } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const email = ref<string | null>(null)

let stop: (() => void) | undefined
onMounted(() => {
  if (!auth) return
  stop = onAuthStateChanged(auth, (user) => {
    email.value = user?.email ?? null
  })
})
onUnmounted(() => stop?.())

const links = [
  { to: '/', label: 'Главная' },
  { to: '/materials', label: 'Лекции' },
  { to: '/downloads', label: 'Скачать' },
  { to: '/teacher', label: 'Преподавателю' },
]

const active = computed(() => route.path)

async function logout() {
  if (auth) await signOut(auth)
}
</script>

<template>
  <header class="top">
    <RouterLink class="brand" to="/">
      <span class="mark">API</span>
      <span>
        <strong>REST API на Laravel</strong>
        <small>Методический конкурс · номинация 2</small>
      </span>
    </RouterLink>
    <nav>
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="{ active: active === link.to || (link.to !== '/' && active.startsWith(link.to)) }"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
    <div class="auth">
      <template v-if="firebaseConfigured && email">
        <span class="who">{{ email }}</span>
        <button class="btn" type="button" @click="logout">Выйти</button>
      </template>
      <RouterLink v-else class="btn" to="/teacher/login">Вход преподавателя</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.top {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid var(--line);
  background: rgba(11, 18, 32, 0.85);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 20;
}
.brand {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  color: inherit;
}
.brand strong {
  display: block;
}
.brand small {
  display: block;
  color: var(--muted);
  font-size: 0.78rem;
}
.mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: linear-gradient(145deg, #3b82f6, #0ea5a4);
  color: white;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
nav a {
  color: #c5d0e6;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
}
nav a.active,
nav a:hover {
  background: #182744;
  color: white;
}
.auth {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}
.who {
  color: var(--muted);
  font-size: 0.85rem;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
