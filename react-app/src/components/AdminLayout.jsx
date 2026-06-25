import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import AccountMenu from './AccountMenu'
import NotificationBell from './NotificationBell'
import { useStore } from '../store/store'

const SIDEBAR = [
  { label: 'Overview', links: [
    { key: 'dashboard', icon: 'grid', name: 'Dashboard', to: '/admin' },
    { key: 'analytics', icon: 'barChart', name: 'Analytics' },
  ] },
  { label: 'People', links: [
    { key: 'teachers', icon: 'user', name: 'Teachers', to: '/admin/teachers', badge: '24' },
    { key: 'learners', icon: 'graduation', name: 'Learners', to: '/admin/learners', badge: '1,248' },
    { key: 'guardians', icon: 'guardian', name: 'Guardians', to: '/admin/guardians', badge: '342' },
  ] },
  { label: 'Academics', links: [
    { key: 'departments', icon: 'departments', name: 'Departments', badge: '6' },
    { key: 'programs', icon: 'graduation', name: 'Programs', badge: '14' },
    { key: 'courses', icon: 'book', name: 'Courses' },
  ] },
  { label: 'Admin', links: [
    { key: 'assessments', icon: 'checkSquare', name: 'Assessments', badge: '9', badgeColor: '#D97706' },
    { key: 'reports', icon: 'barChart', name: 'Reports' },
    { key: 'settings', icon: 'settings', name: 'Settings' },
  ] },
]

// Shared admin shell: top bar + left sidebar.
export default function AdminLayout({ active, children }) {
  const { toast } = useStore()
  const navigate = useNavigate()
  const go = (l) => (l.to ? navigate(l.to) : toast(`${l.name} — demo`, 'info'))

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
          <input type="text" placeholder="Search learners, teachers, programs…" />
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
                <a key={l.key} className={`nav-link${active === l.key ? ' active' : ''}`} onClick={() => go(l)}>
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
          <div className="ad-content">{children}</div>
        </main>
      </div>
    </div>
  )
}
