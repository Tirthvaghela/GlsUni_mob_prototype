const fs = require('fs');

const files = ['dashboard.html', 'student_dashboard.html', 'academic_results.html', 'fee_payments.html', 'attendance_tracker.html', 'campus_events.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let c = fs.readFileSync(file, 'utf8');

  // Fix: Add w-full to main so it doesn't expand to the intrinsic width of horizontally scrolling children
  c = c.replace(/<main class="([^"]*max-w-7xl[^"]*)"/g, (match, classes) => {
    if (!classes.includes('w-full')) {
      return `<main class="${classes} w-full"`;
    }
    return match;
  });
  
  c = c.replace(/<main class="([^"]*mt-20[^"]*)"/g, (match, classes) => {
    if (!classes.includes('w-full')) {
      return `<main class="${classes} w-full"`;
    }
    return match;
  });

  fs.writeFileSync(file, c);
}
