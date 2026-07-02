const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Skip files that don't have the sidebar injected yet (or if they do, we'll process them)
  if (!content.includes('<!-- Sidebar -->')) {
    continue;
  }

  // 1. Fix sidebar branding
  content = content.replace(/<div class="h-16 flex items-center px-6 border-b border-surface-container">\s*<h1 class="font-title-lg text-title-lg text-primary">[^<]*<\/h1>\s*<\/div>/,
    `<div class="h-16 flex items-center justify-between px-6 border-b border-surface-container">
      <span class="font-headline-sm text-primary font-bold">GLS University</span>
      <button class="lg:hidden p-2 -mr-2 rounded-full hover:bg-surface-container-high transition-colors" onclick="document.getElementById('sidebar').classList.add('-translate-x-full')">
        <span class="material-symbols-outlined text-primary">close</span>
      </button>
    </div>`);
    
  // 1b. If the header already was fixed to GLS University but without close button:
  content = content.replace(/<div class="h-16 flex items-center px-6 border-b border-surface-container">\s*<span class="font-headline-sm text-primary font-bold">GLS University<\/span>\s*<\/div>/,
    `<div class="h-16 flex items-center justify-between px-6 border-b border-surface-container">
      <span class="font-headline-sm text-primary font-bold">GLS University</span>
      <button class="lg:hidden p-2 -mr-2 rounded-full hover:bg-surface-container-high transition-colors" onclick="document.getElementById('sidebar').classList.add('-translate-x-full')">
        <span class="material-symbols-outlined text-primary">close</span>
      </button>
    </div>`);

  // 2. Make sidebar toggleable
  content = content.replace(/<aside class="w-64 fixed inset-y-0 left-0 z-50 bg-surface-container-lowest border-r border-surface-container flex flex-col">/,
    `<aside id="sidebar" class="w-64 fixed inset-y-0 left-0 z-50 bg-surface-container-lowest border-r border-surface-container flex flex-col transform -translate-x-full lg:translate-x-0 transition-transform duration-300">`);
    
  // 3. Make main content layout responsive (lg:ml-64 instead of ml-64)
  content = content.replace(/<div class="flex-1 ml-64 flex flex-col min-h-screen w-full relative overflow-x-hidden">/,
    `<div class="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative overflow-x-hidden">`);

  // 4. Add Hamburger Menu to the main header if not present
  // Find the <header ...> tag
  if (!content.includes('sidebar\').classList.toggle')) {
    // Some headers have a title directly inside <div class="flex items-center gap-3">
    content = content.replace(/(<div class="flex items-center gap-3">\s*)(<h1|<span|<button)/i, (match, prefix, tag) => {
        return prefix + `<button class="lg:hidden p-2 -ml-2 mr-2 rounded-full hover:bg-surface-container-high transition-colors" onclick="document.getElementById('sidebar').classList.toggle('-translate-x-full')">
          <span class="material-symbols-outlined text-primary">menu</span>
        </button>\n` + tag;
    });
  }
  
  // 5. Update Fee tab to be active in fee_payments.html
  if (file === 'fee_payments.html') {
      // Just ensure we added the Fees tab to the sidebar, wait the sidebar script didn't add Fees! 
      // The original bottom nav had: Home, Attendance, Fees, Results, ID.
      // My sidebar script had Home, Attendance, Results, Events, ID. 
      // Let's replace Events with Fees for fee_payments.html
      content = content.replace(/<a href="campus_events.html"[\s\S]*?campaign<\/span>\s*<span class="font-label-md">Events<\/span>\s*<\/a>/,
      `<a href="fee_payments.html" class="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg transition-colors">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">payments</span>
        <span class="font-label-md">Fees</span>
      </a>`);
  }

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
}
