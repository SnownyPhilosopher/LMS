// Seed data for the Soteria Learning prototype.
// Three demo presets share the same UI; only the data differs.

export const AVATAR_COLORS = ['blue', 'green', 'purple', 'orange', 'red', 'teal']

export const PRESETS = [
  { id: 'university', label: 'University', sub: 'Higher education' },
  { id: 'highschool', label: 'High School', sub: 'Senior secondary' },
  { id: 'primary', label: 'Primary School', sub: 'Basic education' },
]

export const ROLE_DEFS = [
  { id: 'learner', label: 'Learner', route: '/learner' },
  { id: 'teacher', label: 'Teacher', route: '/teacher' },
  { id: 'admin', label: 'Admin', route: '/admin' },
  { id: 'superadmin', label: 'Super Admin', route: '/superadmin' },
]

const GRAD = {
  blue: 'linear-gradient(135deg,#3B82F6,#6366F1)',
  green: 'linear-gradient(135deg,#047857,#065F46)',
  navy: 'linear-gradient(135deg,#2563EB,#1E3A8A)',
  red: 'linear-gradient(135deg,#DC2626,#7F1D1D)',
  amber: 'linear-gradient(135deg,#F59E0B,#EF4444)',
}

// ── Generic course content reused by every course detail page ──
const COURSE_CONTENT = {
  chapters: [
    {
      id: 'ch1', title: 'Chapter 1 — Foundations',
      tasks: [
        { id: 'tk1', type: 'notes', title: 'Introduction & Key Concepts', meta: '8 min read', status: 'done' },
        { id: 'tk2', type: 'class', title: 'Lesson: Core Principles', meta: 'Recorded · 18 min', status: 'done' },
        { id: 'tk3', type: 'quiz', title: 'Chapter 1 Quiz', meta: '4 questions', status: 'current' },
      ],
    },
    {
      id: 'ch2', title: 'Chapter 2 — Applications',
      tasks: [
        { id: 'tk4', type: 'notes', title: 'Worked Examples & Practice', meta: '12 min read', status: 'todo' },
        { id: 'tk5', type: 'class', title: 'Live Lesson', meta: 'Live now', status: 'todo' },
        { id: 'tk6', type: 'exam', title: 'End of Topic Test', meta: '45 min · 20 questions', status: 'todo' },
      ],
    },
  ],
  notes: [
    {
      id: 'no1', title: 'Introduction & Key Concepts', chapter: 'Chapter 1 — Foundations', readTime: '8 min read', status: 'done',
      body: [
        'This chapter introduces the foundational ideas you will build on for the rest of the topic. Read each section carefully and make sure you understand the key terms before moving on to the quiz.',
        'A solid grasp of the basics makes the later material far easier to follow. Take notes as you go and flag anything that is unclear so you can ask in the live lesson.',
        'By the end of this reading you should be able to explain the core ideas in your own words and recognise where they apply.',
      ],
    },
    {
      id: 'no2', title: 'Worked Examples & Practice', chapter: 'Chapter 2 — Applications', readTime: '12 min read', status: 'todo',
      body: [
        'Here we apply the ideas from Chapter 1 to a series of worked examples, each broken down step by step.',
        'Try every example yourself first, then check the solution. Solving first and checking after helps you remember far more than just reading answers.',
      ],
    },
  ],
  quizzes: [
    {
      id: 'qz1', title: 'Chapter 1 Quiz', chapter: 'Chapter 1 — Foundations', status: 'current',
      questions: [
        { id: 'q1', q: 'What is the best first step when learning a new idea?', options: ['Memorise it word for word', 'Understand the main idea', 'Skip to the exercises', 'Only read the summary'], answer: 1 },
        { id: 'q2', q: 'Which is the most effective way to study?', options: ['Re-reading your notes', 'Testing yourself, then checking', 'Highlighting everything', 'Watching the lesson again'], answer: 1 },
        { id: 'q3', q: 'Why review the basics before harder work?', options: ['It is required for marks', 'It makes later work easier', 'It is faster', 'It is optional'], answer: 1 },
        { id: 'q4', q: 'What should you do with something unclear?', options: ['Ignore it', 'Ask in the live lesson', 'Restart the chapter', 'Skip the quiz'], answer: 1 },
      ],
    },
  ],
  exams: [
    { id: 'ex1', title: 'Mid-Term Test', chapter: 'Covers Chapters 1–2', date: '25 Jun 2026', duration: '45 min', questions: 20, status: ['yellow', 'Upcoming'] },
    { id: 'ex2', title: 'End of Term Exam', chapter: 'Covers all chapters', date: '10 Jul 2026', duration: '2 hours', questions: 50, status: ['gray', 'Locked'] },
  ],
  classes: [
    { id: 'oc1', live: true, time: 'LIVE', date: 'NOW', name: 'Live Lesson — Worked Examples', meta: ['Class attending', 'Started 14 min ago'] },
    { id: 'oc2', time: '10:00', date: 'FRI 19', name: 'Lesson — Applications in Practice', meta: ['Whole class', 'Tomorrow · 10:00am'] },
    { id: 'oc3', time: '14:00', date: 'MON 22', name: 'Revision & Q&A Session', meta: ['Whole class', 'Mon · 2:00pm'] },
  ],
}

const cover = (i) => ['blue', 'purple', 'green', 'teal', 'orange', 'rose'][i % 6]
const banners = ['linear-gradient(90deg,#2563EB,#3B82F6)', 'linear-gradient(90deg,#7C3AED,#8B5CF6)', 'linear-gradient(90deg,#0F766E,#14B8A6)']

