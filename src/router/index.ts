import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MaterialsView from '../views/MaterialsView.vue'
import DownloadsView from '../views/DownloadsView.vue'
import TeacherLoginView from '../views/TeacherLoginView.vue'
import TeacherDashboardView from '../views/TeacherDashboardView.vue'
import PresentationView from '../views/PresentationView.vue'
import { auth, firebaseConfigured } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/materials', name: 'materials', component: MaterialsView },
    { path: '/materials/:id', name: 'presentation', component: PresentationView },
    { path: '/downloads', name: 'downloads', component: DownloadsView },
    { path: '/teacher/login', name: 'teacher-login', component: TeacherLoginView },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherDashboardView,
      meta: { requiresTeacher: true },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

function waitForAuth(): Promise<boolean> {
  if (!firebaseConfigured || !auth) return Promise.resolve(false)
  if (auth.currentUser) return Promise.resolve(true)
  return new Promise((resolve) => {
    const stop = onAuthStateChanged(auth!, (user) => {
      stop()
      resolve(Boolean(user))
    })
  })
}

router.beforeEach(async (to) => {
  if (!to.meta.requiresTeacher) return true
  const ok = await waitForAuth()
  if (!ok) return { name: 'teacher-login', query: { redirect: to.fullPath } }
  return true
})

export { router }
