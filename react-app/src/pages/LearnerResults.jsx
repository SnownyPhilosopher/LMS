import Icon from '../components/Icon'
import LearnerLayout from '../components/LearnerLayout'
import { Badge, StatCard } from '../components/common'
import { useStore } from '../store/store'
import { caExam } from '../lib/academics'

export default function LearnerResults() {
  const { state } = useStore()
  const me = state.meta.learner

  const rows = state.myCourses.map((c) => ({ subject: c.title, icon: c.icon, ...caExam(c.title + me.id, c.pct) }))
  const avg = rows.length ? Math.round(rows.reduce((a, r) => a + r.total, 0) / rows.length) : 0
  const best = rows.reduce((a, r) => (r.total > a.total ? r : a), rows[0] || { subject: '—', total: 0 })
  const caDone = rows.filter((r) => r.ca > 0).length

  // Past-term overall averages (derived, stable)
  const terms = [
    { term: 'Term 1', avg: Math.max(0, Math.round(avg * 0.88)) },
    { term: 'Term 2', avg: Math.max(0, Math.round(avg * 0.94)) },
    { term: 'This Term', avg, current: true },
  ]
  const termMax = Math.max(...terms.map((t) => t.avg), 1)

  return (
    <LearnerLayout active="results">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{me.sub}</div>
          <div className="page-head__title">My Results</div>
          <div className="page-head__sub">Continuous assessment &amp; exam performance</div>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 'var(--sp-6)' }}>
        <StatCard icon="activity" tone="blue" value={`${avg}%`} label="Overall Average" delta="3% vs last term" />
        <StatCard icon="award" tone="green" value={best.grade ? best.grade[0] : '—'} label={`Best: ${best.subject}`} />
        <StatCard icon="checkSquare" tone="purple" value={String(caDone)} label="CA Recorded" />
        <StatCard icon="graduation" tone="yellow" value={String(rows.length)} label="Subjects" />
      </div>

      <div className="s-heading"><h2>This Term — Continuous Assessment &amp; Exam</h2></div>
      <div className="table-wrap" style={{ marginBottom: 'var(--sp-7)' }}>
        <table>
          <thead>
            <tr><th>Subject</th><th>CA (/40)</th><th>Exam (/60)</th><th>Total (/100)</th><th>Grade</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.subject}>
                <td className="td-name">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                    <Icon name={r.icon} className="" />{r.subject}
                  </span>
                </td>
                <td>
                  <div className="mark-bar">
                    <div className="mark-bar__track"><div className="mark-bar__fill" style={{ width: `${(r.ca / r.caMax) * 100}%` }} /></div>
                    <span className="mark-num">{r.ca}/{r.caMax}</span>
                  </div>
                </td>
                <td className="mark-num">{r.exam}/{r.examMax}</td>
                <td className="mark-num">{r.total}/100</td>
                <td><Badge color={r.grade[1]}>{r.grade[0]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="s-heading"><h2>Past Performance</h2></div>
      <div className="chart-card">
        <div className="chart-card__title">Overall average by term</div>
        {terms.map((t) => (
          <div key={t.term} className="bar-row">
            <div className="bar-row__label" style={{ width: 110 }}>{t.term}</div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(t.avg / termMax) * 100}%`, background: t.current ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{t.avg}%</div>
            </div>
          </div>
        ))}
      </div>
    </LearnerLayout>
  )
}
