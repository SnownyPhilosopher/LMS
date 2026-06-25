import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import AccountMenu from '../components/AccountMenu'
import NotificationBell from '../components/NotificationBell'
import { Avatar, ProgressBar, StatCard, Modal } from '../components/common'
import { useStore } from '../store/store'

const SIDEBAR = [
  { label: 'Overview', links: [{ icon: 'grid', name: 'Dashboard', active: true }, { icon: 'barChart', name: 'Analytics' }] },
  { label: 'People', links: [{ icon: 'user', name: 'Teachers', badge: '24' }, { icon: 'graduation', name: 'Learners', badge: '1,248' }, { icon: 'guardian', name: 'Guardians', badge: '342' }] },
  { label: 'Academics', links: [{ icon: 'departments', name: 'Departments', badge: '6' }, { icon: 'graduation', name: 'Programs', badge: '14' }, { icon: 'book', name: 'Courses' }] },
  { label: 'Admin', links: [{ icon: 'checkSquare', name: 'Assessments', badge: '9', badgeColor: '#D97706' }, { icon: 'barChart', name: 'Reports' }, { icon: 'settings', name: 'Settings' }] },
]

const PAGE = 5
const emptyInvite = { role: '', firstName: '', lastName: '', email: '', dept: '', program: '' }

