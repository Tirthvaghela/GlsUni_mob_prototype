const fs = require('fs');

function removeProfile(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // regex to match <div ...> <img ...> </div> that are w-10 h-10 rounded-full
    const regex = /<div class="w-10 h-10 rounded-full[^>]*>\s*<img[^>]*>\s*<\/div>/g;
    
    content = content.replace(regex, '');
    
    // Also, my previous botch in dashboard.html inserted a new <head> block, let's fix that if it exists
    if (file.includes('dashboard.html')) {
        content = content.replace(/<\/style>\s*<\/head>\s*<body[^>]*>\s*<!-- TopAppBar -->\s*<header[^>]*>\s*<div class="flex items-center gap-3">\s*<span[^>]*>GLS University<\/span>\s*<\/div>\s*<button[^>]*>\s*<span[^>]*>notifications<\/span>\s*<\/button>\s*<\/header>\s*<style>\s*body\s*{\s*min-height[^}]*}\s*<\/style>\s*<\/head>\s*<main/, '</style>\n</head>\n<body class="bg-background text-on-background font-body-md min-h-screen pb-24">\n<!-- TopAppBar -->\n<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface dark:bg-surface-charcoal flat no shadows">\n<div class="flex items-center gap-3">\n<span class="font-headline-lg-mobile text-headline-lg-mobile text-primary dark:text-primary-fixed">GLS University</span>\n</div>\n<button class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors duration-200">\n<span class="material-symbols-outlined">notifications</span>\n</button>\n</header>\n<main');
    }

    fs.writeFileSync(file, content);
}

removeProfile('attendance_tracker.html');
removeProfile('dashboard.html');
console.log('Removed profile pictures');
