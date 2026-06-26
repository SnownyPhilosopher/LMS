import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import AdminLayout from '../components/AdminLayout'
import { Avatar } from '../components/common'
import { useStore } from '../store/store'

const GUARDIANS = [
  { id: 'gu1', initials: 'KA', color: 'blue', name: 'Kwesi Asante', relation: 'Father', learner: 'Amara Asante', email: 'k.asante@gmail.com', phone: '+233 24 555 0142', status: ['green', 'Active'] },
  { id: 'gu2', initials: 'AO', color: 'green', name: 'Akua Owusu', relation: 'Mother', learner: 'Eric Owusu', email: 'a.owusu@gmail.com', phone: '+233 20 441 8820', status: ['green', 'Active'] },
  { id: 'gu3', initials: 'YF', color: 'purple', name: 'Yaw Frimpong', relation: 'Father', learner: 'Abena Frimpong', email: 'y.frimpong@gmail.com', phone: '+233 27 119 3345', status: ['green', 'Active'] },
  { id: 'gu4', initials: 'EM', color: 'orange', name: 'Esi Mensah', relation: 'Mother', learner: 'Daniel Mensah', email: 'e.mensah@gmail.com', phone: '+233 24 770 2218', status: ['yellow', 'Pending'] },
  { id: 'gu5', initials: 'KN', color: 'teal', name: 'Kojo Nyarko', relation: 'Guardian', learner: 'Grace Nyarko', email: 'k.nyarko@gmail.com', phone: '+233 23 882 6610', status: ['gray', 'Inactive'] },
]

export default function AdminGuardians() {
  const { state, toast } = useStore()
  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return GUARDIANS.filter((g) => !q || g.name.toLowerCase().includes(q) || g.learner.toLowerCase().includes(q))
  }, [search])

  return (
    <AdminLayout active="guardians">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.institution}</div>
          <div className="page-head__title">Guardians</div>
          <div className="page-head__sub">342 guardians linked to learner accounts</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-primary" onClick={() => toast('Invite guardian (demo)', 'info')}><Icon name="plus" /> Add Guardian</button>
        </div>
      </div>

      <div className="people-card">
        <div className="people-toolbar">
          <div className="people-search"><Icon name="search" /><input type="text" placeholder="Search guardians or learners…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        </div>
        <div className="people-table-wrap">
          <table>
            <thead><tr><th>Guardian</th><th>Relation</th><th>Linked Learner</th><th>Email</th><th>Phone</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.map((g) => (
                <tr key={g.id}>
                  <td><div className="td-avatar"><Avatar initials={g.initials} color={g.color} size="sm" /><div className="td-name">{g.name}</div></div></td>
                  <td className="td-muted">{g.relation}</td>
                  <td>{g.learner}</td>
                  <td className="td-muted">{g.email}</td>
                  <td className="td-muted">{g.phone}</td>
                  <td><div className="status-row"><span className={`status-dot-sm status-dot-sm--${g.status[0]}`} />{g.status[1]}</div></td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn-sm" data-tooltip="Message" onClick={() => toast(`Message ${g.name} (demo)`, 'info')}><Icon name="message" /></button>
                      <button className="icon-btn-sm" data-tooltip="View" onClick={() => toast(`Viewing ${g.name} (demo)`, 'info')}><Icon name="eye" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No guardians match your search.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="people-footer">
          <span className="people-footer__info">Showing {rows.length} of 342 guardians</span>
          <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
            <button className="btn btn-secondary btn-sm" disabled>Previous</button>
            <button className="btn btn-secondary btn-sm" onClick={() => toast('Next page — demo', 'info')}>Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
