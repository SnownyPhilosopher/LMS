import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import TeacherLayout from '../components/TeacherLayout'
import { ProgressBar, Modal } from '../components/common'
import { useStore } from '../store/store'

const emptyCourse = { name: '', code: '', semester: 'Semester 1', program: 'BSc Actuarial Science', description: '' }

export default function TeacherCourses() {
  const { state, actions, toast } = useStore()
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [course, setCourse] = useState(emptyCourse)

  const submit = () => {
    if (!course.name.trim() || !course.code.trim()) return toast('Course name and code are required', 'warning')
    actions.addCourse(course)
    setCourse(emptyCourse); setModal(false)
  }

  return (
    <TeacherLayout active="courses">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.teacher.sub} · {state.meta.institution}</div>
          <div className="page-head__title">My Courses</div>
          <div className="page-head__sub">{state.courses.length} courses · 248 learners</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-primary" onClick={() => setModal(true)}><Icon name="plus" /> New Course</button>
        </div>
      </div>

      <div className="tc-course-grid">
        {state.courses.map((c) => (
          <div key={c.id} className="tc-course-card">
            <div className="tc-course-card__banner" style={{ background: c.banner }} />
            <div className="tc-course-card__body">
              <div className="tc-course-card__dept">Mathematical Sciences</div>
              <div className="tc-course-card__name">{c.name}</div>
              <div className="tc-course-card__code">{c.code}</div>
              <div className="tc-course-stats">
                <div className="tc-course-stat"><div className="tc-course-stat__val">{c.learners}</div><div className="tc-course-stat__lbl">Learners</div></div>
                <div className="tc-course-stat"><div className="tc-course-stat__val">{c.chapters}</div><div className="tc-course-stat__lbl">Chapters</div></div>
                <div className="tc-course-stat"><div className="tc-course-stat__val">{c.avg}</div><div className="tc-course-stat__lbl">Avg Completion</div></div>
              </div>
              <div>
                <div className="tc-course-comp-row"><span>Class progress</span><strong>{c.pct}%</strong></div>
                <ProgressBar pct={c.pct} variant={c.variant} />
              </div>
            </div>
            <div className="tc-course-card__footer">
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => navigate(`/teacher/courses/${c.id}`)}>Manage Course</button>
              <button className="btn btn-secondary btn-sm" onClick={() => toast(`${c.name} analytics (demo)`, 'info')}><Icon name="barChart" /></button>
            </div>
          </div>
        ))}

        <div className="tc-course-card tc-course-card--new" onClick={() => setModal(true)}>
          <div className="new-card-icon"><Icon name="plus" /></div>
          <div className="new-card-label">Create New Course</div>
          <div className="new-card-sub">Add chapters, tasks, and assign learners</div>
        </div>
      </div>

      <Modal title="Create New Course" open={modal} onClose={() => setModal(false)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Create Course</button>
        </>}>
        <div className="form-group"><label className="form-label">Course Name <span>*</span></label><input type="text" className="form-control" placeholder="e.g. Linear Algebra" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="form-group"><label className="form-label">Course Code <span>*</span></label><input type="text" className="form-control" placeholder="e.g. MTH 401" value={course.code} onChange={(e) => setCourse({ ...course, code: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Semester</label><select className="form-control" value={course.semester} onChange={(e) => setCourse({ ...course, semester: e.target.value })}><option>Semester 1</option><option>Semester 2</option><option>Full Year</option></select></div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" placeholder="Brief course description…" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <div className="form-hint">You can add chapters and tasks after creating the course.</div>
        </div>
      </Modal>
    </TeacherLayout>
  )
}
