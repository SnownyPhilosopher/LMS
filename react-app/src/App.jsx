import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import LearnerHome from './pages/LearnerHome'
import LearnerCourses from './pages/LearnerCourses'
import TeacherCourses from './pages/TeacherCourses'
import CourseDetail from './pages/CourseDetail'
import SuperAdmin from './pages/SuperAdmin'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import { useStore } from './store/store'

function RequireRole({ role, children }) {
  const { session } = useStore()
  if (!session.role) return <Navigate to="/login" replace />
  if (role && session.role !== role) return <Navigate to={`/${session.role}`} replace />
  return children
}

const TITLES = [
  [/^\/login/, 'Sign in'],
  [/^\/learner\/courses\/.+/, 'Course'],
  [/^\/learner\/courses/, 'My Courses'],
  [/^\/learner/, 'Learner Dashboard'],
  [/^\/teacher\/courses\/.+/, 'Course'],
  [/^\/teacher\/courses/, 'My Courses'],
  [/^\/teacher/, 'Teacher Dashboard'],
  [/^\/admin/, 'Admin Dashboard'],
  [/^\/superadmin/, 'Super Admin'],
]

function useDocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const match = TITLES.find(([re]) => re.test(pathname))
    document.title = match ? `${match[1]} · Soteria Learning` : 'Soteria Learning'
  }, [pathname])
}

export default function App() {
  useDocumentTitle()
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/learner" element={<RequireRole role="learner"><LearnerHome /></RequireRole>} />
      <Route path="/learner/courses" element={<RequireRole role="learner"><LearnerCourses /></RequireRole>} />
      <Route path="/learner/courses/:courseId" element={<RequireRole role="learner"><CourseDetail /></RequireRole>} />
      <Route path="/teacher" element={<RequireRole role="teacher"><TeacherDashboard /></RequireRole>} />
      <Route path="/teacher/courses" element={<RequireRole role="teacher"><TeacherCourses /></RequireRole>} />
      <Route path="/teacher/courses/:courseId" element={<RequireRole role="teacher"><CourseDetail /></RequireRole>} />
      <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
      <Route path="/superadmin" element={<RequireRole role="superadmin"><SuperAdmin /></RequireRole>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