// ════════════════════════════════════════════════════════════
//  UNIVERSITY (default)
// ════════════════════════════════════════════════════════════
function universitySeed() {
  return {
    meta: {
      institution: 'Nexcorp University', levelWord: 'Programme',
      learner: { name: 'Amara Asante', first: 'Amara', initials: 'AA', color: 'blue', grad: GRAD.blue, id: 'NXU/ACT/2023/041', program: 'BSc In Actuarial Science', sub: 'BSc Actuarial Science · Year 2', email: 'a.asante@nexcorp.edu' },
      teacher: { name: 'Dr. Kwame Asiedu', first: 'Dr. Asiedu', initials: 'KA', grad: GRAD.green, sub: 'Mathematical Sciences' },
      admin: { name: 'Rebecca Owusu', initials: 'RO', grad: GRAD.navy, sub: 'Institution Admin' },
      superadmin: { name: 'Platform Admin', initials: 'PA', grad: GRAD.red, sub: 'Super Administrator' },
    },
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
      { id: 'a2', dot: 'green', html: '<strong>Dr. Kwame Asiedu</strong> was assigned as teacher to Nexcorp University — Mathematical Sciences.', time: 'Today, 08:52 AM' },
      { id: 'a3', dot: 'purple', html: '<strong>BSc Cybersecurity</strong> program was created under Nexcorp University.', time: 'Yesterday, 4:30 PM' },
      { id: 'a4', dot: 'green', html: '<strong>143 new learners</strong> enrolled across all institutions this month.', time: 'Jun 17, 2026' },
      { id: 'a5', dot: 'yellow', html: '<strong>Sunridge Institute</strong> flagged for review — completion below 60%.', time: 'Jun 16, 2026' },
    ],
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
      { id: 'd1', icon: 'sigma', fg: 'var(--color-primary)', bg: 'var(--blue-50)', name: 'Mathematical Sciences', head: 'Dr. Kwame Asiedu', teachers: 4, stats: [['2', 'Programs'], ['422', 'Learners'], ['69%', 'Completion']], open: true,
        programs: [
          { id: 'p1', dot: 'blue', name: 'BSc Actuarial Science', type: 'Major · 6 courses', enrol: 288, pct: 68 },
          { id: 'p2', dot: 'teal', name: 'BSc Mathematics', type: 'Major · 5 courses', enrol: 134, pct: 71, variant: 'success' },
        ] },
      { id: 'd2', icon: 'code', fg: 'var(--color-success)', bg: '#F0FDF4', name: 'Computer Science', head: 'Prof. Linda Osei', teachers: 6, stats: [['3', 'Programs'], ['456', 'Learners'], ['75%', 'Completion']],
        programs: [
          { id: 'p3', dot: 'green', name: 'BSc Computer Science', type: 'Major · 8 courses', enrol: 212, pct: 75, variant: 'success' },
          { id: 'p4', dot: 'purple', name: 'BSc Information Systems', type: 'Major · 6 courses', enrol: 156, pct: 69 },
        ] },
      { id: 'd3', icon: 'trendingUp', fg: 'var(--color-warning)', bg: 'var(--color-warning-bg)', name: 'Economics & Finance', head: 'Mr. Kofi Mensah', teachers: 5, stats: [['2', 'Programs'], ['389', 'Learners'], ['67%', 'Completion']],
        programs: [
          { id: 'p6', dot: 'orange', name: 'BA Economics', type: 'Major · 6 courses', enrol: 247, pct: 74, variant: 'success' },
          { id: 'p7', dot: 'blue', name: 'BSc Financial Mathematics', type: 'Major · 5 courses', enrol: 142, pct: 61, variant: 'warning' },
        ] },
      { id: 'd4', icon: 'briefcase', fg: '#6D28D9', bg: '#F5F3FF', name: 'Business Studies', head: 'Ms. Fatima Diallo', teachers: 5, stats: [['3', 'Programs'], ['198', 'Learners'], ['79%', 'Completion']],
        programs: [{ id: 'p8', dot: 'purple', name: 'MBA Business Administration', type: 'Major · 7 courses', enrol: 87, pct: 88, variant: 'success' }] },
    ],
    courses: [
      { id: 'c1', banner: banners[0], name: 'Mathematical Methods I', code: 'MTH 201 · Semester 1', learners: 112, chapters: 8, avg: '68%', pct: 68 },
      { id: 'c2', banner: banners[1], name: 'Probability & Statistics', code: 'MTH 312 · Semester 2', learners: 88, chapters: 10, avg: '54%', pct: 54, variant: 'warning' },
      { id: 'c3', banner: banners[2], name: 'Calculus II', code: 'MTH 102 · Semester 1', learners: 48, chapters: 6, avg: '81%', pct: 81, variant: 'success' },
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
    ],
    myCourses: [
      { id: 'm1', icon: 'sigma', cover: cover(0), title: 'Mathematical Methods I', meta: '8 chapters · 42 tasks', pct: 68, status: ['blue', 'In Progress'] },
      { id: 'm2', icon: 'barChart', cover: cover(1), title: 'Probability & Statistics', meta: '6 chapters · 34 tasks', pct: 100, variant: 'success', status: ['green', 'Complete'] },
      { id: 'm3', icon: 'dollar', cover: cover(2), title: 'Financial Mathematics', meta: '7 chapters · 38 tasks', pct: 23, variant: 'warning', status: ['blue', 'In Progress'] },
      { id: 'm4', icon: 'trendingUp', cover: cover(3), title: 'Economics for Actuaries', meta: '5 chapters · 28 tasks', pct: 45, status: ['blue', 'In Progress'] },
      { id: 'm5', icon: 'calculator', cover: cover(4), title: 'Life Contingencies', meta: '9 chapters · 51 tasks', pct: 0, status: ['gray', 'Not Started'] },
      { id: 'm6', icon: 'hash', cover: cover(5), title: 'Stochastic Processes', meta: '7 chapters · 39 tasks', pct: 0, status: ['gray', 'Not Started'] },
    ],
    continueItems: [
      { id: 'ci1', bg: 'var(--blue-50)', fg: 'var(--color-primary)', icon: 'sigma', course: 'Mathematical Methods I', task: 'Introduction to Ordinary Differential Equations', chapter: 'Ch 3: Differential Equations', typeIcon: 'play', typeLabel: 'Video · 18 min', action: 'Continue', primary: true },
      { id: 'ci2', bg: '#F0FDF4', fg: 'var(--color-success)', icon: 'dollar', course: 'Financial Mathematics', task: 'Time Value of Money — Practice Problems', chapter: 'Ch 2: Interest Rate Theory', typeIcon: 'plusCircle', typeLabel: 'Exercise · 12 questions', action: 'Continue', primary: true },
      { id: 'ci3', bg: '#F0FDFA', fg: '#0F766E', icon: 'trendingUp', course: 'Economics for Actuaries', task: 'Macroeconomic Indicators & Insurance Markets', chapter: 'Ch 3: Market Structures', typeIcon: 'file', typeLabel: 'Notes · 8 min read', action: 'Review', primary: false },
    ],
    events: uniEvents(),
    notifications: uniNotifs(),
    courseContent: COURSE_CONTENT,
  }
}

