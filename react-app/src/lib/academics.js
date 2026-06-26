// Derives timetable + grade data from the active preset's course/learner data,
// so everything stays consistent per demo without extra seed duplication.

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
export const TODAY_DAY = 'Thu' // June 18, 2026 is a Thursday in this prototype

const ROOMS = ['Room 12', 'Lab 1', 'Room 5', 'Hall A', 'Room 8', 'Room 3']
export const TT_COLORS = ['blue', 'green', 'purple', 'orange', 'teal', 'red']

// 13 lectures spread across the week
const PATTERN = [
  ['Mon', '08:00'], ['Mon', '10:00'], ['Mon', '12:00'],
  ['Tue', '08:00'], ['Tue', '10:00'], ['Tue', '12:00'],
  ['Wed', '08:00'], ['Wed', '10:00'],
  ['Thu', '08:00'], ['Thu', '10:00'], ['Thu', '12:00'],
  ['Fri', '08:00'], ['Fri', '10:00'],
]

function addMinutes(t, m) {
  const [h, mm] = t.split(':').map(Number)
  const tot = h * 60 + mm + m
  return `${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`
}

export function buildTimetable(courses) {
  const subs = courses.length ? courses : [{ title: 'Lesson', icon: 'book' }]
  return PATTERN.map(([day, time], i) => {
    const idx = i % subs.length
    const c = subs[idx]
    return {
      id: `tt${i}`, day, time, end: addMinutes(time, 90),
      subject: c.title, icon: c.icon || 'book',
      room: ROOMS[i % ROOMS.length], color: TT_COLORS[idx % TT_COLORS.length],
    }
  })
}

// ── Grades ────────────────────────────────────────────────
function hash(s) {
  let h = 2166136261
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) }
  return h >>> 0
}

export function letterGrade(total) {
  if (total >= 75) return ['A', 'green']
  if (total >= 65) return ['B', 'blue']
  if (total >= 55) return ['C', 'purple']
  if (total >= 45) return ['D', 'yellow']
  return ['F', 'red']
}

// CA out of 40, Exam out of 60. Biased by `pct` when available, else stable-random.
export function caExam(key, pct) {
  const base = pct != null ? pct : hash(key) % 100
  const ca = Math.max(8, Math.min(40, Math.round(base * 0.4) + ((hash(key + 'ca') % 7) - 3)))
  const exam = Math.max(10, Math.min(60, Math.round(base * 0.6) + ((hash(key + 'ex') % 9) - 4)))
  const total = ca + exam
  return { ca, caMax: 40, exam, examMax: 60, total, grade: letterGrade(total) }
}

// A present/absent register over recent dates for one learner.
export const ATT_DATES = ['Jun 9', 'Jun 10', 'Jun 11', 'Jun 12', 'Jun 15', 'Jun 16']
export function attendanceFor(key) {
  // mostly-present record, deterministic per learner
  return ATT_DATES.map((d, i) => (hash(key + d) % 10 < (i === 2 ? 7 : 9) ? 1 : 0))
}
