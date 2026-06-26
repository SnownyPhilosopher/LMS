import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import AdminLayout from '../components/AdminLayout'
import { Avatar } from '../components/common'
import { useStore } from '../store/store'

export default function AdminTeachers() {
  const { state, toast } = useStore()
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All Departments')

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return state.teachers.filter((t) =>
      (dept === 'All Departments' || t.dept === dept) &&
      (!q || t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q)))
  }, [state.teachers, search, dept])

  return (
    <AdminLayout active="teachers">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.institution}</div>
          <div className="page-head__title">Teachers</div>
          <div className="page-head__sub">{state.counts.teachers} teachers across 6 departments</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-secondary" onClick={() => toast('Teachers exported (demo)')}><Icon name="download" /> Export</button>
        </div>
      </div>

      <div className="people-card">
        <div className="people-toolbar">
          <div className="people-search"><Icon name="search" /><input type="text" placeholder="Search teachers…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={dept} onChange={(e) => setDept(e.target.value)}>
            <option>All Departments</option><option>Mathematical Sciences</option><option>Computer Science</option>
            <option>Economics &amp; Finance</option><option>Business Studies</option><option>Physical Sciences</option>
          </select>
        </div>
        <div className="people-table-wrap">
          <table>
            <thead><tr><th>Teacher</th><th>Department</th><th>Courses</th><th>Learners</th><th>Joined</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="td-avatar">
                      <Avatar initials={t.initials} color={t.color} size="sm" />
                      <div><div className="td-name">{t.name}</div><div className="td-muted" style={{ fontSize: 'var(--text-xs)' }}>{t.email}</div></div>
                    </div>
                  </td>
                  <td className="td-muted">{t.dept}</td>
                  <td className="td-muted">{t.courses}</td>
                  <td className="td-muted">{t.learners}</td>
                  <td className="td-muted">{t.joined}</td>
                  <td><div className="status-row"><span className={`status-dot-sm status-dot-sm--${t.status[0]}`} />{t.status[1]}</div></td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn-sm" data-tooltip="Edit" onClick={() => toast(`Editing ${t.name} (demo)`, 'info')}><Icon name="edit" /></button>
                      <button className="icon-btn-sm" data-tooltip="View Profile" onClick={() => toast(`Viewing ${t.name} (demo)`, 'info')}><Icon name="eye" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No teachers match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="people-footer">
          <span className="people-footer__info">Showing {rows.length} of {state.counts.teachers} teachers</span>
          <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
            <button className="btn btn-secondary btn-sm" disabled>Previous</button>
            <button className="btn btn-secondary btn-sm" onClick={() => toast('Next page — demo', 'info')}>Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
