import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import AdminLayout from '../components/AdminLayout'
import { Avatar, ProgressBar } from '../components/common'
import { useStore } from '../store/store'

export default function AdminLearners() {
  const { state, toast } = useStore()
  const [search, setSearch] = useState('')
  const [prog, setProg] = useState('All Programs')
  const [status, setStatus] = useState('All Statuses')

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return state.learners.filter((l) =>
      (prog === 'All Programs' || l.program === prog) &&
      (status === 'All Statuses' || l.status[1] === status) &&
      (!q || l.name.toLowerCase().includes(q) || l.sid.toLowerCase().includes(q)))
  }, [state.learners, search, prog, status])

  return (
    <AdminLayout active="learners">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.institution}</div>
          <div className="page-head__title">Learners</div>
          <div className="page-head__sub">{state.counts.learners.toLocaleString()} learners enrolled</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-secondary" onClick={() => toast('Learners exported (demo)')}><Icon name="download" /> Export</button>
        </div>
      </div>

      <div className="people-card">
        <div className="people-toolbar">
          <div className="people-search"><Icon name="search" /><input type="text" placeholder="Search learners…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={prog} onChange={(e) => setProg(e.target.value)}>
            <option>All Programs</option><option>BSc Actuarial Science</option><option>BSc Computer Science</option>
            <option>BA Economics</option><option>BSc Financial Mathematics</option>
          </select>
          <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All Statuses</option><option>Active</option><option>At Risk</option><option>Inactive</option>
          </select>
        </div>
        <div className="people-table-wrap">
          <table>
            <thead><tr><th>Learner</th><th>Student ID</th><th>Program</th><th>Progress</th><th>Last Active</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id}>
                  <td><div className="td-avatar"><Avatar initials={l.initials} color={l.color} size="sm" /><div className="td-name">{l.name}</div></div></td>
                  <td className="td-muted">{l.sid}</td>
                  <td className="td-muted">{l.program}</td>
                  <td style={{ minWidth: 130 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                      <ProgressBar pct={l.pct} variant={l.variant} style={{ flex: 1 }} />
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{l.pct}%</span>
                    </div>
                  </td>
                  <td className="td-muted">{l.last}</td>
                  <td><div className="status-row"><span className={`status-dot-sm status-dot-sm--${l.status[0]}`} />{l.status[1]}</div></td>
                  <td><div className="row-actions"><button className="icon-btn-sm" onClick={() => toast(`Viewing ${l.name} (demo)`, 'info')}><Icon name="eye" /></button></div></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No learners match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="people-footer">
          <span className="people-footer__info">Showing {rows.length} of {state.counts.learners.toLocaleString()} learners</span>
          <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
            <button className="btn btn-secondary btn-sm" disabled>Previous</button>
            <button className="btn btn-secondary btn-sm" onClick={() => toast('Next page — demo', 'info')}>Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