export default function AdminDashboard() {
  const { state, actions, toast } = useStore()
  const navigate = useNavigate()
  const AROUTES = { Teachers: '/admin/teachers', Learners: '/admin/learners', Guardians: '/admin/guardians' }
  const onNav = (name) => (AROUTES[name] ? navigate(AROUTES[name]) : toast(`${name} — demo`, 'info'))
  const [tab, setTab] = useState('teachers')
  const [modal, setModal] = useState(false)
  const [invite, setInvite] = useState(emptyInvite)
  const [openDepts, setOpenDepts] = useState(() => new Set(state.departments.filter((d) => d.open).map((d) => d.id)))

  // filters
  const [tSearch, setTSearch] = useState(''); const [tDept, setTDept] = useState('All Departments'); const [tPage, setTPage] = useState(0)
  const [lSearch, setLSearch] = useState(''); const [lProg, setLProg] = useState('All Programs'); const [lStatus, setLStatus] = useState('All Statuses'); const [lPage, setLPage] = useState(0)

  const stats = [
    { icon: 'users', tone: 'blue', value: state.counts.learners.toLocaleString(), label: 'Total Learners', delta: '43 this month' },
    { icon: 'activity', tone: 'green', value: '72%', label: 'Completion Rate', delta: '4% vs last semester' },
    { icon: 'graduation', tone: 'purple', value: '14', label: 'Active Programs', delta: '2 added this semester' },
    { icon: 'alertCircle', tone: 'yellow', value: '7', label: 'Pending Approvals', delta: '3 since yesterday', deltaDir: 'down' },
  ]

  const teachersF = useMemo(() => {
    const q = tSearch.trim().toLowerCase()
    return state.teachers.filter((t) =>
      (tDept === 'All Departments' || t.dept === tDept) &&
      (!q || t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q)))
  }, [state.teachers, tSearch, tDept])

  const learnersF = useMemo(() => {
    const q = lSearch.trim().toLowerCase()
    return state.learners.filter((l) =>
      (lProg === 'All Programs' || l.program === lProg) &&
      (lStatus === 'All Statuses' || l.status[1] === lStatus) &&
      (!q || l.name.toLowerCase().includes(q) || l.sid.toLowerCase().includes(q)))
  }, [state.learners, lSearch, lProg, lStatus])

  const tSlice = teachersF.slice(tPage * PAGE, tPage * PAGE + PAGE)
  const lSlice = learnersF.slice(lPage * PAGE, lPage * PAGE + PAGE)
  const tMax = Math.max(0, Math.ceil(teachersF.length / PAGE) - 1)
  const lMax = Math.max(0, Math.ceil(learnersF.length / PAGE) - 1)

  const toggleDept = (id) =>
    setOpenDepts((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const submitInvite = () => {
    if (!invite.role) return toast('Select a role', 'warning')
    if (!invite.firstName.trim() || !invite.lastName.trim()) return toast('First and last name are required', 'warning')
    actions.addUser(invite)
    setInvite(emptyInvite); setModal(false)
    setTab(invite.role === 'learner' ? 'learners' : 'teachers')
  }

  return (
    <div className="ad-scope">
      <header className="ad-topbar">
        <Link to="/login" className="ad-topbar__logo">
          <div className="logo-icon"><Icon name="logo" stroke="white" strokeWidth={2.2} /></div>
          <span className="ad-topbar__name">Soteria Learning</span>
        </Link>
        <div className="ad-topbar__sep" />
        <span className="ad-topbar__inst">Nexcorp University</span>
        <span className="ad-topbar__role">Admin</span>
        <div className="ad-topbar__spacer" />
        <div className="ad-topbar__search">
          <span className="ad-topbar__search-icon"><Icon name="search" /></span>
          <input type="text" placeholder="Search learners, teachers, programs…"
            value={tab === 'teachers' ? tSearch : lSearch}
            onChange={(e) => (tab === 'teachers' ? (setTSearch(e.target.value), setTPage(0)) : (setLSearch(e.target.value), setLPage(0)))} />
        </div>
        <div className="ad-topbar__actions">
          <NotificationBell />
          <div className="topbar__divider" />
          <AccountMenu initials="RO" grad="linear-gradient(135deg,#2563EB,#1E3A8A)" title="Rebecca Owusu" />
        </div>
      </header>

      <div className="ad-body">
        <aside className="ad-sidebar">
          {SIDEBAR.map((sec) => (
            <div key={sec.label} className="sidebar__section">
              <div className="sidebar__label">{sec.label}</div>
              {sec.links.map((l) => (
                <a key={l.name} className={`nav-link${l.active ? ' active' : ''}`} onClick={() => !l.active && onNav(l.name)}>
                  <Icon name={l.icon} /> {l.name}
                  {l.badge && <span className="nav-link__badge" style={l.badgeColor ? { background: l.badgeColor } : undefined}>{l.badge}</span>}
                </a>
              ))}
            </div>
          ))}
          <div className="sidebar__spacer" />
          <div className="sidebar__footer">
            <div className="sidebar__user">
              <div className="avatar avatar-md" style={{ background: 'linear-gradient(135deg,#2563EB,#1E3A8A)', color: '#fff' }}>RO</div>
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">Rebecca Owusu</div>
                <div className="sidebar__user-role">Institution Admin</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="ad-main">
          <div className="ad-content">
            <div className="ad-page-header">
              <div>
                <div className="ad-page-header__eyebrow">Nexcorp University</div>
                <div className="ad-page-header__title">Admin Dashboard</div>
                <div className="ad-page-header__sub">Thursday, 18 June 2026 · 6 departments · 14 programs</div>
              </div>
              <div className="ad-page-header__actions">
                <button className="btn btn-secondary" onClick={() => toast('Data exported (demo)')}><Icon name="download" /> Export</button>
                <button className="btn btn-primary" onClick={() => setModal(true)}><Icon name="plus" /> Invite User</button>
              </div>
            </div>

            <div className="section-block">
              <div className="alert-banner">
                <Icon name="alertCircle" />
                <span className="alert-banner__text"><strong>7 pending approvals</strong> require your attention — new learner enrolment requests and 2 teacher account activations.</span>
                <a className="alert-banner__link" onClick={() => toast('Opening approvals — demo', 'info')}>Review now →</a>
              </div>
              <div className="overview-grid">
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
              </div>
            </div>

            <div className="section-block">
              <div className="sh">
                <h2>People</h2>
                <div className="sh-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => toast('CSV import — demo', 'info')}><Icon name="download" /> Import CSV</button>
                  <button className="btn btn-primary btn-sm" onClick={() => setModal(true)}><Icon name="plus" /> Add Person</button>
                </div>
              </div>

              <div className="people-card">
                <div className="people-tabs">
                  <div className={`people-tab${tab === 'teachers' ? ' active' : ''}`} onClick={() => setTab('teachers')}>
                    Teachers <span className="people-tab__count">{state.counts.teachers}</span>
                  </div>
                  <div className={`people-tab${tab === 'learners' ? ' active' : ''}`} onClick={() => setTab('learners')}>
                    Learners <span className="people-tab__count">{state.counts.learners.toLocaleString()}</span>
                  </div>
                </div>

                {tab === 'teachers' && (
                  <div className="people-panel active">
                    <div className="people-toolbar">
                      <div className="people-search"><Icon name="search" /><input type="text" placeholder="Search teachers…" value={tSearch} onChange={(e) => { setTSearch(e.target.value); setTPage(0) }} /></div>
                      <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={tDept} onChange={(e) => { setTDept(e.target.value); setTPage(0) }}>
                        <option>All Departments</option><option>Mathematical Sciences</option><option>Computer Science</option>
                        <option>Economics &amp; Finance</option><option>Business Studies</option><option>Physical Sciences</option>
                      </select>
                    </div>
                    <div className="people-table-wrap">
                      <table>
                        <thead><tr><th>Teacher</th><th>Department</th><th>Courses</th><th>Learners</th><th>Joined</th><th>Status</th><th></th></tr></thead>
                        <tbody>
                          {tSlice.map((t) => (
                            <tr key={t.id}>
                              <td>
                                <div className="td-avatar">
                                  <Avatar initials={t.initials} color={t.color} size="sm" />
                                  <div>
                                    <div className="td-name">{t.name}</div>
                                    <div className="td-muted" style={{ fontSize: 'var(--text-xs)' }}>{t.email}</div>
                                  </div>
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
                          {tSlice.length === 0 && <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No teachers match your filters.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                    <div className="people-footer">
                      <span className="people-footer__info">Showing {tSlice.length} of {state.counts.teachers} teachers</span>
                      <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                        <button className="btn btn-secondary btn-sm" disabled={tPage === 0} onClick={() => setTPage((p) => Math.max(0, p - 1))}>Previous</button>
                        <button className="btn btn-secondary btn-sm" disabled={tPage >= tMax} onClick={() => setTPage((p) => Math.min(tMax, p + 1))}>Next</button>
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'learners' && (
                  <div className="people-panel active">
                    <div className="people-toolbar">
                      <div className="people-search"><Icon name="search" /><input type="text" placeholder="Search learners…" value={lSearch} onChange={(e) => { setLSearch(e.target.value); setLPage(0) }} /></div>
                      <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={lProg} onChange={(e) => { setLProg(e.target.value); setLPage(0) }}>
                        <option>All Programs</option><option>BSc Actuarial Science</option><option>BSc Computer Science</option>
                        <option>BA Economics</option><option>BSc Financial Mathematics</option>
                      </select>
                      <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={lStatus} onChange={(e) => { setLStatus(e.target.value); setLPage(0) }}>
                        <option>All Statuses</option><option>Active</option><option>At Risk</option><option>Inactive</option>
                      </select>
                    </div>
                    <div className="people-table-wrap">
                      <table>
                        <thead><tr><th>Learner</th><th>Student ID</th><th>Program</th><th>Progress</th><th>Last Active</th><th>Status</th><th></th></tr></thead>
                        <tbody>
                          {lSlice.map((l) => (
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
                          {lSlice.length === 0 && <tr><td colSpan={7} className="td-muted" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>No learners match your filters.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                    <div className="people-footer">
                      <span className="people-footer__info">Showing {lSlice.length} of {state.counts.learners.toLocaleString()} learners</span>
                      <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                        <button className="btn btn-secondary btn-sm" disabled={lPage === 0} onClick={() => setLPage((p) => Math.max(0, p - 1))}>Previous</button>
                        <button className="btn btn-secondary btn-sm" disabled={lPage >= lMax} onClick={() => setLPage((p) => Math.min(lMax, p + 1))}>Next</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="section-block">
              <div className="sh">
                <h2>Departments &amp; Programs</h2>
                <div className="sh-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => toast('New department — demo', 'info')}><Icon name="plus" /> New Department</button>
                </div>
              </div>

              <div className="dept-list">
                {state.departments.map((d) => {
                  const open = openDepts.has(d.id)
                  return (
                    <div key={d.id} className={`dept-card${open ? ' open' : ''}`}>
                      <div className="dept-header" onClick={() => toggleDept(d.id)}>
                        <div className="dept-icon" style={{ background: d.bg, color: d.fg }}><Icon name={d.icon} /></div>
                        <div className="dept-info">
                          <div className="dept-name">{d.name}</div>
                          <div className="dept-meta">Head: {d.head} · {d.teachers} teachers</div>
                        </div>
                        <div className="dept-stats">
                          {d.stats.map(([val, lbl]) => (
                            <div key={lbl} className="dept-stat"><div className="dept-stat__val">{val}</div><div className="dept-stat__lbl">{lbl}</div></div>
                          ))}
                        </div>
                        <div className="dept-chevron"><Icon name="chevronDown" /></div>
                      </div>
                      <div className="dept-body">
                        <div className="prog-list">
                          {d.programs.map((p) => (
                            <div key={p.id} className="prog-row">
                              <div className={`prog-dot prog-dot--${p.dot}`} />
                              <div className="prog-info"><div className="prog-name">{p.name}</div><div className="prog-type">{p.type}</div></div>
                              <div className="prog-enrol">{p.enrol}<span>learners</span></div>
                              <div className="prog-completion">
                                <div className="prog-comp-label"><span>Completion</span><strong>{p.pct}%</strong></div>
                                <ProgressBar pct={p.pct} variant={p.variant} />
                              </div>
                              <div className="prog-actions"><button className="btn btn-secondary btn-sm" onClick={() => toast(`Managing ${p.name} (demo)`, 'info')}>Manage</button></div>
                            </div>
                          ))}
                        </div>
                        <div className="dept-footer">
                          <button className="btn btn-primary btn-sm" onClick={() => toast(`Add program to ${d.name} (demo)`, 'info')}><Icon name="plus" /> Add Program to Department</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal title="Invite User" open={modal} onClose={() => setModal(false)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={submitInvite}>Send Invitation</button>
        </>}>
        <div className="form-group">
          <label className="form-label">Role <span>*</span></label>
          <select className="form-control" value={invite.role} onChange={(e) => setInvite({ ...invite, role: e.target.value })}>
            <option value="">Select role…</option><option value="teacher">Teacher</option><option value="learner">Learner</option><option value="guardian">Guardian</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="form-group"><label className="form-label">First Name <span>*</span></label><input type="text" className="form-control" placeholder="First name" value={invite.firstName} onChange={(e) => setInvite({ ...invite, firstName: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Last Name <span>*</span></label><input type="text" className="form-control" placeholder="Last name" value={invite.lastName} onChange={(e) => setInvite({ ...invite, lastName: e.target.value })} /></div>
        </div>
        <div className="form-group"><label className="form-label">Email Address <span>*</span></label><input type="email" className="form-control" placeholder="user@institution.edu" value={invite.email} onChange={(e) => setInvite({ ...invite, email: e.target.value })} /></div>
        {invite.role !== 'learner' && (
          <div className="form-group">
            <label className="form-label">Department</label>
            <select className="form-control" value={invite.dept} onChange={(e) => setInvite({ ...invite, dept: e.target.value })}>
              <option value="">Select department…</option><option>Mathematical Sciences</option><option>Computer Science</option>
              <option>Economics &amp; Finance</option><option>Business Studies</option><option>Physical Sciences</option><option>Social Sciences</option>
            </select>
          </div>
        )}
        {invite.role !== 'teacher' && (
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Program</label>
            <select className="form-control" value={invite.program} onChange={(e) => setInvite({ ...invite, program: e.target.value })}>
              <option value="">Select program…</option><option>BSc Actuarial Science</option><option>BSc Computer Science</option>
              <option>BA Economics</option><option>BSc Financial Mathematics</option><option>BSc Cybersecurity</option>
            </select>
            <div className="form-hint">An invitation email will be sent to the user with login instructions.</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
