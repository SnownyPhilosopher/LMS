import { useEffect } from 'react'
import Icon from './Icon'

export function Avatar({ initials, color = 'blue', size = 'md', style }) {
  return (
    <div className={`avatar avatar-${size} avatar-${color}`} style={style}>
      {initials}
    </div>
  )
}

export function Badge({ color = 'gray', children }) {
  return <span className={`badge badge-${color}`}>{children}</span>
}

export function ProgressBar({ pct, variant, style }) {
  const cls = ['progress-fill']
  if (variant) cls.push(`progress-fill--${variant}`)
  return (
    <div className="progress-bar" style={style}>
      <div className={cls.join(' ')} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function StatCard({ icon, tone = 'blue', value, label, delta, deltaDir = 'up' }) {
  return (
    <div className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${tone}`}>
        <Icon name={icon} />
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
      {delta && (
        <div className={`stat-card__delta stat-card__delta--${deltaDir}`}>
          {deltaDir === 'up' ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  )
}

export function Modal({ title, open, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">
            <Icon name="x" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}
