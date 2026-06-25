import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import AccountMenu from '../components/AccountMenu'
import NotificationBell from '../components/NotificationBell'
import { Avatar, Badge, ProgressBar } from '../components/common'
import { useStore } from '../store/store'

const NAV = [
  { icon: 'grid', label: 'Dashboard', active: true },
  { icon: 'activity', label: 'My Activity' },
  { icon: 'graduation', label: 'Programme' },
  { icon: 'book', label: 'Courses', badge: '6' },
  { icon: 'file', label: 'Resources' },
  { icon: 'checkSquare', label: 'Assessments', badge: '2', badgeColor: '#D97706' },
]

const TOPNAV = [
  { icon: 'home', label: 'Home', active: true },
  { icon: 'book', label: 'Courses' },
  { icon: 'calendar', label: 'Calendar' },
  { icon: 'library', label: 'Library' },
  { icon: 'user', label: 'Profile' },
]

function MiniCalendar() {
  const eventDays = new Set([18, 19, 20, 25, 30])
  const today = 18
  const dows = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  return (
    <div className="mini-cal__grid">
      {dows.map((d) => <div key={d} className="mini-cal__dow">{d}</div>)}
      {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
        const cls = ['mini-cal__day']
        if (d === today) cls.push('mini-cal__day--today')
        if (eventDays.has(d)) cls.push('mini-cal__day--has-event')
        return <div key={d} className={cls.join(' ')}>{d}</div>
      })}
    </div>
  )
}

