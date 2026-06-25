import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import LearnerLayout from '../components/LearnerLayout'
import { Badge, ProgressBar } from '../components/common'
import { useStore } from '../store/store'

const FILTERS = ['All', 'In Progress', 'Complete', 'Not Started']

export default function LearnerCourses() {
  const { state } = useStore()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const courses = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.myCourses.filter((c) => {
      const status = c.pct === 100 ? 'Complete' : c.pct === 0 ? 'Not Started' : 'In Progress'
      return (filter === 'All' || status === filter) && (!q || c.title.toLowerCase().includes(q))
    })
  }, [state.myCourses, query, filter])

  return (
    <LearnerLayout active="courses">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">BSc Actuarial Science · Year 2</div>
          <div className="page-head__title">My Courses</div>
          <div className="page-head__sub">{state.myCourses.length} major courses this semester</div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Icon name="search" />
          <input type="text" placeholder="Search courses…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="form-control" style={{ width: 'auto', height: 38 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
          {FILTERS.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>

      <div className="lcourse-grid">
        {courses.map((c) => (
          <a key={c.id} className="lcourse-card" onClick={() => navigate(`/learner/courses/${c.id}`)}>
            <div className={`lcc-cover course-card__cover--${c.cover}`}>
              <span className="lcc-emoji"><Icon name={c.icon} /></span>
              <span className="lcc-type-badge">Core</span>
              <span className="lcc-status-badge"><Badge color={c.status[0]}>{c.status[1]}</Badge></span>
            </div>
            <div className="lcc-body">
              <div className="lcc-title">{c.title}</div>
              <div className="lcc-meta">{c.meta}</div>
              <div className="lcc-pct">{c.pct}%</div>
              <ProgressBar pct={c.pct} variant={c.variant} />
            </div>
          </a>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">📚</div>
          <div className="empty-state__title">No courses found</div>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}
    </LearnerLayout>
  )
}
