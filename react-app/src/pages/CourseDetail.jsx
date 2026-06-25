import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import LearnerLayout from '../components/LearnerLayout'
import TeacherLayout from '../components/TeacherLayout'
import { Badge, ProgressBar } from '../components/common'
import { useStore } from '../store/store'

const TYPE_ICON = { notes: 'file', class: 'video', quiz: 'checkSquare', exam: 'fileText' }
const TYPE_TAB = { notes: 'notes', class: 'classes', quiz: 'quizzes', exam: 'exams' }
const STATUS_LABEL = { done: 'Done', current: 'In Progress', todo: 'To do' }

export default function CourseDetail() {
  const { courseId } = useParams()
  const { session, state, toast } = useStore()
  const navigate = useNavigate()
  const isTeacher = session.role === 'teacher'
  const Layout = isTeacher ? TeacherLayout : LearnerLayout
  const course = (isTeacher ? state.courses : state.myCourses).find((c) => c.id === courseId)
  const content = state.courseContent
  const [tab, setTab] = useState('overview')

  const backTo = isTeacher ? '/teacher/courses' : '/learner/courses'

  if (!course) {
    return (
      <Layout active="courses">
        <button className="back-link" onClick={() => navigate(backTo)}><Icon name="chevronDown" /> Back to courses</button>
        <div className="cd-empty">
          <div className="cd-empty__icon"><Icon name="book" /></div>
          <div className="empty-state__title">Course not found</div>
          <p>This course may have been removed. Head back to your course list.</p>
        </div>
      </Layout>
    )
  }

  const title = course.title || course.name
  const metaLine = isTeacher ? `${course.chapters} chapters · ${course.learners} learners` : course.meta
  const heroClass = !isTeacher ? `course-card__cover--${course.cover}` : ''
  const heroStyle = isTeacher ? { background: course.banner } : undefined

  const TABS = [
    { key: 'overview', icon: 'grid', label: 'Overview' },
    { key: 'notes', icon: 'file', label: 'Notes', count: content.notes.length },
    { key: 'quizzes', icon: 'checkSquare', label: 'Quizzes', count: content.quizzes.length },
    { key: 'exams', icon: 'fileText', label: 'Exams', count: content.exams.length },
    { key: 'classes', icon: 'video', label: 'Online Classes', count: content.classes.length },
  ]

  return (
    <Layout active="courses">
      <button className="back-link" onClick={() => navigate(backTo)}><Icon name="chevronDown" /> Back to courses</button>

      <div className={`cd-hero ${heroClass}`} style={heroStyle}>
        <div className="cd-hero__inner">
          <div className="cd-hero__eyebrow">{isTeacher ? course.code : 'Core course'}</div>
          <div className="cd-hero__title">{title}</div>
          <div className="cd-hero__meta">
            <span><Icon name="book" /> {metaLine}</span>
            <span><Icon name="checkSquare" /> {content.quizzes.length} quizzes</span>
            <span><Icon name="video" /> {content.classes.length} live classes</span>
          </div>
          <div className="cd-hero__bar"><div className="cd-hero__fill" style={{ width: `${course.pct}%` }} /></div>
          <div className="cd-hero__pct">{course.pct}% {isTeacher ? 'class progress' : 'complete'}</div>
        </div>
      </div>

      <div className="cd-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`cd-tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
            <Icon name={t.icon} /> {t.label}
            {t.count != null && <span className="cd-tab__count">{t.count}</span>}
          </button>
        ))}
      </div>

      {tab === 'overview' && <Overview content={content} onOpen={(type) => setTab(TYPE_TAB[type])} />}
      {tab === 'notes' && <NotesPanel notes={content.notes} />}
      {tab === 'quizzes' && <QuizzesPanel quizzes={content.quizzes} isTeacher={isTeacher} toast={toast} />}
      {tab === 'exams' && <ExamsPanel exams={content.exams} isTeacher={isTeacher} toast={toast} />}
      {tab === 'classes' && <ClassesPanel classes={content.classes} isTeacher={isTeacher} toast={toast} />}
    </Layout>
  )
}

