import TeacherLayout from '../components/TeacherLayout'
import { StatCard } from '../components/common'
import { useStore } from '../store/store'

export default function TeacherAnalytics() {
  const { state } = useStore()
  const courses = state.courses
  const avg = courses.length ? Math.round(courses.reduce((a, c) => a + c.pct, 0) / courses.length) : 0

  const learners = state.classLearners
  const onTrack = learners.filter((l) => l.risk[1].includes('On Track')).length
  const atRisk = learners.length - onTrack
  const statusMax = Math.max(onTrack, atRisk, 1)

  const stats = [
    { icon: 'users', tone: 'blue', value: '248', label: 'Total Learners', delta: '12 new this month' },
    { icon: 'activity', tone: 'green', value: `${avg}%`, label: 'Avg Completion', delta: '4% vs last month' },
    { icon: 'book', tone: 'purple', value: String(courses.length), label: 'Active Courses' },
    { icon: 'alertCircle', tone: 'yellow', value: '12', label: 'At-Risk Learners', delta: '2 since last week', deltaDir: 'down' },
  ]

  return (
    <TeacherLayout active="analytics">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">Mathematical Sciences · Nexcorp University</div>
          <div className="page-head__title">Analytics</div>
          <div className="page-head__sub">Performance across your {courses.length} courses</div>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 'var(--sp-6)' }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="chart-card" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="chart-card__title">Completion by course</div>
        {courses.map((c) => (
          <div key={c.id} className="bar-row">
            <div className="bar-row__label">{c.name}</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${Math.max(c.pct, 8)}%`, background: c.banner }}>{c.pct}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="columns">
        <div className="chart-card">
          <div className="chart-card__title">Learner status (sample)</div>
          <div className="bar-row">
            <div className="bar-row__label">On Track</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${(onTrack / statusMax) * 100}%`, background: 'var(--color-success)' }}>{onTrack}</div></div>
          </div>
          <div className="bar-row">
            <div className="bar-row__label">At Risk</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${(atRisk / statusMax) * 100}%`, background: 'var(--color-danger)' }}>{atRisk}</div></div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card__title">Weekly engagement</div>
          {[['Mon', 72], ['Tue', 88], ['Wed', 64], ['Thu', 91], ['Fri', 58]].map(([d, v]) => (
            <div key={d} className="bar-row">
              <div className="bar-row__label" style={{ width: 60 }}>{d}</div>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${v}%`, background: 'var(--color-primary)' }}>{v}%</div></div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayout>
  )
}
