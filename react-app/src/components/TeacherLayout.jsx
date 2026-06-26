import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import AccountMenu from './AccountMenu'
import NotificationBell from './NotificationBell'
import { useStore } from '../store/store'

const SIDEBAR = [
  { label: 'Overview', links: [
    { key: 'dashboard', icon: 'grid', name: 'Dashboard', to: '/teacher' },
    { key: 'analytics', icon: 'barChart', name: 'Analytics', to: '/teacher/analytics' },
  ] },
  { label: 'Teaching', links: [
    { key: 'courses', icon: 'book', name: 'My Courses', to: '/teacher/courses', badge: 'count' },
    { key: 'learners', icon: 'users', name: 'My Learners', to: '/teacher/learners', badge: '248' },
    { key: 'classes', icon: 'calendar', name: 'Live Classes', to: '/teacher/classes', badge: '1', badgeColor: '#DC2626' },
  ] },
  { label: 'Assessment', links: [
    { key: 'grading', icon: 'checkSquare', name: 'Grading Queue', badge: '14', badgeColor: '#D97706' },
    { key: 'assessments', icon: 'fileText', name: 'Assessments' },
  ] },
  { label: 'Resources', links: [
    { key: 'messages', icon: 'message', name: 'Messages', badge: '3' },
    { key: 'settings', icon: 'settings', name: 'Settings' },
  ] },
]

// Shared teacher shell: top bar + left sidebar.
export default function TeacherLayout({ active, children }) {
  const { state, toast } = useStore()
  const navigate = useNavigate()
  const me = state.meta.teacher
  const go = (l) => (l.to ? navigate(l.to) : toast(`${l.name} — demo`, 'info'))

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
          <input type="text" placeholder="Search learners, courses…" />
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
              {sec.links.map((l) => {
                const badge = l.badge === 'count' ? String(state.courses.length) : l.badge
                return (
                  <a key={l.key} className={`nav-link${active === l.key ? ' active' : ''}`} onClick={() => go(l)}>
                    <Icon name={l.icon} /> {l.name}
                    {badge && <span className="nav-link__badge" style={l.badgeColor ? { background: l.badgeColor } : undefined}>{badge}</span>}
                  </a>
                )
              })}
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
          <div className="tc-content">{children}</div>
        </main>
      </div>
    </div>
  )
}
