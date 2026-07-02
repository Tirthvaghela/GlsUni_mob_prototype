const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const getSidebarHtml = (filename) => `
  <!-- Sidebar -->
  <aside class="w-64 fixed inset-y-0 left-0 z-50 bg-surface-container-lowest border-r border-surface-container flex flex-col">
    <div class="h-16 flex items-center px-6 border-b border-surface-container">
      <span class="font-headline-sm text-primary font-bold">GLS University</span>
    </div>
    <nav class="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">
      <a href="dashboard.html" class="flex items-center gap-3 px-4 py-3 ${filename === 'dashboard.html' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'} rounded-lg transition-colors">
        <span class="material-symbols-outlined" ${filename === 'dashboard.html' ? "style=\"font-variation-settings: 'FILL' 1;\"" : ''}>dashboard</span>
        <span class="font-label-md">Home</span>
      </a>
      <a href="attendance_tracker.html" class="flex items-center gap-3 px-4 py-3 ${filename === 'attendance_tracker.html' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'} rounded-lg transition-colors">
        <span class="material-symbols-outlined" ${filename === 'attendance_tracker.html' ? "style=\"font-variation-settings: 'FILL' 1;\"" : ''}>pie_chart</span>
        <span class="font-label-md">Attendance</span>
      </a>
      <a href="academic_results.html" class="flex items-center gap-3 px-4 py-3 ${filename === 'academic_results.html' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'} rounded-lg transition-colors">
        <span class="material-symbols-outlined" ${filename === 'academic_results.html' ? "style=\"font-variation-settings: 'FILL' 1;\"" : ''}>grade</span>
        <span class="font-label-md">Results</span>
      </a>
      <a href="campus_events.html" class="flex items-center gap-3 px-4 py-3 ${filename === 'campus_events.html' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'} rounded-lg transition-colors">
        <span class="material-symbols-outlined" ${filename === 'campus_events.html' ? "style=\"font-variation-settings: 'FILL' 1;\"" : ''}>campaign</span>
        <span class="font-label-md">Events</span>
      </a>
      <a href="digital_student_id.html" class="flex items-center gap-3 px-4 py-3 ${filename === 'digital_student_id.html' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'} rounded-lg transition-colors">
        <span class="material-symbols-outlined" ${filename === 'digital_student_id.html' ? "style=\"font-variation-settings: 'FILL' 1;\"" : ''}>badge</span>
        <span class="font-label-md">ID</span>
      </a>
    </nav>
  </aside>
  <!-- Main content wrapper -->
  <div class="flex-1 ml-64 flex flex-col min-h-screen w-full relative overflow-x-hidden">
`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  if (!content.includes('BottomNavBar')) {
    continue;
  }

  // 1. Remove BottomNavBar
  content = content.replace(/<!-- BottomNavBar -->[\s\S]*?(?=<!-- Floating Action Button|<script>|<\/body>)/i, '');
  
  // 2. Change body classes
  content = content.replace(/(<body[^>]*class="[^"]*)pb-32([^"]*")/, '$1flex$2');
  content = content.replace(/(<body[^>]*class="[^"]*)pb-24([^"]*")/, '$1flex$2');
  if (!content.match(/<body[^>]*class="[^"]*flex[^"]*"/)) {
     content = content.replace(/(<body[^>]*class="[^"]*)(")/, '$1 flex$2');
  }

  // 3. Inject sidebar
  content = content.replace(/(<body[^>]*>)/i, '$1\n' + getSidebarHtml(file));

  // 4. Update header class to stick relative to the new container and change title if GLS University was there
  content = content.replace(/<header\s+class="([^"]*)"/i, (match, classes) => {
    let newClasses = classes.replace('fixed', 'sticky').replace('left-0', '').trim();
    return `<header class="${newClasses}"`;
  });
  
  const titleMap = {
    'dashboard.html': 'Dashboard',
    'attendance_tracker.html': 'Attendance',
    'academic_results.html': 'Results',
    'campus_events.html': 'Campus Events',
    'digital_student_id.html': 'Digital ID',
    'student_dashboard.html': 'Dashboard'
  };
  const pageTitle = titleMap[file] || 'Dashboard';
  
  content = content.replace(/<span[^>]*>GLS University<\/span>/ig, `<h1 class="font-title-lg text-title-lg text-primary">${pageTitle}</h1>`);

  // 5. Close the new layout div before body closing
  content = content.replace(/(<\/body>)/i, '  </div>\n$1');

  fs.writeFileSync(file, content);
  console.log('Refactored', file);
}
