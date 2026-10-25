export type MaterialItem = {
  id: string
  title: string
  kind: 'pptx' | 'docx' | 'md'
  file: string
  description: string
}

/** Файлы лежат в public/materials/ */
export const materials: MaterialItem[] = [
  {
    id: 'lesson-1',
    title: 'Занятие 1. Схема данных и миграции',
    kind: 'pptx',
    file: 'Занятие_1_Схема_данных_и_миграции.pptx',
    description: 'REST, Laravel, миграции equipment и requests, POST /api/migrate.',
  },
  {
    id: 'lesson-2',
    title: 'Занятие 2. Модели, связи, CRUD',
    kind: 'pptx',
    file: 'Занятие_2_Модели_связи_CRUD.pptx',
    description: 'Eloquent, belongsTo / hasMany, контроллеры и коды ответов.',
  },
  {
    id: 'lesson-3',
    title: 'Занятие 3. Валидация и ошибки API',
    kind: 'pptx',
    file: 'Занятие_3_Валидация_и_ошибки_API.pptx',
    description: 'Form Request, 422 и 404, проверка в Bruno.',
  },
  {
    id: 'lectures',
    title: 'Лекционные занятия (Word)',
    kind: 'docx',
    file: 'Лекционные_занятия_REST_API_Laravel.docx',
    description: 'Полный текст лекций преподавателя по курсу.',
  },
]

export function materialUrl(file: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}materials/${encodeURIComponent(file)}`
}

export function officeViewerUrl(absoluteFileUrl: string): string {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteFileUrl)}`
}

export function absolutePublicUrl(pathFromRoot: string): string {
  if (typeof window === 'undefined') return pathFromRoot
  return new URL(pathFromRoot, window.location.origin).href
}
