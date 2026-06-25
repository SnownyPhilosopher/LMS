import Icon from '../components/Icon'
import LearnerLayout from '../components/LearnerLayout'
import { ProgressBar, Badge } from '../components/common'
import { useStore } from '../store/store'

const DETAILS = [
  ['Full name', 'Amara Asante'],
  ['Student ID', 'NXU/ACT/2023/041'],
  ['Email', 'a.asante@nexcorp.edu'],
  ['Phone', '+233 24 555 0142'],
  ['Programme', 'BSc Actuarial Science'],
  ['Department', 'Mathematical Sciences'],
  ['Year / Semester', 'Year 2 · Semester 1'],
  ['Enrolled', 'September 2023'],
]

export default function LearnerProfile() {
  const { state, toast } = useStore()
  const overall = state.myCourses.length
    ? Math.round(state.myCourses.reduce((a, c) => a + c.pct, 0) / state.myCourses.length) : 0
  const completed = state.myCourses.filter((c) => c.pct === 100).length

  return (
    <LearnerLayout active="profile">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">My Account</div>
          <div className="page-head__title">Profile</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-secondary" onClick={() => toast('Edit profile (demo)', 'info')}><Icon name="edit" /> Edit Profile</button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-avatar">AA</div>
          <div className="profile-name">Amara Asante</div>
          <div className="profile-role">BSc Actuarial Science · Year 2</div>
          <Badge color="green">Active</Badge>
          <div className="profile-stats">
            <div><div className="profile-stat__val">{overall}%</div><div className="profile-stat__lbl">Progress</div></div>
            <div><div className="profile-stat__val">{state.myCourses.length}</div><div className="profile-stat__lbl">Courses</div></div>
            <div><div className="profile-stat__val">{completed}</div><div className="profile-stat__lbl">Completed</div></div>
          </div>
        </div>

        <div>
          <div className="detail-card">
            <div className="detail-card__head">Personal Details</div>
            <div className="detail-rows">
              {DETAILS.map(([label, value]) => (
                <div key={label} className="detail-row">
                  <span className="detail-row__label">{label}</span>
                  <span className="detail-row__value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card__head">Enrolled Courses</div>
            <div className="detail-rows">
              {state.myCourses.map((c) => (
                <div key={c.id} className="detail-row" style={{ alignItems: 'center', gap: 'var(--sp-4)' }}>
                  <span className="detail-row__value" style={{ flex: 1 }}>{c.title}</span>
                  <span style={{ width: 140, display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                    <ProgressBar pct={c.pct} variant={c.variant} style={{ flex: 1 }} />
                    <span className="detail-row__label" style={{ width: 34, textAlign: 'right' }}>{c.pct}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LearnerLayout>
  )
}
