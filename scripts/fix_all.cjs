const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const getSidebarHtml = (filename) => {
    const links = [
        { href: 'dashboard.html', icon: 'dashboard', label: 'Home' },
        { href: 'attendance_tracker.html', icon: 'pie_chart', label: 'Attendance' },
        { href: 'fee_payments.html', icon: 'payments', label: 'Fees' },
        { href: 'academic_results.html', icon: 'grade', label: 'Results' },
        { href: 'exam_schedule.html', icon: 'calendar_month', label: 'Schedule' },
        { href: 'campus_events.html', icon: 'campaign', label: 'Events' },
        { href: 'digital_student_id.html', icon: 'badge', label: 'ID' }
    ];

    let navHtml = '<nav class="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">\n';
    for (const link of links) {
        let isActive = filename === link.href || (filename === 'student_dashboard.html' && link.href === 'dashboard.html');
        let classes = isActive 
            ? 'bg-primary-container text-on-primary-container font-bold' 
            : 'text-on-surface-variant hover:bg-surface-container hover:text-primary';
        let iconStyle = isActive ? ` style="font-variation-settings: 'FILL' 1;"` : '';
        
        navHtml += `      <a href="${link.href}" class="flex items-center gap-3 px-4 py-3 ${classes} rounded-lg transition-colors">
        <span class="material-symbols-outlined"${iconStyle}>${link.icon}</span>
        <span class="font-label-md">${link.label}</span>
      </a>\n`;
    }
    navHtml += '    </nav>';
    return `
  <!-- Sidebar -->
  <aside id="sidebar" class="w-64 fixed inset-y-0 left-0 z-50 bg-surface-container-lowest border-r border-surface-container flex flex-col transform -translate-x-full lg:translate-x-0 transition-transform duration-300">
    <div class="h-16 flex items-center justify-between px-6 border-b border-surface-container">
      <span class="font-headline-sm text-primary font-bold">GLS University</span>
      <button class="lg:hidden p-2 -mr-2 rounded-full hover:bg-surface-container-high transition-colors" onclick="document.getElementById('sidebar').classList.add('-translate-x-full')">
        <span class="material-symbols-outlined text-primary">close</span>
      </button>
    </div>
    ${navHtml}
  </aside>
  <!-- Main content wrapper -->
  <div class="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative overflow-x-hidden">
`;
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix literal \n created by previous script
  content = content.replace(/\\n\s*</g, '<'); 
  content = content.replace(/\\n/g, ''); 

  // Fix academic_results.html and exam_schedule.html if they don't have the sidebar
  if (!content.includes('id="sidebar"')) {
      console.log('Injecting full layout for', file);
      
      // 1. Remove Bottom Nav
      content = content.replace(/<nav class="fixed bottom-0[^>]*>[\s\S]*?<\/nav>/i, '');
      
      // Remove any navigation drawer if exists
      content = content.replace(/<!-- Navigation Drawer[^>]*>[\s\S]*?(?=<script>|<\/body>)/i, '');
      content = content.replace(/<div class="hidden fixed inset-0 bg-black\/40[^>]*>[\s\S]*?<\/div>\s*<\/div>/i, '');

      // 2. Change body classes
      content = content.replace(/(<body[^>]*class="[^"]*)pb-32([^"]*")/, '$1flex$2');
      content = content.replace(/(<body[^>]*class="[^"]*)pb-24([^"]*")/, '$1flex$2');
      if (!content.match(/<body[^>]*class="[^"]*flex[^"]*"/)) {
         content = content.replace(/(<body[^>]*class="[^"]*)(")/, '$1 flex$2');
      }

      // 3. Inject sidebar and wrapper
      content = content.replace(/(<body[^>]*>)/i, '$1\n' + getSidebarHtml(file));

      // 4. Update header
      content = content.replace(/<header\s+class="([^"]*)"/i, (match, classes) => {
        let newClasses = classes.replace('fixed', 'sticky').replace('left-0', '').trim();
        return `<header class="${newClasses}"`;
      });
      
      // 5. Add Hamburger Menu to the main header
      if (!content.includes('sidebar\').classList.toggle')) {
        content = content.replace(/(<div class="flex items-center gap-3">\s*)(<h1|<span|<button)/i, (match, prefix, tag) => {
            return prefix + `<button class="lg:hidden p-2 -ml-2 mr-2 rounded-full hover:bg-surface-container-high transition-colors" onclick="document.getElementById('sidebar').classList.toggle('-translate-x-full')">
              <span class="material-symbols-outlined text-primary">menu</span>
            </button>\n` + tag;
        });
      }

      // 6. Close the new layout div before body closing
      content = content.replace(/(<\/body>)/i, '  </div>\n$1');
  } else {
      // Just update the nav part
      console.log('Updating nav for', file);
      
      const links = [
        { href: 'dashboard.html', icon: 'dashboard', label: 'Home' },
        { href: 'attendance_tracker.html', icon: 'pie_chart', label: 'Attendance' },
        { href: 'fee_payments.html', icon: 'payments', label: 'Fees' },
        { href: 'academic_results.html', icon: 'grade', label: 'Results' },
        { href: 'exam_schedule.html', icon: 'calendar_month', label: 'Schedule' },
        { href: 'campus_events.html', icon: 'campaign', label: 'Events' },
        { href: 'digital_student_id.html', icon: 'badge', label: 'ID' }
      ];

      let navHtml = '<nav class="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">\n';
      for (const link of links) {
          let isActive = file === link.href || (file === 'student_dashboard.html' && link.href === 'dashboard.html');
          let classes = isActive 
              ? 'bg-primary-container text-on-primary-container font-bold' 
              : 'text-on-surface-variant hover:bg-surface-container hover:text-primary';
          let iconStyle = isActive ? ` style="font-variation-settings: 'FILL' 1;"` : '';
          
          navHtml += `      <a href="${link.href}" class="flex items-center gap-3 px-4 py-3 ${classes} rounded-lg transition-colors">
          <span class="material-symbols-outlined"${iconStyle}>${link.icon}</span>
          <span class="font-label-md">${link.label}</span>
        </a>\n`;
      }
      navHtml += '    </nav>';
      
      content = content.replace(/<nav class="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">[\s\S]*?<\/nav>/, navHtml);
  }

  fs.writeFileSync(file, content);
}
