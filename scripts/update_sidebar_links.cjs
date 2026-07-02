const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const getNavHtml = (filename) => {
    const links = [
        { href: 'dashboard.html', icon: 'dashboard', label: 'Home' },
        { href: 'attendance_tracker.html', icon: 'pie_chart', label: 'Attendance' },
        { href: 'fee_payments.html', icon: 'payments', label: 'Fees' },
        { href: 'academic_results.html', icon: 'grade', label: 'Results' },
        { href: 'exam_schedule.html', icon: 'calendar_month', label: 'Schedule' },
        { href: 'campus_events.html', icon: 'campaign', label: 'Events' },
        { href: 'digital_student_id.html', icon: 'badge', label: 'ID' }
    ];

    let navHtml = '<nav class="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">\\n';
    for (const link of links) {
        // student_dashboard maps to dashboard active state just in case
        let isActive = filename === link.href || (filename === 'student_dashboard.html' && link.href === 'dashboard.html');
        
        let classes = isActive 
            ? 'bg-primary-container text-on-primary-container font-bold' 
            : 'text-on-surface-variant hover:bg-surface-container hover:text-primary';
        let iconStyle = isActive ? ` style="font-variation-settings: 'FILL' 1;"` : '';
        
        navHtml += `      <a href="${link.href}" class="flex items-center gap-3 px-4 py-3 ${classes} rounded-lg transition-colors">
        <span class="material-symbols-outlined"${iconStyle}>${link.icon}</span>
        <span class="font-label-md">${link.label}</span>
      </a>\\n`;
    }
    navHtml += '    </nav>';
    return navHtml;
};

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('id="sidebar"') && !content.includes('<aside')) continue;

    // Replace the <nav>...</nav> inside the sidebar
    content = content.replace(/<nav class="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">[\s\S]*?<\/nav>/, getNavHtml(file));
    fs.writeFileSync(file, content);
    console.log('Updated nav in', file);
}
