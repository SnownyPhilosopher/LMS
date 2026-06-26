import { useState } from 'react'
import LearnerLayout from '../components/LearnerLayout'
import { useStore } from '../store/store'
import { buildTimetable, DAYS, TODAY_DAY } from '../lib/academics'

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TODAY = 18
const DAYS_IN_MONTH = 30 // June 2026 starts on a Monday

export default function LearnerCalendar() {
  const { state } = useStore()
  const [view, setView] = useState('week')
  const timetable = buildTimetable(state.myCourses)

  // Month grid
  const byDay = {}
  state.events.forEach((e) => {
    const d = parseInt(e.day, 10)
    ;(byDay[d] = byDay[d] || []).push(e)
  })
  const cells = []
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <LearnerLayout active="calendar">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.learner.sub}</div>
          <div className="page-head__title">Calendar</div>
          <div className="page-head__sub">{timetable.length} lectures this week · {state.events.length} key dates</div>
        </div>
      </div>

      <div className="view-toggle">
        <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Week</button>
        <button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Month</button>
      </div>

      {view === 'week' && (
        <div className="tt-grid" style={{ marginBottom: 'var(--sp-6)' }}>
          {DAYS.map((day) => (
            <div key={day} className="tt-col">
              <div className={`tt-col__head${day === TODAY_DAY ? ' tt-col__head--today' : ''}`}>{day}{day === TODAY_DAY ? ' · Today' : ''}</div>
              <div className="tt-col__body">
                {timetable.filter((t) => t.day === day).map((t) => (
                  <div key={t.id} className={`tt-card tt-card--${t.color}`}>
                    <div className="tt-card__time">{t.time}–{t.end}</div>
                    <div className="tt-card__sub">{t.subject}</div>
                    <div className="tt-card__room">{t.room}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'month' && (
        <div className="cal-card" style={{ marginBottom: 'var(--sp-6)' }}>
          <div className="cal-head"><div className="cal-head__title">June 2026</div></div>
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
      )}

      <div className="s-heading"><h2>Key Dates &amp; Deadlines</h2></div>
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
