import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useStore } from '../store/store'
import { ROLE_DEFS } from '../store/seed'

// Renders the topbar user avatar with a dropdown: identity, switch role, sign out.
// Identity (initials/grad/name) comes from the active preset's meta when not passed in.
export default function AccountMenu({ initials, grad, title }) {
  const { state, session, logout, actions } = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const roleDef = ROLE_DEFS.find((r) => r.id === session.role)
  const id = state.meta?.[session.role] || {}
  initials = initials || id.initials
  grad = grad || id.grad
  title = title || id.name

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  return (
    <div className="acct" ref={ref}>
      <div className="user-avatar" style={{ background: grad }} title={title} role="button" tabIndex={0}
        aria-label="Account menu" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o) } }}>
        {initials}
      </div>
      {open && (
        <div className="acct-menu">
          <div className="acct-menu__head">
            <div className="acct-menu__name">{id.name || title}</div>
            <div className="acct-menu__role">{roleDef?.label}</div>
          </div>
          <button className="acct-menu__item" onClick={() => { setOpen(false); logout(); navigate('/login') }}>
            <Icon name="users" /> Switch role
          </button>
          <button className="acct-menu__item" onClick={() => { setOpen(false); actions.reset() }}>
            <Icon name="activity" /> Reset demo data
          </button>
          <button className="acct-menu__item" onClick={() => { setOpen(false); logout(); navigate('/login') }}>
            <Icon name="x" /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}
