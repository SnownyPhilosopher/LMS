import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import AccountMenu from '../components/AccountMenu'
import NotificationBell from '../components/NotificationBell'
import { Badge, ProgressBar, StatCard, Modal } from '../components/common'
import { useStore } from '../store/store'

const QUICK = [
  { icon: 'settings', tone: 'blue', label: 'Add Admin', sub: 'Assign to institution', modal: 'admin' },
  { icon: 'user', tone: 'green', label: 'Add Teacher', sub: 'Assign to department', modal: 'teacher' },
  { icon: 'departments', tone: 'purple', label: 'New Department', sub: 'Under an institution' },
  { icon: 'graduation', tone: 'orange', label: 'New Program', sub: 'Assign to department' },
]

const SIDEBAR = [
  { label: 'Overview', links: [{ icon: 'grid', name: 'Dashboard', active: true }, { icon: 'barChart', name: 'Analytics' }] },
  { label: 'Structure', links: [{ icon: 'home', name: 'Institutions', badge: '5' }, { icon: 'departments', name: 'Departments', badge: '18' }, { icon: 'graduation', name: 'Programs', badge: '38' }, { icon: 'book', name: 'Courses' }] },
  { label: 'Users', links: [{ icon: 'users', name: 'All Users', badge: '4,847' }, { icon: 'settings', name: 'Admins', badge: '12' }, { icon: 'user', name: 'Teachers', badge: '89' }, { icon: 'graduation', name: 'Learners' }, { icon: 'guardian', name: 'Guardians' }] },
  { label: 'System', links: [{ icon: 'barChart', name: 'Reports' }, { icon: 'fileText', name: 'Audit Log' }, { icon: 'settings', name: 'Settings' }] },
]

const ROLE_META = [
  { key: 'admins', icon: 'settings', bg: 'var(--color-danger-bg)', fg: 'var(--color-danger)', label: 'Admins', variant: 'warning', max: 2400 },
  { key: 'teachers', icon: 'user', bg: 'var(--color-success-bg)', fg: 'var(--color-success)', label: 'Teachers', variant: 'success', max: 4500 },
  { key: 'learners', icon: 'graduation', bg: 'var(--blue-50)', fg: 'var(--color-primary)', label: 'Learners', max: 4847 },
  { key: 'guardians', icon: 'guardian', bg: '#F5F3FF', fg: '#6D28D9', label: 'Guardians', fill: '#7C3AED', max: 4847 },
]

const emptyInst = { name: '', type: '' }
const emptyAdmin = { firstName: '', lastName: '', email: '', institution: '', adminRole: 'Institution Admin' }
const emptyTeacher = { firstName: '', lastName: '', email: '', dept: '' }

