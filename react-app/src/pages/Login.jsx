import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useStore } from '../store/store'
import { PRESETS, ROLE_DEFS, makeSeed } from '../store/seed'

export default function Login() {
  const { login } = useStore()
  const navigate = useNavigate()
  const [preset, setPreset] = useState('university')

  const meta = makeSeed(preset).meta

  const pick = (role) => {
    login(role.id, preset)
    navigate(role.route)
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <div className="logo-icon"><Icon name="logo" stroke="white" strokeWidth={2.2} /></div>
          <span className="logo-name">Soteria Learning</span>
        </div>
        <div className="login-sub">Choose a demo, then pick a role to sign in</div>

        <div className="preset-tabs">
          {PRESETS.map((p) => (
            <button key={p.id} className={`preset-tab${preset === p.id ? ' active' : ''}`} onClick={() => setPreset(p.id)}>
              <span className="preset-tab__label">{p.label}</span>
              <span className="preset-tab__sub">{p.sub}</span>
            </button>
          ))}
        </div>

        <div className="login-inst"><Icon name="home" /> {meta.institution}</div>

        <div className="login-label">Continue as</div>
        <div className="role-list">
          {ROLE_DEFS.map((r) => {
            const id = meta[r.id]
            return (
              <button key={r.id} className="role-option" onClick={() => pick(r)}>
                <div className="role-option__avatar" style={{ background: id.grad }}>{id.initials}</div>
                <div>
                  <div className="role-option__name">{id.name}</div>
                  <div className="role-option__sub">{id.sub}</div>
                </div>
                <span className="role-option__role"><span className="badge badge-blue">{r.label}</span></span>
                <span className="role-option__chev"><Icon name="chevronDown" /></span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
