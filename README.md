# MetodKonkurs — сайт курса «REST API на Laravel»

Публичный сайт для [методического конкурса](https://github.com/Alena-Sergeevna/MetodKonkurs): описание, скачивание архива, лекции на сайте, кабинет преподавателя (Firebase).

Сайт: после публикации Pages —
**https://alena-sergeevna.github.io/MetodKonkurs/**

## Быстрый старт

```bash
npm install
cp .env.example .env
# заполните VITE_FIREBASE_* и VITE_COURSE_ZIP_URL
npm run dev
```

## Firebase (один раз)

1. Создайте проект на [Firebase Console](https://console.firebase.google.com/).
2. Authentication → Sign-in method → **Email/Password** → включить.
3. Создайте пользователя преподавателя (Authentication → Users → Add user).
4. Firestore Database → создать базу (production mode), затем вставить правила из `firestore.rules`.
5. Project settings → Your apps → Web app → скопировать конфиг в `.env`.
6. Тот же `apiKey` и `projectId` пропишите в учебном модуле:
   `REST_API_Training/Учебный_модуль/app/content/portal.json`.

## GitHub Pages

```bash
npm run deploy
```

Или: Settings → Pages → Deploy from branch `gh-pages`.

В репозитории уже задан `base: '/MetodKonkurs/'` в `vite.config.ts`.

## Архив курса

1. Соберите ZIP из папки `REST_API_Training` (с `Курс.exe`, `_internal`, без лишних `build/`).
2. Загрузите в **Releases** этого репозитория или на Яндекс.Диск.
3. Ссылку укажите в `VITE_COURSE_ZIP_URL`.

## Материалы

Файлы лекций лежат в `public/materials/`. Просмотр PPTX/DOCX на сайте — через Microsoft Office Online по публичному URL GitHub Pages.

## Отправка результатов студентом

В десктоп-курсе после практики есть кнопка **«Отправить результат»**. Она пишет в Firestore:

- `students/{studentKey}` — актуальный снимок для поиска преподавателем;
- `submissions/{autoId}` — история каждой отправки.
