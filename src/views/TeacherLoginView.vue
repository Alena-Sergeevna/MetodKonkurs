<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firebaseConfigured } from '../firebase'

const route = useRoute()
const router = useRouter()
const email = ref('')
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
    <h1>Вход преподавателя</h1>
    <p class="muted">
      Учётную запись создайте в Firebase Console → Authentication (Email/Password).
      Студенты на сайт не входят — они отправляют результат из учебного модуля.
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
        {{ loading ? 'Вход…' : 'Войти' }}
      </button>
    </form>
  </section>
</template>
