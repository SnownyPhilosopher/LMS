import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import TeacherLayout from '../components/TeacherLayout'
import { Avatar, Badge, StatCard } from '../components/common'
import { useStore } from '../store/store'
import { caExam } from '../lib/academics'

export default function TeacherGradebook() {
  const { state, toast } = useStore()
  const [course, setCourse] = useState('All Courses')
  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return state.classLearners
      .filter((l) => (course === 'All Courses' || l.course === course) && (!q || l.name.toLowerCase().includes(q)))
      .map((l) => ({ ...l, ...caExam(l.name, l.pct) }))
  }, [state.classLearners, course, search])

  const classAvg = rows.length ? Math.round(rows.reduce((a, r) => a + r.total, 0) / rows.length) : 0
  const passed = rows.filter((r) => r.total >= 50).length

  return (
    <TeacherLayout active="results">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.teacher.sub} · {state.meta.institution}</div>
          <div className="page-head__title">Gradebook</div>
          <div className="page-head__sub">Continuous assessment &amp; exam marks</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-secondary" onClick={() => toast('Marks exported (demo)')}><Icon name="download" /> Export</button>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 'var(--sp-6)' }}>
        <StatCard icon="activity" tone="blue" value={`${classAvg}%`} label="Class Average" />
        <StatCard icon="checkSquare" tone="green" value={`${passed}/${rows.length}`} label="Passed (≥50%)" />
        <StatCard icon="users" tone="purple" value={String(rows.length)} label="Learners Graded" />
      </div>

      <div className="learners-card">
        <div className="learners-toolbar">
          <div className="learners-search"><Icon name="search" /><input type="text" placeholder="Search learners…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={course} onChange={(e) => setCourse(e.target.value)}>
            <option>All Courses</option>
            {state.courses.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
          <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => toast('Enter marks (demo)', 'info')}><Icon name="plus" /> Enter Marks</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead><tr><th>Learner</th><th>Course</th><th>CA (/40)</th><th>Exam (/60)</th><th>Total (/100)</th><th>Grade</th><th></th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="td-avatar">
                      <Avatar initials={r.initials} color={r.color} size="sm" />
                      <div><div className="td-name">{r.name}</div><div className="td-muted" style={{ fontSize: 'var(--text-xs)' }}>{r.sid}</div></div>
                    </div>
                  </td>
                  <td className="td-muted">{r.course}</td>
                  <td>
                    <div className="mark-bar">
                      <div className="mark-bar__track"><div className="mark-bar__fill" style={{ width: `${(r.ca / r.caMax) * 100}%` }} /></div>
                      <span className="mark-num">{r.ca}</span>
                    </div>
                  </td>
                  <td className="mark-num">{r.exam}</td>
                  <td className="mark-num">{r.total}</td>
                  <td><Badge color={r.grade[1]}>{r.grade[0]}</Badge></td>
                  <td><div className="row-actions"><button className="icon-btn-sm" data-tooltip="Edit marks" onClick={() => toast(`Edit ${r.name}'s marks (demo)`, 'info')}><Icon name="edit" /></button></div></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No learners match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="learners-footer">
          <span className="learners-footer__info">Class average: <strong>{classAvg}%</strong></span>
        </div>
      </div>
    </TeacherLayout>
  )
}
