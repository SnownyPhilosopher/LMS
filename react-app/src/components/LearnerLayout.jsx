import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import AccountMenu from './AccountMenu'
import NotificationBell from './NotificationBell'
import { Avatar, ProgressBar } from './common'
import { useStore } from '../store/store'

const TOPNAV = [
  { key: 'dashboard', icon: 'home', label: 'Home', to: '/learner' },
  { key: 'courses', icon: 'book', label: 'Courses', to: '/learner/courses' },
  { key: 'calendar', icon: 'calendar', label: 'Calendar', to: '/learner/calendar' },
  { key: 'library', icon: 'library', label: 'Library', to: '/learner/library' },
  { key: 'profile', icon: 'user', label: 'Profile', to: '/learner/profile' },
]

const SIDENAV = [
  { key: 'dashboard', icon: 'grid', label: 'Dashboard', to: '/learner' },
  { key: 'activity', icon: 'activity', label: 'My Activity' },
  { key: 'programme', icon: 'graduation', label: 'Programme' },
  { key: 'courses', icon: 'book', label: 'Courses', to: '/learner/courses', badge: 'count' },
  { key: 'results', icon: 'award', label: 'Results', to: '/learner/results' },
  { key: 'resources', icon: 'file', label: 'Resources' },
  { key: 'assessments', icon: 'checkSquare', label: 'Assessments', badge: '2', badgeColor: '#D97706' },
]

// Shared learner shell: institution bar, top nav, left sidebar, optional right panel.
export default function LearnerLayout({ active, right, children }) {
  const { state, toast } = useStore()
  const navigate = useNavigate()
  const me = state.meta.learner
  const overall = state.myCourses.length
    ? Math.round(state.myCourses.reduce((a, c) => a + c.pct, 0) / state.myCourses.length) : 0

  const go = (item) => (item.to ? navigate(item.to) : toast(`${item.label} — demo`, 'info'))

  return (
    <div className="learner-scope">
      <div className="inst-bar">
        <Link to="/login" className="inst-bar__logo">
          <div className="logo-icon"><Icon name="logo" stroke="white" strokeWidth={2.2} /></div>
        </Link>
        <span className="inst-bar__name">{state.meta.institution}</span>
        <div className="inst-bar__sep" />
        <span className="inst-bar__program">{me.program}</span>
        <div className="inst-bar__spacer" />
        <div className="inst-bar__actions">
          <button className="topbar-icon-btn" data-tooltip="Help" aria-label="Help" onClick={() => toast('Help centre — demo', 'info')}><Icon name="help" /></button>
          <NotificationBell />
          <div className="topbar__divider" />
          <AccountMenu />
        </div>
      </div>

      <nav className="learner-topnav">
        {TOPNAV.map((n) => (
          <button key={n.key} className={`lnav-link${active === n.key ? ' active' : ''}`} onClick={() => go(n)}>
            <Icon name={n.icon} /> {n.label}
          </button>
        ))}
      </nav>

      <div className="learner-body">
        <aside className="l-sidebar">
          <div className="l-sidebar__user">
            <Avatar initials={me.initials} color={me.color} size="md" />
            <div>
              <div className="l-sidebar__uname">{me.name}</div>
              <div className="l-sidebar__uid">{me.id}</div>
            </div>
          </div>

          <div className="l-sidebar__prog-wrap">
            <div className="l-sidebar__prog-label"><span>Programme Progress</span><strong>{overall}%</strong></div>
            <ProgressBar pct={overall} />
          </div>

          <div className="sidebar__section">
            {SIDENAV.map((n) => {
              const badge = n.badge === 'count' ? String(state.myCourses.length) : n.badge
              return (
                <a key={n.key} className={`nav-link${active === n.key ? ' active' : ''}`} onClick={() => go(n)}>
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

        <main className={`l-main${right ? '' : ' l-main--full'}`}>
          <div className="l-main-content">{children}</div>
        </main>

        {right && <aside className="r-panel">{right}</aside>}
      </div>
    </div>
  )
}
