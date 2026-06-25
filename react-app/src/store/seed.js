// Initial seed data for the Soteria Learning prototype.
// The store is seeded from this on first load (or after a reset).

export const AVATAR_COLORS = ['blue', 'green', 'purple', 'orange', 'red', 'teal']

export const ROLES = [
  { id: 'learner', label: 'Learner', route: '/learner', name: 'Amara Asante', sub: 'BSc Actuarial Science', initials: 'AA', grad: 'linear-gradient(135deg,#3B82F6,#6366F1)' },
  { id: 'teacher', label: 'Teacher', route: '/teacher', name: 'Dr. Kwame Asiedu', sub: 'Mathematical Sciences', initials: 'KA', grad: 'linear-gradient(135deg,#047857,#065F46)' },
  { id: 'admin', label: 'Admin', route: '/admin', name: 'Rebecca Owusu', sub: 'Institution Admin', initials: 'RO', grad: 'linear-gradient(135deg,#2563EB,#1E3A8A)' },
  { id: 'superadmin', label: 'Super Admin', route: '/superadmin', name: 'Platform Admin', sub: 'Super Administrator', initials: 'PA', grad: 'linear-gradient(135deg,#DC2626,#7F1D1D)' },
]

export function makeSeed() {
  return {
    // ── Super Admin ────────────────────────────────
    institutions: [
      { id: 'nexcorp', initials: 'NU', color: 'blue', name: 'Nexcorp University', type: 'University', depts: 6, programs: 14, learners: 1248, completion: 72, status: ['green', 'Active'] },
      { id: 'greenfield', initials: 'GA', color: 'green', name: 'Greenfield Academy', type: 'Secondary School', depts: 4, programs: 8, learners: 892, completion: 81, variant: 'success', status: ['green', 'Active'] },
      { id: 'merida', initials: 'MC', color: 'purple', name: 'Merida Corporate', type: 'Corporate Training', depts: 5, programs: 9, learners: 1104, completion: 68, status: ['green', 'Active'] },
      { id: 'sunridge', initials: 'SI', color: 'teal', name: 'Sunridge Institute', type: 'Technical College', depts: 3, programs: 5, learners: 673, completion: 59, variant: 'warning', status: ['yellow', 'Review'] },
      { id: 'vantage', initials: 'VP', color: 'orange', name: 'Vantage Prep', type: 'Test Prep Centre', depts: 2, programs: 2, learners: 930, completion: 74, status: ['gray', 'Setup'] },
    ],
    roleCounts: { admins: 12, teachers: 89, learners: 3928, guardians: 818 },
    activity: [
      { id: 'a1', dot: 'blue', html: '<strong>Vantage Prep</strong> was added as a new institution by Platform Admin.', time: 'Today, 09:14 AM' },
      { id: 'a2', dot: 'green', html: '<strong>Dr. Kwame Asiedu</strong> was assigned as teacher to Nexcorp University — Dept. of Mathematical Sciences.', time: 'Today, 08:52 AM' },
      { id: 'a3', dot: 'purple', html: '<strong>BSc Cybersecurity</strong> program was created under Nexcorp University — Computer Science Dept.', time: 'Yesterday, 4:30 PM' },
      { id: 'a4', dot: 'green', html: '<strong>143 new learners</strong> enrolled across all institutions this month.', time: 'Jun 17, 2026' },
      { id: 'a5', dot: 'yellow', html: '<strong>Sunridge Institute</strong> flagged for review — completion rate dropped below 60% threshold.', time: 'Jun 16, 2026' },
      { id: 'a6', dot: 'blue', html: '<strong>Merida Corporate</strong> — HR Leadership program was assigned to 3 new departments.', time: 'Jun 15, 2026' },
      { id: 'a7', dot: 'red', html: '<strong>Admin account</strong> for james.osei@greenfield.edu was deactivated by Platform Admin.', time: 'Jun 14, 2026' },
    ],

    // ── Admin (Nexcorp) people + counts ────────────
    counts: { teachers: 24, learners: 1248 },
    teachers: [
      { id: 't1', initials: 'KA', color: 'teal', name: 'Dr. Kwame Asiedu', email: 'k.asiedu@nexcorp.edu', dept: 'Mathematical Sciences', courses: 3, learners: 248, joined: 'Sep 2021', status: ['green', 'Active'] },
      { id: 't2', initials: 'LO', color: 'purple', name: 'Prof. Linda Osei', email: 'l.osei@nexcorp.edu', dept: 'Computer Science', courses: 2, learners: 183, joined: 'Jan 2022', status: ['green', 'Active'] },
      { id: 't3', initials: 'KM', color: 'orange', name: 'Mr. Kofi Mensah', email: 'k.mensah@nexcorp.edu', dept: 'Economics & Finance', courses: 4, learners: 312, joined: 'Mar 2020', status: ['green', 'Active'] },
      { id: 't4', initials: 'AD', color: 'blue', name: 'Dr. Ama Darkwa', email: 'a.darkwa@nexcorp.edu', dept: 'Physical Sciences', courses: 2, learners: 95, joined: 'Aug 2022', status: ['yellow', 'On Leave'] },
      { id: 't5', initials: 'FD', color: 'green', name: 'Ms. Fatima Diallo', email: 'f.diallo@nexcorp.edu', dept: 'Business Studies', courses: 3, learners: 187, joined: 'Feb 2023', status: ['green', 'Active'] },
    ],
    learners: [
      { id: 'l1', initials: 'AA', color: 'blue', name: 'Amara Asante', sid: 'NXU/ACT/2023/041', program: 'BSc Actuarial Science', pct: 46, last: 'Today', status: ['green', 'Active'] },
      { id: 'l2', initials: 'EO', color: 'green', name: 'Eric Owusu', sid: 'NXU/CSC/2022/017', program: 'BSc Computer Science', pct: 72, variant: 'success', last: 'Yesterday', status: ['green', 'Active'] },
      { id: 'l3', initials: 'AF', color: 'purple', name: 'Abena Frimpong', sid: 'NXU/ECO/2022/089', program: 'BA Economics', pct: 91, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l4', initials: 'DM', color: 'red', name: 'Daniel Mensah', sid: 'NXU/ACT/2023/058', program: 'BSc Actuarial Science', pct: 23, variant: 'warning', last: '5 days ago', status: ['red', 'At Risk'] },
      { id: 'l5', initials: 'GN', color: 'teal', name: 'Grace Nyarko', sid: 'NXU/CSC/2024/003', program: 'BSc Computer Science', pct: 0, last: '12 days ago', status: ['gray', 'Inactive'] },
    ],
    departments: [
      {
        id: 'd1', icon: 'sigma', fg: 'var(--color-primary)', bg: 'var(--blue-50)', name: 'Mathematical Sciences', head: 'Dr. Kwame Asiedu', teachers: 4,
        stats: [['2', 'Programs'], ['422', 'Learners'], ['69%', 'Completion']], open: true,
        programs: [
          { id: 'p1', dot: 'blue', name: 'BSc Actuarial Science', type: 'Major · 6 courses · 8 chapters avg', enrol: 288, pct: 68 },
          { id: 'p2', dot: 'teal', name: 'BSc Mathematics', type: 'Major · 5 courses · 7 chapters avg', enrol: 134, pct: 71, variant: 'success' },
        ],
      },
      {
        id: 'd2', icon: 'code', fg: 'var(--color-success)', bg: '#F0FDF4', name: 'Computer Science', head: 'Prof. Linda Osei', teachers: 6,
        stats: [['3', 'Programs'], ['456', 'Learners'], ['75%', 'Completion']],
        programs: [
          { id: 'p3', dot: 'green', name: 'BSc Computer Science', type: 'Major · 8 courses', enrol: 212, pct: 75, variant: 'success' },
          { id: 'p4', dot: 'purple', name: 'BSc Information Systems', type: 'Major · 6 courses', enrol: 156, pct: 69 },
          { id: 'p5', dot: 'blue', name: 'BSc Cybersecurity', type: 'Major · 7 courses', enrol: 88, pct: 82, variant: 'success' },
        ],
      },
      {
        id: 'd3', icon: 'trendingUp', fg: 'var(--color-warning)', bg: 'var(--color-warning-bg)', name: 'Economics & Finance', head: 'Mr. Kofi Mensah', teachers: 5,
        stats: [['2', 'Programs'], ['389', 'Learners'], ['67%', 'Completion']],
        programs: [
          { id: 'p6', dot: 'orange', name: 'BA Economics', type: 'Major · 6 courses', enrol: 247, pct: 74, variant: 'success' },
          { id: 'p7', dot: 'blue', name: 'BSc Financial Mathematics', type: 'Major · 5 courses', enrol: 142, pct: 61, variant: 'warning' },
        ],
      },
      {
        id: 'd4', icon: 'briefcase', fg: '#6D28D9', bg: '#F5F3FF', name: 'Business Studies', head: 'Ms. Fatima Diallo', teachers: 5,
        stats: [['3', 'Programs'], ['198', 'Learners'], ['79%', 'Completion']],
        programs: [
          { id: 'p8', dot: 'purple', name: 'MBA Business Administration', type: 'Major · 7 courses', enrol: 87, pct: 88, variant: 'success' },
        ],
      },
    ],

    // ── Teacher ────────────────────────────────────
    courses: [
      { id: 'c1', banner: 'linear-gradient(90deg,#2563EB,#3B82F6)', name: 'Mathematical Methods I', code: 'MTH 201 · Semester 1', learners: 112, chapters: 8, avg: '68%', pct: 68 },
      { id: 'c2', banner: 'linear-gradient(90deg,#7C3AED,#8B5CF6)', name: 'Probability & Statistics', code: 'MTH 312 · Semester 2', learners: 88, chapters: 10, avg: '54%', pct: 54, variant: 'warning' },
      { id: 'c3', banner: 'linear-gradient(90deg,#0F766E,#14B8A6)', name: 'Calculus II', code: 'MTH 102 · Semester 1', learners: 48, chapters: 6, avg: '81%', pct: 81, variant: 'success' },
    ],
    classLearners: [
      { id: 'cl1', initials: 'AA', color: 'blue', name: 'Amara Asante', sid: 'NXU/ACT/2023/041', course: 'Mathematical Methods I', pct: 68, last: 'Today', due: '2 overdue', risk: ['yellow', '⚠ At Risk'] },
      { id: 'cl2', initials: 'KO', color: 'green', name: 'Kofi Ofori', sid: 'NXU/ACT/2022/019', course: 'Mathematical Methods I', pct: 92, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl3', initials: 'DM', color: 'red', name: 'Daniel Mensah', sid: 'NXU/ACT/2023/058', course: 'Mathematical Methods I', pct: 23, variant: 'warning', last: '5 days ago', due: '5 overdue', dueDanger: true, risk: ['red', '✕ At Risk'] },
      { id: 'cl4', initials: 'SB', color: 'purple', name: 'Serwa Boateng', sid: 'NXU/MTH/2023/004', course: 'Probability & Statistics', pct: 78, variant: 'success', last: 'Yesterday', due: '1 due today', risk: ['green', '✓ On Track'] },
      { id: 'cl5', initials: 'EA', color: 'teal', name: 'Esi Acheampong', sid: 'NXU/MTH/2024/011', course: 'Calculus II', pct: 85, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
    ],
    classes: [
      { id: 'k0', live: true, time: 'LIVE', date: 'NOW', name: 'Ch.3 Tutorial — Eigenvalues & Eigenvectors', course: 'Mathematical Methods I · MTH 201', meta: ['78 attending', 'Started 14 min ago'] },
      { id: 'k1', time: '10:00', date: 'FRI 19', name: 'Ch.6 Lecture — Discrete Distributions', course: 'Probability & Statistics · MTH 312', meta: ['88 enrolled', 'Tomorrow · 10:00am'] },
      { id: 'k2', time: '14:00', date: 'MON 22', name: 'Ch.5 Review — Integration by Parts', course: 'Calculus II · MTH 102', meta: ['48 enrolled', 'Mon · 2:00pm'] },
      { id: 'k3', time: '09:00', date: 'TUE 23', name: 'Mid-term Revision Session', course: 'Mathematical Methods I · MTH 201', meta: ['112 enrolled', 'Tue · 9:00am'] },
    ],
    grading: [
      { id: 'g1', tone: 'exam', icon: 'file', title: 'Mid-Semester Exam — MTH 201', meta: 'Mathematical Methods I · Due: yesterday', count: '6 new' },
      { id: 'g2', tone: 'test', icon: 'checkSquare', title: 'Chapter 5 Test — Hypothesis Testing', meta: 'Probability & Statistics · Due: today', count: '4 new' },
      { id: 'g3', tone: 'exercise', icon: 'pencil', title: 'Exercise 3.4 — Matrix Decomposition', meta: 'Mathematical Methods I · Due: 2 days ago', count: '2 new', low: true },
      { id: 'g4', tone: 'test', icon: 'checkSquare', title: 'Chapter 4 Quiz — Limits & Continuity', meta: 'Calculus II · Due: today', count: '1 new', low: true },
      { id: 'g5', tone: 'exercise', icon: 'pencil', title: 'Exercise 6.2 — Probability Distributions', meta: 'Probability & Statistics · Due: 3 days ago', count: '1 new', low: true },
    ],

    // ── Learner ────────────────────────────────────
    myCourses: [
      { id: 'm1', icon: 'sigma', cover: 'blue', title: 'Mathematical Methods I', meta: '8 chapters · 42 tasks', pct: 68, status: ['blue', 'In Progress'] },
      { id: 'm2', icon: 'barChart', cover: 'purple', title: 'Probability & Statistics', meta: '6 chapters · 34 tasks', pct: 100, variant: 'success', status: ['green', 'Complete'] },
      { id: 'm3', icon: 'dollar', cover: 'green', title: 'Financial Mathematics', meta: '7 chapters · 38 tasks', pct: 23, variant: 'warning', status: ['blue', 'In Progress'] },
      { id: 'm4', icon: 'trendingUp', cover: 'teal', title: 'Economics for Actuaries', meta: '5 chapters · 28 tasks', pct: 45, status: ['blue', 'In Progress'] },
      { id: 'm5', icon: 'calculator', cover: 'orange', title: 'Life Contingencies', meta: '9 chapters · 51 tasks', pct: 0, status: ['gray', 'Not Started'] },
      { id: 'm6', icon: 'hash', cover: 'rose', title: 'Stochastic Processes', meta: '7 chapters · 39 tasks', pct: 0, status: ['gray', 'Not Started'] },
    ],
    continueItems: [
      { id: 'ci1', bg: 'var(--blue-50)', fg: 'var(--color-primary)', icon: 'sigma', course: 'Mathematical Methods I', task: 'Introduction to Ordinary Differential Equations', chapter: 'Ch 3: Differential Equations', typeIcon: 'play', typeLabel: 'Video · 18 min', action: 'Continue', primary: true },
      { id: 'ci2', bg: '#F0FDF4', fg: 'var(--color-success)', icon: 'dollar', course: 'Financial Mathematics', task: 'Time Value of Money — Practice Problems', chapter: 'Ch 2: Interest Rate Theory', typeIcon: 'plusCircle', typeLabel: 'Exercise · 12 questions', action: 'Continue', primary: true },
      { id: 'ci3', bg: '#F0FDFA', fg: '#0F766E', icon: 'trendingUp', course: 'Economics for Actuaries', task: 'Macroeconomic Indicators & Insurance Markets', chapter: 'Ch 3: Market Structures', typeIcon: 'file', typeLabel: 'Notes · 8 min read', action: 'Review', primary: false },
    ],
    events: [
      { id: 'e1', day: '18', month: 'Jun', line: 'blue', title: 'Financial Mathematics Lecture', meta: '10:00 AM · Room 204, Block B', today: true },
      { id: 'e2', day: '19', month: 'Jun', line: 'green', title: 'Probability & Stats Tutorial', meta: '14:00 · Online (Zoom)' },
      { id: 'e3', day: '20', month: 'Jun', line: 'yellow', title: 'Mathematical Methods Assignment Due', meta: '11:59 PM · Online Submission' },
      { id: 'e4', day: '25', month: 'Jun', line: 'red', title: 'Mid-Semester Exam — Economics', meta: '09:00 AM · Exam Hall 1' },
      { id: 'e5', day: '30', month: 'Jun', line: 'yellow', title: 'Stochastic Processes — Quiz 1', meta: 'Online · 45 minutes' },
    ],

    // ── Notifications (per-role) ───────────────────
    notifications: {
      learner: [
        { id: 'n1', dot: 'blue', text: 'Your Financial Mathematics lecture starts at 10:00 AM.', time: '20 min ago', unread: true },
        { id: 'n2', dot: 'yellow', text: 'Assignment “Differential Equations” is due in 2 days.', time: '1 hour ago', unread: true },
        { id: 'n3', dot: 'green', text: 'Your Probability & Statistics result is now available.', time: 'Yesterday', unread: false },
      ],
      teacher: [
        { id: 'n1', dot: 'red', text: '6 new submissions for Mid-Semester Exam need grading.', time: '15 min ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Your tutorial “Eigenvalues” is live now — 78 attending.', time: '14 min ago', unread: true },
        { id: 'n3', dot: 'yellow', text: 'Daniel Mensah flagged as at-risk (5 overdue tasks).', time: '2 hours ago', unread: false },
      ],
      admin: [
        { id: 'n1', dot: 'yellow', text: '7 pending approvals require your attention.', time: '30 min ago', unread: true },
        { id: 'n2', dot: 'green', text: '43 new learners enrolled this month.', time: 'Today', unread: true },
        { id: 'n3', dot: 'blue', text: 'Prof. Linda Osei updated the Computer Science curriculum.', time: 'Yesterday', unread: false },
      ],
      superadmin: [
        { id: 'n1', dot: 'yellow', text: 'Sunridge Institute flagged for review (completion < 60%).', time: '1 hour ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Vantage Prep was added as a new institution.', time: 'Today', unread: true },
        { id: 'n3', dot: 'green', text: '143 new learners enrolled across all institutions.', time: 'Today', unread: false },
      ],
    },

    // ── Course content (shared sample used by every course detail page) ──
    courseContent: {
      chapters: [
        {
          id: 'ch1', title: 'Chapter 1 — Foundations',
          tasks: [
            { id: 'tk1', type: 'notes', title: 'Introduction & Key Concepts', meta: '8 min read', status: 'done' },
            { id: 'tk2', type: 'class', title: 'Lecture: Core Principles', meta: 'Recorded · 18 min', status: 'done' },
            { id: 'tk3', type: 'quiz', title: 'Chapter 1 Quiz', meta: '4 questions', status: 'current' },
          ],
        },
        {
          id: 'ch2', title: 'Chapter 2 — Applications',
          tasks: [
            { id: 'tk4', type: 'notes', title: 'Worked Examples & Techniques', meta: '12 min read', status: 'todo' },
            { id: 'tk5', type: 'class', title: 'Live Tutorial Session', meta: 'Live now · 78 attending', status: 'todo' },
            { id: 'tk6', type: 'exam', title: 'Mid-Chapter Exam', meta: '45 min · 20 questions', status: 'todo' },
          ],
        },
      ],
      notes: [
        {
          id: 'no1', title: 'Introduction & Key Concepts', chapter: 'Chapter 1 — Foundations', readTime: '8 min read', status: 'done',
          body: [
            'This chapter introduces the foundational ideas you will build on for the rest of the course. Read through each section carefully and make sure you understand the key terms before moving on to the quiz.',
            'A solid grasp of the fundamentals makes the later, more applied material far easier to follow. Take notes as you go and flag anything that is unclear so you can raise it in the live tutorial.',
            'By the end of this reading you should be able to define the core concepts in your own words, recognise where they apply, and explain how they connect to one another.',
          ],
        },
        {
          id: 'no2', title: 'Worked Examples & Techniques', chapter: 'Chapter 2 — Applications', readTime: '12 min read', status: 'todo',
          body: [
            'Here we apply the concepts from Chapter 1 to a series of worked examples. Each example is broken down step by step so you can follow the reasoning rather than just the result.',
            'Try to attempt each problem yourself before reading the solution. Active recall — solving first, then checking — is far more effective than passively reading worked answers.',
          ],
        },
      ],
      quizzes: [
        {
          id: 'qz1', title: 'Chapter 1 Quiz', chapter: 'Chapter 1 — Foundations', status: 'current',
          questions: [
            { id: 'q1', q: 'What is the best first step when approaching a new concept?', options: ['Memorise the formula', 'Understand the underlying idea', 'Skip to the exercises', 'Read the summary only'], answer: 1 },
            { id: 'q2', q: 'Active recall means…', options: ['Re-reading your notes', 'Testing yourself before checking answers', 'Highlighting key terms', 'Watching the lecture again'], answer: 1 },
            { id: 'q3', q: 'Why review the fundamentals before applied material?', options: ['It is required for grading', 'It makes later material easier', 'It is faster', 'It is optional'], answer: 1 },
            { id: 'q4', q: 'How should you handle something unclear in the reading?', options: ['Ignore it', 'Flag it for the live tutorial', 'Restart the chapter', 'Skip the quiz'], answer: 1 },
          ],
        },
      ],
      exams: [
        { id: 'ex1', title: 'Mid-Semester Exam', chapter: 'Covers Chapters 1–2', date: '25 Jun 2026', duration: '45 min', questions: 20, status: ['yellow', 'Upcoming'] },
        { id: 'ex2', title: 'Final Exam', chapter: 'Covers all chapters', date: '10 Jul 2026', duration: '2 hours', questions: 50, status: ['gray', 'Locked'] },
      ],
      classes: [
        { id: 'oc1', live: true, time: 'LIVE', date: 'NOW', name: 'Live Tutorial — Worked Examples', meta: ['78 attending', 'Started 14 min ago'] },
        { id: 'oc2', time: '10:00', date: 'FRI 19', name: 'Lecture — Applications in Practice', meta: ['88 enrolled', 'Tomorrow · 10:00am'] },
        { id: 'oc3', time: '14:00', date: 'MON 22', name: 'Revision & Q&A Session', meta: ['64 enrolled', 'Mon · 2:00pm'] },
      ],
    },
  }
}