export default function LearnerHome() {
  const { state, toast } = useStore()
  const navigate = useNavigate()
  const onNav = (label) => (label === 'Courses' ? navigate('/learner/courses') : toast(`${label} — demo`, 'info'))

  // Derive programme stats from the course data in the store
  const courses = state.myCourses
  const overall = courses.length ? Math.round(courses.reduce((a, c) => a + c.pct, 0) / courses.length) : 0
  const completed = courses.filter((c) => c.pct === 100).length
  const inProgress = courses.filter((c) => c.pct > 0 && c.pct < 100).length
  const dueSoon = state.events.filter((e) => e.line === 'yellow' || e.line === 'red').length

  return (
    <div className="learner-scope">
      <div className="inst-bar">
        <Link to="/login" className="inst-bar__logo">
          <div className="logo-icon"><Icon name="logo" stroke="white" strokeWidth={2.2} /></div>
        </Link>
        <span className="inst-bar__name">Nexcorp University</span>
        <div className="inst-bar__sep" />
        <span className="inst-bar__program">BSc In Actuarial Science</span>
        <div className="inst-bar__spacer" />
        <div className="inst-bar__actions">
          <button className="topbar-icon-btn" data-tooltip="Help" aria-label="Help" onClick={() => toast('Help centre — demo', 'info')}><Icon name="help" /></button>
          <NotificationBell />
          <div className="topbar__divider" />
          <AccountMenu initials="AA" grad="linear-gradient(135deg,#3B82F6,#6366F1)" title="Amara Asante" />
        </div>
      </div>

      <nav className="learner-topnav">
        {TOPNAV.map((n) => (
          <button key={n.label} className={`lnav-link${n.active ? ' active' : ''}`} onClick={() => !n.active && onNav(n.label)}>
            <Icon name={n.icon} /> {n.label}
          </button>
        ))}
      </nav>

      <div className="learner-body">
        <aside className="l-sidebar">
          <div className="l-sidebar__user">
            <Avatar initials="AA" color="blue" size="md" />
            <div>
              <div className="l-sidebar__uname">Amara Asante</div>
              <div className="l-sidebar__uid">NXU/ACT/2023/041</div>
            </div>
          </div>

          <div className="l-sidebar__prog-wrap">
            <div className="l-sidebar__prog-label"><span>Programme Progress</span><strong>{overall}%</strong></div>
            <ProgressBar pct={overall} />
          </div>

          <div className="sidebar__section">
            {NAV.map((n) => {
              const badge = n.label === 'Courses' ? String(courses.length) : n.badge
              return (
                <a key={n.label} className={`nav-link${n.active ? ' active' : ''}`} onClick={() => !n.active && onNav(n.label)}>
                  <Icon name={n.icon} /> {n.label}
                  {badge && <span className="nav-link__badge" style={n.badgeColor ? { background: n.badgeColor } : undefined}>{badge}</span>}
                </a>
              )
            })}
          </div>

          <div className="sidebar__section">
            <div className="sidebar__label">Other</div>
            <a className="nav-link" onClick={() => toast('Minor Courses — demo', 'info')}><Icon name="clockSmall" /> Minor Courses<span className="nav-link__badge">2</span></a>
            <a className="nav-link" onClick={() => toast('Other Programmes — demo', 'info')}><Icon name="globe" /> Other Programmes</a>
          </div>
        </aside>

        <main className="l-main">
          <div className="l-main-content">
            <div className="greeting">
              <div className="greeting__date">Thursday, 18 June 2026</div>
              <div className="greeting__title">Good morning, Amara 👋</div>
              <div className="greeting__sub">You have {dueSoon} upcoming deadlines and a lecture at 10:00 AM today.</div>
            </div>

            <div className="prog-banner">
              <div className="prog-banner__info">
                <h3>BSc In Actuarial Science — Year 2, Semester 1</h3>
                <p>{inProgress} of {courses.length} major courses in progress · {completed} completed this semester</p>
                <div className="prog-banner__bar"><div className="prog-banner__fill" style={{ width: `${overall}%` }} /></div>
              </div>
              <div className="prog-banner__stats">
                <div className="pbs-divider" />
                <div className="pbs"><div className="pbs__val">{overall}%</div><div className="pbs__lbl">Overall</div></div>
                <div className="pbs-divider" />
                <div className="pbs"><div className="pbs__val">{completed}</div><div className="pbs__lbl">Completed</div></div>
                <div className="pbs-divider" />
                <div className="pbs"><div className="pbs__val">{dueSoon}</div><div className="pbs__lbl">Due Soon</div></div>
              </div>
            </div>

            <div className="s-heading">
              <h2>My Courses — Major</h2>
              <a onClick={() => navigate('/learner/courses')}>View all</a>
            </div>

            <div className="lcourse-grid">
              {state.myCourses.map((c) => (
                <a key={c.id} className="lcourse-card" onClick={() => navigate(`/learner/courses/${c.id}`)}>
                  <div className={`lcc-cover course-card__cover--${c.cover}`}>
                    <span className="lcc-emoji"><Icon name={c.icon} /></span>
                    <span className="lcc-type-badge">Core</span>
                    <span className="lcc-status-badge"><Badge color={c.status[0]}>{c.status[1]}</Badge></span>
                  </div>
                  <div className="lcc-body">
                    <div className="lcc-title">{c.title}</div>
                    <div className="lcc-meta">{c.meta}</div>
                    <div className="lcc-pct">{c.pct}%</div>
                    <ProgressBar pct={c.pct} variant={c.variant} />
                  </div>
                </a>
              ))}
            </div>

            <div className="s-heading"><h2>Continue Where You Left Off</h2></div>
            <div className="continue-list">
              {state.continueItems.map((c) => (
                <a key={c.id} className="continue-card" onClick={() => toast(`${c.action}: ${c.task} (demo)`, 'info')}>
                  <div className="cc-icon" style={{ background: c.bg, color: c.fg }}><Icon name={c.icon} /></div>
                  <div className="cc-info">
                    <div className="cc-course">{c.course}</div>
                    <div className="cc-task">{c.task}</div>
                    <div className="cc-chapter">
                      {c.chapter}
                      <span className="cc-task-type"><Icon name={c.typeIcon} /> {c.typeLabel}</span>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <button className={`btn ${c.primary ? 'btn-primary' : 'btn-secondary'} btn-sm`}>{c.action}</button>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>

        <aside className="r-panel">
          <div className="r-section-title">Upcoming Events</div>
          <div className="event-list">
            {state.events.map((e) => (
              <div key={e.id} className="event-row">
                <div className="event-date">
                  <div className="event-day">{e.day}</div>
                  <div className="event-month">{e.month}</div>
                </div>
                <div className={`event-line event-line--${e.line}`} />
                <div className="event-info">
                  <div className="event-title">{e.title}</div>
                  <div className="event-meta">{e.meta}</div>
                </div>
                {e.today && <span className="event-today">Today</span>}
              </div>
            ))}
          </div>

          <div className="r-section-title" style={{ marginTop: 'var(--sp-2)' }}>June 2026</div>
          <MiniCalendar />
        </aside>
      </div>
    </div>
  )
}