function uniEvents() {
  return [
    { id: 'e1', day: '18', month: 'Jun', line: 'blue', title: 'Financial Mathematics Lecture', meta: '10:00 AM · Room 204, Block B', today: true },
    { id: 'e2', day: '19', month: 'Jun', line: 'green', title: 'Probability & Stats Tutorial', meta: '14:00 · Online (Zoom)' },
    { id: 'e3', day: '20', month: 'Jun', line: 'yellow', title: 'Mathematical Methods Assignment Due', meta: '11:59 PM · Online Submission' },
    { id: 'e4', day: '25', month: 'Jun', line: 'red', title: 'Mid-Semester Exam — Economics', meta: '09:00 AM · Exam Hall 1' },
    { id: 'e5', day: '30', month: 'Jun', line: 'yellow', title: 'Stochastic Processes — Quiz 1', meta: 'Online · 45 minutes' },
  ]
}
function uniNotifs() {
  return {
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
  }
}

// ════════════════════════════════════════════════════════════
//  HIGH SCHOOL
// ════════════════════════════════════════════════════════════
function highSchoolSeed() {
  return {
    meta: {
      institution: 'Greenfield Senior High', levelWord: 'Class',
      learner: { name: 'Kojo Mensah', first: 'Kojo', initials: 'KM', color: 'blue', grad: GRAD.blue, id: 'GSH/SCI/2024/112', program: 'SHS 2 — General Science', sub: 'SHS 2 · General Science', email: 'k.mensah@greenfield.edu' },
      teacher: { name: 'Mr. Daniel Boateng', first: 'Mr. Boateng', initials: 'DB', grad: GRAD.green, sub: 'Science Department' },
      admin: { name: 'Mrs. Grace Adjei', initials: 'GA', grad: GRAD.navy, sub: 'School Administrator' },
      superadmin: { name: 'District Admin', initials: 'DA', grad: GRAD.red, sub: 'Education District' },
    },
    institutions: [
      { id: 'greenfield', initials: 'GS', color: 'blue', name: 'Greenfield Senior High', type: 'Senior High School', depts: 6, programs: 5, learners: 1420, completion: 78, variant: 'success', status: ['green', 'Active'] },
      { id: 'stmary', initials: 'SM', color: 'green', name: "St. Mary's SHS", type: 'Senior High School', depts: 5, programs: 4, learners: 1180, completion: 82, variant: 'success', status: ['green', 'Active'] },
      { id: 'accra', initials: 'AA', color: 'purple', name: 'Accra Academy', type: 'Senior High School', depts: 6, programs: 5, learners: 1650, completion: 71, status: ['green', 'Active'] },
      { id: 'mfantsi', initials: 'MP', color: 'teal', name: 'Mfantsipim School', type: 'Senior High School', depts: 4, programs: 4, learners: 980, completion: 64, variant: 'warning', status: ['yellow', 'Review'] },
      { id: 'wesley', initials: 'WG', color: 'orange', name: 'Wesley Girls High', type: 'Senior High School', depts: 5, programs: 4, learners: 1120, completion: 85, variant: 'success', status: ['gray', 'Setup'] },
    ],
    roleCounts: { admins: 8, teachers: 142, learners: 6350, guardians: 4870 },
    activity: [
      { id: 'a1', dot: 'blue', html: '<strong>Wesley Girls High</strong> was added to the district by District Admin.', time: 'Today, 09:14 AM' },
      { id: 'a2', dot: 'green', html: '<strong>Mr. Daniel Boateng</strong> was assigned to Greenfield Senior High — Science Department.', time: 'Today, 08:52 AM' },
      { id: 'a3', dot: 'purple', html: '<strong>WASSCE Revision</strong> programme was created for all SHS 3 classes.', time: 'Yesterday, 4:30 PM' },
      { id: 'a4', dot: 'green', html: '<strong>320 new students</strong> enrolled for the new academic year.', time: 'Jun 17, 2026' },
      { id: 'a5', dot: 'yellow', html: '<strong>Mfantsipim School</strong> flagged for review — attendance below target.', time: 'Jun 16, 2026' },
    ],
    counts: { teachers: 38, learners: 1420 },
    teachers: [
      { id: 't1', initials: 'DB', color: 'teal', name: 'Mr. Daniel Boateng', email: 'd.boateng@greenfield.edu', dept: 'Science', courses: 3, learners: 168, joined: 'Sep 2019', status: ['green', 'Active'] },
      { id: 't2', initials: 'PA', color: 'purple', name: 'Mrs. Patience Asare', email: 'p.asare@greenfield.edu', dept: 'Mathematics', courses: 2, learners: 210, joined: 'Jan 2020', status: ['green', 'Active'] },
      { id: 't3', initials: 'SO', color: 'orange', name: 'Mr. Samuel Otoo', email: 's.otoo@greenfield.edu', dept: 'Languages', courses: 3, learners: 245, joined: 'Mar 2018', status: ['green', 'Active'] },
      { id: 't4', initials: 'CM', color: 'blue', name: 'Ms. Comfort Mensah', email: 'c.mensah@greenfield.edu', dept: 'Humanities', courses: 2, learners: 132, joined: 'Aug 2021', status: ['yellow', 'On Leave'] },
      { id: 't5', initials: 'JN', color: 'green', name: 'Mr. Joseph Nkrumah', email: 'j.nkrumah@greenfield.edu', dept: 'ICT', courses: 2, learners: 156, joined: 'Feb 2022', status: ['green', 'Active'] },
    ],
    learners: [
      { id: 'l1', initials: 'KM', color: 'blue', name: 'Kojo Mensah', sid: 'GSH/SCI/2024/112', program: 'SHS 2 — General Science', pct: 54, last: 'Today', status: ['green', 'Active'] },
      { id: 'l2', initials: 'AO', color: 'green', name: 'Adwoa Owusu', sid: 'GSH/BUS/2024/088', program: 'SHS 2 — Business', pct: 76, variant: 'success', last: 'Yesterday', status: ['green', 'Active'] },
      { id: 'l3', initials: 'YA', color: 'purple', name: 'Yaw Asante', sid: 'GSH/ART/2023/041', program: 'SHS 3 — General Arts', pct: 88, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l4', initials: 'AB', color: 'red', name: 'Akua Boateng', sid: 'GSH/SCI/2024/130', program: 'SHS 2 — General Science', pct: 28, variant: 'warning', last: '4 days ago', status: ['red', 'At Risk'] },
      { id: 'l5', initials: 'KA', color: 'teal', name: 'Kwabena Addo', sid: 'GSH/BUS/2024/099', program: 'SHS 2 — Business', pct: 0, last: '10 days ago', status: ['gray', 'Inactive'] },
    ],
    departments: [
      { id: 'd1', icon: 'activity', fg: 'var(--color-success)', bg: '#F0FDF4', name: 'Science', head: 'Mr. Daniel Boateng', teachers: 8, stats: [['1', 'Programs'], ['480', 'Students'], ['74%', 'Completion']], open: true,
        programs: [
          { id: 'p1', dot: 'green', name: 'SHS — General Science', type: '6 subjects · Core + Electives', enrol: 480, pct: 74, variant: 'success' },
          { id: 'p2', dot: 'blue', name: 'WASSCE Science Revision', type: 'Exam prep · 4 subjects', enrol: 162, pct: 66 },
        ] },
      { id: 'd2', icon: 'sigma', fg: 'var(--color-primary)', bg: 'var(--blue-50)', name: 'Mathematics', head: 'Mrs. Patience Asare', teachers: 6, stats: [['1', 'Programs'], ['1,420', 'Students'], ['71%', 'Completion']],
        programs: [{ id: 'p3', dot: 'blue', name: 'Core Mathematics (All)', type: 'Core subject · All streams', enrol: 1420, pct: 71 }] },
      { id: 'd3', icon: 'book', fg: '#6D28D9', bg: '#F5F3FF', name: 'Languages', head: 'Mr. Samuel Otoo', teachers: 7, stats: [['1', 'Programs'], ['1,420', 'Students'], ['80%', 'Completion']],
        programs: [{ id: 'p4', dot: 'purple', name: 'English Language (All)', type: 'Core subject · All streams', enrol: 1420, pct: 80, variant: 'success' }] },
      { id: 'd4', icon: 'globe', fg: 'var(--color-warning)', bg: 'var(--color-warning-bg)', name: 'Humanities', head: 'Ms. Comfort Mensah', teachers: 5, stats: [['2', 'Programs'], ['610', 'Students'], ['69%', 'Completion']],
        programs: [
          { id: 'p5', dot: 'orange', name: 'SHS — General Arts', type: '6 subjects', enrol: 420, pct: 72, variant: 'success' },
          { id: 'p6', dot: 'blue', name: 'SHS — Business', type: '6 subjects', enrol: 190, pct: 61, variant: 'warning' },
        ] },
    ],
    courses: [
      { id: 'c1', banner: banners[2], name: 'Integrated Science', code: 'SCI 2 · Form 2', learners: 168, chapters: 9, avg: '74%', pct: 74, variant: 'success' },
      { id: 'c2', banner: banners[0], name: 'Physics', code: 'PHY 2 · Elective', learners: 96, chapters: 8, avg: '58%', pct: 58, variant: 'warning' },
      { id: 'c3', banner: banners[1], name: 'Chemistry', code: 'CHM 2 · Elective', learners: 88, chapters: 7, avg: '63%', pct: 63 },
    ],
    classLearners: [
      { id: 'cl1', initials: 'KM', color: 'blue', name: 'Kojo Mensah', sid: 'GSH/SCI/2024/112', course: 'Integrated Science', pct: 54, last: 'Today', due: '1 overdue', risk: ['yellow', '⚠ At Risk'] },
      { id: 'cl2', initials: 'EA', color: 'green', name: 'Efua Annan', sid: 'GSH/SCI/2024/118', course: 'Integrated Science', pct: 90, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl3', initials: 'AB', color: 'red', name: 'Akua Boateng', sid: 'GSH/SCI/2024/130', course: 'Physics', pct: 28, variant: 'warning', last: '4 days ago', due: '4 overdue', dueDanger: true, risk: ['red', '✕ At Risk'] },
      { id: 'cl4', initials: 'KO', color: 'purple', name: 'Kwesi Owusu', sid: 'GSH/SCI/2023/077', course: 'Chemistry', pct: 81, variant: 'success', last: 'Yesterday', due: '1 due today', risk: ['green', '✓ On Track'] },
      { id: 'cl5', initials: 'NA', color: 'teal', name: 'Nana Ama', sid: 'GSH/SCI/2024/140', course: 'Physics', pct: 72, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
    ],
    classes: [
      { id: 'k0', live: true, time: 'LIVE', date: 'NOW', name: 'Practical — States of Matter', course: 'Integrated Science · SCI 2', meta: ['42 attending', 'Started 12 min ago'] },
      { id: 'k1', time: '10:00', date: 'FRI 19', name: 'Lesson — Newton’s Laws', course: 'Physics · PHY 2', meta: ['96 enrolled', 'Tomorrow · 10:00am'] },
      { id: 'k2', time: '11:30', date: 'MON 22', name: 'Lab — Acids & Bases', course: 'Chemistry · CHM 2', meta: ['88 enrolled', 'Mon · 11:30am'] },
      { id: 'k3', time: '08:00', date: 'TUE 23', name: 'WASSCE Revision Class', course: 'Integrated Science · SCI 2', meta: ['168 enrolled', 'Tue · 8:00am'] },
    ],
    grading: [
      { id: 'g1', tone: 'exam', icon: 'file', title: 'End of Term Exam — Science', meta: 'Integrated Science · Due: yesterday', count: '12 new' },
      { id: 'g2', tone: 'test', icon: 'checkSquare', title: 'Class Test — Motion & Forces', meta: 'Physics · Due: today', count: '5 new' },
      { id: 'g3', tone: 'exercise', icon: 'pencil', title: 'Homework 4 — Chemical Bonding', meta: 'Chemistry · Due: 2 days ago', count: '3 new', low: true },
      { id: 'g4', tone: 'test', icon: 'checkSquare', title: 'Quiz — The Cell', meta: 'Integrated Science · Due: today', count: '2 new', low: true },
    ],
    myCourses: [
      { id: 'm1', icon: 'sigma', cover: cover(0), title: 'Core Mathematics', meta: '9 topics · core subject', pct: 62, status: ['blue', 'In Progress'] },
      { id: 'm2', icon: 'book', cover: cover(1), title: 'English Language', meta: '8 topics · core subject', pct: 100, variant: 'success', status: ['green', 'Complete'] },
      { id: 'm3', icon: 'activity', cover: cover(2), title: 'Integrated Science', meta: '9 topics · core subject', pct: 54, status: ['blue', 'In Progress'] },
      { id: 'm4', icon: 'trendingUp', cover: cover(3), title: 'Physics', meta: '8 topics · elective', pct: 41, variant: 'warning', status: ['blue', 'In Progress'] },
      { id: 'm5', icon: 'calculator', cover: cover(4), title: 'Chemistry', meta: '7 topics · elective', pct: 0, status: ['gray', 'Not Started'] },
      { id: 'm6', icon: 'code', cover: cover(5), title: 'ICT', meta: '6 topics · elective', pct: 0, status: ['gray', 'Not Started'] },
    ],
    continueItems: [
      { id: 'ci1', bg: 'var(--blue-50)', fg: 'var(--color-primary)', icon: 'sigma', course: 'Core Mathematics', task: 'Quadratic Equations — Practice Set', chapter: 'Topic 3: Algebra', typeIcon: 'plusCircle', typeLabel: 'Exercise · 10 questions', action: 'Continue', primary: true },
      { id: 'ci2', bg: '#F0FDF4', fg: 'var(--color-success)', icon: 'activity', course: 'Integrated Science', task: 'The Human Digestive System', chapter: 'Topic 5: Living Things', typeIcon: 'play', typeLabel: 'Video · 14 min', action: 'Continue', primary: true },
      { id: 'ci3', bg: '#F0FDFA', fg: '#0F766E', icon: 'trendingUp', course: 'Physics', task: 'Speed, Velocity & Acceleration', chapter: 'Topic 2: Motion', typeIcon: 'file', typeLabel: 'Notes · 9 min read', action: 'Review', primary: false },
    ],
    events: [
      { id: 'e1', day: '18', month: 'Jun', line: 'blue', title: 'Integrated Science Practical', meta: '10:00 AM · Science Lab 1', today: true },
      { id: 'e2', day: '19', month: 'Jun', line: 'green', title: 'Mathematics Class Test', meta: '08:00 AM · Form 2 Block' },
      { id: 'e3', day: '20', month: 'Jun', line: 'yellow', title: 'English Composition Due', meta: '04:00 PM · Submit to teacher' },
      { id: 'e4', day: '25', month: 'Jun', line: 'red', title: 'End of Term Exams Begin', meta: '08:00 AM · Exam Hall' },
      { id: 'e5', day: '30', month: 'Jun', line: 'yellow', title: 'Physics Quiz', meta: 'Online · 30 minutes' },
    ],
    notifications: {
      learner: [
        { id: 'n1', dot: 'blue', text: 'Integrated Science practical starts at 10:00 AM in Lab 1.', time: '20 min ago', unread: true },
        { id: 'n2', dot: 'yellow', text: 'English composition is due today at 4:00 PM.', time: '1 hour ago', unread: true },
        { id: 'n3', dot: 'green', text: 'Your English Language results are now available.', time: 'Yesterday', unread: false },
      ],
      teacher: [
        { id: 'n1', dot: 'red', text: '12 end-of-term scripts are waiting to be marked.', time: '15 min ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Your Science practical is live now — 42 attending.', time: '12 min ago', unread: true },
        { id: 'n3', dot: 'yellow', text: 'Akua Boateng flagged as at-risk (4 overdue tasks).', time: '2 hours ago', unread: false },
      ],
      admin: [
        { id: 'n1', dot: 'yellow', text: '5 enrolment requests need your approval.', time: '30 min ago', unread: true },
        { id: 'n2', dot: 'green', text: '320 students enrolled for the new academic year.', time: 'Today', unread: true },
        { id: 'n3', dot: 'blue', text: 'Mr. Otoo updated the SHS 3 English syllabus.', time: 'Yesterday', unread: false },
      ],
      superadmin: [
        { id: 'n1', dot: 'yellow', text: 'Mfantsipim School flagged — attendance below target.', time: '1 hour ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Wesley Girls High was added to the district.', time: 'Today', unread: true },
        { id: 'n3', dot: 'green', text: '320 new students enrolled across the district.', time: 'Today', unread: false },
      ],
    },
    courseContent: COURSE_CONTENT,
  }
}

// ════════════════════════════════════════════════════════════
//  PRIMARY SCHOOL
// ════════════════════════════════════════════════════════════
function primarySeed() {
  return {
    meta: {
      institution: 'Sunny Brook Primary', levelWord: 'Class',
      learner: { name: 'Esi Bonsu', first: 'Esi', initials: 'EB', color: 'orange', grad: GRAD.amber, id: 'SBP/P5/2025/038', program: 'Primary 5 — Blue Class', sub: 'Primary 5 · Blue Class', email: 'guardian.bonsu@email.com' },
      teacher: { name: 'Madam Akosua Frimpong', first: 'Madam Akosua', initials: 'AF', grad: GRAD.green, sub: 'Primary 5 — Class Teacher' },
      admin: { name: 'Mr. Samuel Owusu', initials: 'SO', grad: GRAD.navy, sub: 'Head Teacher' },
      superadmin: { name: 'District Admin', initials: 'DA', grad: GRAD.red, sub: 'Education District' },
    },
    institutions: [
      { id: 'sunnybrook', initials: 'SB', color: 'orange', name: 'Sunny Brook Primary', type: 'Primary School', depts: 3, programs: 6, learners: 540, completion: 88, variant: 'success', status: ['green', 'Active'] },
      { id: 'littlestars', initials: 'LS', color: 'blue', name: 'Little Stars Academy', type: 'Primary School', depts: 3, programs: 6, learners: 420, completion: 84, variant: 'success', status: ['green', 'Active'] },
      { id: 'brightkids', initials: 'BK', color: 'green', name: 'Bright Kids School', type: 'Primary School', depts: 2, programs: 6, learners: 380, completion: 79, status: ['green', 'Active'] },
      { id: 'rainbow', initials: 'RP', color: 'purple', name: 'Rainbow Preparatory', type: 'Primary School', depts: 3, programs: 6, learners: 610, completion: 72, variant: 'warning', status: ['yellow', 'Review'] },
      { id: 'happyfeet', initials: 'HF', color: 'teal', name: 'Happy Feet Primary', type: 'Primary School', depts: 2, programs: 6, learners: 290, completion: 90, variant: 'success', status: ['gray', 'Setup'] },
    ],
    roleCounts: { admins: 6, teachers: 64, learners: 2240, guardians: 2180 },
    activity: [
      { id: 'a1', dot: 'blue', html: '<strong>Happy Feet Primary</strong> was added to the district.', time: 'Today, 09:14 AM' },
      { id: 'a2', dot: 'green', html: '<strong>Madam Akosua Frimpong</strong> was assigned as Primary 5 class teacher.', time: 'Today, 08:52 AM' },
      { id: 'a3', dot: 'purple', html: '<strong>Reading Club</strong> programme was created for Primary 4–6.', time: 'Yesterday, 4:30 PM' },
      { id: 'a4', dot: 'green', html: '<strong>85 new pupils</strong> enrolled for the new term.', time: 'Jun 17, 2026' },
      { id: 'a5', dot: 'yellow', html: '<strong>Rainbow Preparatory</strong> flagged for review — reading scores dipped.', time: 'Jun 16, 2026' },
    ],
    counts: { teachers: 18, learners: 540 },
    teachers: [
      { id: 't1', initials: 'AF', color: 'teal', name: 'Madam Akosua Frimpong', email: 'a.frimpong@sunnybrook.edu', dept: 'Primary 5', courses: 4, learners: 32, joined: 'Sep 2020', status: ['green', 'Active'] },
      { id: 't2', initials: 'GM', color: 'purple', name: 'Mr. George Mensah', email: 'g.mensah@sunnybrook.edu', dept: 'Primary 6', courses: 4, learners: 30, joined: 'Jan 2019', status: ['green', 'Active'] },
      { id: 't3', initials: 'BA', color: 'orange', name: 'Madam Beatrice Asante', email: 'b.asante@sunnybrook.edu', dept: 'Primary 4', courses: 4, learners: 34, joined: 'Mar 2021', status: ['green', 'Active'] },
      { id: 't4', initials: 'KO', color: 'blue', name: 'Mr. Kwame Ofori', email: 'k.ofori@sunnybrook.edu', dept: 'Primary 3', courses: 4, learners: 28, joined: 'Aug 2022', status: ['yellow', 'On Leave'] },
      { id: 't5', initials: 'PM', color: 'green', name: 'Madam Priscilla Mante', email: 'p.mante@sunnybrook.edu', dept: 'Primary 5', courses: 2, learners: 32, joined: 'Feb 2023', status: ['green', 'Active'] },
    ],
    learners: [
      { id: 'l1', initials: 'EB', color: 'orange', name: 'Esi Bonsu', sid: 'SBP/P5/2025/038', program: 'Primary 5 — Blue Class', pct: 70, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l2', initials: 'KA', color: 'green', name: 'Kofi Annan', sid: 'SBP/P5/2025/041', program: 'Primary 5 — Blue Class', pct: 85, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l3', initials: 'AM', color: 'purple', name: 'Ama Mensah', sid: 'SBP/P6/2024/012', program: 'Primary 6 — Green Class', pct: 92, variant: 'success', last: 'Yesterday', status: ['green', 'Active'] },
      { id: 'l4', initials: 'YB', color: 'red', name: 'Yaw Boateng', sid: 'SBP/P5/2025/050', program: 'Primary 5 — Blue Class', pct: 38, variant: 'warning', last: '3 days ago', status: ['red', 'Needs Help'] },
      { id: 'l5', initials: 'AD', color: 'teal', name: 'Adwoa Darko', sid: 'SBP/P4/2025/077', program: 'Primary 4 — Red Class', pct: 60, last: 'Today', status: ['green', 'Active'] },
    ],
    departments: [
      { id: 'd1', icon: 'book', fg: 'var(--color-primary)', bg: 'var(--blue-50)', name: 'Lower Primary (P1–P3)', head: 'Mr. Kwame Ofori', teachers: 6, stats: [['3', 'Classes'], ['180', 'Pupils'], ['86%', 'Completion']], open: true,
        programs: [
          { id: 'p1', dot: 'blue', name: 'Primary 1–3 Core', type: 'English · Maths · Science', enrol: 180, pct: 86, variant: 'success' },
          { id: 'p2', dot: 'green', name: 'Early Reading Club', type: 'Reading support', enrol: 64, pct: 90, variant: 'success' },
        ] },
      { id: 'd2', icon: 'activity', fg: 'var(--color-success)', bg: '#F0FDF4', name: 'Upper Primary (P4–P6)', head: 'Madam Akosua Frimpong', teachers: 8, stats: [['3', 'Classes'], ['210', 'Pupils'], ['83%', 'Completion']],
        programs: [
          { id: 'p3', dot: 'green', name: 'Primary 4–6 Core', type: 'English · Maths · Science · Social', enrol: 210, pct: 83, variant: 'success' },
          { id: 'p4', dot: 'orange', name: 'Maths Olympiad Club', type: 'Enrichment', enrol: 38, pct: 77 },
        ] },
      { id: 'd3', icon: 'pencil', fg: '#6D28D9', bg: '#F5F3FF', name: 'Creative & Co-curricular', head: 'Madam Priscilla Mante', teachers: 4, stats: [['2', 'Programs'], ['540', 'Pupils'], ['91%', 'Completion']],
        programs: [
          { id: 'p5', dot: 'purple', name: 'Creative Arts', type: 'All classes', enrol: 540, pct: 91, variant: 'success' },
          { id: 'p6', dot: 'blue', name: 'Computing Basics', type: 'P3–P6', enrol: 320, pct: 84, variant: 'success' },
        ] },
    ],
    courses: [
      { id: 'c1', banner: banners[0], name: 'Mathematics', code: 'Primary 5 · Blue Class', learners: 32, chapters: 8, avg: '82%', pct: 82, variant: 'success' },
      { id: 'c2', banner: banners[2], name: 'English Language', code: 'Primary 5 · Blue Class', learners: 32, chapters: 7, avg: '88%', pct: 88, variant: 'success' },
      { id: 'c3', banner: banners[1], name: 'Integrated Science', code: 'Primary 5 · Blue Class', learners: 32, chapters: 6, avg: '79%', pct: 79 },
    ],
    classLearners: [
      { id: 'cl1', initials: 'EB', color: 'orange', name: 'Esi Bonsu', sid: 'SBP/P5/2025/038', course: 'Mathematics', pct: 70, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl2', initials: 'KA', color: 'green', name: 'Kofi Annan', sid: 'SBP/P5/2025/041', course: 'Mathematics', pct: 85, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl3', initials: 'YB', color: 'red', name: 'Yaw Boateng', sid: 'SBP/P5/2025/050', course: 'English Language', pct: 38, variant: 'warning', last: '3 days ago', due: '2 to finish', dueDanger: true, risk: ['yellow', '⚠ Needs Help'] },
      { id: 'cl4', initials: 'AM', color: 'purple', name: 'Abena Mensah', sid: 'SBP/P5/2025/044', course: 'Integrated Science', pct: 76, variant: 'success', last: 'Yesterday', due: '1 due today', risk: ['green', '✓ On Track'] },
      { id: 'cl5', initials: 'KB', color: 'teal', name: 'Kojo Baah', sid: 'SBP/P5/2025/047', course: 'Mathematics', pct: 64, last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
    ],
    classes: [
      { id: 'k0', live: true, time: 'LIVE', date: 'NOW', name: 'Story Time — Reading Aloud', course: 'English Language · Primary 5', meta: ['30 attending', 'Started 8 min ago'] },
      { id: 'k1', time: '09:00', date: 'FRI 19', name: 'Counting & Place Value', course: 'Mathematics · Primary 5', meta: ['32 in class', 'Tomorrow · 9:00am'] },
      { id: 'k2', time: '11:00', date: 'MON 22', name: 'Plants Around Us', course: 'Integrated Science · Primary 5', meta: ['32 in class', 'Mon · 11:00am'] },
      { id: 'k3', time: '13:00', date: 'TUE 23', name: 'Drawing & Colouring', course: 'Creative Arts · Primary 5', meta: ['32 in class', 'Tue · 1:00pm'] },
    ],
    grading: [
      { id: 'g1', tone: 'exam', icon: 'file', title: 'End of Term Test — Maths', meta: 'Mathematics · Due: yesterday', count: '8 new' },
      { id: 'g2', tone: 'test', icon: 'checkSquare', title: 'Spelling Test', meta: 'English Language · Due: today', count: '6 new' },
      { id: 'g3', tone: 'exercise', icon: 'pencil', title: 'Homework — Plants & Animals', meta: 'Integrated Science · Due: 1 day ago', count: '4 new', low: true },
      { id: 'g4', tone: 'test', icon: 'checkSquare', title: 'Class Quiz — Number Bonds', meta: 'Mathematics · Due: today', count: '2 new', low: true },
    ],
    myCourses: [
      { id: 'm1', icon: 'sigma', cover: cover(0), title: 'Mathematics', meta: '8 topics · fun activities', pct: 70, status: ['blue', 'In Progress'] },
      { id: 'm2', icon: 'book', cover: cover(2), title: 'English Language', meta: '7 topics · reading & writing', pct: 100, variant: 'success', status: ['green', 'Complete'] },
      { id: 'm3', icon: 'activity', cover: cover(1), title: 'Integrated Science', meta: '6 topics · explore & discover', pct: 55, status: ['blue', 'In Progress'] },
      { id: 'm4', icon: 'globe', cover: cover(3), title: 'Social Studies', meta: '5 topics · our world', pct: 40, variant: 'warning', status: ['blue', 'In Progress'] },
      { id: 'm5', icon: 'pencil', cover: cover(4), title: 'Creative Arts', meta: '5 topics · draw & make', pct: 0, status: ['gray', 'Not Started'] },
      { id: 'm6', icon: 'code', cover: cover(5), title: 'Computing', meta: '4 topics · using a computer', pct: 0, status: ['gray', 'Not Started'] },
    ],
    continueItems: [
      { id: 'ci1', bg: 'var(--blue-50)', fg: 'var(--color-primary)', icon: 'sigma', course: 'Mathematics', task: 'Adding Two-Digit Numbers', chapter: 'Topic 3: Addition', typeIcon: 'plusCircle', typeLabel: 'Activity · 8 questions', action: 'Continue', primary: true },
      { id: 'ci2', bg: '#F0FDF4', fg: 'var(--color-success)', icon: 'activity', course: 'Integrated Science', task: 'Parts of a Plant', chapter: 'Topic 2: Living Things', typeIcon: 'play', typeLabel: 'Video · 6 min', action: 'Continue', primary: true },
      { id: 'ci3', bg: '#FFF7ED', fg: '#B45309', icon: 'globe', course: 'Social Studies', task: 'My Community Helpers', chapter: 'Topic 1: My Town', typeIcon: 'file', typeLabel: 'Story · 5 min read', action: 'Review', primary: false },
    ],
    events: [
      { id: 'e1', day: '18', month: 'Jun', line: 'blue', title: 'Story Time (Reading)', meta: '09:00 AM · Blue Classroom', today: true },
      { id: 'e2', day: '19', month: 'Jun', line: 'green', title: 'Maths Activity Sheet', meta: '10:00 AM · Bring pencil & ruler' },
      { id: 'e3', day: '20', month: 'Jun', line: 'yellow', title: 'Show & Tell', meta: '11:00 AM · Bring something special' },
      { id: 'e4', day: '25', month: 'Jun', line: 'red', title: 'End of Term Test', meta: '09:00 AM · Blue Classroom' },
      { id: 'e5', day: '30', month: 'Jun', line: 'yellow', title: 'Sports Day! 🎉', meta: 'All day · School field' },
    ],
    notifications: {
      learner: [
        { id: 'n1', dot: 'blue', text: 'Story Time starts at 9:00 AM in the Blue Classroom.', time: '15 min ago', unread: true },
        { id: 'n2', dot: 'yellow', text: 'Bring your pencil and ruler for the maths activity.', time: '1 hour ago', unread: true },
        { id: 'n3', dot: 'green', text: 'Well done! You finished English Language. ⭐', time: 'Yesterday', unread: false },
      ],
      teacher: [
        { id: 'n1', dot: 'red', text: '8 end-of-term tests are ready to mark.', time: '15 min ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Story Time is live now — 30 pupils joined.', time: '8 min ago', unread: true },
        { id: 'n3', dot: 'yellow', text: 'Yaw Boateng needs extra reading help.', time: '2 hours ago', unread: false },
      ],
      admin: [
        { id: 'n1', dot: 'yellow', text: '3 new pupil registrations need approval.', time: '30 min ago', unread: true },
        { id: 'n2', dot: 'green', text: '85 pupils enrolled for the new term.', time: 'Today', unread: true },
        { id: 'n3', dot: 'blue', text: 'Sports Day is scheduled for June 30.', time: 'Yesterday', unread: false },
      ],
      superadmin: [
        { id: 'n1', dot: 'yellow', text: 'Rainbow Preparatory flagged — reading scores dipped.', time: '1 hour ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Happy Feet Primary was added to the district.', time: 'Today', unread: true },
        { id: 'n3', dot: 'green', text: '85 new pupils enrolled across the district.', time: 'Today', unread: false },
      ],
    },
    courseContent: COURSE_CONTENT,
  }
}

export function makeSeed(preset = 'university') {
  if (preset === 'highschool') return highSchoolSeed()
  if (preset === 'primary') return primarySeed()
  return universitySeed()
}
