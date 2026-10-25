<script setup lang="ts">
const zipUrl = import.meta.env.VITE_COURSE_ZIP_URL || ''
</script>

<template>
  <section class="hero">
    <div>
      <span class="badge">Цифровой образовательный контент</span>
      <h1>REST API на Laravel с тестированием в Bruno</h1>
      <p class="muted">
        Автономный учебный модуль для СПО (УГПС 09.00.00): миграции, модели Eloquent,
        валидация Form Request, Git и проверка запросов в Bruno. Практика с автопроверкой
        и обратной связью для роли «студент».
      </p>
      <div style="display: flex; gap: 0.7rem; flex-wrap: wrap; margin-top: 1rem">
        <RouterLink class="btn btn-primary" to="/downloads">Скачать курс</RouterLink>
        <RouterLink class="btn" to="/materials">Открыть лекции</RouterLink>
        <RouterLink class="btn" to="/teacher">Кабинет преподавателя</RouterLink>
      </div>
    </div>
    <div class="hero-panel">
      <h2>Что внутри архива</h2>
      <ul>
        <li>Windows: <code>Курс.exe</code></li>
        <li>Astra Linux / РЕД ОС / Альт: файл <code>Курс</code></li>
        <li>Laravel 12 + Bruno-коллекция</li>
        <li>4 занятия + итог (15 вопросов, зачёт от 12)</li>
      </ul>
    </div>
  </section>

  <section class="grid-3" style="margin-bottom: 1.25rem">
    <article class="card">
      <h3>Для студента</h3>
      <p class="muted">
        Распаковать архив, указать имя, пройти занятия. После каждой практики —
        кнопка «Отправить результат» преподавателю.
      </p>
    </article>
    <article class="card">
      <h3>Для преподавателя</h3>
      <p class="muted">
        Войти через Firebase, найти группу или ФИО, увидеть прогресс по шагам,
        тестам и итоговой сдаче.
      </p>
    </article>
    <article class="card">
      <h3>Для экспертизы</h3>
      <p class="muted">
        Ссылка на этот сайт + ZIP курса. Роль студент, обратная связь встроена
        в учебный модуль.
      </p>
    </article>
  </section>

  <section class="card">
    <h2>Как устроен блок</h2>
    <div class="grid-2">
      <div>
        <p><strong>1.</strong> Миграции и схема БД</p>
        <p><strong>2.</strong> Модели, связи, CRUD</p>
        <p><strong>3.</strong> Валидация и ошибки 422/404</p>
        <p><strong>4.</strong> Git</p>
        <p><strong>Итог.</strong> Тест 15 вопросов</p>
      </div>
      <div>
        <p class="muted">
          Объём: 4 занятия + итог, 7 часов (норма конкурса — не меньше 3 занятий и 6 часов).
          LMS не обязательна: курс автономный.
        </p>
        <p v-if="zipUrl" style="margin-top: 1rem">
          <a class="btn btn-primary" :href="zipUrl" target="_blank" rel="noreferrer">Архив курса</a>
        </p>
        <p v-else class="muted" style="margin-top: 1rem">
          Ссылку на ZIP задайте в <code>VITE_COURSE_ZIP_URL</code> или на странице «Скачать».
        </p>
      </div>
    </div>
  </section>
</template>
