import { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback } from 'react'
import { makeSeed, AVATAR_COLORS } from './seed'

const STORAGE_KEY = 'soteria.state.v2'
const SESSION_KEY = 'soteria.session.v1'

// ── helpers ──────────────────────────────────────────────
let idc = 0
const uid = (p = 'x') => `${p}_${Date.now().toString(36)}_${idc++}`
const initialsOf = (first, last) => `${(first || '').trim()[0] || ''}${(last || '').trim()[0] || ''}`.toUpperCase() || '?'
const colorFor = (seed) => AVATAR_COLORS[Math.abs([...String(seed)].reduce((a, c) => a + c.charCodeAt(0), 0)) % AVATAR_COLORS.length]

function load() {
  const seed = makeSeed()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...seed, ...JSON.parse(raw) } // seed fills in any keys added since the state was saved
  } catch { /* ignore */ }
  return seed
}

// ── reducer ──────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return makeSeed()

    case 'ADD_INSTITUTION': {
      const { name, type } = action.payload
      const inst = {
        id: uid('inst'),
        initials: name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'IN',
        color: colorFor(name),
        name, type: type || 'University',
        depts: 0, programs: 0, learners: 0, completion: 0,
        status: ['gray', 'Setup'],
      }
      return {
        ...state,
        institutions: [inst, ...state.institutions],
        activity: [{ id: uid('a'), dot: 'blue', html: `<strong>${name}</strong> was added as a new institution.`, time: 'Just now' }, ...state.activity],
      }
    }

    case 'ADD_USER': {
      const { role, firstName, lastName, email, dept, program } = action.payload
      const name = `${firstName} ${lastName}`.trim()
      const initials = initialsOf(firstName, lastName)
      const color = colorFor(name)
      const next = { ...state }
      next.roleCounts = { ...state.roleCounts }
      next.counts = { ...state.counts }

      if (role === 'teacher') {
        const t = { id: uid('t'), initials, color, name, email, dept: dept || '—', courses: 0, learners: 0, joined: 'Jun 2026', status: ['green', 'Active'], _new: true }
        next.teachers = [t, ...state.teachers]
        next.roleCounts.teachers += 1
        next.counts.teachers += 1
      } else if (role === 'learner') {
        const l = { id: uid('l'), initials, color, name, sid: `NXU/NEW/2026/${String(state.learners.length + 1).padStart(3, '0')}`, program: program || '—', pct: 0, last: 'Just now', status: ['green', 'Active'], _new: true }
        next.learners = [l, ...state.learners]
        next.roleCounts.learners += 1
        next.counts.learners += 1
      } else if (role === 'admin') {
        next.roleCounts.admins += 1
      } else if (role === 'guardian') {
        next.roleCounts.guardians += 1
      }

      const label = role.charAt(0).toUpperCase() + role.slice(1)
      next.activity = [{ id: uid('a'), dot: 'green', html: `<strong>${name}</strong> was added as a ${label}${dept ? ` to ${dept}` : ''}.`, time: 'Just now' }, ...state.activity]
      return next
    }

    case 'ADD_COURSE': {
      const { name, code, semester, program } = action.payload
      const banners = [
        'linear-gradient(90deg,#2563EB,#3B82F6)', 'linear-gradient(90deg,#7C3AED,#8B5CF6)',
        'linear-gradient(90deg,#0F766E,#14B8A6)', 'linear-gradient(90deg,#B45309,#F59E0B)',
      ]
      const course = {
        id: uid('c'), banner: banners[state.courses.length % banners.length],
        name, code: `${code}${semester ? ` · ${semester}` : ''}`, program: program || '',
        learners: 0, chapters: 0, avg: '0%', pct: 0, _new: true,
      }
      return { ...state, courses: [...state.courses, course] }
    }

    case 'ADD_CLASS': {
      const { title, course, date, time } = action.payload
      const d = date ? new Date(date) : null
      const dateLabel = d ? d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }).toUpperCase() : 'TBA'
      const cls = {
        id: uid('k'), time: time || '—', date: dateLabel,
        name: title, course: course || '—',
        meta: ['0 enrolled', d ? d.toLocaleDateString('en-GB', { weekday: 'short' }) + (time ? ` · ${time}` : '') : 'Scheduled'],
        _new: true,
      }
      // insert after any live class
      const liveCount = state.classes.filter((c) => c.live).length
      const copy = [...state.classes]
      copy.splice(liveCount, 0, cls)
      return { ...state, classes: copy }
    }

    case 'SET_STATUS': {
      const { list, id, status } = action.payload
      return { ...state, [list]: state[list].map((r) => (r.id === id ? { ...r, status } : r)) }
    }

    case 'REMOVE': {
      const { list, id } = action.payload
      return { ...state, [list]: state[list].filter((r) => r.id !== id) }
    }

    case 'MARK_NOTIFS_READ': {
      const { role } = action.payload
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [role]: (state.notifications[role] || []).map((n) => ({ ...n, unread: false })),
        },
      }
    }

    default:
      return state
  }
}

// ── context ──────────────────────────────────────────────
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  const [toasts, setToasts] = useState([])
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || { role: null } } catch { return { role: null } }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])

  useEffect(() => {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)) } catch { /* ignore */ }
  }, [session])

  const toast = useCallback((message, kind = 'success') => {
    const id = uid('toast')
    setToasts((t) => [...t, { id, message, kind }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const actions = useMemo(() => ({
    addInstitution: (p) => { dispatch({ type: 'ADD_INSTITUTION', payload: p }); toast(`Institution “${p.name}” created`) },
    addUser: (p) => { dispatch({ type: 'ADD_USER', payload: p }); toast(`${p.firstName} ${p.lastName} invited as ${p.role}`) },
    addCourse: (p) => { dispatch({ type: 'ADD_COURSE', payload: p }); toast(`Course “${p.name}” created`) },
    addClass: (p) => { dispatch({ type: 'ADD_CLASS', payload: p }); toast(`Class “${p.title}” scheduled`) },
    setStatus: (list, id, status) => dispatch({ type: 'SET_STATUS', payload: { list, id, status } }),
    remove: (list, id) => dispatch({ type: 'REMOVE', payload: { list, id } }),
    markNotifsRead: (role) => dispatch({ type: 'MARK_NOTIFS_READ', payload: { role } }),
    reset: () => { dispatch({ type: 'RESET' }); toast('Demo data reset') },
  }), [toast])

  const login = useCallback((role) => setSession({ role }), [])
  const logout = useCallback(() => setSession({ role: null }), [])

  const value = useMemo(() => ({ state, actions, toast, toasts, session, login, logout }),
    [state, actions, toast, toasts, session, login, logout])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