/* ── Overview / syllabus ──────────────────────────────── */
function Overview({ content, onOpen }) {
  return (
    <div className="syllabus">
      {content.chapters.map((ch) => (
        <div key={ch.id} className="syl-chapter">
          <div className="syl-chapter__title">{ch.title}</div>
          <div className="syl-list">
            {ch.tasks.map((tk) => (
              <button key={tk.id} className="syl-task" onClick={() => onOpen(tk.type)}>
                <div className={`syl-type-icon syl-type-icon--${tk.type}`}><Icon name={TYPE_ICON[tk.type]} /></div>
                <div className="syl-task__info">
                  <div className="syl-task__title">{tk.title}</div>
                  <div className="syl-task__meta">{tk.meta}</div>
                </div>
                <div className="syl-task__status">
                  <span className={`status-pill status-pill--${tk.status}`}>{STATUS_LABEL[tk.status]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Notes ────────────────────────────────────────────── */
function NotesPanel({ notes }) {
  const [open, setOpen] = useState(null)
  const note = notes.find((n) => n.id === open)

  if (note) {
    return (
      <>
        <button className="back-link" onClick={() => setOpen(null)}><Icon name="chevronDown" /> All notes</button>
        <div className="note-reader">
          <div className="note-reader__chapter">{note.chapter}</div>
          <div className="note-reader__title">{note.title}</div>
          <div className="note-reader__meta">{note.readTime}</div>
          {note.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </>
    )
  }

  return (
    <div className="content-list">
      {notes.map((n) => (
        <div key={n.id} className="content-card">
          <div className="content-card__head">
            <div className="content-card__icon syl-type-icon--notes"><Icon name="file" /></div>
            <div className="content-card__info">
              <div className="content-card__title">{n.title}</div>
              <div className="content-card__meta">{n.chapter} · {n.readTime}</div>
            </div>
            {n.status === 'done' && <span className="status-pill status-pill--done">Read</span>}
            <button className="btn btn-primary btn-sm" onClick={() => setOpen(n.id)}>Read</button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Quizzes ──────────────────────────────────────────── */
function QuizzesPanel({ quizzes, isTeacher, toast }) {
  const [open, setOpen] = useState(null)
  const quiz = quizzes.find((q) => q.id === open)
  if (quiz) return <QuizRunner quiz={quiz} onBack={() => setOpen(null)} isTeacher={isTeacher} toast={toast} />

  return (
    <div className="content-list">
      {quizzes.map((q) => (
        <div key={q.id} className="content-card">
          <div className="content-card__head">
            <div className="content-card__icon syl-type-icon--quiz"><Icon name="checkSquare" /></div>
            <div className="content-card__info">
              <div className="content-card__title">{q.title}</div>
              <div className="content-card__meta">{q.chapter} · {q.questions.length} questions</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setOpen(q.id)}>{isTeacher ? 'Preview' : 'Start Quiz'}</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function QuizRunner({ quiz, onBack, isTeacher, toast }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const score = quiz.questions.filter((q) => answers[q.id] === q.answer).length

  const submit = () => {
    if (Object.keys(answers).length < quiz.questions.length) return toast('Answer all questions first', 'warning')
    setSubmitted(true)
    toast(`You scored ${score} / ${quiz.questions.length}`, score === quiz.questions.length ? 'success' : 'info')
  }

  return (
    <>
      <button className="back-link" onClick={onBack}><Icon name="chevronDown" /> All quizzes</button>
      <div className="quiz">
        <div className="quiz__head">
          <div className="quiz__title">{quiz.title}</div>
          <div className="quiz__sub">{quiz.chapter} · {quiz.questions.length} questions{isTeacher ? ' · preview mode' : ''}</div>
        </div>

        {quiz.questions.map((q, qi) => (
          <div key={q.id} className="quiz-q">
            <div className="quiz-q__text"><span className="quiz-q__num">{qi + 1}.</span>{q.q}</div>
            <div className="quiz-opts">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi
                let cls = 'quiz-opt'
                if (submitted) {
                  if (oi === q.answer) cls += ' quiz-opt--correct'
                  else if (selected) cls += ' quiz-opt--wrong'
                } else if (selected) cls += ' quiz-opt--selected'
                return (
                  <button key={oi} className={cls} disabled={submitted}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}>
                    <span className="quiz-opt__marker" />
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <div className="quiz__footer">
          <div className="quiz__score">
            {submitted ? <>Result: <strong>{score} / {quiz.questions.length}</strong></> : `${Object.keys(answers).length} of ${quiz.questions.length} answered`}
          </div>
          {submitted
            ? <button className="btn btn-secondary" onClick={() => { setAnswers({}); setSubmitted(false) }}>Retry</button>
            : <button className="btn btn-primary" onClick={submit}>Submit Quiz</button>}
        </div>
      </div>
    </>
  )
}

/* ── Exams ────────────────────────────────────────────── */
function ExamsPanel({ exams, isTeacher, toast }) {
  return (
    <div className="content-list">
      {exams.map((e) => (
        <div key={e.id} className="content-card">
          <div className="content-card__head exam-card">
            <div className="content-card__icon syl-type-icon--exam"><Icon name="fileText" /></div>
            <div className="content-card__info">
              <div className="content-card__title">{e.title}</div>
              <div className="content-card__meta">{e.chapter} · {e.date}</div>
            </div>
            <div className="exam-stats">
              <div className="exam-stat"><div className="exam-stat__val">{e.duration}</div><div className="exam-stat__lbl">Duration</div></div>
              <div className="exam-stat"><div className="exam-stat__val">{e.questions}</div><div className="exam-stat__lbl">Questions</div></div>
            </div>
            <Badge color={e.status[0]}>{e.status[1]}</Badge>
            <button className="btn btn-primary btn-sm" disabled={e.status[1] === 'Locked'}
              onClick={() => toast(isTeacher ? `Editing ${e.title} (demo)` : `Starting ${e.title} (demo)`, 'info')}>
              {isTeacher ? 'Edit' : 'Start Exam'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Online classes ───────────────────────────────────── */
function ClassesPanel({ classes, isTeacher, toast }) {
  const live = classes.find((c) => c.live)
  const rest = classes.filter((c) => !c.live)

  return (
    <>
      {live && (
        <div className="live-banner">
          <span className="live-banner__dot" />
          <div className="live-banner__info">
            <div className="live-banner__title">{live.name}</div>
            <div className="live-banner__meta">{live.meta.join(' · ')}</div>
          </div>
          <button className="btn btn-secondary" onClick={() => toast(isTeacher ? 'Rejoining class (demo)' : 'Joining live class (demo)')}>
            <Icon name="video" /> {isTeacher ? 'Rejoin' : 'Join now'}
          </button>
        </div>
      )}

      <div className="syl-list">
        {rest.map((c) => (
          <div key={c.id} className="class-item">
            <div className="class-item__top">
              <div className="class-time-badge">
                <div className="class-time-badge__time">{c.time}</div>
                <div className="class-time-badge__date">{c.date}</div>
              </div>
              <div className="class-info">
                <div className="class-info__name">{c.name}</div>
                <div className="class-info__course">{c.meta[0]}</div>
              </div>
            </div>
            <div className="class-item__meta">
              <span className="class-meta-chip"><Icon name="users" /> {c.meta[0]}</span>
              <span className="class-meta-chip"><Icon name="clock" /> {c.meta[1]}</span>
            </div>
            <div className="class-item__actions">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => toast(`${c.name} details (demo)`, 'info')}>View Details</button>
              <button className="btn btn-primary btn-sm" onClick={() => toast(isTeacher ? `Start ${c.name} (demo)` : `Reminder set for ${c.name}`, 'info')}>{isTeacher ? 'Start' : 'Remind me'}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
