import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { useStore } from '../store/store'

// Topbar bell button with a dropdown of role-specific notifications.
export default function NotificationBell() {
  const { state, session, actions } = useStore()
  const role = session.role
  const items = state.notifications?.[role] || []
  const unread = items.filter((n) => n.unread).length
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const toggle = () => {
    setOpen((o) => {
      const next = !o
      if (next && unread) actions.markNotifsRead(role)
      return next
    })
  }

  return (
    <div className="notif" ref={ref}>
      <button className="topbar-icon-btn" data-tooltip="Notifications" aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`} onClick={toggle}>
        <Icon name="bell" />
        {unread > 0 && <span className="badge-dot" />}
      </button>
      {open && (
        <div className="notif-menu" role="dialog" aria-label="Notifications">
          <div className="notif-menu__head">
            <span>Notifications</span>
            {unread > 0 && <span className="notif-menu__count">{unread} new</span>}
          </div>
          <div className="notif-menu__list">
            {items.length === 0 && <div className="notif-empty">You're all caught up 🎉</div>}
            {items.map((n) => (
              <div key={n.id} className={`notif-item${n.unread ? ' notif-item--unread' : ''}`}>
                <span className={`ai-dot ai-dot--${n.dot}`} />
                <div className="notif-item__body">
                  <div className="notif-item__text">{n.text}</div>
                  <div className="notif-item__time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
