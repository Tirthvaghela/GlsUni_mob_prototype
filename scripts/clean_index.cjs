const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Remove the sidebar block
c = c.replace(/<!-- Sidebar -->[\s\S]*?<\/aside>/i, '');

// Remove the wrapper div that was adding margin
c = c.replace(/<!-- Main content wrapper -->\s*<div class="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative overflow-x-hidden">/i, '');

// Remove the closing div tag for that wrapper (should be right before body close)
c = c.replace(/<\/div>\s*<\/body><\/html>/, '</body></html>');

fs.writeFileSync('index.html', c);
