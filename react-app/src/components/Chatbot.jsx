import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useStore } from '../store/store'

const STARTERS = [
  "What's due this week?",
  "How's my progress?",
  'What should I study next?',
  'Where are my notes?',
]

// Build a grounded, scripted reply from the learner's real store data.
function getReply(text, state) {
  const t = text.toLowerCase()
  const courses = state.myCourses
  const overall = courses.length ? Math.round(courses.reduce((a, c) => a + c.pct, 0) / courses.length) : 0
  const completed = courses.filter((c) => c.pct === 100).length
  const inProgress = courses.filter((c) => c.pct > 0 && c.pct < 100)
  const lowest = [...courses].filter((c) => c.pct < 100).sort((a, b) => a.pct - b.pct)[0]
  const events = state.events

  // Whole-word / phrase match so short tokens like "hi" don't match "this".
  const has = (...words) => words.some((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(t))

  const first = state.meta?.learner?.first || 'there'
  if (has('hi', 'hello', 'hey', 'yo', 'good morning', 'good afternoon')) {
    return { text: `Hi ${first}! 👋 I'm Soti, your study assistant. I can help you keep on top of your courses — ask me what's due, how you're doing, or where to find something.` }
  }
  if (has('due', 'deadline', 'assignment', 'upcoming', 'this week', 'exam', 'when')) {
    const next = events.slice(0, 3).map((e) => `• ${e.day} ${e.month} — ${e.title} (${e.meta})`).join('\n')
    return { text: `Here's what's coming up:\n${next}\n\nWant me to open your calendar?`, to: '/learner/calendar', toLabel: 'Open Calendar' }
  }
  if (has('progress', 'how am i', 'how is my', "how's my", 'doing', 'grade', 'score')) {
    return {
      text: `You're at ${overall}% overall across ${courses.length} courses, with ${completed} completed. Your lowest right now is ${lowest?.title} at ${lowest?.pct}% — a good place to focus.`,
      to: '/learner/profile', toLabel: 'View Profile',
    }
  }
  if (has('study', 'next', 'focus', 'what should', 'recommend', 'advice', 'tips')) {
    return {
      text: `I'd start with ${lowest?.title} (${lowest?.pct}%). Try this: read the chapter notes first, then take the quiz to test yourself. Short focused sessions beat long cramming!`,
      to: '/learner/courses', toLabel: 'Go to My Courses',
    }
  }
  if (has('continue', 'resume', 'left off', 'carry on', 'pick up')) {
    const c = inProgress[0]
    return { text: `Jump back into ${c?.title}. Open it and continue from where you stopped.`, to: '/learner/courses', toLabel: 'Open My Courses' }
  }
  if (has('note', 'reading', 'material', 'read')) {
    return { text: 'Course notes live inside each course under the Notes tab. Open a course, then choose Notes to read.', to: '/learner/courses', toLabel: 'Browse Courses' }
  }
  if (has('quiz', 'test', 'practice')) {
    return { text: "Quizzes are inside each course under the Quizzes tab. You've got a Chapter 1 Quiz waiting in Mathematical Methods I — give it a go!", to: '/learner/courses', toLabel: 'Browse Courses' }
  }
  if (has('class', 'live', 'lecture', 'online', 'zoom', 'tutorial')) {
    return { text: `Your next session is the ${events[0]?.title} (${events[0]?.meta}). Live classes for each course are under the Online Classes tab.`, to: '/learner/calendar', toLabel: 'Open Calendar' }
  }
  if (has('library', 'resource', 'book', 'document', 'pdf', 'slides')) {
    return { text: 'The Library has documents, lecture recordings and e-books for your programme.', to: '/learner/library', toLabel: 'Open Library' }
  }
  if (has('calendar', 'schedule', 'timetable')) {
    return { text: 'Your Calendar shows everything for the month at a glance.', to: '/learner/calendar', toLabel: 'Open Calendar' }
  }
  if (has('profile', 'account', 'details', 'my info')) {
    return { text: 'Your Profile shows your details and progress across every course.', to: '/learner/profile', toLabel: 'Open Profile' }
  }
  if (has('thank', 'thanks', 'cheers', 'great', 'awesome', 'cool')) {
    return { text: 'Anytime! 🎓 You’ve got this — happy studying.' }
  }
  return {
    text: "I can help with your courses, deadlines, progress, notes, quizzes, classes and the library. Try one of the suggestions below, or ask me something like “what's due this week?”",
  }
}

export default function Chatbot() {
  const { state, session } = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  // Greet on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      const first = state.meta?.learner?.first || 'there'
      setMessages([{ from: 'bot', text: `Hi ${first}! 👋 I'm Soti, your study assistant. Ask me anything about your courses — or tap a suggestion below.` }])
    }
  }, [open, messages.length])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  if (session.role !== 'learner') return null

  const send = (text) => {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { from: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = getReply(q, state)
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', ...reply }])
    }, 650)
  }

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open study assistant">
          <Icon name="message" />
          <span className="chat-fab__pulse" />
        </button>
      )}

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Study assistant">
          <div className="chat-head">
            <div className="chat-head__avatar">✦</div>
            <div className="chat-head__info">
              <div className="chat-head__name">Soti</div>
              <div className="chat-head__status"><span className="chat-head__dot" /> Study assistant</div>
            </div>
            <button className="chat-head__close" onClick={() => setOpen(false)} aria-label="Close"><Icon name="x" /></button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.from}`}>
                <div className="chat-bubble">{m.text}</div>
                {m.to && (
                  <button className="chat-link" onClick={() => { navigate(m.to); setOpen(false) }}>
                    {m.toLabel} <Icon name="chevronDown" />
                  </button>
                )}
              </div>
            ))}
            {typing && (
              <div className="chat-msg chat-msg--bot">
                <div className="chat-bubble chat-typing"><span /><span /><span /></div>
              </div>
            )}
          </div>

          <div className="chat-suggestions">
            {STARTERS.map((s) => (
              <button key={s} className="chat-chip" onClick={() => send(s)}>{s}</button>
            ))}
          </div>

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input) }}>
            <input type="text" placeholder="Ask Soti…" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
