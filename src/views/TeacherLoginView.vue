<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firebaseConfigured } from '../firebase'

const route = useRoute()
const router = useRouter()
const email = ref('teacher@rest.ru')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  if (!firebaseConfigured || !auth) {
    error.value = 'Firebase не настроен. Заполните .env по образцу .env.example.'
    return
  }
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/teacher'
    await router.replace(redirect)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Не удалось войти'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="card" style="max-width: 460px; margin: 0 auto">
    <h1>Вход по email и паролю</h1>
    <p class="muted">
      Кабинет преподавателя. Студенты на сайт не входят — они отправляют результат
      из учебного модуля.
    </p>
    <p class="muted" style="margin-top: 0.75rem">
      Демо-доступ:<br />
      email — <code>teacher@rest.ru</code><br />
      пароль — <code>rest2026</code>
    </p>
    <form style="margin-top: 1rem" @submit.prevent="submit">
      <label class="field">
        <span>Email</span>
        <input v-model="email" type="email" required autocomplete="username" />
      </label>
      <label class="field">
        <span>Пароль</span>
        <input v-model="password" type="password" required autocomplete="current-password" />
      </label>
      <p v-if="error" style="color: #fca5a5">{{ error }}</p>
      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ loading ? 'Вход…' : 'Войти по email и паролю' }}
      </button>
    </form>
  </section>
</template>
