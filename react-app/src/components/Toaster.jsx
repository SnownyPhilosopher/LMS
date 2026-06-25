import { useStore } from '../store/store'

export default function Toaster() {
  const { toasts } = useStore()
  if (!toasts.length) return null
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.kind}`}>
          <span className="toast__dot" />
          {t.message}
        </div>
      ))}
    </div>
  )
}
