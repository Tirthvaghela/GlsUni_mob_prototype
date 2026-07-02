const fs = require('fs');

const files = ['dashboard.html', 'student_dashboard.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let c = fs.readFileSync(file, 'utf8');

  // 1. Fix the flex wrapper to avoid forcing 100% width with margins, which can cause overflow
  // We remove w-full and add min-w-0.
  c = c.replace(/class="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative overflow-x-hidden"/g, 'class="flex-1 min-w-0 lg:ml-64 flex flex-col min-h-screen relative overflow-x-hidden"');

  // 2. Fix the typography of "Good Morning, Aryan" to scale down on mobile so it doesn't break the layout width
  c = c.replace(/class="font-display-lg text-display-lg text-primary leading-tight"/g, 'class="font-headline-lg-mobile text-headline-lg-mobile md:font-display-lg md:text-display-lg text-primary leading-tight"');

  // Also fix "Overall Attendance" card overflow by ensuring the grid doesn't get pushed out
  // The min-w-0 on the wrapper usually fixes the grid pushing out.

  fs.writeFileSync(file, c);
}
