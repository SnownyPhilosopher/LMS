import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import AccountMenu from '../components/AccountMenu'
import NotificationBell from '../components/NotificationBell'
import { Avatar, ProgressBar, Modal } from '../components/common'
import { useStore } from '../store/store'

const SIDEBAR = [
  { label: 'Overview', links: [{ icon: 'grid', name: 'Dashboard', active: true }, { icon: 'barChart', name: 'Analytics' }] },
  { label: 'Teaching', links: [{ icon: 'book', name: 'My Courses', badge: '3' }, { icon: 'users', name: 'My Learners', badge: '248' }, { icon: 'calendar', name: 'Live Classes', badge: '1', badgeColor: '#DC2626' }, { icon: 'checkSquare', name: 'Attendance' }] },
  { label: 'Assessment', links: [{ icon: 'award', name: 'Gradebook' }, { icon: 'checkSquare', name: 'Grading Queue', badge: '14', badgeColor: '#D97706' }, { icon: 'fileText', name: 'Assessments' }] },
  { label: 'Resources', links: [{ icon: 'message', name: 'Messages', badge: '3' }, { icon: 'settings', name: 'Settings' }] },
]

const emptyCourse = { name: '', code: '', semester: 'Semester 1', program: 'BSc Actuarial Science', description: '' }
const emptyClass = { title: '', course: '', date: '2026-06-19', time: '10:00', duration: '1 hour' }

