document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('site-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const openBtn = document.getElementById('openbtn');
  const closeBtn = document.getElementById('sidebar-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-links a, .sidebar-footer a');

  function toggleSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.toggle('is-open');
      overlay.classList.toggle('is-open');
    }
  }

  if (openBtn) openBtn.addEventListener('click', toggleSidebar);
  if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', toggleSidebar);

  sidebarLinks.forEach(link => {
    link.addEventListener('click', toggleSidebar);
  });
});