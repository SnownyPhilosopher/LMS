import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import TeacherLayout from '../components/TeacherLayout'
import { Avatar, StatCard } from '../components/common'
import { useStore } from '../store/store'
import { ATT_DATES, attendanceFor } from '../lib/academics'

export default function TeacherAttendance() {
  const { state, toast } = useStore()
  const [course, setCourse] = useState('All Courses')
  // learners present "today" — defaults to everyone present
  const [present, setPresent] = useState(() => new Set(state.classLearners.map((l) => l.id)))

  const rows = useMemo(() => {
    return state.classLearners
      .filter((l) => course === 'All Courses' || l.course === course)
      .map((l) => {
        const hist = attendanceFor(l.name)
        const histPresent = hist.reduce((a, b) => a + b, 0)
        const todayP = present.has(l.id) ? 1 : 0
        const total = ATT_DATES.length + 1
        const count = histPresent + todayP
        return { ...l, hist, count, total, pct: Math.round((count / total) * 100) }
      })
  }, [state.classLearners, course, present])

  const toggle = (id) => setPresent((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const presentToday = rows.filter((r) => present.has(r.id)).length

  return (
    <TeacherLayout active="attendance">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.teacher.sub} · {state.meta.institution}</div>
          <div className="page-head__title">Attendance</div>
          <div className="page-head__sub">Thursday, 18 June 2026 · daily register</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-secondary" onClick={() => toast('Register exported (demo)')}><Icon name="download" /> Export</button>
          <button className="btn btn-primary" onClick={() => toast('Register saved (demo)')}><Icon name="checkSquare" /> Save Register</button>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 'var(--sp-6)' }}>
        <StatCard icon="users" tone="blue" value={`${presentToday}/${rows.length}`} label="Present Today" />
        <StatCard icon="activity" tone="green" value={`${rows.length ? Math.round(rows.reduce((a, r) => a + r.pct, 0) / rows.length) : 0}%`} label="Avg Attendance" />
        <StatCard icon="alertCircle" tone="yellow" value={String(rows.length - presentToday)} label="Absent Today" deltaDir="down" />
      </div>

      <div className="learners-card">
        <div className="learners-toolbar">
          <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={course} onChange={(e) => setCourse(e.target.value)}>
            <option>All Courses</option>
            {state.courses.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
          <span className="learners-footer__info" style={{ marginLeft: 'auto' }}>Tap the <strong>Today</strong> box to mark present / absent</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Learner</th>
                {ATT_DATES.map((d) => <th key={d} style={{ textAlign: 'center' }}>{d}</th>)}
                <th style={{ textAlign: 'center' }}>Today</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="td-avatar">
                      <Avatar initials={r.initials} color={r.color} size="sm" />
                      <div><div className="td-name">{r.name}</div><div className="td-muted" style={{ fontSize: 'var(--text-xs)' }}>{r.sid}</div></div>
                    </div>
                  </td>
                  {r.hist.map((p, i) => (
                    <td key={i} style={{ textAlign: 'center' }}>
                      <span className={`att-dot att-dot--${p ? 'p' : 'a'}`}>{p ? 'P' : 'A'}</span>
                    </td>
                  ))}
                  <td style={{ textAlign: 'center' }}>
                    <button className={`att-check${present.has(r.id) ? ' att-check--on' : ''}`} onClick={() => toggle(r.id)} aria-label="Toggle present">
                      {present.has(r.id) && <Icon name="checkSquare" />}
                    </button>
                  </td>
                  <td>
                    <div className="mark-bar">
                      <div className="mark-bar__track"><div className="mark-bar__fill" style={{ width: `${r.pct}%`, background: r.pct >= 80 ? 'var(--color-success)' : r.pct >= 60 ? 'var(--color-warning)' : 'var(--color-danger)' }} /></div>
                      <span className="mark-num">{r.pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="learners-footer">
          <span className="learners-footer__info">{rows.length} learners · {presentToday} present today</span>
        </div>
      </div>
    </TeacherLayout>
  )
}