export default function TeacherDashboard() {
  const { state, actions, toast } = useStore()
  const navigate = useNavigate()
  const me = state.meta.teacher
  const TROUTES = { 'My Courses': '/teacher/courses', Analytics: '/teacher/analytics', 'My Learners': '/teacher/learners', 'Live Classes': '/teacher/classes', Attendance: '/teacher/attendance', Gradebook: '/teacher/results' }
  const onNav = (name) => (TROUTES[name] ? navigate(TROUTES[name]) : toast(`${name} — demo`, 'info'))
  const [modal, setModal] = useState(null)
  const [course, setCourse] = useState(emptyCourse)
  const [klass, setKlass] = useState({ ...emptyClass, course: state.courses[0]?.name || '' })
  const [search, setSearch] = useState(''); const [courseF, setCourseF] = useState('All Courses'); const [statusF, setStatusF] = useState('All Statuses')

  const learners = useMemo(() => {
    const q = search.trim().toLowerCase()
    return state.classLearners.filter((l) =>
      (courseF === 'All Courses' || l.course === courseF) &&
      (statusF === 'All Statuses' || l.risk[1].includes(statusF)) &&
      (!q || l.name.toLowerCase().includes(q) || l.sid.toLowerCase().includes(q)))
  }, [state.classLearners, search, courseF, statusF])

  const submitCourse = () => {
    if (!course.name.trim() || !course.code.trim()) return toast('Course name and code are required', 'warning')
    actions.addCourse(course)
    setCourse(emptyCourse); setModal(null)
  }
  const submitClass = () => {
    if (!klass.title.trim()) return toast('Session title is required', 'warning')
    actions.addClass(klass)
    setKlass({ ...emptyClass, course: state.courses[0]?.name || '' }); setModal(null)
  }

  return (
    <div className="tc-scope">
      <header className="tc-topbar">
        <Link to="/login" className="tc-topbar__logo">
          <div className="logo-icon"><Icon name="logo" stroke="white" strokeWidth={2.2} /></div>
          <span className="tc-topbar__name">Soteria Learning</span>
        </Link>
        <div className="tc-topbar__sep" />
        <span className="tc-topbar__inst">{state.meta.institution}</span>
        <span className="tc-topbar__role">Teacher</span>
        <div className="tc-topbar__spacer" />
        <div className="tc-topbar__search">
          <span className="tc-topbar__search-icon"><Icon name="search" /></span>
          <input type="text" placeholder="Search learners, courses…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="tc-topbar__actions">
          <NotificationBell />
          <div className="topbar__divider" />
          <AccountMenu />
        </div>
      </header>

      <div className="tc-body">
        <aside className="tc-sidebar">
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
              <div className="avatar avatar-md" style={{ background: me.grad, color: '#fff' }}>{me.initials}</div>
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">{me.name}</div>
                <div className="sidebar__user-role">{me.sub}</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="tc-main">
          <div className="tc-content">
            <div className="tc-page-header">
              <div>
                <div className="tc-page-header__eyebrow">{me.sub} · {state.meta.institution}</div>
                <div className="tc-page-header__title">Good morning, {me.first} 👋</div>
                <div className="tc-page-header__sub">Thursday, 18 June 2026 · {state.courses.length} courses · 248 learners · 1 class live now</div>
              </div>
              <div className="tc-page-header__actions">
                <button className="btn btn-secondary" onClick={() => setModal('schedule')}><Icon name="calendar" /> Schedule Class</button>
                <button className="btn btn-primary" onClick={() => setModal('course')}><Icon name="plus" /> New Course</button>
              </div>
            </div>

            {/* My Courses */}
            <div className="section-block">
              <div className="sh">
                <h2>My Courses</h2>
                <div className="sh-actions"><a style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)', cursor: 'pointer' }} onClick={() => navigate('/teacher/courses')}>View all →</a></div>
              </div>
              <div className="tc-course-grid">
                {state.courses.map((c) => (
                  <div key={c.id} className="tc-course-card">
                    <div className="tc-course-card__banner" style={{ background: c.banner }} />
                    <div className="tc-course-card__body">
                      <div className="tc-course-card__dept">Mathematical Sciences</div>
                      <div className="tc-course-card__name">{c.name}</div>
                      <div className="tc-course-card__code">{c.code}</div>
                      <div className="tc-course-stats">
                        <div className="tc-course-stat"><div className="tc-course-stat__val">{c.learners}</div><div className="tc-course-stat__lbl">Learners</div></div>
                        <div className="tc-course-stat"><div className="tc-course-stat__val">{c.chapters}</div><div className="tc-course-stat__lbl">Chapters</div></div>
                        <div className="tc-course-stat"><div className="tc-course-stat__val">{c.avg}</div><div className="tc-course-stat__lbl">Avg Completion</div></div>
                      </div>
                      <div>
                        <div className="tc-course-comp-row"><span>Class progress</span><strong>{c.pct}%</strong></div>
                        <ProgressBar pct={c.pct} variant={c.variant} />
                      </div>
                    </div>
                    <div className="tc-course-card__footer">
                      <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => navigate(`/teacher/courses/${c.id}`)}>Manage Course</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => toast(`${c.name} analytics (demo)`, 'info')}><Icon name="barChart" /></button>
                    </div>
                  </div>
                ))}

                <div className="tc-course-card tc-course-card--new" onClick={() => setModal('course')}>
                  <div className="new-card-icon"><Icon name="plus" /></div>
                  <div className="new-card-label">Create New Course</div>
                  <div className="new-card-sub">Add chapters, tasks, and assign learners</div>
                </div>
              </div>
            </div>

            {/* My Learners */}
            <div className="section-block">
              <div className="sh">
                <h2>My Learners</h2>
                <div className="sh-actions"><a style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)', cursor: 'pointer' }} onClick={() => toast('All 248 learners — demo', 'info')}>View all 248 →</a></div>
              </div>
              <div className="learners-card">
                <div className="learners-toolbar">
                  <div className="learners-search"><Icon name="search" /><input type="text" placeholder="Search learners…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
                  <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={courseF} onChange={(e) => setCourseF(e.target.value)}>
                    <option>All Courses</option><option>Mathematical Methods I</option><option>Probability &amp; Statistics</option><option>Calculus II</option>
                  </select>
                  <select className="form-control" style={{ width: 'auto', height: 34, fontSize: 'var(--text-sm)' }} value={statusF} onChange={(e) => setStatusF(e.target.value)}>
                    <option>All Statuses</option><option>On Track</option><option>At Risk</option><option>Inactive</option>
                  </select>
                  <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => toast('Learners exported (demo)')}><Icon name="download" /> Export</button>
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
                              <div>
                                <div className="td-name">{l.name}</div>
                                <div className="td-muted" style={{ fontSize: 'var(--text-xs)' }}>{l.sid}</div>
                              </div>
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
                          <td className="td-muted" style={l.dueDanger ? { color: 'var(--color-danger)', fontWeight: 'var(--fw-semi)' } : undefined}>{l.due}</td>
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
                  <span className="learners-footer__info">Showing {learners.length} of 248 learners · <span style={{ color: 'var(--color-danger)', fontWeight: 'var(--fw-semi)' }}>12 at risk</span></span>
                  <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                    <button className="btn btn-secondary btn-sm" disabled>Previous</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => toast('Next page — demo', 'info')}>Next</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Classes & Grading */}
            <div className="section-block">
              <div className="sh">
                <h2>Live Classes &amp; Grading</h2>
                <div className="sh-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => setModal('schedule')}><Icon name="plus" /> Schedule Class</button>
                </div>
              </div>

              <div className="bottom-grid">
                <div className="classes-panel">
                  <div className="panel-header">
                    <div>
                      <h3>Upcoming Classes</h3>
                      <div className="panel-header__sub">Next 7 days · {state.classes.length} scheduled</div>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semi)', color: 'var(--color-danger)' }}>
                      <span style={{ width: 7, height: 7, background: 'var(--color-danger)', borderRadius: '50%', display: 'inline-block', animation: 'pulse-bg 1.5s infinite' }} />
                      1 LIVE NOW
                    </span>
                  </div>

                  {state.classes.map((c) => (
                    <div key={c.id} className="class-item">
                      <div className="class-item__top">
                        <div className={`class-time-badge${c.live ? ' class-time-badge--live' : ''}`}>
                          <div className="class-time-badge__time">{c.time}</div>
                          <div className="class-time-badge__date">{c.date}</div>
                        </div>
                        <div className="class-info">
                          <div className="class-info__name">{c.name}</div>
                          <div className="class-info__course">{c.course}</div>
                        </div>
                      </div>
                      <div className="class-item__meta">
                        <span className="class-meta-chip"><Icon name="users" /> {c.meta[0]}</span>
                        <span className="class-meta-chip"><Icon name="clock" /> {c.meta[1]}</span>
                      </div>
                      <div className="class-item__actions">
                        {c.live ? (
                          <>
                            <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => toast('Rejoining live class (demo)')}><Icon name="video" /> Rejoin Class</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => toast('Class ended (demo)', 'warning')}>End Class</button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => toast(`${c.name} details (demo)`, 'info')}>View Details</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => toast(`Editing ${c.name} (demo)`, 'info')}>Edit</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grading-panel">
                  <div className="panel-header">
                    <div>
                      <h3>Grading Queue</h3>
                      <div className="panel-header__sub">14 submissions awaiting review</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => toast('Opening grading workspace (demo)')}>Grade All</button>
                  </div>

                  {state.grading.map((g) => (
                    <div key={g.id} className="grade-item" onClick={() => toast(`Grading: ${g.title} (demo)`, 'info')} style={{ cursor: 'pointer' }}>
                      <div className={`grade-type-icon grade-type-icon--${g.tone}`}><Icon name={g.icon} /></div>
                      <div className="grade-info">
                        <div className="grade-info__title">{g.title}</div>
                        <div className="grade-info__meta">{g.meta}</div>
                      </div>
                      <span className={`grade-count${g.low ? ' grade-count--low' : ''}`}>{g.count}</span>
                    </div>
                  ))}

                  <div style={{ padding: 'var(--sp-4) var(--sp-5)', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)', display: 'flex', justifyContent: 'center' }}>
                    <a style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => toast('Full grading queue — demo', 'info')}>View full grading queue →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal title="Create New Course" open={modal === 'course'} onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={submitCourse}>Create Course</button>
        </>}>
        <div className="form-group"><label className="form-label">Course Name <span>*</span></label><input type="text" className="form-control" placeholder="e.g. Linear Algebra" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="form-group"><label className="form-label">Course Code <span>*</span></label><input type="text" className="form-control" placeholder="e.g. MTH 401" value={course.code} onChange={(e) => setCourse({ ...course, code: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Semester</label><select className="form-control" value={course.semester} onChange={(e) => setCourse({ ...course, semester: e.target.value })}><option>Semester 1</option><option>Semester 2</option><option>Full Year</option></select></div>
        </div>
        <div className="form-group">
          <label className="form-label">Program</label>
          <select className="form-control" value={course.program} onChange={(e) => setCourse({ ...course, program: e.target.value })}><option>BSc Actuarial Science</option><option>BSc Mathematics</option><option>BSc Financial Mathematics</option></select>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" placeholder="Brief course description…" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <div className="form-hint">You can add chapters and tasks after creating the course.</div>
        </div>
      </Modal>

      <Modal title="Schedule Live Class" open={modal === 'schedule'} onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={submitClass}>Schedule Class</button>
        </>}>
        <div className="form-group"><label className="form-label">Session Title <span>*</span></label><input type="text" className="form-control" placeholder="e.g. Chapter 4 Lecture" value={klass.title} onChange={(e) => setKlass({ ...klass, title: e.target.value })} /></div>
        <div className="form-group">
          <label className="form-label">Course <span>*</span></label>
          <select className="form-control" value={klass.course} onChange={(e) => setKlass({ ...klass, course: e.target.value })}>
            {state.courses.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="form-group"><label className="form-label">Date <span>*</span></label><input type="date" className="form-control" value={klass.date} onChange={(e) => setKlass({ ...klass, date: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Time <span>*</span></label><input type="time" className="form-control" value={klass.time} onChange={(e) => setKlass({ ...klass, time: e.target.value })} /></div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Duration</label>
          <select className="form-control" value={klass.duration} onChange={(e) => setKlass({ ...klass, duration: e.target.value })}><option>30 minutes</option><option>1 hour</option><option>1.5 hours</option><option>2 hours</option></select>
          <div className="form-hint">Learners will be notified automatically when the class is scheduled.</div>
        </div>
      </Modal>
    </div>
  )
}
