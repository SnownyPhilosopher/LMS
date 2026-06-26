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
//  UNIVERSITY (default) — Lusaka Premier University
// ════════════════════════════════════════════════════════════
function universitySeed() {
  return {
    meta: {
      institution: 'Lusaka Premier University', levelWord: 'Programme',
      learner: { name: 'Mwila Banda', first: 'Mwila', initials: 'MB', color: 'blue', grad: GRAD.blue, id: 'LPU/ACT/2023/041', program: 'BSc In Actuarial Science', sub: 'BSc Actuarial Science · Year 2', email: 'm.banda@lpu.edu.zm' },
      teacher: { name: 'Dr. Chanda Phiri', first: 'Dr. Phiri', initials: 'CP', grad: GRAD.green, sub: 'Mathematical Sciences' },
      admin: { name: 'Natasha Mulenga', initials: 'NM', grad: GRAD.navy, sub: 'Institution Admin' },
      superadmin: { name: 'Platform Admin', initials: 'PA', grad: GRAD.red, sub: 'Super Administrator' },
    },
    institutions: [
      { id: 'lpu', initials: 'LP', color: 'blue', name: 'Lusaka Premier University', type: 'University', depts: 6, programs: 14, learners: 1248, completion: 72, status: ['green', 'Active'] },
      { id: 'chilenje', initials: 'CA', color: 'green', name: 'Chilenje Academy', type: 'Secondary School', depts: 4, programs: 8, learners: 892, completion: 81, variant: 'success', status: ['green', 'Active'] },
      { id: 'copperbelt', initials: 'CC', color: 'purple', name: 'Copperbelt Corporate Training', type: 'Corporate Training', depts: 5, programs: 9, learners: 1104, completion: 68, status: ['green', 'Active'] },
      { id: 'ndola', initials: 'NT', color: 'teal', name: 'Ndola Technical Institute', type: 'Technical College', depts: 3, programs: 5, learners: 673, completion: 59, variant: 'warning', status: ['yellow', 'Review'] },
      { id: 'livingstone', initials: 'LP', color: 'orange', name: 'Livingstone Prep Centre', type: 'Test Prep Centre', depts: 2, programs: 2, learners: 930, completion: 74, status: ['gray', 'Setup'] },
    ],
    roleCounts: { admins: 12, teachers: 89, learners: 3928, guardians: 818 },
    activity: [
      { id: 'a1', dot: 'blue', html: '<strong>Livingstone Prep Centre</strong> was added as a new institution by Platform Admin.', time: 'Today, 09:14 AM' },
      { id: 'a2', dot: 'green', html: '<strong>Dr. Chanda Phiri</strong> was assigned as teacher to Lusaka Premier University — Mathematical Sciences.', time: 'Today, 08:52 AM' },
      { id: 'a3', dot: 'purple', html: '<strong>BSc Cybersecurity</strong> program was created under Lusaka Premier University.', time: 'Yesterday, 4:30 PM' },
      { id: 'a4', dot: 'green', html: '<strong>143 new learners</strong> enrolled across all institutions this month.', time: 'Jun 17, 2026' },
      { id: 'a5', dot: 'yellow', html: '<strong>Ndola Technical Institute</strong> flagged for review — completion below 60%.', time: 'Jun 16, 2026' },
    ],
    counts: { teachers: 24, learners: 1248 },
    teachers: [
      { id: 't1', initials: 'CP', color: 'teal', name: 'Dr. Chanda Phiri', email: 'c.phiri@lpu.edu.zm', dept: 'Mathematical Sciences', courses: 3, learners: 248, joined: 'Sep 2021', status: ['green', 'Active'] },
      { id: 't2', initials: 'LM', color: 'purple', name: 'Prof. Lombe Mwale', email: 'l.mwale@lpu.edu.zm', dept: 'Computer Science', courses: 2, learners: 183, joined: 'Jan 2022', status: ['green', 'Active'] },
      { id: 't3', initials: 'KT', color: 'orange', name: 'Mr. Kabwe Tembo', email: 'k.tembo@lpu.edu.zm', dept: 'Economics & Finance', courses: 4, learners: 312, joined: 'Mar 2020', status: ['green', 'Active'] },
      { id: 't4', initials: 'MZ', color: 'blue', name: 'Dr. Mutale Zulu', email: 'm.zulu@lpu.edu.zm', dept: 'Physical Sciences', courses: 2, learners: 95, joined: 'Aug 2022', status: ['yellow', 'On Leave'] },
      { id: 't5', initials: 'TS', color: 'green', name: 'Ms. Towela Sakala', email: 't.sakala@lpu.edu.zm', dept: 'Business Studies', courses: 3, learners: 187, joined: 'Feb 2023', status: ['green', 'Active'] },
    ],
    learners: [
      { id: 'l1', initials: 'MB', color: 'blue', name: 'Mwila Banda', sid: 'LPU/ACT/2023/041', program: 'BSc Actuarial Science', pct: 46, last: 'Today', status: ['green', 'Active'] },
      { id: 'l2', initials: 'MM', color: 'green', name: 'Mapalo Mumba', sid: 'LPU/CSC/2022/017', program: 'BSc Computer Science', pct: 72, variant: 'success', last: 'Yesterday', status: ['green', 'Active'] },
      { id: 'l3', initials: 'BC', color: 'purple', name: 'Bupe Chanda', sid: 'LPU/ECO/2022/089', program: 'BA Economics', pct: 91, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l4', initials: 'CD', color: 'red', name: 'Chibale Daka', sid: 'LPU/ACT/2023/058', program: 'BSc Actuarial Science', pct: 23, variant: 'warning', last: '5 days ago', status: ['red', 'At Risk'] },
      { id: 'l5', initials: 'LM', color: 'teal', name: 'Luyando Mwansa', sid: 'LPU/CSC/2024/003', program: 'BSc Computer Science', pct: 0, last: '12 days ago', status: ['gray', 'Inactive'] },
    ],
    guardians: [
      { id: 'gu1', initials: 'JB', color: 'blue', name: 'Mr. Joseph Banda', relation: 'Father', learner: 'Mwila Banda', email: 'j.banda@email.com', phone: '+260 97 555 0142', status: ['green', 'Active'] },
      { id: 'gu2', initials: 'GM', color: 'green', name: 'Mrs. Grace Mumba', relation: 'Mother', learner: 'Mapalo Mumba', email: 'g.mumba@email.com', phone: '+260 96 441 8820', status: ['green', 'Active'] },
      { id: 'gu3', initials: 'PC', color: 'purple', name: 'Mr. Patrick Chanda', relation: 'Father', learner: 'Bupe Chanda', email: 'p.chanda@email.com', phone: '+260 95 119 3345', status: ['green', 'Active'] },
      { id: 'gu4', initials: 'ED', color: 'orange', name: 'Mrs. Esther Daka', relation: 'Mother', learner: 'Chibale Daka', email: 'e.daka@email.com', phone: '+260 97 770 2218', status: ['yellow', 'Pending'] },
      { id: 'gu5', initials: 'AM', color: 'teal', name: 'Mr. Andrew Mwansa', relation: 'Guardian', learner: 'Luyando Mwansa', email: 'a.mwansa@email.com', phone: '+260 96 882 6610', status: ['gray', 'Inactive'] },
    ],
    departments: [
      { id: 'd1', icon: 'sigma', fg: 'var(--color-primary)', bg: 'var(--blue-50)', name: 'Mathematical Sciences', head: 'Dr. Chanda Phiri', teachers: 4, stats: [['2', 'Programs'], ['422', 'Learners'], ['69%', 'Completion']], open: true,
        programs: [
          { id: 'p1', dot: 'blue', name: 'BSc Actuarial Science', type: 'Major · 6 courses', enrol: 288, pct: 68 },
          { id: 'p2', dot: 'teal', name: 'BSc Mathematics', type: 'Major · 5 courses', enrol: 134, pct: 71, variant: 'success' },
        ] },
      { id: 'd2', icon: 'code', fg: 'var(--color-success)', bg: '#F0FDF4', name: 'Computer Science', head: 'Prof. Lombe Mwale', teachers: 6, stats: [['3', 'Programs'], ['456', 'Learners'], ['75%', 'Completion']],
        programs: [
          { id: 'p3', dot: 'green', name: 'BSc Computer Science', type: 'Major · 8 courses', enrol: 212, pct: 75, variant: 'success' },
          { id: 'p4', dot: 'purple', name: 'BSc Information Systems', type: 'Major · 6 courses', enrol: 156, pct: 69 },
        ] },
      { id: 'd3', icon: 'trendingUp', fg: 'var(--color-warning)', bg: 'var(--color-warning-bg)', name: 'Economics & Finance', head: 'Mr. Kabwe Tembo', teachers: 5, stats: [['2', 'Programs'], ['389', 'Learners'], ['67%', 'Completion']],
        programs: [
          { id: 'p6', dot: 'orange', name: 'BA Economics', type: 'Major · 6 courses', enrol: 247, pct: 74, variant: 'success' },
          { id: 'p7', dot: 'blue', name: 'BSc Financial Mathematics', type: 'Major · 5 courses', enrol: 142, pct: 61, variant: 'warning' },
        ] },
      { id: 'd4', icon: 'briefcase', fg: '#6D28D9', bg: '#F5F3FF', name: 'Business Studies', head: 'Ms. Towela Sakala', teachers: 5, stats: [['3', 'Programs'], ['198', 'Learners'], ['79%', 'Completion']],
        programs: [{ id: 'p8', dot: 'purple', name: 'MBA Business Administration', type: 'Major · 7 courses', enrol: 87, pct: 88, variant: 'success' }] },
    ],
    courses: [
      { id: 'c1', banner: banners[0], name: 'Mathematical Methods I', code: 'MTH 201 · Semester 1', learners: 112, chapters: 8, avg: '68%', pct: 68 },
      { id: 'c2', banner: banners[1], name: 'Probability & Statistics', code: 'MTH 312 · Semester 2', learners: 88, chapters: 10, avg: '54%', pct: 54, variant: 'warning' },
      { id: 'c3', banner: banners[2], name: 'Calculus II', code: 'MTH 102 · Semester 1', learners: 48, chapters: 6, avg: '81%', pct: 81, variant: 'success' },
    ],
    classLearners: [
      { id: 'cl1', initials: 'MB', color: 'blue', name: 'Mwila Banda', sid: 'LPU/ACT/2023/041', course: 'Mathematical Methods I', pct: 68, last: 'Today', due: '2 overdue', risk: ['yellow', '⚠ At Risk'] },
      { id: 'cl2', initials: 'KL', color: 'green', name: 'Kondwani Lungu', sid: 'LPU/ACT/2022/019', course: 'Mathematical Methods I', pct: 92, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl3', initials: 'CD', color: 'red', name: 'Chibale Daka', sid: 'LPU/ACT/2023/058', course: 'Mathematical Methods I', pct: 23, variant: 'warning', last: '5 days ago', due: '5 overdue', dueDanger: true, risk: ['red', '✕ At Risk'] },
      { id: 'cl4', initials: 'TP', color: 'purple', name: 'Thandiwe Phiri', sid: 'LPU/MTH/2023/004', course: 'Probability & Statistics', pct: 78, variant: 'success', last: 'Yesterday', due: '1 due today', risk: ['green', '✓ On Track'] },
      { id: 'cl5', initials: 'MS', color: 'teal', name: 'Misozi Sakala', sid: 'LPU/MTH/2024/011', course: 'Calculus II', pct: 85, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
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
    events: [
      { id: 'e1', day: '18', month: 'Jun', line: 'blue', title: 'Financial Mathematics Lecture', meta: '10:00 AM · Room 204, Block B', today: true },
      { id: 'e2', day: '19', month: 'Jun', line: 'green', title: 'Probability & Stats Tutorial', meta: '14:00 · Online (Zoom)' },
      { id: 'e3', day: '20', month: 'Jun', line: 'yellow', title: 'Mathematical Methods Assignment Due', meta: '11:59 PM · Online Submission' },
      { id: 'e4', day: '25', month: 'Jun', line: 'red', title: 'Mid-Semester Exam — Economics', meta: '09:00 AM · Exam Hall 1' },
      { id: 'e5', day: '30', month: 'Jun', line: 'yellow', title: 'Stochastic Processes — Quiz 1', meta: 'Online · 45 minutes' },
    ],
    notifications: {
      learner: [
        { id: 'n1', dot: 'blue', text: 'Your Financial Mathematics lecture starts at 10:00 AM.', time: '20 min ago', unread: true },
        { id: 'n2', dot: 'yellow', text: 'Assignment “Differential Equations” is due in 2 days.', time: '1 hour ago', unread: true },
        { id: 'n3', dot: 'green', text: 'Your Probability & Statistics result is now available.', time: 'Yesterday', unread: false },
      ],
      teacher: [
        { id: 'n1', dot: 'red', text: '6 new submissions for Mid-Semester Exam need grading.', time: '15 min ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Your tutorial “Eigenvalues” is live now — 78 attending.', time: '14 min ago', unread: true },
        { id: 'n3', dot: 'yellow', text: 'Chibale Daka flagged as at-risk (5 overdue tasks).', time: '2 hours ago', unread: false },
      ],
      admin: [
        { id: 'n1', dot: 'yellow', text: '7 pending approvals require your attention.', time: '30 min ago', unread: true },
        { id: 'n2', dot: 'green', text: '43 new learners enrolled this month.', time: 'Today', unread: true },
        { id: 'n3', dot: 'blue', text: 'Prof. Lombe Mwale updated the Computer Science curriculum.', time: 'Yesterday', unread: false },
      ],
      superadmin: [
        { id: 'n1', dot: 'yellow', text: 'Ndola Technical Institute flagged for review (completion < 60%).', time: '1 hour ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Livingstone Prep Centre was added as a new institution.', time: 'Today', unread: true },
        { id: 'n3', dot: 'green', text: '143 new learners enrolled across all institutions.', time: 'Today', unread: false },
      ],
    },
    courseContent: COURSE_CONTENT,
  }
}

// ════════════════════════════════════════════════════════════
//  HIGH SCHOOL — Chilenje Secondary School
// ════════════════════════════════════════════════════════════
function highSchoolSeed() {
  return {
    meta: {
      institution: 'Chilenje Secondary School', levelWord: 'Class',
      learner: { name: 'Mwape Tembo', first: 'Mwape', initials: 'MT', color: 'blue', grad: GRAD.blue, id: 'CSS/G11/2024/112', program: 'Grade 11 — Sciences', sub: 'Grade 11 · Sciences', email: 'mwape.tembo@chilenje.edu.zm' },
      teacher: { name: 'Mr. Mwansa Bwalya', first: 'Mr. Bwalya', initials: 'MB', grad: GRAD.green, sub: 'Science Department' },
      admin: { name: 'Mrs. Charity Zulu', initials: 'CZ', grad: GRAD.navy, sub: 'School Administrator' },
      superadmin: { name: 'District Admin', initials: 'DA', grad: GRAD.red, sub: 'Education District' },
    },
    institutions: [
      { id: 'chilenje', initials: 'CS', color: 'blue', name: 'Chilenje Secondary School', type: 'Secondary School', depts: 6, programs: 5, learners: 1420, completion: 78, variant: 'success', status: ['green', 'Active'] },
      { id: 'matero', initials: 'MB', color: 'green', name: 'Matero Boys Secondary', type: 'Secondary School', depts: 5, programs: 4, learners: 1180, completion: 82, variant: 'success', status: ['green', 'Active'] },
      { id: 'kabwata', initials: 'KG', color: 'purple', name: 'Kabwata Girls Secondary', type: 'Secondary School', depts: 6, programs: 5, learners: 1650, completion: 71, status: ['green', 'Active'] },
      { id: 'chelston', initials: 'CH', color: 'teal', name: 'Chelston Secondary School', type: 'Secondary School', depts: 4, programs: 4, learners: 980, completion: 64, variant: 'warning', status: ['yellow', 'Review'] },
      { id: 'mtendere', initials: 'MS', color: 'orange', name: 'Mtendere Secondary School', type: 'Secondary School', depts: 5, programs: 4, learners: 1120, completion: 85, variant: 'success', status: ['gray', 'Setup'] },
    ],
    roleCounts: { admins: 8, teachers: 142, learners: 6350, guardians: 4870 },
    activity: [
      { id: 'a1', dot: 'blue', html: '<strong>Mtendere Secondary School</strong> was added to the district by District Admin.', time: 'Today, 09:14 AM' },
      { id: 'a2', dot: 'green', html: '<strong>Mr. Mwansa Bwalya</strong> was assigned to Chilenje Secondary School — Science Department.', time: 'Today, 08:52 AM' },
      { id: 'a3', dot: 'purple', html: '<strong>Grade 12 Revision</strong> programme was created for all senior classes.', time: 'Yesterday, 4:30 PM' },
      { id: 'a4', dot: 'green', html: '<strong>320 new pupils</strong> enrolled for the new academic year.', time: 'Jun 17, 2026' },
      { id: 'a5', dot: 'yellow', html: '<strong>Chelston Secondary School</strong> flagged for review — attendance below target.', time: 'Jun 16, 2026' },
    ],
    counts: { teachers: 38, learners: 1420 },
    teachers: [
      { id: 't1', initials: 'MB', color: 'teal', name: 'Mr. Mwansa Bwalya', email: 'm.bwalya@chilenje.edu.zm', dept: 'Science', courses: 3, learners: 168, joined: 'Sep 2019', status: ['green', 'Active'] },
      { id: 't2', initials: 'PM', color: 'purple', name: 'Mrs. Patricia Mulenga', email: 'p.mulenga@chilenje.edu.zm', dept: 'Mathematics', courses: 2, learners: 210, joined: 'Jan 2020', status: ['green', 'Active'] },
      { id: 't3', initials: 'SP', color: 'orange', name: 'Mr. Sande Phiri', email: 's.phiri@chilenje.edu.zm', dept: 'Languages', courses: 3, learners: 245, joined: 'Mar 2018', status: ['green', 'Active'] },
      { id: 't4', initials: 'MH', color: 'blue', name: 'Ms. Mutinta Hamoonga', email: 'm.hamoonga@chilenje.edu.zm', dept: 'Humanities', courses: 2, learners: 132, joined: 'Aug 2021', status: ['yellow', 'On Leave'] },
      { id: 't5', initials: 'JC', color: 'green', name: 'Mr. Joseph Chanda', email: 'j.chanda@chilenje.edu.zm', dept: 'ICT', courses: 2, learners: 156, joined: 'Feb 2022', status: ['green', 'Active'] },
    ],
    learners: [
      { id: 'l1', initials: 'MT', color: 'blue', name: 'Mwape Tembo', sid: 'CSS/G11/2024/112', program: 'Grade 11 — Sciences', pct: 54, last: 'Today', status: ['green', 'Active'] },
      { id: 'l2', initials: 'NB', color: 'green', name: 'Natasha Banda', sid: 'CSS/G11/2024/088', program: 'Grade 11 — Business', pct: 76, variant: 'success', last: 'Yesterday', status: ['green', 'Active'] },
      { id: 'l3', initials: 'CM', color: 'purple', name: 'Chola Mwale', sid: 'CSS/G12/2023/041', program: 'Grade 12 — Arts', pct: 88, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l4', initials: 'BM', color: 'red', name: 'Bwalya Mumba', sid: 'CSS/G11/2024/130', program: 'Grade 11 — Sciences', pct: 28, variant: 'warning', last: '4 days ago', status: ['red', 'At Risk'] },
      { id: 'l5', initials: 'KP', color: 'teal', name: 'Kunda Phiri', sid: 'CSS/G11/2024/099', program: 'Grade 11 — Business', pct: 0, last: '10 days ago', status: ['gray', 'Inactive'] },
    ],
    guardians: [
      { id: 'gu1', initials: 'DT', color: 'blue', name: 'Mr. Daniel Tembo', relation: 'Father', learner: 'Mwape Tembo', email: 'd.tembo@email.com', phone: '+260 97 222 4410', status: ['green', 'Active'] },
      { id: 'gu2', initials: 'LB', color: 'green', name: 'Mrs. Linda Banda', relation: 'Mother', learner: 'Natasha Banda', email: 'l.banda@email.com', phone: '+260 96 118 9023', status: ['green', 'Active'] },
      { id: 'gu3', initials: 'FM', color: 'purple', name: 'Mr. Felix Mwale', relation: 'Father', learner: 'Chola Mwale', email: 'f.mwale@email.com', phone: '+260 95 442 7781', status: ['green', 'Active'] },
      { id: 'gu4', initials: 'RM', color: 'orange', name: 'Mrs. Ruth Mumba', relation: 'Mother', learner: 'Bwalya Mumba', email: 'r.mumba@email.com', phone: '+260 97 661 3390', status: ['yellow', 'Pending'] },
      { id: 'gu5', initials: 'BP', color: 'teal', name: 'Mr. Brian Phiri', relation: 'Guardian', learner: 'Kunda Phiri', email: 'b.phiri@email.com', phone: '+260 96 770 5512', status: ['gray', 'Inactive'] },
    ],
    departments: [
      { id: 'd1', icon: 'activity', fg: 'var(--color-success)', bg: '#F0FDF4', name: 'Science', head: 'Mr. Mwansa Bwalya', teachers: 8, stats: [['1', 'Programs'], ['480', 'Students'], ['74%', 'Completion']], open: true,
        programs: [
          { id: 'p1', dot: 'green', name: 'Grade 10–12 Sciences', type: '6 subjects · Core + Electives', enrol: 480, pct: 74, variant: 'success' },
          { id: 'p2', dot: 'blue', name: 'Grade 12 Science Revision', type: 'Exam prep · 4 subjects', enrol: 162, pct: 66 },
        ] },
      { id: 'd2', icon: 'sigma', fg: 'var(--color-primary)', bg: 'var(--blue-50)', name: 'Mathematics', head: 'Mrs. Patricia Mulenga', teachers: 6, stats: [['1', 'Programs'], ['1,420', 'Students'], ['71%', 'Completion']],
        programs: [{ id: 'p3', dot: 'blue', name: 'Mathematics (All Grades)', type: 'Core subject · All streams', enrol: 1420, pct: 71 }] },
      { id: 'd3', icon: 'book', fg: '#6D28D9', bg: '#F5F3FF', name: 'Languages', head: 'Mr. Sande Phiri', teachers: 7, stats: [['1', 'Programs'], ['1,420', 'Students'], ['80%', 'Completion']],
        programs: [{ id: 'p4', dot: 'purple', name: 'English Language (All Grades)', type: 'Core subject · All streams', enrol: 1420, pct: 80, variant: 'success' }] },
      { id: 'd4', icon: 'globe', fg: 'var(--color-warning)', bg: 'var(--color-warning-bg)', name: 'Humanities', head: 'Ms. Mutinta Hamoonga', teachers: 5, stats: [['2', 'Programs'], ['610', 'Students'], ['69%', 'Completion']],
        programs: [
          { id: 'p5', dot: 'orange', name: 'Grade 10–12 Arts', type: '6 subjects', enrol: 420, pct: 72, variant: 'success' },
          { id: 'p6', dot: 'blue', name: 'Grade 10–12 Business', type: '6 subjects', enrol: 190, pct: 61, variant: 'warning' },
        ] },
    ],
    courses: [
      { id: 'c1', banner: banners[2], name: 'Integrated Science', code: 'SCI · Grade 11', learners: 168, chapters: 9, avg: '74%', pct: 74, variant: 'success' },
      { id: 'c2', banner: banners[0], name: 'Physics', code: 'PHY · Grade 11', learners: 96, chapters: 8, avg: '58%', pct: 58, variant: 'warning' },
      { id: 'c3', banner: banners[1], name: 'Chemistry', code: 'CHM · Grade 11', learners: 88, chapters: 7, avg: '63%', pct: 63 },
    ],
    classLearners: [
      { id: 'cl1', initials: 'MT', color: 'blue', name: 'Mwape Tembo', sid: 'CSS/G11/2024/112', course: 'Integrated Science', pct: 54, last: 'Today', due: '1 overdue', risk: ['yellow', '⚠ At Risk'] },
      { id: 'cl2', initials: 'EN', color: 'green', name: 'Esther Ngosa', sid: 'CSS/G11/2024/118', course: 'Integrated Science', pct: 90, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl3', initials: 'BM', color: 'red', name: 'Bwalya Mumba', sid: 'CSS/G11/2024/130', course: 'Physics', pct: 28, variant: 'warning', last: '4 days ago', due: '4 overdue', dueDanger: true, risk: ['red', '✕ At Risk'] },
      { id: 'cl4', initials: 'MC', color: 'purple', name: 'Mulenga Chama', sid: 'CSS/G11/2023/077', course: 'Chemistry', pct: 81, variant: 'success', last: 'Yesterday', due: '1 due today', risk: ['green', '✓ On Track'] },
      { id: 'cl5', initials: 'LM', color: 'teal', name: 'Lweendo Moyo', sid: 'CSS/G11/2024/140', course: 'Physics', pct: 72, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
    ],
    classes: [
      { id: 'k0', live: true, time: 'LIVE', date: 'NOW', name: 'Practical — States of Matter', course: 'Integrated Science · Grade 11', meta: ['42 attending', 'Started 12 min ago'] },
      { id: 'k1', time: '10:00', date: 'FRI 19', name: 'Lesson — Newton’s Laws', course: 'Physics · Grade 11', meta: ['96 enrolled', 'Tomorrow · 10:00am'] },
      { id: 'k2', time: '11:30', date: 'MON 22', name: 'Lab — Acids & Bases', course: 'Chemistry · Grade 11', meta: ['88 enrolled', 'Mon · 11:30am'] },
      { id: 'k3', time: '08:00', date: 'TUE 23', name: 'Grade 12 Revision Class', course: 'Integrated Science · Grade 11', meta: ['168 enrolled', 'Tue · 8:00am'] },
    ],
    grading: [
      { id: 'g1', tone: 'exam', icon: 'file', title: 'End of Term Exam — Science', meta: 'Integrated Science · Due: yesterday', count: '12 new' },
      { id: 'g2', tone: 'test', icon: 'checkSquare', title: 'Class Test — Motion & Forces', meta: 'Physics · Due: today', count: '5 new' },
      { id: 'g3', tone: 'exercise', icon: 'pencil', title: 'Homework 4 — Chemical Bonding', meta: 'Chemistry · Due: 2 days ago', count: '3 new', low: true },
      { id: 'g4', tone: 'test', icon: 'checkSquare', title: 'Quiz — The Cell', meta: 'Integrated Science · Due: today', count: '2 new', low: true },
    ],
    myCourses: [
      { id: 'm1', icon: 'sigma', cover: cover(0), title: 'Mathematics', meta: '9 topics · core subject', pct: 62, status: ['blue', 'In Progress'] },
      { id: 'm2', icon: 'book', cover: cover(1), title: 'English Language', meta: '8 topics · core subject', pct: 100, variant: 'success', status: ['green', 'Complete'] },
      { id: 'm3', icon: 'activity', cover: cover(2), title: 'Integrated Science', meta: '9 topics · core subject', pct: 54, status: ['blue', 'In Progress'] },
      { id: 'm4', icon: 'trendingUp', cover: cover(3), title: 'Physics', meta: '8 topics · elective', pct: 41, variant: 'warning', status: ['blue', 'In Progress'] },
      { id: 'm5', icon: 'calculator', cover: cover(4), title: 'Chemistry', meta: '7 topics · elective', pct: 0, status: ['gray', 'Not Started'] },
      { id: 'm6', icon: 'code', cover: cover(5), title: 'Computer Studies', meta: '6 topics · elective', pct: 0, status: ['gray', 'Not Started'] },
    ],
    continueItems: [
      { id: 'ci1', bg: 'var(--blue-50)', fg: 'var(--color-primary)', icon: 'sigma', course: 'Mathematics', task: 'Quadratic Equations — Practice Set', chapter: 'Topic 3: Algebra', typeIcon: 'plusCircle', typeLabel: 'Exercise · 10 questions', action: 'Continue', primary: true },
      { id: 'ci2', bg: '#F0FDF4', fg: 'var(--color-success)', icon: 'activity', course: 'Integrated Science', task: 'The Human Digestive System', chapter: 'Topic 5: Living Things', typeIcon: 'play', typeLabel: 'Video · 14 min', action: 'Continue', primary: true },
      { id: 'ci3', bg: '#F0FDFA', fg: '#0F766E', icon: 'trendingUp', course: 'Physics', task: 'Speed, Velocity & Acceleration', chapter: 'Topic 2: Motion', typeIcon: 'file', typeLabel: 'Notes · 9 min read', action: 'Review', primary: false },
    ],
    events: [
      { id: 'e1', day: '18', month: 'Jun', line: 'blue', title: 'Integrated Science Practical', meta: '10:00 AM · Science Lab 1', today: true },
      { id: 'e2', day: '19', month: 'Jun', line: 'green', title: 'Mathematics Class Test', meta: '08:00 AM · Grade 11 Block' },
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
        { id: 'n3', dot: 'yellow', text: 'Bwalya Mumba flagged as at-risk (4 overdue tasks).', time: '2 hours ago', unread: false },
      ],
      admin: [
        { id: 'n1', dot: 'yellow', text: '5 enrolment requests need your approval.', time: '30 min ago', unread: true },
        { id: 'n2', dot: 'green', text: '320 students enrolled for the new academic year.', time: 'Today', unread: true },
        { id: 'n3', dot: 'blue', text: 'Mr. Sande Phiri updated the Grade 12 English syllabus.', time: 'Yesterday', unread: false },
      ],
      superadmin: [
        { id: 'n1', dot: 'yellow', text: 'Chelston Secondary School flagged — attendance below target.', time: '1 hour ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Mtendere Secondary School was added to the district.', time: 'Today', unread: true },
        { id: 'n3', dot: 'green', text: '320 new students enrolled across the district.', time: 'Today', unread: false },
      ],
    },
    courseContent: COURSE_CONTENT,
  }
}

// ════════════════════════════════════════════════════════════
//  PRIMARY SCHOOL — Kabwata Primary School
// ════════════════════════════════════════════════════════════
function primarySeed() {
  return {
    meta: {
      institution: 'Kabwata Primary School', levelWord: 'Class',
      learner: { name: 'Chimwemwe Phiri', first: 'Chimwemwe', initials: 'CP', color: 'orange', grad: GRAD.amber, id: 'KPS/G5/2025/038', program: 'Grade 5 — Blue Class', sub: 'Grade 5 · Blue Class', email: 'guardian.phiri@email.com' },
      teacher: { name: 'Madam Bwalya Mwanza', first: 'Madam Bwalya', initials: 'BM', grad: GRAD.green, sub: 'Grade 5 — Class Teacher' },
      admin: { name: 'Mr. Emmanuel Daka', initials: 'ED', grad: GRAD.navy, sub: 'Head Teacher' },
      superadmin: { name: 'District Admin', initials: 'DA', grad: GRAD.red, sub: 'Education District' },
    },
    institutions: [
      { id: 'kabwata', initials: 'KP', color: 'orange', name: 'Kabwata Primary School', type: 'Primary School', depts: 3, programs: 6, learners: 540, completion: 88, variant: 'success', status: ['green', 'Active'] },
      { id: 'chilenjep', initials: 'CP', color: 'blue', name: 'Chilenje Primary School', type: 'Primary School', depts: 3, programs: 6, learners: 420, completion: 84, variant: 'success', status: ['green', 'Active'] },
      { id: 'materoe', initials: 'ME', color: 'green', name: 'Matero East Primary', type: 'Primary School', depts: 2, programs: 6, learners: 380, completion: 79, status: ['green', 'Active'] },
      { id: 'olympia', initials: 'OP', color: 'purple', name: 'Olympia Primary School', type: 'Primary School', depts: 3, programs: 6, learners: 610, completion: 72, variant: 'warning', status: ['yellow', 'Review'] },
      { id: 'garden', initials: 'GP', color: 'teal', name: 'Garden Primary School', type: 'Primary School', depts: 2, programs: 6, learners: 290, completion: 90, variant: 'success', status: ['gray', 'Setup'] },
    ],
    roleCounts: { admins: 6, teachers: 64, learners: 2240, guardians: 2180 },
    activity: [
      { id: 'a1', dot: 'blue', html: '<strong>Garden Primary School</strong> was added to the district.', time: 'Today, 09:14 AM' },
      { id: 'a2', dot: 'green', html: '<strong>Madam Bwalya Mwanza</strong> was assigned as Grade 5 class teacher.', time: 'Today, 08:52 AM' },
      { id: 'a3', dot: 'purple', html: '<strong>Reading Club</strong> programme was created for Grade 4–6.', time: 'Yesterday, 4:30 PM' },
      { id: 'a4', dot: 'green', html: '<strong>85 new pupils</strong> enrolled for the new term.', time: 'Jun 17, 2026' },
      { id: 'a5', dot: 'yellow', html: '<strong>Olympia Primary School</strong> flagged for review — reading scores dipped.', time: 'Jun 16, 2026' },
    ],
    counts: { teachers: 18, learners: 540 },
    teachers: [
      { id: 't1', initials: 'BM', color: 'teal', name: 'Madam Bwalya Mwanza', email: 'b.mwanza@kabwata.edu.zm', dept: 'Grade 5', courses: 4, learners: 32, joined: 'Sep 2020', status: ['green', 'Active'] },
      { id: 't2', initials: 'GM', color: 'purple', name: 'Mr. George Muleya', email: 'g.muleya@kabwata.edu.zm', dept: 'Grade 6', courses: 4, learners: 30, joined: 'Jan 2019', status: ['green', 'Active'] },
      { id: 't3', initials: 'BS', color: 'orange', name: 'Madam Beatrice Sakala', email: 'b.sakala@kabwata.edu.zm', dept: 'Grade 4', courses: 4, learners: 34, joined: 'Mar 2021', status: ['green', 'Active'] },
      { id: 't4', initials: 'KP', color: 'blue', name: 'Mr. Kelvin Phiri', email: 'k.phiri@kabwata.edu.zm', dept: 'Grade 3', courses: 4, learners: 28, joined: 'Aug 2022', status: ['yellow', 'On Leave'] },
      { id: 't5', initials: 'PB', color: 'green', name: 'Madam Priscilla Banda', email: 'p.banda@kabwata.edu.zm', dept: 'Grade 5', courses: 2, learners: 32, joined: 'Feb 2023', status: ['green', 'Active'] },
    ],
    learners: [
      { id: 'l1', initials: 'CP', color: 'orange', name: 'Chimwemwe Phiri', sid: 'KPS/G5/2025/038', program: 'Grade 5 — Blue Class', pct: 70, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l2', initials: 'KB', color: 'green', name: 'Kondwani Banda', sid: 'KPS/G5/2025/041', program: 'Grade 5 — Blue Class', pct: 85, variant: 'success', last: 'Today', status: ['green', 'Active'] },
      { id: 'l3', initials: 'TM', color: 'purple', name: 'Towela Mwale', sid: 'KPS/G6/2024/012', program: 'Grade 6 — Green Class', pct: 92, variant: 'success', last: 'Yesterday', status: ['green', 'Active'] },
      { id: 'l4', initials: 'MZ', color: 'red', name: 'Mapalo Zulu', sid: 'KPS/G5/2025/050', program: 'Grade 5 — Blue Class', pct: 38, variant: 'warning', last: '3 days ago', status: ['red', 'Needs Help'] },
      { id: 'l5', initials: 'LT', color: 'teal', name: 'Luyando Tembo', sid: 'KPS/G4/2025/077', program: 'Grade 4 — Red Class', pct: 60, last: 'Today', status: ['green', 'Active'] },
    ],
    guardians: [
      { id: 'gu1', initials: 'MP', color: 'orange', name: 'Mrs. Memory Phiri', relation: 'Mother', learner: 'Chimwemwe Phiri', email: 'm.phiri@email.com', phone: '+260 97 330 1180', status: ['green', 'Active'] },
      { id: 'gu2', initials: 'IB', color: 'green', name: 'Mr. Isaac Banda', relation: 'Father', learner: 'Kondwani Banda', email: 'i.banda@email.com', phone: '+260 96 220 7741', status: ['green', 'Active'] },
      { id: 'gu3', initials: 'JM', color: 'purple', name: 'Mrs. Janet Mwale', relation: 'Mother', learner: 'Towela Mwale', email: 'j.mwale@email.com', phone: '+260 95 901 3382', status: ['green', 'Active'] },
      { id: 'gu4', initials: 'CZ', color: 'blue', name: 'Mr. Collins Zulu', relation: 'Father', learner: 'Mapalo Zulu', email: 'c.zulu@email.com', phone: '+260 97 552 9910', status: ['yellow', 'Pending'] },
      { id: 'gu5', initials: 'AT', color: 'teal', name: 'Mrs. Agnes Tembo', relation: 'Guardian', learner: 'Luyando Tembo', email: 'a.tembo@email.com', phone: '+260 96 118 6633', status: ['gray', 'Inactive'] },
    ],
    departments: [
      { id: 'd1', icon: 'book', fg: 'var(--color-primary)', bg: 'var(--blue-50)', name: 'Lower Primary (G1–G3)', head: 'Mr. Kelvin Phiri', teachers: 6, stats: [['3', 'Classes'], ['180', 'Pupils'], ['86%', 'Completion']], open: true,
        programs: [
          { id: 'p1', dot: 'blue', name: 'Grade 1–3 Core', type: 'English · Maths · Science', enrol: 180, pct: 86, variant: 'success' },
          { id: 'p2', dot: 'green', name: 'Early Reading Club', type: 'Reading support', enrol: 64, pct: 90, variant: 'success' },
        ] },
      { id: 'd2', icon: 'activity', fg: 'var(--color-success)', bg: '#F0FDF4', name: 'Upper Primary (G4–G6)', head: 'Madam Bwalya Mwanza', teachers: 8, stats: [['3', 'Classes'], ['210', 'Pupils'], ['83%', 'Completion']],
        programs: [
          { id: 'p3', dot: 'green', name: 'Grade 4–6 Core', type: 'English · Maths · Science · Social', enrol: 210, pct: 83, variant: 'success' },
          { id: 'p4', dot: 'orange', name: 'Maths Olympiad Club', type: 'Enrichment', enrol: 38, pct: 77 },
        ] },
      { id: 'd3', icon: 'pencil', fg: '#6D28D9', bg: '#F5F3FF', name: 'Creative & Co-curricular', head: 'Madam Priscilla Banda', teachers: 4, stats: [['2', 'Programs'], ['540', 'Pupils'], ['91%', 'Completion']],
        programs: [
          { id: 'p5', dot: 'purple', name: 'Creative Arts', type: 'All classes', enrol: 540, pct: 91, variant: 'success' },
          { id: 'p6', dot: 'blue', name: 'Computing Basics', type: 'G3–G6', enrol: 320, pct: 84, variant: 'success' },
        ] },
    ],
    courses: [
      { id: 'c1', banner: banners[0], name: 'Mathematics', code: 'Grade 5 · Blue Class', learners: 32, chapters: 8, avg: '82%', pct: 82, variant: 'success' },
      { id: 'c2', banner: banners[2], name: 'English Language', code: 'Grade 5 · Blue Class', learners: 32, chapters: 7, avg: '88%', pct: 88, variant: 'success' },
      { id: 'c3', banner: banners[1], name: 'Integrated Science', code: 'Grade 5 · Blue Class', learners: 32, chapters: 6, avg: '79%', pct: 79 },
    ],
    classLearners: [
      { id: 'cl1', initials: 'CP', color: 'orange', name: 'Chimwemwe Phiri', sid: 'KPS/G5/2025/038', course: 'Mathematics', pct: 70, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl2', initials: 'KB', color: 'green', name: 'Kondwani Banda', sid: 'KPS/G5/2025/041', course: 'Mathematics', pct: 85, variant: 'success', last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
      { id: 'cl3', initials: 'MZ', color: 'red', name: 'Mapalo Zulu', sid: 'KPS/G5/2025/050', course: 'English Language', pct: 38, variant: 'warning', last: '3 days ago', due: '2 to finish', dueDanger: true, risk: ['yellow', '⚠ Needs Help'] },
      { id: 'cl4', initials: 'MM', color: 'purple', name: 'Mutale Mwansa', sid: 'KPS/G5/2025/044', course: 'Integrated Science', pct: 76, variant: 'success', last: 'Yesterday', due: '1 due today', risk: ['green', '✓ On Track'] },
      { id: 'cl5', initials: 'CM', color: 'teal', name: 'Chanda Mulenga', sid: 'KPS/G5/2025/047', course: 'Mathematics', pct: 64, last: 'Today', due: 'None', risk: ['green', '✓ On Track'] },
    ],
    classes: [
      { id: 'k0', live: true, time: 'LIVE', date: 'NOW', name: 'Story Time — Reading Aloud', course: 'English Language · Grade 5', meta: ['30 attending', 'Started 8 min ago'] },
      { id: 'k1', time: '09:00', date: 'FRI 19', name: 'Counting & Place Value', course: 'Mathematics · Grade 5', meta: ['32 in class', 'Tomorrow · 9:00am'] },
      { id: 'k2', time: '11:00', date: 'MON 22', name: 'Plants Around Us', course: 'Integrated Science · Grade 5', meta: ['32 in class', 'Mon · 11:00am'] },
      { id: 'k3', time: '13:00', date: 'TUE 23', name: 'Drawing & Colouring', course: 'Creative Arts · Grade 5', meta: ['32 in class', 'Tue · 1:00pm'] },
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
        { id: 'n3', dot: 'yellow', text: 'Mapalo Zulu needs extra reading help.', time: '2 hours ago', unread: false },
      ],
      admin: [
        { id: 'n1', dot: 'yellow', text: '3 new pupil registrations need approval.', time: '30 min ago', unread: true },
        { id: 'n2', dot: 'green', text: '85 pupils enrolled for the new term.', time: 'Today', unread: true },
        { id: 'n3', dot: 'blue', text: 'Sports Day is scheduled for June 30.', time: 'Yesterday', unread: false },
      ],
      superadmin: [
        { id: 'n1', dot: 'yellow', text: 'Olympia Primary School flagged — reading scores dipped.', time: '1 hour ago', unread: true },
        { id: 'n2', dot: 'blue', text: 'Garden Primary School was added to the district.', time: 'Today', unread: true },
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
