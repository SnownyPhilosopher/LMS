import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import TeacherLayout from '../components/TeacherLayout'
import { Avatar, ProgressBar } from '../components/common'
import { useStore } from '../store/store'

export default function TeacherMyLearners() {
  const { state, toast } = useStore()
  const [search, setSearch] = useState('')
  const [courseF, setCourseF] = useState('All Courses')
  const [statusF, setStatusF] = useState('All Statuses')

  const learners = useMemo(() => {
    const q = search.trim().toLowerCase()
    return state.classLearners.filter((l) =>
      (courseF === 'All Courses' || l.course === courseF) &&
      (statusF === 'All Statuses' || l.risk[1].includes(statusF)) &&
      (!q || l.name.toLowerCase().includes(q) || l.sid.toLowerCase().includes(q)))
  }, [state.classLearners, search, courseF, statusF])

  return (
    <TeacherLayout active="learners">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">Mathematical Sciences · Nexcorp University</div>
          <div className="page-head__title">My Learners</div>
          <div className="page-head__sub">248 learners · <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>12 at risk</span></div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-secondary" onClick={() => toast('Learners exported (demo)')}><Icon name="download" /> Export</button>
        </div>
      </div>

      <div className="learners-card">
        <div className="learners-toolbar">
          <div className="learners-search"><Icon name="search" /><input type="text" placeholder="Search learners…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={courseF} onChange={(e) => setCourseF(e.target.value)}>
            <option>All Courses</option><option>Mathematical Methods I</option><option>Probability &amp; Statistics</option><option>Calculus II</option>
          </select>
          <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={statusF} onChange={(e) => setStatusF(e.target.value)}>
            <option>All Statuses</option><option>On Track</option><option>At Risk</option>
          </select>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead><tr><th>Learner</th><th>Course</th><th>Progress</th><th>Last Active</th><th>Tasks Due</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {learners.map((l) => (
                <tr key={l.id}>
                  <td>
                    <div className="td-avatar">
                      <Avatar initials={l.initials} color={l.color} size="sm" />
                      <div><div className="td-name">{l.name}</div><div className="td-muted" style={{ fontSize: 'var(--text-xs)' }}>{l.sid}</div></div>
                    </div>
                  </td>
                  <td className="td-muted">{l.course}</td>
                  <td style={{ minWidth: 140 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                      <ProgressBar pct={l.pct} variant={l.variant} style={{ flex: 1 }} />
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{l.pct}%</span>
                    </div>
                  </td>
                  <td className="td-muted">{l.last}</td>
                  <td className="td-muted" style={l.dueDanger ? { color: 'var(--color-danger)', fontWeight: 600 } : undefined}>{l.due}</td>
                  <td><span className={`risk-chip risk-chip--${l.risk[0]}`}>{l.risk[1]}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                      <button className="icon-btn-sm" title="Message" onClick={() => toast(`Message ${l.name} (demo)`, 'info')}><Icon name="message" /></button>
                      <button className="icon-btn-sm" title="View Profile" onClick={() => toast(`Viewing ${l.name} (demo)`, 'info')}><Icon name="eye" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {learners.length === 0 && <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No learners match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="learners-footer">
          <span className="learners-footer__info">Showing {learners.length} of 248 learners</span>
          <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
            <button className="btn btn-secondary btn-sm" disabled>Previous</button>
            <button className="btn btn-secondary btn-sm" onClick={() => toast('Next page — demo', 'info')}>Next</button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}
