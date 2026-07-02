const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'index.html'); // index is login, no nav

const navItems = [
    { id: 'dashboard.html', icon: 'dashboard', text: 'Home' },
    { id: 'attendance_tracker.html', icon: 'pie_chart', text: 'Attendance' },
    { id: 'academic_results.html', icon: 'grade', text: 'Results' },
    { id: 'campus_events.html', icon: 'campaign', text: 'Events' },
    { id: 'digital_student_id.html', icon: 'badge', text: 'ID' }
];

const inactiveClass = "flex flex-col items-center justify-center text-on-surface-variant dark:text-outline active:scale-95 transition-transform duration-150 hover:text-primary";
const activeClass = "flex flex-col items-center justify-center text-primary dark:text-secondary-fixed-dim font-bold after:content-[''] after:w-1 after:h-1 after:bg-primary dark:after:bg-secondary-fixed-dim after:rounded-full after:mt-1 active:scale-95 transition-transform duration-150";

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // build the new nav
    let newNav = `<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface-container-lowest dark:bg-surface-charcoal shadow-[0_-4px_15px_rgba(0,30,64,0.08)] rounded-t-xl transition-all">\n`;
    
    navItems.forEach(item => {
        let isFill = item.id === file ? ` style="font-variation-settings: 'FILL' 1;"` : '';
        let itemClass = item.id === file ? activeClass : inactiveClass;
        newNav += `<!-- ${item.text} -->
<a class="${itemClass}" href="${item.id}">
<span class="material-symbols-outlined"${isFill}>${item.icon}</span>
<span class="font-label-md text-label-md">${item.text}</span>
</a>\n`;
    });
    newNav += `</nav>`;

    // Replace existing nav
    content = content.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/, newNav);

    fs.writeFileSync(file, content);
});
console.log('Nav fixed successfully!');
