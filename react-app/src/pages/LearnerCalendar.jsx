import LearnerLayout from '../components/LearnerLayout'
import { useStore } from '../store/store'

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TODAY = 18
const DAYS_IN_MONTH = 30 // June 2026 starts on a Monday

export default function LearnerCalendar() {
  const { state } = useStore()

  // Map day-of-month → events
  const byDay = {}
  state.events.forEach((e) => {
    const d = parseInt(e.day, 10)
    ;(byDay[d] = byDay[d] || []).push(e)
  })

  const cells = []
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null) // trailing blanks

  return (
    <LearnerLayout active="calendar">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.learner.sub}</div>
          <div className="page-head__title">Calendar</div>
          <div className="page-head__sub">{state.events.length} events this month</div>
        </div>
      </div>

      <div className="cal-card" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="cal-head">
          <div className="cal-head__title">June 2026</div>
        </div>
        <div className="cal-grid">
          {DOW.map((d) => <div key={d} className="cal-dow">{d}</div>)}
          {cells.map((d, i) => (
            <div key={i} className={`cal-cell${d === null ? ' cal-cell--other' : ''}${d === TODAY ? ' cal-cell--today' : ''}`}>
              {d !== null && <div className="cal-date">{d}</div>}
              {(byDay[d] || []).map((e) => (
                <div key={e.id} className={`cal-event cal-event--${e.line}`} title={`${e.title} · ${e.meta}`}>{e.title}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="s-heading"><h2>Upcoming Events</h2></div>
      <div className="event-list" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0 var(--sp-5)' }}>
        {state.events.map((e) => (
          <div key={e.id} className="event-row">
            <div className="event-date"><div className="event-day">{e.day}</div><div className="event-month">{e.month}</div></div>
            <div className={`event-line event-line--${e.line}`} />
            <div className="event-info"><div className="event-title">{e.title}</div><div className="event-meta">{e.meta}</div></div>
            {e.today && <span className="event-today">Today</span>}
          </div>
        ))}
      </div>
    </LearnerLayout>
  )
}
