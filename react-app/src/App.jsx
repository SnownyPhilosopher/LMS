import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import LearnerHome from './pages/LearnerHome'
import LearnerCourses from './pages/LearnerCourses'
import LearnerCalendar from './pages/LearnerCalendar'
import LearnerLibrary from './pages/LearnerLibrary'
import LearnerProfile from './pages/LearnerProfile'
import TeacherCourses from './pages/TeacherCourses'
import TeacherAnalytics from './pages/TeacherAnalytics'
import TeacherLiveClasses from './pages/TeacherLiveClasses'
import TeacherMyLearners from './pages/TeacherMyLearners'
import CourseDetail from './pages/CourseDetail'
import SuperAdmin from './pages/SuperAdmin'
import AdminDashboard from './pages/AdminDashboard'
import AdminTeachers from './pages/AdminTeachers'
import AdminLearners from './pages/AdminLearners'
import AdminGuardians from './pages/AdminGuardians'
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
  [/^\/learner\/calendar/, 'Calendar'],
  [/^\/learner\/library/, 'Library'],
  [/^\/learner\/profile/, 'Profile'],
  [/^\/learner/, 'Learner Dashboard'],
  [/^\/teacher\/courses\/.+/, 'Course'],
  [/^\/teacher\/courses/, 'My Courses'],
  [/^\/teacher\/analytics/, 'Analytics'],
  [/^\/teacher\/classes/, 'Live Classes'],
  [/^\/teacher\/learners/, 'My Learners'],
  [/^\/teacher/, 'Teacher Dashboard'],
  [/^\/admin\/teachers/, 'Teachers'],
  [/^\/admin\/learners/, 'Learners'],
  [/^\/admin\/guardians/, 'Guardians'],
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
      <Route path="/learner/calendar" element={<RequireRole role="learner"><LearnerCalendar /></RequireRole>} />
      <Route path="/learner/library" element={<RequireRole role="learner"><LearnerLibrary /></RequireRole>} />
      <Route path="/learner/profile" element={<RequireRole role="learner"><LearnerProfile /></RequireRole>} />
      <Route path="/teacher" element={<RequireRole role="teacher"><TeacherDashboard /></RequireRole>} />
      <Route path="/teacher/courses" element={<RequireRole role="teacher"><TeacherCourses /></RequireRole>} />
      <Route path="/teacher/courses/:courseId" element={<RequireRole role="teacher"><CourseDetail /></RequireRole>} />
      <Route path="/teacher/analytics" element={<RequireRole role="teacher"><TeacherAnalytics /></RequireRole>} />
      <Route path="/teacher/classes" element={<RequireRole role="teacher"><TeacherLiveClasses /></RequireRole>} />
      <Route path="/teacher/learners" element={<RequireRole role="teacher"><TeacherMyLearners /></RequireRole>} />
      <Route path="/admin/teachers" element={<RequireRole role="admin"><AdminTeachers /></RequireRole>} />
      <Route path="/admin/learners" element={<RequireRole role="admin"><AdminLearners /></RequireRole>} />
      <Route path="/admin/guardians" element={<RequireRole role="admin"><AdminGuardians /></RequireRole>} />
      <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
      <Route path="/superadmin" element={<RequireRole role="superadmin"><SuperAdmin /></RequireRole>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
