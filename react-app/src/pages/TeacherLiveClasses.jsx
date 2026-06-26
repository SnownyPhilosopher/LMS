import { useState } from 'react'
import Icon from '../components/Icon'
import TeacherLayout from '../components/TeacherLayout'
import { Modal } from '../components/common'
import { useStore } from '../store/store'

const emptyClass = { title: '', course: '', date: '2026-06-19', time: '10:00', duration: '1 hour' }

export default function TeacherLiveClasses() {
  const { state, actions, toast } = useStore()
  const [modal, setModal] = useState(false)
  const [klass, setKlass] = useState({ ...emptyClass, course: state.courses[0]?.name || '' })

  const live = state.classes.filter((c) => c.live)
  const scheduled = state.classes.filter((c) => !c.live)

  const submit = () => {
    if (!klass.title.trim()) return toast('Session title is required', 'warning')
    actions.addClass(klass)
    setKlass({ ...emptyClass, course: state.courses[0]?.name || '' }); setModal(false)
  }

  return (
    <TeacherLayout active="classes">
      <div className="page-head">
        <div>
          <div className="page-head__eyebrow">{state.meta.teacher.sub} · {state.meta.institution}</div>
          <div className="page-head__title">Live Classes</div>
          <div className="page-head__sub">{state.classes.length} sessions · {live.length} live now</div>
        </div>
        <div className="page-head__actions">
          <button className="btn btn-primary" onClick={() => setModal(true)}><Icon name="plus" /> Schedule Class</button>
        </div>
      </div>

      {live.map((c) => (
        <div key={c.id} className="live-banner" style={{ marginBottom: 'var(--sp-4)' }}>
          <span className="live-banner__dot" />
          <div className="live-banner__info">
            <div className="live-banner__title">{c.name}</div>
            <div className="live-banner__meta">{c.course} · {c.meta.join(' · ')}</div>
          </div>
          <button className="btn btn-secondary" onClick={() => toast('Rejoining class (demo)')}><Icon name="video" /> Rejoin</button>
        </div>
      ))}

      <div className="s-heading" style={{ marginTop: 'var(--sp-6)' }}><h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Scheduled</h2></div>
      <div className="syl-list">
        {scheduled.map((c) => (
          <div key={c.id} className="class-item">
            <div className="class-item__top">
              <div className="class-time-badge">
                <div className="class-time-badge__time">{c.time}</div>
                <div className="class-time-badge__date">{c.date}</div>
              </div>
              <div className="class-info">
                <div className="class-info__name">{c.name}</div>
                <div className="class-info__course">{c.course}</div>
              </div>
            </div>
            <div className="class-item__meta">
              <span className="class-meta-chip"><Icon name="users" /> {c.meta[0]}</span>
              <span className="class-meta-chip"><Icon name="clock" /> {c.meta[1]}</span>
            </div>
            <div className="class-item__actions">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => toast(`${c.name} details (demo)`, 'info')}>View Details</button>
              <button className="btn btn-secondary btn-sm" onClick={() => toast(`Editing ${c.name} (demo)`, 'info')}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <Modal title="Schedule Live Class" open={modal} onClose={() => setModal(false)}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Schedule Class</button>
        </>}>
        <div className="form-group"><label className="form-label">Session Title <span>*</span></label><input type="text" className="form-control" placeholder="e.g. Chapter 4 Lecture" value={klass.title} onChange={(e) => setKlass({ ...klass, title: e.target.value })} /></div>
        <div className="form-group">
          <label className="form-label">Course <span>*</span></label>
          <select className="form-control" value={klass.course} onChange={(e) => setKlass({ ...klass, course: e.target.value })}>
            {state.courses.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="form-group"><label className="form-label">Date <span>*</span></label><input type="date" className="form-control" value={klass.date} onChange={(e) => setKlass({ ...klass, date: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Time <span>*</span></label><input type="time" className="form-control" value={klass.time} onChange={(e) => setKlass({ ...klass, time: e.target.value })} /></div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Duration</label>
          <select className="form-control" value={klass.duration} onChange={(e) => setKlass({ ...klass, duration: e.target.value })}><option>30 minutes</option><option>1 hour</option><option>1.5 hours</option><option>2 hours</option></select>
        </div>
      </Modal>
    </TeacherLayout>
  )
}
