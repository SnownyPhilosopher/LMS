import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useStore } from '../store/store'
import { ROLES } from '../store/seed'

export default function Login() {
  const { login } = useStore()
  const navigate = useNavigate()

  const pick = (role) => {
    login(role.id)
    navigate(role.route)
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <div className="logo-icon"><Icon name="logo" stroke="white" strokeWidth={2.2} /></div>
          <span className="logo-name">Soteria Learning</span>
        </div>
        <div className="login-sub">Choose a role to sign in to the prototype</div>

        <div className="login-label">Continue as</div>
        <div className="role-list">
          {ROLES.map((r) => (
            <button key={r.id} className="role-option" onClick={() => pick(r)}>
              <div className="role-option__avatar" style={{ background: r.grad }}>{r.initials}</div>
              <div>
                <div className="role-option__name">{r.name}</div>
                <div className="role-option__sub">{r.sub}</div>
              </div>
              <span className="role-option__role"><span className="badge badge-blue">{r.label}</span></span>
              <span className="role-option__chev"><Icon name="chevronDown" /></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
