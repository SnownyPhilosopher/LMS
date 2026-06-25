import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import LearnerLayout from '../components/LearnerLayout'
import { useStore } from '../store/store'

const RESOURCES = [
  { id: 'r1', type: 'doc', icon: 'file', kind: 'Document', title: 'Mathematical Methods — Formula Sheet', meta: 'PDF · 12 pages · Updated Jun 2026' },
  { id: 'r2', type: 'video', icon: 'video', kind: 'Video', title: 'Lecture Recording: Differential Equations', meta: 'Video · 48 min' },
  { id: 'r3', type: 'book', icon: 'book', kind: 'E-book', title: 'Introduction to Actuarial Science', meta: 'E-book · Chapter 1–6 available' },
  { id: 'r4', type: 'doc', icon: 'file', kind: 'Document', title: 'Probability & Statistics — Worked Solutions', meta: 'PDF · 24 pages' },
  { id: 'r5', type: 'link', icon: 'globe', kind: 'Link', title: 'Society of Actuaries — Study Resources', meta: 'External link' },
  { id: 'r6', type: 'video', icon: 'video', kind: 'Video', title: 'Tutorial: Time Value of Money', meta: 'Video · 22 min' },
  { id: 'r7', type: 'book', icon: 'book', kind: 'E-book', title: 'Financial Mathematics Handbook', meta: 'E-book · 320 pages' },
  { id: 'r8', type: 'doc', icon: 'file', kind: 'Document', title: 'Past Exam Papers (2021–2025)', meta: 'PDF · Archive' },
]

const TYPES = ['All', 'Document', 'Video', 'E-book', 'Link']

export default function LearnerLibrary() {
  const { toast } = useStore()
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RESOURCES.filter((r) => (type === 'All' || r.kind === type) && (!q || r.title.toLowerCase().includes(q)))
  }, [query, type])

  return (
    <LearnerLayout active="library">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">Resources</div>
          <div className="page-head__title">Library</div>
          <div className="page-head__sub">Documents, recordings, e-books and links for your programme</div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Icon name="search" />
          <input type="text" placeholder="Search resources…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="form-control" style={{ width: 'auto', height: 38 }} value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="res-grid">
        {items.map((r) => (
          <div key={r.id} className="res-card" onClick={() => toast(`Opening “${r.title}” (demo)`, 'info')}>
            <div className={`res-icon res-icon--${r.type}`}><Icon name={r.icon} /></div>
            <div className="res-title">{r.title}</div>
            <div className="res-card__spacer" />
            <div className="res-meta">{r.meta}</div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <div className="empty-state__title">No resources found</div>
          <p>Try a different search or type filter.</p>
        </div>
      )}
    </LearnerLayout>
  )
}
