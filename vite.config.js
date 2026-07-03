import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        dashboard: resolve(process.cwd(), 'dashboard.html'),
        chatbot: resolve(process.cwd(), 'chatbot.html'),
        attendance_tracker: resolve(process.cwd(), 'attendance_tracker.html'),
        fee_payments: resolve(process.cwd(), 'fee_payments.html'),
        academic_results: resolve(process.cwd(), 'academic_results.html'),
        exam_schedule: resolve(process.cwd(), 'exam_schedule.html'),
        campus_events: resolve(process.cwd(), 'campus_events.html'),
        digital_student_id: resolve(process.cwd(), 'digital_student_id.html'),
        student_dashboard: resolve(process.cwd(), 'student_dashboard.html'),
        event_registration: resolve(process.cwd(), 'event_registration.html')
      },
    },
  },
});
