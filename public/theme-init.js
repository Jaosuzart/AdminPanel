(function() {
  try {
    var t = localStorage.getItem('dashboard-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = t === 'dark' ? '#0a0e1a' : '#eef1f6';
    }
  } catch (e) {
    // Fail silently in case of issues like blocked localStorage
  }
})();