export default function SuperAdmin() {
  const { state, actions, toast } = useStore()
  const me = state.meta.superadmin
  const [modal, setModal] = useState(null)
  const [query, setQuery] = useState('')
  const [inst, setInst] = useState(emptyInst)
  const [admin, setAdmin] = useState(emptyAdmin)
  const [teacher, setTeacher] = useState(emptyTeacher)

  const totalUsers = Object.values(state.roleCounts).reduce((a, b) => a + b, 0)
  const programsTotal = state.institutions.reduce((a, i) => a + (i.programs || 0), 0)

  const stats = [
    { icon: 'home', tone: 'blue', value: String(state.institutions.length), label: 'Institutions', delta: '1 added this month' },
    { icon: 'users', tone: 'purple', value: totalUsers.toLocaleString(), label: 'Total Users', delta: '143 this month' },
    { icon: 'graduation', tone: 'green', value: String(programsTotal), label: 'Active Programs', delta: '4 this semester' },
    { icon: 'activity', tone: 'yellow', value: '72%', label: 'Avg Completion Rate', delta: '6% vs last semester' },
  ]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return state.institutions
    return state.institutions.filter((i) => i.name.toLowerCase().includes(q) || i.type.toLowerCase().includes(q))
  }, [state.institutions, query])

  const submitInst = () => {
    if (!inst.name.trim()) return toast('Institution name is required', 'warning')
    actions.addInstitution(inst)
    setInst(emptyInst); setModal(null)
  }
  const submitAdmin = () => {
    if (!admin.firstName.trim() || !admin.lastName.trim()) return toast('First and last name are required', 'warning')
    actions.addUser({ role: 'admin', ...admin, dept: admin.institution })
    setAdmin(emptyAdmin); setModal(null)
  }
  const submitTeacher = () => {
    if (!teacher.firstName.trim() || !teacher.lastName.trim()) return toast('First and last name are required', 'warning')
    actions.addUser({ role: 'teacher', ...teacher })
    setTeacher(emptyTeacher); setModal(null)
  }

  return (
    <div className="sa-scope">
      <header className="sa-topbar">
        <Link to="/login" className="sa-topbar__logo">
          <div className="logo-icon"><Icon name="logo" stroke="white" strokeWidth={2.2} /></div>
          <span className="sa-topbar__name">Soteria Learning</span>
        </Link>
        <span className="sa-topbar__role">Super Admin</span>
        <div className="sa-topbar__spacer" />
        <div className="sa-topbar__search">
          <span className="sa-topbar__search-icon"><Icon name="search" /></span>
          <input type="text" placeholder="Search institutions…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="sa-topbar__actions">
          <button className="topbar-icon-btn" data-tooltip="Audit Log" aria-label="Audit log" onClick={() => toast('Audit log — demo', 'info')}><Icon name="fileText" /></button>
          <NotificationBell />
          <div className="topbar__divider" />
          <AccountMenu />
        </div>
      </header>

      <div className="sa-body">
        <aside className="sa-sidebar">
          {SIDEBAR.map((sec) => (
            <div key={sec.label} className="sidebar__section">
              <div className="sidebar__label">{sec.label}</div>
              {sec.links.map((l) => (
                <a key={l.name} className={`nav-link${l.active ? ' active' : ''}`} onClick={() => !l.active && toast(`${l.name} — demo`, 'info')}>
                  <Icon name={l.icon} /> {l.name}
                  {l.badge && <span className="nav-link__badge">{l.badge}</span>}
                </a>
              ))}
            </div>
          ))}
          <div className="sidebar__spacer" />
          <div className="sidebar__footer">
            <div className="sidebar__user">
              <div className="avatar avatar-md" style={{ background: me.grad, color: '#fff' }}>{me.initials}</div>
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">{me.name}</div>
                <div className="sidebar__user-role">{me.sub}</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="sa-main">
          <div className="sa-content">
            <div className="sa-page-header">
              <div>
                <div className="sa-page-header__eyebrow">Platform Overview</div>
                <div className="sa-page-header__title">Super Admin Dashboard</div>
                <div className="sa-page-header__sub">Thursday, 18 June 2026 · All institutions</div>
              </div>
              <div className="sa-page-header__actions">
                <button className="btn btn-secondary" onClick={() => toast('Report exported (demo)')}><Icon name="download" /> Export Report</button>
                <button className="btn btn-primary" onClick={() => setModal('institution')}><Icon name="plus" /> New Institution</button>
              </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--sp-7)' }}>
              {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>

            <div className="quick-actions">
              {QUICK.map((q) => (
                <a key={q.label} className="qa-card" onClick={() => q.modal ? setModal(q.modal) : toast(`${q.label} — demo`, 'info')}>
                  <div className={`qa-icon qa-icon--${q.tone}`}><Icon name={q.icon} /></div>
                  <div>
                    <div className="qa-label">{q.label}</div>
                    <div className="qa-sub">{q.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="two-col" style={{ marginBottom: 'var(--sp-6)' }}>
              <div>
                <div className="sa-sh"><h2>Institutions</h2><a onClick={() => toast('Manage institutions — demo', 'info')}>Manage all →</a></div>
                <div className="inst-table-card">
                  <table>
                    <thead>
                      <tr><th>Institution</th><th>Depts</th><th>Programs</th><th>Learners</th><th>Completion</th><th>Status</th><th></th></tr>
                    </thead>
                    <tbody>
                      {filtered.map((i) => (
                        <tr key={i.id}>
                          <td>
                            <div className="inst-name-cell">
                              <div className={`inst-avatar inst-avatar--${i.color}`}>{i.initials}</div>
                              <div>
                                <div className="inst-name">{i.name}</div>
                                <div className="inst-type">{i.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="td-muted">{i.depts}</td>
                          <td className="td-muted">{i.programs}</td>
                          <td className="td-muted">{i.learners.toLocaleString()}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                              <ProgressBar pct={i.completion} variant={i.variant} style={{ width: 70 }} />
                              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{i.completion}%</span>
                            </div>
                          </td>
                          <td><Badge color={i.status[0]}>{i.status[1]}</Badge></td>
                          <td><button className="table-action-btn" onClick={() => toast(`Managing ${i.name} (demo)`, 'info')}>Manage</button></td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No institutions match “{query}”.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="sa-sh"><h2>Users by Role</h2><a onClick={() => toast('All users — demo', 'info')}>View all →</a></div>
                <div className="role-breakdown">
                  <div className="rb-header">{totalUsers.toLocaleString()} total across all institutions</div>
                  <div className="rb-body">
                    {ROLE_META.map((r) => {
                      const count = state.roleCounts[r.key]
                      const pct = Math.min(100, Math.round((count / r.max) * 100))
                      return (
                        <div key={r.key} className="rb-row">
                          <div className="rb-icon" style={{ background: r.bg, color: r.fg }}><Icon name={r.icon} /></div>
                          <div className="rb-info">
                            <div className="rb-label">{r.label} <span>{count.toLocaleString()}</span></div>
                            <div className="progress-bar">
                              <div className={`progress-fill${r.variant ? ` progress-fill--${r.variant}` : ''}`}
                                style={{ width: `${pct}%`, ...(r.fill ? { background: r.fill } : {}) }} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="rb-footer">
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setModal('admin')}><Icon name="plus" /> Add Admin</button>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setModal('teacher')}><Icon name="plus" /> Add Teacher</button>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--sp-5)' }}>
                  <div className="sa-sh"><h2>Platform Health</h2></div>
                  <div className="health-card">
                    <div className="hc-header"><span className="status-dot" /> All systems operational</div>
                    <div className="hc-body">
                      <div className="hc-row"><span className="hc-row__label">API Response</span><span className="hc-row__val hc-row__val--green">142 ms</span></div>
                      <div className="hc-row"><span className="hc-row__label">Uptime (30 days)</span><span className="hc-row__val hc-row__val--green">99.97%</span></div>
                      <hr className="hc-divider" />
                      <div className="hc-row"><span className="hc-row__label">Active sessions</span><span className="hc-row__val">2,341</span></div>
                      <div className="hc-row"><span className="hc-row__label">Storage used</span><span className="hc-row__val">1.4 TB / 5 TB</span></div>
                      <div className="hc-row"><span className="hc-row__label">Video streams</span><span className="hc-row__val">18 live</span></div>
                      <hr className="hc-divider" />
                      <div className="hc-row"><span className="hc-row__label">Pending approvals</span><span className="hc-row__val hc-row__val--yellow">7</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sa-sh"><h2>Recent Activity</h2><a onClick={() => toast('Audit log — demo', 'info')}>View audit log →</a></div>
            <div className="activity-card">
              <div className="ac-body">
                {state.activity.map((a) => (
                  <div key={a.id} className="activity-item">
                    <span className={`ai-dot ai-dot--${a.dot}`} />
                    <div className="ai-info">
                      <div className="ai-text" dangerouslySetInnerHTML={{ __html: a.html }} />
                      <div className="ai-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal title="Add New Institution" open={modal === 'institution'} onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={submitInst}>Create Institution</button>
        </>}>
        <div className="form-group">
          <label className="form-label">Institution Name <span>*</span></label>
          <input type="text" className="form-control" placeholder="e.g. Nexcorp University" value={inst.name} onChange={(e) => setInst({ ...inst, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Institution Type <span>*</span></label>
          <select className="form-control" value={inst.type} onChange={(e) => setInst({ ...inst, type: e.target.value })}>
            <option value="">Select type…</option>
            <option>University</option><option>Secondary School</option><option>Technical College</option>
            <option>Corporate Training</option><option>Test Prep Centre</option><option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Assign Admin <span>*</span></label>
          <input type="text" className="form-control" placeholder="Search admin by name or email…" />
          <div className="form-hint">This admin will manage the institution and its departments.</div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Initial Departments</label>
          <input type="text" className="form-control" placeholder="e.g. Mathematics, Engineering (comma-separated)" />
          <div className="form-hint">Optional. You can add departments later.</div>
        </div>
      </Modal>

      <Modal title="Add Admin" open={modal === 'admin'} onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={submitAdmin}>Create Admin Account</button>
        </>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="form-group"><label className="form-label">First Name <span>*</span></label><input type="text" className="form-control" placeholder="First name" value={admin.firstName} onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Last Name <span>*</span></label><input type="text" className="form-control" placeholder="Last name" value={admin.lastName} onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })} /></div>
        </div>
        <div className="form-group"><label className="form-label">Email Address <span>*</span></label><input type="email" className="form-control" placeholder="admin@institution.edu" value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} /></div>
        <div className="form-group">
          <label className="form-label">Institution <span>*</span></label>
          <select className="form-control" value={admin.institution} onChange={(e) => setAdmin({ ...admin, institution: e.target.value })}>
            <option value="">Select institution…</option>
            {state.institutions.map((i) => <option key={i.id}>{i.name}</option>)}
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Admin Role</label>
          <select className="form-control" value={admin.adminRole} onChange={(e) => setAdmin({ ...admin, adminRole: e.target.value })}><option>Institution Admin</option><option>Department Admin</option></select>
        </div>
      </Modal>

      <Modal title="Add Teacher" open={modal === 'teacher'} onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={submitTeacher}>Create Teacher Account</button>
        </>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="form-group"><label className="form-label">First Name <span>*</span></label><input type="text" className="form-control" placeholder="First name" value={teacher.firstName} onChange={(e) => setTeacher({ ...teacher, firstName: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Last Name <span>*</span></label><input type="text" className="form-control" placeholder="Last name" value={teacher.lastName} onChange={(e) => setTeacher({ ...teacher, lastName: e.target.value })} /></div>
        </div>
        <div className="form-group"><label className="form-label">Email Address <span>*</span></label><input type="email" className="form-control" placeholder="teacher@institution.edu" value={teacher.email} onChange={(e) => setTeacher({ ...teacher, email: e.target.value })} /></div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Department</label>
          <input type="text" className="form-control" placeholder="e.g. Mathematical Sciences" value={teacher.dept} onChange={(e) => setTeacher({ ...teacher, dept: e.target.value })} />
        </div>
      </Modal>
    </div>
  )
}
