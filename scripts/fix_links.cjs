const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'login.html'); // don't touch login page if it exists

const replacements = [
    { target: 'Home', file: 'dashboard.html' },
    { target: 'Attendance', file: 'attendance_tracker.html' },
    { target: 'Results', file: 'academic_results.html' },
    { target: 'Events', file: 'campus_events.html' },
    { target: 'ID', file: 'digital_student_id.html' }
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    replacements.forEach(({ target, file: targetFile }) => {
        // Regex to find: href="..." followed by anything, then an icon span, then the text span with the target text
        // Example: href="#" ... >dashboard</span> ... >Home</span>
        const regex = new RegExp(`href="[^"]*"([^>]*>\\s*<span class="material-symbols-outlined"[^>]*>[^<]*</span>\\s*<span[^>]*>${target}</span>)`, 'gi');
        content = content.replace(regex, `href="${targetFile}"$1`);
    });

    fs.writeFileSync(file, content);
});
console.log('All links reliably updated based on text labels!');
