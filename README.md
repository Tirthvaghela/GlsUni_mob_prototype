# GlsUni_mob_prototype

A responsive, mobile-first prototype of the **GLS University Student Portal** — a multi-page HTML/Tailwind/Vite build covering the core student workflows (dashboard, attendance, fees, results, schedule, events, digital ID) plus an AI-style FAQ support chatbot.

Every page follows the same "Academic Vanguard" design language: a navy/gold GLS color palette, Montserrat + Inter type, and Material Symbols icons, defined as a shared Tailwind config embedded in each page.

## Features

- **Login** — student ID / password screen with a simulated auth flow.
- **Dashboard** — home overview after login.
- **Attendance Tracker** — subject-wise attendance breakdown.
- **Fee Payments** — dues, payment history, and receipts.
- **Academic Results** — semester-wise grades/results.
- **Schedule** — tabbed **Class Schedule** (weekly timetable with a Mon–Sat day picker, auto-selecting today) and **Exam Schedule** (upcoming papers, exam instructions, support contacts).
- **Campus Events** + **Event Registration** — browse and register for university events.
- **Digital Student ID** — interactive ID card (tilt-on-hover), student details (course, batch, blood group, contact), linked services status (Library/Hostel/Transport/Lab), recent access log, and share/download/report-lost actions.
- **Support Chatbot** — categorized FAQ browser (Admissions, Fees, Academics, Campus) driven by an in-page FAQ database.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — multi-page build tooling and dev server.
- **Tailwind CSS** — loaded via the Play CDN (`cdn.tailwindcss.com`) with a per-page custom theme (colors, spacing, type scale) matching the GLS design tokens.
- **Vanilla JavaScript** — no framework; each page is self-contained HTML with inline `<script>` blocks for interactivity (tab switching, card effects, form handling, chatbot logic).
- **Google Fonts** (Montserrat, Inter, Source Serif 4) and **Material Symbols Outlined** for iconography.

## Project Structure

```
gls_chatbot/
├── index.html                 # Login
├── dashboard.html             # Student dashboard (home)
├── attendance_tracker.html    # Attendance
├── fee_payments.html          # Fees
├── academic_results.html      # Results
├── exam_schedule.html         # Schedule (Class Schedule + Exam Schedule tabs)
├── campus_events.html         # Events listing
├── event_registration.html    # Event registration form
├── digital_student_id.html    # Digital ID card
├── chatbot.html                # Support chatbot (FAQ browser)
├── gls_faq_corpus.csv          # Source FAQ corpus behind the chatbot
├── public/                     # Static assets (favicon, icon sprite)
├── scripts/                    # One-off Node scripts used during earlier layout/nav refactors
├── src/                        # Unused default Vite scaffold (not referenced by any page)
├── vite.config.js              # Multi-page build entry configuration
└── package.json
```

> **Note:** `student_dashboard.html` also exists alongside `dashboard.html` as a separate, differently-formatted copy of the same page and is wired as its own Vite build entry — it isn't linked from any page's navigation. `dashboard.html` is the one actually used across the app's sidebar links.

## Pages

| Page | File | Description |
|---|---|---|
| Login | `index.html` | Student ID/password sign-in |
| Dashboard | `dashboard.html` | Post-login home/overview |
| Attendance | `attendance_tracker.html` | Attendance breakdown by subject |
| Fees | `fee_payments.html` | Fee dues and payment history |
| Results | `academic_results.html` | Semester results |
| Schedule | `exam_schedule.html` | Class Schedule / Exam Schedule tabs |
| Events | `campus_events.html` | Campus events listing |
| Event Registration | `event_registration.html` | Register for an event |
| Digital ID | `digital_student_id.html` | Digital student ID card & access log |
| Chatbot | `chatbot.html` | FAQ support chatbot |

## Getting Started

```bash
npm install       # install dependencies
npm run dev       # start the Vite dev server
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build locally
```

## Data

`gls_faq_corpus.csv` is the source corpus (question/answer pairs across admissions, fees, academics, and campus topics) that the chatbot's FAQ content is drawn from.

## Deployment

This project is configured to deploy out-of-the-box on **Vercel**. Import the repository into Vercel and it will automatically detect the Vite build settings (`vite.config.js` already registers every HTML page as a build entry).
