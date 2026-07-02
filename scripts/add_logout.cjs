const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const logoutHtml = `
    </nav>
    <div class="p-4 border-t border-surface-container mt-auto">
      <a href="index.html" class="flex items-center gap-3 px-4 py-3 text-gls-heritage-red hover:bg-red-50 rounded-lg transition-colors font-bold">
        <span class="material-symbols-outlined">logout</span>
        <span class="font-label-md">Logout</span>
      </a>
    </div>
  </aside>`;

for (const file of files) {
    if (file === 'index.html') continue; // Login page doesn't have sidebar
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it has sidebar and hasn't been updated yet
    if (content.includes('id="sidebar"') && !content.includes('logout</span>')) {
        content = content.replace(/<\/nav>\s*<\/aside>/i, logoutHtml);
        fs.writeFileSync(file, content);
    }
}
